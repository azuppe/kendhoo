import React from 'react'
import { Flame, LifeBuoy, MapPin, Mail, Phone, PhoneCall, Shield, Plus, ArrowRight } from 'lucide-react'

import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { getTitleColorClass } from '@/utilities/getTitleColorClass'

type EmergencyContact = {
  label: string
  phone: string
  icon?: string | null
}

export type ContactInfoBlockProps = {
  title?: string | null
  titleColor?: ('dark' | 'light') | null
  description?: string | null
  image1?: (string | null) | MediaType
  image2?: (string | null) | MediaType
  address?: string | null
  phone?: string | null
  email?: string | null
  mapEmbedUrl?: string | null
  emergencyContacts?: EmergencyContact[] | null
  emergencyNoteTitle?: string | null
  emergencyNoteDescription?: string | null
}

const emergencyIcons: Record<string, React.ElementType> = {
  shield: Shield,
  flame: Flame,
  lifeBuoy: LifeBuoy,
  cross: Plus,
  phone: Phone,
}

export const ContactInfoBlock: React.FC<ContactInfoBlockProps> = ({
  title,
  titleColor,
  description,
  image1,
  image2,
  address,
  phone,
  email,
  emergencyContacts,
  emergencyNoteTitle,
  emergencyNoteDescription,
}) => {
  const hasImages = !!image1 || !!image2

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4  ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {hasImages && (
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0 w-full">
              {image1 && (
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <Media resource={image1} imgClassName="w-full h-full object-cover" fill />
                </div>
              )}
              {image2 && (
                <div className="absolute bottom-0 end-[-8%] w-[55%] aspect-[3/4] rounded-none overflow-hidden ring-8 ring-background">
                  <Media resource={image2} imgClassName="w-full h-full object-cover" fill />
                </div>
              )}
            </div>
          )}

          <div className={hasImages ? '' : 'lg:col-span-2'}>
            {title && (
              <h2 className={`  text-4xl md:text-5xl font-medium mb-3 text-start ${getTitleColorClass(titleColor)}`}>{title}</h2>
            )}
            <div className="w-14 h-1.5 rounded-full bg-foreground mb-5" />
            {description && (
              <p className="text-muted-foreground mb-8">{description}</p>
            )}

            {(address || phone || email) && (
              <div className="rounded-none bg-background border border-border p-6 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
                {address && (
                  <div className="flex items-start gap-3 sm:pe-4 pb-4 sm:pb-0">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-card flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-foreground" />
                    </span>
                    <span>
                      <span className="block text-xs text-muted-foreground">Location</span>
                      <span className="font-medium">{address}</span>
                    </span>
                  </div>
                )}
                {phone && (
                  <div className="flex items-start gap-3 sm:px-4 py-4 sm:py-0">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-card flex items-center justify-center">
                      <Phone className="w-5 h-5 text-foreground" />
                    </span>
                    <span>
                      <span className="block text-xs text-muted-foreground">Phone</span>
                      <a href={`tel:${phone}`} className="font-medium hover:text-foreground">
                        {phone}
                      </a>
                    </span>
                  </div>
                )}
                {email && (
                  <div className="flex items-start gap-3 sm:ps-4 pt-4 sm:pt-0">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-card flex items-center justify-center">
                      <Mail className="w-5 h-5 text-foreground" />
                    </span>
                    <span>
                      <span className="block text-xs text-muted-foreground">Email</span>
                      <a href={`mailto:${email}`} className="font-medium hover:text-foreground break-all">
                        {email}
                      </a>
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {!!emergencyContacts?.length && (
          <div className="mt-12">
            <h3 className="flex items-center gap-2 text-xl font-medium mb-5">
              <span aria-hidden>🚨</span> Emergency Contacts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {emergencyContacts.map((c, i) => {
                const IconComp = emergencyIcons[c.icon || 'shield'] || Shield
                return (
                  <div
                    key={i}
                    className="rounded-none bg-background border border-border p-5 flex items-center gap-4"
                  >
                    <span className="shrink-0 w-12 h-12 rounded-full bg-card flex items-center justify-center">
                      <IconComp className="w-6 h-6 text-foreground" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-medium">{c.label}</span>
                      <span className="block text-xs text-muted-foreground mb-1">Emergency</span>
                      <span className="block text-2xl font-medium text-foreground">{c.phone}</span>
                    </span>
                    <a
                      href={`tel:${c.phone}`}
                      className="shrink-0 w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-card hover:border-border transition-colors"
                      aria-label={`Call ${c.label}`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {(emergencyNoteTitle || emergencyNoteDescription) && (
          <div className="relative overflow-hidden mt-8 rounded-none bg-card border border-border p-6 flex items-center gap-4">
            <span className="shrink-0 w-12 h-12 rounded-full bg-card flex items-center justify-center">
              <PhoneCall className="w-6 h-6 text-foreground" />
            </span>
            <span>
              {emergencyNoteTitle && <span className="block font-medium">{emergencyNoteTitle}</span>}
              {emergencyNoteDescription && (
                <span className="block text-sm text-muted-foreground">
                  {emergencyNoteDescription}
                </span>
              )}
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
