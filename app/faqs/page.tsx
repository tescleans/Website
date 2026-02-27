"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
    {
        question: "What services do you offer?",
        answer: "We provide residential, commercial, and specialty cleaning services. This includes routine home cleaning, deep cleaning, move-in/move-out services, office and facility cleaning, restaurant and kitchen cleaning, fleet and transportation cleaning, post-construction cleaning, and specialty sanitation services."
    },
    {
        question: "Do you offer recurring cleaning services?",
        answer: "Yes. We offer weekly, bi-weekly, monthly, and customized recurring service plans for both residential and commercial clients. Recurring clients receive priority scheduling and consistent service teams."
    },
    {
        question: "Are your cleaners trained and insured?",
        answer: "Absolutely. All team members are professionally trained and supervised. We are fully insured, and workers’ compensation coverage is maintained where required. Safety, professionalism, and accountability are top priorities."
    },
    {
        question: "Do I need to be home during the cleaning?",
        answer: "No. Many of our clients are not present during service. As long as we have access instructions, we can clean while you’re away and secure the property upon completion."
    },
    {
        question: "What cleaning products do you use?",
        answer: "We use professional-grade, industry-approved cleaning products. Eco-friendly options are available upon request. If you have specific product preferences or sensitivities, we’re happy to accommodate them."
    },
    {
        question: "Do you bring your own supplies and equipment?",
        answer: "Yes. Our teams arrive fully equipped with all necessary cleaning supplies and tools. If you prefer us to use products you provide, just let us know in advance."
    },
    {
        question: "How is pricing determined?",
        answer: "Pricing is based on the type of service, size of the space, level of cleaning required, and service frequency. We offer flat-rate pricing whenever possible so there are no surprises. Commercial and specialty services are quoted after a walkthrough or consultation."
    },
    {
        question: "Do you offer same-day or emergency cleaning?",
        answer: "Yes, when availability allows. We understand emergencies happen and do our best to accommodate last-minute and urgent requests, especially for commercial and compliance-related needs."
    },
    {
        question: "Are your services customizable?",
        answer: "Absolutely. Every home and business is different. We tailor our services to your specific needs, schedule, and priorities."
    },
    {
        question: "Do you clean commercial kitchens, restaurants, and facilities?",
        answer: "Yes. We provide professional cleaning for restaurants, commercial kitchens, offices, medical facilities, schools, warehouses, and other commercial properties. Services are available during off-hours to avoid disruption."
    },
    {
        question: "Do you offer fleet or transportation cleaning?",
        answer: "Yes. We service vehicle fleets including buses, vans, delivery vehicles, and other transportation assets. Fleet cleaning can be scheduled per vehicle or under monthly contracts."
    },
    {
        question: "What areas do you serve?",
        answer: "We serve Miami-Dade County, Broward County, Palm Beach County. For commercial and contract clients, we may accommodate extended service areas—please contact us to discuss your needs."
    },
    {
        question: "How do I schedule a cleaning?",
        answer: "You can schedule service by phone, email, or through our website. For commercial or specialty services, we recommend a brief consultation or walkthrough."
    },
    {
        question: "What is your cancellation or rescheduling policy?",
        answer: "We ask for at least 24–48 hours’ notice for cancellations or rescheduling. This allows us to manage staffing efficiently and continue providing reliable service."
    },
    {
        question: "Do you offer contracts for businesses?",
        answer: "Yes. We offer monthly, quarterly, and annual service agreements for commercial and institutional clients, including custom scopes of work and compliance documentation when required."
    },
    {
        question: "What if I’m not satisfied with the cleaning?",
        answer: "Your satisfaction matters. If something was missed, please notify us within 24 hours and we’ll address it promptly."
    },
    {
        question: "How do I get a quote?",
        answer: "You can request a quote by contacting us directly. Residential quotes may be provided quickly, while commercial and specialty services typically require a walkthrough or consultation."
    }
]

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <div className="pt-32 pb-24 min-h-screen bg-neutral-50 dark:bg-neutral-950">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        <HelpCircle className="w-4 h-4" />
                        <span>FAQ</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-50">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
                        Everything you need to know about our premium cleaning services. Can't find the answer you're looking for? Please contact us.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={cn(
                                    "group rounded-2xl border transition-all duration-300 overflow-hidden",
                                    isOpen
                                        ? "bg-white dark:bg-neutral-900 border-primary/20 shadow-lg"
                                        : "bg-white/50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 hover:border-primary/20"
                                )}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="flex items-center justify-between w-full p-6 text-left"
                                >
                                    <span className={cn(
                                        "font-semibold text-lg transition-colors",
                                        isOpen ? "text-primary dark:text-white" : "text-neutral-900 dark:text-neutral-100"
                                    )}>
                                        {faq.question}
                                    </span>
                                    <div className={cn(
                                        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                                        isOpen ? "bg-primary text-white rotate-180" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 group-hover:bg-primary/10 group-hover:text-primary"
                                    )}>
                                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-6 pb-6 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}