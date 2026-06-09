import CommonTypes "./common";

module {
  public type Stay = {
    id : CommonTypes.Id;
    name : Text;
    slug : CommonTypes.Slug;
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
};
