'use server'

import { Resend } from 'resend'
import { ContactEmailTemplate } from '@/email_templates/contact-email'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface ContactFormData {
  name: string
  email: string
  subject?: string
  unitType?: string
  message?: string
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const { name, email, subject, unitType, message } = data

    const { data: emailData, error } = await resend.emails.send({
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: [process.env.TO_EMAIL!],
      replyTo: email,
      subject: subject || 'New Contact Form Submission - ARIA Capital Residency',
      react: ContactEmailTemplate({
        name,
        email,
        subject,
        unitType,
        message,
      }),
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: emailData }
  } catch (error) {
    console.error('Failed to send email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    }
  }
}
