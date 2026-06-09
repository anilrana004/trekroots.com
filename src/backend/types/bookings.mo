import CommonTypes "./common";

module {
  public type BookingStatus = { #pending; #confirmed; #cancelled; #completed };

  public type BookingInput = {
    trekId : ?CommonTypes.Id;
    yatraId : ?CommonTypes.Id;
    packageId : ?CommonTypes.Id;
    stayId : ?CommonTypes.Id;
    name : Text;
    email : Text;
    phone : Text;
    travelDates : Text;
    groupSize : Nat;
    amountINR : Nat;
  };

  public type Booking = {
    id : CommonTypes.Id;
    trekId : ?CommonTypes.Id;
    yatraId : ?CommonTypes.Id;
    packageId : ?CommonTypes.Id;
    stayId : ?CommonTypes.Id;
    name : Text;
    email : Text;
    phone : Text;
    travelDates : Text;
    groupSize : Nat;
    amountINR : Nat;
    status : BookingStatus;
    paymentStatus : Text;
    paymentId : ?Text;
    razorpayOrderId : ?Text;
    razorpaySignature : ?Text;
    createdAt : CommonTypes.Timestamp;
  };

  // Razorpay types
  public type RazorpayOrder = {
    amount : Nat;    // in paise (INR * 100)
    currency : Text; // "INR"
    receipt : Text;
  };

  public type RazorpayOrderResult = {
    orderId : Text;
    amount : Nat;
    currency : Text;
    keyId : Text;
  };

  public type BookingWithPaymentResult = {
    bookingId : Text;
    razorpayOrder : RazorpayOrderResult;
  };
};
