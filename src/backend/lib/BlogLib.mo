import List "mo:core/List";
import BlogTypes "../types/blog";

module {
  public type BlogPost = BlogTypes.BlogPost;

  public func getAll(posts : List.List<BlogPost>) : [BlogPost] {
    posts.toArray();
  };

  public func getBySlug(posts : List.List<BlogPost>, slug : Text) : ?BlogPost {
    posts.find(func(p) { p.slug == slug });
  };
};
