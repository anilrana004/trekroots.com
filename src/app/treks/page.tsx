import { Suspense } from "react";
import TreksPage from "@/views/TreksPage";
import TreksIndexLoading from "./loading";

export default function Page() {
  // TreksPage reads the facet filters out of the query string.
  return (
    <Suspense fallback={<TreksIndexLoading />}>
      <TreksPage />
    </Suspense>
  );
}
