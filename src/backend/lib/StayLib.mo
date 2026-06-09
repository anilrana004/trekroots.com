import List "mo:core/List";
import StayTypes "../types/stays";

module {
  public type Stay = StayTypes.Stay;

  public func getAll(stays : List.List<Stay>) : [Stay] {
    stays.toArray();
  };

  public func getBySlug(stays : List.List<Stay>, slug : Text) : ?Stay {
    stays.find(func(s) { s.slug == slug });
  };
};
