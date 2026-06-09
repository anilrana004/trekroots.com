import List "mo:core/List";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import BookingTypes "../types/bookings";
import BookingLib "../lib/BookingLib";

mixin (
  bookings : List.List<BookingTypes.Booking>,
  state : { var nextBookingId : Nat },
  razorpayKeys : { var keyId : Text; var keySecret : Text },
) {
  // Simple booking (already paid / offline booking)
  public func createBooking(input : BookingTypes.BookingInput) : async BookingTypes.Booking {
    BookingLib.create(bookings, state, input, Time.now());
  };

  // Razorpay: create booking in pending state, return order details for frontend Razorpay.js
  public func createBookingWithPayment(
    input : BookingTypes.BookingInput,
  ) : async BookingTypes.BookingWithPaymentResult {
    BookingLib.createWithPayment(bookings, state, input, razorpayKeys.keyId, Time.now());
  };

  // Razorpay: confirm payment after frontend callback with payment_id and signature
  public func confirmBookingPayment(
    bookingId : Nat,
    paymentId : Text,
    razorpaySignature : Text,
  ) : async ?BookingTypes.Booking {
    BookingLib.confirmPayment(bookings, bookingId, paymentId, razorpaySignature);
  };

  public query func getAllBookings() : async [BookingTypes.Booking] {
    BookingLib.getAll(bookings);
  };

  public query func getUserBookings(userEmail : Text) : async [BookingTypes.Booking] {
    BookingLib.getByEmail(bookings, userEmail);
  };
};
