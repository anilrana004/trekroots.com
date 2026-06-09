import List "mo:core/List";

module {
  // ── Types from the previous migration (old shapes) ──────────────────────
  type DayItinerary = { day : Nat; title : Text; route : Text; distanceKm : Float; startAltitudeM : Nat; endAltitudeM : Nat; description : Text; campsite : Text; mealsIncluded : Text; difficulty : Text; landmarks : [Text] };
  type PriceRange = { minINR : Nat; maxINR : Nat };
  type TrekState = { id : Nat; name : Text; slug : Text; state : Text; region : Text; durationDays : Nat; durationNights : Nat; distanceKm : Float; maxAltitudeM : Nat; maxAltitudeFt : Nat; difficulty : Text; bestSeason : Text; startPoint : Text; endPoint : Text; description : Text; highlights : [Text]; itinerary : [DayItinerary]; inclusions : [Text]; exclusions : [Text]; priceRange : PriceRange; imageUrl : Text; category : Text };

  type OldYatraState = { id : Nat; name : Text; slug : Text; duration : Text; season : Text; route : Text; description : Text; spiritualSignificance : Text; temples : [Text]; registration : Text; priceRange : PriceRange; imageUrl : Text };
  type OldPackageState = { id : Nat; name : Text; slug : Text; duration : Text; problemSolved : Text; description : Text; itinerary : [DayItinerary]; inclusions : [Text]; exclusions : [Text]; priceRange : PriceRange; groupSize : Text; imageUrl : Text; category : Text };
  type OldStayState = { id : Nat; name : Text; slug : Text; location : Text; stayType : Text; description : Text; amenities : [Text]; pricePerNightMin : Nat; pricePerNightMax : Nat; imageUrl : Text };
  type OldBlogPostState = { id : Nat; title : Text; slug : Text; category : Text; excerpt : Text; content : Text; readTime : Nat; imageUrl : Text; publishedAt : Int };
  type BookingState = { id : Nat; trekId : ?Nat; yatraId : ?Nat; packageId : ?Nat; stayId : ?Nat; name : Text; email : Text; phone : Text; travelDates : Text; groupSize : Nat; status : { #pending; #confirmed; #cancelled; #completed }; createdAt : Int };

  type OldActor = {
    treks : List.List<TrekState>;
    yatras : List.List<OldYatraState>;
    packages : List.List<OldPackageState>;
    stays : List.List<OldStayState>;
    bookings : List.List<BookingState>;
    blogPosts : List.List<OldBlogPostState>;
    state : { var nextBookingId : Nat };
  };

  // ── New types with enriched fields ──────────────────────────────────────
  type PackageTier = { name : Text; pricePerPerson : Nat };

  type NewYatraState = { id : Nat; name : Text; slug : Text; duration : Text; season : Text; route : Text; description : Text; spiritualSignificance : Text; temples : [Text]; registration : Text; templeTimings : Text; pujaGuide : Text; helicopterInfo : ?Text; registrationInfo : Text; permits : Text; accessibility : Text; priceRange : PriceRange; imageUrl : Text };
  type NewPackageState = { id : Nat; name : Text; slug : Text; duration : Text; problemSolved : Text; description : Text; itinerary : [DayItinerary]; inclusions : [Text]; exclusions : [Text]; priceRange : PriceRange; groupSize : Text; accommodationType : Text; groupSizeMax : Nat; tiers : [PackageTier]; imageUrl : Text; category : Text };
  type NewStayState = { id : Nat; name : Text; slug : Text; location : Text; stayType : Text; description : Text; amenities : [Text]; nearbyAttractions : [Text]; ownerNote : Text; pricePerNightMin : Nat; pricePerNightMax : Nat; imageUrl : Text };
  type NewBlogPostState = { id : Nat; title : Text; slug : Text; authorName : Text; category : Text; excerpt : Text; content : Text; readTime : Nat; readTimeMin : Nat; imageUrl : Text; publishedAt : Int };

  type NewActor = {
    treks : List.List<TrekState>;
    yatras : List.List<NewYatraState>;
    packages : List.List<NewPackageState>;
    stays : List.List<NewStayState>;
    bookings : List.List<BookingState>;
    blogPosts : List.List<NewBlogPostState>;
    state : { var nextBookingId : Nat };
  };

  // ── helpers ──────────────────────────────────────────────────────────────
  func day(d : Nat, t : Text, r : Text, dist : Float, sa : Nat, ea : Nat, desc : Text, camp : Text, meals : Text, diff : Text, lm : [Text]) : DayItinerary {
    { day = d; title = t; route = r; distanceKm = dist; startAltitudeM = sa; endAltitudeM = ea; description = desc; campsite = camp; mealsIncluded = meals; difficulty = diff; landmarks = lm };
  };
  func pr(lo : Nat, hi : Nat) : PriceRange { { minINR = lo; maxINR = hi } };
  func tier(n : Text, p : Nat) : PackageTier { { name = n; pricePerPerson = p } };
  func stdInclusions() : [Text] {
    ["All accommodation (tents/guesthouses as applicable)", "All meals from Day 1 dinner to last day breakfast", "Experienced certified trek leader (1 per 8 trekkers)", "Support staff and porters", "All forest permits and entry fees", "Medical kit with oxygen cylinder", "All camping equipment (tents, sleeping bags, mats)", "Mules/porters for group equipment", "Pick-up/Drop from base village", "Satellite communication device"];
  };
  func stdExclusions() : [Text] {
    ["Travel to/from base camp", "Personal expenses and tips", "Personal trekking gear", "Travel insurance (strongly recommended)", "Helicopter evacuation (available on request)", "Any meals not mentioned in itinerary"];
  };

  // ── migrate yatras: upgrade old 3 + add 4 new ────────────────────────────
  func migrateYatras(old : List.List<OldYatraState>) : List.List<NewYatraState> {
    let y = List.empty<NewYatraState>();
    // Migrate existing yatras with enriched fields
    for (oy in old.values()) {
      let helicopterInfo : ?Text = if (oy.slug == "kedarnath" or oy.slug == "char-dham") {
        ?("Helicopter service available from Phata, Guptkashi, Sirsi, and Agastmuni helipads. Cost: ₹5,000-8,000 one way. Book via IRCTC or UTD portal 3-4 months in advance for peak season (May-June).");
      } else { null };
      let templeTimings = if (oy.slug == "kedarnath") {
        "Morning Abhishek: 4:00 AM - 6:00 AM (ticket required). General Darshan: 6:00 AM - 3:00 PM. Evening Aarti: 7:30 PM - 8:30 PM.";
      } else if (oy.slug == "badrinath") {
        "Morning Abhishek: 4:30 AM - 6:30 AM. General Darshan: 7:00 AM - 1:00 PM & 3:00 PM - 9:00 PM. Evening Aarti (Shayan): 8:30 PM.";
      } else if (oy.slug == "char-dham") {
        "Yamunotri: 6:00 AM - 2:00 PM & 3:00 PM - 8:00 PM. Gangotri: 6:00 AM - 2:00 PM & 4:00 PM - 9:00 PM. Kedarnath: 6:00 AM - 3:00 PM. Badrinath: 7:00 AM - 9:00 PM.";
      } else {
        "Seasonal timings — enquire at time of booking.";
      };
      let pujaGuide = if (oy.slug == "kedarnath") {
        "Mahabhishek Puja: ₹750 (most auspicious, book via BKTC). Rudra Abhishek: ₹550. Laghu Rudra: ₹450. All pujas conducted at the sanctum. Register puja at the temple seva counter on arrival.";
      } else if (oy.slug == "badrinath") {
        "Abhishek Puja: ₹550. Pitru Tarpan at Brahma Kapal: ₹151-501. Maha Abhishek at Tapt Kund: free (self). Register at the panda counter near temple entrance.";
      } else {
        "Specific pujas available at each shrine. Our guide will assist with registration and timings at each dham.";
      };
      y.add({
        oy with
        templeTimings;
        pujaGuide;
        helicopterInfo;
        registrationInfo = oy.registration;
        permits = "Biometric registration mandatory at each dham base camp. Valid government photo ID required. Registration available at uttarakhandtourism.gov.in.";
        accessibility = "Pony (horse) service available at all dhams. Palki (sedan chair) service for elderly/disabled. Helicopter option for Kedarnath. Doli (palanquin) available at Yamunotri.";
      });
    };
    // Add 4 new yatras
    y.add({
      id = 3; name = "Do Dham Yatra — Kedarnath & Badrinath"; slug = "do-dham-yatra";
      duration = "7 Days / 6 Nights";
      season = "May to October";
      route = "Haridwar → Guptkashi → Gaurikund → Kedarnath → Joshimath → Badrinath → Haridwar";
      description = "The Do Dham Yatra is the perfect pilgrimage for those who want to experience the two most powerful Himalayan shrines — the Jyotirlinga of Lord Shiva at Kedarnath and the Vishnu abode at Badrinath — in a single journey. Covering the two most spiritually significant and dramatically located temples of the Char Dham circuit, the Do Dham provides a complete divine experience without the extended duration of the full Char Dham. The 16 km trek to Kedarnath through the Mandakini Valley and the serene road journey to Badrinath through the Alaknanda Valley offer two contrasting but equally profound Himalayan experiences.";
      spiritualSignificance = "Kedarnath — one of the 12 Jyotirlingas and the most important Shiva shrine in north India. Badrinath — one of the 108 Divya Desams of Vaishnavism. Together they represent the twin pillars of Shaiva and Vaishnava devotion in the Himalaya. Completing both in a single pilgrimage is believed to bestow immense spiritual merit.";
      temples = ["Kedarnath Temple (3,583 m) — 12th Jyotirlinga", "Bhairavnath Temple (mandatory visit after Kedarnath)", "Badrinath Temple (3,133 m) — Lord Vishnu Char Dham", "Tapt Kund (sacred hot spring)", "Brahma Kapal — ancestor ritual site", "Mana Village — last Indian village before Tibet"];
      registration = "Online registration mandatory for both temples. BKTC manages Kedarnath; separate Badrinath registration at Joshimath. Helicopter bookable from Phata/Guptkashi for Kedarnath.";
      templeTimings = "Kedarnath: Darshan 6:00 AM - 3:00 PM, Evening Aarti 7:30 PM. Badrinath: Darshan 7:00 AM - 1:00 PM & 3:00 PM - 9:00 PM.";
      pujaGuide = "Kedarnath Mahabhishek: ₹750 (BKTC booking). Badrinath Abhishek: ₹550. Brahma Kapal pitru tarpan: ₹151+. Our guide assists with all puja bookings on arrival.";
      helicopterInfo = ?("Kedarnath helicopter from Phata (₹6,500 one way), Guptkashi (₹7,200 one way), or Sirsi (₹8,000 one way). Book 3-4 months ahead for peak season. No helicopter to Badrinath — road accessible only.");
      registrationInfo = "Online biometric registration at uttarakhandtourism.gov.in. Bring Aadhaar card. Biometric re-verification at Gaurikund (Kedarnath) and Joshimath (Badrinath).";
      permits = "No special trekking permits required. Temple entry is free. Puja fees as per BKTC schedule.";
      accessibility = "Kedarnath: Pony and Palki (doli) service from Gaurikund. Helicopter from Phata/Guptkashi. Badrinath: Fully road accessible, no trek required.";
      priceRange = pr(12000, 22000);
      imageUrl = "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?w=1200";
    });
    y.add({
      id = 4; name = "Valley of Flowers & Hemkund Sahib Yatra"; slug = "valley-hemkund-yatra";
      duration = "5 Days / 4 Nights";
      season = "July to September (Valley open mid-June to October; Hemkund Sahib open June-October)";
      route = "Haridwar/Rishikesh → Govindghat → Ghangaria → Valley of Flowers → Hemkund Sahib";
      description = "A spiritually enriching and naturally magnificent journey combining two iconic destinations: the UNESCO World Heritage Valley of Flowers and the Hemkund Sahib Gurudwara — the world's highest Sikh shrine at 4,329 m. The Valley of Flowers, a 87.5 sq km national park, bursts into a stunning carpet of 300+ wildflower species between July and September. Hemkund Sahib, the sacred lake where Guru Gobind Singh (the 10th Sikh Guru) is believed to have meditated in a previous life, draws hundreds of thousands of pilgrims and trekkers every season. The base village of Ghangaria serves as the staging point for both these extraordinary destinations.";
      spiritualSignificance = "Hemkund Sahib is one of the most sacred Sikh pilgrimage sites in India, believed to be the location described by Guru Gobind Singh in his autobiography (Bachittar Natak) as the place of his meditation in a previous incarnation. The crystalline glacial lake at 4,329 m surrounded by seven peaks creates a setting of profound spiritual power. The adjacent Lokpal (Laxman) Temple adds Hindu significance to the site.";
      temples = ["Hemkund Sahib Gurudwara (4,329 m) — world's highest Gurudwara", "Lokpal (Laxman) Temple beside Hemkund Lake", "Valley of Flowers National Park (UNESCO World Heritage)", "Govindghat Gurudwara — starting point"];
      registration = "Valley of Flowers: Forest Dept entry permit mandatory — ₹150/day (Indian), ₹600/day (foreign). No camping inside the valley. Hemkund Sahib: Open access for pilgrims, no registration required.";
      templeTimings = "Hemkund Sahib Gurudwara: 5:00 AM - 9:00 PM (July-September). Valley of Flowers: Sunrise to sunset. Last entry 3:00 PM for day visits.";
      pujaGuide = "Hemkund Sahib follows Sikh maryada (religious protocol). Cover head before entering. Remove shoes at the langar (community kitchen) and gurudwara entrance. Ardas (prayer) conducted throughout the day. Langar (free community meal) available for all visitors irrespective of faith.";
      helicopterInfo = null;
      registrationInfo = "Valley of Flowers: Online permit via Nanda Devi National Park portal or purchase at Govindghat Forest Office. Carry valid ID. Season: mid-June to October. Hemkund Sahib: No pre-registration required.";
      permits = "Valley of Flowers National Park entry: ₹150/day Indian, ₹600/day foreign. Camera fee: ₹50. No camping inside the valley. Ghangaria is the designated accommodation base.";
      accessibility = "No vehicle access beyond Govindghat. 13 km trek to Ghangaria base. Pony/horse service available from Govindghat to Ghangaria (₹700-900). Helicopter service available from Govindghat to Ghangaria for elderly/disabled (₹1,500-2,000 per person, weather-permitting).";
      priceRange = pr(9500, 14000);
      imageUrl = "https://images.unsplash.com/photo-1598962942741-44b0ce1e8d76?w=1200";
    });
    y.add({
      id = 5; name = "Gangotri & Gaumukh Tapovan Yatra"; slug = "gangotri-gaumukh-yatra";
      duration = "5 Days / 4 Nights";
      season = "May to October (Gaumukh permit: May 1 - November 30, max 150 permits/day)";
      route = "Haridwar → Uttarkashi → Gangotri Temple → Chirbasa → Bhojbasa → Gaumukh → Tapovan";
      description = "A sacred and spectacular yatra-trek that begins at the Gangotri Temple (3,048 m) — where the Bhagirathi River (Ganga) emerges from the mountains — and ascends 18 km through ancient pine and birch forests to Gaumukh (3,892 m), the snout of the Gangotri Glacier where the Bhagirathi River takes its source. For the most dedicated pilgrims and trekkers, the additional climb to Tapovan (4,463 m) offers a high meadow with direct views of Shivling (6,543 m), the Bhagirathi peaks, and Meru (6,660 m) — considered the most photographed mountain faces in the Indian Himalaya. Gangotri is one of the four Char Dhams and one of Hinduism's most sacred rivers' origin points.";
      spiritualSignificance = "Gangotri is the source of the holy Ganga (Bhagirathi River), considered the most sacred river in Hinduism. The goddess Ganga is believed to have descended to Earth at Gangotri following King Bhagirath's penance. The Gangotri Temple (Ganga Mata) stands at 3,048 m and was rebuilt by Amar Singh Thapa of the Gorkha army in the early 19th century. Pilgrims believe bathing in the Bhagirathi at Gangotri purifies all sins.";
      temples = ["Gangotri Temple (3,048 m) — Goddess Ganga, Char Dham", "Bhagirathi Shila — sacred rock where King Bhagirath prayed", "Gaumukh Glacier Snout (3,892 m) — actual source of Ganga", "Tapovan Meadow (4,463 m) — meditation ground below Shivling"];
      registration = "Gangotri Temple: Online registration at Uttarakhand Tourism portal. Gaumukh Glacier: Mandatory Forest Dept permit — limited to 150 permits/day. Book in advance for May-June peak.";
      templeTimings = "Gangotri Temple: Morning Aarti 6:00 AM. Darshan 6:00 AM - 2:00 PM & 4:00 PM - 9:00 PM. Evening Aarti 8:30 PM. Temple closes November (after Diwali) and reopens Akshaya Tritiya (Apr-May).";
      pujaGuide = "Ganga Abhishek at Gangotri: ₹251-1001. Ganga Aarti participation is free. Bring Ganga Jal container to carry sacred water home. Priests (pandas) available for ancestral rituals. Pitru Tarpan ceremony at the Bhagirathi Shila ghats.";
      helicopterInfo = null;
      registrationInfo = "Gangotri Temple: Register at uttarakhandtourism.gov.in. Gaumukh: Permit from Forest Office, Gangotri (₹150 Indian, ₹600 foreign, max 150/day). Keep permit copy for checkpoint at Chirbasa and Bhojbasa.";
      permits = "Gaumukh Glacier entry permit: ₹150 (Indian), ₹600 (foreign nationals). No camping beyond Bhojbasa without special permits. Tapovan camping: Additional permit from Forest Office required.";
      accessibility = "Gangotri Temple fully road accessible. Trek from Gangotri to Gaumukh (18 km) is mandatory — no vehicle access. No pony service on this route (rocky trail). Porters available for hire at Gangotri (₹800-1,200/day).";
      priceRange = pr(10000, 16000);
      imageUrl = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200";
    });
    y.add({
      id = 6; name = "Panch Kedar Yatra"; slug = "panch-kedar-yatra";
      duration = "16 Days / 15 Nights";
      season = "May to October (each temple opens on its designated auspicious date)";
      route = "Haridwar → Kedarnath → Madmaheshwar → Tungnath → Rudranath → Kalpeshwar → Haridwar";
      description = "The Panch Kedar Yatra is Hinduism's most demanding and spiritually rewarding pilgrimage circuit, visiting all five manifestations of Lord Shiva as he appeared in five different body parts in the Garhwal Himalaya following the events of the Mahabharata. The circuit requires 14-18 days of trekking through some of the most remote and magnificently beautiful terrain in Uttarakhand, visiting temples at altitudes between 2,286 m (Kalpeshwar) and 3,680 m (Tungnath — the world's highest Shiva temple). This is a journey for the most dedicated pilgrims and fit trekkers who seek the complete Shiva darshan of the Himalaya.";
      spiritualSignificance = "According to the Mahabharata, after the Kurukshetra war the Pandavas sought Lord Shiva's blessings to atone for the sin of killing their own kin. Shiva, unwilling to meet them, took the form of a bull and hid in Guptakashi. Pursued by the Pandavas, the bull dived into the ground — its different body parts emerging at five places: hump at Kedarnath, navel at Madmaheshwar, arms at Tungnath, face at Rudranath, and matted hair (jata) at Kalpeshwar. Visiting all five is considered the most complete expression of Shiva worship.";
      temples = ["Kedarnath Temple (3,583 m) — Shiva's hump (koop)", "Madmaheshwar Temple (3,497 m) — Shiva's navel (nabhi)", "Tungnath Temple (3,680 m) — Shiva's arms (bahu) — world's highest Shiva temple", "Rudranath Temple (2,286 m) — Shiva's face (mukha)", "Kalpeshwar Temple (2,200 m) — Shiva's matted hair (jata) — accessible year-round"];
      registration = "BKTC manages Kedarnath registration. Other four temples managed by local trusts — no online registration required. Valid photo ID needed at each checkpoint.";
      templeTimings = "Kedarnath: 6:00 AM - 3:00 PM. Madmaheshwar: 6:00 AM - 7:00 PM. Tungnath: 5:00 AM - 7:00 PM. Rudranath: 6:00 AM - 8:00 PM. Kalpeshwar: Open year-round, 6:00 AM - 8:00 PM.";
      pujaGuide = "Each temple has its own puja schedule and offerings. Kedarnath Mahabhishek (₹750 BKTC). Tungnath Rudrabhishek (₹501). Local pandas at each temple offer complete puja services. Carry panchamrit (five sacred offerings) — milk, curd, honey, ghee, sugar — for each temple. Our yatra guide coordinates all puja arrangements in advance.";
      helicopterInfo = ?("Helicopter service available for Kedarnath only (from Phata/Guptkashi/Sirsi). The other four temples require trekking and have no helicopter access.");
      registrationInfo = "Kedarnath: Online registration at uttarakhandtourism.gov.in mandatory. Biometric at Gaurikund. Other Panch Kedar temples: No online registration. Local permits at Ukhimath (Madmaheshwar), Chopta (Tungnath), Sagar (Rudranath), and Helang (Kalpeshwar).";
      permits = "Forest area entry permits required for Madmaheshwar (₹50) and Rudranath (₹50) routes. Kedarnath as per BKTC. All permits and registrations arranged by Manya Destination as part of the package.";
      accessibility = "Only Kalpeshwar (roadside) and Kedarnath (helicopter available) have accessible alternatives. Madmaheshwar requires 24 km trek, Tungnath 3.5 km, Rudranath 20 km. This yatra requires good fitness and is not suitable for elderly or disabled pilgrims without prior assessment.";
      priceRange = pr(35000, 60000);
      imageUrl = "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?w=1200";
    });
    y;
  };

  // ── migrate packages: upgrade old 4 + add 8 new ─────────────────────────
  func migratePackages(old : List.List<OldPackageState>) : List.List<NewPackageState> {
    let p = List.empty<NewPackageState>();
    // Upgrade existing packages with new fields
    for (op in old.values()) {
      let groupSizeMax : Nat = 20;
      let accommodationType = if (op.category == "Spiritual") { "Hotels & Dharamshalas" } else if (op.category == "Expedition") { "Guesthouses & Monastery Stays" } else { "Tented Camps & Guesthouses" };
      let defaultTiers : [PackageTier] = [tier("Budget", op.priceRange.minINR), tier("Standard", (op.priceRange.minINR + op.priceRange.maxINR) / 2), tier("Premium", op.priceRange.maxINR)];
      p.add({ op with accommodationType; groupSizeMax; tiers = defaultTiers });
    };
    // Add 8 new packages
    p.add({
      id = 4; name = "Valley of Flowers & Hemkund Sahib Package"; slug = "valley-hemkund-package";
      duration = "7 Days from Haridwar";
      problemSolved = "I want the UNESCO Valley of Flowers AND a Sikh pilgrimage to Hemkund Sahib in one trip with no planning stress";
      description = "A deeply rewarding combination of natural wonder and spiritual pilgrimage. The Valley of Flowers National Park — a UNESCO World Heritage Site — blooms into one of nature's most extraordinary spectacles between July and September, with 300+ wildflower species carpeting the valley. Just 6 km above the valley base, Hemkund Sahib Gurudwara (4,329 m) — the world's highest Gurudwara — provides a profoundly spiritual counterpoint. This package handles all forest permits, accommodation in Ghangaria, and transportation from Haridwar.";
      itinerary = [
        day(1, "Haridwar to Govindghat", "Haridwar → Govindghat", 0.0, 280, 1828, "Drive 300 km from Haridwar through Rishikesh, Devprayag, Rudraprayag, Karnaprayag to Govindghat.", "Govindghat Guesthouse", "Dinner", "Easy", ["Devprayag", "Joshimath", "Govindghat"]),
        day(2, "Govindghat to Ghangaria", "Govindghat → Ghangaria", 13.0, 1828, 3048, "Trek 13 km alongside the Pushpawati River through birch and rhododendron forests to Ghangaria base.", "Ghangaria Guesthouse", "All Meals", "Moderate", ["Bhyundar Valley", "Pushpawati River", "Ghangaria"]),
        day(3, "Valley of Flowers Day Visit", "Ghangaria → Valley of Flowers → Ghangaria", 10.0, 3048, 3658, "Day visit to the Valley of Flowers. Spend hours among the sea of 300+ wildflower species. Photography paradise.", "Ghangaria Guesthouse", "All Meals", "Easy to Moderate", ["Valley entrance", "Central meadow", "Pushpawati stream"]),
        day(4, "Hemkund Sahib Pilgrimage", "Ghangaria → Hemkund Sahib (4329m) → Ghangaria", 12.0, 3048, 4329, "Steep 6 km ascent to Hemkund Sahib — world's highest Gurudwara at 4,329 m. Sacred glacial lake, ardas ceremony, community langar.", "Ghangaria Guesthouse", "All Meals", "Difficult", ["Hemkund Sahib Gurudwara", "Hemkund glacial lake", "Lokpal Temple"]),
        day(5, "Valley Return Day (optional second visit)", "Ghangaria → Valley of Flowers (optional) → Ghangaria", 10.0, 3048, 3658, "Optional second day in the Valley of Flowers to explore different sections. Or rest day in Ghangaria.", "Ghangaria Guesthouse", "All Meals", "Easy", ["Valley inner sections", "Pushpawati glacier view"]),
        day(6, "Ghangaria to Govindghat", "Ghangaria → Govindghat", 13.0, 3048, 1828, "Descend 13 km back to Govindghat through the beautiful Bhyundar Valley.", "Govindghat/Joshimath", "All Meals", "Easy to Moderate", ["Bhyundar Village", "Alaknanda River"]),
        day(7, "Return to Haridwar", "Govindghat → Haridwar", 0.0, 1828, 280, "Drive back to Haridwar. Trip concludes.", "N/A", "Breakfast", "Easy", ["Joshimath", "Haridwar"])
      ];
      inclusions = ["All accommodation (6 nights)", "All meals Day 1 dinner to Day 7 breakfast", "Valley of Flowers entry permits (₹150/day Indian)", "Experienced trek guide", "Support staff", "Medical kit", "Haridwar pick-up and drop"];
      exclusions = ["Travel to/from Haridwar", "Personal expenses", "Pony service (available for hire separately)", "Travel insurance", "Hemkund Sahib helicopter"];
      priceRange = pr(13000, 20000);
      groupSize = "6 to 20 persons";
      accommodationType = "Guesthouses & Forest Rest Houses";
      groupSizeMax = 20;
      tiers = [tier("Budget", 13000), tier("Standard", 16000), tier("Premium", 20000)];
      imageUrl = "https://images.unsplash.com/photo-1598962942741-44b0ce1e8d76?w=1200";
      category = "Nature & Pilgrimage";
    });
    p.add({
      id = 5; name = "Roopkund & Bedni Bugyal Trek Package"; slug = "roopkund-bedni-package";
      duration = "9 Days";
      problemSolved = "I want a challenging high-altitude trek to the mysterious skeleton lake — difficulty-tested, fully supported";
      description = "An expedition to one of India's most dramatic and mysterious trekking destinations — Roopkund, the Mystery Lake at 5,029 m, where hundreds of 9th-century human skeletal remains lie preserved in the ice. The route traverses Bedni Bugyal, considered one of Asia's finest high-altitude meadows, with unobstructed views of Trishul (7,120 m) and Nanda Ghunti (6,309 m). This package includes all mandatory Uttarakhand Forest Department permits, which are limited — advance booking essential.";
      itinerary = [
        day(1, "Kathgodam/Rishikesh to Lohajung", "Kathgodam → Lohajung", 0.0, 300, 2350, "Drive 220 km to Lohajung through Almora and Kausani.", "Lohajung Guesthouse", "Dinner", "Easy", ["Almora", "Kausani", "Lohajung"]),
        day(2, "Lohajung to Didna", "Lohajung → Didna Village", 6.0, 2350, 2800, "Trek through oak and rhododendron forest to Didna.", "Didna Campsite", "All Meals", "Moderate", ["Wan village", "Didna"]),
        day(3, "Didna to Ali Bugyal", "Didna → Ali Bugyal", 10.0, 2800, 3627, "Trek to Ali Bugyal — vast open meadows with Himalayan panorama.", "Ali Bugyal Campsite", "All Meals", "Moderate to Difficult", ["Ali Bugyal", "Nanda Ghunti view"]),
        day(4, "Ali Bugyal to Bedni Bugyal", "Ali Bugyal → Bedni Bugyal", 9.0, 3627, 3354, "Cross the magnificent Bedni Bugyal with its sacred Bedni Kund pool.", "Bedni Bugyal Campsite", "All Meals", "Moderate", ["Bedni Bugyal", "Bedni Kund", "Patthar Nachuni"]),
        day(5, "Bedni Bugyal to Bhagwabasa", "Bedni Bugyal → Ghora Lotani → Bhagwabasa", 14.0, 3354, 4863, "Long high-altitude day to last campsite at 4,863 m before Roopkund.", "Bhagwabasa Campsite", "All Meals", "Difficult", ["Ghora Lotani", "Bhagwabasa"]),
        day(6, "Summit Day: Roopkund Lake", "Bhagwabasa → Roopkund (5029m) → Bedni Bugyal", 13.0, 4863, 5029, "Pre-dawn ascent to Roopkund Mystery Lake. See the skeletal remains. Descend all the way to Bedni Bugyal.", "Bedni Bugyal Campsite", "All Meals", "Very Difficult", ["Roopkund Lake (5029m)", "Skeletal remains", "Trishul panorama"]),
        day(7, "Bedni Bugyal to Lohajung", "Bedni Bugyal → Lohajung", 13.0, 3354, 2350, "Long descent back to Lohajung.", "Lohajung Guesthouse", "All Meals", "Moderate", ["Wan village", "Lohajung"]),
        day(8, "Rest Day / Buffer Day in Lohajung", "Lohajung", 0.0, 2350, 2350, "Built-in buffer day for acclimatization or delays. Explore Lohajung village.", "Lohajung Guesthouse", "All Meals", "Easy", ["Lohajung village"]),
        day(9, "Return to Kathgodam/Rishikesh", "Lohajung → Kathgodam", 0.0, 2350, 300, "Drive back. Trek concludes.", "N/A", "Breakfast", "Easy", ["Kausani", "Almora", "Kathgodam"])
      ];
      inclusions = stdInclusions().concat(["Roopkund Forest Dept permit (limited)"]);
      exclusions = stdExclusions();
      priceRange = pr(16000, 25000);
      groupSize = "6 to 16 persons (permit limited)";
      accommodationType = "Tented Camps";
      groupSizeMax = 16;
      tiers = [tier("Standard", 16000), tier("Premium", 20000), tier("Deluxe", 25000)];
      imageUrl = "https://images.unsplash.com/photo-1571901521643-14dd94cd09ac?w=1200";
      category = "Adventure";
    });
    p.add({
      id = 6; name = "Family Himalayan Holiday — Auli & Chopta"; slug = "family-auli-chopta";
      duration = "6 Days";
      problemSolved = "I want a family-friendly Himalayan holiday with kids — beautiful, safe, with a real trek but no extreme difficulty";
      description = "The ideal Himalayan family holiday combining the ski resort of Auli (India's finest skiing destination), the magical Tungnath-Chandrashila trail (world's highest Shiva temple), the serene Deoria Tal lake, and the adventure capital of Rishikesh. Designed with families in mind — safe trails, comfortable accommodation, private vehicle throughout, and activities suitable for children as young as 8. No prior trekking experience required.";
      itinerary = [
        day(1, "Haridwar/Rishikesh Arrival", "Haridwar/Rishikesh", 0.0, 280, 320, "Arrive Rishikesh. Evening Ganga Aarti at Triveni Ghat. River walk.", "Rishikesh Hotel/Camp", "Dinner", "Easy", ["Triveni Ghat", "Laxman Jhula"]),
        day(2, "Rishikesh to Auli", "Rishikesh → Auli", 0.0, 320, 2519, "Drive 5 hrs to Auli via Devprayag, Rudraprayag, Joshimath. Take the Auli Ropeway (longest in Asia — 4 km) to Auli top.", "Auli Resort", "Breakfast, Dinner", "Easy", ["Joshimath", "Auli ropeway", "Auli ski slopes"]),
        day(3, "Auli to Chopta", "Auli → Ukhimath → Chopta", 0.0, 2519, 2680, "Morning at Auli. Drive 3 hrs to Chopta through Ukhimath. Evening forest walk around Chopta.", "Chopta Eco Lodge", "All Meals", "Easy", ["Auli meadows", "Ukhimath", "Chopta meadow"]),
        day(4, "Chopta: Tungnath Temple & Chandrashila Summit", "Chopta → Tungnath (3680m) → Chandrashila (4130m) → Chopta", 7.0, 2680, 4130, "Trek to Tungnath Temple (3,680 m) — world's highest Shiva temple. Continue to Chandrashila Summit (4,130 m) for 360° Himalayan panorama. Return to Chopta.", "Chopta Eco Lodge", "All Meals", "Moderate", ["Tungnath Temple (3680m)", "Chandrashila Summit (4130m)", "Nanda Devi view"]),
        day(5, "Deoria Tal", "Chopta → Ukhimath → Sari → Deoria Tal", 3.0, 2680, 2438, "Drive to Sari village and trek 2 km to the beautiful Deoria Tal lake — famous for its Himalayan mirror reflection.", "Ukhimath/Guptkashi", "All Meals", "Easy", ["Sari village", "Deoria Tal lake", "Kedar peak reflection"]),
        day(6, "Return to Haridwar/Rishikesh", "Guptkashi → Rishikesh → Haridwar", 0.0, 1000, 280, "Drive back via Rudraprayag and Devprayag. Trek concludes.", "N/A", "Breakfast", "Easy", ["Devprayag", "Haridwar"])
      ];
      inclusions = ["All accommodation (5 nights)", "All meals from Day 1 dinner onwards", "Private vehicle (Innova/Xylo) throughout", "Experienced family trek guide", "Auli Ropeway tickets", "Tungnath-Chandrashila guided trek", "Deoria Tal trek", "All forest entry fees", "Medical kit"];
      exclusions = ["Travel to/from Haridwar", "Personal expenses", "Travel insurance", "Ski equipment rental at Auli", "Any activities not mentioned"];
      priceRange = pr(14000, 28000);
      groupSize = "2 to 12 persons (family/small group)";
      accommodationType = "Family Hotels & Eco Lodges";
      groupSizeMax = 12;
      tiers = [tier("Standard", 14000), tier("Comfort", 20000), tier("Luxury", 28000)];
      imageUrl = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200";
      category = "Family";
    });
    p.add({
      id = 7; name = "Kumaon Heritage & Trekking Package"; slug = "kumaon-heritage-trek";
      duration = "8 Days";
      problemSolved = "I want mountains but also culture — colonial heritage, Himalayan lakes, temples, and a proper glacier trek all in one trip";
      description = "An expertly curated journey through the Kumaon Himalayas combining the colonial charm of Nainital and Mukteshwar, the panoramic views of Kausani (the Switzerland of India), the temple town of Bageshwar, and the crown jewel — the Pindari Glacier Trek through the Nanda Devi Biosphere Reserve. This is the perfect package for travellers who want both cultural depth and mountain adventure without committing to an extreme high-altitude expedition.";
      itinerary = [
        day(1, "Delhi/Kathgodam to Nainital", "Kathgodam → Nainital", 0.0, 300, 2084, "Arrive Nainital. Lake boat ride. Mall Road walk. Evening at Nainital Lake.", "Nainital Hotel", "Dinner", "Easy", ["Nainital Lake", "Mall Road", "Naini Peak"]),
        day(2, "Nainital to Mukteshwar", "Nainital → Mukteshwar", 0.0, 2084, 2286, "Drive 50 km to Mukteshwar. Visit colonial-era IVRI institute. Chauli Ki Jali viewpoint. Apple orchards walk.", "Mukteshwar Cottage", "Breakfast, Dinner", "Easy", ["IVRI Mukteshwar", "Chauli Ki Jali", "Himalayan views"]),
        day(3, "Mukteshwar to Kausani", "Mukteshwar → Almora → Kausani", 0.0, 2286, 1890, "Drive through Almora (Kasar Devi temple). Arrive Kausani — 'Switzerland of India' with Nanda Devi panorama.", "Kausani Hotel", "Breakfast, Dinner", "Easy", ["Almora", "Kasar Devi", "Kausani Nanda Devi view"]),
        day(4, "Kausani to Bageshwar to Song", "Kausani → Bageshwar → Song Village", 0.0, 1890, 1700, "Drive to Bageshwar (temple town, confluence of Saryu and Gomti). Continue to Song Village — trek start point.", "Song Village Guesthouse", "All Meals", "Easy", ["Bageshwar Bagnath Temple", "Song Village"]),
        day(5, "Song to Dhakuri to Khati", "Song → Dhakuri (2680m) → Khati", 14.0, 1700, 2200, "Begin Pindari Glacier Trek through dense forest to Dhakuri Pass (2,680 m) and descend to Khati village.", "Khati Village", "All Meals", "Moderate", ["Dhakuri Pass", "Nanda Devi view", "Khati village"]),
        day(6, "Khati to Pindari Glacier", "Khati → Dwali → Phurkia → Zero Point", 20.0, 2200, 3660, "Trek to Pindari Glacier Zero Point (3,660 m) through ancient villages and moraines. Views of Nanda Devi, Nanda Kot.", "Phurkia Forest Rest House", "All Meals", "Moderate to Difficult", ["Dwali camp", "Phurkia", "Pindari Glacier (3660m)", "Nanda Kot (6861m)"]),
        day(7, "Return Pindari to Song", "Phurkia → Khati → Song", 24.0, 3660, 1700, "Long descent back to Song village.", "Song Village", "All Meals", "Moderate", ["Khati village", "Song"]),
        day(8, "Song to Kathgodam/Delhi", "Song → Kathgodam", 0.0, 1700, 300, "Drive back to Kathgodam. Journey concludes.", "N/A", "Breakfast", "Easy", ["Almora", "Kathgodam"])
      ];
      inclusions = ["All accommodation (7 nights)", "All meals as mentioned", "Private vehicle throughout", "Experienced Kumaon guide", "All forest permits (Nanda Devi Biosphere)", "Pindari Glacier trek support", "All entry fees and cultural sites"];
      exclusions = ["Delhi-Kathgodam travel", "Personal expenses", "Travel insurance", "Any activities not mentioned"];
      priceRange = pr(18000, 32000);
      groupSize = "2 to 10 persons";
      accommodationType = "Heritage Hotels & Forest Rest Houses";
      groupSizeMax = 10;
      tiers = [tier("Standard", 18000), tier("Comfort", 24000), tier("Heritage", 32000)];
      imageUrl = "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200";
      category = "Heritage & Adventure";
    });
    p.add({
      id = 8; name = "Kasol & Sar Pass Adventure"; slug = "kasol-sar-pass";
      duration = "7 Days";
      problemSolved = "I want Parvati Valley's backpacker vibe with a real mountain trek — café culture, nature, and a mountain pass";
      description = "The perfect package combining the hippy-chic village of Kasol in the Parvati Valley with the exhilarating Sar Pass trek (4,200 m). Start with Kasol's famous cafés and riverside camping before ascending through Grahan village, alpine meadows, and dense forests to the Sar Pass. The descent involves glissading down snow slopes — one of the most thrilling activities in Indian trekking. This package attracts travellers from 20-35 seeking both the Himachali cultural experience and a proper mountain challenge.";
      itinerary = [
        day(1, "Delhi to Kasol", "Delhi → Bhuntar → Kasol", 0.0, 250, 1640, "Overnight bus from Delhi or drive. Arrive Kasol. Explore the famous riverside café strip and Israeli market.", "Kasol Guesthouse", "N/A", "Easy", ["Kasol riverside", "Parvati Valley"]),
        day(2, "Kasol Acclimatization — Manikaran", "Kasol → Manikaran → Kasol", 0.0, 1640, 1760, "Day trip to Manikaran — sacred to both Sikhs and Hindus. Famous for hot springs. Gurudwara langar.", "Kasol Guesthouse", "Breakfast, Dinner", "Easy", ["Manikaran Gurudwara", "Manikaran hot springs"]),
        day(3, "Kasol to Grahan Village", "Kasol → Grahan Village", 9.0, 1640, 2380, "Trek through forest to traditional Grahan Village. Evening bonfire.", "Grahan Campsite", "All Meals", "Moderate", ["Grahan village", "Forest trail"]),
        day(4, "Grahan to Min Thatch", "Grahan → Min Thatch", 7.0, 2380, 3050, "Forest gives way to open alpine meadows.", "Min Thatch Campsite", "All Meals", "Moderate", ["Min Thatch meadow", "Mountain views"]),
        day(5, "Min Thatch to Nagaru & Sar Pass Summit", "Min Thatch → Nagaru → Sar Pass (4200m)", 7.0, 3050, 4200, "Ascend to Nagaru then summit Sar Pass at 4,200 m. Glissade down the snow slopes!", "Biskeri Thatch", "All Meals", "Difficult", ["Sar Pass (4200m)", "Glissading slope", "Parvati Valley panorama"]),
        day(6, "Biskeri Thatch to Barshaini", "Biskeri Thatch → Barshaini", 12.0, 3200, 1900, "Long descent to Barshaini on the Parvati Road.", "Barshaini/Kasol", "All Meals", "Moderate", ["Barshaini", "Parvati River"]),
        day(7, "Return to Delhi", "Kasol → Bhuntar → Delhi", 0.0, 1640, 250, "Drive/bus back to Delhi. Trip concludes.", "N/A", "Breakfast", "Easy", ["Bhuntar", "Delhi"])
      ];
      inclusions = ["All accommodation (6 nights)", "All meals during trek days", "Certified trek leader", "All camping equipment", "Forest permits", "Bhuntar airport/bus station pick-up"];
      exclusions = ["Delhi-Kasol transport", "Personal expenses", "Kasol café meals", "Travel insurance"];
      priceRange = pr(9500, 15000);
      groupSize = "6 to 20 persons";
      accommodationType = "Guesthouses & Tented Camps";
      groupSizeMax = 20;
      tiers = [tier("Budget", 9500), tier("Standard", 12000), tier("Premium", 15000)];
      imageUrl = "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200";
      category = "Adventure";
    });
    p.add({
      id = 9; name = "Luxury Himalayan Escape"; slug = "luxury-himalayan-escape";
      duration = "7 Days";
      problemSolved = "I want mountains with luxury — premium boutique stays, private vehicle, gourmet meals, yoga, and spa, without roughing it";
      description = "Himalayan luxury, reimagined. This exclusive package moves between Mussoorie's colonial heritage, Dhanaulti's cedar forests, Chopta's alpine meadows, and Rishikesh's riverside luxury camps — staying only in carefully curated boutique properties and premium tented camps with mountain views. Private AC Innova Crysta throughout, professional naturalist guide, gourmet Himalayan cuisine, morning yoga, and indulgent spa sessions make this the definitive premium Himalayan experience for discerning travellers.";
      itinerary = [
        day(1, "Delhi to Mussoorie", "Delhi → Mussoorie", 0.0, 250, 2005, "Drive 290 km to Mussoorie. Check in to luxury heritage hotel. Walk on the Mall Road. Sunset from Gun Hill.", "Mussoorie Luxury Heritage Hotel", "High Tea & Dinner", "Easy", ["Mussoorie Mall Road", "Gun Hill", "Kempty Falls nearby"]),
        day(2, "Mussoorie to Dhanaulti to Chopta", "Mussoorie → Dhanaulti → Chopta", 0.0, 2005, 2680, "Morning at Mussoorie. Drive through the cedar forests of Dhanaulti. Arrive Chopta — boutique eco-lodge check-in.", "Chopta Boutique Eco Lodge", "All Meals", "Easy", ["Dhanaulti Eco Park", "Cedar forests", "Chopta meadow"]),
        day(3, "Tungnath Temple & Chandrashila", "Chopta → Tungnath (3680m) → Chandrashila (4130m)", 7.0, 2680, 4130, "Guided trek to Tungnath Temple and Chandrashila summit. Picnic lunch with mountain view. Return to lodge for spa session.", "Chopta Boutique Eco Lodge", "All Meals", "Moderate", ["Tungnath Temple", "Chandrashila Summit", "Himalayan panorama"]),
        day(4, "Deoria Tal Sunrise & Drive to Rishikesh", "Chopta → Sari → Deoria Tal → Rishikesh", 2.0, 2680, 320, "Pre-dawn drive to Sari, sunrise trek to Deoria Tal (Himalayan mirror lake). Drive to Rishikesh riverside luxury camp.", "Rishikesh Luxury Riverside Camp", "All Meals", "Easy", ["Deoria Tal sunrise", "Rishikesh Ganga"]),
        day(5, "Rishikesh — Adventure & Wellness", "Rishikesh", 0.0, 320, 320, "White-water rafting (Grade 3-4). Afternoon spa and yoga nidra session. Sunset Ganga Aarti at Triveni Ghat.", "Rishikesh Luxury Riverside Camp", "All Meals + Brunch", "Easy", ["Ganga rafting", "Yoga session", "Ganga Aarti"]),
        day(6, "Rishikesh Leisure Day", "Rishikesh", 0.0, 320, 320, "Morning yoga with Himalayan backdrop. Visit Beatles Ashram (Maharishi Mahesh Yogi Ashram). Optional bungee jumping (world's highest in India — 83 m). Ayurvedic dinner.", "Rishikesh Luxury Riverside Camp", "All Meals", "Easy", ["Beatles Ashram", "Bungee jumping", "Lakshman Jhula"]),
        day(7, "Return to Delhi", "Rishikesh → Haridwar → Delhi", 0.0, 320, 250, "Morning Ganga aarti. Drive to Delhi. Trip concludes.", "N/A", "Breakfast", "Easy", ["Haridwar", "Delhi"])
      ];
      inclusions = ["All accommodation (6 nights — boutique/luxury only)", "All meals (gourmet)", "Private AC Innova Crysta or equivalent throughout", "Professional naturalist guide", "Tungnath-Chandrashila guided trek", "White-water rafting session", "Daily yoga session", "One spa session", "All entry fees", "Deoria Tal sunrise experience"];
      exclusions = ["Flights to/from Delhi", "Personal shopping", "Bungee jumping fees", "Travel insurance", "Gratuities"];
      priceRange = pr(45000, 80000);
      groupSize = "2 to 6 persons (private luxury)";
      accommodationType = "Luxury Boutique Hotels & Premium Tented Camps";
      groupSizeMax = 6;
      tiers = [tier("Luxury", 45000), tier("Ultra-Luxury", 65000), tier("Exclusive", 80000)];
      imageUrl = "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=1200";
      category = "Luxury";
    });
    p.add({
      id = 10; name = "Solo Women's Trek — Kedarkantha"; slug = "solo-women-kedarkantha";
      duration = "7 Days from Delhi";
      problemSolved = "I want a safe, women-only guided snow trek with fellow solo female travellers and a certified women trek leader";
      description = "Designed exclusively for solo women travellers, this women-only Kedarkantha package creates a safe, empowering, and deeply rewarding trekking experience. Led by a certified women trek leader with 7+ years of high-altitude experience, the group is capped at 15 for intimate dynamics. Pre-trek safety briefings, 24/7 support contact, comprehensive medical kit, and a women-only camp arrangement ensure peace of mind. Many of our women trekkers report this as their most confidence-building travel experience ever.";
      itinerary = [
        day(1, "Delhi to Dehradun to Sankri", "Delhi → Dehradun → Sankri", 0.0, 250, 1950, "Overnight train guidance or bus from Delhi to Dehradun. Pick-up and drive to Sankri. Trek briefing and safety session.", "Sankri Homestay", "Dinner", "Easy", ["Dehradun", "Sankri"]),
        day(2, "Sankri to Juda Ka Talab", "Sankri → Juda Ka Talab", 6.0, 1950, 2936, "First trek through snow-laden pine forests to frozen Juda Ka Talab.", "Juda Ka Talab Camp", "All Meals", "Easy", ["Juda Ka Talab"]),
        day(3, "Juda Ka Talab to Base Camp", "Juda Ka Talab → Kedarkantha Base", 4.0, 2936, 3650, "Ascent to base camp. Evening summit strategy session.", "Base Camp", "All Meals", "Moderate", ["Base camp views"]),
        day(4, "Summit Day", "Base Camp → Summit (3811m) → Hargaon", 6.0, 3650, 3811, "Summit Kedarkantha (3,811 m). 360° views. Celebratory moment at the summit cross.", "Hargaon Camp", "All Meals", "Moderate to Difficult", ["Kedarkantha Summit (3811m)"]),
        day(5, "Descent to Sankri", "Hargaon → Sankri", 8.0, 2700, 1950, "Descent through pine forest. Celebration dinner at Sankri.", "Sankri Homestay", "All Meals", "Easy", ["Pine forest", "Sankri"]),
        day(6, "Sankri to Dehradun", "Sankri → Dehradun", 0.0, 1950, 640, "Drive back to Dehradun.", "Dehradun Hotel", "Breakfast", "Easy", ["Dehradun"]),
        day(7, "Return to Delhi", "Dehradun → Delhi", 0.0, 640, 250, "Train/bus back. Trek concludes.", "N/A", "N/A", "Easy", ["Delhi"])
      ];
      inclusions = ["All accommodation (6 nights)", "All meals Day 1 dinner to Day 6 breakfast", "Certified women trek leader", "24/7 emergency contact line", "Comprehensive medical kit", "Women-only camp arrangement", "Safety briefing", "Forest permits", "Dehradun pick-up and drop"];
      exclusions = ["Delhi-Dehradun train/bus", "Personal trekking gear", "Travel insurance", "Personal expenses"];
      priceRange = pr(12000, 17000);
      groupSize = "Max 15 women";
      accommodationType = "Women-Only Tented Camps & Homestay";
      groupSizeMax = 15;
      tiers = [tier("Standard", 12000), tier("Comfort", 14500), tier("Premium", 17000)];
      imageUrl = "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=1200";
      category = "Women-Only";
    });
    p.add({
      id = 11; name = "Corporate Team Outing Package"; slug = "corporate-team-outing";
      duration = "3-5 Days (customizable)";
      problemSolved = "I need a memorable corporate team outing in the Himalayas with adventure activities, team bonding, and a mountain setting";
      description = "Transform your team dynamics against a backdrop of the Himalaya. Our corporate outing packages are designed to blend adventure, bonding, and reflection in some of the most spectacular mountain settings in India — Rishikesh, Chakrata, Chopta, and Kasol. Includes customized team-building activities (river crossing, rappelling, blind navigation), a professional facilitator for team reflection sessions, evening cultural programs, and full logistics management. Minimum 20 participants.";
      itinerary = [
        day(1, "Arrival & Orientation", "Base Location Arrival", 0.0, 320, 320, "Arrive at Rishikesh or Chakrata. Team orientation. Ice-breaker activities. Bonfire dinner.", "Group Camp / Resort", "Dinner", "Easy", ["Base camp setup", "Team orientation"]),
        day(2, "Adventure Day 1 — Team Challenges", "Adventure Activities", 2.0, 320, 1200, "River crossing exercise, rappelling (30 m cliff), valley crossing on zip-line, trust falls, group navigation challenge. Team debrief session in evening.", "Group Camp", "All Meals", "Moderate", ["Rappelling cliff", "River crossing", "Zip-line"]),
        day(3, "Trek & Reflection Day", "Group Trek", 8.0, 1200, 2500, "Half-day guided team trek to a viewpoint. Photography contest. Afternoon facilitated team reflection workshop. Cultural evening with local folk music and dance.", "Group Camp", "All Meals", "Easy to Moderate", ["Summit viewpoint", "Cultural evening"]),
        day(4, "Adventure Day 2 & Departure", "Final Activities", 0.0, 1200, 320, "Morning: final team challenge (optional rafting on Ganga, Grade 3-4). Valedictory session. Certificates. Depart after lunch.", "N/A", "Breakfast & Lunch", "Moderate", ["River rafting", "Certificate ceremony"])
      ];
      inclusions = ["All accommodation in group tents or resort rooms", "All meals", "Professional facilitator", "Adventure activity equipment", "Local transport", "Cultural evening", "Certificates of participation", "First aid"];
      exclusions = ["Travel to/from Delhi/Chandigarh", "Personal expenses", "Travel insurance", "Any specialized equipment purchase"];
      priceRange = pr(8000, 18000);
      groupSize = "Min 20, Max 100 persons";
      accommodationType = "Group Camps & Corporate Resorts";
      groupSizeMax = 100;
      tiers = [tier("Essential", 8000), tier("Professional", 12000), tier("Executive", 18000)];
      imageUrl = "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200";
      category = "Corporate";
    });
    p;
  };

  // ── migrate stays: upgrade old 3 + add 3 new ─────────────────────────────
  func migrateStays(old : List.List<OldStayState>) : List.List<NewStayState> {
    let s = List.empty<NewStayState>();
    // Upgrade existing stays
    let defaultAttractions = [["Kedarkantha Trek Base (1 km)", "Har Ki Dun Trailhead (Sankri)", "Govind Wildlife Sanctuary", "Swargarohini Peak views"], ["Tungnath Temple (4 km trek)", "Chandrashila Summit (5 km)", "Deoria Tal Lake (30 km)", "Ukhimath Village Temple"], ["Rishikesh city (5 km)", "Ganga Aarti at Triveni Ghat", "River rafting & kayaking", "Beatles Ashram", "Lakshman Jhula"]];
    let ownerNotes = ["We are the Rawat family of Sankri — this homestay has been our home for three generations. Our son Deepak leads the Kedarkantha Trek personally. You are not a guest here, you are family.", "Begun by the Semwal family in 2019 as an eco-retreat, Bugyals Retreat is our love letter to Chopta's alpine magic. We built each cottage with our own hands using local stone and deodar wood.", "The Sharma family has been welcoming trekkers to Tapovan since 2015. Our camp is the pre-trek home for hundreds of Himalayan adventurers every season. We know every trail, every teahouse, and every shortcut in the area."];
    var i = 0;
    for (os in old.values()) {
      let attractions = if (i < 3) { defaultAttractions[i] } else { [] : [Text] };
      let ownerNote = if (i < 3) { ownerNotes[i] } else { "Welcome from the Manya family." };
      s.add({ os with nearbyAttractions = attractions; ownerNote });
      i += 1;
    };
    // Add 3 new stays
    s.add({
      id = 3; name = "Manya Valley View Homestay"; slug = "valley-view-munsiyari";
      location = "Munsiyari, Pithoragarh, Uttarakhand";
      stayType = "Homestay";
      description = "Manya Valley View Homestay in Munsiyari is blessed with the finest mountain view in Kumaon — five Panchachuli peaks (the five stoves of the Pandavas) rising dramatically beyond the terrace. Munsiyari is the gateway to the Milam, Namik, and Pindari glaciers and one of Kumaon's last truly authentic hill towns. The homestay, run by the Bisht family, offers genuine Kumaoni hospitality, traditional Kumaoni cuisine (bhatt ki churkani, gahat dal, baadi), and personalised glacier trek arrangements.";
      amenities = ["Unobstructed Panchachuli peaks view", "Traditional Kumaoni breakfast and dinner", "Hot water (geyser)", "Room heaters (winter)", "Trek arrangement and guide service", "Bird-watching setup (150+ Himalayan species)", "Luggage storage for trekkers", "Flower garden"];
      nearbyAttractions = ["Pindari Glacier Trek Base (40 km)", "Milam Glacier Trek Base (30 km)", "Khaliya Top (5 km trek)", "Thamri Kund (7 km)", "Birthi Waterfall (35 km)", "Darkot Village (traditional)"];
      ownerNote = "The Bisht family of Munsiyari has lived with the Panchachuli peaks as our constant companions for generations. We opened our home to trekkers in 2017 and have not looked back since. Come, sit on our terrace, and let the Panchachuli teach you patience.";
      pricePerNightMin = 2200; pricePerNightMax = 4000;
      imageUrl = "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200";
    });
    s.add({
      id = 4; name = "Manya Himalayan Boutique Hotel"; slug = "boutique-hotel-auli";
      location = "Auli, Chamoli, Uttarakhand";
      stayType = "Boutique Hotel";
      description = "Manya Himalayan Boutique Hotel in Auli is a 3-star boutique property perched at 2,519 m with ski-in access in winter and panoramic views of Nanda Devi (7,816 m) and the Garhwal Himalaya year-round. India's premier ski destination in winter, Auli transforms into a meadow paradise in summer and a base for the Kuari Pass trek in autumn. The hotel features a 14-room property with a mountain-view restaurant, a well-stocked bar, a small conference room for groups, and dedicated ski/trek gear storage.";
      amenities = ["Mountain-view restaurant", "Bar and lounge", "Conference room (20 persons)", "Ski gear storage & drying room", "Room service", "Free WiFi", "Hot water", "Room heaters", "Auli ropeway starting point (200 m)", "Ski rental arrangement", "Trek guide booking"];
      nearbyAttractions = ["Auli Ski Resort & Ropeway (200 m)", "Kuari Pass Trek Base (10 km)", "Joshimath (12 km)", "Badrinath Temple (45 km)", "Gurso Bugyal (3 km trek)", "Chenab Lake (short hike)"];
      ownerNote = "We built this hotel for those who believe comfort and adventure should co-exist. Whether you're strapping on skis in December or setting off for the Kuari Pass in October — we want your mountain stay to feel like coming home.";
      pricePerNightMin = 4500; pricePerNightMax = 8500;
      imageUrl = "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200";
    });
    s.add({
      id = 5; name = "Manya Trekker's Cottage"; slug = "trekkers-cottage-lohajung";
      location = "Lohajung, Chamoli, Uttarakhand";
      stayType = "Trekker's Cottage";
      description = "Manya Trekker's Cottage in Lohajung is purpose-built for the Roopkund and Brahmatal trekker community. At 2,350 m, Lohajung is the sole base village for both these legendary treks and sees hundreds of trekkers pass through each season. The cottage features dedicated trekker facilities that hotels simply don't offer — a proper gear drying room, equipment storage lockers, a trek briefing room with topographic maps, a resupply counter for trail snacks and essentials, and an in-house certified wilderness first responder.";
      amenities = ["Gear drying room", "Equipment storage lockers", "Trek briefing room with topographic maps", "Trail snacks and essentials counter", "Wilderness first responder on staff", "Hot water", "Room heater", "Homemade mountain food", "Local guide network", "Weather update service"];
      nearbyAttractions = ["Roopkund Trek Trailhead (2 km)", "Brahmatal Trek Trailhead (3 km)", "Lohajung Village tour", "Ali Bugyal (Day 1 trek)", "Wan Village (nearby)"];
      ownerNote = "I have trekked Roopkund 47 times since 1998. I built this cottage because I know exactly what a trekker needs the night before heading to the lake — a warm bed, good food, and someone who knows the mountain. That someone is me, Rajeev Negi, and my family.";
      pricePerNightMin = 1500; pricePerNightMax = 3000;
      imageUrl = "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1200";
    });
    s;
  };

  // ── migrate blog posts: upgrade old 2 + add 4 new ────────────────────────
  func migrateBlogPosts(old : List.List<OldBlogPostState>) : List.List<NewBlogPostState> {
    let b = List.empty<NewBlogPostState>();
    // Upgrade existing blog posts
    for (ob in old.values()) {
      b.add({ ob with authorName = "Manya Destination Team"; readTimeMin = ob.readTime });
    };
    // Add 4 new blog posts
    b.add({
      id = 2;
      title = "Best Winter Treks in India — Ranked by Difficulty";
      slug = "best-winter-treks-india";
      authorName = "Deepak Rawat, Lead Trek Guide";
      category = "Trekking Tips";
      excerpt = "From the beginner-friendly Kedarkantha to the extreme Roopkund, here is the definitive ranking of India's finest winter treks by difficulty, with our on-ground assessment from years of leading these routes.";
      content = "# Best Winter Treks in India — Ranked by Difficulty\n\n## Introduction\n\nWinter transforms the Himalaya into a monochrome dreamscape of snow, ice, and crystalline air. For trekkers, it offers an entirely different mountain — quieter, more challenging, more rewarding. This ranking is based on our team's combined 50+ years of guiding experience on these exact trails.\n\n## Difficulty Rating System\n\nWe use a 5-tier system:\n- **Easy (E):** No prior trekking experience needed. Good for beginners and families.\n- **Easy-Moderate (E-M):** Basic fitness required. Some steep sections.\n- **Moderate (M):** Regular fitness training recommended. Prior trekking experience helpful.\n- **Moderate-Difficult (M-D):** Regular trekking experience required. Strenuous sections.\n- **Difficult (D):** High fitness. Prior high-altitude experience essential.\n\n## Tier 1 — Easy (Perfect for First-Time Winter Trekkers)\n\n### 1. Nag Tibba Trek (3,022 m) — Uttarakhand\n**Difficulty: Easy | Duration: 2 days | Altitude gain: ~1,500 m**\nThe quintessential Delhi weekend winter trek. A beautiful snow-covered forest trail to the highest peak of the lower Garhwal Himalayas. No altitude concerns, no technical terrain. Views of Gangotri and Kedarnath groups on clear days. Starts from Pantwari village, just 85 km from Dehradun.\n\n**Why go in winter:** Fresh snow from November-February creates a white forest experience without the cold of higher treks. Temperature: -5°C to 10°C daytime.\n\n### 2. Prashar Lake Trek (2,730 m) — Himachal Pradesh\n**Difficulty: Easy | Duration: 2 days | Altitude gain: ~1,200 m**\nA sacred lake with a floating island, a medieval pagoda temple, and a 360° Himalayan panorama. Light snowfall in winter adds magic. Perfect for photographers and first-timers.\n\n## Tier 2 — Easy to Moderate (Confidence-Building Treks)\n\n### 3. Triund Trek (2,850 m) — Himachal Pradesh\n**Difficulty: Easy-Moderate | Duration: 2 days | Altitude gain: ~1,400 m**\nThe Dhauladhar range appears impossibly close from the Triund ridge. In winter (December-February), the ridge gets dusted with snow while the Kangra Valley below stays green. The Snowline Cafe is open in winter.\n\n### 4. Brahmatal Trek (3,862 m) — Uttarakhand\n**Difficulty: Easy-Moderate | Duration: 6 days | Altitude gain: ~1,500 m**\nOur pick for the best beginner snow trek after Kedarkantha. Two frozen lakes, rhododendron snow-sculptures, and unobstructed Trishul-Nanda Ghunti views — without the crowds of Kedarkantha.\n\n**Best months:** December to March. Maximum snowfall January-February.\n\n## Tier 3 — Moderate (For Trekkers with Some Experience)\n\n### 5. Kedarkantha Trek (3,811 m) — Uttarakhand ⭐ Our Top Pick\n**Difficulty: Moderate | Duration: 6 days | Altitude gain: ~1,860 m**\nIndia's most popular winter trek, and for good reason. A genuine summit experience accessible to first-timers with reasonable fitness. The pine forest snow canopy on Day 2 and the 360° summit panorama on Day 4 are images you carry for a lifetime.\n\n**Best months:** December to March. December gets early light snow; January-February maximum snow; March lingering snow with warmer days.\n\n### 6. Dayara Bugyal (3,668 m) — Uttarakhand\n**Difficulty: Moderate | Duration: 5 days**\nA vast high-altitude meadow that becomes a natural skiing ground in winter. Much less crowded than Kedarkantha and equally beautiful.\n\n## Tier 4 — Moderate to Difficult (For Experienced Trekkers)\n\n### 7. Roopkund Trek (5,029 m) — Uttarakhand\n**Difficulty: Moderate-Difficult (winter: Difficult) | Duration: 8 days**\nThe Mystery Lake trek is closed in official winter but the Nov-Dec 'shoulder winter' window is available for experienced trekkers with crampons. The skeletal lake is most visible before ice rebuilds in November.\n\n### 8. Kuari Pass (3,640 m) — Uttarakhand\n**Difficulty: Moderate | Duration: 6 days**\nOne of the finest winter viewpoint treks in India. The pass sits in the shadow of Nanda Devi, Kamet, Dronagiri, and Chaukhamba. Best December-January for snow; March for clear skies.\n\n## Essential Winter Trekking Tips\n\n1. **Layering is everything** — 3 layers minimum: thermal base + fleece mid + waterproof shell\n2. **Gaiters and micro-spikes** — Non-negotiable for any trek above 3,000 m in winter\n3. **Altitude sickness strikes harder in cold** — Go slow, hydrate, recognize symptoms early\n4. **Hand warmers** — Chemical disposable warmers for gloves and boots are worth their weight in gold\n5. **Trek poles** — Essential for snow stability, especially on descent\n6. **Leave by 2 PM** — Afternoon weather changes in the Himalaya are rapid and dangerous\n\n## Packing List Essentials for Winter Treks\n\n- Thermal base layers (merino wool preferred) — 2 sets\n- Fleece jacket\n- Down jacket (-10°C rated minimum)\n- Waterproof and windproof outer shell\n- Waterproof trekking boots (ankle support, insulated)\n- Micro-spikes or crampons (for any trek above 3,000 m)\n- Gaiters\n- UV-protection sunglasses (snow blindness risk)\n- Woolen hat (covers ears)\n- Waterproof gloves\n- Hand and toe warmers\n- Headlamp with spare batteries (lithium batteries last longer in cold)\n- Sunscreen SPF 50+ (UV intensity doubles on snow)\n\n*Manya Destination has guided 3,000+ trekkers on winter Himalayan trails. Book any of these treks with us at manya-destination.com*";
      readTime = 10;
      readTimeMin = 10;
      imageUrl = "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=1200";
      publishedAt = 1748822400;
    });
    b.add({
      id = 3;
      title = "What to Pack for a High-Altitude Trek in the Himalayas";
      slug = "high-altitude-packing-guide";
      authorName = "Manya Destination Team";
      category = "Trekking Tips";
      excerpt = "The definitive high-altitude packing guide for Himalayan treks — what to carry, what to leave behind, and the non-negotiables that could save your life above 4,000 m.";
      content = "# What to Pack for a High-Altitude Trek in the Himalayas\n\n## Introduction\n\nPacking for a Himalayan trek is a precise art. Too little and you risk your safety; too much and the weight breaks your body before altitude does. After guiding thousands of trekkers on routes from 3,000 m to 5,500 m, here is the Manya Destination definitive packing guide.\n\n## The Golden Rules of High-Altitude Packing\n\n1. **Weight target:** Personal daypack should be 7-10 kg maximum\n2. **Test every item:** If you haven't worn it on a real hike before, don't bring it for the first time on a Himalayan summit\n3. **Cotton kills:** No cotton in the mountains. Cotton retains moisture and causes hypothermia. 100% synthetic or wool only.\n4. **Redundancy for safety items:** Two headlamps, two sets of glove liners, two pairs of socks per day\n\n## Complete Packing List by Category\n\n### 1. Clothing — The Layer System\n\n**Base Layer (closest to skin):**\n- 2x thermal/merino wool full-sleeve top\n- 2x thermal bottom\n- 4-6x moisture-wicking synthetic underwear\n- 4-6x synthetic or wool trekking socks\n\n**Mid Layer:**\n- 1x fleece jacket (100 or 200 weight)\n- 1x down jacket (rated to at least -10°C for 4,000 m+ treks)\n\n**Outer Layer:**\n- 1x waterproof and windproof jacket (Gore-Tex or equivalent)\n- 1x waterproof and windproof pants\n\n**Leg wear:**\n- 2x trekking pants (zip-off for versatility)\n\n**Extremities:**\n- 1x warm woolen hat (covers ears)\n- 1x balaclava (for summit days at 4,000 m+)\n- 1x buff/neck gaiter\n- 2x pair lightweight glove liners\n- 1x pair waterproof insulated gloves\n- 1x pair gaiters\n\n### 2. Footwear\n\n**Primary Boots:**\nWaterproof ankle-support trekking boots are non-negotiable. Break them in for 50+ km before the trek. Wet blisters end treks.\n\n**Camp Shoes:**\nLightweight flip-flops or crocs for camp. Your feet need to breathe after 8 hours in boots.\n\n**Socks:**\nMerino wool preferred. 2x per day minimum. Pack one extra pair than you think you need.\n\n### 3. Trekking Equipment\n\n- Trekking poles (2x adjustable) — Essential. Reduces knee stress by 30%.\n- Headlamp with spare batteries (lithium batteries for cold)\n- Trekking backpack (40-50L for 6+ days)\n- Dry bags / compression sacks — Keep sleeping bag and clothes waterproof\n- Sleeping bag liner — Adds 5°C warmth to any bag\n\n### 4. Sun & Cold Protection\n\n- Sunscreen SPF 50+ (UV doubles on snow)\n- Lip balm SPF 30+\n- UV-protection sunglasses (wrap-around preferred)\n- Snow goggles for summit days\n\n### 5. Hydration & Nutrition\n\n- Water bottles: 2x 1L (one for cold, one for hot)\n- Water purification tablets (Aquatabs) as backup\n- Electrolyte sachets (ORS packets) — Critical for acclimatization\n- High-energy snacks: dates, nuts, dark chocolate, energy bars (6-8 per trek day)\n- 1L thermos for hot water on summit days\n\n### 6. Personal Medical Kit (Must-Have)\n\n- Diamox (acetazolamide) 250mg — AMS prevention (consult doctor, prescription required)\n- Dexamethasone 8mg — emergency only, for severe AMS\n- Paracetamol 500mg — pain and fever\n- Ibuprofen 400mg — anti-inflammatory, altitude headaches\n- ORS sachets\n- Band-aids and moleskin (blister care)\n- Antiseptic cream and gauze\n- Knee support brace (if prone to joint issues)\n- Pulse oximeter (must-have above 4,000 m)\n\n### 7. Documents & Money\n\n- Government photo ID (original + 2 copies)\n- 2x passport photos (for permits)\n- Cash in INR — no ATMs above Joshimath/Gangotri/Uttarkashi\n- Emergency contacts card (laminated)\n\n### 8. Electronics\n\n- Power bank (20,000 mAh minimum)\n- Universal charging cable\n- Camera or smartphone (in an insulated case in cold)\n- GPS watch (optional but very useful)\n\n## What to LEAVE Behind\n\n- ❌ Jeans and cotton clothing of any kind\n- ❌ Heavy books (download on Kindle)\n- ❌ Full-sized toiletries (100ml maximum)\n- ❌ Extra shoes beyond camp sandals\n- ❌ Jewelry\n- ❌ Laptop\n\n## Weight Check Before You Leave\n\n| Item Category | Target Weight |\n|--------------|--------------|\n| Clothing (all layers) | 2.5 kg |\n| Boots + camp shoes | 1.5 kg (worn/carried) |\n| Sleeping bag | 0.8-1.2 kg |\n| Trekking poles | 0.5 kg |\n| Electronics + power | 0.5 kg |\n| Medical kit | 0.3 kg |\n| Snacks + water | 2 kg |\n| **Total** | **8-10 kg** |\n\n*Manya Destination provides: tent, sleeping mat, kitchen equipment, common medical kit with oxygen. You carry only personal items.*";
      readTime = 8;
      readTimeMin = 8;
      imageUrl = "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200";
      publishedAt = 1748908800;
    });
    b.add({
      id = 4;
      title = "Spiti Valley Road Trip: The Complete Itinerary";
      slug = "spiti-valley-road-trip";
      authorName = "Manya Destination Team";
      category = "Destination Guides";
      excerpt = "The ultimate road journey through Spiti — the cold desert valley that feels like Tibet without a visa. Complete route, timing, permits, and off-the-beaten-path secrets from our team that has driven this circuit 100+ times.";
      content = "# Spiti Valley Road Trip: The Complete Itinerary\n\n## Introduction\n\nSpiti Valley is the India that surprises you. A high-altitude cold desert squeezed between Tibet and the Great Himalayan Range, it sits at 3,000-4,500 m and receives less than 200mm of rainfall annually — yet it hosts ancient Buddhist monasteries, tiny villages with some of the world's highest schools and post offices, and a landscape of such alien drama that travellers regularly describe it as their most otherworldly experience.\n\nThe valley is accessible via two routes: the Shimla-Kinnaur route (usually open year-round for the Kinnaur section) and the Manali-Rohtang route (open June-November only). Most travellers do the full circuit — enter via Shimla, exit via Manali.\n\n## When to Go\n\n**Best season: July to September**\n- All roads open\n- Chandratal Lake accessible\n- All monasteries and villages reachable\n- Temperature: 15-25°C daytime, 5-10°C night\n\n**June:** Early season. Rohtang Pass may still have snow. Spiti Valley itself is open.\n**October:** Last month. Cold nights (-5°C), possible snowfall at Kunzum Pass. Dramatic autumn colours.\n**Winter (November-May):** Rohtang route closes. Shimla route limited. For the adventurous only.\n\n## Inner Line Permit\n\nRequired for foreign nationals for Spiti district. Also required for the Kinnaur-Spiti border area for both Indian and foreign nationals at certain checkposts. Obtain at Recong Peo District Magistrate office or carry passport + FRRO registration. Indian nationals: no permit needed for most of Spiti.\n\n## The Route — 9 Day Itinerary\n\n### Day 1: Delhi to Shimla (Overnight)\nDepart Delhi in evening. Drive overnight or take Kalka-Shimla rail (Himalayan Queen — UNESCO heritage railway). Arrive Shimla by morning.\n\n### Day 2: Shimla to Sangla (Kinnaur Valley)\n**Distance: 230 km | Drive: 8-9 hrs**\nLeave Shimla early. The Sutlej Valley road winds through apple orchards and hanging villages. Crossing into Kinnaur district at Rampur, the landscape begins its transformation from green Himachal to arid Tibet-adjacent terrain. Sangla Valley (2,700 m) is a revelation — a lush green bowl surrounded by sheer cliffs.\n\n**Must stop:** Sangla village temple, Kamru Fort above Kamru village.\n\n### Day 3: Sangla to Nako\n**Distance: 120 km | Drive: 5 hrs**\nContinue past Recong Peo (district headquarters). The Sutlej gorge becomes increasingly dramatic. Nako village (3,662 m) clusters around a sacred lake with a 1,000-year-old Buddhist monastery.\n\n**Must see:** Nako Lake at sunset. Nako Monastery.\n\n### Day 4: Nako to Kaza (Enter Spiti)\n**Distance: 130 km | Drive: 6 hrs**\nCross the Maling Nala — the entry point into Spiti proper. Stop at Tabo Monastery (established 996 CE — one of the oldest continuously operational Buddhist monasteries in the world). Visit the cave temples and exquisite 10th-century murals. Continue to Dhankar Monastery — perched on an impossibly dramatic cliff above the Spiti-Pin river confluence. Descend to Kaza — Spiti's main market town and accommodation hub (3,800 m).\n\n**Must stop:** Tabo Monastery, Dhankar Monastery and Lake.\n\n### Day 5: Kaza — The High Altitude Villages\n**Day loop: Kaza → Key → Kibber → Hikkim → Komik → Kaza**\nThe most otherworldly driving day in India. Key Monastery (1,000-year-old fortress monastery at 4,166 m) is the most iconic image of Spiti. Continue to Kibber (4,205 m — one of the world's highest inhabited villages with a police station). Then to Hikkim (4,400 m — world's highest post office, still operational) and Komik (4,587 m — world's highest motorable village).\n\n**Must stop:** Key Monastery, Kibber, post a letter from Hikkim.\n\n### Day 6: Kaza to Pin Valley (Mud Village)\n**Distance: 45 km | Drive: 2 hrs**\nDrive into the Pin Valley National Park — Snow Leopard territory. Mud Village (3,700 m) is the main settlement. The Pin Valley is quieter and less visited than main Spiti, with a raw authenticity that rewards those who venture here.\n\n**Tip:** Pin Valley is a snow leopard conservation area. January-March is peak snow leopard sighting season (winter trip only).\n\n### Day 7: Mud to Losar via Kunzum Pass\n**Distance: 80 km | Drive: 4 hrs (mountain roads)**\nDrive back through Kaza to Losar village (last Spiti settlement). Ascend to Kunzum Pass (4,551 m) — the historic gateway between Lahaul and Spiti. Prayer flags, a small shrine, and sweeping views mark the pass. Optional detour to Chandratal Lake (Moon Lake, 4,300 m) — 15 km from Kunzum Pass. One of the most beautiful lakes in India. Camp here if possible.\n\n**Must do:** Chandratal Lake — non-negotiable if time allows.\n\n### Day 8: Chandratal to Manali via Rohtang Pass\n**Distance: 140 km | Drive: 6-7 hrs**\nDescend through the Lahaul Valley — green and dramatic after Spiti's stark landscape. Cross Rohtang Pass (3,978 m — often congested, allow time). Descend into the lush Kullu Valley. Arrive Manali.\n\n**Evening:** Old Manali street food. Hadimba Temple visit.\n\n### Day 9: Manali Leisure & Departure\nOptional morning trek to Jogini Waterfall or Vashisht hot springs. Depart for Delhi (overnight Volvo) or fly from Bhuntar airport.\n\n## Spiti Practical Guide\n\n**Accommodation:** Genuine guesthouses and homestays throughout. Tabo and Kaza have several good options. Kibber and Mud have basic homestays.\n\n**Food:** Tsampa (roasted barley), thukpa (noodle soup), momos, butter tea, and rice-dal are the staples. Kaza has a few cafes with decent food.\n\n**Connectivity:** BSNL works in some areas. No private telecom works reliably in Spiti. Get a BSNL SIM in Shimla or Manali.\n\n**Altitude:** Move slowly, hydrate constantly, and never ascend more than 500 m per day in your first week.\n\n*Book the Manya Destination Spiti Valley Expedition package for a fully managed, private vehicle, permit-included journey: manya-destination.com/packages/spiti-valley-expedition*";
      readTime = 18;
      readTimeMin = 18;
      imageUrl = "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200";
      publishedAt = 1748995200;
    });
    b.add({
      id = 5;
      title = "Valley of Flowers — Everything You Need to Know Before You Go";
      slug = "valley-of-flowers-complete-guide";
      authorName = "Manya Destination Team";
      category = "Destination Guides";
      excerpt = "The Valley of Flowers opens for just three months a year and requires precise planning. This complete guide covers permits, timing, what flowers bloom when, how to reach Ghangaria, and whether combining with Hemkund Sahib is worth it.";
      content = "# Valley of Flowers — Everything You Need to Know Before You Go\n\n## Introduction\n\nThe Valley of Flowers National Park is one of the most extraordinary natural spectacles in India — a 87.5 sq km floral paradise in the Chamoli district of Uttarakhand, filled with over 300 endemic Himalayan wildflower species at an altitude of 3,352-3,658 m. It was inscribed as a UNESCO World Heritage Site in 1982 (as part of the Nanda Devi and Valley of Flowers World Heritage site).\n\nThe valley is seasonal — it is only open from June 1 to October 31, and the peak bloom period is July 15 to August 31. Outside this window, heavy snow covers the valley. Getting the timing right is essential.\n\n## The Flowers — What Blooms When\n\n### July 15 - August 15 (Peak Bloom)\n- Brahma Kamal (*Saussurea obvallata*) — Uttarakhand's state flower\n- Blue Poppy (*Meconopsis aculeata*)\n- Cobra Lily (*Arisaema tortuosum*)\n- Primula species (20+ varieties)\n- Anemone, Geranium, Marsh Marigold\n\n### August - September (Late Bloom)\n- Aster species\n- Bistort\n- Ligularia\n- Blue Gentian\n\n### Late June - Early July\n- Early season flowers, some patches blooming\n- Valley less crowded\n- Some snow patches remaining at edges\n\n## Key Planning Information\n\n### How to Reach the Valley\n\n**Route from Delhi:**\n1. Delhi → Haridwar (overnight train: Mussoorie Express, Dehradun Shatabdi)\n2. Haridwar → Govindghat: Drive 300 km via Rishikesh, Devprayag, Rudraprayag, Karnaprayag, Joshimath. Takes 10-12 hrs. Shared taxi or private vehicle.\n3. Govindghat → Ghangaria: 13 km trek (5-6 hrs). Pony/horse service available (₹700-900). Helicopter available (₹1,500-2,000, weather-dependent).\n4. Ghangaria → Valley of Flowers: 5 km (2-3 hrs from Ghangaria base).\n\n### Entry Permits\n- **Indian nationals:** ₹150 per day + ₹50 camera fee\n- **Foreign nationals:** ₹600 per day + ₹50 camera fee\n- Purchase at Govindghat Forest Office or online (Forest Dept portal)\n- No camping inside the valley (day visits only)\n- Valley stays open 6:00 AM to 5:00 PM\n- Last entry at 3:00 PM\n\n### Accommodation\nGhangaria village (3,048 m) is the ONLY accommodation base for the valley. It has approximately 30 guesthouses and dharamshalas. Book in advance for July-August peak season. GMVN (Garhwal Mandal Vikas Nigam) tourist rest house available.\n\n## The Hemkund Sahib Combination\n\n**Should you combine Valley of Flowers with Hemkund Sahib?\nAbsolutely yes.**\n\nHemkund Sahib (4,329 m) — the world's highest Gurudwara — is just 6 km uphill from Ghangaria. Combining both in a 5-day trip is the standard approach and makes complete sense both spiritually and logistically.\n\n**Day plan:**\n- Day 1: Haridwar → Govindghat (drive) → Ghangaria (trek)\n- Day 2: Ghangaria → Valley of Flowers (day visit) → Ghangaria\n- Day 3: Ghangaria → Hemkund Sahib (day trek) → Ghangaria\n- Day 4: Optional second Valley visit → Govindghat (descent)\n- Day 5: Return to Haridwar\n\n## Wildlife to Look For\n\n- **Snow Leopard** (*Panthera uncia*) — Possible sighting at valley edges, extremely rare\n- **Himalayan Brown Bear** (*Ursus arctos isabellinus*) — Be bear-aware, especially dawn/dusk\n- **Blue Sheep / Bharal** — Common on rocky slopes above the valley\n- **Himalayan Monal** (*Lophophorus impejanus*) — Uttarakhand's state bird, iridescent plumage\n- **Lammergeier/Bearded Vulture** — Often seen soaring on thermals\n\n## Photography Tips\n\n1. **Golden hour is everything:** Arrive at the valley entrance by 7:00 AM for early morning light on the flowers\n2. **Wide angle for the valley:** A 16-35mm lens captures the scale of the floral carpet\n3. **Macro for individual flowers:** The Brahma Kamal and Blue Poppy reward close-up photography\n4. **Weather:** Afternoon mist and rain are common. Morning windows are reliably clear.\n5. **Drone ban:** Drones are strictly prohibited inside the national park\n\n## Practical Tips for Valley of Flowers\n\n- **Do not pick flowers** — ₹5,000 fine and removal from the park\n- **Stay on marked trails** — The park is fragile; off-trail walking is banned\n- **Carry rain gear** — Afternoon showers are near-daily in July-August\n- **Water:** Carry 2L. Clean stream water available at the valley entrance.\n- **Altitude awareness:** Ghangaria is at 3,048 m. Give yourself a day to acclimatize before the valley visit.\n\n*Book the Valley of Flowers & Hemkund Sahib Package with Manya Destination — all permits, accommodation, and guide included: manya-destination.com*";
      readTime = 12;
      readTimeMin = 12;
      imageUrl = "https://images.unsplash.com/photo-1598962942741-44b0ce1e8d76?w=1200";
      publishedAt = 1749081600;
    });
    b;
  };

  public func migration(old : OldActor) : NewActor {
    {
      treks = old.treks;
      yatras = migrateYatras(old.yatras);
      packages = migratePackages(old.packages);
      stays = migrateStays(old.stays);
      bookings = old.bookings;
      blogPosts = migrateBlogPosts(old.blogPosts);
      state = old.state;
    };
  };
};
