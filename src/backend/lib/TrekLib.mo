import List "mo:core/List";
import TrekTypes "../types/treks";

module {
  public type Trek = TrekTypes.Trek;

  public func getAll(treks : List.List<Trek>) : [Trek] {
    treks.toArray();
  };

  public func getBySlug(treks : List.List<Trek>, slug : Text) : ?Trek {
    treks.find(func(t) { t.slug == slug });
  };

  public func getByState(treks : List.List<Trek>, state : Text) : [Trek] {
    treks.filter(func(t) { t.state == state }).toArray();
  };

  public func getByDifficulty(treks : List.List<Trek>, difficulty : Text) : [Trek] {
    treks.filter(func(t) { t.difficulty == difficulty }).toArray();
  };

  public func search(treks : List.List<Trek>, searchTerm : Text) : [Trek] {
    let q = searchTerm.toLower();
    treks.filter(func(t) {
      t.name.toLower().contains(#text q) or
      t.region.toLower().contains(#text q) or
      t.description.toLower().contains(#text q) or
      t.state.toLower().contains(#text q)
    }).toArray();
  };
};
