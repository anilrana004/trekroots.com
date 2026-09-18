export type Review = {
  id: number
  name: string
  /** Profession / short bio line shown under the name. */
  role: string
  location: string
  /** Bold card title — the Indiahikes-style review headline. */
  headline: string
  quote: string
  rating: number
}

/**
 * Trekker reviews for the homepage stories grid (4 per page).
 */
export const reviews: Review[] = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "Product Manager",
    location: "Mumbai, Maharashtra",
    headline: "Kedarkantha summit felt like a new beginning",
    quote:
      "Every detail was handled with such care. The Kedarkantha summit at sunrise, surrounded by snow-laden pines, is a memory I'll carry forever. The trek leaders paced us patiently and the camps felt organised without losing the wild feel of the trail.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Teacher",
    location: "Bengaluru, Karnataka",
    headline: "Char Dham with TrekRoots was transcendent",
    quote:
      "The Char Dham Yatra with TrekRoots was transcendent. Their expert guides made the spiritual journey as smooth as it was profound. Stays were clean, timings were honest, and I never felt rushed through darshan.",
    rating: 5,
  },
  {
    id: 3,
    name: "Vikram Nair",
    role: "Software Engineer",
    location: "Delhi, NCR",
    headline: "Spiti opened doors no other operator offered",
    quote:
      "Spiti Valley left me speechless. TrekRoots' local knowledge opened doors — remote monasteries, hidden villages — that no other operator offered. Logistics on high roads stayed calm even when weather flipped.",
    rating: 5,
  },
  {
    id: 4,
    name: "Ananya Reddy",
    role: "Architect",
    location: "Hyderabad, Telangana",
    headline: "Brahmatal felt wild and safe at once",
    quote:
      "Frozen lake, Trishul views, and a leader who never rushed us. Brahmatal felt wild and safe at the same time — exactly what I hoped a winter trek would be. Gear checks and briefings were thorough without being preachy.",
    rating: 5,
  },
  {
    id: 5,
    name: "Rohit Kapoor",
    role: "Entrepreneur",
    location: "Chandigarh, Punjab",
    headline: "Hampta Pass earned my trust on a windy day",
    quote:
      "Crossing from green valleys into Spiti's desert in one trek still feels unreal. Logistics were tight, groups stayed small, and the turn-back call on a windy day earned my trust. That honesty is why I book with them again.",
    rating: 5,
  },
  {
    id: 6,
    name: "Meera Iyer",
    role: "Doctor",
    location: "Chennai, Tamil Nadu",
    headline: "Kedarnath paced kindly for first-timers",
    quote:
      "I was nervous about the altitude and the crowds. TrekRoots paced us kindly, arranged stays that felt clean and calm, and the darshan morning was unforgettable. Clear inclusions meant no surprise costs on the trail.",
    rating: 5,
  },
  {
    id: 7,
    name: "Sanjay Desai",
    role: "Chartered Accountant",
    location: "Ahmedabad, Gujarat",
    headline: "Valley of Flowers looked painted in late July",
    quote:
      "Late-July meadows looked painted. Our guide named flowers I had only seen in books. Comfortable pacing and clear inclusions — no surprise costs at basecamp. A monsoon trek done the right way.",
    rating: 5,
  },
  {
    id: 8,
    name: "Neha Joshi",
    role: "UX Designer",
    location: "Pune, Maharashtra",
    headline: "Chopta Tungnath — the perfect long weekend",
    quote:
      "Perfect long weekend from the plains. The Tungnath trail at dawn, hot chai at Chopta, and a homestay that felt like family — we are already planning the next one. Small group, big heart.",
    rating: 5,
  },
  {
    id: 9,
    name: "Aman Singh",
    role: "Army Veteran",
    location: "Jaipur, Rajasthan",
    headline: "Adi Kailash — remote, high, deeply spiritual",
    quote:
      "Remote, high, and deeply spiritual. The team was honest about fitness and weather. Standing before Om Parvat with a prepared group made all the difference. Safety briefings matched the seriousness of the route.",
    rating: 5,
  },
  {
    id: 10,
    name: "Kavya Menon",
    role: "Journalist",
    location: "Kochi, Kerala",
    headline: "Har Ki Dun felt rooted, not rushed",
    quote:
      "Seven days of meadows, villages and quiet ridges. Porters and guides from the trailhead villages made the journey feel rooted — not a rushed tourist loop. Evenings in camp were thoughtful and warm.",
    rating: 5,
  },
  {
    id: 11,
    name: "Dev Patel",
    role: "Mechanic & Rider",
    location: "Surat, Gujarat",
    headline: "Best organised Himalayan road trip I have done",
    quote:
      "High passes, monastery mornings and a crew that checked every bike like it was their own. Best organised road trip I have done in the Himalayas. Support vehicle and altitude advice kept the group sharp.",
    rating: 5,
  },
  {
    id: 12,
    name: "Shreya Banerjee",
    role: "Student",
    location: "Kolkata, West Bengal",
    headline: "My first Himalayan trek — never felt behind",
    quote:
      "My first Himalayan trek and they never made me feel behind. Soft snow, endless meadows, and a packing list that actually matched the trail. I came home fitter and far more confident outdoors.",
    rating: 5,
  },
  {
    id: 13,
    name: "Nikhil Rao",
    role: "Consultant",
    location: "Gurugram, Haryana",
    headline: "Kuari Pass views that stay with you",
    quote:
      "Ridge walks with Nanda Devi on the horizon felt cinematic. The team kept camps tidy and food hearty. I appreciated how they briefed risk without scaring first-timers off the mountain.",
    rating: 5,
  },
  {
    id: 14,
    name: "Fatima Sheikh",
    role: "Photographer",
    location: "Lucknow, Uttar Pradesh",
    headline: "Ali Bedni Bugyal for light and silence",
    quote:
      "Wide meadows, soft light, and a guide who knew where to pause for photographs. TrekRoots balanced itinerary with space to breathe — rare on popular trails.",
    rating: 5,
  },
  {
    id: 15,
    name: "Rahul Verma",
    role: "Banker",
    location: "Indore, Madhya Pradesh",
    headline: "Nag Tibba reset my weekend routine",
    quote:
      "A short trek done properly. Clear pickup, honest difficulty grading, and a summit that still felt earned. Ideal if you are easing into the Himalayas.",
    rating: 5,
  },
  {
    id: 16,
    name: "Sneha Kulkarni",
    role: "HR Lead",
    location: "Nagpur, Maharashtra",
    headline: "Sandakphu sunrise was worth every step",
    quote:
      "Four of the world's five highest peaks at dawn — and a crew that kept morale high in the mist. Food, rooms and briefing notes were consistent throughout.",
    rating: 5,
  },
]

export const REVIEW_SUMMARY = {
  rating: "4.9",
  count: "2,400+",
  trekkers: "10,000+",
} as const
