import * as React from 'react'
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Img,
  Heading,
  Text,
  Hr,
  Row,
  Column,
} from '@react-email/components'

interface ContactEmailTemplateProps {
  name: string
  email: string
  subject?: string
  unitType?: string
  message?: string
}

export function ContactEmailTemplate({
  name,
  email,
  subject,
  unitType,
  message,
}: Readonly<ContactEmailTemplateProps>) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={header}>
            <Img
              src={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://aria.ke'}/logo.webp`}
              alt="ARIA Capital Residency"
              width="200"
              height="65"
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={heading}>New Contact Form Submission</Heading>
            <Text style={subtitle}>
              You have received a new inquiry from the ARIA Capital Residency website.
            </Text>

            <Hr style={divider} />

            {/* Contact Details */}
            <Section style={detailsSection}>
              <Row>
                <Column style={labelColumn}>
                  <Text style={label}>Name:</Text>
                </Column>
                <Column>
                  <Text style={value}>{name}</Text>
                </Column>
              </Row>

              <Row>
                <Column style={labelColumn}>
                  <Text style={label}>Email:</Text>
                </Column>
                <Column>
                  <Text style={value}>
                    <a href={`mailto:${email}`} style={link}>
                      {email}
                    </a>
                  </Text>
                </Column>
              </Row>

              {subject && (
                <Row>
                  <Column style={labelColumn}>
                    <Text style={label}>Subject:</Text>
                  </Column>
                  <Column>
                    <Text style={value}>{subject}</Text>
                  </Column>
                </Row>
              )}

              {unitType && (
                <Row>
                  <Column style={labelColumn}>
                    <Text style={label}>Unit Type:</Text>
                  </Column>
                  <Column>
                    <Text style={value}>{unitType}</Text>
                  </Column>
                </Row>
              )}
            </Section>

            {message && (
              <>
                <Hr style={divider} />
                <Section>
                  <Text style={label}>Message:</Text>
                  <Text style={messageText}>{message}</Text>
                </Section>
              </>
            )}

            <Hr style={divider} />

            {/* Footer */}
            <Section style={footer}>
              <Text style={footerText}>
                This email was sent from the contact form on the ARIA Capital Residency website.
              </Text>
              <Text style={footerText}>
                <strong>ARIA Capital Residency</strong>
                <br />
                Mawensi Road, Upperhill
                <br />
                Nairobi - Kenya
                <br />
                <a href="tel:+254759012345" style={link}>
                  +254 759 012 345
                </a>
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: '#f5f5f5',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  maxWidth: '600px',
}

const header = {
  backgroundColor: '#1a2332', // dark-blue
  padding: '32px 24px',
  textAlign: 'center' as const,
}

const logo = {
  margin: '0 auto',
  filter: 'brightness(0) invert(1)',
}

const content = {
  padding: '40px 32px',
}

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#1a2332', // dark-blue
  margin: '0 0 16px',
  lineHeight: '1.3',
}

const subtitle = {
  fontSize: '16px',
  color: '#666666',
  margin: '0 0 24px',
  lineHeight: '1.5',
}

const divider = {
  borderColor: '#e5e5e5',
  margin: '24px 0',
}

const detailsSection = {
  margin: '24px 0',
}

const labelColumn = {
  width: '140px',
  verticalAlign: 'top' as const,
  paddingRight: '16px',
}

const label = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#1a2332', // dark-blue
  margin: '0 0 12px',
}

const value = {
  fontSize: '16px',
  color: '#333333',
  margin: '0 0 12px',
  lineHeight: '1.5',
}

const link = {
  color: '#ff6b5a', // coral
  textDecoration: 'none',
}

const messageText = {
  fontSize: '16px',
  color: '#333333',
  margin: '12px 0 0',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap' as const,
  backgroundColor: '#f9f9f9',
  padding: '16px',
  borderRadius: '8px',
  borderLeft: '4px solid #ff6b5a', // coral
}

const footer = {
  marginTop: '32px',
}

const footerText = {
  fontSize: '14px',
  color: '#999999',
  margin: '8px 0',
  lineHeight: '1.5',
}
