import { useState } from "react";

interface TripCostCalculatorProps {
  tripName: string;
  baseDurationDays: number;
  pricePerPersonBudget: number;
  pricePerPersonStandard: number;
  pricePerPersonPremium: number;
  tripType: "trek" | "yatra";
}

type AccommodationType = "budget" | "standard" | "premium";

export function TripCostCalculator({
  tripName,
  baseDurationDays,
  pricePerPersonBudget,
  pricePerPersonStandard,
  pricePerPersonPremium,
  tripType,
}: TripCostCalculatorProps) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [accommodationType, setAccommodationType] =
    useState<AccommodationType>("standard");

  const basePrice =
    accommodationType === "budget"
      ? pricePerPersonBudget
      : accommodationType === "premium"
        ? pricePerPersonPremium
        : pricePerPersonStandard;

  const perPerson = basePrice;
  const childrenCost = children * basePrice * 0.5;
  const groupTotal = adults * perPerson + childrenCost;

  const accommodationOptions: {
    value: AccommodationType;
    label: string;
    price: number;
  }[] = [
    { value: "budget", label: "Budget", price: pricePerPersonBudget },
    { value: "standard", label: "Standard", price: pricePerPersonStandard },
    { value: "premium", label: "Premium", price: pricePerPersonPremium },
  ];

  return (
    <div
      className="rounded-2xl p-5 space-y-4"
      style={{ backgroundColor: "#F5F0E8", border: "1px solid #E5DDD0" }}
      data-ocid="calculator.card"
    >
      {/* Heading */}
      <div>
        <h3
          className="font-display text-xl font-bold"
          style={{ color: "#3C1414" }}
        >
          Trip Cost Estimator
        </h3>
        <p className="font-body text-xs mt-0.5" style={{ color: "#7A7A7A" }}>
          {tripName} · {baseDurationDays} Days
        </p>
      </div>

      {/* Stepper rows */}
      <div className="space-y-3">
        {/* Adults */}
        <div className="flex items-center justify-between">
          <div>
            <p
              className="font-body text-sm font-semibold"
              style={{ color: "#3C1414" }}
            >
              Adults
            </p>
            <p className="font-body text-xs" style={{ color: "#7A7A7A" }}>
              Age 12+
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-ocid="calculator.adults_minus"
              onClick={() => setAdults((v) => Math.max(1, v - 1))}
              disabled={adults <= 1}
              className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-base transition-colors disabled:opacity-40"
              style={{
                backgroundColor: "#fff",
                border: "1px solid #C04000",
                color: "#C04000",
              }}
            >
              −
            </button>
            <span
              className="font-body font-bold text-base w-5 text-center"
              style={{ color: "#3C1414" }}
              data-ocid="calculator.adults_count"
            >
              {adults}
            </span>
            <button
              type="button"
              data-ocid="calculator.adults_plus"
              onClick={() => setAdults((v) => Math.min(20, v + 1))}
              disabled={adults >= 20}
              className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-base transition-colors disabled:opacity-40"
              style={{
                backgroundColor: "#C04000",
                border: "1px solid #C04000",
                color: "#fff",
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="flex items-center justify-between">
          <div>
            <p
              className="font-body text-sm font-semibold"
              style={{ color: "#3C1414" }}
            >
              Children
            </p>
            <p className="font-body text-xs" style={{ color: "#7A7A7A" }}>
              Age 5–11 · 50% off
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-ocid="calculator.children_minus"
              onClick={() => setChildren((v) => Math.max(0, v - 1))}
              disabled={children <= 0}
              className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-base transition-colors disabled:opacity-40"
              style={{
                backgroundColor: "#fff",
                border: "1px solid #C04000",
                color: "#C04000",
              }}
            >
              −
            </button>
            <span
              className="font-body font-bold text-base w-5 text-center"
              style={{ color: "#3C1414" }}
              data-ocid="calculator.children_count"
            >
              {children}
            </span>
            <button
              type="button"
              data-ocid="calculator.children_plus"
              onClick={() => setChildren((v) => Math.min(10, v + 1))}
              disabled={children >= 10}
              className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-base transition-colors disabled:opacity-40"
              style={{
                backgroundColor: "#C04000",
                border: "1px solid #C04000",
                color: "#fff",
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Accommodation Type */}
      <div>
        <p
          className="font-body text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: "#7A7A7A" }}
        >
          Accommodation
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {accommodationOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              data-ocid={`calculator.accom_${opt.value}`}
              onClick={() => setAccommodationType(opt.value)}
              className="py-2 px-1 rounded-lg text-center transition-all"
              style={{
                border:
                  accommodationType === opt.value
                    ? "2px solid #C04000"
                    : "1px solid #D9D0C4",
                backgroundColor:
                  accommodationType === opt.value ? "#C04000" : "#fff",
                color: accommodationType === opt.value ? "#fff" : "#3C1414",
              }}
            >
              <p className="font-body text-xs font-semibold">{opt.label}</p>
              <p
                className="font-body text-[10px] mt-0.5"
                style={{
                  color:
                    accommodationType === opt.value ? "#FFD9C4" : "#7A7A7A",
                }}
              >
                ₹{opt.price.toLocaleString("en-IN")}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Duration row */}
      <div
        className="flex items-center justify-between py-2 border-b"
        style={{ borderColor: "#D9D0C4" }}
      >
        <p className="font-body text-sm" style={{ color: "#7A7A7A" }}>
          Duration
        </p>
        <p
          className="font-body text-sm font-semibold"
          style={{ color: "#3C1414" }}
        >
          {baseDurationDays} Days
        </p>
      </div>

      {/* Price output */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <p className="font-body text-sm" style={{ color: "#7A7A7A" }}>
            Per Person
          </p>
          <p
            className="font-body text-base font-semibold"
            style={{ color: "#3C1414" }}
          >
            ₹{perPerson.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p
            className="font-body text-sm font-bold"
            style={{ color: "#3C1414" }}
          >
            Group Total
          </p>
          <p
            className="font-display text-2xl font-bold"
            style={{ color: "#C04000" }}
            data-ocid="calculator.group_total"
          >
            ₹{groupTotal.toLocaleString("en-IN")}
          </p>
        </div>
        {children > 0 && (
          <p className="font-body text-xs" style={{ color: "#7A7A7A" }}>
            Includes {adults} adult{adults > 1 ? "s" : ""} + {children} child
            {children > 1 ? "ren" : ""} (50% rate)
          </p>
        )}
      </div>

      {/* Disclaimer */}
      <p className="font-body text-[11px] italic" style={{ color: "#9A8F85" }}>
        Estimates only — final price confirmed at booking.
      </p>

      {/* CTA */}
      <button
        type="button"
        data-ocid="calculator.book_button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full py-3 rounded-xl font-body text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#C04000" }}
      >
        Book This {tripType === "trek" ? "Trek" : "Yatra"}
      </button>
    </div>
  );
}
