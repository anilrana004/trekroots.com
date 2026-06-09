import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  FileText,
  Heart,
  LogIn,
  LogOut,
  Mountain,
  Settings,
  Shield,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

interface AuthState {
  isLoggedIn: boolean;
  principal: string | null;
}

function getAuthState(): AuthState {
  try {
    const raw = localStorage.getItem("manya_auth");
    if (!raw) return { isLoggedIn: false, principal: null };
    return JSON.parse(raw) as AuthState;
  } catch {
    return { isLoggedIn: false, principal: null };
  }
}

function setAuthState(state: AuthState) {
  localStorage.setItem("manya_auth", JSON.stringify(state));
}

function generatePrincipal(): string {
  const chars = "abcdef0123456789";
  let s = "";
  for (let i = 0; i < 63; i++)
    s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export default function AccountPage() {
  const [auth, setAuth] = useState<AuthState>({
    isLoggedIn: false,
    principal: null,
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    setAuth(getAuthState());
  }, []);

  function handleLogin() {
    setIsLoggingIn(true);
    setTimeout(() => {
      const principal = generatePrincipal();
      const state = { isLoggedIn: true, principal };
      setAuthState(state);
      setAuth(state);
      setIsLoggingIn(false);
    }, 1500);
  }

  function handleLogout() {
    const state = { isLoggedIn: false, principal: null };
    setAuthState(state);
    setAuth(state);
  }

  function truncatePrincipal(p: string): string {
    return `${p.slice(0, 12)}...${p.slice(-8)}`;
  }

  if (!auth.isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
        <Card
          className="w-full max-w-md shadow-lg"
          data-ocid="account.login.card"
        >
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Mountain className="text-primary" size={32} />
            </div>
            <CardTitle className="font-display text-2xl font-bold text-foreground">
              Sign In to Your Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-muted-foreground font-body text-sm">
              Access your bookings, download documents, and manage your
              preferences.
            </p>

            <Button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="w-full font-body gap-2 bg-primary h-12 text-base"
              data-ocid="account.login.button"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <LogIn size={18} /> Login with Internet Identity
                </>
              )}
            </Button>

            <Separator />

            <div className="space-y-3">
              <p className="text-xs text-muted-foreground font-body text-center uppercase tracking-wider">
                Member Benefits
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <BookOpen size={16} />, label: "Track Bookings" },
                  { icon: <FileText size={16} />, label: "Download Documents" },
                  { icon: <Heart size={16} />, label: "Save Favourites" },
                  { icon: <Settings size={16} />, label: "Manage Preferences" },
                ].map((benefit) => (
                  <div
                    key={benefit.label}
                    className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border"
                  >
                    <span className="text-primary">{benefit.icon}</span>
                    <span className="text-sm font-body text-foreground">
                      {benefit.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground font-body">
              <Shield size={12} />
              <span>Secured by Internet Computer Protocol</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="shadow-lg" data-ocid="account.dashboard.card">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <User className="text-primary" size={28} />
              </div>
              <div className="min-w-0">
                <CardTitle className="font-display text-xl font-bold text-foreground">
                  Welcome Back
                </CardTitle>
                <p className="text-sm text-muted-foreground font-body font-mono mt-0.5">
                  {auth.principal
                    ? truncatePrincipal(auth.principal)
                    : "Anonymous"}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/account/bookings" className="w-full">
                <Button
                  variant="outline"
                  className="w-full font-body gap-2 h-12 justify-start"
                  data-ocid="account.my_bookings.link"
                >
                  <BookOpen size={18} className="text-primary" />
                  <span className="flex-1 text-left">My Bookings</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full font-body gap-2 h-12 justify-start"
                disabled
                data-ocid="account.saved_items.link"
              >
                <Heart size={18} className="text-primary" />
                <span className="flex-1 text-left">Saved Items</span>
              </Button>
              <Button
                variant="outline"
                className="w-full font-body gap-2 h-12 justify-start"
                disabled
                data-ocid="account.documents.link"
              >
                <FileText size={18} className="text-primary" />
                <span className="flex-1 text-left">Documents</span>
              </Button>
              <Button
                variant="outline"
                className="w-full font-body gap-2 h-12 justify-start"
                disabled
                data-ocid="account.settings.link"
              >
                <Settings size={18} className="text-primary" />
                <span className="flex-1 text-left">Settings</span>
              </Button>
            </div>

            <Separator />

            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full font-body gap-2 text-destructive hover:text-destructive hover:bg-destructive/5"
              data-ocid="account.logout.button"
            >
              <LogOut size={16} /> Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
