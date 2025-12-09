'use client'

import * as React from 'react'
import { z } from 'zod'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { sendContactEmail } from '@/lib/resend-actions'

// Zod validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.email('Invalid email address'),
  subject: z.string().optional(),
  unitType: z.string().optional(),
  message: z.string().optional(),
})

export function Contact() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Store form reference before async operations
    const form = e.currentTarget
    setIsSubmitting(true)

    const formData = new FormData(form)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      unitType: formData.get('unitType') as string,
      message: formData.get('message') as string,
    }

    // Validate form data with Zod
    const validationResult = contactSchema.safeParse(data)

    if (!validationResult.success) {
      // Show first validation error
      const firstError = validationResult.error.issues[0]
      toast.error(firstError.message)
      setIsSubmitting(false)
      return
    }

    try {
      const result = await sendContactEmail(validationResult.data)

      if (result.success) {
        toast.success('Thank you for your inquiry. We will contact you shortly!')
        form.reset()
      } else {
        toast.error(result.error || 'Failed to send message')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="bg-neutral-100 border-t border-dark-blue/20 py-10 sm:py-16 lg:py-24"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <p className="text-dark-blue/50 text-base sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4">
            Reserve your unit
          </p>
          <h2 className="text-coral text-4xl sm:text-6xl md:text-8xl lg:text-[150px] font-bold leading-none">
            Contact us
          </h2>
        </div>

        {/* Content Grid - Contact Info Left, Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 sm:gap-12 lg:gap-16">
          {/* Left - Sales Team Info */}
          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-dark-blue text-lg sm:text-xl font-bold uppercase tracking-wide">
              Sales Team
            </h3>

            {/* Email & Phone */}
            <div>
              <a
                href="mailto:sales@aria.ke"
                className="text-dark-blue/70 text-sm sm:text-base hover:text-coral transition-colors block"
              >
                sales@aria.ke
              </a>
              <a
                href="tel:+254759012345"
                className="text-dark-blue text-xl sm:text-2xl lg:text-3xl font-semibold hover:text-coral transition-colors"
              >
                +254 759 012 345
              </a>
            </div>

            <div className="w-24 h-0.5 bg-coral" />

            {/* Address */}
            <div>
              <p className="text-dark-blue/70 text-sm sm:text-base">Mawensi Road, Upperhill,</p>
              <p className="text-dark-blue/70 text-sm sm:text-base">Nairobi - Kenya</p>
            </div>

            <div className="w-24 h-0.5 bg-dark-blue/20" />

            {/* Hours */}
            <div>
              <p className="text-dark-blue/70 text-sm sm:text-base">Monday — Saturday</p>
              <p className="text-dark-blue/70 text-sm sm:text-base">9am — 5pm</p>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-dark-blue text-sm sm:text-base font-medium mb-1.5 sm:mb-2"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    className="bg-neutral-100 border-0 rounded-lg px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base h-12 sm:h-14"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-dark-blue text-sm sm:text-base font-medium mb-1.5 sm:mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    required
                    className="bg-neutral-100 border-0 rounded-lg px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base h-12 sm:h-14"
                  />
                </div>
              </div>

              {/* Row 2: Subject & Unit Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-dark-blue text-sm sm:text-base font-medium mb-1.5 sm:mb-2"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Your Subject"
                    className="bg-neutral-100 border-0 rounded-lg px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base h-12 sm:h-14"
                  />
                </div>
                <div>
                  <label
                    htmlFor="unitType"
                    className="block text-dark-blue text-sm sm:text-base font-medium mb-1.5 sm:mb-2"
                  >
                    Type of unit interested in?
                  </label>
                  <Input
                    id="unitType"
                    name="unitType"
                    placeholder="1, 2 or 3 Bedroom?"
                    className="bg-neutral-100 border-0 rounded-lg px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base h-12 sm:h-14"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-dark-blue text-sm sm:text-base font-medium mb-1.5 sm:mb-2"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Message"
                  rows={6}
                  className="bg-neutral-100 border-0 rounded-lg px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-dark-blue text-white text-base sm:text-lg font-medium py-3 sm:py-4 rounded-lg hover:bg-dark-blue/90 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
