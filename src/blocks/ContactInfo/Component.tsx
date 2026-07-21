import React from 'react'
import { Flame, LifeBuoy, MapPin, Mail, Phone, PhoneCall, Shield, Plus, ArrowRight } from 'lucide-react'

import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

type EmergencyContact = {
  label: string
  phone: string
  icon?: string | null
}

export type ContactInfoBlockProps = {
  title?: string | null
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
                <div className="absolute bottom-0 right-[-8%] w-[55%] aspect-[3/4] rounded-3xl overflow-hidden shadow-xl ring-8 ring-white">
                  <Media resource={image2} imgClassName="w-full h-full object-cover" fill />
                </div>
              )}
            </div>
          )}

          <div className={hasImages ? '' : 'lg:col-span-2'}>
            {title && (
              <h2 className="  text-4xl md:text-5xl font-bold mb-3 text-start">{title}</h2>
            )}
            <div className="w-14 h-1.5 rounded-full bg-gray-900 mb-5" />
            {description && (
              <p className="text-gray-500 mb-8">{description}</p>
            )}

            {(address || phone || email) && (
              <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                {address && (
                  <div className="flex items-start gap-3 sm:pr-4 pb-4 sm:pb-0">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-gray-900" />
                    </span>
                    <span>
                      <span className="block text-xs text-gray-400">Location</span>
                      <span className="font-bold">{address}</span>
                    </span>
                  </div>
                )}
                {phone && (
                  <div className="flex items-start gap-3 sm:px-4 py-4 sm:py-0">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-gray-900" />
                    </span>
                    <span>
                      <span className="block text-xs text-gray-400">Phone</span>
                      <a href={`tel:${phone}`} className="font-bold hover:text-gray-900">
                        {phone}
                      </a>
                    </span>
                  </div>
                )}
                {email && (
                  <div className="flex items-start gap-3 sm:pl-4 pt-4 sm:pt-0">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-gray-900" />
                    </span>
                    <span>
                      <span className="block text-xs text-gray-400">Email</span>
                      <a href={`mailto:${email}`} className="font-bold hover:text-gray-900 break-all">
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
            <h3 className="flex items-center gap-2 text-xl font-bold mb-5">
              <span aria-hidden>🚨</span> Emergency Contacts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {emergencyContacts.map((c, i) => {
                const IconComp = emergencyIcons[c.icon || 'shield'] || Shield
                return (
                  <div
                    key={i}
                    className="rounded-2xl bg-white shadow-sm border border-gray-100 p-5 flex items-center gap-4"
                  >
                    <span className="shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <IconComp className="w-6 h-6 text-gray-900" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-bold">{c.label}</span>
                      <span className="block text-xs text-gray-400 mb-1">Emergency</span>
                      <span className="block text-2xl font-extrabold text-gray-900">{c.phone}</span>
                    </span>
                    <a
                      href={`tel:${c.phone}`}
                      className="shrink-0 w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 hover:border-gray-300 transition-colors"
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
          <div className="relative overflow-hidden mt-8 rounded-2xl bg-gray-50 border border-gray-200 p-6 flex items-center gap-4">
            <span className="shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <PhoneCall className="w-6 h-6 text-gray-900" />
            </span>
            <span>
              {emergencyNoteTitle && <span className="block font-bold">{emergencyNoteTitle}</span>}
              {emergencyNoteDescription && (
                <span className="block text-sm text-gray-500">
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
