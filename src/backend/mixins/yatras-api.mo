import List "mo:core/List";
import YatraTypes "../types/yatras";
import YatraLib "../lib/YatraLib";

mixin (yatras : List.List<YatraTypes.Yatra>) {
  public query func getAllYatras() : async [YatraTypes.Yatra] {
    YatraLib.getAll(yatras);
  };

  public query func getYatraBySlug(slug : Text) : async ?YatraTypes.Yatra {
    YatraLib.getBySlug(yatras, slug);
  };
};
