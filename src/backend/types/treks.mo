import CommonTypes "./common";

module {
  public type Trek = {
    id : CommonTypes.Id;
    name : Text;
    slug : CommonTypes.Slug;
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
    itinerary : [CommonTypes.DayItinerary];
    inclusions : [Text];
    exclusions : [Text];
    priceRange : CommonTypes.PriceRange;
    imageUrl : Text;
    category : Text;
  };
};
