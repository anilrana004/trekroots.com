import List "mo:core/List";
import PackageTypes "../types/packages";

module {
  public type Package = PackageTypes.Package;

  public func getAll(packages : List.List<Package>) : [Package] {
    packages.toArray();
  };

  public func getBySlug(packages : List.List<Package>, slug : Text) : ?Package {
    packages.find(func(p) { p.slug == slug });
  };
};
