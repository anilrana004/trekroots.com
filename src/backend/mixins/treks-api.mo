import List "mo:core/List";
import TrekTypes "../types/treks";
import TrekLib "../lib/TrekLib";

mixin (treks : List.List<TrekTypes.Trek>) {
  public query func getAllTreks() : async [TrekTypes.Trek] {
    TrekLib.getAll(treks);
  };

  public query func getTrekBySlug(slug : Text) : async ?TrekTypes.Trek {
    TrekLib.getBySlug(treks, slug);
  };

  public query func getTreksByState(state : Text) : async [TrekTypes.Trek] {
    TrekLib.getByState(treks, state);
  };

  public query func getTreksByDifficulty(difficulty : Text) : async [TrekTypes.Trek] {
    TrekLib.getByDifficulty(treks, difficulty);
  };

  public query func searchTreks(searchTerm : Text) : async [TrekTypes.Trek] {
    TrekLib.search(treks, searchTerm);
  };
};
