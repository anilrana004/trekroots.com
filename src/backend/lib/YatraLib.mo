import List "mo:core/List";
import YatraTypes "../types/yatras";

module {
  public type Yatra = YatraTypes.Yatra;

  public func getAll(yatras : List.List<Yatra>) : [Yatra] {
    yatras.toArray();
  };

  public func getBySlug(yatras : List.List<Yatra>, slug : Text) : ?Yatra {
    yatras.find(func(y) { y.slug == slug });
  };
};
