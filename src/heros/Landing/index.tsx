'use client'
// import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
// import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

// export const Landing: React.FC<Page['hero']> = ({ links, media, richText }) => {

//   return (
//     <div className="relative -mt-[10.4rem] flex items-end text-white" data-theme="light">
//       <div className="container mb-8 z-10 relative">
//         <div className="max-w-[34rem]">
//           {richText && <RichText className="mb-6" content={richText} enableGutter={false} />}
//           {Array.isArray(links) && links.length > 0 && (
//             <ul className="flex gap-4">
//               {links.map(({ link }, i) => {
//                 return (
//                   <li key={i}>
//                     <CMSLink {...link} />
//                   </li>
//                 )
//               })}
//             </ul>
//           )}
//         </div>
//       </div>
//       <div className="min-h-[100vh] select-none">
//         {media && typeof media === 'object' && (
//           <React.Fragment>
//             <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
//             <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
//           </React.Fragment>
//         )}
//       </div>
//     </div>
//   )
// }

import { Fragment, useState } from 'react'
import { Calendar, MapPin, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'

export function LandingPage({ links, media, richText }: Page['hero']) {
  const [form, setForm] = useState({
    place: 'Istanbul, Istanbul, Türkiye',
    dates: 'Jun 8 - Jun 13',
  })

  return (
    <div className="relative min-h-screen font-sans text-white">
      {media && typeof media === 'object' && (
        <div className="absolute pointer-events-none bg-black/30 left-0 bottom-0 w-full h-full ">
          <Media
            fill
            className="h-screen w-screen"
            videoClassName="h-screen w-screen object-cover"
            imgClassName="-z-10 object-cover"
            priority
            resource={media}
          />
          <div className="absolute inset-0 bg-black/40 z-[1]"></div>
        </div>
      )}

      <div className="relative z-10 flex h-full space-y-14 flex-col min-h-screen  items-center justify-center text-center ">
        <h1 className="text-6xl md:text-[120px] lg:text-[180px] bg-clip-text text-transparent  bg-gradient-to-b from-transparent to to-white  mix-blend-difference  font-extrabold tracking-tight mb-4">
          ESCAPE TO FUN
        </h1>
        <div className="max-w-2xl text-lg font-thin text-gray-300 mb-12">
          {richText && <RichText className="mb-6" content={richText} enableGutter={false} />}
        </div>

        <div className="flex flex-col md:flex-row items-center bg-white/90 text-gray-800 rounded-full shadow-lg overflow-hidden px-4 py-3 w-[90%] md:w-auto">
          <div className="flex items-center justify-start border-b md:border-b-0 md:border-r border-gray-300 px-4 py-2">
            <MapPin className="w-5 h-5 text-gray-500 mr-2" />
            <div className="text-left">
              <p className="text-xs uppercase font-semibold text-gray-500">Place</p>
              <p className="text-sm font-medium">{form.place}</p>
            </div>
          </div>

          <div className="flex items-center border-b md:border-b-0 px-4 py-2">
            <Calendar className="w-5 h-5 text-gray-500 mr-2" />
            <div className="text-left">
              <p className="text-xs uppercase font-semibold text-gray-500">Dates</p>
              <p className="text-sm font-medium">{form.dates}</p>
            </div>
          </div>

          
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 left-0 right-0 text-center text-sm">
        <p className="text-gray-200 mb-2">FOLLOW US:</p>
        <div className="flex justify-center space-x-6">
          <a href="#" className="hover:text-yellow-300 transition">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            <i className="fab fa-x-twitter"></i>
          </a>
        </div>
      </footer>
    </div>
  )
}
