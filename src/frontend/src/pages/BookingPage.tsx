import { createActor } from "@/backend";
import type { BookingInput } from "@/backend";
import type {
  RazorpayOptions,
  RazorpayPaymentResponse,
} from "@/types/razorpay";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Minus,
  Phone,
  Plus,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const STEPS = ["Trip Details", "Add-Ons", "Travellers", "Confirm & Pay"];

const ADD_ON_OPTIONS = [
  {
    id: "insurance",
    label: "Travel Insurance",
    desc: "Trip cancellation & medical coverage",
    price: 299,
    perPerson: true,
  },
  {
    id: "pickup",
    label: "Airport / Station Pickup",
    desc: "Door-to-door pickup service",
    price: 800,
    perPerson: false,
  },
  {
    id: "photography",
    label: "Photography Pack",
    desc: "Professional photographer included",
    price: 1500,
    perPerson: false,
  },
  {
    id: "dietary",
    label: "Special Dietary Meals",
    desc: "Jain / vegan / gluten-free options",
    price: 200,
    perPerson: true,
  },
  {
    id: "single-room",
    label: "Single Room Supplement",
    desc: "Private room accommodation",
    price: 500,
    perPerson: false,
  },
  {
    id: "equipment",
    label: "Equipment Rental",
    desc: "Poles, crampons, headlamp included",
    price: 1200,
    perPerson: false,
  },
] as const;

type AddOnId = (typeof ADD_ON_OPTIONS)[number]["id"];

interface FormData {
  startDate: string;
  adults: number;
  children: number;
  seniors: number;
  selectedAddOns: AddOnId[];
  name: string;
  age: string;
  gender: string;
  phone: string;
  email: string;
  city: string;
  emergencyName: string;
  emergencyPhone: string;
  govtIdType: string;
  govtIdNumber: string;
  specialRequirements: string;
  medicalDeclaration: boolean;
  termsAccepted: boolean;
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.querySelector('script[src*="razorpay"]')) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function BookingPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const { actor } = useActor(createActor);
  const [step, setStep] = useState(1);
  const [paymentState, setPaymentState] = useState<
    "idle" | "processing" | "success" | "failure"
  >("idle");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>(
    `MAN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
  );
  const [confirmedAmountPaid, setConfirmedAmountPaid] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    startDate: "",
    adults: 2,
    children: 0,
    seniors: 0,
    selectedAddOns: [],
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    email: "",
    city: "",
    emergencyName: "",
    emergencyPhone: "",
    govtIdType: "Aadhaar Card",
    govtIdNumber: "",
    specialRequirements: "",
    medicalDeclaration: false,
    termsAccepted: false,
  });

  const parts = (id || "").split("-");
  const itemType = parts[0] || "trek";
  const itemSlug = parts.slice(1).join("-");
  const totalPax = formData.adults + formData.children + formData.seniors;
  const groupDiscount = totalPax >= 6 ? 0.1 : 0;
  const BASE_PRICE = 10000;

  const calcTotal = () => {
    const base = BASE_PRICE * formData.adults;
    let addOnTotal = 0;
    for (const aoId of formData.selectedAddOns) {
      const ao = ADD_ON_OPTIONS.find((a) => a.id === aoId);
      if (ao) addOnTotal += ao.perPerson ? ao.price * totalPax : ao.price;
    }
    return Math.round((base + addOnTotal) * (1 - groupDiscount));
  };

  const total = calcTotal();

  const update = <K extends keyof FormData>(field: K, value: FormData[K]) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const toggleAddOn = (id: AddOnId) =>
    update(
      "selectedAddOns",
      formData.selectedAddOns.includes(id)
        ? formData.selectedAddOns.filter((x) => x !== id)
        : [...formData.selectedAddOns, id],
    );

  // ── SUCCESS SCREEN ───────────────────────────────────────────────
  // ── PAYMENT HANDLER ─────────────────────────────────────────────
  async function handleProceedToPayment() {
    if (!actor) {
      setPaymentError("Backend not available. Please try again.");
      setPaymentState("failure");
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      // 1. Build booking input
      const bookingInput: BookingInput = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        travelDates: formData.startDate,
        groupSize: BigInt(totalPax),
        amountINR: BigInt(total),
        ...(itemType === "trek" ? { trekId: 1n } : {}),
        ...(itemType === "yatra" ? { yatraId: 1n } : {}),
        ...(itemType === "package" ? { packageId: 1n } : {}),
        ...(itemType === "stay" ? { stayId: 1n } : {}),
      };

      // 2. Create booking + get Razorpay order from backend
      const result = await actor.createBookingWithPayment(bookingInput);
      const { bookingId, razorpayOrder } = result;

      // 3. Load Razorpay SDK
      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        throw new Error(
          "Failed to load payment gateway. Please check your connection.",
        );
      }

      // 4. Open Razorpay checkout
      await new Promise<void>((resolve, reject) => {
        const options: RazorpayOptions = {
          key: razorpayOrder.keyId,
          amount: Number(razorpayOrder.amount),
          currency: razorpayOrder.currency || "INR",
          order_id: razorpayOrder.orderId,
          name: "Manya Destination",
          description: itemSlug.replace(/-/g, " "),
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          theme: { color: "#1E40AF" },
          handler: async (response: RazorpayPaymentResponse) => {
            try {
              // 5. Confirm payment with backend
              await actor.confirmBookingPayment(
                BigInt(bookingId),
                response.razorpay_payment_id,
                response.razorpay_signature,
              );
              setConfirmedBookingId(
                bookingId ||
                  `MAN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
              );
              setConfirmedAmountPaid(total);
              setPaymentState("success");
              resolve();
            } catch (err) {
              reject(err);
            }
          },
          modal: {
            ondismiss: () => {
              setIsProcessing(false);
              resolve(); // User dismissed — stay on step 4
            },
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Payment failed. Please try again.";
      setPaymentError(message);
      setPaymentState("failure");
    } finally {
      setIsProcessing(false);
    }
  }

  if (paymentState === "success") {
    const whatsappText = encodeURIComponent(
      `🏔️ My Manya Destination booking is confirmed!\nBooking ID: ${confirmedBookingId}\nTrip: ${itemSlug.replace(/-/g, " ")}\nDate: ${formData.startDate}\nGroup: ${totalPax} person${totalPax !== 1 ? "s" : ""}\nAmount Paid: ₹${confirmedAmountPaid.toLocaleString("en-IN")}`,
    );
    return (
      <div
        className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 py-12"
        data-ocid="booking.success.page"
      >
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-emerald-100">
          {/* Animated checkmark */}
          <div
            className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce"
            style={{ animationIterationCount: 3 }}
          >
            <CheckCircle size={48} className="text-emerald-500" />
          </div>
          <h1 className="font-display italic text-4xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-500 mb-1">
            Your Himalayan journey is all set.
          </p>
          <p className="text-sm text-gray-400 mb-6">
            A confirmation email has been sent to {formData.email}
          </p>

          {/* Booking ID badge */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl py-3 px-5 mb-6 inline-block">
            <p className="text-xs text-primary/70 uppercase tracking-wider mb-1">
              Booking ID
            </p>
            <p className="font-mono text-2xl font-bold text-primary">
              {confirmedBookingId}
            </p>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2.5 text-sm border border-gray-100">
            <div className="flex justify-between">
              <span className="text-gray-500">Trip</span>
              <span className="font-semibold capitalize">
                {itemSlug.replace(/-/g, " ")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Travel Date</span>
              <span className="font-semibold">{formData.startDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Group Size</span>
              <span className="font-semibold">
                {totalPax} person{totalPax !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2">
              <span className="text-gray-700 font-semibold">Amount Paid</span>
              <span className="font-mono font-bold text-emerald-600 text-base">
                ₹{confirmedAmountPaid.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to="/account"
              className="block bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              data-ocid="booking.success.view_bookings.button"
            >
              View My Bookings
            </Link>
            <a
              href={`https://wa.me/?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 rounded-xl font-semibold hover:bg-[#1da851] transition-colors"
              data-ocid="booking.success.whatsapp.button"
            >
              <Phone size={16} /> Share on WhatsApp
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              data-ocid="booking.success.download.button"
            >
              <Download size={16} /> Download Itinerary
            </button>
            <Link
              to="/"
              className="text-primary/70 py-2 font-medium hover:text-primary transition-colors text-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── FAILURE SCREEN ───────────────────────────────────────────────
  if (paymentState === "failure") {
    return (
      <div
        className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center px-4 py-12"
        data-ocid="booking.failure.page"
      >
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-red-100">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle size={48} className="text-red-500" />
          </div>
          <h1 className="font-display italic text-3xl font-bold text-gray-900 mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-500 mb-4">
            We couldn't process your payment.
          </p>
          {paymentError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6 text-sm text-red-700 flex items-start gap-2">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{paymentError}</span>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setPaymentState("idle");
                setPaymentError(null);
              }}
              className="bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              data-ocid="booking.failure.retry.button"
            >
              Try Again
            </button>
            <a
              href="https://wa.me/919999000001?text=Hi%20Manya%20Destination!%20I%20had%20a%20payment%20failure.%20Can%20you%20help?"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border-2 border-[#25D366] text-[#25D366] py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors"
              data-ocid="booking.failure.support.button"
            >
              <Phone size={16} /> Contact Support via WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Progress */}
      <div className="bg-white border-b border-[#E5DDD0] sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${i + 1 < step ? "bg-primary text-white" : i + 1 === step ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  {i + 1 < step ? "✓" : i + 1}
                </div>
                <span
                  className={`ml-1 text-xs font-medium hidden sm:block ${i + 1 === step ? "text-primary" : "text-gray-400"}`}
                >
                  {s}
                </span>
                {i < STEPS.length - 1 && (
                  <div
                    className={`mx-2 h-0.5 w-4 sm:w-10 ${i + 1 < step ? "bg-primary" : "bg-gray-200"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Item banner */}
        <div className="bg-[#EDE8DC] rounded-xl p-4 mb-6 flex items-center gap-3">
          <span className="text-2xl">🏔️</span>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Booking
            </p>
            <p className="font-semibold capitalize">
              {itemType}: {itemSlug.replace(/-/g, " ")}
            </p>
          </div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5DDD0]">
            <h2 className="font-display italic text-2xl mb-6">
              Select Travel Dates &amp; Group
            </h2>
            <div className="space-y-6">
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="startDate"
                >
                  Start Date
                </label>
                <input
                  id="startDate"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.startDate}
                  onChange={(e) => update("startDate", e.target.value)}
                  className="w-full border border-[#C8BCA8] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Group Composition
                </p>
                {(["adults", "children", "seniors"] as const).map((key) => {
                  const labels: Record<string, string> = {
                    adults: "Adults (18+)",
                    children: "Children (10-17)",
                    seniors: "Seniors (60+)",
                  };
                  const mins: Record<string, number> = {
                    adults: 1,
                    children: 0,
                    seniors: 0,
                  };
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between py-3 border-b border-[#E5DDD0]"
                    >
                      <span className="text-gray-700">{labels[key]}</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            update(key, Math.max(mins[key], formData[key] - 1))
                          }
                          className="w-9 h-9 rounded-full bg-[#EDE8DC] hover:bg-[#E5DDD0] flex items-center justify-center"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-bold">
                          {formData[key]}
                        </span>
                        <button
                          type="button"
                          onClick={() => update(key, formData[key] + 1)}
                          className="w-9 h-9 rounded-full bg-primary text-white hover:bg-primary/90 flex items-center justify-center"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              {totalPax >= 6 && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-green-800 text-sm font-semibold">
                  🎉 Group discount: 10% off for 6+ travellers!
                </div>
              )}
              <div className="bg-[#F5F0E8] rounded-xl p-4 flex justify-between items-center">
                <span className="text-gray-600">Estimated Total</span>
                <span className="font-mono text-xl font-bold text-primary">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
              <button
                type="button"
                disabled={!formData.startDate || formData.adults < 1}
                onClick={() => setStep(2)}
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                Next: Add-Ons <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5DDD0]">
            <h2 className="font-display italic text-2xl mb-2">
              Enhance Your Journey
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              All add-ons are optional.
            </p>
            <div className="space-y-3 mb-6">
              {ADD_ON_OPTIONS.map((ao) => (
                <label
                  key={ao.id}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${formData.selectedAddOns.includes(ao.id) ? "border-primary bg-primary/5" : "border-[#E5DDD0] hover:border-[#C8BCA8]"}`}
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedAddOns.includes(ao.id)}
                    onChange={() => toggleAddOn(ao.id)}
                    className="mt-1 accent-primary"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{ao.label}</p>
                    <p className="text-sm text-gray-500">{ao.desc}</p>
                  </div>
                  <span className="text-[#D4722A] font-mono font-bold whitespace-nowrap">
                    +₹{ao.price}
                    {ao.perPerson ? "/pp" : ""}
                  </span>
                </label>
              ))}
            </div>
            <div className="bg-[#F5F0E8] rounded-xl p-4 mb-4 flex justify-between items-center">
              <span className="text-gray-600">Total with Add-Ons</span>
              <span className="font-mono text-xl font-bold text-primary">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1 px-6 py-3 border-2 border-[#E5DDD0] rounded-xl font-semibold hover:bg-[#F5F0E8] transition-colors"
              >
                <ChevronLeft size={16} /> Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                Next: Travellers <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5DDD0]">
            <h2 className="font-display italic text-2xl mb-6">
              Lead Traveller Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                {
                  label: "Full Name",
                  key: "name" as keyof FormData,
                  type: "text",
                },
                { label: "Age", key: "age" as keyof FormData, type: "number" },
                { label: "Phone", key: "phone" as keyof FormData, type: "tel" },
                {
                  label: "Email",
                  key: "email" as keyof FormData,
                  type: "email",
                },
                { label: "City", key: "city" as keyof FormData, type: "text" },
                {
                  label: "Emergency Contact Name",
                  key: "emergencyName" as keyof FormData,
                  type: "text",
                },
                {
                  label: "Emergency Contact Phone",
                  key: "emergencyPhone" as keyof FormData,
                  type: "tel",
                },
                {
                  label: "Govt ID Number",
                  key: "govtIdNumber" as keyof FormData,
                  type: "text",
                },
              ].map(({ label, key, type }) => (
                <div key={label}>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-1"
                    htmlFor={key as string}
                  >
                    {label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={key as string}
                    type={type}
                    value={formData[key] as string}
                    onChange={(e) => update(key, e.target.value)}
                    className="w-full border border-[#C8BCA8] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
              ))}
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-1"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => update("gender", e.target.value)}
                  className="w-full border border-[#C8BCA8] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  {["Male", "Female", "Other", "Prefer not to say"].map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-1"
                  htmlFor="govtIdType"
                >
                  Govt ID Type
                </label>
                <select
                  id="govtIdType"
                  value={formData.govtIdType}
                  onChange={(e) => update("govtIdType", e.target.value)}
                  className="w-full border border-[#C8BCA8] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  {[
                    "Aadhaar Card",
                    "Passport",
                    "Driving License",
                    "Voter ID",
                  ].map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label
                  className="block text-sm font-semibold text-gray-700 mb-1"
                  htmlFor="specialReq"
                >
                  Special Requirements{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="specialReq"
                  value={formData.specialRequirements}
                  onChange={(e) =>
                    update("specialRequirements", e.target.value)
                  }
                  rows={2}
                  placeholder="Dietary restrictions, medical conditions..."
                  className="w-full border border-[#C8BCA8] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
            </div>
            <label className="flex items-start gap-3 cursor-pointer mb-6 p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <input
                type="checkbox"
                checked={formData.medicalDeclaration}
                onChange={(e) => update("medicalDeclaration", e.target.checked)}
                className="mt-0.5 accent-primary"
              />
              <span className="text-sm text-gray-700">
                I declare I am physically fit for this activity and have no
                known medical conditions that could endanger myself or others.{" "}
                <span className="text-red-500">*</span>
              </span>
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-1 px-6 py-3 border-2 border-[#E5DDD0] rounded-xl font-semibold hover:bg-[#F5F0E8] transition-colors"
              >
                <ChevronLeft size={16} /> Back
              </button>
              <button
                type="button"
                disabled={
                  !formData.name ||
                  !formData.email ||
                  !formData.phone ||
                  !formData.medicalDeclaration
                }
                onClick={() => setStep(4)}
                className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                Review Booking <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5DDD0]">
            <h2 className="font-display italic text-2xl mb-6">
              Review &amp; Confirm
            </h2>
            <div className="space-y-4 mb-6">
              <div className="bg-[#F5F0E8] rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Item</span>
                  <span className="font-semibold capitalize">
                    {itemSlug.replace(/-/g, " ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Start Date</span>
                  <span className="font-semibold">{formData.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Group</span>
                  <span className="font-semibold">
                    {formData.adults} adults
                    {formData.children > 0
                      ? `, ${formData.children} children`
                      : ""}
                    {formData.seniors > 0
                      ? `, ${formData.seniors} seniors`
                      : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Lead Traveller</span>
                  <span className="font-semibold">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Contact</span>
                  <span className="font-semibold">{formData.phone}</span>
                </div>
              </div>
              {formData.selectedAddOns.length > 0 && (
                <div className="border border-[#E5DDD0] rounded-xl p-4 text-sm">
                  <p className="font-semibold mb-2">Add-Ons</p>
                  {formData.selectedAddOns.map((aoId) => {
                    const ao = ADD_ON_OPTIONS.find((a) => a.id === aoId);
                    return ao ? (
                      <div key={aoId} className="flex justify-between py-1">
                        <span>{ao.label}</span>
                        <span className="font-mono">
                          +₹
                          {(ao.perPerson
                            ? ao.price * totalPax
                            : ao.price
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>
                    ) : null;
                  })}
                </div>
              )}
              <div className="bg-primary text-white rounded-xl p-4 flex justify-between items-center">
                <span className="font-semibold">Total Amount</span>
                <span className="font-mono text-2xl font-bold">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 mb-6">
              <p className="font-semibold mb-1">Cancellation Policy</p>
              <p>
                Free cancellation 30+ days before travel. 50% refund 15-30 days
                before. No refund within 15 days of travel date.
              </p>
            </div>
            {/* Razorpay trust badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-4">
              <span>🔒</span>
              <span>Secure payment powered by</span>
              <span className="font-semibold text-blue-600">Razorpay</span>
              <span>· UPI · Cards · Net Banking · Wallets</span>
            </div>
            <label className="flex items-start gap-3 cursor-pointer mb-6">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => update("termsAccepted", e.target.checked)}
                className="mt-0.5 accent-primary"
              />
              <span className="text-sm text-gray-700">
                I agree to the Terms &amp; Conditions and Cancellation Policy{" "}
                <span className="text-red-500">*</span>
              </span>
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex items-center gap-1 px-6 py-3 border-2 border-[#E5DDD0] rounded-xl font-semibold hover:bg-[#F5F0E8] transition-colors"
              >
                <ChevronLeft size={16} /> Back
              </button>
              <button
                type="button"
                disabled={!formData.termsAccepted || isProcessing}
                onClick={handleProceedToPayment}
                className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                data-ocid="booking.proceed_payment.button"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    Proceed to Payment · ₹{total.toLocaleString("en-IN")}{" "}
                    <ChevronRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
