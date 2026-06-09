import List "mo:core/List";
import PackageTypes "../types/packages";
import PackageLib "../lib/PackageLib";

mixin (packages : List.List<PackageTypes.Package>) {
  public query func getAllPackages() : async [PackageTypes.Package] {
    PackageLib.getAll(packages);
  };

  public query func getPackageBySlug(slug : Text) : async ?PackageTypes.Package {
    PackageLib.getBySlug(packages, slug);
  };
};
