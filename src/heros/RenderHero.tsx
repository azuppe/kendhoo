import React from 'react'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { LandingPage } from '@/heros/Landing'
import HeroCarousel from './HeroCarousel'
import { AdventureHero } from '@/heros/Adventure'
import { CosmeticHero } from '@/heros/Cosmetic'
import { EventDetailsHero } from '@/heros/EventDetails'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  landing: LandingPage,
  heroCarousel: HeroCarousel,
  adventure: AdventureHero,
  cosmetic: CosmeticHero,
  eventDetails: EventDetailsHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
