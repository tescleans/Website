"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Briefcase, CheckCircle, Upload } from "lucide-react"
import { useRef, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { toast } from "sonner"

export default function CareersPage() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
    })
    const [resume, setResume] = useState<File | null>(null)
    const recaptchaRef = useRef<ReCAPTCHA>(null)

    const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        // Verify CAPTCHA
        const captchaToken = recaptchaRef.current?.getValue()
        if (!captchaToken) {
            toast.error("CAPTCHA Required", { description: "Please complete the CAPTCHA verification before submitting." })
            return
        }

        setLoading(true)

        try {
            let attachments = [];
            if (resume) {
                // Check file size (e.g. 5MB limit)
                if (resume.size > 5 * 1024 * 1024) {
                    toast.error("File Update Error", { description: "File size must be less than 5MB." })
                    setLoading(false)
                    return
                }
                const base64Content = await toBase64(resume);
                const content = base64Content.split(',')[1]; // Get only the base64 part

                attachments.push({
                    filename: resume.name,
                    content: content
                })
            } else {
                toast.error("Resume Required", { description: "Please attach your CV/Resume." })
                setLoading(false)
                return
            }

            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'careers',
                    data: {
                        name: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email,
                        phone: formData.phone,
                        message: formData.message,
                        attachments: attachments,
                        captchaToken: captchaToken
                    }
                })
            })

            const data = await res.json()

            if (res.ok) {
                toast.success("Application Sent", { description: "We have received your application. Thank you!" })
                setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" })
                setResume(null)
                recaptchaRef.current?.reset()
            } else {
                toast.error("Error", { description: data.error || "Failed to send application." })
                recaptchaRef.current?.reset()
            }
        } catch (error) {
            toast.error("Error", { description: "Something went wrong. Please try again." })
            recaptchaRef.current?.reset()
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Join Our Team</h1>
                    <p className="text-muted-foreground text-lg">
                        Build your career with Total Excellence Services.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Info */}
                    <div className="space-y-8">
                        <div className="bg-primary text-white p-8 rounded-2xl shadow-lg">
                            <h3 className="text-2xl font-bold mb-6">Why Work With Us?</h3>
                            <div className="space-y-6">
                                <p className="text-gray-200 leading-relaxed">
                                    At TesCleans, we value our employees as much as our clients.
                                    We offer a supportive environment, competitive pay, and opportunities
                                    for growth.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-6 w-6 text-secondary" />
                                        <span>Competitive Salary & Benefits</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-6 w-6 text-secondary" />
                                        <span>Flexible Working Hours</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-6 w-6 text-secondary" />
                                        <span>Professional Training Provided</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-6 w-6 text-secondary" />
                                        <span>Friendly Team Environment</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-4 mb-4">
                                <Briefcase className="h-8 w-8 text-primary" />
                                <h3 className="text-xl font-bold text-primary">Current Openings</h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                We are actively looking for:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
                                <li>Professional Cleaners</li>
                                <li>Team Supervisors</li>
                                <li>Specialized Floor Technicians</li>
                            </ul>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border">
                        <h3 className="text-2xl font-bold text-primary mb-6">Apply Now</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>First Name</Label>
                                    <Input
                                        required
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        placeholder="John"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Last Name</Label>
                                    <Input
                                        required
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Phone</Label>
                                    <Input
                                        required
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="(555) 000-0000"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Resume / CV</Label>
                                <div className="flex items-center gap-4">
                                    <Input
                                        required
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => setResume(e.target.files ? e.target.files[0] : null)}
                                        className="cursor-pointer file:cursor-pointer file:text-primary file:font-semibold"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground pl-1">
                                    Accepted formats: PDF, DOC, DOCX. Max 5MB.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label>Cover Letter / Message</Label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Tell us a bit about yourself..."
                                />
                            </div>

                            {/* reCAPTCHA */}
                            <div className="flex justify-center">
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                                />
                            </div>

                            <Button size="lg" className="w-full" disabled={loading}>
                                {loading ? (
                                    <>Uploading...</>
                                ) : (
                                    <>
                                        <Upload className="mr-2 h-4 w-4" /> Submit Application
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}