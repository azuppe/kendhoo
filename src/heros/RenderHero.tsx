import React from 'react'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { LandingPage } from '@/heros/Landing'
import HeroCarousel from './HeroCarousel'
import { AdventureHero } from '@/heros/Adventure'
import { PeopleHero } from '@/heros/People'
import { EventDetailsHero } from '@/heros/EventDetails'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  landing: LandingPage,
  heroCarousel: HeroCarousel,
  adventure: AdventureHero,
  people: PeopleHero,
  eventDetails: EventDetailsHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
