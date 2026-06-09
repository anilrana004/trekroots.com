import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Navbar } from "@/components/Navbar";
import { WhatsAppFloatButton } from "@/components/WhatsAppFloatButton";
import ValleyOfFlowersPage from "@/pages/ValleyOfFlowersPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("@/pages/HomePage"));
const TreksPage = lazy(() => import("@/pages/TreksPage"));
const TrekDetailPage = lazy(() => import("@/pages/TrekDetailPage"));
const YatraPage = lazy(() => import("@/pages/YatraPage"));
const YatraDetailPage = lazy(() => import("@/pages/YatraDetailPage"));
const PackagesPage = lazy(() => import("@/pages/PackagesPage"));
const PackageDetailPage = lazy(() => import("@/pages/PackageDetailPage"));
const StaysPage = lazy(() => import("@/pages/StaysPage"));
const StayDetailPage = lazy(() => import("@/pages/StayDetailPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const BookingPage = lazy(() => import("@/pages/BookingPage"));

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-[72px]">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
      <WhatsAppFloatButton />
    </div>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});
const treksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/treks",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TreksPage />
    </Suspense>
  ),
});
const valleyOfFlowersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/treks/valley-of-flowers",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ValleyOfFlowersPage />
    </Suspense>
  ),
});
const trekDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/treks/$slug",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TrekDetailPage />
    </Suspense>
  ),
});
const yatraRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/yatra",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <YatraPage />
    </Suspense>
  ),
});
const yatraDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/yatra/$slug",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <YatraDetailPage />
    </Suspense>
  ),
});
const packagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/packages",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PackagesPage />
    </Suspense>
  ),
});
const packageDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/packages/$slug",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PackageDetailPage />
    </Suspense>
  ),
});
const staysRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/stays",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <StaysPage />
    </Suspense>
  ),
});
const stayDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/stays/$slug",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <StayDetailPage />
    </Suspense>
  ),
});
const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BlogPage />
    </Suspense>
  ),
});
const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$slug",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BlogPostPage />
    </Suspense>
  ),
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AboutPage />
    </Suspense>
  ),
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ContactPage />
    </Suspense>
  ),
});
const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SearchPage />
    </Suspense>
  ),
});
const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/booking/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BookingPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  treksRoute,
  valleyOfFlowersRoute,
  trekDetailRoute,
  yatraRoute,
  yatraDetailRoute,
  packagesRoute,
  packageDetailRoute,
  staysRoute,
  stayDetailRoute,
  blogRoute,
  blogPostRoute,
  aboutRoute,
  contactRoute,
  searchRoute,
  bookingRoute,
]);

const router = createRouter({ routeTree });

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return <RouterProvider router={router} />;
}
