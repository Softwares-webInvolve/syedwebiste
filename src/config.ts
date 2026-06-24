// ============================================================
// SYED MUSTAHSAN — TIMELESS TALES
// Configuration for 8-liquit-paint-frontend template
// ============================================================

export interface SiteConfig {
  language: string;
  title: string;
  description: string;
  brandName: string;
}

export interface HeroConfig {
  titleText: string;
  subtitleLines: string[];
  ctaLabel: string;
  roomLabel: string;
  fluidImagePath: string;
}

export interface WorkItem {
  id: string;
  title: string;
  type: string;
  status: string;
  metrics: string;
  image: string;
  artist: string;
  location: string;
  medium: string;
  article: string;
}

export interface GalleryConfig {
  eyebrowLabel: string;
  titleLines: string[];
  stats: { label: string; value: string }[];
  sideLabel: string;
  works: WorkItem[];
}

export interface InstantConfig {
  textLines: [string, string, string];
  videoPath: string;
  roomLabel: string;
}

export interface AboutConfig {
  eyebrowLabel: string;
  heading: string;
  roleLine: string;
  paragraphs: string[];
  worksLabel: string;
  works: string[];
  image: string;
  imageCaption: string;
}

export interface FooterConfig {
  brandText: string;
  taglineLines: string[];
  navigationHeading: string;
  navigationLinks: { label: string; href?: string }[];
  contactHeading: string;
  contactLinks: { label: string; href?: string }[];
  copyright: string;
  creditText: string;
}

export interface WorkDetailConfig {
  backLabel: string;
  artistLabel: string;
  locationLabel: string;
  mediumLabel: string;
  backToGalleryLabel: string;
  metaRoomSuffix: string;
  footerNote: string;
  notFoundTitle: string;
  notFoundLink: string;
}

// ─── SITE ───────────────────────────────────────────────────

export const siteConfig: SiteConfig = {
  language: "en",
  title: "Syed Mustahsan — Timeless Tales | Chronicles of Love, Loss & Adventure",
  description:
    "Syed Mustahsan — A writer from the outskirts of Srinagar, Kashmir. Author of Tears in Verse, Beneath The Chinar Trees, Shards of Our Souls, and Echoes of Existence. Chronicles of love, loss, and the silences people rarely talk about.",
  brandName: "Timeless Tales",
};

// ─── HERO ───────────────────────────────────────────────────

export const heroConfig: HeroConfig = {
  titleText: "TIMELESS TALES",

  subtitleLines: [
    "A place where words carry the weight of memories, where silence speaks louder than sound, and where stories are born from love, loss, and everything in between.",
    "Timeless Tales is more than just a collection of books. It is a journey through the fragile corners of the human heart, exploring grief, longing, healing, and the quiet resilience that keeps us moving forward.",
    "Written by Syed Mustahsan, a Kashmiri author and poet, these pages are deeply rooted in the landscapes of Kashmir and the emotions that shape us all. From poetry that bleeds honesty to stories that linger long after the final page, every piece here is an echo of something once lived, once loved, or once lost.",
    "This space is for the dreamers, the broken, the hopeful, and those who find pieces of themselves in words.",
    "Step in, turn the page, and let the stories find you.",
  ],

  ctaLabel: "Enter the Archive",

  roomLabel: "Chronicle 01 // The Beginning",

  fluidImagePath: "/images/hero-source.jpg",
};

// ─── GALLERY ────────────────────────────────────────────────

export const galleryConfig: GalleryConfig = {
  eyebrowLabel: "CHRONICLE 02 // THE LIBRARY",

  titleLines: ["Selected", "Works"],

  stats: [
    { label: "AUTHOR", value: "SYED MUSTAHSAN" },
    { label: "ORIGIN", value: "SRINAGAR, KASHMIR" },
    { label: "GENRE", value: "POETRY & PROSE" },
    { label: "SINCE", value: "2020 — PRESENT" },
    { label: "THEMES", value: "LOVE, LOSS, LONGING" },
    { label: "PUBLISHER", value: "NOTION PRESS" },
  ],

  sideLabel: "TIMELESS::TALES_KASHMIR",

  works: [
    {
      id: "BK-001",
      title: "TEARS IN VERSE",
      type: "poetry-collection",
      status: "PUBLISHED",
      metrics: "2024",
      image: "/images/work-tears-in-verse.jpg",
      artist: "Syed Mustahsan",
      location: "Srinagar, Kashmir",
      medium: "Poetry Collection, 37 pages, Paperback & Digital",
      article:
        "Step into the ordinary yet profound world crafted by Syed Mustahsan in this captivating compilation of writings. With keen observation and heartfelt empathy, Syed delves into the everyday routines and silent sufferings of people from all walks of life.\n\nFrom the bustling streets to the quiet corners of the heart, he sheds light on the beauty and complexity found within the seemingly mundane moments of life. Each poem is a teardrop crystallized into verse — capturing the grief of a mother, the longing of a lover, the quiet resignation of a soul that has seen too much.\n\nDiscover the extraordinary within the ordinary in this stirring anthology that transforms pain into poetry and sorrow into something infinitely beautiful.",
    },
    {
      id: "BK-002",
      title: "ECHOES OF EXISTENCE",
      type: "poetry-collection",
      status: "PUBLISHED",
      metrics: "2024",
      image: "/images/work-echoes-of-existence.jpg",
      artist: "Syed Mustahsan",
      location: "Srinagar, Kashmir",
      medium: "Poetry Collection, 46 pages, Paperback & Digital",
      article:
        "Echoes of Existence is a poetry collection by Syed Mustahsan that explores the intricacies of human emotion and experience. The poems reflect on themes of love, loss, and the beauty found in everyday moments, inviting readers to connect deeply with their own feelings.\n\nThis volume serves as a testament to the power of poetry to illuminate the human condition amidst life's chaos. Each poem is an echo — a reverberation of feelings that exist in the spaces between words, in the pauses between breaths, in the stillness of a Kashmir dawn.\n\nFrom existential contemplation to quiet celebration of small joys, this collection traverses the full landscape of what it means to be alive, to feel, and to remember.",
    },
    {
      id: "BK-003",
      title: "BENEATH THE CHINAR TREES",
      type: "debut-novel",
      status: "PUBLISHED",
      metrics: "2024",
      image: "/images/work-beneath-chinar-trees.jpg",
      artist: "Syed Mustahsan",
      location: "Srinagar, Kashmir",
      medium: "Novel, 28 pages, Paperback & Digital",
      article:
        "Beneath the Chinar Trees is a moving tale of love and longing set in the picturesque yet turbulent landscape of Kashmir. Zain, a literature teacher deeply connected to his homeland, falls in love with Amina, a passionate young woman dreaming of a life beyond the valley.\n\nTheir romance flourishes under the chinar trees of Srinagar, but as political unrest deepens and Amina's ambitions pull her far from home, they find themselves on different paths. Years later, Amina returns, and both must confront the lingering echoes of their past.\n\nCan they rebuild what they once had, or has too much been lost to time and distance? This novel is a heartfelt exploration of love, memory, and the enduring connection to one's roots amidst the forces of change.",
    },
    {
      id: "BK-004",
      title: "SHARDS OF OUR SOULS",
      type: "novel",
      status: "PUBLISHED",
      metrics: "2024",
      image: "/images/work-shards-of-souls.jpg",
      artist: "Syed Mustahsan",
      location: "Srinagar, Kashmir",
      medium: "Novel, 30 pages, Paperback & Digital",
      article:
        "In the misty city of Srinagar, Aariz and Zainab share a profound yet unspoken connection that blossoms amidst the vibrant backdrop of autumn. As Zainab's laughter brightens Aariz's timid world, their fears and societal pressures loom over their budding romance.\n\nJust as they dare to confront their feelings, an unexpected tragedy shatters their fragile peace, leaving Aariz haunted by memories of a love left unfulfilled. Inspired by real-life events, this narrative invites readers to reflect on their own connections and the beauty found in vulnerability and resilience.\n\nShards of Our Souls is a gripping exploration of love, loss, and the lingering echoes of a bond that defies time, challenging Aariz to piece together the fragments of his heart before it is too late.",
    },
    {
      id: "BK-005",
      title: "LETTERS TO MY FUTURE MURDERER",
      type: "coming-soon",
      status: "COMING SOON",
      metrics: "2025",
      image: "/images/work-letters-to-murderer.jpg",
      artist: "Syed Mustahsan",
      location: "Srinagar, Kashmir",
      medium: "Novel, Forthcoming",
      article:
        "A haunting epistolary novel where the protagonist writes letters to the person who will one day take his life. Each letter unfolds as a confession, a love letter to Kashmir, a goodbye to those he loved, and a meditation on mortality itself.\n\nSet against the backdrop of a changing Kashmir, the narrative weaves between past and present — between the love that sustained him and the fate he cannot escape. Dark, poetic, and deeply unsettling in its beauty.\n\nLetters to My Future Murderer explores the ultimate question: if you knew how your story ended, how differently would you live the chapters before?",
    },
    {
      id: "BK-006",
      title: "MIDNIGHT VERSES",
      type: "poetry-series",
      status: "PUBLISHED",
      metrics: "2024",
      image: "/images/work-midnight-verses.jpg",
      artist: "Syed Mustahsan",
      location: "Srinagar, Kashmir",
      medium: "Poetry Series, Digital Publication",
      article:
        "Written in the witching hours when the rest of Srinagar sleeps, Midnight Verses captures the spiritual dialogue between a poet and the universe. These poems traverse the boundary between the visible and the invisible — between the world we touch and the world that touches us back in dreams.\n\nWith influences from Kashmiri Sufi poetry and contemporary free verse, this collection explores themes of divine longing, existential wonder, and the quiet ecstasy of being alive under a sky full of stars over Dal Lake.",
    },
    {
      id: "BK-007",
      title: "WHISPERS OF SRINAGAR",
      type: "short-stories",
      status: "PUBLISHED",
      metrics: "2024",
      image: "/images/work-whispers-of-srinagar.jpg",
      artist: "Syed Mustahsan",
      location: "Srinagar, Kashmir",
      medium: "Short Story Collection, Digital",
      article:
        "The old city of Srinagar has a voice — it whispers through narrow lanes, across wooden balconies, in the call of the muezzin at dawn, in the ripple of shikara oars through Dal Lake. These stories are Syed Mustahsan's attempt to transcribe those whispers.\n\nEach story is a window into a different life in Kashmir — the old baker who never left his shop, the woman who waits by the window every Thursday, the child who believes chinar leaves are messages from the dead. Interconnected by place and separated by time, these narratives form a love letter to a city that exists in memory as much as in geography.",
    },
    {
      id: "BK-008",
      title: "SILENT CONVERSATIONS",
      type: "poetry-collection",
      status: "PUBLISHED",
      metrics: "2024",
      image: "/images/work-silent-conversations.jpg",
      artist: "Syed Mustahsan",
      location: "Srinagar, Kashmir",
      medium: "Poetry Collection, 42 pages, Paperback & Digital",
      article:
        "Not all conversations happen with words. Some unfold in the space between two coffee cups. In the way a hand almost reaches out. In the glance held one second too long. Silent Conversations is a collection of poems about the dialogues that never became sentences — the things we almost said, the feelings we communicated without speaking.\n\nSet in the intimate interiors of Kashmir homes and the quiet corners of Srinagar, these poems capture the profound eloquence of silence between two people who understand each other completely.",
    },
    {
      id: "BK-009",
      title: "AUTUMN ELEGY",
      type: "poetry-collection",
      status: "PUBLISHED",
      metrics: "2024",
      image: "/images/work-autumn-elegy.jpg",
      artist: "Syed Mustahsan",
      location: "Srinagar, Kashmir",
      medium: "Poetry Collection, 35 pages, Paperback & Digital",
      article:
        "In Kashmir, autumn is not just a season — it is a state of being. When the chinar trees turn crimson and the air carries the scent of change, something ancient awakens in the soul. Autumn Elegy is a sequence of poems that mirror the season's journey from fullness to fall.\n\nEach poem corresponds to a week of autumn, tracing the arc from the first golden leaf to the last bare branch. It is a meditation on impermanence, on the beauty of letting go, and on the promise that what falls will rise again in a different form.",
    },
    {
      id: "BK-010",
      title: "FADED PHOTOGRAPHS",
      type: "memoir-prose",
      status: "PUBLISHED",
      metrics: "2024",
      image: "/images/work-faded-photographs.jpg",
      artist: "Syed Mustahsan",
      location: "Srinagar, Kashmir",
      medium: "Prose & Poetry Hybrid, Digital Publication",
      article:
        "A Kashmiri home always has a drawer of old photographs — images of people who are gone, places that have changed, moments that exist now only in yellowing paper. Faded Photographs is Syed Mustahsan's attempt to write the stories behind those images.\n\nPart memoir, part fiction, part prose poetry — this hybrid work blurs the line between what was and what might have been. Each chapter begins with a description of a photograph and unfolds into the narrative behind it. A deeply personal work that speaks to universal experiences of memory, family, and the passage of time.",
    },
    {
      id: "BK-011",
      title: "LOVE LOST IN KASHMIR",
      type: "romance-novel",
      status: "PUBLISHED",
      metrics: "2024",
      image: "/images/work-love-lost-in-kashmir.jpg",
      artist: "Syed Mustahsan",
      location: "Srinagar, Kashmir",
      medium: "Novel, 45 pages, Paperback & Digital",
      article:
        "She came to Kashmir seeking escape. He had never left. Their love story should have been simple — two souls finding each other against the most beautiful backdrop on earth. But love in Kashmir is never just about two people.\n\nLove Lost in Kashmir follows Noor and Kabir through seasons of passion and separation, through the blooming tulip gardens and the silent winter snows. It is a story about how a place can be both the beginning and the end of love — how Kashmir gives and takes with equal measure.",
    },
    {
      id: "BK-012",
      title: "THE INVISIBLE GUEST",
      type: "supernatural-poetry",
      status: "PUBLISHED",
      metrics: "2024",
      image: "/images/work-the-invisible-guest.jpg",
      artist: "Syed Mustahsan",
      location: "Srinagar, Kashmir",
      medium: "Poetry Collection, 38 pages, Paperback & Digital",
      article:
        "Sometimes, in the deepest hours of the Kashmir night, someone arrives who is not entirely there. The Invisible Guest is a collection of poems about these supernatural visitations — the spirits that sit at the edge of beds, the voices that call from empty rooms, the loved ones who return in dreams so vivid they feel more real than waking.\n\nInspired by Kashmiri folklore and the poet's own experiences of grief, these poems explore the thin veil between worlds. They ask: what if the dead never truly leave? What if love is strong enough to bend the laws of existence? What if the invisible guest is the one we loved most?",
    },
    {
      id: "BK-013",
      title: "WORDS UNSPOKEN",
      type: "poetry-collection",
      status: "PUBLISHED",
      metrics: "2024",
      image: "/images/work-words-unspoken.jpg",
      artist: "Syed Mustahsan",
      location: "Srinagar, Kashmir",
      medium: "Poetry Collection, 40 pages, Paperback & Digital",
      article:
        "Every heart has a journal of words never spoken — confessions withheld, apologies delayed, loves undeclared, goodbyes unsaid. Words Unspoken is Syed Mustahsan's most intimate collection, a series of poems that give voice to the silence.\n\nWritten in the tradition of Kashmiri ghazals but with contemporary sensibility, these poems move from the deeply personal to the universally relatable. They are the words you wish you had said, the words you are still saying in your heart, the words that echo long after the moment has passed.",
    },
    {
      id: "BK-014",
      title: "MOURNING DOVE",
      type: "elegy-poetry",
      status: "PUBLISHED",
      metrics: "2024",
      image: "/images/work-mourning-dove.jpg",
      artist: "Syed Mustahsan",
      location: "Srinagar, Kashmir",
      medium: "Poetry Collection, 33 pages, Paperback & Digital",
      article:
        "A white dove over Dal Lake at dawn — symbol of peace, messenger between worlds, embodiment of a soul in flight. Mourning Dove is an elegiac collection written in the aftermath of loss. Each poem is a stage of grief rendered in verse: denial, anger, bargaining, depression, and finally, acceptance that looks like letting go.\n\nThis is Syed Mustahsan's most vulnerable work — a direct confrontation with mortality, with the absence left when someone beloved departs, and with the struggle to find meaning in a world that continues without them.",
    },
    {
      id: "BK-015",
      title: "ROSE FROM CONCRETE",
      type: "inspirational-poetry",
      status: "PUBLISHED",
      metrics: "2024",
      image: "/images/work-rose-from-concrete.jpg",
      artist: "Syed Mustahsan",
      location: "Srinagar, Kashmir",
      medium: "Poetry Collection, 36 pages, Paperback & Digital",
      article:
        "In the ruins of conflict, in the cracks of broken systems, in the spaces where hope should not survive — something beautiful grows. Rose From Concrete is a collection of poems about resilience, about the human capacity to find light in the darkest places, about love that persists when everything else has fallen away.\n\nWritten against the backdrop of Kashmir's turbulent history, these poems are both personal and political. They speak of a people's unbreakable spirit, of flowers that bloom under gunfire, of poetry that refuses to be silenced.",
    },
    {
      id: "BK-016",
      title: "REQUIEM FOR LOVE",
      type: "tragic-poetry",
      status: "PUBLISHED",
      metrics: "2024",
      image: "/images/work-requiem-for-love.jpg",
      artist: "Syed Mustahsan",
      location: "Srinagar, Kashmir",
      medium: "Poetry Collection, 44 pages, Paperback & Digital",
      article:
        "A requiem is a mass for the dead. Requiem for Love is a funeral for a relationship — not with bitterness, but with profound gratitude for what was. This collection traces the arc of a great love from its explosive beginning through its turbulent middle to its inevitable, beautiful end.\n\nThese are poems for anyone who has loved deeply and lost completely. They do not offer easy comfort — they offer truth. The truth that some loves are worth the grief they leave behind. The truth that a love that ends is still a love that was. The truth that every requiem is, in its way, a celebration.",
    },
  ],
};

// ─── INSTANT ────────────────────────────────────────────────

export const instantConfig: InstantConfig = {
  textLines: [
    "INKED",
    "in the silence between heartbeats, where Kashmir mist meets the page",
    "Every tear becomes a verse. Every loss becomes a story. Every silence finds its voice.",
  ],

  videoPath: "/videos/ambient.webm",

  roomLabel: "Chronicle 03 // The Eternal",
};

// ─── ABOUT ──────────────────────────────────────────────────

export const aboutConfig: AboutConfig = {
  eyebrowLabel: "CHRONICLE 04 // THE AUTHOR",

  heading: "Syed Mustahsan",

  roleLine: "Writer & Poet — Outskirts of Srinagar, Jammu & Kashmir",

  paragraphs: [
    "Syed Mustahsan, a writer from the outskirts of Srinagar, Jammu and Kashmir. I've been writing since 2020, drawn to words as a way of understanding emotions, memories, and the silences people rarely talk about. My work often explores love, loss, and the subtle weight of lived experiences, shaped deeply by the place I come from.",
    "I'm the author and co-writer of several books — working both independently and in collaboration with other writers. Writing, for me, isn't about labels or loud presence; it's about honesty, reflection, and leaving something real behind on the page.",
  ],

  worksLabel: "SELECTED WORKS",
  works: [
    "Tears in Verse",
    "Echoes of Existence",
    "Beneath The Chinar Trees",
    "Shards of Our Souls",
  ],

  image: "/images/work-words-unspoken.jpg",
  imageCaption: "Srinagar, Kashmir",
};

// ─── FOOTER ─────────────────────────────────────────────────

export const footerConfig: FooterConfig = {
  brandText: "Timeless Tales",

  taglineLines: [
    "CHRONICLES OF LOVE, LOSS, AND ADVENTURE",
    "FROM THE MISTY VALLEYS OF KASHMIR",
    "SINCE 2020 — ONE VERSE AT A TIME",
  ],

  navigationHeading: "NAVIGATION",
  navigationLinks: [
    { label: "The Beginning", href: "#hero" },
    { label: "The Library", href: "#gallery" },
    { label: "The Eternal", href: "#instant" },
    { label: "About the Author", href: "#about" },
  ],

  contactHeading: "CONNECT",
  contactLinks: [
    { label: "Instagram", href: "https://www.instagram.com/tales.timeless_" },
    { label: "Facebook", href: "https://www.facebook.com/timelesstalesfb" },
    { label: "Threads", href: "https://www.threads.net/@tales.timeless_" },
    { label: "WordPress Blog", href: "https://thesyedmustahsan.wordpress.com" },
    { label: "Goodreads", href: "https://www.goodreads.com/review/list/194410268?shelf=timeless-tales" },
    { label: "Email", href: "mailto:contact@timelesstales.com" },
  ],

  copyright: "© 2024 SYED MUSTAHSAN — TIMELESS TALES",
  creditText: "WRITTEN WITH INK AND LONGING IN SRINAGAR",
};

// ─── WORK DETAIL ────────────────────────────────────────────

export const workDetailConfig: WorkDetailConfig = {
  backLabel: "← BACK",
  artistLabel: "Author",
  locationLabel: "Origin",
  mediumLabel: "Format",
  backToGalleryLabel: "← Back to Library",
  metaRoomSuffix: "CHRONICLE 02",
  footerNote: "Timeless Tales · Chronicle 02",
  notFoundTitle: "404 · Work Not Found",
  notFoundLink: "← BACK TO LIBRARY",
};
