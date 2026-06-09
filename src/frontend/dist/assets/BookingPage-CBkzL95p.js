import { c as createLucideIcon, u as useParams, r as reactExports, j as jsxRuntimeExports, n as CircleCheckBig, L as Link, P as Phone, o as CircleX, l as ChevronRight } from "./index-B8T7PWVC.js";
import { u as useActor, c as createActor } from "./backend-BHRKQ7VT.js";
import { C as ChevronLeft } from "./chevron-left-CX7tlb0a.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
const STEPS = ["Trip Details", "Add-Ons", "Travellers", "Confirm & Pay"];
const ADD_ON_OPTIONS = [
  {
    id: "insurance",
    label: "Travel Insurance",
    desc: "Trip cancellation & medical coverage",
    price: 299,
    perPerson: true
  },
  {
    id: "pickup",
    label: "Airport / Station Pickup",
    desc: "Door-to-door pickup service",
    price: 800,
    perPerson: false
  },
  {
    id: "photography",
    label: "Photography Pack",
    desc: "Professional photographer included",
    price: 1500,
    perPerson: false
  },
  {
    id: "dietary",
    label: "Special Dietary Meals",
    desc: "Jain / vegan / gluten-free options",
    price: 200,
    perPerson: true
  },
  {
    id: "single-room",
    label: "Single Room Supplement",
    desc: "Private room accommodation",
    price: 500,
    perPerson: false
  },
  {
    id: "equipment",
    label: "Equipment Rental",
    desc: "Poles, crampons, headlamp included",
    price: 1200,
    perPerson: false
  }
];
function loadRazorpayScript() {
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
function BookingPage() {
  const { id } = useParams({ strict: false });
  const { actor } = useActor(createActor);
  const [step, setStep] = reactExports.useState(1);
  const [paymentState, setPaymentState] = reactExports.useState("idle");
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const [paymentError, setPaymentError] = reactExports.useState(null);
  const [confirmedBookingId, setConfirmedBookingId] = reactExports.useState(
    `MAN-2026-${Math.floor(1e3 + Math.random() * 9e3)}`
  );
  const [confirmedAmountPaid, setConfirmedAmountPaid] = reactExports.useState(0);
  const [formData, setFormData] = reactExports.useState({
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
    termsAccepted: false
  });
  const parts = (id || "").split("-");
  const itemType = parts[0] || "trek";
  const itemSlug = parts.slice(1).join("-");
  const totalPax = formData.adults + formData.children + formData.seniors;
  const groupDiscount = totalPax >= 6 ? 0.1 : 0;
  const BASE_PRICE = 1e4;
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
  const update = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));
  const toggleAddOn = (id2) => update(
    "selectedAddOns",
    formData.selectedAddOns.includes(id2) ? formData.selectedAddOns.filter((x) => x !== id2) : [...formData.selectedAddOns, id2]
  );
  async function handleProceedToPayment() {
    if (!actor) {
      setPaymentError("Backend not available. Please try again.");
      setPaymentState("failure");
      return;
    }
    setIsProcessing(true);
    setPaymentError(null);
    try {
      const bookingInput = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        travelDates: formData.startDate,
        groupSize: BigInt(totalPax),
        amountINR: BigInt(total),
        ...itemType === "trek" ? { trekId: 1n } : {},
        ...itemType === "yatra" ? { yatraId: 1n } : {},
        ...itemType === "package" ? { packageId: 1n } : {},
        ...itemType === "stay" ? { stayId: 1n } : {}
      };
      const result = await actor.createBookingWithPayment(bookingInput);
      const { bookingId, razorpayOrder } = result;
      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        throw new Error(
          "Failed to load payment gateway. Please check your connection."
        );
      }
      await new Promise((resolve, reject) => {
        const options = {
          key: razorpayOrder.keyId,
          amount: Number(razorpayOrder.amount),
          currency: razorpayOrder.currency || "INR",
          order_id: razorpayOrder.orderId,
          name: "Manya Destination",
          description: itemSlug.replace(/-/g, " "),
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone
          },
          theme: { color: "#1E40AF" },
          handler: async (response) => {
            try {
              await actor.confirmBookingPayment(
                BigInt(bookingId),
                response.razorpay_payment_id,
                response.razorpay_signature
              );
              setConfirmedBookingId(
                bookingId || `MAN-2026-${Math.floor(1e3 + Math.random() * 9e3)}`
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
              resolve();
            }
          }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Payment failed. Please try again.";
      setPaymentError(message);
      setPaymentState("failure");
    } finally {
      setIsProcessing(false);
    }
  }
  if (paymentState === "success") {
    const whatsappText = encodeURIComponent(
      `🏔️ My Manya Destination booking is confirmed!
Booking ID: ${confirmedBookingId}
Trip: ${itemSlug.replace(/-/g, " ")}
Date: ${formData.startDate}
Group: ${totalPax} person${totalPax !== 1 ? "s" : ""}
Amount Paid: ₹${confirmedAmountPaid.toLocaleString("en-IN")}`
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 py-12",
        "data-ocid": "booking.success.page",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-emerald-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce",
              style: { animationIterationCount: 3 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 48, className: "text-emerald-500" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display italic text-4xl font-bold text-gray-900 mb-2", children: "Booking Confirmed!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mb-1", children: "Your Himalayan journey is all set." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-400 mb-6", children: [
            "A confirmation email has been sent to ",
            formData.email
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-xl py-3 px-5 mb-6 inline-block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary/70 uppercase tracking-wider mb-1", children: "Booking ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-2xl font-bold text-primary", children: confirmedBookingId })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2.5 text-sm border border-gray-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Trip" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold capitalize", children: itemSlug.replace(/-/g, " ") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Travel Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: formData.startDate })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Group Size" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                totalPax,
                " person",
                totalPax !== 1 ? "s" : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-t border-gray-200 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-700 font-semibold", children: "Amount Paid" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold text-emerald-600 text-base", children: [
                "₹",
                confirmedAmountPaid.toLocaleString("en-IN")
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/account",
                className: "block bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-colors",
                "data-ocid": "booking.success.view_bookings.button",
                children: "View My Bookings"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: `https://wa.me/?text=${whatsappText}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 rounded-xl font-semibold hover:bg-[#1da851] transition-colors",
                "data-ocid": "booking.success.whatsapp.button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 16 }),
                  " Share on WhatsApp"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => window.print(),
                className: "flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors",
                "data-ocid": "booking.success.download.button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 16 }),
                  " Download Itinerary"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/",
                className: "text-primary/70 py-2 font-medium hover:text-primary transition-colors text-sm",
                children: "Back to Home"
              }
            )
          ] })
        ] })
      }
    );
  }
  if (paymentState === "failure") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center px-4 py-12",
        "data-ocid": "booking.failure.page",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-red-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 48, className: "text-red-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display italic text-3xl font-bold text-gray-900 mb-2", children: "Payment Failed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mb-4", children: "We couldn't process your payment." }),
          paymentError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded-xl p-3 mb-6 text-sm text-red-700 flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 16, className: "mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: paymentError })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setPaymentState("idle");
                  setPaymentError(null);
                },
                className: "bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-colors",
                "data-ocid": "booking.failure.retry.button",
                children: "Try Again"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "https://wa.me/919999000001?text=Hi%20Manya%20Destination!%20I%20had%20a%20payment%20failure.%20Can%20you%20help?",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center justify-center gap-2 border-2 border-[#25D366] text-[#25D366] py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors",
                "data-ocid": "booking.failure.support.button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 16 }),
                  " Contact Support via WhatsApp"
                ]
              }
            )
          ] })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#FAFAF7]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border-b border-[#E5DDD0] sticky top-0 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: STEPS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${i + 1 < step ? "bg-primary text-white" : i + 1 === step ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`,
          children: i + 1 < step ? "✓" : i + 1
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `ml-1 text-xs font-medium hidden sm:block ${i + 1 === step ? "text-primary" : "text-gray-400"}`,
          children: s
        }
      ),
      i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `mx-2 h-0.5 w-4 sm:w-10 ${i + 1 < step ? "bg-primary" : "bg-gray-200"}`
        }
      )
    ] }, s)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#EDE8DC] rounded-xl p-4 mb-6 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🏔️" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 uppercase tracking-wide", children: "Booking" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold capitalize", children: [
            itemType,
            ": ",
            itemSlug.replace(/-/g, " ")
          ] })
        ] })
      ] }),
      step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-[#E5DDD0]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display italic text-2xl mb-6", children: "Select Travel Dates & Group" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                className: "block text-sm font-semibold text-gray-700 mb-2",
                htmlFor: "startDate",
                children: "Start Date"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "startDate",
                type: "date",
                min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                value: formData.startDate,
                onChange: (e) => update("startDate", e.target.value),
                className: "w-full border border-[#C8BCA8] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-700 mb-3", children: "Group Composition" }),
            ["adults", "children", "seniors"].map((key) => {
              const labels = {
                adults: "Adults (18+)",
                children: "Children (10-17)",
                seniors: "Seniors (60+)"
              };
              const mins = {
                adults: 1,
                children: 0,
                seniors: 0
              };
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between py-3 border-b border-[#E5DDD0]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-700", children: labels[key] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => update(key, Math.max(mins[key], formData[key] - 1)),
                          className: "w-9 h-9 rounded-full bg-[#EDE8DC] hover:bg-[#E5DDD0] flex items-center justify-center",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 16 })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-center font-bold", children: formData[key] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => update(key, formData[key] + 1),
                          className: "w-9 h-9 rounded-full bg-primary text-white hover:bg-primary/90 flex items-center justify-center",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 })
                        }
                      )
                    ] })
                  ]
                },
                key
              );
            })
          ] }),
          totalPax >= 6 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-green-50 border border-green-200 rounded-xl p-3 text-green-800 text-sm font-semibold", children: "🎉 Group discount: 10% off for 6+ travellers!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F5F0E8] rounded-xl p-4 flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "Estimated Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xl font-bold text-primary", children: [
              "₹",
              total.toLocaleString("en-IN")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              disabled: !formData.startDate || formData.adults < 1,
              onClick: () => setStep(2),
              className: "w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2",
              children: [
                "Next: Add-Ons ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
              ]
            }
          )
        ] })
      ] }),
      step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-[#E5DDD0]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display italic text-2xl mb-2", children: "Enhance Your Journey" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm mb-6", children: "All add-ons are optional." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-6", children: ADD_ON_OPTIONS.map((ao) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            className: `flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${formData.selectedAddOns.includes(ao.id) ? "border-primary bg-primary/5" : "border-[#E5DDD0] hover:border-[#C8BCA8]"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: formData.selectedAddOns.includes(ao.id),
                  onChange: () => toggleAddOn(ao.id),
                  className: "mt-1 accent-primary"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-900", children: ao.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: ao.desc })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#D4722A] font-mono font-bold whitespace-nowrap", children: [
                "+₹",
                ao.price,
                ao.perPerson ? "/pp" : ""
              ] })
            ]
          },
          ao.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F5F0E8] rounded-xl p-4 mb-4 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "Total with Add-Ons" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xl font-bold text-primary", children: [
            "₹",
            total.toLocaleString("en-IN")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setStep(1),
              className: "flex items-center gap-1 px-6 py-3 border-2 border-[#E5DDD0] rounded-xl font-semibold hover:bg-[#F5F0E8] transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 }),
                " Back"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setStep(3),
              className: "flex-1 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2",
              children: [
                "Next: Travellers ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
              ]
            }
          )
        ] })
      ] }),
      step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-[#E5DDD0]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display italic text-2xl mb-6", children: "Lead Traveller Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6", children: [
          [
            {
              label: "Full Name",
              key: "name",
              type: "text"
            },
            { label: "Age", key: "age", type: "number" },
            { label: "Phone", key: "phone", type: "tel" },
            {
              label: "Email",
              key: "email",
              type: "email"
            },
            { label: "City", key: "city", type: "text" },
            {
              label: "Emergency Contact Name",
              key: "emergencyName",
              type: "text"
            },
            {
              label: "Emergency Contact Phone",
              key: "emergencyPhone",
              type: "tel"
            },
            {
              label: "Govt ID Number",
              key: "govtIdNumber",
              type: "text"
            }
          ].map(({ label, key, type }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                className: "block text-sm font-semibold text-gray-700 mb-1",
                htmlFor: key,
                children: [
                  label,
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: key,
                type,
                value: formData[key],
                onChange: (e) => update(key, e.target.value),
                className: "w-full border border-[#C8BCA8] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              }
            )
          ] }, label)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                className: "block text-sm font-semibold text-gray-700 mb-1",
                htmlFor: "gender",
                children: "Gender"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "gender",
                value: formData.gender,
                onChange: (e) => update("gender", e.target.value),
                className: "w-full border border-[#C8BCA8] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary text-sm",
                children: ["Male", "Female", "Other", "Prefer not to say"].map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: g }, g))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                className: "block text-sm font-semibold text-gray-700 mb-1",
                htmlFor: "govtIdType",
                children: "Govt ID Type"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "govtIdType",
                value: formData.govtIdType,
                onChange: (e) => update("govtIdType", e.target.value),
                className: "w-full border border-[#C8BCA8] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary text-sm",
                children: [
                  "Aadhaar Card",
                  "Passport",
                  "Driving License",
                  "Voter ID"
                ].map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: g }, g))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                className: "block text-sm font-semibold text-gray-700 mb-1",
                htmlFor: "specialReq",
                children: [
                  "Special Requirements",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 font-normal", children: "(optional)" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                id: "specialReq",
                value: formData.specialRequirements,
                onChange: (e) => update("specialRequirements", e.target.value),
                rows: 2,
                placeholder: "Dietary restrictions, medical conditions...",
                className: "w-full border border-[#C8BCA8] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-3 cursor-pointer mb-6 p-3 bg-amber-50 border border-amber-200 rounded-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: formData.medicalDeclaration,
              onChange: (e) => update("medicalDeclaration", e.target.checked),
              className: "mt-0.5 accent-primary"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-700", children: [
            "I declare I am physically fit for this activity and have no known medical conditions that could endanger myself or others.",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setStep(2),
              className: "flex items-center gap-1 px-6 py-3 border-2 border-[#E5DDD0] rounded-xl font-semibold hover:bg-[#F5F0E8] transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 }),
                " Back"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              disabled: !formData.name || !formData.email || !formData.phone || !formData.medicalDeclaration,
              onClick: () => setStep(4),
              className: "flex-1 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2",
              children: [
                "Review Booking ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
              ]
            }
          )
        ] })
      ] }),
      step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-[#E5DDD0]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display italic text-2xl mb-6", children: "Review & Confirm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F5F0E8] rounded-xl p-4 space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Item" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold capitalize", children: itemSlug.replace(/-/g, " ") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Start Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: formData.startDate })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Group" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                formData.adults,
                " adults",
                formData.children > 0 ? `, ${formData.children} children` : "",
                formData.seniors > 0 ? `, ${formData.seniors} seniors` : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Lead Traveller" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: formData.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Contact" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: formData.phone })
            ] })
          ] }),
          formData.selectedAddOns.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[#E5DDD0] rounded-xl p-4 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mb-2", children: "Add-Ons" }),
            formData.selectedAddOns.map((aoId) => {
              const ao = ADD_ON_OPTIONS.find((a) => a.id === aoId);
              return ao ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ao.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                  "+₹",
                  (ao.perPerson ? ao.price * totalPax : ao.price).toLocaleString("en-IN")
                ] })
              ] }, aoId) : null;
            })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary text-white rounded-xl p-4 flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Total Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-2xl font-bold", children: [
              "₹",
              total.toLocaleString("en-IN")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mb-1", children: "Cancellation Policy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Free cancellation 30+ days before travel. 50% refund 15-30 days before. No refund within 15 days of travel date." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-xs text-gray-400 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🔒" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Secure payment powered by" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-blue-600", children: "Razorpay" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "· UPI · Cards · Net Banking · Wallets" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-3 cursor-pointer mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: formData.termsAccepted,
              onChange: (e) => update("termsAccepted", e.target.checked),
              className: "mt-0.5 accent-primary"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-700", children: [
            "I agree to the Terms & Conditions and Cancellation Policy",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setStep(3),
              className: "flex items-center gap-1 px-6 py-3 border-2 border-[#E5DDD0] rounded-xl font-semibold hover:bg-[#F5F0E8] transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 }),
                " Back"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              disabled: !formData.termsAccepted || isProcessing,
              onClick: handleProceedToPayment,
              className: "flex-1 bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2",
              "data-ocid": "booking.proceed_payment.button",
              children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 18, className: "animate-spin" }),
                " Processing..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                "Proceed to Payment · ₹",
                total.toLocaleString("en-IN"),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
              ] })
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  BookingPage as default
};
