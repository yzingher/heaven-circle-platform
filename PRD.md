# Heaven Circle — Platform PRD

## 1. Overview

**Heaven Circle** is an elite, invite-only erotic events community founded in 2012, operating across London, New York, and Los Angeles. The brand is built on three pillars: **luxury, liberation, and discretion**. Its flagship experience — *Nights of St Francis* — sets the standard for curated adult social gatherings worldwide.

This document specifies a **Progressive Web App (PWA)** that extends the Heaven Circle experience into a digital platform. The platform must feel as intentional and refined as the events themselves — no clutter, no compromise, no exposure. Every interaction should reinforce that the member is inside something exclusive.

**Target URL:** heavencircle.com

---

## 2. Goals

| # | Goal |
|---|------|
| G1 | Give members a single, elegant hub to discover events, purchase tickets, and manage their social circle |
| G2 | Enable **online parties** — ephemeral, structured group experiences that auto-delete at midnight |
| G3 | Provide concierge staff with software-assisted matchmaking tools |
| G4 | Preserve anonymity — username-based identity, no real names required |
| G5 | Deliver a mobile-first PWA that installs to home screen and feels native |
| G6 | Maintain the brand's luxury aesthetic and discretion at every touchpoint |

---

## 3. Out of Scope

- Native iOS / Android apps (PWA covers mobile)
- Payment processor selection and merchant account setup (see Open Questions)
- Content moderation AI / automated nudity detection
- Video or audio streaming during online parties
- Public-facing marketing site (separate concern)
- Admin analytics dashboard (future phase)

---

## 4. Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Frontend** | Next.js 14+ (App Router) | RSC, SSR, PWA-ready, excellent DX |
| **Styling** | Tailwind CSS + Radix UI primitives | Rapid, accessible, themeable |
| **PWA** | next-pwa / Serwist | Service worker, offline shell, installability |
| **Backend** | Next.js API routes + tRPC | End-to-end type safety, co-located with frontend |
| **Database** | PostgreSQL (via Supabase or Neon) | Relational integrity, row-level security |
| **ORM** | Drizzle ORM | Lightweight, type-safe, migration-friendly |
| **Auth** | NextAuth.js (Credentials provider) | Username/password, no OAuth required |
| **Realtime** | Supabase Realtime or Ably | Online party group feed, DM presence |
| **File Storage** | S3-compatible (Cloudflare R2 or Supabase Storage) | Profile photos, party prompt responses |
| **Scheduling** | pg_cron or Vercel Cron | Timed prompt delivery, midnight cleanup |
| **Hosting** | Vercel | Edge-first, zero-config Next.js |

---

## 5. File Structure

```
heaven-circle-platform/
├── PRD.md
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── drizzle.config.ts
├── tsconfig.json
├── .env.example
├── public/
│   ├── manifest.json
│   ├── sw.js
│   ├── icons/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout — dark luxury theme
│   │   ├── page.tsx                # Landing / home (authenticated)
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── events/
│   │   │   ├── page.tsx            # Event listings
│   │   │   └── [eventId]/page.tsx  # Event detail + ticket purchase
│   │   ├── parties/
│   │   │   ├── page.tsx            # My online parties
│   │   │   └── [partyId]/page.tsx  # Live party room
│   │   ├── messages/
│   │   │   ├── page.tsx            # Conversation list
│   │   │   └── [threadId]/page.tsx # DM thread
│   │   ├── profile/
│   │   │   ├── page.tsx            # Own profile / edit
│   │   │   └── [username]/page.tsx # View member profile
│   │   ├── friends/
│   │   │   └── page.tsx            # Friends list + requests
│   │   ├── concierge/
│   │   │   ├── page.tsx            # Concierge dashboard
│   │   │   └── match/[matchId]/page.tsx
│   │   └── api/
│   │       └── trpc/[trpc]/route.ts
│   ├── server/
│   │   ├── trpc/
│   │   │   ├── router.ts           # Root router
│   │   │   ├── context.ts
│   │   │   └── routers/
│   │   │       ├── auth.ts
│   │   │       ├── events.ts
│   │   │       ├── parties.ts
│   │   │       ├── messages.ts
│   │   │       ├── profiles.ts
│   │   │       ├── friends.ts
│   │   │       └── matchmaking.ts
│   │   └── db/
│   │       ├── schema.ts           # Drizzle schema
│   │       ├── index.ts            # DB client
│   │       └── migrations/
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── realtime.ts
│   │   ├── storage.ts
│   │   └── scheduling.ts
│   ├── components/
│   │   ├── ui/                     # Shared primitives
│   │   ├── events/
│   │   ├── parties/
│   │   ├── messages/
│   │   ├── profile/
│   │   └── matchmaking/
│   ├── hooks/
│   └── styles/
│       └── globals.css
└── drizzle/
    └── migrations/
```

---

## 6. Features & Requirements

### 6.1 Authentication & Identity

- **Username-based registration** — no email required (email optional for recovery)
- Password hashed with bcrypt/argon2
- Session tokens via NextAuth with JWT strategy
- **Invite-only gating:** new accounts require a valid invite code
- Profile creation flow immediately after registration

### 6.2 Profiles & Stories

- **Fields:** username (unique, immutable), display name (optional), bio (500 chars), city, photos (up to 6), age range preference, orientation tags
- **Stories:** short-form posts (photo + caption) visible to friends or all members; auto-expire after 24h
- Photos stored in S3-compatible bucket with signed URLs (no public links)
- **Privacy:** profiles visible only to other authenticated members; no search engine indexing

### 6.3 Event Listings

- Admin/concierge can create events with:
  - Title, description (rich text), cover image
  - Date, time, city (London / New York / LA)
  - Capacity, ticket tiers, dress code
  - Event type: `in-person` | `online-party`
- Members browse upcoming events filtered by city
- Event detail page with full info and ticket purchase CTA
- Past events shown in archive (no ticket purchase)

### 6.4 Ticketing

- Members can purchase tickets to events (in-person and online parties)
- Ticket grants access — for online parties, this means entry to the party room
- Ticket status: `purchased` → `checked-in` (for in-person) or `active` (for online)
- **Implementation detail deferred** — see Open Questions §9

### 6.5 Online Parties ⭐

This is the signature digital experience. The flow:

#### Pre-Party (Day of Event, 8:00 AM – Party Start)

1. Member with a valid ticket sees the party room unlock at **8:00 AM** (event timezone)
2. At **scheduled prompt times** (configurable per event, e.g. 9:00, 10:00, 12:00, 14:00, 16:00, 18:00, 20:00), a prompt is pushed to all ticket holders:
   - Example prompts:
     - *"Introduce yourself — share a photo and tell us who you are tonight"*
     - *"What's your fantasy for this evening?"*
     - *"What are you hoping to find tonight?"*
     - *"Share something that turns you on"*
   - Prompts are configurable per event by concierge/admin
3. Member submits a response: **photo (optional) + text**
4. Responses are **held** until the prompt's scheduled time, then **all responses for that slot are posted simultaneously** to the group feed
5. Between prompts, the group feed is visible and scrollable — members see all prior responses

#### Party Phase (Evening – Midnight)

6. The group feed becomes a **live chat** — members can post freely
7. Members can view each other's profiles from the feed
8. **Add Friend** button on every member card in the feed — one tap to send a friend request
9. Members can open **DMs** with anyone in the party

#### Midnight Auto-Delete

10. At **midnight** (event timezone), the party room is **permanently destroyed**:
    - All group messages deleted
    - All prompt responses deleted
    - All uploaded photos for that party deleted
    - The party record is marked `archived` (metadata retained for analytics, content gone)
11. **Friends and DM threads persist** — connections made during the party survive deletion

#### Technical Requirements

- Realtime feed via WebSocket / Supabase Realtime channel
- Scheduled prompt delivery via cron job (fires at each prompt time, pushes notification + unlocks submission)
- Midnight cleanup job: hard-delete all party content rows + storage objects
- Rate limiting on posts during live chat phase
- Party room is a **single shared channel** — no sub-rooms

### 6.6 Messaging (DMs)

- 1:1 direct messages between any two members
- Thread-based UI (conversation list → thread view)
- Realtime delivery via WebSocket
- Photo sharing in DMs (same signed-URL pattern as profiles)
- Read receipts (optional, member can disable)
- **No group DMs** — the online party feed serves that purpose
- Message retention: indefinite (member can delete own messages)

### 6.7 Friends & Community

- **Add Friend** sends a request; both parties must accept
- Friends list with online/offline presence indicator
- Friends can see each other's stories
- **Circle:** a member's friends list is their personal community, built organically through parties and DMs
- Unfriend / block actions available
- Blocked members cannot send DMs, friend requests, or see your profile

### 6.8 Matchmaking (Concierge-Assisted)

- **Concierge dashboard** (role-gated) shows all members attending a given event
- Concierge can view profiles, preferences, orientation tags, past event attendance
- **Software-assisted suggestions:** system highlights potential pairings based on:
  - Mutual preference overlap (orientation, age range, interests)
  - Complementary "looking for" tags
  - Past positive interactions (friended each other, attended same events)
- Concierge **manually creates a match** — selects two members, writes a personal intro
- Both members receive a notification: *"Your concierge has suggested a connection"*
- Members can accept (opens a DM with the intro message) or decline (no reason required)
- Match history tracked for concierge review

---

## 7. Milestones

Each milestone is scoped to approximately **one coding agent session** (~2–4 hours of focused implementation).

### M1 — Foundation & Auth

- Next.js project scaffolding with Tailwind, PWA manifest, dark luxury theme
- Database schema (users, sessions, invite_codes)
- Auth flow: register (with invite code), login, session management
- Protected route middleware
- Basic layout shell: nav, footer, mobile-responsive frame

**Deliverable:** A running PWA where invited users can register, log in, and see an empty home screen.

### M2 — Profiles, Events & Friends

- Profile schema + CRUD (bio, photos, tags)
- Profile view page (own + other members)
- Event schema + listing page + detail page
- Friends schema (request/accept/block)
- Friends list page
- Photo upload to S3-compatible storage with signed URLs

**Deliverable:** Members can complete profiles, browse events, view each other, and add friends.

### M3 — Messaging & Realtime

- Messages schema (threads + messages)
- DM thread UI with realtime delivery
- Conversation list with last message preview
- Photo sharing in DMs
- Read receipts
- Online presence indicators (friends list)
- Push notification registration (PWA push API)

**Deliverable:** Fully functional 1:1 messaging with realtime updates.

### M4 — Online Parties ⭐

- Party schema (party, prompts, responses, group_messages)
- Party room page with state machine: `locked` → `pre-party` → `live` → `archived`
- Scheduled prompt delivery (cron triggers at configured times)
- Prompt response submission + batched reveal at slot time
- Live chat feed (realtime)
- Add-friend and open-DM from party feed
- Midnight auto-delete cron job (content + storage purge)
- Ticket-gated entry to party room

**Deliverable:** End-to-end online party flow from ticket purchase through midnight deletion.

### M5 — Matchmaking & Polish

- Concierge role + dashboard
- Member browsing with filter/sort for concierge
- Software-assisted match suggestions (scoring algorithm)
- Match creation flow (select pair, write intro, send)
- Member-facing match notification + accept/decline
- Stories feature (24h expiring posts)
- PWA install prompt, offline shell, performance audit
- Final UI polish: animations, loading states, error handling

**Deliverable:** Complete platform ready for private beta.

---

## 8. Acceptance Criteria

| # | Criterion |
|---|-----------|
| AC1 | New member can register with invite code, set username/password, and create profile with photos |
| AC2 | Event listing page shows upcoming events filtered by city; detail page shows full info |
| AC3 | Member can purchase ticket to an online party and see the party room appear in "My Parties" |
| AC4 | On party day, prompts arrive at scheduled times; member can submit response (text + photo) |
| AC5 | At each prompt time, all responses for that slot appear simultaneously in the group feed |
| AC6 | During live phase, members can chat freely in the party feed in realtime |
| AC7 | Member can add another member as friend directly from the party feed |
| AC8 | At midnight, all party content (messages, responses, photos) is permanently deleted; friends and DMs persist |
| AC9 | Two members can exchange DMs in realtime with photo sharing |
| AC10 | Concierge can view attendee profiles, receive match suggestions, and create a match that notifies both members |
| AC11 | PWA installs to home screen, loads offline shell, and scores ≥90 on Lighthouse PWA audit |
| AC12 | No real identity is exposed anywhere in the UI — username is the sole public identifier |

---

## 9. Open Questions

| # | Question | Notes |
|---|----------|-------|
| OQ1 | **Payment processor & merchant account** | Adult-adjacent content creates merchant risk. Stripe may decline; alternatives include CCBill, Segpay, or crypto. Needs business decision before M4. |
| OQ2 | **Invite code distribution** | How are invite codes generated and distributed? Admin-only? Member referrals with limits? |
| OQ3 | **Photo moderation** | Are explicit photos allowed in profiles/parties? If so, what moderation approach? Human review? AI? |
| OQ4 | **Timezone handling for online parties** | Are all parties pinned to a single timezone (e.g., event city) or do they adapt to the member's local time? |
| OQ5 | **Data retention & GDPR** | Midnight deletion handles party content, but what about DMs, profiles, and account data? Need a deletion/export policy. |
| OQ6 | **Notification delivery** | PWA push notifications have limited reliability on iOS. Is email/SMS fallback needed for prompt delivery? |
| OQ7 | **Concierge staffing** | How many concierges? Do they need shift/assignment tooling, or is this a single-operator system initially? |
| OQ8 | **Rate limiting & abuse** | What are the limits on DMs, friend requests, and party chat messages? Need anti-spam thresholds. |

---

*PRD authored by Archie — claude-opus-4-6 — March 2026*
