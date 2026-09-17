/** Compact payment-mark badges for the footer trust column. */

import type { ReactNode } from "react";

type MarkProps = { title: string };

function Badge({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      title={title}
      aria-label={title}
      className={`inline-flex h-9 min-w-[52px] items-center justify-center rounded-md border bg-white px-2 ${className}`}
      style={{ borderColor: "#E0E0E0" }}
    >
      {children}
    </span>
  );
}

function UpiMark({ title }: MarkProps) {
  return (
    <Badge title={title}>
      <svg width="40" height="16" viewBox="0 0 40 16" aria-hidden>
        <text
          x="0"
          y="12"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="700"
          fontSize="11"
          fill="#097939"
        >
          UPI
        </text>
        <circle cx="30" cy="8" r="5" fill="#F7941D" />
        <circle cx="35" cy="8" r="5" fill="#097939" />
      </svg>
    </Badge>
  );
}

function VisaMark({ title }: MarkProps) {
  return (
    <Badge title={title}>
      <svg width="40" height="14" viewBox="0 0 40 14" aria-hidden>
        <text
          x="2"
          y="12"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="800"
          fontSize="13"
          letterSpacing="0.5"
          fill="#1A1F71"
        >
          VISA
        </text>
      </svg>
    </Badge>
  );
}

function MastercardMark({ title }: MarkProps) {
  return (
    <Badge title={title}>
      <svg width="36" height="22" viewBox="0 0 36 22" aria-hidden>
        <circle cx="13" cy="11" r="8" fill="#EB001B" />
        <circle cx="23" cy="11" r="8" fill="#F79E1B" />
        <path
          d="M18 5.2a8 8 0 0 1 0 11.6 8 8 0 0 1 0-11.6z"
          fill="#FF5F00"
        />
      </svg>
    </Badge>
  );
}

function RupayMark({ title }: MarkProps) {
  return (
    <Badge title={title}>
      <svg width="46" height="14" viewBox="0 0 46 14" aria-hidden>
        <text
          x="0"
          y="11.5"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="700"
          fontSize="11"
          fill="#1B4F9C"
        >
          RuPay
        </text>
      </svg>
    </Badge>
  );
}

function NetBankingMark({ title }: MarkProps) {
  return (
    <Badge title={title} className="gap-1.5 min-w-[72px]">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M3 10.5 12 4l9 6.5"
          stroke="#555"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 10.5V18h14v-7.5"
          stroke="#555"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M3 18h18"
          stroke="#555"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path d="M9 14v4M12 14v4M15 14v4" stroke="#555" strokeWidth="1.6" />
      </svg>
      <span className="text-[10px] font-body font-semibold tracking-wide text-[#555555]">
        NetBank
      </span>
    </Badge>
  );
}

function EmiMark({ title }: MarkProps) {
  return (
    <Badge title={title} className="min-w-[44px]">
      <span className="text-[11px] font-body font-bold tracking-wide text-[#1A1A1A]">
        EMI
      </span>
    </Badge>
  );
}

const METHODS = [
  { id: "upi", label: "UPI", Mark: UpiMark },
  { id: "visa", label: "Visa", Mark: VisaMark },
  { id: "mastercard", label: "Mastercard", Mark: MastercardMark },
  { id: "rupay", label: "RuPay", Mark: RupayMark },
  { id: "netbanking", label: "Net Banking", Mark: NetBankingMark },
  { id: "emi", label: "EMI", Mark: EmiMark },
] as const;

export function PaymentMethodIcons() {
  return (
    <div
      data-ocid="footer.payment_methods"
      className="flex flex-wrap gap-2"
      role="list"
      aria-label="Accepted payment methods"
    >
      {METHODS.map(({ id, label, Mark }) => (
        <span key={id} role="listitem">
          <Mark title={label} />
        </span>
      ))}
    </div>
  );
}
