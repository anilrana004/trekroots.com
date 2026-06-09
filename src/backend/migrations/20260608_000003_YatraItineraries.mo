import List "mo:core/List";

module {
  // ── DayItinerary type (inlined) ─────────────────────────────────────────────
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

  // OldYatraState: matches YatraState from 20260608_000002_SeedData.mo (no itinerary)
  type OldYatraState = {
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

  // NewYatraState: adds itinerary field
  type NewYatraState = {
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
    itinerary : [DayItinerary];
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

  type BookingState = {
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

  // ── OldActor = NewActor of 20260608_000002_SeedData.mo ─────────────────────
  type OldActor = {
    treks : List.List<TrekState>;
    yatras : List.List<OldYatraState>;
    packages : List.List<PackageState>;
    stays : List.List<StayState>;
    bookings : List.List<BookingState>;
    blogPosts : List.List<BlogPostState>;
    state : { var nextBookingId : Nat };
    razorpayKeys : { var keyId : Text; var keySecret : Text };
  };

  // ── NewActor: yatras now include itinerary ──────────────────────────────────
  type NewActor = {
    treks : List.List<TrekState>;
    yatras : List.List<NewYatraState>;
    packages : List.List<PackageState>;
    stays : List.List<StayState>;
    bookings : List.List<BookingState>;
    blogPosts : List.List<BlogPostState>;
    state : { var nextBookingId : Nat };
    razorpayKeys : { var keyId : Text; var keySecret : Text };
  };

  // ── Per-yatra itinerary definitions ────────────────────────────────────────

  func charDhamItinerary() : [DayItinerary] {
    [
      {
        day = 1;
        title = "Arrival in Haridwar — Gateway to Dev Bhoomi";
        route = "Haridwar";
        distanceKm = 0.0;
        startAltitudeM = 314;
        endAltitudeM = 314;
        description = "Arrive in Haridwar, the ancient city where the Ganga descends from the mountains to the plains. Check in to your accommodation, attend the iconic Ganga Aarti at Har Ki Pauri ghat at sunset — an unforgettable spectacle of lamps, chants, and devotion. Receive a briefing on the Char Dham yatra route, documentation requirements, and the biometric registration process. Prepare mentally and spiritually for the sacred journey ahead.";
        campsite = "Haridwar hotel";
        mealsIncluded = "Dinner";
        difficulty = "Easy";
        landmarks = ["Har Ki Pauri", "Ganga Aarti", "Mansa Devi Temple"];
      },
      {
        day = 2;
        title = "Haridwar to Barkot — Into the Yamuna Valley";
        route = "Haridwar → Rishikesh → Dehradun → Barkot";
        distanceKm = 220.0;
        startAltitudeM = 314;
        endAltitudeM = 1220;
        description = "Post breakfast, drive through Rishikesh (the yoga capital), ascending through the Yamuna valley. The road winds past dense forests, small hill towns, and river gorges. Barkot is a quiet base town on the banks of the Yamuna River and serves as the gateway to Yamunotri Dham. Evening at leisure; visit the local market and try local Garhwali cuisine.";
        campsite = "Barkot guesthouse";
        mealsIncluded = "Breakfast, Dinner";
        difficulty = "Easy (road journey)";
        landmarks = ["Rishikesh", "Yamuna River", "Barkot bazaar"];
      },
      {
        day = 3;
        title = "Barkot — Yamunotri Dham Darshan";
        route = "Barkot → Janki Chatti → Yamunotri → Janki Chatti → Barkot";
        distanceKm = 12.0;
        startAltitudeM = 1220;
        endAltitudeM = 3291;
        description = "Drive early morning to Janki Chatti (6 km from Barkot), then trek 6 km to Yamunotri Temple (3,291 m). The trail follows the Yamuna River past cascading streams and rhododendron forests. At the temple, cook rice in the Surya Kund hot spring (a sacred tradition), take a dip in Yamuna Kund, and seek blessings at the Yamunotri Mata shrine — the source of the holy Yamuna River. Return to Barkot by evening.";
        campsite = "Barkot guesthouse";
        mealsIncluded = "Breakfast, Packed Lunch, Dinner";
        difficulty = "Moderate";
        landmarks = ["Janki Chatti", "Surya Kund", "Yamunotri Temple", "Divya Shila", "Yamuna Kund"];
      },
      {
        day = 4;
        title = "Barkot to Uttarkashi — Land of Lord Shiva";
        route = "Barkot → Dharasu → Uttarkashi";
        distanceKm = 100.0;
        startAltitudeM = 1220;
        endAltitudeM = 1158;
        description = "Drive to Uttarkashi, one of the most sacred towns in Garhwal, situated on the banks of the Bhagirathi River. Visit the Vishwanath Temple (dedicated to Lord Shiva) and Shakti Temple. Uttarkashi is also the centre of mountaineering education — the Nehru Institute of Mountaineering (NIM) is based here. Evening stroll along the Bhagirathi ghats; prepare for the Gangotri visit tomorrow.";
        campsite = "Uttarkashi hotel";
        mealsIncluded = "Breakfast, Dinner";
        difficulty = "Easy (road journey)";
        landmarks = ["Vishwanath Temple", "Bhagirathi River", "Nehru Institute of Mountaineering"];
      },
      {
        day = 5;
        title = "Uttarkashi — Gangotri Dham Darshan";
        route = "Uttarkashi → Harsil → Gangotri → Uttarkashi";
        distanceKm = 200.0;
        startAltitudeM = 1158;
        endAltitudeM = 3048;
        description = "Drive 100 km to Gangotri (3,048 m), the origin of the sacred Ganga as the Bhagirathi River. The temple is dedicated to Goddess Ganga and perched dramatically at the edge of the river with stunning Himalayan peaks as a backdrop. Take a holy dip in the ice-cold Bhagirathi, attend morning aarti, and seek blessings. Gaumukh Glacier — the actual source — is 18 km further, but accessible only with a separate permit. Return to Uttarkashi.";
        campsite = "Uttarkashi hotel";
        mealsIncluded = "Breakfast, Packed Lunch, Dinner";
        difficulty = "Easy";
        landmarks = ["Gangotri Temple", "Bhagirathi River", "Suryakund", "Kedar Ganga"];
      },
      {
        day = 6;
        title = "Uttarkashi to Guptkashi — Approaching Lord Shiva's Abode";
        route = "Uttarkashi → Tehri → Srinagar → Rudraprayag → Guptkashi";
        distanceKm = 220.0;
        startAltitudeM = 1158;
        endAltitudeM = 1319;
        description = "Long but scenic drive through the Garhwal hills, passing the confluence towns of Devprayag (Alaknanda meets Bhagirathi to form Ganga), Srinagar (Pauri Garhwal), and Rudraprayag. Guptkashi is the last major town before Kedarnath and has its own Vishwanath temple with a replica of the Kedarnath lingam. Settle in and prepare for the Kedarnath yatra tomorrow.";
        campsite = "Guptkashi hotel";
        mealsIncluded = "Breakfast, Dinner";
        difficulty = "Easy (road journey)";
        landmarks = ["Devprayag Sangam", "Rudraprayag", "Guptkashi Vishwanath Temple"];
      },
      {
        day = 7;
        title = "Guptkashi — Kedarnath Dham Darshan";
        route = "Guptkashi → Gaurikund → Kedarnath (trek/heli) → Guptkashi";
        distanceKm = 16.0;
        startAltitudeM = 1319;
        endAltitudeM = 3583;
        description = "Drive 25 km to Gaurikund (1,982 m) — base of the Kedarnath trek. Trek 16 km (6–8 hours) or take a helicopter from Phata/Guptkashi helipad (20-min flight). Kedarnath Temple (3,583 m) is one of the 12 Jyotirlingas — ancient stone temple rebuilt after the 2013 disaster, set against the majestic Kedarnath Peak (6,940 m). Attend special Kedarnath aarti, seek the Jyotirlinga blessing, and visit Bhairavnath Temple (traditionally done after main darshan). Return to Guptkashi.";
        campsite = "Guptkashi hotel";
        mealsIncluded = "Breakfast, Packed Lunch, Dinner";
        difficulty = "Difficult (trek) / Easy (helicopter)";
        landmarks = ["Gaurikund", "Kedarnath Temple", "Kedarnath Peak", "Bhairavnath Temple", "Shankaracharya Samadhi"];
      },
      {
        day = 8;
        title = "Guptkashi to Joshimath — Crossing into Badrinath Territory";
        route = "Guptkashi → Rudraprayag → Chamoli → Pipalkoti → Joshimath";
        distanceKm = 110.0;
        startAltitudeM = 1319;
        endAltitudeM = 1890;
        description = "Drive north through the Chamoli district to Joshimath — the winter seat of Badrinath deity. Joshimath is also the base for Auli ski resort, Kuari Pass trek, and the Valley of Flowers. Visit the ancient Narsingh Temple in Joshimath (one of the four cardinal Shankaracharya mutts). Acclimatize for the Badrinath altitude tomorrow.";
        campsite = "Joshimath hotel";
        mealsIncluded = "Breakfast, Dinner";
        difficulty = "Easy (road journey)";
        landmarks = ["Chamoli", "Narsingh Temple Joshimath", "Auli ropeway viewpoint"];
      },
      {
        day = 9;
        title = "Joshimath — Badrinath Dham Darshan";
        route = "Joshimath → Vishnuprayag → Badrinath → Mana Village → Joshimath";
        distanceKm = 90.0;
        startAltitudeM = 1890;
        endAltitudeM = 3133;
        description = "Drive 45 km to Badrinath (3,133 m), one of the Char Dhams and a major Vaishnava pilgrimage site dedicated to Lord Vishnu. Bathe in the Tapt Kund (natural hot spring) before darshan — a sacred tradition. Attend the spectacular Badrinath aarti inside the colourfully painted temple. Visit Brahma Kapal (ancestral rite site), Mana Village (last Indian village, 3 km away), Saraswati River cave, Vyas Gufa, and Bheem Pul. Return to Joshimath.";
        campsite = "Joshimath hotel";
        mealsIncluded = "Breakfast, Packed Lunch, Dinner";
        difficulty = "Easy";
        landmarks = ["Tapt Kund", "Badrinath Temple", "Brahma Kapal", "Mana Village", "Vyas Gufa", "Bheem Pul", "Saraswati River"];
      },
      {
        day = 10;
        title = "Joshimath to Rudraprayag — Returning Through the Sangams";
        route = "Joshimath → Chamoli → Srinagar → Rudraprayag";
        distanceKm = 170.0;
        startAltitudeM = 1890;
        endAltitudeM = 895;
        description = "Drive back south through the Garhwal valleys, stopping at Rudraprayag — the confluence of the Mandakini and Alaknanda rivers, a deeply sacred spot. Evening puja at the Rudraprayag temple. Reflect on the journey completed — four of the most sacred shrines in Hindu faith visited in nine days.";
        campsite = "Rudraprayag guesthouse";
        mealsIncluded = "Breakfast, Dinner";
        difficulty = "Easy (road journey)";
        landmarks = ["Rudraprayag Sangam", "Chamoli valley"];
      },
      {
        day = 11;
        title = "Rudraprayag to Haridwar — Journey Complete";
        route = "Rudraprayag → Devprayag → Rishikesh → Haridwar";
        distanceKm = 150.0;
        startAltitudeM = 895;
        endAltitudeM = 314;
        description = "Final drive back to Haridwar through Devprayag and Rishikesh. Stop at Devprayag to witness the confluence of Bhagirathi and Alaknanda — where the Ganga is officially born. Final Ganga Aarti at Har Ki Pauri in the evening to close the circle of the Char Dham Yatra. Overnight in Haridwar.";
        campsite = "Haridwar hotel";
        mealsIncluded = "Breakfast, Dinner";
        difficulty = "Easy (road journey)";
        landmarks = ["Devprayag Sangam", "Rishikesh", "Har Ki Pauri"];
      },
      {
        day = 12;
        title = "Haridwar — Departure";
        route = "Haridwar → Delhi / Onward journey";
        distanceKm = 220.0;
        startAltitudeM = 314;
        endAltitudeM = 220;
        description = "Post breakfast check-out and transfer to Haridwar/Dehradun railway station or airport for onward journey. The Char Dham Yatra is complete — carry home the blessings of Yamunotri, Gangotri, Kedarnath, and Badrinath.";
        campsite = "Departure";
        mealsIncluded = "Breakfast";
        difficulty = "Easy";
        landmarks = ["Haridwar station", "Dehradun airport"];
      },
    ];
  };

  func kedarnathSoloItinerary() : [DayItinerary] {
    [
      {
        day = 1;
        title = "Haridwar to Gaurikund — Base of the Trek";
        route = "Haridwar → Rishikesh → Rudraprayag → Sonprayag → Gaurikund";
        distanceKm = 250.0;
        startAltitudeM = 314;
        endAltitudeM = 1982;
        description = "Early morning departure from Haridwar. Drive through Rishikesh, Devprayag, and Rudraprayag — confluence towns where sacred rivers meet. Reach Sonprayag (last private vehicle point) and take shared jeep/taxi to Gaurikund (1,982 m). Evening preparations for tomorrow's trek — sort your gear, hire a porter if needed, and attend evening prayer at the Gaurikund temple (dedicated to Goddess Gauri, consort of Shiva).";
        campsite = "Gaurikund guesthouse";
        mealsIncluded = "Dinner";
        difficulty = "Easy (road journey)";
        landmarks = ["Devprayag", "Rudraprayag", "Sonprayag", "Gaurikund Temple"];
      },
      {
        day = 2;
        title = "Gaurikund — Kedarnath Dham (Trek or Helicopter)";
        route = "Gaurikund → Jungle Chatti → Bheembali → Lincholi → Kedarnath";
        distanceKm = 16.0;
        startAltitudeM = 1982;
        endAltitudeM = 3583;
        description = "Start the 16 km trek early (before 6 AM recommended). The trail passes through Jungle Chatti (paved path), Bheembali (rest point, 3 km), Lincholi (horse point, 7 km), and Kedarnath base (3,461 m) before the final ascent to the temple. Alternatively, take a helicopter from Phata or Guptkashi helipads (20-min, book in advance). Reach Kedarnath Temple (3,583 m) — one of 12 Jyotirlingas. Attend aarti, receive the special prasad (charan amrit), and visit the Shankaracharya Samadhi behind the temple. Stay overnight in Kedarnath.";
        campsite = "Kedarnath GMVN guesthouse / private lodge";
        mealsIncluded = "Breakfast, Dinner";
        difficulty = "Difficult (trek) / Easy (helicopter)";
        landmarks = ["Jungle Chatti", "Bheembali", "Lincholi", "Kedarnath Temple", "Shankaracharya Samadhi", "Kedarnath Peak view"];
      },
      {
        day = 3;
        title = "Kedarnath — Morning Darshan and Return Trek";
        route = "Kedarnath → Lincholi → Gaurikund → Guptkashi";
        distanceKm = 16.0;
        startAltitudeM = 3583;
        endAltitudeM = 1319;
        description = "Wake up at 4 AM for the special pre-dawn Mahabhishek (if pre-booked through BKTC). Attend sunrise aarti and get the most peaceful darshan before the crowds arrive. Visit Bhairavnath Temple (traditional practice after Kedarnath darshan). Begin descent at 8 AM — the 16 km return to Gaurikund takes 4–5 hours with less difficulty than the ascent. Drive to Guptkashi/Sonprayag for the night.";
        campsite = "Guptkashi hotel";
        mealsIncluded = "Breakfast, Dinner";
        difficulty = "Moderate";
        landmarks = ["Bhairavnath Temple", "Kedarnath view at sunrise", "Gaurikund"];
      },
      {
        day = 4;
        title = "Guptkashi to Haridwar — Journey Complete";
        route = "Guptkashi → Rudraprayag → Devprayag → Rishikesh → Haridwar";
        distanceKm = 280.0;
        startAltitudeM = 1319;
        endAltitudeM = 314;
        description = "Post breakfast drive back to Haridwar via Rudraprayag and Devprayag. Optional stop at Devprayag to witness the Sangam (Bhagirathi meets Alaknanda) and receive tirth prasad. Arrive Haridwar by evening for onward connection. Kedarnath blessings carried home.";
        campsite = "Haridwar / Departure";
        mealsIncluded = "Breakfast";
        difficulty = "Easy (road journey)";
        landmarks = ["Devprayag Sangam", "Rishikesh", "Haridwar"];
      },
    ];
  };

  func badrinathSoloItinerary() : [DayItinerary] {
    [
      {
        day = 1;
        title = "Haridwar to Joshimath — Approaching Badrinath";
        route = "Haridwar → Rishikesh → Devprayag → Rudraprayag → Chamoli → Pipalkoti → Joshimath";
        distanceKm = 270.0;
        startAltitudeM = 314;
        endAltitudeM = 1890;
        description = "Drive from Haridwar to Joshimath (1,890 m), covering the full length of the Badrinath highway through several confluences (Devprayag, Rudraprayag, Karnaprayag, Nandprayag, Vishnuprayag). This drive through the deep Alaknanda valley is one of the most scenic in Uttarakhand. Reach Joshimath by evening, visit the Narsingh Temple — the winter abode of Lord Badrinath. Rest and acclimatize.";
        campsite = "Joshimath hotel";
        mealsIncluded = "Dinner";
        difficulty = "Easy (road journey)";
        landmarks = ["Devprayag", "Rudraprayag", "Karnaprayag", "Vishnuprayag", "Narsingh Temple Joshimath"];
      },
      {
        day = 2;
        title = "Joshimath — Badrinath Dham Darshan";
        route = "Joshimath → Vishnuprayag → Badrinath → Mana Village → Joshimath";
        distanceKm = 90.0;
        startAltitudeM = 1890;
        endAltitudeM = 3133;
        description = "Drive 45 km to Badrinath (3,133 m). Start with a ritual bath in the Tapt Kund natural hot spring — the water is warm even in winter and considered purifying. Enter the Badrinath temple for darshan of Lord Vishnu in the Badrinarayan form. The temple's colourful gopuram (tower) against the snow-capped Nilkanth Peak (6,596 m) is iconic. Attend afternoon aarti. Visit Brahma Kapal (ancestral rituals), Mana Village (Saraswati cave, Vyas Gufa, Bheem Pul). Return to Joshimath.";
        campsite = "Joshimath hotel";
        mealsIncluded = "Breakfast, Packed Lunch, Dinner";
        difficulty = "Easy";
        landmarks = ["Tapt Kund", "Badrinath Temple", "Nilkanth Peak view", "Brahma Kapal", "Mana Village", "Saraswati River cave"];
      },
      {
        day = 3;
        title = "Joshimath to Haridwar — Return Journey";
        route = "Joshimath → Chamoli → Rudraprayag → Devprayag → Rishikesh → Haridwar";
        distanceKm = 270.0;
        startAltitudeM = 1890;
        endAltitudeM = 314;
        description = "Post breakfast, drive back to Haridwar. Stop at Devprayag Sangam — the most sacred of the Panch Prayag confluences — for a final darshan. Arrive Haridwar by evening. The Badrinath Yatra is complete.";
        campsite = "Haridwar / Departure";
        mealsIncluded = "Breakfast";
        difficulty = "Easy (road journey)";
        landmarks = ["Devprayag Sangam", "Rishikesh Ram Jhula", "Haridwar"];
      },
    ];
  };

  func doDhamItinerary() : [DayItinerary] {
    [
      {
        day = 1;
        title = "Haridwar to Gaurikund — Kedarnath Yatra Begins";
        route = "Haridwar → Rudraprayag → Sonprayag → Gaurikund";
        distanceKm = 250.0;
        startAltitudeM = 314;
        endAltitudeM = 1982;
        description = "Drive from Haridwar to Gaurikund, the base point for the Kedarnath trek. Scenic journey through Devprayag, Rudraprayag, and Sonprayag. Evening at Gaurikund.";
        campsite = "Gaurikund guesthouse";
        mealsIncluded = "Dinner";
        difficulty = "Easy (road journey)";
        landmarks = ["Devprayag", "Rudraprayag", "Gaurikund Temple"];
      },
      {
        day = 2;
        title = "Gaurikund — Kedarnath Dham";
        route = "Gaurikund → Kedarnath";
        distanceKm = 16.0;
        startAltitudeM = 1982;
        endAltitudeM = 3583;
        description = "Trek 16 km to Kedarnath Temple (or helicopter from Phata/Guptkashi). Attend aarti, receive blessings at the Jyotirlinga, visit Shankaracharya Samadhi and Bhairavnath Temple. Overnight at Kedarnath.";
        campsite = "Kedarnath lodge";
        mealsIncluded = "Breakfast, Dinner";
        difficulty = "Difficult (trek) / Easy (helicopter)";
        landmarks = ["Kedarnath Temple", "Shankaracharya Samadhi", "Bhairavnath Temple"];
      },
      {
        day = 3;
        title = "Kedarnath — Morning Darshan and Return to Guptkashi";
        route = "Kedarnath → Gaurikund → Guptkashi";
        distanceKm = 16.0;
        startAltitudeM = 3583;
        endAltitudeM = 1319;
        description = "Early morning pre-dawn aarti, then descend to Gaurikund and drive to Guptkashi. Rest and prepare for the onward journey to Joshimath.";
        campsite = "Guptkashi hotel";
        mealsIncluded = "Breakfast, Dinner";
        difficulty = "Moderate";
        landmarks = ["Gaurikund", "Guptkashi Vishwanath Temple"];
      },
      {
        day = 4;
        title = "Guptkashi to Joshimath — Transitioning to Badrinath";
        route = "Guptkashi → Rudraprayag → Chamoli → Joshimath";
        distanceKm = 110.0;
        startAltitudeM = 1319;
        endAltitudeM = 1890;
        description = "Drive north to Joshimath, passing the Chamoli district and the Panch Prayag confluences. Joshimath is the winter seat of Badrinath deity and a spiritual hub in itself. Evening at Narsingh Temple.";
        campsite = "Joshimath hotel";
        mealsIncluded = "Breakfast, Dinner";
        difficulty = "Easy (road journey)";
        landmarks = ["Nandprayag", "Chamoli", "Narsingh Temple Joshimath"];
      },
      {
        day = 5;
        title = "Joshimath — Badrinath Dham Darshan";
        route = "Joshimath → Badrinath → Mana Village → Joshimath";
        distanceKm = 90.0;
        startAltitudeM = 1890;
        endAltitudeM = 3133;
        description = "Drive to Badrinath for darshan of Lord Vishnu. Bathe in Tapt Kund, attend aarti, visit Brahma Kapal and Mana Village. This completes the Do Dham yatra — both Shiva (Kedarnath) and Vishnu (Badrinath) blessings received.";
        campsite = "Joshimath hotel";
        mealsIncluded = "Breakfast, Packed Lunch, Dinner";
        difficulty = "Easy";
        landmarks = ["Tapt Kund", "Badrinath Temple", "Mana Village", "Brahma Kapal"];
      },
      {
        day = 6;
        title = "Joshimath to Rudraprayag — Heading Home";
        route = "Joshimath → Chamoli → Rudraprayag";
        distanceKm = 140.0;
        startAltitudeM = 1890;
        endAltitudeM = 895;
        description = "Drive south, stopping at the confluence towns. Evening prayers at Rudraprayag — where Mandakini meets Alaknanda, one of the holiest spots in Garhwal.";
        campsite = "Rudraprayag hotel";
        mealsIncluded = "Breakfast, Dinner";
        difficulty = "Easy (road journey)";
        landmarks = ["Rudraprayag Sangam"];
      },
      {
        day = 7;
        title = "Rudraprayag to Haridwar — Do Dham Yatra Complete";
        route = "Rudraprayag → Devprayag → Rishikesh → Haridwar";
        distanceKm = 150.0;
        startAltitudeM = 895;
        endAltitudeM = 314;
        description = "Final drive home. Stop at Devprayag Sangam for a last sacred glimpse. Arrive Haridwar by afternoon. Both Char Dham shrines — Kedarnath and Badrinath — visited. Blessings of the Do Dham Yatra complete.";
        campsite = "Departure";
        mealsIncluded = "Breakfast";
        difficulty = "Easy (road journey)";
        landmarks = ["Devprayag", "Rishikesh", "Haridwar"];
      },
    ];
  };

  func valleyOfFlowersItinerary() : [DayItinerary] {
    [
      {
        day = 1;
        title = "Haridwar to Govindghat — Gateway to the Valley";
        route = "Haridwar → Rishikesh → Joshimath → Govindghat";
        distanceKm = 300.0;
        startAltitudeM = 314;
        endAltitudeM = 1828;
        description = "Drive from Haridwar to Govindghat (1,828 m), a small town at the confluence of the Alaknanda and Pushpawati rivers. Govindghat is the trailhead for both Ghangaria (Valley of Flowers/Hemkund) and the Badrinath dham road. Check into guesthouse, register your trek permit at the Forest Department counter (mandatory — carry Aadhaar/Passport). Attend local Gurudwara evening prayers.";
        campsite = "Govindghat guesthouse";
        mealsIncluded = "Dinner";
        difficulty = "Easy (road journey)";
        landmarks = ["Joshimath", "Govindghat Gurudwara", "Pushpawati River"];
      },
      {
        day = 2;
        title = "Govindghat to Ghangaria — The Trek Begins";
        route = "Govindghat → Pulna → Ghangaria";
        distanceKm = 13.0;
        startAltitudeM = 1828;
        endAltitudeM = 3048;
        description = "Start the 13 km trek from Govindghat (drive 4 km to Pulna or walk). The trail ascends steadily alongside the Pushpawati River through lush forests of oak, birch, and rhododendron. The roar of mountain streams accompanies the entire walk. Arrive at Ghangaria (3,048 m) — the only village within striking distance of both Valley of Flowers and Hemkund Sahib. This is the base for the next 2 days.";
        campsite = "Ghangaria GMVN guesthouse / Gurudwara";
        mealsIncluded = "Breakfast, Packed Lunch, Dinner";
        difficulty = "Moderate";
        landmarks = ["Pulna", "Pushpawati River gorge", "Ghangaria"];
      },
      {
        day = 3;
        title = "Ghangaria — Valley of Flowers (Day Visit)";
        route = "Ghangaria → Valley of Flowers → Ghangaria";
        distanceKm = 10.0;
        startAltitudeM = 3048;
        endAltitudeM = 3658;
        description = "Enter the UNESCO World Heritage Site Valley of Flowers (permit required — ₹150/day Indian, ₹600/day foreign nationals). The valley is 87 sq km of alpine meadow carpeted by 300+ species of wildflowers including Brahma Kamal (state flower of Uttarakhand), Blue Himalayan Poppy, Cobra Lily, and rare orchids. Photography is unrestricted. No camping allowed inside the valley — day visit only. Return to Ghangaria before 5 PM (park closing time).";
        campsite = "Ghangaria";
        mealsIncluded = "Breakfast, Packed Lunch, Dinner";
        difficulty = "Moderate";
        landmarks = ["Valley of Flowers entrance gate", "Pushpawati River meadow", "Brahma Kamal fields", "Blue Poppy meadow"];
      },
      {
        day = 4;
        title = "Ghangaria — Hemkund Sahib (Sikh Pilgrimage)";
        route = "Ghangaria → Hemkund Sahib → Ghangaria";
        distanceKm = 12.0;
        startAltitudeM = 3048;
        endAltitudeM = 4329;
        description = "Trek 6 km up to Hemkund Sahib (4,329 m) — the world's highest Gurudwara, where the 10th Sikh Guru Gobind Singh ji is believed to have meditated in a previous life. The steep ascent through moraines opens to a stunning glacial lake. Bathe in the ice-cold sacred lake (Hem Kund — Lake of Ice), attend the continuous kirtan inside the Gurudwara, and receive langar (free community meal). Views of the surrounding snow peaks are extraordinary. Return to Ghangaria.";
        campsite = "Ghangaria";
        mealsIncluded = "Breakfast, Langar at Gurudwara, Dinner";
        difficulty = "Difficult (steep ascent)";
        landmarks = ["Hemkund Sahib Gurudwara", "Hemkund glacial lake", "Lokpal Temple (Lakshman Temple nearby)"];
      },
      {
        day = 5;
        title = "Ghangaria to Govindghat to Haridwar — Journey's End";
        route = "Ghangaria → Govindghat → Joshimath → Haridwar";
        distanceKm = 13.0;
        startAltitudeM = 3048;
        endAltitudeM = 314;
        description = "Trek down 13 km from Ghangaria to Govindghat (4–5 hours). Take a shared jeep to Joshimath for a rest and lunch. Drive back to Haridwar through the Alaknanda valley, arriving by late evening. The Valley of Flowers and Hemkund Sahib yatra — a perfect blend of UNESCO nature and Sikh spirituality — is complete.";
        campsite = "Departure";
        mealsIncluded = "Breakfast";
        difficulty = "Moderate (descent)";
        landmarks = ["Govindghat Gurudwara", "Joshimath", "Haridwar"];
      },
    ];
  };

  func gangotriGaumukh() : [DayItinerary] {
    [
      {
        day = 1;
        title = "Haridwar to Uttarkashi — Land of Lord Shiva";
        route = "Haridwar → Rishikesh → Chamba → Uttarkashi";
        distanceKm = 170.0;
        startAltitudeM = 314;
        endAltitudeM = 1158;
        description = "Drive from Haridwar to Uttarkashi (1,158 m) along the Bhagirathi River highway. Uttarkashi — literally 'Kashi (Varanasi) of the North' — is a sacred town with the ancient Vishwanath Temple and Shakti Temple. The Nehru Institute of Mountaineering (NIM), India's premier mountaineering school, is based here. Check in and attend evening aarti on the Bhagirathi ghats.";
        campsite = "Uttarkashi hotel";
        mealsIncluded = "Dinner";
        difficulty = "Easy (road journey)";
        landmarks = ["Vishwanath Temple Uttarkashi", "Bhagirathi ghats", "NIM Uttarkashi"];
      },
      {
        day = 2;
        title = "Uttarkashi to Gangotri — Ganga's Sacred Origin";
        route = "Uttarkashi → Harsil → Gangotri";
        distanceKm = 100.0;
        startAltitudeM = 1158;
        endAltitudeM = 3048;
        description = "Drive to Gangotri (3,048 m) through Harsil valley — one of the most scenic stretches in Uttarakhand with apple orchards, deodar forests, and the turquoise Bhagirathi River. Reach Gangotri, one of the Char Dhams, where the Bhagirathi emerges from the narrow gorge. Attend the spectacular Gangotri aarti beside the rushing river. Spend the afternoon exploring the temple, Suryakund, and the surrounding sacred sites.";
        campsite = "Gangotri guesthouse";
        mealsIncluded = "Breakfast, Dinner";
        difficulty = "Easy";
        landmarks = ["Harsil village", "Gangotri Temple", "Bhagirathi River gorge", "Suryakund"];
      },
      {
        day = 3;
        title = "Gangotri to Chirbasa — Forest Trek Begins";
        route = "Gangotri → Bhojbasa trail → Chirbasa";
        distanceKm = 9.0;
        startAltitudeM = 3048;
        endAltitudeM = 3600;
        description = "Obtain Forest Department permit (mandatory, limited to 150 trekkers/day). Begin the 18 km trek toward Gaumukh. The trail follows the Bhagirathi River through dense Bhoj (silver birch) forests — the same trees whose bark was used by ancient sages to write scriptures. Reach Chirbasa (3,600 m) — named after the chirpai (junipers) in the area — for camping with views of the Bhagirathi peaks.";
        campsite = "Chirbasa campsite";
        mealsIncluded = "Breakfast, Packed Lunch, Dinner";
        difficulty = "Moderate";
        landmarks = ["Forest department check post", "Bhagirathi River banks", "Bhoj tree forest"];
      },
      {
        day = 4;
        title = "Chirbasa to Bhojbasa to Gaumukh — Source of Ganga";
        route = "Chirbasa → Bhojbasa → Gaumukh → Bhojbasa";
        distanceKm = 14.0;
        startAltitudeM = 3600;
        endAltitudeM = 3892;
        description = "Trek 4 km from Chirbasa to Bhojbasa (3,790 m) — a cluster of ashrams and the GMVN rest house at the edge of the treeline. Then continue 5 km to Gaumukh (3,892 m) — the cow-mouth shaped snout of the Gangotri Glacier from which the Bhagirathi River emerges as the Ganga. Touch the holy water at its source — a deeply moving spiritual experience. The glacier is retreating rapidly; current Gaumukh snout is dramatic with ice walls and boulders. Return to Bhojbasa for the night.";
        campsite = "Bhojbasa GMVN guesthouse";
        mealsIncluded = "Breakfast, Packed Lunch, Dinner";
        difficulty = "Moderate";
        landmarks = ["Bhojbasa Ashram", "Gaumukh Glacier snout", "Bhagirathi source"];
      },
      {
        day = 5;
        title = "Bhojbasa to Tapovan — Mountaineers' Meadow";
        route = "Bhojbasa → Gaumukh → Tapovan";
        distanceKm = 8.0;
        startAltitudeM = 3790;
        endAltitudeM = 4463;
        description = "Cross the Gangotri Glacier — a technically challenging section with loose moraine and ice — to reach Tapovan (4,463 m), a high-altitude meadow that serves as base camp for expeditions to Shivling (6,543 m) and Bhagirathi peaks. From Tapovan, the views of Shivling (the Himalayan Matterhorn), Bhagirathi I/II/III, and Meru (6,660 m) are among the finest in the Indian Himalayas. This is the turnaround point for the yatra group. Return to Bhojbasa/Gangotri.";
        campsite = "Bhojbasa or Gangotri guesthouse";
        mealsIncluded = "Breakfast, Packed Lunch, Dinner";
        difficulty = "Difficult (glacier crossing)";
        landmarks = ["Gangotri Glacier crossing", "Tapovan meadow", "Shivling Peak view", "Bhagirathi peaks panorama"];
      },
    ];
  };

  func panchKedarItinerary() : [DayItinerary] {
    [
      {
        day = 1;
        title = "Arrival in Haridwar / Rishikesh";
        route = "Haridwar / Rishikesh";
        distanceKm = 0.0;
        startAltitudeM = 314;
        endAltitudeM = 314;
        description = "Arrive in Haridwar or Rishikesh. Attend Ganga Aarti at Har Ki Pauri (Haridwar) or Triveni Ghat (Rishikesh). Pre-yatra briefing: Panch Kedar covers 5 of Lord Shiva's temples in Garhwal Himalaya — Kedarnath, Madmaheshwar, Tungnath, Rudranath, and Kalpeshwar — each enshrining a different body part of Lord Shiva as per Mahabharata lore. The complete circuit takes 15–18 days through remote valleys.";
        campsite = "Haridwar/Rishikesh hotel";
        mealsIncluded = "Dinner";
        difficulty = "Easy";
        landmarks = ["Har Ki Pauri", "Triveni Ghat"];
      },
      {
        day = 2;
        title = "Rishikesh to Ukhimath / Kalimath — Base for Kedarnath";
        route = "Rishikesh → Rudraprayag → Ukhimath";
        distanceKm = 190.0;
        startAltitudeM = 380;
        endAltitudeM = 1311;
        description = "Drive to Ukhimath (1,311 m), a village with deep spiritual significance — the winter seat of Kedarnath deity. The Shiva temple here holds the deity during the 6-month winter closure of Kedarnath. Also visit Kalimath temple — a Shakti Peeth dedicated to Goddess Kali.";
        campsite = "Ukhimath guesthouse";
        mealsIncluded = "Breakfast, Dinner";
        difficulty = "Easy (road journey)";
        landmarks = ["Rudraprayag", "Ukhimath Shiva Temple", "Kalimath"];
      },
      {
        day = 3;
        title = "Ukhimath to Gaurikund — Kedarnath Preparation";
        route = "Ukhimath → Guptkashi → Sonprayag → Gaurikund";
        distanceKm = 65.0;
        startAltitudeM = 1311;
        endAltitudeM = 1982;
        description = "Drive to Gaurikund (1,982 m), base of the Kedarnath trek. Evening: bathe in the Gaurikund hot spring, attend the Gauri temple puja, and prepare gear for tomorrow's trek.";
        campsite = "Gaurikund guesthouse";
        mealsIncluded = "Breakfast, Dinner";
        difficulty = "Easy";
        landmarks = ["Guptkashi temple", "Gaurikund hot spring", "Gauri Temple"];
      },
      {
        day = 4;
        title = "Gaurikund — 1st Kedar: Kedarnath Dham";
        route = "Gaurikund → Kedarnath";
        distanceKm = 16.0;
        startAltitudeM = 1982;
        endAltitudeM = 3583;
        description = "Trek 16 km to Kedarnath Temple (3,583 m) — the first and most sacred of the Panch Kedar. The Jyotirlinga here enshrines the hump (koop) of Lord Shiva. Receive the powerful Kedarnath blessing, attend aarti, visit Shankaracharya Samadhi. This is the most visited of the 5 Kedars. Overnight at Kedarnath.";
        campsite = "Kedarnath lodge";
        mealsIncluded = "Breakfast, Dinner";
        difficulty = "Difficult";
        landmarks = ["Kedarnath Temple", "Kedarnath Peak", "Shankaracharya Samadhi"];
      },
      {
        day = 5;
        title = "Kedarnath — Return to Guptkashi, Drive to Ukhimath/Ransi";
        route = "Kedarnath → Gaurikund → Guptkashi → Ransi";
        distanceKm = 50.0;
        startAltitudeM = 3583;
        endAltitudeM = 2200;
        description = "Descend from Kedarnath, drive to Ransi village — the trailhead for Madmaheshwar. Rest day before the Madmaheshwar trek begins tomorrow.";
        campsite = "Ransi guesthouse";
        mealsIncluded = "Breakfast, Dinner";
        difficulty = "Moderate (descent + drive)";
        landmarks = ["Gaurikund", "Guptkashi", "Ransi village"];
      },
      {
        day = 6;
        title = "Ransi — 2nd Kedar: Madmaheshwar Trek Begins";
        route = "Ransi → Bantoli → Nala Campsite";
        distanceKm = 12.0;
        startAltitudeM = 2200;
        endAltitudeM = 2800;
        description = "Begin the trek to Madmaheshwar (3,497 m), enshrining the navel (nabhi) of Lord Shiva. The trail passes through Bantoli village (fine views of Kedarnath-Chaukhamba) and dense forests. Camp at Nala campsite.";
        campsite = "Nala campsite";
        mealsIncluded = "Breakfast, Packed Lunch, Dinner";
        difficulty = "Moderate";
        landmarks = ["Bantoli village", "Chaukhamba view", "Nala stream"];
      },
      {
        day = 7;
        title = "Nala to Madmaheshwar Temple";
        route = "Nala → Madmaheshwar";
        distanceKm = 11.0;
        startAltitudeM = 2800;
        endAltitudeM = 3497;
        description = "Trek to Madmaheshwar Temple (3,497 m). The temple is set in a stunning high-altitude meadow surrounded by panoramic views of Kedarnath, Chaukhamba, and Nanda Ghunti. Receive the second Kedar blessing. The kund (holy pond) beside the temple is sacred. Overnight at temple accommodation.";
        campsite = "Madmaheshwar temple rest house";
        mealsIncluded = "Breakfast, Packed Lunch, Dinner";
        difficulty = "Moderate-Difficult";
        landmarks = ["Madmaheshwar Temple", "Madmaheshwar Kund", "Kedarnath-Chaukhamba panorama"];
      },
      {
        day = 8;
        title = "Madmaheshwar — Return to Ransi, Drive to Chopta";
        route = "Madmaheshwar → Ransi → Chopta";
        distanceKm = 23.0;
        startAltitudeM = 3497;
        endAltitudeM = 2680;
        description = "Return trek to Ransi (23 km descent), then drive to Chopta (2,680 m) — the meadow base for Tungnath, the highest Shiva temple in the world. Rest and recover at Chopta.";
        campsite = "Chopta camp/guesthouse";
        mealsIncluded = "Breakfast, Dinner";
        difficulty = "Moderate (long descent)";
        landmarks = ["Ransi", "Chopta meadows"];
      },
      {
        day = 9;
        title = "Chopta — 3rd Kedar: Tungnath & Chandrashila";
        route = "Chopta → Tungnath → Chandrashila → Chopta";
        distanceKm = 6.0;
        startAltitudeM = 2680;
        endAltitudeM = 4130;
        description = "Trek 3 km to Tungnath Temple (3,680 m) — the world's highest Shiva temple, enshrining the arms (bahu) of Shiva. Continue 1 km to Chandrashila summit (4,130 m) for a 360° Himalayan panorama including Nanda Devi, Kedarnath, Trishul, and Chaukhamba. Return to Chopta. The rhododendron forest trail in April is spectacular.";
        campsite = "Chopta guesthouse";
        mealsIncluded = "Breakfast, Packed Lunch, Dinner";
        difficulty = "Moderate";
        landmarks = ["Tungnath Temple", "Chandrashila summit", "Nanda Devi view"];
      },
      {
        day = 10;
        title = "Chopta to Sagar Village — 4th Kedar: Rudranath Preparation";
        route = "Chopta → Gopeshwar → Sagar village";
        distanceKm = 50.0;
        startAltitudeM = 2680;
        endAltitudeM = 2200;
        description = "Drive to Sagar village (2,200 m) near Gopeshwar — the trailhead for Rudranath (3,559 m), the most remote of the Panch Kedar, enshrining the face (mukh) of Shiva. Brief at camp — Rudranath trek is 24 km through pristine bugyals (meadows) and forests; seldom visited by common pilgrims.";
        campsite = "Sagar village";
        mealsIncluded = "Breakfast, Dinner";
        difficulty = "Easy (road)";
        landmarks = ["Gopeshwar", "Sagar trailhead"];
      },
      {
        day = 11;
        title = "Sagar — 4th Kedar: Rudranath Temple";
        route = "Sagar → Panar → Pitradhar → Rudranath";
        distanceKm = 24.0;
        startAltitudeM = 2200;
        endAltitudeM = 3559;
        description = "Full day trek to Rudranath (3,559 m). The trail passes Pitradhar (ancestor worship site with Himalayan views) and the stunning Nandikund lake. Rudranath temple is set amidst rocky terrain with one of the most dramatic backdrops in Garhwal. Receive the 4th Kedar blessing. Very few tourists reach here — deeply spiritual and solitary experience.";
        campsite = "Rudranath temple dharamshala";
        mealsIncluded = "Breakfast, Packed Lunch, Dinner";
        difficulty = "Difficult (long climb)";
        landmarks = ["Panar meadow", "Pitradhar", "Nandikund", "Rudranath Temple"];
      },
      {
        day = 12;
        title = "Rudranath — Return to Sagar and Drive to Urgam Valley";
        route = "Rudranath → Sagar → Urgam Valley, Kalpeshwar";
        distanceKm = 24.0;
        startAltitudeM = 3559;
        endAltitudeM = 2200;
        description = "Return trek to Sagar, then drive to Urgam Valley in Chamoli — the base for Kalpeshwar, the 5th and final Kedar, enshrining the matted hair (jata) of Shiva. Kalpeshwar is the only Kedar open year-round and is accessible via a short walk through a natural rock passage.";
        campsite = "Urgam Valley guesthouse";
        mealsIncluded = "Breakfast, Dinner";
        difficulty = "Moderate (descent + drive)";
        landmarks = ["Sagar", "Urgam Valley"];
      },
      {
        day = 13;
        title = "Urgam Valley — 5th Kedar: Kalpeshwar Temple";
        route = "Urgam → Kalpeshwar Temple → Helang";
        distanceKm = 5.0;
        startAltitudeM = 2200;
        endAltitudeM = 2134;
        description = "Short 2.5 km trek through a unique rock tunnel passage to Kalpeshwar Temple (2,134 m). This completes the Panch Kedar circuit — all five manifestations of Lord Shiva's body worshipped and blessed. The temple is serene and intimate compared to the larger Kedars. All five shrines complete: Kedarnath (hump), Madmaheshwar (navel), Tungnath (arms), Rudranath (face), Kalpeshwar (hair). The Panch Kedar Yatra — one of the most sacred and demanding pilgrimages in India — is done.";
        campsite = "Helang/Joshimath hotel";
        mealsIncluded = "Breakfast, Packed Lunch, Dinner";
        difficulty = "Easy";
        landmarks = ["Kalpeshwar Temple", "Rock tunnel passage", "Urgam village"];
      },
      {
        day = 14;
        title = "Joshimath to Haridwar — Return Journey";
        route = "Joshimath → Chamoli → Rudraprayag → Devprayag → Rishikesh → Haridwar";
        distanceKm = 270.0;
        startAltitudeM = 1890;
        endAltitudeM = 314;
        description = "Drive back to Haridwar through the Alaknanda valley, stopping at Devprayag Sangam for a final darshan. Final Ganga Aarti at Har Ki Pauri to close the Panch Kedar Yatra — the ultimate Shiva pilgrimage of Garhwal.";
        campsite = "Departure";
        mealsIncluded = "Breakfast";
        difficulty = "Easy (road journey)";
        landmarks = ["Devprayag", "Rishikesh", "Har Ki Pauri"];
      },
    ];
  };

  // ── Migration function ──────────────────────────────────────────────────────
  public func migration(old : OldActor) : NewActor {
    let newYatras = List.empty<NewYatraState>();

    for (y in old.yatras.values()) {
      let itinerary : [DayItinerary] = switch (y.slug) {
        case "char-dham-yatra" { charDhamItinerary() };
        case "kedarnath-yatra" { kedarnathSoloItinerary() };
        case "badrinath-yatra" { badrinathSoloItinerary() };
        case "do-dham-yatra" { doDhamItinerary() };
        case "valley-of-flowers-hemkund" { valleyOfFlowersItinerary() };
        case "gangotri-gaumukh-tapovan" { gangotriGaumukh() };
        case "panch-kedar-yatra" { panchKedarItinerary() };
        case _ { [] };
      };
      newYatras.add({ y with itinerary });
    };

    {
      treks = old.treks;
      yatras = newYatras;
      packages = old.packages;
      stays = old.stays;
      bookings = old.bookings;
      blogPosts = old.blogPosts;
      state = old.state;
      razorpayKeys = old.razorpayKeys;
    };
  };
};
