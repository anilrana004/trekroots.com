
module {
  public type Id = Nat;
  public type Slug = Text;
  public type Timestamp = Int;

  public type DayItinerary = {
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

  public type PriceRange = {
    minINR : Nat;
    maxINR : Nat;
  };
};
