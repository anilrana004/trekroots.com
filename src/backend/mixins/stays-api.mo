import List "mo:core/List";
import StayTypes "../types/stays";
import StayLib "../lib/StayLib";

mixin (stays : List.List<StayTypes.Stay>) {
  public query func getAllStays() : async [StayTypes.Stay] {
    StayLib.getAll(stays);
  };

  public query func getStayBySlug(slug : Text) : async ?StayTypes.Stay {
    StayLib.getBySlug(stays, slug);
  };
};
