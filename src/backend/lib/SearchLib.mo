import List "mo:core/List";
import TrekTypes "../types/treks";
import YatraTypes "../types/yatras";
import PackageTypes "../types/packages";
import StayTypes "../types/stays";
import BlogTypes "../types/blog";
import SearchTypes "../types/search";

module {
  public func searchAll(
    treks : List.List<TrekTypes.Trek>,
    yatras : List.List<YatraTypes.Yatra>,
    packages : List.List<PackageTypes.Package>,
    stays : List.List<StayTypes.Stay>,
    blogPosts : List.List<BlogTypes.BlogPost>,
    searchTerm : Text,
  ) : SearchTypes.SearchResults {
    let q = searchTerm.toLower();
    {
      treks = treks.filter(func(t) {
        t.name.toLower().contains(#text q) or t.region.toLower().contains(#text q) or t.state.toLower().contains(#text q)
      }).toArray();
      yatras = yatras.filter(func(y) {
        y.name.toLower().contains(#text q) or y.route.toLower().contains(#text q)
      }).toArray();
      packages = packages.filter(func(p) {
        p.name.toLower().contains(#text q) or p.description.toLower().contains(#text q)
      }).toArray();
      stays = stays.filter(func(s) {
        s.name.toLower().contains(#text q) or s.location.toLower().contains(#text q)
      }).toArray();
      blogPosts = blogPosts.filter(func(b) {
        b.title.toLower().contains(#text q) or b.category.toLower().contains(#text q)
      }).toArray();
    };
  };
};
