# Island Blog CMS - Setup Documentation

## Overview

Your CMS is now configured as a **Local Island Blog** system with full support for Dhivehi (ދިވެހި) as the primary language, inspired by the design patterns from **Mihaaru** (a Maldivian news site) and **Airbnb** (card-based listings).

## Key Features

### 1. **Localization**
- **Default Language**: Dhivehi (ދިވެހި)
- **Secondary Language**: English
- **RTL Support**: Full right-to-left text support for Dhivehi
- All content fields are localized for both languages

### 2. **Content Collections**

#### **Posts**
- Blog articles/news items
- Fields:
  - Title (localized)
  - Rich text content with blocks
  - Categories (multiple)
  - Island (single) - link to specific island
  - Authors
  - Publish date
  - SEO metadata
  - Featured image
- **Access**: Authenticated users can create/edit, published posts are public

#### **Categories**
- Blog categories/topics for organizing posts
- Fields:
  - Title (localized)
  - Slug (auto-generated)
  - Description (localized)
  - Icon name (e.g., "MapPin", "Camera", "Waves")
  - Color code (hex) for UI display
- Examples: Travel, Food, Culture, Events, Nature, Sports

#### **Islands**
- Individual islands or atolls in the Maldives
- Fields:
  - Name (localized)
  - Slug (auto-generated)
  - Description (localized)
  - Featured image
  - Location details:
    - Latitude/Longitude (GPS coordinates)
    - Atoll name
  - Attractions (array) - key points of interest
  - Best time to visit (seasonal information)
- Fully localized for Dhivehi and English

### 3. **UI Components**

#### **BlogArchive Block**
A dedicated block component for displaying blog posts with filters:
- **Features**:
  - Grid layout (1 col mobile, 2 col tablet, 3 col desktop)
  - Category filter pills with custom colors
  - Island location filter with emoji badge
  - Post cards showing:
    - Featured image
    - Category badges
    - Island location
    - Post title
    - Publication date
  - Pagination support
  - Responsive design with Tailwind CSS
  - Full RTL support for Dhivehi

- **Configuration Options**:
  - Intro content (rich text)
  - Posts per page limit
  - Show/hide category filter
  - Show/hide island filter
  - Featured categories (optional)
  - Featured islands (optional)

## Usage Guide

### Creating a Blog Post

1. Go to **Posts** collection in Payload CMS admin
2. Click **Create New Post**
3. Fill in:
   - **Title** - in Dhivehi and English
   - **Content** - Use the rich text editor (supports headings, code blocks, media)
   - **Categories** - Select one or more categories
   - **Island** - Select which island this post is about
   - **Authors** - Select post author(s)
   - **Meta** - Set SEO title, description, and featured image
4. **Publish** when ready

### Creating a Category

1. Go to **Categories** collection
2. Click **Create New Category**
3. Fill in:
   - **Title** - in Dhivehi and English
   - **Description** - Brief description
   - **Icon** - Icon name from Lucide React (MapPin, Camera, Waves, Fish, Fork, etc.)
   - **Color** - Hex color code (e.g., #FF6B6B for red)
4. **Save**

### Creating an Island

1. Go to **Islands** collection
2. Click **Create New Island**
3. Fill in:
   - **Name** - Island name in Dhivehi and English
   - **Description** - About the island
   - **Image** - Featured image of the island
   - **Location**:
     - GPS coordinates (latitude/longitude)
     - Atoll name (e.g., "Malé City", "Ari Atoll")
   - **Attractions** - List main attractions with descriptions
   - **Best Time to Visit** - Seasonal information
4. **Save**

### Creating a Blog Landing Page

1. Go to **Pages** collection
2. Create a new page (e.g., slug: `blog`)
3. Add a **BlogArchive Block** in the Content section
4. Configure:
   - Add intro text explaining your blog
   - Choose to show category and island filters
   - Set posts per page
   - Optionally feature specific categories or islands
5. **Publish**

## Design Inspiration

### From Mihaaru (ދިވެހި - Maldivian News Site)
- Clean, organized news layout
- Category-based organization
- Multiple content sections
- Section headers with clear hierarchy
- Related posts/content linking

### From Airbnb
- Card-based listing design
- Image-heavy presentation
- Rating/quality indicators (we use featured images)
- Organized filter system
- Quick scanning layout (title, location, key info)

## Database Setup

All data is stored in **MongoDB Atlas**. If you encounter:
- "Connection refused" → Check IP whitelist in MongoDB Atlas
- "DNS not found" → Verify connection string in `.env`

**Example .env setup:**
```
DATABASE_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## Technology Stack

- **CMS**: Payload CMS v3
- **Database**: MongoDB Atlas
- **Frontend**: Next.js 14 with React
- **Styling**: Tailwind CSS
- **Localization**: Custom i18n system with RTL support
- **Editor**: Lexical (rich text)
- **Rich Block Components**: Custom blocks for blog content

## File Structure

```
src/
├── collections/
│   ├── Categories.ts          # Category definitions
│   ├── Islands.ts             # Island/atoll definitions
│   ├── Posts/                 # Blog post collection
│   │   ├── index.ts
│   │   └── hooks/
│   └── Pages/                 # Page collection
├── blocks/
│   ├── BlogArchive/           # NEW: Blog listing block
│   │   ├── config.ts          # Block configuration
│   │   └── Component.tsx      # Blog UI component
│   ├── ArchiveBlock/          # Generic archive block
│   ├── Content/               # Content block
│   ├── MediaBlock/            # Media block
│   └── RenderBlocks.tsx       # Block renderer
├── components/
│   ├── RichText/              # Rich text renderer
│   └── ...
├── i18n/
│   └── localization.ts        # Language setup (NOW: dv default)
├── payload.config.ts          # Main CMS config (Islands added)
└── payload-types.ts           # Auto-generated types
```

## Next Steps / Enhancements

### Optional Features to Add:
1. **Post Tags** - In addition to categories (for micro-topics)
2. **Author Profiles** - Author bio, avatar, social links
3. **Comments System** - Reader engagement
4. **Related Posts Block** - Show similar content
5. **Search** - Full-text search across posts
6. **Newsletter Signup** - Collections for subscriptions
7. **Image Gallery** - Multi-image support per post
8. **Video Embeds** - YouTube, local video hosting
9. **Social Sharing** - Share to social networks
10. **Analytics** - Track popular posts

### Content Ideas:
- **Travel Guides**: Detailed island guides
- **Local Culture**: Traditional practices, events
- **Food**: Local cuisine and recipes
- **Marine Life**: Diving and snorkeling spots
- **Events**: Community events and festivals
- **News**: Local island news and updates
- **Photography**: Island scenery and wildlife

## Support

For issues with:
- **MongoDB Connection**: Check Atlas cluster settings and IP whitelist
- **Localization**: Edit `/src/i18n/localization.ts`
- **Block Rendering**: Check RenderBlocks.tsx for block registration
- **Styling**: Tailwind CSS configuration in `tailwind.config.mjs`

---

**Created**: 31 March 2026
**Language**: Dhivehi-first CMS for Local Island Blog
