import List "mo:core/List";
import BlogTypes "../types/blog";
import BlogLib "../lib/BlogLib";

mixin (blogPosts : List.List<BlogTypes.BlogPost>) {
  public query func getAllBlogPosts() : async [BlogTypes.BlogPost] {
    BlogLib.getAll(blogPosts);
  };

  public query func getBlogPostBySlug(slug : Text) : async ?BlogTypes.BlogPost {
    BlogLib.getBySlug(blogPosts, slug);
  };
};
