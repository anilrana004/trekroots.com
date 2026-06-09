import List "mo:core/List";

module {
  type OldActor = {};

  type DayItinerary = { day : Nat; title : Text; route : Text; distanceKm : Float; startAltitudeM : Nat; endAltitudeM : Nat; description : Text; campsite : Text; mealsIncluded : Text; difficulty : Text; landmarks : [Text] };
  type PriceRange = { minINR : Nat; maxINR : Nat };
  type TrekState = { id : Nat; name : Text; slug : Text; state : Text; region : Text; durationDays : Nat; durationNights : Nat; distanceKm : Float; maxAltitudeM : Nat; maxAltitudeFt : Nat; difficulty : Text; bestSeason : Text; startPoint : Text; endPoint : Text; description : Text; highlights : [Text]; itinerary : [DayItinerary]; inclusions : [Text]; exclusions : [Text]; priceRange : PriceRange; imageUrl : Text; category : Text };
  type YatraState = { id : Nat; name : Text; slug : Text; duration : Text; season : Text; route : Text; description : Text; spiritualSignificance : Text; temples : [Text]; registration : Text; priceRange : PriceRange; imageUrl : Text };
  type PackageState = { id : Nat; name : Text; slug : Text; duration : Text; problemSolved : Text; description : Text; itinerary : [DayItinerary]; inclusions : [Text]; exclusions : [Text]; priceRange : PriceRange; groupSize : Text; imageUrl : Text; category : Text };
  type StayState = { id : Nat; name : Text; slug : Text; location : Text; stayType : Text; description : Text; amenities : [Text]; pricePerNightMin : Nat; pricePerNightMax : Nat; imageUrl : Text };
  type BookingState = { id : Nat; trekId : ?Nat; yatraId : ?Nat; packageId : ?Nat; stayId : ?Nat; name : Text; email : Text; phone : Text; travelDates : Text; groupSize : Nat; status : { #pending; #confirmed; #cancelled; #completed }; createdAt : Int };
  type BlogPostState = { id : Nat; title : Text; slug : Text; category : Text; excerpt : Text; content : Text; readTime : Nat; imageUrl : Text; publishedAt : Int };

  type NewActor = {
    treks : List.List<TrekState>;
    yatras : List.List<YatraState>;
    packages : List.List<PackageState>;
    stays : List.List<StayState>;
    bookings : List.List<BookingState>;
    blogPosts : List.List<BlogPostState>;
    state : { var nextBookingId : Nat };
  };

  // ── helpers ──────────────────────────────────────────────────────────────
  func day(d : Nat, t : Text, r : Text, dist : Float, sa : Nat, ea : Nat, desc : Text, camp : Text, meals : Text, diff : Text, lm : [Text]) : DayItinerary {
    { day = d; title = t; route = r; distanceKm = dist; startAltitudeM = sa; endAltitudeM = ea; description = desc; campsite = camp; mealsIncluded = meals; difficulty = diff; landmarks = lm };
  };
  func pr(lo : Nat, hi : Nat) : PriceRange { { minINR = lo; maxINR = hi } };
  func stdInclusions() : [Text] {
    ["All accommodation (tents/guesthouses as applicable)", "All meals from Day 1 dinner to last day breakfast", "Experienced certified trek leader (1 per 8 trekkers)", "Support staff and porters", "All forest permits and entry fees", "Medical kit with oxygen cylinder", "All camping equipment (tents, sleeping bags, mats)", "Mules/porters for group equipment", "Pick-up/Drop from base village", "Satellite communication device"];
  };
  func stdExclusions() : [Text] {
    ["Travel to/from base camp", "Personal expenses and tips", "Personal trekking gear", "Travel insurance (strongly recommended)", "Helicopter evacuation (available on request)", "Any meals not mentioned in itinerary"];
  };

  // ── trek seed data ────────────────────────────────────────────────────────
  func seedTreks() : List.List<TrekState> {
    let t = List.empty<TrekState>();

    t.add({
      id = 0; name = "Kedarkantha Trek"; slug = "kedarkantha"; state = "Uttarakhand"; region = "Garhwal Himalayas";
      durationDays = 6; durationNights = 5; distanceKm = 20.0;
      maxAltitudeM = 3811; maxAltitudeFt = 12500;
      difficulty = "Easy to Moderate"; bestSeason = "December to April, May-June, September-October";
      startPoint = "Sankri, Uttarkashi"; endPoint = "Sankri, Uttarkashi";
      description = "Kedarkantha Trek is one of the finest winter treks in India, situated in the Govind Wildlife Sanctuary of Uttarakhand. The trail winds through dense pine and oak forests dusted with snow, past the magical frozen Juda Ka Talab lake, and culminates at the 3,811 m summit with breathtaking 360° views of some of the most iconic Himalayan peaks. The trek is set in the Sankri village of Uttarkashi district, a region steeped in Himalayan culture and tradition. Kedarkantha is one of the few treks where you can summit a Himalayan peak without any prior mountaineering experience, making it perfect for first-time trekkers seeking a genuine high-altitude snow experience. The gradual acclimatization profile, well-defined trail, and manageable daily distances make this an ideal first mountain adventure.";
      highlights = ["360° summit views of Swargarohini, Bandarpoonch, Black Peak, and Ranglana", "Snow-laden pine and oak forests of Govind Wildlife Sanctuary", "Frozen Juda Ka Talab lake — a magical winter campsite", "Winter camping under a canopy of stars at 3,650 m", "Possible sightings of Himalayan Monal and musk deer", "Gradual altitude gain — perfect acclimatization profile", "Govind Wildlife Sanctuary biodiversity"];
      itinerary = [
        day(1, "Dehradun to Sankri", "Dehradun → Sankri", 0.0, 640, 1950, "Depart Dehradun early morning for the 200 km scenic drive to Sankri through the Tons Valley. The road passes through lush deodar forests and charming Garhwali villages, offering glimpses of the mountains ahead.", "Sankri Village Guesthouse", "Dinner", "Easy", ["Tons Valley", "Mori", "Netwar"]),
        day(2, "Sankri to Juda Ka Talab", "Sankri → Juda Ka Talab", 6.0, 1950, 2936, "Begin the trek through dense pine and oak forests. The trail ascends gradually through a canopy of trees, emerging into meadows with distant mountain views. In winter, the forest is draped in snow creating a fairytale landscape.", "Juda Ka Talab Campsite", "Breakfast, Lunch, Dinner", "Easy to Moderate", ["Juda Ka Talab (frozen lake)", "Pine Forest Zone", "Kedarkantha meadows"]),
        day(3, "Juda Ka Talab to Kedarkantha Base", "Juda Ka Talab → Kedarkantha Base", 4.0, 2936, 3650, "A short but scenic ascent through open meadows and rhododendron groves leads to the spacious Kedarkantha Base campsite. From here, the summit is clearly visible — its pyramid shape rising dramatically against the blue sky.", "Kedarkantha Base Camp", "Breakfast, Lunch, Dinner", "Moderate", ["Kedarkantha Base Camp", "Rhododendron groves", "Summit viewpoint"]),
        day(4, "Summit Day: Base to Kedarkantha Summit and down to Hargaon", "Base → Summit (3811m) → Hargaon", 6.0, 3650, 3811, "The most exhilarating day — depart pre-dawn for the 2 km summit push. The trail climbs steeply through snow to reach the summit cross, where panoramic views of Swargarohini, Bandarpoonch, Kedarnath, and Yamunotri groups reward the effort. Descend to Hargaon camp.", "Hargaon Campsite", "Breakfast, Lunch, Dinner", "Moderate to Difficult", ["Kedarkantha Summit (3811m)", "Swargarohini viewpoint", "Bandarpoonch views"]),
        day(5, "Hargaon to Sankri", "Hargaon → Sankri", 8.0, 2700, 1950, "A long descent through pine forests returns you to Sankri. The trail weaves through beautiful Himalayan countryside with views of the surrounding peaks. Arrive at Sankri by afternoon.", "Sankri Village Guesthouse", "Breakfast, Lunch, Dinner", "Easy", ["Pine Forest descent", "Sankri village"]),
        day(6, "Sankri to Dehradun", "Sankri → Dehradun", 0.0, 1950, 640, "After breakfast, drive back to Dehradun. Arrive by evening. Trek concludes.", "N/A — Drive Day", "Breakfast", "Easy", ["Tons River valley", "Dehradun"])
      ];
      inclusions = stdInclusions(); exclusions = stdExclusions();
      priceRange = pr(8500, 12000);
      imageUrl = "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=1200";
      category = "Snow Trek";
    });

    t.add({
      id = 1; name = "Valley of Flowers Trek"; slug = "valley-of-flowers"; state = "Uttarakhand"; region = "Chamoli, Nanda Devi Biosphere";
      durationDays = 6; durationNights = 5; distanceKm = 38.0;
      maxAltitudeM = 4329; maxAltitudeFt = 14203;
      difficulty = "Moderate"; bestSeason = "July to September";
      startPoint = "Govindghat"; endPoint = "Govindghat";
      description = "The Valley of Flowers is a UNESCO World Heritage Site and one of India's most celebrated natural wonders. Nestled in the Western Himalayas of Uttarakhand, the valley comes alive between July and September when over 300 species of wildflowers carpet the meadow in spectacular colour. A tributary of the Pushpawati River flows through the valley, flanked by snow-clad peaks on all sides. The trek combines natural beauty of the rarest kind with spiritual significance — the Hemkund Sahib Gurudwara, one of the highest Sikh shrines in the world at 4,329 m, lies just above the valley. This is a trek that nourishes the soul as much as it tests the body, a journey through living colour at the roof of the world.";
      highlights = ["UNESCO World Heritage Site — Valley of Flowers", "Over 300 endemic wildflower species including the rare Blue Poppy", "Brahma Kamal — Uttarakhand's state flower in bloom", "Hemkund Sahib Gurudwara at 4,329 m — world's highest Sikh shrine", "Snow Leopard and Himalayan Brown Bear habitat", "Ghangaria village base — gateway to two iconic destinations", "Views of Hathi Parbat and Nanda Devi peaks"];
      itinerary = [
        day(1, "Haridwar/Rishikesh to Govindghat", "Haridwar → Govindghat", 0.0, 280, 1828, "Drive 300 km from Haridwar through Rishikesh, Devprayag, Rudraprayag, Karnaprayag to reach Govindghat — the trailhead for both Valley of Flowers and Hemkund Sahib.", "Govindghat Guesthouse", "Dinner", "Easy", ["Devprayag confluence", "Joshimath", "Govindghat"]),
        day(2, "Govindghat to Ghangaria", "Govindghat → Ghangaria", 13.0, 1828, 3048, "Trek 13 km alongside the Pushpawati River through ancient forests of birch and rhododendron. The trail ascends steadily with the sound of the rushing river as constant companion. Arrive at Ghangaria — the base village.", "Ghangaria Guesthouse", "Breakfast, Lunch, Dinner", "Moderate", ["Bhyundar Valley", "Pushpawati River", "Ghangaria village"]),
        day(3, "Ghangaria to Valley of Flowers and return", "Ghangaria → Valley of Flowers → Ghangaria", 10.0, 3048, 3658, "Day visit to the Valley of Flowers. The 5 km trail from Ghangaria enters the valley through a narrow gorge that suddenly opens into a vast natural amphitheatre. Spend hours exploring the sea of wildflowers. Return to Ghangaria by evening.", "Ghangaria Guesthouse", "Breakfast, Lunch, Dinner", "Moderate", ["Valley of Flowers entrance", "Pushpawati stream", "Central meadow"]),
        day(4, "Ghangaria to Hemkund Sahib and return", "Ghangaria → Hemkund Sahib → Ghangaria", 12.0, 3048, 4329, "Steep 6 km climb to the sacred Hemkund Sahib Gurudwara at 4,329 m — one of the highest Gurudwaras in the world. The glacial lake beside the shrine is breathtaking. Devotional atmosphere and mountain grandeur combine for an unforgettable experience.", "Ghangaria Guesthouse", "Breakfast, Lunch, Dinner", "Difficult", ["Hemkund Sahib Lake", "Hemkund Sahib Gurudwara", "Hathi Parbat views"]),
        day(5, "Ghangaria to Govindghat", "Ghangaria → Govindghat", 13.0, 3048, 1828, "Descend the 13 km trail back to Govindghat through the beautiful Bhyundar Valley.", "Govindghat Guesthouse", "Breakfast, Lunch, Dinner", "Moderate", ["Bhyundar Village", "Alaknanda River"]),
        day(6, "Return to Haridwar/Rishikesh", "Govindghat → Haridwar", 0.0, 1828, 280, "Drive back to Haridwar/Rishikesh. Trek concludes.", "N/A — Drive Day", "Breakfast", "Easy", ["Joshimath", "Haridwar"])
      ];
      inclusions = stdInclusions(); exclusions = stdExclusions();
      priceRange = pr(9500, 14000);
      imageUrl = "https://images.unsplash.com/photo-1598962942741-44b0ce1e8d76?w=1200";
      category = "Nature & Pilgrimage";
    });

    t.add({
      id = 2; name = "Roopkund Trek"; slug = "roopkund"; state = "Uttarakhand"; region = "Chamoli, Garhwal Himalayas";
      durationDays = 8; durationNights = 7; distanceKm = 53.0;
      maxAltitudeM = 5029; maxAltitudeFt = 16499;
      difficulty = "Difficult"; bestSeason = "May-June, September-October";
      startPoint = "Lohajung, Chamoli"; endPoint = "Lohajung, Chamoli";
      description = "Roopkund, the Mystery Lake Trek, is one of the most dramatic and historically fascinating treks in the entire Himalayan range. At 5,029 m lies a glacial lake that holds one of nature's most chilling secrets — hundreds of human skeletal remains dating back to the 9th century CE, visible through the ice in late spring. The trek passes through Bedni Bugyal, considered one of Asia's finest high-altitude meadows, and offers unobstructed views of the formidable Trishul (7,120 m) and Nanda Ghunti (6,309 m) peaks. The trail traverses diverse terrain from dense oak and rhododendron forests to open bugyals to glaciated high-altitude terrain, demanding good fitness and proper acclimatization.";
      highlights = ["Roopkund Lake — 9th century skeletal remains visible through ice", "Bedni Bugyal — one of Asia's finest high-altitude meadows", "Views of Trishul (7,120 m) and Nanda Ghunti (6,309 m)", "Ali Bugyal — vast high-altitude grassland at 3,627 m", "Diverse terrain from forest to meadow to glacier", "Limited permits — advance booking essential", "Rich biodiversity in Nanda Devi Biosphere Reserve"];
      itinerary = [
        day(1, "Kathgodam/Rishikesh to Lohajung", "Kathgodam → Lohajung", 0.0, 300, 2350, "Drive 220 km to Lohajung — the base village for Roopkund. The route passes through Almora and Kausani offering views of Nanda Devi and Trishul.", "Lohajung Guesthouse", "Dinner", "Easy", ["Almora", "Kausani", "Lohajung"]),
        day(2, "Lohajung to Didna Village", "Lohajung → Didna", 6.0, 2350, 2800, "Initial descent then steady climb through oak and rhododendron forests to Didna village — a traditional Garhwali settlement with mountain views.", "Didna Village Campsite", "Breakfast, Lunch, Dinner", "Moderate", ["Wan village", "Didna village", "Forest trails"]),
        day(3, "Didna to Ali Bugyal", "Didna → Ali Bugyal", 10.0, 2800, 3627, "The trail climbs through dense forest before breaking into the vast open expanse of Ali Bugyal at 3,627 m — rolling meadows stretching to the horizon with panoramic mountain views.", "Ali Bugyal Campsite", "Breakfast, Lunch, Dinner", "Moderate to Difficult", ["Ali Bugyal meadow", "Nanda Ghunti first view", "Trishul silhouette"]),
        day(4, "Ali Bugyal to Bedni Bugyal to Ghora Lotani", "Ali Bugyal → Bedni Bugyal → Ghora Lotani", 9.0, 3627, 4300, "Cross the magnificent Bedni Bugyal with its sacred Bedni Kund (pool) and the ancient Patthar Nachuni rock. Continue to Ghora Lotani campsite above the treeline.", "Ghora Lotani Campsite", "Breakfast, Lunch, Dinner", "Moderate to Difficult", ["Bedni Bugyal", "Bedni Kund", "Patthar Nachuni"]),
        day(5, "Ghora Lotani to Bhagwabasa", "Ghora Lotani → Bhagwabasa", 7.0, 4300, 4863, "The final push to Bhagwabasa — a desolate, wind-swept campsite at 4,863 m that serves as the last campsite before Roopkund. Minimal vegetation, maximum drama.", "Bhagwabasa Campsite", "Breakfast, Lunch, Dinner", "Difficult", ["Bhagwabasa camp", "Roopkund trail preview"]),
        day(6, "Summit Day: Bhagwabasa to Roopkund and back to Bedni Bugyal", "Bhagwabasa → Roopkund (5029m) → Bedni Bugyal", 13.0, 4863, 5029, "Pre-dawn start for the 3 km summit approach over rocky, snow-covered terrain to Roopkund Lake. The skeletal remains are visible through the ice in May-June. Descend all the way back to Bedni Bugyal.", "Bedni Bugyal Campsite", "Breakfast, Lunch, Dinner", "Difficult", ["Roopkund Lake (5029m)", "Junargali pass", "Skeletal remains site"]),
        day(7, "Bedni Bugyal to Lohajung", "Bedni Bugyal → Lohajung", 13.0, 3627, 2350, "Long descent back to Lohajung through forests and meadows. Reach Lohajung by late afternoon.", "Lohajung Guesthouse", "Breakfast, Lunch, Dinner", "Moderate", ["Wan village", "Lohajung"]),
        day(8, "Return to base city", "Lohajung → Kathgodam", 0.0, 2350, 300, "Drive back to Kathgodam or Rishikesh. Trek concludes.", "N/A — Drive Day", "Breakfast", "Easy", ["Almora", "Kathgodam"])
      ];
      inclusions = stdInclusions(); exclusions = stdExclusions();
      priceRange = pr(14000, 22000);
      imageUrl = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200";
      category = "High Altitude";
    });

    t.add({
      id = 3; name = "Har Ki Dun Trek"; slug = "har-ki-dun"; state = "Uttarakhand"; region = "Govind Wildlife Sanctuary, Uttarkashi";
      durationDays = 7; durationNights = 6; distanceKm = 45.0;
      maxAltitudeM = 3566; maxAltitudeFt = 11700;
      difficulty = "Moderate"; bestSeason = "April-June, September-November";
      startPoint = "Sankri, Uttarkashi"; endPoint = "Sankri, Uttarkashi";
      description = "Har Ki Dun, meaning 'Valley of Gods' in Sanskrit, is one of the most sacred and beautiful trekking destinations in Uttarakhand. Nestled within the Govind Wildlife Sanctuary and National Park, this stunning cradle-shaped valley sits beneath the towering Swargarohini peak (6,252 m) — the mountain the Pandavas are said to have ascended on their journey to heaven. The trek passes through ancient villages including Osla and Gangad, where traditional Pahari culture and architecture are preserved almost unchanged from medieval times. The Jaundhar Glacier at the head of the valley offers an optional extension for adventurous trekkers.";
      highlights = ["Mythological significance — Pandavas' path to heaven", "Ancient Osla and Gangad villages with medieval Pahari architecture", "Swargarohini Peak (6,252 m) — the 'Stairway to Heaven'", "Govind Wildlife Sanctuary — snow leopard, musk deer, Monal habitat", "Jaundhar Glacier day hike from Har Ki Dun", "Traditional Garhwali homestay experience", "Relatively uncrowded — pristine wilderness"];
      itinerary = [
        day(1, "Dehradun to Sankri", "Dehradun → Sankri", 0.0, 640, 1950, "Drive to Sankri via Mori through the scenic Tons River valley.", "Sankri Village", "Dinner", "Easy", ["Tons River", "Sankri village"]),
        day(2, "Sankri to Taluka to Osla", "Sankri → Taluka → Osla", 12.0, 1950, 2800, "Drive to Taluka then trek through the Supin River valley to ancient Osla village — a beautifully preserved Pahari settlement.", "Osla Village Guesthouse", "Breakfast, Lunch, Dinner", "Moderate", ["Supin River gorge", "Taluka", "Osla village"]),
        day(3, "Osla to Har Ki Dun", "Osla → Har Ki Dun", 10.0, 2800, 3566, "The final ascent to the Har Ki Dun valley floor. Trail opens into a wide meadow bowl with Swargarohini rising directly ahead — one of the most dramatic valley entrances in the Himalayas.", "Har Ki Dun Forest Rest House / Campsite", "Breakfast, Lunch, Dinner", "Moderate", ["Har Ki Dun valley", "Swargarohini view", "Valley of Gods"]),
        day(4, "Rest Day — Explore Har Ki Dun, Day Hike to Jaundhar Glacier", "Har Ki Dun → Jaundhar Glacier snout → Har Ki Dun", 8.0, 3566, 4300, "Explore the pristine Har Ki Dun valley floor and undertake a day hike towards the Jaundhar Glacier snout for close-up views of the glacier and surrounding peaks.", "Har Ki Dun Campsite", "Breakfast, Lunch, Dinner", "Moderate", ["Jaundhar Glacier", "Borasu Pass views", "Alpine meadows"]),
        day(5, "Har Ki Dun to Osla", "Har Ki Dun → Osla", 10.0, 3566, 2800, "Retrace the trail to Osla.", "Osla Village Guesthouse", "Breakfast, Lunch, Dinner", "Moderate", ["Har Ki Dun meadows", "Supin River"]),
        day(6, "Osla to Sankri", "Osla → Sankri", 12.0, 2800, 1950, "Final descent through the Supin Valley back to Sankri.", "Sankri Village", "Breakfast, Lunch, Dinner", "Easy to Moderate", ["Osla waterfall", "Gangad village"]),
        day(7, "Return to Dehradun", "Sankri → Dehradun", 0.0, 1950, 640, "Drive back to Dehradun.", "N/A — Drive Day", "Breakfast", "Easy", ["Tons River", "Dehradun"])
      ];
      inclusions = stdInclusions(); exclusions = stdExclusions();
      priceRange = pr(10000, 16000);
      imageUrl = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200";
      category = "Valley Trek";
    });

    t.add({
      id = 4; name = "Kuari Pass Trek"; slug = "kuari-pass"; state = "Uttarakhand"; region = "Chamoli, Nanda Devi Biosphere";
      durationDays = 6; durationNights = 5; distanceKm = 33.0;
      maxAltitudeM = 3640; maxAltitudeFt = 11942;
      difficulty = "Moderate"; bestSeason = "November-March (snow), April-June, September-October";
      startPoint = "Auli"; endPoint = "Tapovan (Joshimath)";
      description = "The Kuari Pass Trek, historically known as Lord Curzon's Trail after the British Viceroy who trekked this route in 1905, offers one of the most spectacular panoramas in the entire Garhwal Himalaya. The pass at 3,640 m commands an unobstructed 180° view of some of the highest peaks on Earth — Nanda Devi (7,816 m), Dronagiri (7,110 m), Kamet (7,756 m), Chaukhamba (7,138 m), Neelkanth (6,596 m), and Trishul (7,120 m). The trail traverses mixed oak forests and high-altitude meadows with the grandeur of these Himalayan giants as a constant backdrop.";
      highlights = ["Views of Nanda Devi (7,816 m) — India's highest peak in Uttarakhand", "Panorama including Dronagiri, Kamet, Chaukhamba, Neelkanth, Trishul", "Historically significant — Lord Curzon's Trail (1905)", "UNESCO World Heritage Nanda Devi Biosphere proximity", "Mixed oak and rhododendron forest terrain", "Excellent winter snow trek (November-March)", "Auli ski resort as starting point"];
      itinerary = [
        day(1, "Haridwar to Joshimath/Auli", "Haridwar → Auli", 0.0, 280, 2519, "Drive 300 km to Auli via Rishikesh, Rudraprayag, Chamoli, Joshimath. Auli is India's premier ski resort.", "Auli Guesthouse", "Dinner", "Easy", ["Devprayag", "Rudraprayag", "Joshimath", "Auli"]),
        day(2, "Auli to Khulara", "Auli → Khulara", 10.0, 2519, 3350, "Trek from Auli through dense oak and rhododendron forests. Emerge above the treeline at Khulara with the first dramatic views of Nanda Devi and her satellite peaks.", "Khulara Campsite", "Breakfast, Lunch, Dinner", "Moderate", ["Auli meadow", "Gorson Bugyal", "Khulara camp"]),
        day(3, "Khulara to Tali", "Khulara → Tali", 9.0, 3350, 3350, "Traverse along a ridge through dense oak forests. Tali campsite offers views of the Hathi-Ghoda Parbat ridgeline.", "Tali Campsite", "Breakfast, Lunch, Dinner", "Moderate", ["Chitta Rakot ridge", "Tali lake area"]),
        day(4, "Tali to Kuari Pass to Khulara", "Tali → Kuari Pass (3640m) → Khulara", 9.0, 3350, 3640, "Summit day — climb to Kuari Pass for the full panorama of Nanda Devi, Kamet, Dronagiri, and Chaukhamba. Return to Khulara camp.", "Khulara Campsite", "Breakfast, Lunch, Dinner", "Moderate to Difficult", ["Kuari Pass (3640m)", "Nanda Devi panorama", "Kamet view"]),
        day(5, "Khulara to Tapovan", "Khulara → Tapovan", 5.0, 3350, 1312, "Descend through rhododendron forests to Tapovan village near Joshimath.", "Tapovan Village Guesthouse", "Breakfast, Lunch, Dinner", "Easy to Moderate", ["Tapovan village", "Joshimath"]),
        day(6, "Return to Haridwar", "Joshimath → Haridwar", 0.0, 1200, 280, "Drive back to Haridwar/Rishikesh.", "N/A — Drive Day", "Breakfast", "Easy", ["Chamoli", "Haridwar"])
      ];
      inclusions = stdInclusions(); exclusions = stdExclusions();
      priceRange = pr(9000, 14000);
      imageUrl = "https://images.unsplash.com/photo-1571901521643-14dd94cd09ac?w=1200";
      category = "Panoramic Trek";
    });

    t.add({
      id = 5; name = "Brahmatal Trek"; slug = "brahmatal"; state = "Uttarakhand"; region = "Chamoli, Garhwal Himalayas";
      durationDays = 6; durationNights = 5; distanceKm = 27.0;
      maxAltitudeM = 3862; maxAltitudeFt = 12670;
      difficulty = "Moderate"; bestSeason = "December to March";
      startPoint = "Lohajung, Chamoli"; endPoint = "Lohajung, Chamoli";
      description = "The Brahmatal Trek is a hidden gem in the Uttarakhand trekking circuit, offering two spectacular frozen lakes — Bekaltal and Brahmatal — amid pristine winter wilderness. Named after Lord Brahma (the creator in Hindu mythology) who is said to have meditated here, the trek commands unobstructed views of Mt. Trishul (7,120 m) and Nanda Ghunti (6,309 m) from the pass. It stands apart as one of the few true winter snow treks in India with no technical climbing requirements, making it accessible to trekkers with basic fitness who want a genuine snow experience outside of the crowded Kedarkantha route.";
      highlights = ["Bekaltal and Brahmatal — two stunning frozen lakes in winter", "Unobstructed panorama of Mt. Trishul (7,120 m) and Nanda Ghunti", "One of very few all-winter treks requiring no technical climbing", "Less crowded than Kedarkantha — pristine snow experience", "Named after Lord Brahma — sacred Himalayan destination", "Dense rhododendron forests draped in snow", "Camping at 3,862 m altitude"];
      itinerary = [
        day(1, "Kathgodam to Lohajung", "Kathgodam → Lohajung", 0.0, 300, 2350, "Drive 175 km to Lohajung through Almora and Kausani.", "Lohajung Guesthouse", "Dinner", "Easy", ["Almora", "Kausani", "Lohajung"]),
        day(2, "Lohajung to Bekaltal", "Lohajung → Bekaltal", 9.0, 2350, 2930, "Trek through dense oak and rhododendron forest to Bekaltal — a serene frozen lake in winter surrounded by snow-laden trees.", "Bekaltal Campsite", "Breakfast, Lunch, Dinner", "Moderate", ["Bekaltal lake", "Forest campsite"]),
        day(3, "Bekaltal to Brahmatal", "Bekaltal → Brahmatal", 9.0, 2930, 3430, "Continue through open meadows and forests to Brahmatal — a larger lake surrounded by mountains.", "Brahmatal Campsite", "Breakfast, Lunch, Dinner", "Moderate", ["Brahmatal lake", "Open meadows"]),
        day(4, "Brahmatal to Brahmatal Pass and return", "Brahmatal → Pass (3862m) → Brahmatal", 10.0, 3430, 3862, "Summit push to Brahmatal Pass with sweeping views of Trishul and Nanda Ghunti. Return to Brahmatal camp.", "Brahmatal Campsite", "Breakfast, Lunch, Dinner", "Moderate to Difficult", ["Brahmatal Pass (3862m)", "Trishul panorama", "Nanda Ghunti view"]),
        day(5, "Brahmatal to Lohajung", "Brahmatal → Lohajung", 9.0, 3430, 2350, "Descend through the beautiful winter forest back to Lohajung.", "Lohajung Guesthouse", "Breakfast, Lunch, Dinner", "Easy to Moderate", ["Bekaltal", "Forest descent"]),
        day(6, "Return to base city", "Lohajung → Kathgodam", 0.0, 2350, 300, "Drive back to Kathgodam/Rishikesh.", "N/A — Drive Day", "Breakfast", "Easy", ["Almora", "Kathgodam"])
      ];
      inclusions = stdInclusions(); exclusions = stdExclusions();
      priceRange = pr(8500, 12500);
      imageUrl = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200";
      category = "Winter Trek";
    });

    t.add({
      id = 6; name = "Hampta Pass Trek"; slug = "hampta-pass"; state = "Himachal Pradesh"; region = "Kullu-Manali, Pir Panjal Range";
      durationDays = 5; durationNights = 4; distanceKm = 35.0;
      maxAltitudeM = 4270; maxAltitudeFt = 14009;
      difficulty = "Moderate"; bestSeason = "June-July, September-October";
      startPoint = "Jobra, near Manali"; endPoint = "Chhatru, Lahaul";
      description = "The Hampta Pass Trek is one of the most dramatic and visually contrasting treks in all of India. The trail begins in the lush, green Kullu Valley with its dense forests and meadows, crosses the Pir Panjal range at 4,270 m through the Hampta Pass, and descends into the stark, arid, moon-like landscape of the Lahaul Valley — a transformation that happens over a single day and leaves every trekker awestruck. The optional detour to Chandratal Lake (the Moon Lake) at 4,300 m adds a jewel-blue alpine lake to an already spectacular itinerary.";
      highlights = ["Dramatic contrast — lush Kullu Valley vs arid Lahaul landscape", "Chandratal Lake (Moon Lake) at 4,300 m — optional extension", "Deo Tibba (6,001 m) and Indrasan peak views", "Crossing the Pir Panjal range via Hampta Pass", "Glacier views from Balu Ka Ghera campsite", "Suitable as acclimatization trek before Pin Parvati", "Diverse Himalayan ecosystems in a single trek"];
      itinerary = [
        day(1, "Manali to Jobra to Chika", "Manali → Jobra → Chika", 4.0, 2050, 3050, "Drive 30 minutes from Manali to Jobra. Begin trek through meadows to Chika campsite in the Rani Nala valley.", "Chika Campsite", "Lunch, Dinner", "Easy", ["Jobra trailhead", "Rani Nala", "Chika meadow"]),
        day(2, "Chika to Balu Ka Ghera", "Chika → Balu Ka Ghera", 8.0, 3050, 3800, "Enter the open Hampta Valley. Trail follows the Rani Nala river through meadows. Balu Ka Ghera campsite offers close views of surrounding glaciers.", "Balu Ka Ghera Campsite", "Breakfast, Lunch, Dinner", "Moderate", ["Hampta Valley", "Glacier views", "Balu Ka Ghera camp"]),
        day(3, "Balu Ka Ghera to Hampta Pass to Shea Goru", "Balu Ka Ghera → Hampta Pass (4270m) → Shea Goru", 11.0, 3800, 4270, "Summit the Hampta Pass. The dramatic landscape shift happens here — lush green on the Kullu side, grey and barren on the Lahaul side. Descend to Shea Goru in the Lahaul Valley.", "Shea Goru Campsite", "Breakfast, Lunch, Dinner", "Difficult", ["Hampta Pass (4270m)", "Kullu-Lahaul contrast", "Shea Goru camp"]),
        day(4, "Shea Goru to Chhatru — optional Chandratal Lake", "Shea Goru → Chhatru → Chandratal Lake", 8.0, 3600, 4300, "Trek to Chhatru then optional drive to the stunning Chandratal Lake (Moon Lake) at 4,300 m for an overnight camp beside the jewel-blue glacial lake.", "Chandratal Lake Campsite", "Breakfast, Lunch, Dinner", "Easy to Moderate", ["Chhatru", "Chandratal Lake (4300m)", "Moon Lake camp"]),
        day(5, "Chandratal to Manali", "Chandratal → Manali", 0.0, 4300, 2050, "Drive back to Manali via Rohtang Pass.", "N/A — Drive Day", "Breakfast", "Easy", ["Rohtang Pass", "Manali"])
      ];
      inclusions = stdInclusions(); exclusions = stdExclusions();
      priceRange = pr(9500, 14500);
      imageUrl = "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1200";
      category = "Pass Crossing";
    });

    t.add({
      id = 7; name = "Pin Parvati Pass Trek"; slug = "pin-parvati-pass"; state = "Himachal Pradesh"; region = "Kullu & Spiti";
      durationDays = 11; durationNights = 10; distanceKm = 110.0;
      maxAltitudeM = 5319; maxAltitudeFt = 17457;
      difficulty = "Difficult"; bestSeason = "July-August";
      startPoint = "Barshaini, Parvati Valley"; endPoint = "Mud Village, Pin Valley, Spiti";
      description = "The Pin Parvati Pass Trek is among the most challenging and rewarding high-altitude crossings in the Indian Himalayas. This historic trade route connects the lush, forested Parvati Valley of Kullu with the stark, high-altitude Tibetan plateau of Spiti, crossing the 5,319 m Pin Parvati Pass in the process. The journey is a study in contrasts — from the geothermally active Kheerganga hot springs and dense rhododendron forests to vast glaciers, moraines, and the wind-sculpted Buddhist villages of Pin Valley. An Inner Line Permit is required for the Spiti side.";
      highlights = ["Historical trans-Himalayan trade route connecting Kullu and Spiti", "Kheerganga hot springs — natural geothermal pools", "5,319 m pass crossing — serious high-altitude challenge", "Dramatic transition from Himalayan forest to Tibetan plateau", "Buddhist villages of Pin Valley at journey's end", "Vast glacier crossing on the approach to the pass", "Inner Line Permit required — restricted, pristine territory"];
      itinerary = [
        day(1, "Bhuntar to Kheerganga", "Bhuntar → Barshaini → Kheerganga", 12.0, 1020, 2950, "Drive to Barshaini then trek to Kheerganga — famous for its natural geothermal hot springs.", "Kheerganga Campsite", "Dinner", "Moderate", ["Parvati Valley", "Kheerganga hot springs"]),
        day(2, "Kheerganga to Tunda Bhuj", "Kheerganga → Tunda Bhuj", 11.0, 2950, 3680, "Treeline begins to thin. Trail follows the Parvati River upper course.", "Tunda Bhuj Campsite", "Breakfast, Lunch, Dinner", "Moderate to Difficult", ["Parvati Glacier views", "Tunda Bhuj meadow"]),
        day(3, "Tunda Bhuj to Thakur Kuan", "Tunda Bhuj → Thakur Kuan", 8.0, 3680, 4100, "Rocky moraine terrain. Glacier views intensify.", "Thakur Kuan Campsite", "Breakfast, Lunch, Dinner", "Difficult", ["Moraine fields", "Glacier approach"]),
        day(4, "Thakur Kuan to Odi Thach", "Thakur Kuan → Odi Thach", 7.0, 4100, 4350, "Glacial terrain throughout. Camp at Odi Thach.", "Odi Thach Campsite", "Breakfast, Lunch, Dinner", "Difficult", ["Glacier crossing", "High camp terrain"]),
        day(5, "Odi Thach to Base Camp", "Odi Thach → Base Camp", 7.0, 4350, 4800, "Final camp before the pass. Cold temperatures, minimal oxygen.", "Base Camp (4800m)", "Breakfast, Lunch, Dinner", "Difficult", ["Base camp views", "Pass preview"]),
        day(6, "Summit Day: Base Camp to Pin Parvati Pass and descent", "Base Camp → Pin Parvati Pass (5319m) → High Camp Spiti side", 7.0, 4800, 5319, "Pre-dawn ascent to Pin Parvati Pass. The toughest and most exhilarating day. Views of the Spiti side after crossing are otherworldly.", "High Camp Spiti Side", "Breakfast, Lunch, Dinner", "Very Difficult", ["Pin Parvati Pass (5319m)", "Spiti Valley panorama"]),
        day(7, "Descent to Titi Lake", "High Camp → Titi Lake", 8.0, 4800, 4300, "Descend through the spectacular upper Pin Valley to Titi Lake.", "Titi Lake Campsite", "Breakfast, Lunch, Dinner", "Moderate", ["Titi Lake", "Pin Valley views"]),
        day(8, "Titi Lake to Mud Village", "Titi Lake → Mud Village", 12.0, 4300, 3700, "Final descent to Mud Village — the gateway to Spiti's Pin Valley National Park.", "Mud Village Guesthouse", "Breakfast, Lunch, Dinner", "Moderate", ["Mud village", "Buddhist monastery"]),
        day(9, "Buffer Day", "Rest day at Mud Village", 0.0, 3700, 3700, "Built-in acclimatization and buffer day.", "Mud Village", "All Meals", "Easy", ["Pin Valley National Park", "Local monastery"]),
        day(10, "Buffer Day", "Kaza exploration", 0.0, 3700, 3800, "Drive to Kaza — Spiti's main town. Explore monasteries.", "Kaza", "All Meals", "Easy", ["Key Monastery", "Kaza market"]),
        day(11, "Kaza to Manali", "Kaza → Manali", 0.0, 3800, 2050, "Long drive to Manali via Kunzum Pass or Rohtang.", "N/A — Drive Day", "Breakfast", "Easy", ["Kunzum Pass", "Manali"])
      ];
      inclusions = stdInclusions(); exclusions = ["Travel to/from Manali", "Inner Line Permit (included in price)", "Personal expenses", "Travel insurance", "Helicopter evacuation"];
      priceRange = pr(22000, 35000);
      imageUrl = "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200";
      category = "Expedition";
    });

    t.add({
      id = 8; name = "Bhrigu Lake Trek"; slug = "bhrigu-lake"; state = "Himachal Pradesh"; region = "Kullu Valley, Manali";
      durationDays = 4; durationNights = 3; distanceKm = 22.0;
      maxAltitudeM = 4300; maxAltitudeFt = 14107;
      difficulty = "Moderate"; bestSeason = "May-June, September-October";
      startPoint = "Vashisht, Manali"; endPoint = "Vashisht, Manali";
      description = "The Bhrigu Lake Trek is one of the most accessible high-altitude lake treks in Himachal Pradesh, making it a favourite for first-time high-altitude trekkers. At 4,300 m, Bhrigu Lake offers incredible views of the Kullu-Manali valley far below and the surrounding peaks including Deo Tibba and the Pir Panjal range. The sage Bhrigu (one of the Saptarishis) is said to have meditated beside this lake, giving it deep spiritual significance. The wide alpine meadows en route are spectacular with wildflowers in early summer.";
      highlights = ["High-altitude lake at 4,300 m — accessible in just 4 days", "Mythological significance — sage Bhrigu's meditation site", "Wide alpine meadows with wildflowers in early summer", "360° views of Kullu-Manali valley and Pir Panjal peaks", "Excellent first high-altitude trek from Manali", "Deo Tibba, Indrasan, and Friendship Peak panorama", "Short approach — perfect as acclimatization before harder treks"];
      itinerary = [
        day(1, "Manali to Vashisht to Pahli", "Manali → Vashisht → Pahli Thatch", 5.0, 2050, 2750, "Trek from Vashisht village through oak and pine forests to Pahli meadow.", "Pahli Thatch Campsite", "Lunch, Dinner", "Easy to Moderate", ["Vashisht hot springs", "Pahli meadow"]),
        day(2, "Pahli to Bhrigu Lake", "Pahli Thatch → Bhrigu Lake", 9.0, 2750, 4300, "Long ascent through open meadows to Bhrigu Lake. The trail passes through spectacular alpine meadows with distant peaks always in view.", "Bhrigu Lake Campsite", "Breakfast, Lunch, Dinner", "Moderate to Difficult", ["Bhrigu Lake (4300m)", "Kullu valley views", "Deo Tibba panorama"]),
        day(3, "Bhrigu Lake to Gulaba", "Bhrigu Lake → Gulaba", 8.0, 4300, 3050, "Descend through meadows and forests to Gulaba on the Manali-Rohtang highway.", "Gulaba Guesthouse", "Breakfast, Lunch, Dinner", "Easy to Moderate", ["Alpine meadows", "Gulaba meadow"]),
        day(4, "Return to Manali", "Gulaba → Manali", 0.0, 3050, 2050, "Short drive back to Manali.", "N/A", "Breakfast", "Easy", ["Manali"])
      ];
      inclusions = stdInclusions(); exclusions = stdExclusions();
      priceRange = pr(8000, 12000);
      imageUrl = "https://images.unsplash.com/photo-1539186607619-df476afe6ff1?w=1200";
      category = "Lake Trek";
    });

    t.add({
      id = 9; name = "Triund Trek"; slug = "triund"; state = "Himachal Pradesh"; region = "Dhauladhar Range, Dharamsala";
      durationDays = 2; durationNights = 1; distanceKm = 18.0;
      maxAltitudeM = 2850; maxAltitudeFt = 9350;
      difficulty = "Easy"; bestSeason = "March-June, September-November, December-February (snow)";
      startPoint = "McLeod Ganj, Dharamsala"; endPoint = "McLeod Ganj, Dharamsala";
      description = "Triund is the most iconic camping destination in Himachal Pradesh and one of the best beginner treks in India. Perched at 2,850 m on the edge of the Dhauladhar range, the Triund ridge offers a front-row seat to the mighty snow-clad Dhauladhar peaks rising vertically above the Kangra Valley far below. The trek starts from the vibrant Tibetan town of McLeod Ganj — home to His Holiness the Dalai Lama — making it an ideal combination of trekking and cultural experience. The Snowline Cafe en route is a famous landmark serving hot food to hungry trekkers.";
      highlights = ["Iconic camping ridgeline above Dharamsala", "Dramatic views of the Dhauladhar range towering overhead", "McLeod Ganj — Tibetan Buddhist cultural base", "Snowline Cafe — famous landmark on the trail", "Perfect first trek for beginners and families", "Sunrise over the Kangra Valley from Triund", "Snow-covered ridge December through February"];
      itinerary = [
        day(1, "McLeod Ganj to Triund", "McLeod Ganj → Dharamkot → Triund", 9.0, 1457, 2850, "Trek from McLeod Ganj through Dharamkot and Galu Temple, past the famous Snowline Cafe, to the open Triund ridge. Set up camp and enjoy sunset views over the Kangra Valley.", "Triund Ridge Campsite", "Dinner", "Easy to Moderate", ["Galu Temple", "Snowline Cafe", "Triund ridge"]),
        day(2, "Triund to McLeod Ganj", "Triund → McLeod Ganj", 9.0, 2850, 1457, "Early morning sunrise views over the Kangra Valley before descending back to McLeod Ganj.", "N/A", "Breakfast", "Easy", ["Sunrise viewpoint", "McLeod Ganj"])
      ];
      inclusions = ["Trek guide", "One night camping at Triund", "Dinner and breakfast at camp", "All permits"];
      exclusions = stdExclusions();
      priceRange = pr(3000, 6000);
      imageUrl = "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200";
      category = "Weekend Trek";
    });

    t.add({
      id = 10; name = "Sar Pass Trek"; slug = "sar-pass"; state = "Himachal Pradesh"; region = "Parvati Valley, Kullu";
      durationDays = 5; durationNights = 4; distanceKm = 48.0;
      maxAltitudeM = 4200; maxAltitudeFt = 13780;
      difficulty = "Moderate"; bestSeason = "April-June (snow), September-October";
      startPoint = "Kasol, Parvati Valley"; endPoint = "Barshaini, Parvati Valley";
      description = "The Sar Pass Trek is one of the most popular mountain pass treks in Himachal Pradesh, famous for the thrilling glissading descent on snow patches on the way down and the diverse landscapes encountered along the route. Starting from the backpacker haven of Kasol in Parvati Valley, the trek passes through the traditional Himachali village of Grahan before ascending through dense forests and open meadows to the 4,200 m Sar Pass. The trek is point-to-point, ending at Barshaini — perfect for those wanting variety.";
      highlights = ["Thrilling glissading (snow sliding) descent from Sar Pass", "Grahan Village — authentic traditional Himachali culture", "Kasol — famous backpacker base in Parvati Valley", "Diverse terrain: forest, meadow, snow, pass", "Point-to-point route for variety", "Excellent first mountain pass trek for intermediates", "Views of the Parvati Valley from above"];
      itinerary = [
        day(1, "Bhuntar to Kasol to Grahan Village", "Bhuntar → Kasol → Grahan", 9.0, 1580, 2380, "Drive to Kasol then trek to traditional Grahan village.", "Grahan Village", "Dinner", "Easy to Moderate", ["Kasol", "Grahan village"]),
        day(2, "Grahan to Min Thatch", "Grahan → Min Thatch", 7.0, 2380, 3150, "Dense forest transitions to open meadows.", "Min Thatch Campsite", "Breakfast, Lunch, Dinner", "Moderate", ["Forest trail", "Min Thatch meadow"]),
        day(3, "Min Thatch to Nagaru via Sar Pass Summit", "Min Thatch → Sar Pass (4200m) → Nagaru", 7.0, 3150, 4200, "Summit day — climb to Sar Pass then glissade down snow slopes on the descent to Nagaru.", "Nagaru Campsite", "Breakfast, Lunch, Dinner", "Difficult", ["Sar Pass (4200m)", "Glissading slope", "Parvati Valley views"]),
        day(4, "Nagaru to Barshaini", "Nagaru → Biskeri Thatch → Barshaini", 12.0, 3500, 1870, "Long descent through Biskeri Thatch to Barshaini.", "Barshaini Guesthouse", "Breakfast, Lunch, Dinner", "Moderate", ["Biskeri Thatch", "Barshaini"]),
        day(5, "Return to Bhuntar/Kasol", "Barshaini → Bhuntar", 0.0, 1870, 1020, "Drive back to Bhuntar or Kasol.", "N/A — Drive Day", "Breakfast", "Easy", ["Kasol", "Bhuntar"])
      ];
      inclusions = stdInclusions(); exclusions = stdExclusions();
      priceRange = pr(8000, 12000);
      imageUrl = "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200";
      category = "Pass Crossing";
    });

    t;
  };

  // ── yatra seed data ───────────────────────────────────────────────────────
  func seedYatras() : List.List<YatraState> {
    let y = List.empty<YatraState>();

    y.add({
      id = 0; name = "Char Dham Yatra"; slug = "char-dham";
      duration = "11-14 Days"; season = "May to October (opens ~April 30, closes November)";
      route = "Haridwar → Yamunotri → Gangotri → Kedarnath → Badrinath → Haridwar";
      description = "The Char Dham Yatra is Hinduism's most sacred pilgrimage circuit, encompassing four divine shrines in the Garhwal Himalayas of Uttarakhand. Visiting all four dhams — Yamunotri (source of Yamuna), Gangotri (source of Ganga), Kedarnath (Jyotirlinga of Shiva), and Badrinath (abode of Vishnu) — is believed to cleanse all sins and pave the path to moksha (liberation). The yatra follows a roughly 1,350 km circuit from Haridwar through some of the most spectacular and spiritually charged mountain landscape on Earth. Registration with Uttarakhand Tourism is mandatory, with daily trekker limits enforced at each dham.";
      spiritualSignificance = "Completing all four dhams in a single season is believed to free a devotee from the cycle of birth and death. Each shrine represents a cardinal direction of the Himalaya, together forming a complete spiritual circuit. The journey is considered equivalent to a lifetime of devotion.";
      temples = ["Yamunotri Temple (3,293 m)", "Gangotri Temple (3,048 m)", "Kedarnath Temple (3,583 m) — one of 12 Jyotirlingas", "Badrinath Temple (3,133 m) — one of the 108 Divya Desams"];
      registration = "Mandatory online registration at Uttarakhand Tourism portal. Biometric registration at base camps. Daily entry limits enforced. Medical fitness certificate required for pilgrims 60+.";
      priceRange = pr(22000, 65000);
      imageUrl = "https://images.unsplash.com/photo-1621804903791-4bf7f2ec89a3?w=1200";
    });

    y.add({
      id = 1; name = "Kedarnath Yatra"; slug = "kedarnath";
      duration = "4 Days / 3 Nights"; season = "May 2 – November (closing date per Hindu calendar)";
      route = "Haridwar → Rishikesh → Rudraprayag → Gaurikund → Kedarnath Temple";
      description = "The Kedarnath Yatra is one of India's most iconic and demanding pilgrimages. The Kedarnath Temple, dedicated to Lord Shiva, stands at 3,583 m in the Mandakini River valley, surrounded by snow-clad peaks including Kedarnath (6,940 m) and Kedar Dome (6,831 m). The 16-18 km trek from Gaurikund through breathtaking mountain scenery is undertaken by hundreds of thousands of pilgrims each season. Kedarnath is one of the 12 Jyotirlingas and the foremost of the Panch Kedar shrines. The temple was rebuilt after the 2013 floods and stands as a symbol of Himalayan resilience.";
      spiritualSignificance = "One of the 12 Jyotirlingas (divine manifestations of Lord Shiva), Kedarnath is the most important Shiva shrine in north India. Part of both the Char Dham circuit and the Panch Kedar. Mentioned in the Mahabharata as the spot where the Pandavas sought Shiva's blessings before the Kurukshetra war.";
      temples = ["Kedarnath Temple (3,583 m) — 12th Jyotirlinga", "Bhairavnath Temple — mandatory visit after Kedarnath darshan", "Gaurikund Shakti Peeth — at the trek base"];
      registration = "BKTC (Badrinath Kedarnath Temple Committee) manages all temple operations. Online biometric registration mandatory at uttarakhanddevasthanamboard.in. Helicopter slots bookable via official portals (IRCTC, UTD).";
      priceRange = pr(7000, 18000);
      imageUrl = "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?w=1200";
    });

    y.add({
      id = 2; name = "Badrinath Yatra"; slug = "badrinath";
      duration = "3 Days / 2 Nights"; season = "May 4 – November";
      route = "Haridwar → Rishikesh → Devprayag → Rudraprayag → Joshimath → Badrinath";
      description = "The Badrinath Yatra visits one of Hinduism's most revered Vishnu temples, set spectacularly at 3,133 m in the Alaknanda River valley with the Neelkanth Peak (6,596 m) looming directly behind the temple. Unlike Kedarnath, Badrinath requires no trekking — it is fully road accessible — making it the most convenient of the four Char Dhams. The sacred ritual bath in the Tapt Kund (natural hot spring at 45°C) before darshan, ancestor rituals at Brahma Kapal, and the visit to Mana Village (last Indian village before Tibet, at 3 km from the temple) make this a deeply layered spiritual and cultural experience.";
      spiritualSignificance = "One of the 108 Divya Desams of Vaishnavism and part of the Char Dham circuit. Lord Vishnu is believed to meditate here for six months of the year. The sage Narada is said to have meditated at Badrinath, and the temple was established by Adi Shankaracharya in the 8th century CE.";
      temples = ["Badrinath Temple (3,133 m) — Lord Vishnu, Char Dham", "Tapt Kund (sacred hot spring at 45°C)", "Brahma Kapal — ancestor ritual site on Alaknanda", "Mana Village — Vyasa Cave, Saraswati River, Bheem Pul"];
      registration = "Online registration at Uttarakhand Tourism portal. No trek involved — road accessible. Helicopter service available from Haridwar/Rishikesh.";
      priceRange = pr(5000, 15000);
      imageUrl = "https://images.unsplash.com/photo-1567443024551-f3e3cc2be870?w=1200";
    });

    y;
  };

  // ── package seed data ─────────────────────────────────────────────────────
  func seedPackages() : List.List<PackageState> {
    let p = List.empty<PackageState>();

    p.add({
      id = 0; name = "Char Dham Yatra Complete Package"; slug = "char-dham-package";
      duration = "12 Days / 11 Nights";
      problemSolved = "I want to do Char Dham but have no idea how to plan, manage registration, accommodation, and transport across 4 remote shrines";
      description = "The most comprehensive Char Dham Yatra package available, handling every logistical detail so you can focus entirely on your spiritual journey. We manage mandatory online registrations, arrange biometric documentation at each dham, and provide experienced temple guides who help navigate darshan timings, queue management, and puja bookings. Three accommodation tiers available: Budget (dharamshalas and basic guesthouses), Standard (comfortable hotels), and Luxury (boutique properties with mountain views).";
      itinerary = [
        day(1, "Haridwar — Arrival and Briefing", "Haridwar", 0.0, 280, 280, "Arrive Haridwar. Evening briefing session. Ganga Aarti at Har Ki Pauri.", "Haridwar Hotel", "Dinner", "Easy", ["Har Ki Pauri", "Ganga Aarti"]),
        day(2, "Haridwar to Barkot", "Haridwar → Barkot", 0.0, 280, 1220, "Drive 220 km to Barkot — base for Yamunotri.", "Barkot Hotel", "Breakfast, Dinner", "Easy", ["Mussoorie bypass", "Barkot"]),
        day(3, "Yamunotri Yatra", "Barkot → Janki Chatti → Yamunotri → Barkot", 12.0, 1220, 3293, "Drive to Janki Chatti then 6 km trek to Yamunotri Temple. Darshan at source of Yamuna. Surya Kund hot spring. Return to Barkot.", "Barkot Hotel", "All Meals", "Moderate", ["Yamunotri Temple (3293m)", "Surya Kund", "Divya Shila"]),
        day(4, "Barkot to Uttarkashi", "Barkot → Uttarkashi", 0.0, 1220, 1158, "Scenic drive 100 km to Uttarkashi.", "Uttarkashi Hotel", "Breakfast, Dinner", "Easy", ["Uttarkashi", "Vishwanath Temple"]),
        day(5, "Gangotri Yatra", "Uttarkashi → Gangotri → Uttarkashi", 0.0, 1158, 3048, "Drive 100 km to Gangotri Temple. Darshan at source of Bhagirathi (Ganga). Return to Uttarkashi.", "Uttarkashi Hotel", "All Meals", "Easy", ["Gangotri Temple (3048m)", "Bhagirathi River", "Gaumukh Glacier (18 km further)"]),
        day(6, "Uttarkashi to Guptkashi", "Uttarkashi → Guptkashi", 0.0, 1158, 1319, "Drive 220 km to Guptkashi — gateway to Kedarnath.", "Guptkashi Hotel", "Breakfast, Dinner", "Easy", ["Tehri Dam view", "Guptkashi"]),
        day(7, "Kedarnath Yatra Day 1", "Guptkashi → Gaurikund → Kedarnath", 16.0, 1319, 3583, "Drive to Gaurikund (1.5 hrs). Begin 16 km trek or take helicopter to Kedarnath.", "Kedarnath Guesthouse", "All Meals", "Difficult", ["Gaurikund", "Kedarnath Temple (3583m)"]),
        day(8, "Kedarnath Darshan and return to Guptkashi", "Kedarnath → Gaurikund → Guptkashi", 16.0, 3583, 1319, "Early morning Kedarnath darshan and Abhishek puja. Descend to Gaurikund and drive to Guptkashi.", "Guptkashi Hotel", "All Meals", "Moderate", ["Kedarnath darshan", "Bhairavnath Temple"]),
        day(9, "Guptkashi to Joshimath", "Guptkashi → Joshimath", 0.0, 1319, 1890, "Drive 110 km to Joshimath.", "Joshimath Hotel", "Breakfast, Dinner", "Easy", ["Rudraprayag", "Joshimath"]),
        day(10, "Badrinath Yatra", "Joshimath → Badrinath → Joshimath", 0.0, 1890, 3133, "Drive 45 km to Badrinath. Ritual bath in Tapt Kund. Badrinath Temple darshan. Visit Mana Village. Return to Joshimath.", "Joshimath Hotel", "All Meals", "Easy", ["Badrinath Temple (3133m)", "Tapt Kund", "Mana village", "Brahma Kapal"]),
        day(11, "Joshimath to Rudraprayag", "Joshimath → Rudraprayag", 0.0, 1890, 895, "Drive 170 km towards plains.", "Rudraprayag Hotel", "Breakfast, Dinner", "Easy", ["Chamoli", "Rudraprayag"]),
        day(12, "Return to Haridwar/Rishikesh", "Rudraprayag → Haridwar", 0.0, 895, 280, "Drive 150 km to Haridwar. Yatra concludes.", "N/A", "Breakfast", "Easy", ["Devprayag", "Haridwar"])
      ];
      inclusions = ["All accommodation (12 nights)", "All meals as mentioned", "AC Tempo Traveller / Innova Crysta", "Experienced Char Dham yatra guide", "All temple registration assistance", "Kedarnath helicopter (optional add-on)", "Travel insurance", "All tolls and parking"];
      exclusions = ["Personal expenses", "Pony/Palki/Doli services", "Helicopter (available as add-on)", "Any meals outside the itinerary", "Emergency medical evacuation"];
      priceRange = pr(28000, 65000);
      groupSize = "Max 20 persons";
      imageUrl = "https://images.unsplash.com/photo-1621804903791-4bf7f2ec89a3?w=1200";
      category = "Spiritual";
    });

    p.add({
      id = 1; name = "Kedarkantha Winter Trek Package"; slug = "kedarkantha-winter";
      duration = "7 Days from Delhi";
      problemSolved = "I want my first Himalayan snow trek — beginner friendly, safe, summit-worthy";
      description = "The ultimate beginner snow trek package, designed for first-time Himalayan trekkers seeking the magic of a genuine snow experience with a real summit. The Kedarkantha Trek is India's most popular winter trek for very good reason — gradual altitude gain, well-defined trails, no technical climbing, and a 360° panoramic summit at 3,811 m. Our package handles everything from the overnight train booking guidance to summit day support, with fixed departure dates every 15 days from December through March.";
      itinerary = [
        day(1, "Delhi to Dehradun to Sankri", "Delhi → Dehradun → Sankri", 0.0, 250, 1950, "Overnight train from Delhi to Dehradun then drive to Sankri.", "Sankri Village", "Dinner", "Easy", ["Dehradun", "Sankri"]),
        day(2, "Sankri to Juda Ka Talab", "Sankri → Juda Ka Talab", 6.0, 1950, 2936, "First trek day through pine forests.", "Juda Ka Talab Camp", "All Meals", "Easy", ["Juda Ka Talab frozen lake"]),
        day(3, "Juda Ka Talab to Kedarkantha Base", "Juda Ka Talab → Base Camp", 4.0, 2936, 3650, "Short ascent to base camp.", "Kedarkantha Base Camp", "All Meals", "Moderate", ["Base camp views"]),
        day(4, "Summit Day", "Base Camp → Summit (3811m) → Hargaon", 6.0, 3650, 3811, "Summit Kedarkantha Peak!", "Hargaon Camp", "All Meals", "Moderate to Difficult", ["Kedarkantha Summit (3811m)"]),
        day(5, "Descent to Sankri", "Hargaon → Sankri", 8.0, 2700, 1950, "Final descent.", "Sankri Village", "All Meals", "Easy", ["Pine forest descent"]),
        day(6, "Sankri to Dehradun", "Sankri → Dehradun", 0.0, 1950, 640, "Drive back.", "Dehradun Hotel", "Breakfast", "Easy", ["Dehradun"]),
        day(7, "Return to Delhi", "Dehradun → Delhi", 0.0, 640, 250, "Train back to Delhi.", "N/A", "N/A", "Easy", ["Delhi"])
      ];
      inclusions = ["All accommodation (6 nights)", "All meals Day 1 dinner to Day 6 breakfast", "Certified trek leader and support staff", "All camping equipment", "Forest permits", "Medical kit with oxygen", "Dehradun pick-up and drop"];
      exclusions = ["Train tickets Delhi-Dehradun", "Personal trekking gear", "Travel insurance", "Personal expenses"];
      priceRange = pr(12500, 18000);
      groupSize = "6 to 20 persons";
      imageUrl = "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=1200";
      category = "Adventure";
    });

    p.add({
      id = 2; name = "Manali Adventure Combo — Hampta Pass & Chandratal"; slug = "manali-adventure-combo";
      duration = "8 Days from Delhi";
      problemSolved = "I want an iconic Manali trek with camping, pass crossing, and a lake all in one trip";
      description = "The ultimate Manali adventure package combining the dramatic Hampta Pass crossing with the spectacular Chandratal Lake camp, plus best-of Manali experiences. This package packs in the famous Kullu-to-Lahaul landscape transition, a night beside the jewel-blue Moon Lake at 4,300 m, and the best of Old Manali's culture and Hadimba Temple. Suitable for trekkers with basic fitness looking for their first mountain pass experience.";
      itinerary = [
        day(1, "Delhi to Manali (Volvo)", "Delhi → Manali", 0.0, 250, 2050, "Overnight Volvo bus from Delhi to Manali.", "Manali Hotel", "N/A", "Easy", ["Manali"]),
        day(2, "Manali Acclimatization", "Manali local sightseeing", 0.0, 2050, 2050, "Explore Hadimba Temple, Old Manali, Vashisht hot springs. Trek briefing.", "Manali Hotel", "Breakfast, Dinner", "Easy", ["Hadimba Temple", "Old Manali", "Vashisht"]),
        day(3, "Manali to Chika", "Manali → Jobra → Chika", 4.0, 2050, 3050, "Begin Hampta Pass Trek.", "Chika Camp", "All Meals", "Easy", ["Jobra", "Chika meadow"]),
        day(4, "Chika to Balu Ka Ghera", "Chika → Balu Ka Ghera", 8.0, 3050, 3800, "Enter the open Hampta Valley.", "Balu Ka Ghera Camp", "All Meals", "Moderate", ["Hampta Valley"]),
        day(5, "Summit Hampta Pass — Cross to Lahaul", "Balu Ka Ghera → Hampta Pass → Shea Goru", 11.0, 3800, 3600, "Cross the dramatic Hampta Pass (4,270 m).", "Shea Goru Camp", "All Meals", "Difficult", ["Hampta Pass (4270m)"]),
        day(6, "Chandratal Lake Camp", "Shea Goru → Chhatru → Chandratal Lake", 8.0, 3600, 4300, "Drive to Chandratal and camp beside the Moon Lake.", "Chandratal Lake Camp", "All Meals", "Easy", ["Chandratal Lake (4300m)"]),
        day(7, "Chandratal to Manali", "Chandratal → Manali", 0.0, 4300, 2050, "Drive back over Rohtang Pass.", "Manali Hotel", "Breakfast, Dinner", "Easy", ["Rohtang Pass", "Manali"]),
        day(8, "Return to Delhi (Volvo)", "Manali → Delhi", 0.0, 2050, 250, "Overnight Volvo to Delhi.", "N/A", "N/A", "Easy", ["Delhi"])
      ];
      inclusions = ["All accommodation (7 nights)", "All meals during trek", "Certified trek leader", "All camping equipment", "All permits", "Volvo bus Manali-Delhi (one way)", "Inner transport during package"];
      exclusions = ["Delhi-Manali Volvo (Day 1)", "Personal gear", "Personal expenses", "Travel insurance"];
      priceRange = pr(15000, 22000);
      groupSize = "6 to 18 persons";
      imageUrl = "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1200";
      category = "Adventure";
    });

    p.add({
      id = 3; name = "Spiti Valley Expedition Package"; slug = "spiti-valley-expedition";
      duration = "9 Days";
      problemSolved = "I want the cold desert monastery experience without trekking — pure Himalayan road journey";
      description = "The Spiti Valley Expedition is the ultimate Himalayan road journey — a traverse through the cold desert of Spiti, one of the last untouched trans-Himalayan landscapes on Earth. This package follows the classic Shimla-Kaza-Manali route through Kinnaur, visiting ancient monasteries (Tabo, Dhankar, Key, Hikkim), remote villages (Kibber — one of world's highest inhabited villages, Komik, Langza), and dramatic landscapes that feel more like Ladakh than mainland India. All Inner Line Permits and accommodation in authentic guesthouses and monastery stays included.";
      itinerary = [
        day(1, "Delhi to Shimla", "Delhi → Shimla", 0.0, 250, 2200, "Drive or take the Himalayan Queen train to Shimla.", "Shimla Hotel", "Dinner", "Easy", ["Shimla Mall Road"]),
        day(2, "Shimla to Sangla (Kinnaur)", "Shimla → Sangla", 0.0, 2200, 2700, "Drive through the Sutlej Valley and Kinnaur district to Sangla.", "Sangla Guesthouse", "Breakfast, Dinner", "Easy", ["Rampur", "Sarahan", "Sangla Valley"]),
        day(3, "Sangla to Nako", "Sangla → Nako", 0.0, 2700, 3662, "Continue through Kinnaur past Recong Peo, Pooh, to Nako lake village.", "Nako Guesthouse", "Breakfast, Dinner", "Easy", ["Recong Peo", "Nako Lake", "Nako Monastery"]),
        day(4, "Nako to Kaza", "Nako → Tabo → Dhankar → Kaza", 0.0, 3662, 3800, "Cross into Spiti. Visit ancient Tabo Monastery (1,000 years old) and the dramatically situated Dhankar Monastery and lake.", "Kaza Guesthouse", "All Meals", "Easy", ["Tabo Monastery", "Dhankar Lake", "Kaza"]),
        day(5, "Kaza local — Key, Kibber, Hikkim, Komik", "Kaza → Key → Kibber → Hikkim/Komik → Kaza", 0.0, 3800, 4587, "Full day exploring: Key Monastery (1,000-year-old fortress monastery), Kibber village (4,205 m — one of world's highest), Hikkim (world's highest post office), Komik (world's highest motorable village at 4,587 m).", "Kaza Guesthouse", "All Meals", "Easy", ["Key Monastery", "Kibber village", "Hikkim post office", "Komik"]),
        day(6, "Kaza to Pin Valley — Mud Village", "Kaza → Sagnam → Mud Village", 0.0, 3800, 3700, "Drive into the Pin Valley National Park to Mud Village — Snow Leopard territory.", "Mud Village Homestay", "All Meals", "Easy", ["Pin Valley National Park", "Mud village", "Snow Leopard habitat"]),
        day(7, "Mud Village to Kunzum Pass to Losar", "Mud → Losar → Kunzum Pass → Chandra Tal", 0.0, 3700, 4551, "Drive through Losar and ascend to the spectacular Kunzum Pass (4,551 m). Detour to Chandratal Lake optional.", "Losar/Chhatru Camp", "All Meals", "Easy", ["Kunzum Pass (4551m)", "Chandratal Lake"]),
        day(8, "Rohtang Pass to Manali", "Chhatru → Rohtang Pass → Manali", 0.0, 3900, 2050, "Cross Rohtang Pass (3,978 m) and descend into lush Kullu Valley to Manali.", "Manali Hotel", "Breakfast, Dinner", "Easy", ["Rohtang Pass", "Manali"]),
        day(9, "Return to Delhi", "Manali → Delhi", 0.0, 2050, 250, "Overnight Volvo back to Delhi or fly from Bhuntar airport.", "N/A", "N/A", "Easy", ["Bhuntar airport", "Delhi"])
      ];
      inclusions = ["All accommodation (8 nights including monastery/genuine guesthouses)", "All meals as mentioned", "Private vehicle (Innova/Xylo)", "Experienced Spiti guide", "All Inner Line Permits", "All entry fees and monastery donations", "Travel insurance"];
      exclusions = ["Delhi-Shimla travel", "Personal expenses", "Any activity not mentioned", "Emergency evacuation"];
      priceRange = pr(22000, 45000);
      groupSize = "2 to 8 persons (private vehicle)";
      imageUrl = "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200";
      category = "Expedition";
    });

    p;
  };

  // ── stay seed data ────────────────────────────────────────────────────────
  func seedStays() : List.List<StayState> {
    let s = List.empty<StayState>();

    s.add({
      id = 0; name = "Manya Highlands Homestay"; slug = "highlands-homestay-sankri";
      location = "Sankri Village, Uttarkashi, Uttarakhand";
      stayType = "Homestay";
      description = "Manya Highlands Homestay sits at the heart of Sankri village — the celebrated base camp for Kedarkantha and Har Ki Dun treks. Built in traditional Uttarakhand wood-and-stone architecture with hand-carved wooden balconies overlooking the Swargarohini peak group, this 8-room homestay is the original Manya property and the beginning of our story. Guests are welcomed as family by the Rawat family, fed hearty Garhwali mountain cuisine, and offered a window into authentic hill life that no hotel can replicate.";
      amenities = ["Free WiFi", "Hot water (solar)", "Homemade Garhwali meals (breakfast and dinner included)", "Gear drying room", "Trek briefing and guide arrangement", "Bonfire area", "Mountain views from rooms", "Luggage storage for trekkers", "Local guide network"];
      pricePerNightMin = 1800; pricePerNightMax = 3500;
      imageUrl = "https://images.unsplash.com/photo-1502780809386-5a1b6b5a1b6b?w=1200";
    });

    s.add({
      id = 1; name = "Manya Bugyals Retreat"; slug = "bugyals-retreat-chopta";
      location = "Chopta, Rudraprayag, Uttarakhand";
      stayType = "Eco Cottage";
      description = "Manya Bugyals Retreat in Chopta is set within the alpine meadows (bugyals) that give the property its name, at an altitude of 2,680 m. Designed as a minimal-impact eco property, the hand-built stone and timber cottages blend into the mountain landscape. Chopta is known as the 'Mini Switzerland of Uttarakhand' and serves as the base for the Tungnath-Chandrashila trek — the world's highest Shiva temple trail. The property's yoga deck faces the Kedar peaks at sunrise, creating one of the most meditative settings in the Himalaya.";
      amenities = ["Eco-cottages with mountain views", "Yoga deck facing Kedar peaks", "Bonfire area with forest views", "Guided forest walks", "Homemade organic meals", "Hot water", "Library with Himalayan books", "Trek equipment rental", "Stargazing setup"];
      pricePerNightMin = 2500; pricePerNightMax = 5000;
      imageUrl = "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=1200";
    });

    s.add({
      id = 2; name = "Manya Riverside Camp"; slug = "riverside-camp-rishikesh";
      location = "Tapovan, Rishikesh, Uttarakhand";
      stayType = "Luxury Tent Camp";
      description = "Manya Riverside Camp is a premium semi-permanent tented camp on the banks of the sacred Ganga at Tapovan in Rishikesh. Set beneath the towering Shivalik range, the camp serves as the perfect pre- or post-trek base — combining the energy of the Ganga with world-class adventure activities. The 12 Swiss tents are spacious with proper beds, attached washrooms, and river-facing sit-outs. Rishikesh's famous yoga ashrams, bungee jumping, white-water rafting, and evening Ganga Aarti are all within easy reach.";
      amenities = ["Swiss tents with attached washrooms", "Ganga riverside location", "Yoga sessions (morning)", "White-water rafting arrangements", "Bungee jumping nearby", "Evening Ganga Aarti walk", "All meals included", "Campfire evenings", "Kayaking arrangements", "Trek pre-departure briefings"];
      pricePerNightMin = 2000; pricePerNightMax = 4500;
      imageUrl = "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200";
    });

    s;
  };

  // ── blog seed data ────────────────────────────────────────────────────────
  func seedBlogPosts() : List.List<BlogPostState> {
    let b = List.empty<BlogPostState>();

    b.add({
      id = 0;
      title = "Complete Guide to Kedarkantha Trek 2025-26";
      slug = "kedarkantha-trek-guide-2025";
      category = "Trekking Tips";
      excerpt = "Everything you need to know before your Kedarkantha Trek — from preparation tips to packing list to what the summit truly feels like at 3,811 m in winter.";
      content = "# Complete Guide to Kedarkantha Trek 2025-26\n\n## Introduction\n\nThe Kedarkantha Trek is one of India's most beloved winter snow treks and for good reason — it offers a genuine summit experience at 3,811 m without requiring any prior technical climbing skills. Set in the Govind Wildlife Sanctuary of Uttarakhand's Uttarkashi district, the trek is accessible from Dehradun and can be completed in 6 days.\n\n## Best Time to Trek\n\n**Winter (December to April):** The classic snow season. Snow-covered pine forests, frozen Juda Ka Talab lake, and a fully white summit make this season iconic. Temperature ranges: -5°C to -20°C at night, 5°C to 15°C during the day.\n\n**Summer (May-June):** Rhododendron blooms on the lower trail. Snow on the summit in May. Temperature ranges: 5°C to 20°C during the day.\n\n**Autumn (September-October):** Crystal clear skies, best views. Pleasant temperatures. Golden meadows.\n\n## Trail Overview\n\nThe trek starts and ends in **Sankri village** (1,950 m) in Uttarkashi district. The trail ascends through dense pine and oak forests to Juda Ka Talab (2,936 m), continues to Kedarkantha Base Camp (3,650 m), and summits at Kedarkantha Peak (3,811 m).\n\n## Key Preparation Tips\n\n1. **Fitness:** Start a 4-week preparation routine including daily 5 km walks and stair climbing\n2. **Acclimatization:** Arrive in Sankri a day early if coming from sea level\n3. **Clothing:** Layer system is critical — base layer, mid layer, down jacket, outer shell\n4. **Footwear:** Waterproof trekking boots with ankle support are non-negotiable in winter\n5. **Permits:** Forest Department permit is included in our package fee\n\n## Packing Checklist\n\n- Thermal base layers (2 sets)\n- Fleece jacket\n- Down jacket (-10°C rated)\n- Waterproof outer shell jacket and pants\n- Trekking boots (waterproof)\n- Micro-spikes or gaiters (winter)\n- Trekking poles\n- Sunglasses (UV 400)\n- Woollen hat and gloves\n- Headlamp with spare batteries\n- Sunscreen (SPF 50+)\n- Water bottles (2 litres capacity)\n\n## Altitude Sickness Prevention\n\nKedarkantha is a gradual ascent with excellent acclimatization profile. However, always:\n- Ascend slowly and rest when needed\n- Stay hydrated (minimum 3 litres water per day)\n- Avoid alcohol the night before high days\n- Report any headache or nausea to your trek leader immediately\n\n## Why Trek with Manya Destination\n\nManya Destination operates fixed-departure Kedarkantha packages with certified trek leaders, our own Sankri homestay (Manya Highlands), and 24/7 emergency support including satellite phone communication on the trail. Our trek leaders are NIMAS and WFR certified.";
      readTime = 12;
      imageUrl = "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=1200";
      publishedAt = 1748649600;
    });

    b.add({
      id = 1;
      title = "Char Dham Yatra Registration & Planning Guide 2025";
      slug = "char-dham-yatra-registration-planning-2025";
      category = "Yatra Guides";
      excerpt = "Step-by-step guide to registering for Char Dham Yatra 2025, understanding the pilgrimage circuit, health requirements for seniors, and practical tips for a smooth and spiritually fulfilling journey.";
      content = "# Char Dham Yatra Registration & Planning Guide 2025\n\n## Introduction\n\nThe Char Dham Yatra — visiting Yamunotri, Gangotri, Kedarnath, and Badrinath in sequence — is one of the most spiritually significant journeys a Hindu devotee can undertake. Planning has become more structured since 2023 with mandatory online registration and health monitoring systems. This guide covers everything you need to know.\n\n## When Does Char Dham Open in 2025?\n\nTemple opening dates are decided on Akshaya Tritiya (usually late April/early May) as per the Hindu calendar:\n- **Yamunotri:** ~April 30, 2025 (Akshaya Tritiya)\n- **Gangotri:** ~April 30, 2025 (Akshaya Tritiya)\n- **Kedarnath:** ~May 2, 2025 (Shiv Vivah Panchami)\n- **Badrinath:** ~May 4, 2025\n\nTemples close for winter in November (Diwali season).\n\n## Step-by-Step Registration Process\n\n### Step 1: Online Registration\nVisit the official Uttarakhand Tourism portal. Register with your Aadhaar/PAN card details. Each pilgrim must register individually. Print your registration QR code.\n\n### Step 2: Biometric Registration\nAt each dham base camp (Janki Chatti for Yamunotri, Gangotri for Gangotri, Gaurikund for Kedarnath, Joshimath for Badrinath), biometric registration is mandatory. Arrive at least 2 hours before your target darshan time.\n\n### Step 3: Health Certificate (Seniors 60+)\nPilgrims above 60 years require a medical fitness certificate from a registered doctor. The health check is also conducted at base camps. Those with heart conditions, severe hypertension, or low blood oxygen saturation may be denied entry to Kedarnath by the health team.\n\n## Helicopter Booking for Kedarnath\n\nHelicopters operate from Phata, Guptkashi, Sirsi, and Agastmuni helipads. Book through IRCTC, UTD official portal, or state-approved operators only. Cost: approximately ₹5,000-8,000 one way. Book 3-4 months in advance for peak season (May-June).\n\n## Best Time for Char Dham Yatra\n\n- **Best overall:** Mid-May to mid-June and September-October\n- **Avoid:** Mid-June to mid-August (monsoon, landslide risk)\n- **Off-peak:** Late October (pre-closing) for fewer crowds\n\n## What to Pack\n\n- Warm clothing (even in summer, nights are cold at 3,000+ m)\n- Rain jacket (mandatory for monsoon season)\n- Comfortable walking shoes for temple premises\n- Personal medicines\n- Identity documents (Aadhaar card) — mandatory\n- Small backpack for daily use\n\n## Pony, Palki, and Doli Services\n\nFor pilgrims unable to trek, pony, palki (sedan chair), and doli services are available on all trekking routes (Yamunotri and Kedarnath). Book in advance at the base camps. Rates are government-regulated.\n\n## Book With Manya Destination\n\nManya Destination offers comprehensive Char Dham packages handling all registration paperwork, accommodation, transport, and guide services. Our experienced yatra guides have made this journey over 100 times collectively and know the temples, timings, and crowd patterns intimately.";
      readTime = 15;
      imageUrl = "https://images.unsplash.com/photo-1621804903791-4bf7f2ec89a3?w=1200";
      publishedAt = 1748736000;
    });

    b;
  };

  public func migration(_ : OldActor) : NewActor {
    {
      treks = seedTreks();
      yatras = seedYatras();
      packages = seedPackages();
      stays = seedStays();
      bookings = List.empty<BookingState>();
      blogPosts = seedBlogPosts();
      state = { var nextBookingId = 0 };
    };
  };
};
