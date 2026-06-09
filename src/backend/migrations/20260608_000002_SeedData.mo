import List "mo:core/List";

module {
  // ── Inline types from Phase2Data's NewActor (our OldActor) ─────────────────
  type DayItinerary = {
    day : Nat;
    title : Text;
    route : Text;
    distanceKm : Float;
    startAltitudeM : Nat;
    endAltitudeM : Nat;
    description : Text;
    campsite : Text;
    mealsIncluded : Text;
    difficulty : Text;
    landmarks : [Text];
  };

  type PriceRange = { minINR : Nat; maxINR : Nat };
  type PackageTier = { name : Text; pricePerPerson : Nat };

  type TrekState = {
    id : Nat;
    name : Text;
    slug : Text;
    state : Text;
    region : Text;
    durationDays : Nat;
    durationNights : Nat;
    distanceKm : Float;
    maxAltitudeM : Nat;
    maxAltitudeFt : Nat;
    difficulty : Text;
    bestSeason : Text;
    startPoint : Text;
    endPoint : Text;
    description : Text;
    highlights : [Text];
    itinerary : [DayItinerary];
    inclusions : [Text];
    exclusions : [Text];
    priceRange : PriceRange;
    imageUrl : Text;
    category : Text;
  };

  type YatraState = {
    id : Nat;
    name : Text;
    slug : Text;
    duration : Text;
    season : Text;
    route : Text;
    description : Text;
    spiritualSignificance : Text;
    temples : [Text];
    registration : Text;
    templeTimings : Text;
    pujaGuide : Text;
    helicopterInfo : ?Text;
    registrationInfo : Text;
    permits : Text;
    accessibility : Text;
    priceRange : PriceRange;
    imageUrl : Text;
  };

  type PackageState = {
    id : Nat;
    name : Text;
    slug : Text;
    duration : Text;
    problemSolved : Text;
    description : Text;
    itinerary : [DayItinerary];
    inclusions : [Text];
    exclusions : [Text];
    priceRange : PriceRange;
    groupSize : Text;
    accommodationType : Text;
    groupSizeMax : Nat;
    tiers : [PackageTier];
    imageUrl : Text;
    category : Text;
  };

  type StayState = {
    id : Nat;
    name : Text;
    slug : Text;
    location : Text;
    stayType : Text;
    description : Text;
    amenities : [Text];
    nearbyAttractions : [Text];
    ownerNote : Text;
    pricePerNightMin : Nat;
    pricePerNightMax : Nat;
    imageUrl : Text;
  };

  type BlogPostState = {
    id : Nat;
    title : Text;
    slug : Text;
    authorName : Text;
    category : Text;
    excerpt : Text;
    content : Text;
    readTime : Nat;
    readTimeMin : Nat;
    imageUrl : Text;
    publishedAt : Int;
  };

  // Old BookingState from Phase2Data (no payment fields)
  type OldBookingState = {
    id : Nat;
    trekId : ?Nat;
    yatraId : ?Nat;
    packageId : ?Nat;
    stayId : ?Nat;
    name : Text;
    email : Text;
    phone : Text;
    travelDates : Text;
    groupSize : Nat;
    status : { #pending; #confirmed; #cancelled; #completed };
    createdAt : Int;
  };

  type OldActor = {
    treks : List.List<TrekState>;
    yatras : List.List<YatraState>;
    packages : List.List<PackageState>;
    stays : List.List<StayState>;
    bookings : List.List<OldBookingState>;
    blogPosts : List.List<BlogPostState>;
    state : { var nextBookingId : Nat };
  };

  // ── New types with added payment fields on BookingState ─────────────────────
  type NewBookingState = {
    id : Nat;
    trekId : ?Nat;
    yatraId : ?Nat;
    packageId : ?Nat;
    stayId : ?Nat;
    name : Text;
    email : Text;
    phone : Text;
    travelDates : Text;
    groupSize : Nat;
    amountINR : Nat;
    status : { #pending; #confirmed; #cancelled; #completed };
    paymentStatus : Text;
    paymentId : ?Text;
    razorpayOrderId : ?Text;
    razorpaySignature : ?Text;
    createdAt : Int;
  };

  type NewActor = {
    treks : List.List<TrekState>;
    yatras : List.List<YatraState>;
    packages : List.List<PackageState>;
    stays : List.List<StayState>;
    bookings : List.List<NewBookingState>;
    blogPosts : List.List<BlogPostState>;
    state : { var nextBookingId : Nat };
    razorpayKeys : { var keyId : Text; var keySecret : Text };
  };

  public func migration(old : OldActor) : NewActor {
    // Migrate bookings: add new payment fields with sensible defaults
    let newBookings = List.empty<NewBookingState>();
    for (ob in old.bookings.values()) {
      newBookings.add({
        ob with
        amountINR = 0;
        paymentStatus = "pending";
        paymentId = null : ?Text;
        razorpayOrderId = null : ?Text;
        razorpaySignature = null : ?Text;
      });
    };

    {
      treks = old.treks;
      yatras = old.yatras;
      packages = old.packages;
      stays = old.stays;
      bookings = newBookings;
      blogPosts = old.blogPosts;
      state = old.state;
      razorpayKeys = { var keyId = ""; var keySecret = "" };
    };
  };
};
