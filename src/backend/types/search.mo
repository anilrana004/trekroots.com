import TrekTypes "./treks";
import YatraTypes "./yatras";
import PackageTypes "./packages";
import StayTypes "./stays";
import BlogTypes "./blog";

module {
  public type SearchResults = {
    treks : [TrekTypes.Trek];
    yatras : [YatraTypes.Yatra];
    packages : [PackageTypes.Package];
    stays : [StayTypes.Stay];
    blogPosts : [BlogTypes.BlogPost];
  };
};
