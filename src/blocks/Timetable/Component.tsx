import React from 'react'

import { getTitleColorClass } from '@/utilities/getTitleColorClass'

type Row = { time: string; label: string; days?: string | null; note?: string | null }

export type TimetableBlockProps = {
  title?: string | null
  titleColor?: ('dark' | 'light') | null
  description?: string | null
  rows?: Row[] | null
}

export const TimetableBlock: React.FC<TimetableBlockProps> = ({
  title,
  titleColor,
  description,
  rows,
}) => {
  if (!rows?.length) return null

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          {title && (
            <h2 className={`text-4xl md:text-6xl ${getTitleColorClass(titleColor)}`}>{title}</h2>
          )}
          {description && <p className="mt-3 text-muted-foreground">{description}</p>}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] border-t-4 border-foreground text-start">
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b-2 border-foreground align-baseline">
                  <th
                    scope="row"
                    className="w-32 py-4 pe-4 text-start text-3xl font-black tabular-nums tracking-tight md:w-48 md:text-5xl"
                  >
                    {r.time}
                  </th>
                  <td className="py-4 pe-4">
                    <span className="block text-lg font-bold md:text-xl">{r.label}</span>
                    {r.note && <span className="block text-sm text-muted-foreground">{r.note}</span>}
                  </td>
                  <td className="eyebrow py-4 text-end">{r.days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
