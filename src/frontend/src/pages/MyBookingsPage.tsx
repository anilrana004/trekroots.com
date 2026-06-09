import type { Booking, BookingStatus } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  ChevronUp,
  Loader2,
  Mail,
  Mountain,
  Search,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_STYLES: Record<
  BookingStatus,
  {
    variant: "default" | "secondary" | "destructive" | "outline";
    label: string;
    color: string;
  }
> = {
  pending: {
    variant: "secondary",
    label: "Pending",
    color: "text-amber-600 bg-amber-50 border-amber-200",
  },
  confirmed: {
    variant: "default",
    label: "Confirmed",
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
  cancelled: {
    variant: "destructive",
    label: "Cancelled",
    color: "text-red-600 bg-red-50 border-red-200",
  },
  completed: {
    variant: "outline",
    label: "Completed",
    color: "text-blue-700 bg-blue-50 border-blue-200",
  },
};

const MOCK_BOOKINGS: Booking[] = [
  {
    id: 1n,
    status: "confirmed" as BookingStatus,
    name: "Rahul Sharma",
    createdAt: 1717200000000000000n,
    travelDates: "2026-07-15 to 2026-07-21",
    email: "rahul@example.com",
    phone: "+91 99999 11111",
    groupSize: 4n,
    trekId: 1n,
    paymentStatus: "paid",
    amountINR: BigInt(12500),
  },
  {
    id: 2n,
    status: "pending" as BookingStatus,
    name: "Priya Patel",
    createdAt: 1718000000000000000n,
    travelDates: "2026-08-10 to 2026-08-16",
    email: "priya@example.com",
    phone: "+91 99999 22222",
    groupSize: 2n,
    yatraId: 1n,
    paymentStatus: "paid",
    amountINR: BigInt(9500),
  },
  {
    id: 3n,
    status: "completed" as BookingStatus,
    name: "Amit Kumar",
    createdAt: 1704000000000000000n,
    travelDates: "2025-12-01 to 2025-12-07",
    email: "amit@example.com",
    phone: "+91 99999 33333",
    groupSize: 6n,
    packageId: 1n,
    paymentStatus: "paid",
    amountINR: BigInt(28000),
  },
];

function formatDate(ts: bigint): string {
  try {
    const ms = Number(ts / 1000000n);
    return new Date(ms).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Unknown";
  }
}

function getItemName(booking: Booking): string {
  if (booking.trekId) return "Kedarkantha Trek";
  if (booking.yatraId) return "Char Dham Yatra";
  if (booking.packageId) return "Char Dham Complete Package";
  if (booking.stayId) return "Manya Highlands Homestay";
  return "Himalayan Experience";
}

function getItemType(booking: Booking): string {
  if (booking.trekId) return "Trek";
  if (booking.yatraId) return "Yatra";
  if (booking.packageId) return "Package";
  if (booking.stayId) return "Stay";
  return "Experience";
}

export default function MyBookingsPage() {
  const [email, setEmail] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [expandedId, setExpandedId] = useState<bigint | null>(null);
  const [cancellingId, setCancellingId] = useState<bigint | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    await new Promise((r) => setTimeout(r, 800));

    const filtered = MOCK_BOOKINGS.filter((b) =>
      b.email.toLowerCase().includes(email.toLowerCase()),
    );

    setBookings(filtered);
    setIsLoading(false);
  }

  async function handleCancel(bookingId: bigint) {
    setCancellingId(bookingId);
    await new Promise((r) => setTimeout(r, 1000));

    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: "cancelled" as BookingStatus } : b,
      ),
    );

    setCancellingId(null);
    toast.success("Booking cancelled successfully");
  }

  function canCancel(status: BookingStatus): boolean {
    return status === "pending" || status === "confirmed";
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8">
          <Link
            to="/account"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary font-body mb-4 transition-colors"
            data-ocid="bookings.back_to_account.link"
          >
            <ArrowLeft size={14} /> Back to Account
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            My Bookings
          </h1>
          <p className="text-muted-foreground font-body mt-1">
            View and manage your Himalayan adventures
          </p>
        </div>

        <Card className="mb-8 shadow-sm" data-ocid="bookings.search.card">
          <CardContent className="pt-6">
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="flex-1 space-y-2">
                <Label htmlFor="searchEmail" className="font-body">
                  Enter your booking email
                </Label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={16}
                  />
                  <Input
                    id="searchEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-10 font-body"
                    data-ocid="bookings.email.input"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <Button
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  className="font-body gap-2 bg-primary w-full sm:w-auto"
                  data-ocid="bookings.search.button"
                >
                  {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Search size={16} />
                  )}
                  Look Up
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {isLoading && (
          <div
            className="flex items-center justify-center py-16"
            data-ocid="bookings.loading_state"
          >
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!isLoading && hasSearched && bookings.length === 0 && (
          <div className="text-center py-16" data-ocid="bookings.empty_state">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Mountain className="text-muted-foreground" size={32} />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              No Bookings Found
            </h3>
            <p className="text-muted-foreground font-body text-sm max-w-sm mx-auto">
              No bookings found for{" "}
              <span className="font-semibold">{email}</span>. Try a different
              email or make your first booking.
            </p>
            <Link to="/treks" className="inline-block mt-4">
              <Button
                variant="outline"
                className="font-body"
                data-ocid="bookings.explore_treks.button"
              >
                Explore Treks
              </Button>
            </Link>
          </div>
        )}

        {!isLoading && bookings.length > 0 && (
          <div className="space-y-4" data-ocid="bookings.list">
            {bookings.map((booking) => {
              const isExpanded = expandedId === booking.id;
              const statusStyle = STATUS_STYLES[booking.status];
              const itemName = getItemName(booking);
              const itemType = getItemType(booking);

              return (
                <Card
                  key={booking.id.toString()}
                  className={`shadow-sm transition-shadow ${
                    isExpanded ? "ring-1 ring-primary/20" : ""
                  }`}
                  data-ocid={`bookings.item.${booking.id}`}
                >
                  <CardContent className="pt-5 pb-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant="outline"
                            className="text-[10px] font-body uppercase tracking-wider"
                          >
                            {itemType}
                          </Badge>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium font-body border ${statusStyle.color}`}
                          >
                            {statusStyle.label}
                          </span>
                        </div>
                        <h3 className="font-display text-lg font-semibold text-foreground truncate">
                          {itemName}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground font-body">
                          <span className="flex items-center gap-1">
                            <Calendar size={13} />
                            {booking.travelDates}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={13} />
                            {booking.groupSize.toString()} travellers
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setExpandedId(isExpanded ? null : booking.id)
                          }
                          className="font-body gap-1"
                          data-ocid={`bookings.view_details.${booking.id}.button`}
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp size={14} /> Hide
                            </>
                          ) : (
                            <>
                              <ChevronDown size={14} /> Details
                            </>
                          )}
                        </Button>
                        {canCancel(booking.status) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCancel(booking.id)}
                            disabled={cancellingId === booking.id}
                            className="font-body gap-1 text-destructive hover:text-destructive hover:bg-destructive/5"
                            data-ocid={`bookings.cancel.${booking.id}.button`}
                          >
                            {cancellingId === booking.id ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : (
                              <XCircle size={14} />
                            )}
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-border space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground font-body">
                              Booking ID:
                            </span>
                            <span className="ml-2 font-mono font-medium text-foreground">
                              MAN-2026-{String(booking.id).padStart(4, "0")}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground font-body">
                              Amount Paid:
                            </span>
                            <span className="ml-2 font-mono font-semibold text-emerald-600">
                              {booking.amountINR
                                ? `₹${Number(booking.amountINR).toLocaleString("en-IN")}`
                                : "—"}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground font-body">
                              Payment:
                            </span>
                            <span
                              className={`ml-2 font-body font-medium ${
                                booking.paymentStatus === "paid"
                                  ? "text-emerald-600"
                                  : "text-amber-600"
                              }`}
                            >
                              {booking.paymentStatus === "paid"
                                ? "✓ Paid"
                                : booking.paymentStatus || "Pending"}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground font-body">
                              Booked On:
                            </span>
                            <span className="ml-2 font-body text-foreground">
                              {formatDate(booking.createdAt)}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground font-body">
                              Lead Name:
                            </span>
                            <span className="ml-2 font-body text-foreground">
                              {booking.name}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground font-body">
                              Phone:
                            </span>
                            <span className="ml-2 font-body text-foreground">
                              {booking.phone}
                            </span>
                          </div>
                          <div className="sm:col-span-2">
                            <span className="text-muted-foreground font-body">
                              Email:
                            </span>
                            <span className="ml-2 font-body text-foreground">
                              {booking.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
