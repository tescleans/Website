"use client"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format, isSunday, isSaturday } from "date-fns"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { Check, Loader2, Home, BedDouble, Bath, Ruler, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

// Services list
const servicesList = [
    { id: "commercial", name: "Commercial Cleaning", price: "Contact Us", duration: "Varies" },
    { id: "residential", name: "Residential Cleaning", price: "Contact Us", duration: "Varies" },
    { id: "restaurant", name: "Restaurant Cleaning", price: "Contact Us", duration: "Varies" },
    { id: "carpet", name: "Carpet Cleaning", price: "Contact Us", duration: "Varies" },
    { id: "pressure", name: "Pressure Washing", price: "Contact Us", duration: "Varies" },
    { id: "floor", name: "Floor Cleaning", price: "Contact Us", duration: "Varies" },
    { id: "construction", name: "Construction Cleaning", price: "Contact Us", duration: "Varies" },
    { id: "window", name: "Window Cleaning", price: "Contact Us", duration: "Varies" },
    { id: "custom", name: "Custom Services", price: "Contact Us", duration: "Varies" }
]

export default function BookingPage() {
    const [step, setStep] = useState(1)
    const [selectedService, setSelectedService] = useState<string | null>(null)
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [time, setTime] = useState<string | null>(null)
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Address & Property State
    const [addressData, setAddressData] = useState({
        street: "",
        city: "",
        state: "FL",
        zipCode: ""
    })
    const [propertyDetails, setPropertyDetails] = useState({
        squareFootage: "",
        bedrooms: "",
        bathrooms: ""
    })

    // Generate time slots based on date
    const getTimeSlots = (date: Date) => {
        if (isSunday(date)) return []
        const isSat = isSaturday(date)
        const slots = []
        const startHour = 9
        const endHour = isSat ? 14 : 16

        for (let h = startHour; h <= endHour; h++) {
            const ampm = h >= 12 ? 'pm' : 'am'
            const hour12 = h > 12 ? h - 12 : h
            slots.push(`${hour12}:00 ${ampm}`)
        }
        return slots
    }

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedService || !date || !time) return

        setIsSubmitting(true)

        const fullAddress = [addressData.street, addressData.city, addressData.state, addressData.zipCode].filter(Boolean).join(', ')

        try {
            const { error } = await supabase.from('bookings').insert({
                service: servicesList.find(s => s.id === selectedService)?.name || selectedService,
                date: format(date, 'yyyy-MM-dd'),
                time,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: formData.message,
                address: fullAddress || null,
                square_footage: propertyDetails.squareFootage ? parseInt(propertyDetails.squareFootage) : null,
                bedrooms: propertyDetails.bedrooms ? parseInt(propertyDetails.bedrooms) : null,
                bathrooms: propertyDetails.bathrooms ? parseFloat(propertyDetails.bathrooms) : null,
                status: 'pending'
            })

            if (error) throw error

            // Send Email Notification
            await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'booking',
                    data: {
                        service: servicesList.find(s => s.id === selectedService)?.name || selectedService,
                        date: format(date, 'yyyy-MM-dd'),
                        time,
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        address: fullAddress,
                        city: addressData.city,
                        zip: addressData.zipCode,
                        squareFootage: propertyDetails.squareFootage || null,
                        bedrooms: propertyDetails.bedrooms || null,
                        bathrooms: propertyDetails.bathrooms || null,
                        notes: formData.message
                    }
                })
            })

            toast.success("Booking Request Sent!", {
                description: "We will contact you shortly to confirm."
            })
            setStep(5) // Success step
        } catch (err) {
            console.error(err)
            toast.error("Booking failed", { description: "Please try again or call us." })
        } finally {
            setIsSubmitting(false)
        }
    }

    const slots = date ? getTimeSlots(date) : []

    return (
        <div className="min-h-screen pt-32 pb-12 bg-gray-50">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl font-bold text-primary mb-8 text-center">Book Your Cleaning</h1>

                <div className="bg-white rounded-2xl shadow-sm border p-8">
                    {/* Progress Steps */}
                    <div className="flex gap-2 md:gap-4 mb-8 text-sm font-medium text-gray-400 border-b pb-4 overflow-x-auto">
                        <span className={cn("whitespace-nowrap", step >= 1 && "text-primary")}>1. Service</span>
                        <span className={cn("whitespace-nowrap", step >= 2 && "text-primary")}>2. Date & Time</span>
                        <span className={cn("whitespace-nowrap", step >= 3 && "text-primary")}>3. Property</span>
                        <span className={cn("whitespace-nowrap", step >= 4 && "text-primary")}>4. Details</span>
                    </div>

                    {/* Step 1: Services */}
                    {step === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {servicesList.map(s => (
                                <div
                                    key={s.id}
                                    onClick={() => { setSelectedService(s.id); setStep(2) }}
                                    className="group relative overflow-hidden rounded-2xl border bg-white p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-primary/50"
                                >
                                    <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="font-bold text-xl text-primary group-hover:text-blue-900 transition-colors">{s.name}</h3>
                                            <span className="bg-secondary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">{s.price}</span>
                                        </div>
                                        <div className="mt-auto flex items-center gap-2 text-muted-foreground">
                                            <span className="text-sm border px-2 py-0.5 rounded bg-gray-50">{s.duration}</span>
                                            <span className="text-xs ml-auto text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">Select →</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Step 2: Date & Time */}
                    {step === 2 && (
                        <div className="flex flex-col xl:flex-row gap-12 items-start justify-center">
                            {/* Calendar Column */}
                            <div className="flex-1 w-full xl:max-w-[400px] flex flex-col">
                                <Label className="mb-4 block text-lg font-semibold text-primary">Select Date</Label>
                                <div className="p-6 border rounded-2xl bg-white shadow-sm w-full flex justify-center">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        disabled={(date: Date) => isSunday(date) || date < new Date(new Date().setHours(0, 0, 0, 0))}
                                        className="rounded-md"
                                    />
                                </div>
                                <p className="mt-4 text-sm text-muted-foreground text-center">
                                    <span className="text-destructive">*</span> Sundays are closed.
                                </p>
                            </div>

                            {/* Time Slots Column */}
                            <div className="flex-1 w-full">
                                <Label className="mb-4 block text-lg font-semibold text-primary">Select Time (EST)</Label>

                                {!date ? (
                                    <div className="h-40 flex items-center justify-center border-2 border-dashed rounded-xl bg-gray-50 text-muted-foreground">
                                        Please select a date first
                                    </div>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {slots.length > 0 ? slots.map(s => (
                                                <Button
                                                    key={s}
                                                    variant={time === s ? "default" : "outline"}
                                                    onClick={() => setTime(s)}
                                                    className={cn(
                                                        "w-full py-4 h-auto text-sm font-medium transition-all",
                                                        time === s ? "bg-primary text-white shadow-lg scale-105 ring-2 ring-offset-2 ring-primary" : "hover:border-primary hover:text-primary bg-white"
                                                    )}
                                                >
                                                    {s}
                                                </Button>
                                            )) : (
                                                <div className="col-span-3 text-center p-8 bg-gray-50 rounded-xl">
                                                    <p className="font-semibold text-gray-900">No slots available</p>
                                                    <p className="text-sm text-muted-foreground">Please try another date.</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-8 flex justify-between gap-4 pt-6 border-t">
                                            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                                            <Button
                                                size="lg"
                                                onClick={() => setStep(3)}
                                                disabled={!date || !time}
                                                className="shadow-md"
                                            >
                                                Continue to Property →
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Property Information */}
                    {step === 3 && (
                        <div className="max-w-2xl mx-auto space-y-8">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Home className="w-8 h-8 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold text-primary">Property Information</h2>
                                <p className="text-muted-foreground mt-2">Help us understand your property for a better estimate</p>
                            </div>

                            {/* Address Input */}
                            <div className="space-y-4 p-6 bg-gray-50 rounded-2xl">
                                <h3 className="font-semibold text-primary flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    Property Address
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2 space-y-2">
                                        <Label>Street Address</Label>
                                        <Input
                                            placeholder="123 Main Street"
                                            value={addressData.street}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddressData({ ...addressData, street: e.target.value })}
                                            className="bg-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>City</Label>
                                        <Input
                                            placeholder="Miami"
                                            value={addressData.city}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddressData({ ...addressData, city: e.target.value })}
                                            className="bg-white"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>State</Label>
                                            <Input
                                                placeholder="FL"
                                                value={addressData.state}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddressData({ ...addressData, state: e.target.value })}
                                                className="bg-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>ZIP Code</Label>
                                            <Input
                                                placeholder="33101"
                                                value={addressData.zipCode}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddressData({ ...addressData, zipCode: e.target.value })}
                                                className="bg-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Property Details */}
                            <div className="p-6 bg-gray-50 rounded-2xl border">
                                <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                                    <Ruler className="w-4 h-4" />
                                    Property Details <span className="text-muted-foreground font-normal text-sm">(Optional)</span>
                                </h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-1 text-sm">
                                            <Ruler className="w-3 h-3" />
                                            Sq. Footage
                                        </Label>
                                        <Input
                                            type="number"
                                            placeholder="2000"
                                            value={propertyDetails.squareFootage}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setPropertyDetails({ ...propertyDetails, squareFootage: e.target.value })
                                            }
                                            className="bg-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-1 text-sm">
                                            <BedDouble className="w-3 h-3" />
                                            Bedrooms
                                        </Label>
                                        <Input
                                            type="number"
                                            placeholder="3"
                                            value={propertyDetails.bedrooms}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setPropertyDetails({ ...propertyDetails, bedrooms: e.target.value })
                                            }
                                            className="bg-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-1 text-sm">
                                            <Bath className="w-3 h-3" />
                                            Bathrooms
                                        </Label>
                                        <Input
                                            type="number"
                                            step="0.5"
                                            placeholder="2"
                                            value={propertyDetails.bathrooms}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setPropertyDetails({ ...propertyDetails, bathrooms: e.target.value })
                                            }
                                            className="bg-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between gap-4 pt-6 border-t">
                                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                                <Button
                                    size="lg"
                                    onClick={() => setStep(4)}
                                    className="shadow-md"
                                >
                                    Continue to Details →
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Details */}
                    {step === 4 && (
                        <form onSubmit={handleBooking} className="space-y-6 max-w-lg mx-auto">
                            {/* Summary Card */}
                            <div className="p-4 bg-gray-50 rounded-xl mb-6">
                                <h3 className="font-semibold text-primary mb-2">Booking Summary</h3>
                                <div className="text-sm text-muted-foreground space-y-1">
                                    <p><span className="font-medium">Service:</span> {servicesList.find(s => s.id === selectedService)?.name}</p>
                                    <p><span className="font-medium">Date:</span> {date ? format(date, 'MMMM d, yyyy') : ''}</p>
                                    <p><span className="font-medium">Time:</span> {time}</p>
                                    {addressData.street && (
                                        <p><span className="font-medium">Address:</span> {[addressData.street, addressData.city, addressData.state, addressData.zipCode].filter(Boolean).join(', ')}</p>
                                    )}
                                    {propertyDetails.squareFootage && (
                                        <p><span className="font-medium">Sq. Ft:</span> {propertyDetails.squareFootage}</p>
                                    )}
                                    {(propertyDetails.bedrooms || propertyDetails.bathrooms) && (
                                        <p><span className="font-medium">Beds/Baths:</span> {propertyDetails.bedrooms || '—'} / {propertyDetails.bathrooms || '—'}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input required value={formData.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input type="email" required value={formData.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Phone</Label>
                                <Input type="tel" required value={formData.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Message (Optional)</Label>
                                <Input value={formData.message} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, message: e.target.value })} />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="button" variant="outline" onClick={() => setStep(3)}>Back</Button>
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : null}
                                    Confirm Booking
                                </Button>
                            </div>
                        </form>
                    )}

                    {/* Step 5: Success */}
                    {step === 5 && (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="h-10 w-10" />
                            </div>
                            <h2 className="text-2xl font-bold text-primary mb-2">Booking Confirmed!</h2>
                            <p className="text-muted-foreground text-lg">Thank you, {formData.name}. We have received your request.</p>
                            <p className="text-muted-foreground">A confirmation email has been sent to {formData.email}.</p>
                            <Button className="mt-8" onClick={() => {
                                setStep(1)
                                setFormData({ name: "", email: "", phone: "", message: "" })
                                setAddressData({ street: "", city: "", state: "FL", zipCode: "" })
                                setPropertyDetails({ squareFootage: "", bedrooms: "", bathrooms: "" })
                            }}>Book Another</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}