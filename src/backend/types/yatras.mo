import CommonTypes "./common";

module {
  public type Yatra = {
    id : CommonTypes.Id;
    name : Text;
    slug : CommonTypes.Slug;
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
    itinerary : [CommonTypes.DayItinerary];
    priceRange : CommonTypes.PriceRange;
    imageUrl : Text;
  };
};
