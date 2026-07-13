import React from 'react'

type EmergencyContact = {
  label: string
  phone: string
}

export type ContactInfoBlockProps = {
  title?: string | null
  address?: string | null
  phone?: string | null
  email?: string | null
  mapEmbedUrl?: string | null
  emergencyContacts?: EmergencyContact[] | null
}

export const ContactInfoBlock: React.FC<ContactInfoBlockProps> = ({
  title,
  address,
  phone,
  email,
  mapEmbedUrl,
  emergencyContacts,
}) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {title && <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{title}</h2>}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {address && <p>📍 {address}</p>}
            {phone && <p>📞 {phone}</p>}
            {email && <p>✉️ {email}</p>}

            {!!emergencyContacts?.length && (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-3">Emergency Contacts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {emergencyContacts.map((c, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-between"
                    >
                      <span className="font-medium">{c.label}</span>
                      <a href={`tel:${c.phone}`} className="font-bold text-red-600">
                        {c.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {mapEmbedUrl && (
            <div className="rounded-2xl overflow-hidden aspect-video">
              <iframe
                src={mapEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
