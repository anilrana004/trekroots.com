import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: Id;
    title: string;
    content: string;
    readTimeMin: bigint;
    slug: Slug;
    authorName: string;
    publishedAt: Timestamp;
    readTime: bigint;
    imageUrl: string;
    excerpt: string;
    category: string;
}
export type Timestamp = bigint;
export interface DayItinerary {
    day: bigint;
    endAltitudeM: bigint;
    title: string;
    startAltitudeM: bigint;
    campsite: string;
    difficulty: string;
    description: string;
    landmarks: Array<string>;
    distanceKm: number;
    mealsIncluded: string;
    route: string;
}
export type Slug = string;
export interface BookingInput {
    stayId?: Id;
    trekId?: Id;
    name: string;
    travelDates: string;
    email: string;
    yatraId?: Id;
    amountINR: bigint;
    phone: string;
    groupSize: bigint;
    packageId?: Id;
}
export interface SearchResults {
    treks: Array<Trek>;
    packages: Array<Package>;
    blogPosts: Array<BlogPost>;
    stays: Array<Stay>;
    yatras: Array<Yatra>;
}
export interface Trek {
    id: Id;
    region: string;
    durationDays: bigint;
    durationNights: bigint;
    difficulty: string;
    name: string;
    slug: Slug;
    description: string;
    inclusions: Array<string>;
    highlights: Array<string>;
    priceRange: PriceRange;
    state: string;
    imageUrl: string;
    distanceKm: number;
    maxAltitudeM: bigint;
    exclusions: Array<string>;
    category: string;
    endPoint: string;
    maxAltitudeFt: bigint;
    startPoint: string;
    itinerary: Array<DayItinerary>;
    bestSeason: string;
}
export interface BookingWithPaymentResult {
    bookingId: string;
    razorpayOrder: RazorpayOrderResult;
}
export interface Package {
    id: Id;
    tiers: Array<PackageTier>;
    duration: string;
    accommodationType: string;
    name: string;
    slug: Slug;
    description: string;
    inclusions: Array<string>;
    priceRange: PriceRange;
    imageUrl: string;
    groupSizeMax: bigint;
    exclusions: Array<string>;
    category: string;
    groupSize: string;
    itinerary: Array<DayItinerary>;
    problemSolved: string;
}
export interface RazorpayOrderResult {
    orderId: string;
    currency: string;
    amount: bigint;
    keyId: string;
}
export interface PriceRange {
    minINR: bigint;
    maxINR: bigint;
}
export interface PackageTier {
    name: string;
    pricePerPerson: bigint;
}
export type Id = bigint;
export interface Yatra {
    id: Id;
    spiritualSignificance: string;
    duration: string;
    helicopterInfo?: string;
    temples: Array<string>;
    registration: string;
    name: string;
    slug: Slug;
    description: string;
    season: string;
    priceRange: PriceRange;
    permits: string;
    imageUrl: string;
    pujaGuide: string;
    templeTimings: string;
    registrationInfo: string;
    itinerary: Array<DayItinerary>;
    route: string;
    accessibility: string;
}
export interface Stay {
    id: Id;
    nearbyAttractions: Array<string>;
    ownerNote: string;
    pricePerNightMax: bigint;
    pricePerNightMin: bigint;
    stayType: string;
    name: string;
    slug: Slug;
    description: string;
    amenities: Array<string>;
    imageUrl: string;
    location: string;
}
export interface Booking {
    id: Id;
    status: BookingStatus;
    stayId?: Id;
    paymentStatus: string;
    trekId?: Id;
    name: string;
    createdAt: Timestamp;
    travelDates: string;
    email: string;
    razorpaySignature?: string;
    yatraId?: Id;
    razorpayOrderId?: string;
    paymentId?: string;
    amountINR: bigint;
    phone: string;
    groupSize: bigint;
    packageId?: Id;
}
export enum BookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed"
}
export interface backendInterface {
    confirmBookingPayment(bookingId: bigint, paymentId: string, razorpaySignature: string): Promise<Booking | null>;
    createBooking(input: BookingInput): Promise<Booking>;
    createBookingWithPayment(input: BookingInput): Promise<BookingWithPaymentResult>;
    getAllBlogPosts(): Promise<Array<BlogPost>>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllPackages(): Promise<Array<Package>>;
    getAllStays(): Promise<Array<Stay>>;
    getAllTreks(): Promise<Array<Trek>>;
    getAllYatras(): Promise<Array<Yatra>>;
    getBlogPostBySlug(slug: string): Promise<BlogPost | null>;
    getPackageBySlug(slug: string): Promise<Package | null>;
    getStayBySlug(slug: string): Promise<Stay | null>;
    getTrekBySlug(slug: string): Promise<Trek | null>;
    getTreksByDifficulty(difficulty: string): Promise<Array<Trek>>;
    getTreksByState(state: string): Promise<Array<Trek>>;
    getUserBookings(userEmail: string): Promise<Array<Booking>>;
    getYatraBySlug(slug: string): Promise<Yatra | null>;
    searchAll(searchTerm: string): Promise<SearchResults>;
    searchTreks(searchTerm: string): Promise<Array<Trek>>;
    setRazorpayKeys(keyId: string, secret: string): Promise<void>;
}
