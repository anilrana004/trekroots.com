import List "mo:core/List";
import TrekTypes "../types/treks";
import YatraTypes "../types/yatras";
import PackageTypes "../types/packages";
import StayTypes "../types/stays";
import BlogTypes "../types/blog";
import SearchTypes "../types/search";
import SearchLib "../lib/SearchLib";

mixin (
  treks : List.List<TrekTypes.Trek>,
  yatras : List.List<YatraTypes.Yatra>,
  packages : List.List<PackageTypes.Package>,
  stays : List.List<StayTypes.Stay>,
  blogPosts : List.List<BlogTypes.BlogPost>,
) {
  public query func searchAll(searchTerm : Text) : async SearchTypes.SearchResults {
    SearchLib.searchAll(treks, yatras, packages, stays, blogPosts, searchTerm);
  };
};
