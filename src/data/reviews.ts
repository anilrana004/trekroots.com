export type Review = {
  id: number
  name: string
  location: string
  /** Trek, yatra or package the review is about. Doubles as the card headline. */
  trip: string
  quote: string
  rating: number
}

/**
 * Trekker reviews shown on the landing page. Add entries here and the stories
 * grid fills out to four columns on its own.
 */
export const reviews: Review[] = [
  {
    id: 1,
    name: "Arjun Mehta",
    location: "Mumbai, Maharashtra",
    trip: "Kedarkantha Trek",
    quote:
      "Every detail was handled with such care. The Kedarkantha summit at sunrise, surrounded by snow-laden pines, is a memory I'll carry forever.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Bengaluru, Karnataka",
    trip: "Char Dham Yatra",
    quote:
      "The Char Dham Yatra with TrekRoots was transcendent. Their expert guides made the spiritual journey as smooth as it was profound.",
    rating: 5,
  },
  {
    id: 3,
    name: "Vikram Nair",
    location: "Delhi, NCR",
    trip: "Spiti Valley Expedition",
    quote:
      "Spiti Valley left me speechless. TrekRoots' local knowledge opened doors — remote monasteries, hidden villages — that no other operator offered.",
    rating: 5,
  },
  {
    id: 4,
    name: "Ananya Reddy",
    location: "Hyderabad, Telangana",
    trip: "Brahmatal Trek",
    quote:
      "Frozen lake, Trishul views, and a leader who never rushed us. Brahmatal felt wild and safe at the same time — exactly what I hoped a winter trek would be.",
    rating: 5,
  },
  {
    id: 5,
    name: "Rohit Kapoor",
    location: "Chandigarh, Punjab",
    trip: "Hampta Pass Trek",
    quote:
      "Crossing from green valleys into Spiti's desert in one trek still feels unreal. Logistics were tight, groups stayed small, and the turn-back call on a windy day earned my trust.",
    rating: 5,
  },
  {
    id: 6,
    name: "Meera Iyer",
    location: "Chennai, Tamil Nadu",
    trip: "Kedarnath Yatra",
    quote:
      "I was nervous about the altitude and the crowds. TrekRoots paced us kindly, arranged stays that felt clean and calm, and the darshan morning was unforgettable.",
    rating: 5,
  },
  {
    id: 7,
    name: "Sanjay Desai",
    location: "Ahmedabad, Gujarat",
    trip: "Valley of Flowers Trek",
    quote:
      "Late-July meadows looked painted. Our guide named flowers I had only seen in books. Comfortable pacing and clear inclusions — no surprise costs at basecamp.",
    rating: 5,
  },
  {
    id: 8,
    name: "Neha Joshi",
    location: "Pune, Maharashtra",
    trip: "Chopta Tungnath Trek",
    quote:
      "Perfect long weekend from the plains. The Tungnath trail at dawn, hot chai at Chopta, and a homestay that felt like family — we are already planning the next one.",
    rating: 5,
  },
  {
    id: 9,
    name: "Aman Singh",
    location: "Jaipur, Rajasthan",
    trip: "Adi Kailash Yatra",
    quote:
      "Remote, high, and deeply spiritual. The team was honest about fitness and weather. Standing before Om Parvat with a prepared group made all the difference.",
    rating: 5,
  },
  {
    id: 10,
    name: "Kavya Menon",
    location: "Kochi, Kerala",
    trip: "Har Ki Dun Trek",
    quote:
      "Seven days of meadows, villages and quiet ridges. Porters and guides from the trailhead villages made the journey feel rooted — not a rushed tourist loop.",
    rating: 5,
  },
  {
    id: 11,
    name: "Dev Patel",
    location: "Surat, Gujarat",
    trip: "Ladakh Bike Trip",
    quote:
      "High passes, monastery mornings and a crew that checked every bike like it was their own. Best organised road trip I have done in the Himalayas.",
    rating: 5,
  },
  {
    id: 12,
    name: "Shreya Banerjee",
    location: "Kolkata, West Bengal",
    trip: "Dayara Bugyal Trek",
    quote:
      "My first Himalayan trek and they never made me feel behind. Soft snow, endless meadows, and a packing list that actually matched the trail.",
    rating: 5,
  },
]

export const REVIEW_SUMMARY = {
  rating: "4.9",
  count: "2,400+",
  trekkers: "10,000+",
} as const
