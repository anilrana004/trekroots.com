import List "mo:core/List";
import Nat "mo:core/Nat";
import BookingTypes "../types/bookings";

module {
  public type Booking = BookingTypes.Booking;
  public type BookingInput = BookingTypes.BookingInput;

  public func create(
    bookings : List.List<Booking>,
    state : { var nextBookingId : Nat },
    input : BookingInput,
    now : Int,
  ) : Booking {
    let id = state.nextBookingId;
    state.nextBookingId += 1;
    let booking : Booking = {
      id;
      trekId = input.trekId;
      yatraId = input.yatraId;
      packageId = input.packageId;
      stayId = input.stayId;
      name = input.name;
      email = input.email;
      phone = input.phone;
      travelDates = input.travelDates;
      groupSize = input.groupSize;
      amountINR = input.amountINR;
      status = #confirmed;
      paymentStatus = "paid";
      paymentId = null;
      razorpayOrderId = null;
      razorpaySignature = null;
      createdAt = now;
    };
    bookings.add(booking);
    booking;
  };

  // Creates a booking in pending/unpaid state and returns Razorpay order data.
  // The frontend uses the returned RazorpayOrderResult with Razorpay.js to
  // open the payment modal — no backend HTTP call needed.
  public func createWithPayment(
    bookings : List.List<Booking>,
    state : { var nextBookingId : Nat },
    input : BookingInput,
    razorpayKeyId : Text,
    now : Int,
  ) : BookingTypes.BookingWithPaymentResult {
    let id = state.nextBookingId;
    state.nextBookingId += 1;
    let receipt = "manya_" # id.toText();
    let booking : Booking = {
      id;
      trekId = input.trekId;
      yatraId = input.yatraId;
      packageId = input.packageId;
      stayId = input.stayId;
      name = input.name;
      email = input.email;
      phone = input.phone;
      travelDates = input.travelDates;
      groupSize = input.groupSize;
      amountINR = input.amountINR;
      status = #pending;
      paymentStatus = "pending";
      paymentId = null;
      razorpayOrderId = ?receipt;
      razorpaySignature = null;
      createdAt = now;
    };
    bookings.add(booking);
    {
      bookingId = id.toText();
      razorpayOrder = {
        orderId = receipt;
        amount = input.amountINR * 100; // convert to paise
        currency = "INR";
        keyId = razorpayKeyId;
      };
    };
  };

  // Confirms payment after Razorpay frontend callback.
  // Updates the booking with paymentId, signature, and sets status to confirmed.
  public func confirmPayment(
    bookings : List.List<Booking>,
    bookingId : Nat,
    paymentId : Text,
    razorpaySignature : Text,
  ) : ?Booking {
    var result : ?Booking = null;
    bookings.mapInPlace(func(b) {
      if (b.id == bookingId) {
        let updated : Booking = {
          b with
          status = #confirmed;
          paymentStatus = "paid";
          paymentId = ?paymentId;
          razorpaySignature = ?razorpaySignature;
        };
        result := ?updated;
        updated;
      } else { b };
    });
    result;
  };

  public func getAll(bookings : List.List<Booking>) : [Booking] {
    bookings.toArray();
  };

  public func getByEmail(bookings : List.List<Booking>, email : Text) : [Booking] {
    bookings.filter(func(b) { b.email == email }).toArray();
  };
};
