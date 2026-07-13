export const categoriesData = [
  { en: { title: 'Travel', description: 'Guides and tips for visiting the islands.' }, dv: { title: 'ދަތުރު', description: 'ރަށްރަށަށް ޒިޔާރަތްކުރުމުގެ މަގުދައްކާ މައުލޫމާތު.' }, icon: 'MapPin', color: '#3B82F6' },
  { en: { title: 'Culture', description: 'Local traditions, events and heritage.' }, dv: { title: 'ސަޤާފަތް', description: 'ދިވެހި ސަޤާފަތާއި އާދަކާދަތައް.' }, icon: 'Users', color: '#F59E0B' },
  { en: { title: 'Food', description: 'Local cuisine, cafes and restaurants.' }, dv: { title: 'ކާނާ', description: 'ދިވެހި ކެއުމާއި ރެސްޓޯރެންޓްތައް.' }, icon: 'Utensils', color: '#EF4444' },
  { en: { title: 'Events', description: 'Upcoming festivals and community events.' }, dv: { title: 'ހަރަކާތްތައް', description: 'ކުރިއަށް ހުރި ހަރަކާތްތަކާއި ފެސްޓިވަލްތައް.' }, icon: 'Calendar', color: '#8B5CF6' },
  { en: { title: 'Nature', description: 'Beaches, reefs and marine life.' }, dv: { title: 'ޠަބީޢަތް', description: 'ގޮނޑުދޮށާއި ފަރުތަކާއި ކަނޑުގެ ދިރުން.' }, icon: 'Waves', color: '#10B981' },
  { en: { title: 'News', description: 'Local island news and updates.' }, dv: { title: 'ޚަބަރު', description: 'ރަށްރަށުގެ އެންމެ ފަހުގެ ޚަބަރުތައް.' }, icon: 'Newspaper', color: '#6366F1' },
]

export const islandsData = [
  {
    en: {
      name: 'Hulhumalé',
      description: 'A reclaimed island near Malé with modern housing, wide beaches and easy airport access.',
      atoll: 'Kaafu Atoll (Malé City)',
      bestTimeToVisit: 'November to April, during the dry season.',
      attractions: [
        { title: 'Hulhumalé Beach Park', description: 'A long stretch of white sand popular for evening walks and picnics.' },
        { title: 'Central Park', description: "The island's main green space with walking trails." },
      ],
    },
    dv: {
      name: 'ހުޅުމާލެ',
      description: 'މާލެއާ ކައިރީ ހިއްކާފައިވާ ރަށެއް، ޒަމާނީ ބޯހިޔާވަހިކަމާއި ފުޅާ ގޮނޑުދޮށްތަކާއެކު، އެއަރޕޯޓާ ވެސް ކައިރި.',
      atoll: 'ކާފު އަތޮޅު (މާލެ ސިޓީ)',
      bestTimeToVisit: 'ނޮވެންބަރުން އޭޕްރީލްއަށް، ހިކި މޫސުމުގައި.',
      attractions: [
        { title: 'ހުޅުމާލެ ބީޗް ޕާކް', description: 'ހަވީރު ހިނގާލުމަށާއި ޕިކްނިކަށް މަޝްހޫރު ދިގު ހުދު ވެލީގެ ސަރަހައްދެއް.' },
        { title: 'ސެންޓްރަލް ޕާކް', description: 'ހިނގާލެވޭ މަގުތަކާއެކު ރަށުގެ މައި ފެހި ސަރަހައްދު.' },
      ],
    },
    lat: 4.2105,
    lng: 73.5411,
  },
  {
    en: {
      name: 'Maafushi',
      description: 'A popular local-island destination for budget tourism, guesthouses and water sports.',
      atoll: 'Kaafu Atoll',
      bestTimeToVisit: 'December to March for calm seas and sunshine.',
      attractions: [
        { title: 'Bikini Beach', description: 'A designated tourist beach on the eastern side of the island.' },
        { title: 'Sandbank trips', description: 'Day trips to nearby uninhabited sandbanks for swimming and photos.' },
      ],
    },
    dv: {
      name: 'މާފުށި',
      description: 'ބަޖެޓް ފަތުރުވެރިކަމަށާއި ގެސްޓް ހައުސްތަކަށާއި ފެތުމުގެ ކުޅިވަރުތަކަށް މަޝްހޫރު ރަށެއް.',
      atoll: 'ކާފު އަތޮޅު',
      bestTimeToVisit: 'ޑިސެންބަރުން މާރިޗަށް، މަޑު ކަނޑާއި ރީތި ދުވަސްވަރެއް.',
      attractions: [
        { title: 'ބިކިނީ ބީޗް', description: 'ރަށުގެ އިރުމަތީ ފަރާތުގައި ފަތުރުވެރިންނަށް ޚާއްޞަ ގޮނޑުދޮށެއް.' },
        { title: 'ސެންޑްބޭންކް ދަތުރު', description: 'ކައިރީގައިވާ ފަޅުރަށްރަށަށް ފެތުމަށާއި ފޮޓޯނެގުމަށް ދުވަހުގެ ދަތުރު.' },
      ],
    },
    lat: 3.9415,
    lng: 73.4907,
  },
  {
    en: {
      name: 'Thulusdhoo',
      description: "Known among surfers for its world-class breaks and home to the Maldives' original soft-drink factory.",
      atoll: 'Kaafu Atoll',
      bestTimeToVisit: 'March to October for the best surf swells.',
      attractions: [
        { title: 'Cokes surf point', description: 'A famous reef break just off the island, named after the nearby factory.' },
        { title: 'House reef snorkeling', description: 'Easy shore access to coral reef and marine life.' },
      ],
    },
    dv: {
      name: 'ތުލުސްދޫ',
      description: 'ސާފިންއަށް މަޝްހޫރު ރަށެއް، ދިވެހިރާއްޖޭގެ އެންމެ ފުރަތަމަ ބުއިންޗާ ފެކްޓަރީ ވެސް ހުންނަނީ މިރަށުގައި.',
      atoll: 'ކާފު އަތޮޅު',
      bestTimeToVisit: 'މާރިޗުން އޮކްޓޯބަރަށް، ސާފިންއަށް އެންމެ ރަނގަޅު ދުވަސްވަރު.',
      attractions: [
        { title: 'ކޯކްސް ސާފް ޕޮއިންޓް', description: 'ރަށާ ކައިރީގައިވާ މަޝްހޫރު ފަރު ބްރޭކެއް.' },
        { title: 'ހައުސް ރީފް ސްނޯކްލިންގ', description: 'ގޮނޑުދޮށުން ފަސޭހައިން ފަރަށާއި ކަނޑުގެ ދިރުމަށް ވާސިލްވެވޭ.' },
      ],
    },
    lat: 4.3755,
    lng: 73.6453,
  },
]

export const placesData: Array<{
  en: { name: string; description: string }
  dv: { name: string; description: string }
  type: 'thingsToDo' | 'placesToVisit' | 'beach'
  islandIndex: number
  openingHours: { en: string; dv: string }
  tags: Array<{ en: string; dv: string }>
}> = [
  {
    en: { name: 'Bikini Beach', description: 'The designated tourist beach on Maafushi, popular for swimming and sunbathing.' },
    dv: { name: 'ބިކިނީ ބީޗް', description: 'މާފުށީގައި ފަތުރުވެރިންނަށް ޚާއްޞަ ގޮނޑުދޮށް، ފެތުމަށާއި އިރުގަނޑު ހޫނުކުރުމަށް މަޝްހޫރު.' },
    type: 'beach',
    islandIndex: 1,
    openingHours: { en: 'Open 24 hours', dv: '24 ގަޑިއިރު ހުޅުވިފައި' },
    tags: [{ en: 'Swimming', dv: 'ފެތުން' }, { en: 'Sunset', dv: 'އިރުއޮއްސުން' }],
  },
  {
    en: { name: 'Sandbank Picnic Trip', description: 'A half-day boat trip to a nearby uninhabited sandbank.' },
    dv: { name: 'ސެންޑްބޭންކް ޕިކްނިކް ދަތުރު', description: 'ކައިރީގައިވާ ފަޅުވެލިގަނޑަކަށް ދޯނީގައި ކުރާ ދަތުރެއް.' },
    type: 'thingsToDo',
    islandIndex: 1,
    openingHours: { en: 'Half-day trips, morning and afternoon', dv: 'ދުވާލުގެ ދެބައިކުޅަ ދަތުރު، ހެނދުނާއި މެންދުރުފަހު' },
    tags: [{ en: 'Snorkeling', dv: 'ސްނޯކްލިންގ' }, { en: 'Drone Photos', dv: 'ޑްރޯން ފޮޓޯ' }],
  },
  {
    en: { name: 'Hulhumalé Beach Park', description: 'A long stretch of white sand beach with cafes nearby, great for evenings.' },
    dv: { name: 'ހުޅުމާލެ ބީޗް ޕާކް', description: 'ކައިރީގައި ކެފޭތައް ހުންނަ ދިގު ހުދު ވެލީގެ ގޮނޑުދޮށެއް، ހަވީރު ދިއުމަށް ރަނގަޅު.' },
    type: 'beach',
    islandIndex: 0,
    openingHours: { en: 'Open 24 hours', dv: '24 ގަޑިއިރު ހުޅުވިފައި' },
    tags: [{ en: 'Family Friendly', dv: 'ޢާއިލީ' }, { en: 'Sunset', dv: 'އިރުއޮއްސުން' }],
  },
  {
    en: { name: 'Cokes Surf Point', description: 'A world-famous reef break just off Thulusdhoo, popular with surfers.' },
    dv: { name: 'ކޯކްސް ސާފް ޕޮއިންޓް', description: 'ތުލުސްދޫ ކައިރީގައިވާ ދުނިޔެ ފެންވަރުގެ ސާފް ބްރޭކެއް.' },
    type: 'placesToVisit',
    islandIndex: 2,
    openingHours: { en: 'Best March to October', dv: 'މާރިޗުން އޮކްޓޯބަރަށް އެންމެ ރަނގަޅު' },
    tags: [{ en: 'Surfing', dv: 'ސާފިން' }],
  },
  {
    en: { name: 'House Reef Snorkeling', description: 'Shore-access coral reef with abundant marine life, right off the island.' },
    dv: { name: 'ހައުސް ރީފް ސްނޯކްލިންގ', description: 'ގޮނޑުދޮށުން ފަސޭހައިން ދެވޭ ފަރެއް، ކަނޑުގެ ދިރުން ގިނަ.' },
    type: 'thingsToDo',
    islandIndex: 2,
    openingHours: { en: 'Best at low tide', dv: 'ފެން ބޭލޭ ވަގުތު އެންމެ ރަނގަޅު' },
    tags: [{ en: 'Snorkeling', dv: 'ސްނޯކްލިންގ' }],
  },
]

export const businessesData: Array<{
  en: { name: string; description: string; address: string; hours: string }
  dv: { name: string; description: string; address: string; hours: string }
  category: 'restaurant' | 'shop' | 'accommodation' | 'service'
  islandIndex: number
  phone: string
  rating: number
  featured: boolean
}> = [
  {
    en: { name: 'Sea Breeze Café', description: 'A relaxed beachside café serving local and western breakfast.', address: 'Beach Road, Maafushi', hours: '7:00 AM – 10:00 PM' },
    dv: { name: 'ސީ ބްރީޒް ކެފޭ', description: 'ގޮނޑުދޮށުގައި ހުންނަ ހަމަޖެހޭ ކެފޭއެއް، ދިވެހި އަދި ހުޅަނގުގެ ސައިހަދާ.', address: 'ބީޗް ރޯޑް، މާފުށި', hours: '7:00 ހެނދުނުން 10:00 ރޭގަނޑަށް' },
    category: 'restaurant',
    islandIndex: 1,
    phone: '+960 331 2345',
    rating: 4.5,
    featured: true,
  },
  {
    en: { name: 'Kaani Beach Hotel', description: 'A comfortable guesthouse steps from the main beach.', address: 'Airport Road, Maafushi', hours: '24 hours' },
    dv: { name: 'ކާނި ބީޗް ހޮޓެލް', description: 'މައި ގޮނޑުދޮށާ ކައިރީގައި ހުންނަ ފަސޭހަ ގެސްޓް ހައުސްއެއް.', address: 'އެއަރޕޯޓް ރޯޑް، މާފުށި', hours: '24 ގަޑިއިރު' },
    category: 'accommodation',
    islandIndex: 1,
    phone: '+960 331 5566',
    rating: 4.2,
    featured: true,
  },
  {
    en: { name: 'Central Grocery', description: 'The main grocery shop for daily essentials and snacks.', address: 'Main Street, Hulhumalé', hours: '8:00 AM – 11:00 PM' },
    dv: { name: 'ސެންޓްރަލް ގްރޯސަރީ', description: 'ދުވަހުން ދުވަހަށް ބޭނުންވާ ތަކެއްޗާއި ސްނެކްސް ލިބޭ މައި ފިހާރަ.', address: 'މައި ސްޓްރީޓް، ހުޅުމާލެ', hours: '8:00 ހެނދުނުން 11:00 ރޭގަނޑަށް' },
    category: 'shop',
    islandIndex: 0,
    phone: '+960 330 1122',
    rating: 4.0,
    featured: false,
  },
  {
    en: { name: 'Thulusdhoo Dive Center', description: 'PADI dive courses and guided trips to nearby surf and dive sites.', address: 'Harbor Area, Thulusdhoo', hours: '8:00 AM – 6:00 PM' },
    dv: { name: 'ތުލުސްދޫ ޑައިވް ސެންޓަރ', description: 'PADI ޑައިވިންގ ކޯސްތަކާއި ކައިރީގައިވާ ސާފް އަދި ޑައިވް ސައިޓްތަކަށް ދަތުރު.', address: 'ފަޅު ސަރަހައްދު، ތުލުސްދޫ', hours: '8:00 ހެނދުނުން 6:00 ހަވީރަށް' },
    category: 'service',
    islandIndex: 2,
    phone: '+960 332 7788',
    rating: 4.8,
    featured: true,
  },
]

export const postsData = [
  {
    en: {
      title: 'New Ferry Route Connects Hulhumalé and Malé',
      excerpt: 'A faster public ferry schedule has launched between Hulhumalé and Malé.',
    },
    dv: {
      title: 'ހުޅުމާލެއާއި މާލެ ގުޅުވައިދޭ އައު ފެރީ ރޫޓެއް',
      excerpt: 'ހުޅުމާލެއާއި މާލެއާ ދެމެދު ހަލުވި ފެރީ ޝެޑިއުލެއް ފަށައިފި.',
    },
    islandIndex: 0,
    categoryIndex: 5,
  },
  {
    en: {
      title: 'Maafushi Turns into a Tourist Hotspot',
      excerpt: 'Guesthouses on Maafushi report record bookings this season.',
    },
    dv: {
      title: 'މާފުށި ފަތުރުވެރިކަމުގެ މަގުބޫލު މަންޒިލަކަށް',
      excerpt: 'މިސީޒަނުގައި މާފުށީގެ ގެސްޓް ހައުސްތަކަށް ރެކޯޑް ބުކިންގތަކެއް.',
    },
    islandIndex: 1,
    categoryIndex: 0,
  },
  {
    en: {
      title: "Thulusdhoo's Surf Season Begins",
      excerpt: 'Surfers from around the world are arriving as the swell season starts.',
    },
    dv: {
      title: 'ތުލުސްދޫގެ ސާފިން ސީޒަން ފެށިއްޖެ',
      excerpt: 'ސާފް ސީޒަން ފެށުމާއެކު ދުނިޔޭގެ އެކި ކަންކޮޅުތަކުން ސާފަރުން ދަނީ ޒިޔާރަތްކުރަމުން.',
    },
    islandIndex: 2,
    categoryIndex: 4,
  },
]

export const testimonialsData = [
  { en: { quote: 'A perfect guide to plan our island hopping trip. Loved the local business directory!', role: 'Visitor' }, dv: { quote: 'ރަށްރަށަށް ދަތުރު ރޭވުމަށް ފުރިހަމަ މަގުދައްކާ ފޮތެއް. ލޯކަލް ބިޒްނަސް ޑައިރެކްޓަރީ ވަރަށް ބޭނުންތެރި!', role: 'ފަތުރުވެރިޔެއް' }, name: 'Sarah T.' },
  { en: { quote: "Great to finally have all our island's businesses and places in one place.", role: 'Resident' }, dv: { quote: 'އަޅުގަނޑުމެންގެ ރަށުގެ ހުރިހާ ވިޔަފާރިތަކާއި ތަންތަން އެއްތަނަކުން ފެނުމުން ވަރަށް ބޭނުންތެރި.', role: 'ރައްޔިތެއް' }, name: 'Ahmed R.' },
  { en: { quote: 'The ferry schedule and quick facts saved us a lot of time during our trip.', role: 'Visitor' }, dv: { quote: 'ފެރީ ޝެޑިއުލްއާއި ކުއިކް ފެކްޓްސް ދަތުރުގައި ވަރަށް ވަގުތު ސަލާމަތްކޮށްދިން.', role: 'ފަތުރުވެރިޔެއް' }, name: 'Lisa M.' },
]

export const quickFactsData = [
  { en: { label: 'Islands Covered', value: '3' }, dv: { label: 'ހިމެނޭ ރަށްތައް', value: '3' }, icon: 'MapPin' },
  { en: { label: 'Atoll', value: 'Kaafu' }, dv: { label: 'އަތޮޅު', value: 'ކާފު' }, icon: 'Globe' },
  { en: { label: 'Nearest Airport', value: 'Velana Intl. (MLE)' }, dv: { label: 'އެންމެ ކައިރި އެއަރޕޯޓް', value: 'ވެލާނާ އިންޓަރނޭޝަނަލް' }, icon: 'Plane' },
  { en: { label: 'Ferry from Malé', value: '30–90 min' }, dv: { label: 'މާލެއިން ފެރީ', value: '30–90 މިނިޓް' }, icon: 'Ship' },
  { en: { label: 'Currency', value: 'MVR / USD' }, dv: { label: 'ފައިސާ', value: 'ދިވެހި ރުފިޔާ / ޑޮލަރު' }, icon: 'Landmark' },
  { en: { label: 'Time Zone', value: 'GMT+5' }, dv: { label: 'ގަޑިޒޯން', value: 'GMT+5' }, icon: 'Clock' },
]

export const emergencyContactsData = {
  en: [
    { label: 'Police', phone: '119' },
    { label: 'Ambulance / Fire', phone: '102' },
    { label: 'Coast Guard', phone: '191' },
  ],
  dv: [
    { label: 'ފުލުހުން', phone: '119' },
    { label: 'އެމްބިއުލާންސް / ފަޔަރ', phone: '102' },
    { label: 'ކޯސްޓް ގާޑް', phone: '191' },
  ],
}
