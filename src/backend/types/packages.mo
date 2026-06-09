import CommonTypes "./common";

module {
  public type PackageTier = {
    name : Text;
    pricePerPerson : Nat;
  };

  public type Package = {
    id : CommonTypes.Id;
    name : Text;
    slug : CommonTypes.Slug;
    duration : Text;
    problemSolved : Text;
    description : Text;
    itinerary : [CommonTypes.DayItinerary];
    inclusions : [Text];
    exclusions : [Text];
    priceRange : CommonTypes.PriceRange;
    groupSize : Text;
    accommodationType : Text;
    groupSizeMax : Nat;
    tiers : [PackageTier];
    imageUrl : Text;
    category : Text;
  };
};
