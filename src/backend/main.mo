import List "mo:core/List";
import TrekTypes "types/treks";
import YatraTypes "types/yatras";
import PackageTypes "types/packages";
import StayTypes "types/stays";
import BlogTypes "types/blog";
import BookingTypes "types/bookings";
import TreksMixin "mixins/treks-api";
import YatrasMixin "mixins/yatras-api";
import PackagesMixin "mixins/packages-api";
import StaysMixin "mixins/stays-api";
import BlogMixin "mixins/blog-api";
import BookingsMixin "mixins/bookings-api";
import SearchMixin "mixins/search-api";

actor {
  let treks : List.List<TrekTypes.Trek>;
  let yatras : List.List<YatraTypes.Yatra>;
  let packages : List.List<PackageTypes.Package>;
  let stays : List.List<StayTypes.Stay>;
  let bookings : List.List<BookingTypes.Booking>;
  let blogPosts : List.List<BlogTypes.BlogPost>;
  let state : { var nextBookingId : Nat };
  let razorpayKeys : { var keyId : Text; var keySecret : Text };

  public func setRazorpayKeys(keyId : Text, secret : Text) : async () {
    razorpayKeys.keyId := keyId;
    razorpayKeys.keySecret := secret;
  };

  include TreksMixin(treks);
  include YatrasMixin(yatras);
  include PackagesMixin(packages);
  include StaysMixin(stays);
  include BlogMixin(blogPosts);
  include BookingsMixin(bookings, state, razorpayKeys);
  include SearchMixin(treks, yatras, packages, stays, blogPosts);
};
