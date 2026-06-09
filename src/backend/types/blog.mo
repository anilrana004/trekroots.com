import CommonTypes "./common";

module {
  public type BlogPost = {
    id : CommonTypes.Id;
    title : Text;
    slug : CommonTypes.Slug;
    authorName : Text;
    category : Text;
    excerpt : Text;
    content : Text;
    readTime : Nat;
    readTimeMin : Nat;
    imageUrl : Text;
    publishedAt : CommonTypes.Timestamp;
  };
};
