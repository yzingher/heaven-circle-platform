// ============================================================
// Heaven Circle — Mock Data
// ============================================================

// ---- Users ----

export const mockUsers = [
  {
    id: '1',
    username: 'celestial_jade',
    displayName: 'Jade',
    city: 'London',
    bio: 'Adventurous spirit drawn to authentic connections and extraordinary experiences. Art collector by day, seeker of hidden beauty by night.',
    photos: [
      'https://picsum.photos/seed/jade1/400/500',
      'https://picsum.photos/seed/jade2/400/500',
      'https://picsum.photos/seed/jade3/400/500',
    ],
    orientation: ['bisexual'],
    lookingFor: ['connections', 'experiences', 'deep conversation'],
    age: 28,
    joinedDate: '2023-06-15',
    lastSeen: 'now',
    isOnline: true,
    friendStatus: 'self',
    eventsAttended: 7,
    friendsCount: 14,
    hasStory: true,
    storySeen: false,
  },
  {
    id: '2',
    username: 'midnight_roman',
    displayName: 'Roman',
    city: 'New York',
    bio: 'Curator of extraordinary moments. Believes the best conversations happen after midnight.',
    photos: [
      'https://picsum.photos/seed/roman1/400/500',
      'https://picsum.photos/seed/roman2/400/500',
    ],
    orientation: ['straight'],
    lookingFor: ['events', 'networking', 'new energy'],
    age: 35,
    joinedDate: '2022-11-01',
    lastSeen: '2 min ago',
    isOnline: true,
    friendStatus: 'friend',
    eventsAttended: 22,
    friendsCount: 48,
    hasStory: true,
    storySeen: false,
  },
  {
    id: '3',
    username: 'velvet_isadora',
    displayName: 'Isadora',
    city: 'Paris',
    bio: 'Former dancer, current provocateur. Fluent in four languages, none of them boring.',
    photos: [
      'https://picsum.photos/seed/isadora1/400/500',
      'https://picsum.photos/seed/isadora2/400/500',
    ],
    orientation: ['pansexual'],
    lookingFor: ['play', 'art', 'intimacy'],
    age: 31,
    joinedDate: '2023-02-20',
    lastSeen: '15 min ago',
    isOnline: true,
    friendStatus: 'friend',
    eventsAttended: 12,
    friendsCount: 29,
    hasStory: true,
    storySeen: true,
  },
  {
    id: '4',
    username: 'obsidian_leo',
    displayName: 'Leo',
    city: 'Los Angeles',
    bio: 'Screenwriter who prefers the real over the scripted. Collector of vivid memories.',
    photos: [
      'https://picsum.photos/seed/leo1/400/500',
    ],
    orientation: ['gay'],
    lookingFor: ['experiences', 'creative connection'],
    age: 33,
    joinedDate: '2023-08-10',
    lastSeen: '1 hr ago',
    isOnline: false,
    friendStatus: 'friend',
    eventsAttended: 5,
    friendsCount: 11,
    hasStory: false,
    storySeen: false,
  },
  {
    id: '5',
    username: 'aurora_sylvie',
    displayName: 'Sylvie',
    city: 'London',
    bio: 'Neuroscientist by training, hedonist by practice. I study pleasure, in all forms.',
    photos: [
      'https://picsum.photos/seed/sylvie1/400/500',
      'https://picsum.photos/seed/sylvie2/400/500',
      'https://picsum.photos/seed/sylvie3/400/500',
    ],
    orientation: ['bisexual'],
    lookingFor: ['intellectual connection', 'sensual experiences'],
    age: 30,
    joinedDate: '2023-09-01',
    lastSeen: '3 hrs ago',
    isOnline: false,
    friendStatus: 'friend',
    eventsAttended: 9,
    friendsCount: 22,
    hasStory: true,
    storySeen: false,
  },
  {
    id: '6',
    username: 'crimson_nikolai',
    displayName: 'Nikolai',
    city: 'Berlin',
    bio: 'Architect of spaces and experiences. I build environments where people can be entirely themselves.',
    photos: [
      'https://picsum.photos/seed/nikolai1/400/500',
    ],
    orientation: ['straight'],
    lookingFor: ['adventure', 'connections', 'events'],
    age: 38,
    joinedDate: '2022-05-14',
    lastSeen: '2 days ago',
    isOnline: false,
    friendStatus: 'none',
    eventsAttended: 31,
    friendsCount: 67,
    hasStory: false,
    storySeen: false,
  },
  {
    id: '7',
    username: 'lunar_camille',
    displayName: 'Camille',
    city: 'New York',
    bio: 'Art director and part-time muse. Chasing the edge between the beautiful and transgressive.',
    photos: [
      'https://picsum.photos/seed/camille1/400/500',
      'https://picsum.photos/seed/camille2/400/500',
    ],
    orientation: ['lesbian'],
    lookingFor: ['creative energy', 'intimacy', 'play'],
    age: 27,
    joinedDate: '2023-12-01',
    lastSeen: '30 min ago',
    isOnline: true,
    friendStatus: 'pending-sent',
    eventsAttended: 3,
    friendsCount: 8,
    hasStory: true,
    storySeen: false,
  },
  {
    id: '8',
    username: 'golden_marco',
    displayName: 'Marco',
    city: 'Milan',
    bio: 'Film producer with a taste for the unconventional. Venice by birth, the world by choice.',
    photos: [
      'https://picsum.photos/seed/marco1/400/500',
    ],
    orientation: ['straight'],
    lookingFor: ['connections', 'luxury experiences'],
    age: 42,
    joinedDate: '2022-08-20',
    lastSeen: '5 hrs ago',
    isOnline: false,
    friendStatus: 'pending-received',
    eventsAttended: 18,
    friendsCount: 55,
    hasStory: false,
    storySeen: false,
  },
  {
    id: '9',
    username: 'noir_esme',
    displayName: 'Esme',
    city: 'London',
    bio: 'Psychologist specialising in desire. I help people understand what they truly want.',
    photos: [
      'https://picsum.photos/seed/esme1/400/500',
      'https://picsum.photos/seed/esme2/400/500',
    ],
    orientation: ['bisexual'],
    lookingFor: ['deep connection', 'intimacy', 'exploration'],
    age: 34,
    joinedDate: '2023-04-11',
    lastSeen: '1 day ago',
    isOnline: false,
    friendStatus: 'none',
    eventsAttended: 14,
    friendsCount: 33,
    hasStory: false,
    storySeen: false,
  },
]

// ---- Events ----

export const mockEvents = [
  {
    id: 'evt-001',
    title: 'Nocturne Masquerade',
    description: 'An evening of theatrical abandon. Arrive masked, leave transformed. Our signature annual masquerade returns to London\'s most secretive private members\' venue — three floors of curated experiences, live music, and intimate encounters. The night begins at midnight and ends when London stops dreaming.',
    coverImage: 'https://picsum.photos/seed/nocturne/800/400',
    date: '2026-04-18',
    time: '22:00',
    city: 'London',
    venue: 'Private Members\' Club, Mayfair',
    capacity: 120,
    ticketsSold: 87,
    tiers: [
      { name: 'Eros', price: 280, available: 12, description: 'Entry + welcome ritual, dress code provided' },
      { name: 'Dionysus', price: 480, available: 8, description: 'All Eros perks + private lounge access + champagne service' },
      { name: 'Olympus', price: 950, available: 3, description: 'Full experience + private room access + personal host' },
    ],
    dressCode: 'Masquerade formal — all black or deep jewel tones. Masks required.',
    type: 'in-person',
    status: 'upcoming',
    tags: ['masquerade', 'luxury', 'immersive'],
  },
  {
    id: 'evt-002',
    title: 'The Gilded Salon',
    description: 'A curated evening of intellectual and sensual exploration. Salon-style discussions, live performance art, and invitation-only social experiences across five intimate rooms. Inspired by the Parisian salons of the 18th century — where the best minds and most liberated spirits gathered.',
    coverImage: 'https://picsum.photos/seed/salon/800/400',
    date: '2026-04-25',
    time: '20:00',
    city: 'New York',
    venue: 'Loft Privé, Tribeca',
    capacity: 80,
    ticketsSold: 61,
    tiers: [
      { name: 'Salon', price: 350, available: 14, description: 'Evening access, welcome cocktail, all rooms' },
      { name: 'Intimate', price: 650, available: 5, description: 'Salon perks + reserved private alcove + dinner' },
    ],
    dressCode: 'Gilded — metallics, silk, and velvet encouraged.',
    type: 'in-person',
    status: 'upcoming',
    tags: ['salon', 'intellectual', 'performance art'],
  },
  {
    id: 'evt-003',
    title: 'Solstice at Dusk',
    description: 'Our Los Angeles debut. An open-air evening on a private hilltop, as the city lights spread below. Dance under stars, swim in the heated pool, find your edge. Limited to 60 guests — each experience is singular and unrepeatable.',
    coverImage: 'https://picsum.photos/seed/solstice/800/400',
    date: '2026-05-08',
    time: '19:30',
    city: 'Los Angeles',
    venue: 'Private Estate, Laurel Canyon',
    capacity: 60,
    ticketsSold: 39,
    tiers: [
      { name: 'Dusk', price: 420, available: 16, description: 'Full evening access, pool, dinner' },
      { name: 'Solstice', price: 780, available: 5, description: 'All Dusk perks + villa suite access + late-night experience' },
    ],
    dressCode: 'Summer luxury — flowing fabrics, minimal, ethereal.',
    type: 'in-person',
    status: 'upcoming',
    tags: ['outdoor', 'pool', 'LA debut'],
  },
  {
    id: 'evt-004',
    title: 'Midnight Protocol — Online',
    description: 'Our intimate online experience. Join fellow circle members across the globe for an evening of guided exploration, live performance, and real-time connection through your screen. Pre-party rituals begin at 21:00. The main event runs midnight to 03:00.',
    coverImage: 'https://picsum.photos/seed/midprot/800/400',
    date: '2026-04-05',
    time: '21:00',
    city: 'Global',
    venue: 'Heaven Circle Private Stream',
    capacity: 200,
    ticketsSold: 134,
    tiers: [
      { name: 'Observer', price: 45, available: 40, description: 'Stream access + pre-party prompts' },
      { name: 'Participant', price: 90, available: 26, description: 'Observer perks + party room access + live interaction' },
    ],
    dressCode: 'Dress as you desire. Your space, your rules.',
    type: 'online-party',
    status: 'upcoming',
    tags: ['online', 'global', 'intimate'],
    partyRoomId: 'party-002',
  },
  {
    id: 'evt-005',
    title: 'The Velvet Hour — Online',
    description: 'A weekly series for our most connected members. Intimate group sessions guided by experienced hosts. This week: The Art of Anticipation. Limited to 30 participants.',
    coverImage: 'https://picsum.photos/seed/velvet/800/400',
    date: '2026-03-28',
    time: '22:00',
    city: 'Global',
    venue: 'Heaven Circle Private Stream',
    capacity: 30,
    ticketsSold: 22,
    tiers: [
      { name: 'Velvet', price: 65, available: 8, description: 'Full access — group + private room eligibility' },
    ],
    dressCode: 'Come as you are, or as you wish to be.',
    type: 'online-party',
    status: 'upcoming',
    tags: ['weekly', 'intimate', 'guided'],
  },
  {
    id: 'evt-006',
    title: 'Eclipse — The Winter Ball',
    description: 'Our most celebrated event of 2025. Two hundred guests, three floors, one unforgettable night. Memories made here live permanently.',
    coverImage: 'https://picsum.photos/seed/eclipse/800/400',
    date: '2025-12-21',
    time: '21:00',
    city: 'London',
    venue: 'Château Privé, Kensington',
    capacity: 200,
    ticketsSold: 200,
    tiers: [
      { name: 'Equinox', price: 380, available: 0, description: 'Sold out' },
      { name: 'Eclipse', price: 750, available: 0, description: 'Sold out' },
    ],
    dressCode: 'Black tie. White mask.',
    type: 'in-person',
    status: 'past',
    tags: ['winter ball', 'sold out', '2025'],
  },
]

// ---- Party Rooms ----

export const mockParties = [
  {
    id: 'party-001',
    eventId: 'evt-004',
    eventTitle: 'Midnight Protocol — Online',
    date: '2026-04-05',
    coverImage: 'https://picsum.photos/seed/midprot/800/400',
    status: 'pre-party',
    participantCount: 134,
    participants: [
      { userId: '1', username: 'celestial_jade', displayName: 'Jade', isOnline: true },
      { userId: '2', username: 'midnight_roman', displayName: 'Roman', isOnline: true },
      { userId: '3', username: 'velvet_isadora', displayName: 'Isadora', isOnline: true },
      { userId: '7', username: 'lunar_camille', displayName: 'Camille', isOnline: false },
      { userId: '5', username: 'aurora_sylvie', displayName: 'Sylvie', isOnline: false },
    ],
    prompts: [
      {
        id: 'p1',
        time: '21:00',
        slotLabel: 'Opening Ritual',
        text: 'Light a candle. Take three slow breaths. Share what you are releasing tonight — one word, or many.',
        revealTime: '2026-04-05T21:00:00',
        responses: [
          { id: 'r1', userId: '2', username: 'midnight_roman', displayName: 'Roman', text: 'Inhibition. I leave it at the door.', timestamp: '21:03' },
          { id: 'r2', userId: '3', username: 'velvet_isadora', displayName: 'Isadora', text: 'The version of myself who apologises for wanting too much.', timestamp: '21:07' },
          { id: 'r3', userId: '5', username: 'aurora_sylvie', displayName: 'Sylvie', text: 'Control. Tonight I want to feel, not manage.', timestamp: '21:12' },
        ],
      },
      {
        id: 'p2',
        time: '22:00',
        slotLabel: 'Desire Mapping',
        text: 'Describe your ideal moment tonight in exactly twelve words.',
        revealTime: '2026-04-05T22:00:00',
        responses: [
          { id: 'r4', userId: '2', username: 'midnight_roman', displayName: 'Roman', text: 'Warmth, eye contact, music, laughter, slow dissolution of all distance.', timestamp: '22:05' },
        ],
      },
      {
        id: 'p3',
        time: '23:00',
        slotLabel: 'The Threshold',
        text: 'You are about to step into the live space. Set an intention. What do you wish to give tonight?',
        revealTime: '2026-04-05T23:00:00',
        responses: [],
      },
    ],
    messages: [
      { id: 'm1', userId: '2', username: 'midnight_roman', text: 'The energy in here already... I can feel it across the wire.', timestamp: '21:01', type: 'text' },
      { id: 'm2', userId: '3', username: 'velvet_isadora', text: 'Is this always this electric before midnight?', timestamp: '21:04', type: 'text' },
      { id: 'm3', userId: '2', username: 'midnight_roman', text: 'Every time. The best part of Protocol is the anticipation.', timestamp: '21:06', type: 'text' },
    ],
  },
  {
    id: 'party-002',
    eventId: 'evt-005',
    eventTitle: 'The Velvet Hour — Online',
    date: '2026-03-28',
    coverImage: 'https://picsum.photos/seed/velvet/800/400',
    status: 'live',
    participantCount: 22,
    participants: [
      { userId: '1', username: 'celestial_jade', displayName: 'Jade', isOnline: true },
      { userId: '2', username: 'midnight_roman', displayName: 'Roman', isOnline: true },
      { userId: '4', username: 'obsidian_leo', displayName: 'Leo', isOnline: true },
      { userId: '3', username: 'velvet_isadora', displayName: 'Isadora', isOnline: false },
    ],
    prompts: [],
    messages: [
      { id: 'm1', userId: '2', username: 'midnight_roman', text: 'The Art of Anticipation begins now. Find somewhere comfortable.', timestamp: '22:01', type: 'text' },
      { id: 'm2', userId: '4', username: 'obsidian_leo', text: 'On my velvet sofa, glass of Sancerre. Ready.', timestamp: '22:02', type: 'text' },
      { id: 'm3', userId: '3', username: 'velvet_isadora', text: 'The playlist tonight is exquisite. Who chose it?', timestamp: '22:04', type: 'text' },
      { id: 'm4', userId: '2', username: 'midnight_roman', text: 'Camille curated it. She has impeccable taste.', timestamp: '22:05', type: 'text' },
      { id: 'm5', userId: '4', username: 'obsidian_leo', text: 'This is exactly what I needed after the week I\'ve had.', timestamp: '22:08', type: 'text' },
    ],
  },
]

// ---- Messages ----

export const mockMessageThreads = [
  {
    id: 'thread-001',
    participants: ['1', '2'],
    otherUser: mockUsers.find(u => u.id === '2'),
    unread: 2,
    lastMessage: {
      text: 'Are you coming to the Nocturne?',
      timestamp: '2026-03-17T22:45:00',
      senderId: '2',
    },
    messages: [
      { id: 'msg1', senderId: '2', text: 'Jade. I heard you\'ve been accepted to Nocturne. The masquerade is something else.', timestamp: '2026-03-15T19:00:00', type: 'text' },
      { id: 'msg2', senderId: '1', text: 'I was hoping you\'d say that. I bought the Dionysus tier — could not resist.', timestamp: '2026-03-15T19:05:00', type: 'text' },
      { id: 'msg3', senderId: '2', text: 'Good choice. The private lounge is extraordinary. Last year someone arrived in full Elizabethan attire.', timestamp: '2026-03-15T19:08:00', type: 'text' },
      { id: 'msg4', senderId: '1', text: 'You\'re making my anticipation unbearable in the best way.', timestamp: '2026-03-15T19:10:00', type: 'text' },
      { id: 'msg5', senderId: '2', text: 'That\'s rather the point.', timestamp: '2026-03-15T19:12:00', type: 'text' },
      { id: 'msg6', senderId: '1', text: 'Are you attending as well?', timestamp: '2026-03-16T10:30:00', type: 'text' },
      { id: 'msg7', senderId: '2', text: 'Olympus tier. It would be wrong to miss it.', timestamp: '2026-03-16T11:00:00', type: 'text' },
      { id: 'msg8', senderId: '1', text: 'Then I\'ll look for you in the dark.', timestamp: '2026-03-16T11:03:00', type: 'text' },
      { id: 'msg9', senderId: '2', text: 'I\'ll find you first.', timestamp: '2026-03-16T11:05:00', type: 'text' },
      { id: 'msg10', senderId: '2', text: 'Are you coming to the Nocturne?', timestamp: '2026-03-17T22:45:00', type: 'text' },
    ],
  },
  {
    id: 'thread-002',
    participants: ['1', '3'],
    otherUser: mockUsers.find(u => u.id === '3'),
    unread: 0,
    lastMessage: {
      text: 'See you at Midnight Protocol.',
      timestamp: '2026-03-14T18:20:00',
      senderId: '1',
    },
    messages: [
      { id: 'msg1', senderId: '3', text: 'Your response to the first Midnight Protocol prompt was stunning. I almost replied directly.', timestamp: '2026-03-12T21:30:00', type: 'text' },
      { id: 'msg2', senderId: '1', text: 'Isadora! I was hoping someone would notice. Thank you.', timestamp: '2026-03-12T21:45:00', type: 'text' },
      { id: 'msg3', senderId: '3', text: 'The image you chose to accompany it — where is that from?', timestamp: '2026-03-12T21:47:00', type: 'text' },
      { id: 'msg4', senderId: '1', text: 'My own. From a trip to Morocco last autumn. It felt right for the prompt.', timestamp: '2026-03-12T21:50:00', type: 'text' },
      { id: 'msg5', senderId: '3', text: 'You have an artist\'s eye. I am not surprised.', timestamp: '2026-03-12T21:52:00', type: 'text' },
      { id: 'msg6', senderId: '1', text: 'You\'re too generous. Your writing on here though — I\'d read anything you posted.', timestamp: '2026-03-12T22:00:00', type: 'text' },
      { id: 'msg7', senderId: '3', text: 'Perhaps we should write something together one day.', timestamp: '2026-03-13T09:15:00', type: 'text' },
      { id: 'msg8', senderId: '1', text: 'I\'d like that enormously.', timestamp: '2026-03-13T10:00:00', type: 'text' },
      { id: 'msg9', senderId: '1', text: 'See you at Midnight Protocol.', timestamp: '2026-03-14T18:20:00', type: 'text' },
    ],
  },
  {
    id: 'thread-003',
    participants: ['1', '5'],
    otherUser: mockUsers.find(u => u.id === '5'),
    unread: 1,
    lastMessage: {
      text: 'What are you reading at the moment?',
      timestamp: '2026-03-17T15:00:00',
      senderId: '5',
    },
    messages: [
      { id: 'msg1', senderId: '5', text: 'Hello Jade. We were at the Eclipse together, though I don\'t think we were properly introduced.', timestamp: '2026-03-10T14:00:00', type: 'text' },
      { id: 'msg2', senderId: '1', text: 'Sylvie! I was hoping you\'d message. You were unforgettable that evening.', timestamp: '2026-03-10T14:30:00', type: 'text' },
      { id: 'msg3', senderId: '5', text: 'Likewise. I\'ve been thinking about our conversation about desire and architecture ever since.', timestamp: '2026-03-10T14:35:00', type: 'text' },
      { id: 'msg4', senderId: '1', text: 'Nikolai started it — comparing a well-designed room to a well-designed seduction. I couldn\'t get it out of my head.', timestamp: '2026-03-10T14:40:00', type: 'text' },
      { id: 'msg5', senderId: '5', text: 'As a scientist, I found it compelling. Environmental priming is a very real phenomenon.', timestamp: '2026-03-10T15:00:00', type: 'text' },
      { id: 'msg6', senderId: '1', text: 'You should write about it. I\'d be your first reader.', timestamp: '2026-03-11T09:00:00', type: 'text' },
      { id: 'msg7', senderId: '5', text: 'I am, actually. More of a personal essay than academic writing.', timestamp: '2026-03-11T09:30:00', type: 'text' },
      { id: 'msg8', senderId: '1', text: 'I cannot wait.', timestamp: '2026-03-11T09:32:00', type: 'text' },
      { id: 'msg9', senderId: '5', text: 'What are you reading at the moment?', timestamp: '2026-03-17T15:00:00', type: 'text' },
    ],
  },
]

// ---- Friends ----

export const mockFriends = {
  friends: [
    { ...mockUsers.find(u => u.id === '2'), friendSince: '2023-07-01' },
    { ...mockUsers.find(u => u.id === '3'), friendSince: '2023-10-15' },
    { ...mockUsers.find(u => u.id === '4'), friendSince: '2024-01-20' },
    { ...mockUsers.find(u => u.id === '5'), friendSince: '2024-02-14' },
  ],
  pendingReceived: [
    { ...mockUsers.find(u => u.id === '8'), requestDate: '2026-03-15' },
  ],
  pendingSent: [
    { ...mockUsers.find(u => u.id === '7'), requestDate: '2026-03-16' },
  ],
  suggestions: [
    { ...mockUsers.find(u => u.id === '6'), sharedEvents: ['Eclipse — The Winter Ball'] },
    { ...mockUsers.find(u => u.id === '9'), sharedEvents: ['Midnight Protocol'] },
  ],
}

// ---- Stories ----

export const mockStories = [
  {
    id: 'story-001',
    userId: '2',
    username: 'midnight_roman',
    displayName: 'Roman',
    userPhoto: 'https://picsum.photos/seed/roman1/100/100',
    image: 'https://picsum.photos/seed/storyroman/800/1200',
    caption: 'The city after midnight belongs to us.',
    postedAt: '2026-03-18T01:30:00',
    expiresAt: '2026-03-19T01:30:00',
    seen: false,
  },
  {
    id: 'story-002',
    userId: '3',
    username: 'velvet_isadora',
    displayName: 'Isadora',
    userPhoto: 'https://picsum.photos/seed/isadora1/100/100',
    image: 'https://picsum.photos/seed/storyisadora/800/1200',
    caption: 'Preparing for Protocol. ✦',
    postedAt: '2026-03-17T20:15:00',
    expiresAt: '2026-03-18T20:15:00',
    seen: true,
  },
  {
    id: 'story-003',
    userId: '7',
    username: 'lunar_camille',
    displayName: 'Camille',
    userPhoto: 'https://picsum.photos/seed/camille1/100/100',
    image: 'https://picsum.photos/seed/storycamille/800/1200',
    caption: 'The playlist for tonight is ready. Every track a door.',
    postedAt: '2026-03-18T18:00:00',
    expiresAt: '2026-03-19T18:00:00',
    seen: false,
  },
  {
    id: 'story-004',
    userId: '5',
    username: 'aurora_sylvie',
    displayName: 'Sylvie',
    userPhoto: 'https://picsum.photos/seed/sylvie1/100/100',
    image: 'https://picsum.photos/seed/storysylvie/800/1200',
    caption: 'Research continues. The body remembers what the mind denies.',
    postedAt: '2026-03-18T14:00:00',
    expiresAt: '2026-03-19T14:00:00',
    seen: false,
  },
  {
    id: 'story-005',
    userId: '1',
    username: 'celestial_jade',
    displayName: 'Jade',
    userPhoto: 'https://picsum.photos/seed/jade1/100/100',
    image: 'https://picsum.photos/seed/storyjade/800/1200',
    caption: 'London evenings.',
    postedAt: '2026-03-18T19:30:00',
    expiresAt: '2026-03-19T19:30:00',
    seen: false,
    isOwn: true,
  },
]

// ---- Concierge Matches ----

export const mockMatches = {
  suggestions: [
    {
      id: 'match-001',
      memberA: mockUsers.find(u => u.id === '2'),
      memberB: mockUsers.find(u => u.id === '3'),
      compatibilityScore: 92,
      sharedTags: ['experiences', 'events', 'connections'],
      sharedEvents: ['Eclipse 2025', 'Midnight Protocol'],
      conciergeNote: 'Both express desire for authentic, intellectual connection with sensual depth. Roman\'s curatorial nature complements Isadora\'s performative energy.',
      status: 'pending',
    },
    {
      id: 'match-002',
      memberA: mockUsers.find(u => u.id === '5'),
      memberB: mockUsers.find(u => u.id === '4'),
      compatibilityScore: 78,
      sharedTags: ['creative connection', 'intimacy'],
      sharedEvents: ['Midnight Protocol'],
      conciergeNote: 'Both bring intellectual depth and creative sensibility. Sylvie\'s research background and Leo\'s storytelling instinct would spark interesting conversation.',
      status: 'pending',
    },
    {
      id: 'match-003',
      memberA: mockUsers.find(u => u.id === '1'),
      memberB: mockUsers.find(u => u.id === '9'),
      compatibilityScore: 85,
      sharedTags: ['deep connection', 'intimacy', 'exploration'],
      sharedEvents: ['Nocturne Masquerade'],
      conciergeNote: 'Jade\'s adventurous spirit and Esme\'s depth of understanding create a compelling pairing. Both London-based, with aligned intentions around exploration and authenticity.',
      status: 'pending',
    },
  ],
  completed: [
    {
      id: 'match-004',
      memberA: mockUsers.find(u => u.id === '6'),
      memberB: mockUsers.find(u => u.id === '7'),
      compatibilityScore: 88,
      sharedTags: ['art', 'creative energy'],
      sharedEvents: ['The Gilded Salon'],
      introText: 'Two architects of beauty — one in space, one in image. I believe you\'ll recognise something in each other immediately.',
      matchedDate: '2026-02-14',
      status: 'sent',
    },
    {
      id: 'match-005',
      memberA: mockUsers.find(u => u.id === '8'),
      memberB: mockUsers.find(u => u.id === '2'),
      compatibilityScore: 74,
      sharedTags: ['luxury experiences', 'networking'],
      sharedEvents: ['Eclipse 2025'],
      introText: 'Marco and Roman both operate at the intersection of art and luxury. Their conversation will be productive and pleasurable.',
      matchedDate: '2026-01-20',
      status: 'sent',
    },
  ],
}

// ---- Helper ----

export function getUserById(id) {
  return mockUsers.find(u => u.id === id)
}

export function getEventById(id) {
  return mockEvents.find(e => e.id === id)
}

export function getPartyById(id) {
  return mockParties.find(p => p.id === id)
}

export function getThreadById(id) {
  return mockMessageThreads.find(t => t.id === id)
}

export function formatTimeAgo(dateStr) {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export function formatEventDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
