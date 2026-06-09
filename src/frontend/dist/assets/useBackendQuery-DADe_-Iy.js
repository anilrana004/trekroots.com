import { u as useActor, a as useQuery, c as createActor } from "./backend-BHRKQ7VT.js";
import "./index-B8T7PWVC.js";
function useAllTreks() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["treks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTreks();
    },
    enabled: !!actor && !isFetching
  });
}
function useTrekBySlug(slug) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["trek", slug],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTrekBySlug(slug);
    },
    enabled: !!actor && !isFetching && !!slug
  });
}
function useAllYatras() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["yatras"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllYatras();
    },
    enabled: !!actor && !isFetching
  });
}
function useYatraBySlug(slug) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["yatra", slug],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getYatraBySlug(slug);
    },
    enabled: !!actor && !isFetching && !!slug
  });
}
function useAllPackages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPackages();
    },
    enabled: !!actor && !isFetching
  });
}
function usePackageBySlug(slug) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["package", slug],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPackageBySlug(slug);
    },
    enabled: !!actor && !isFetching && !!slug
  });
}
function useAllStays() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["stays"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStays();
    },
    enabled: !!actor && !isFetching
  });
}
function useStayBySlug(slug) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["stay", slug],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStayBySlug(slug);
    },
    enabled: !!actor && !isFetching && !!slug
  });
}
function useAllBlogPosts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBlogPosts();
    },
    enabled: !!actor && !isFetching
  });
}
function useBlogPostBySlug(slug) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBlogPostBySlug(slug);
    },
    enabled: !!actor && !isFetching && !!slug
  });
}
function useSearch(term) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["search", term],
    queryFn: async () => {
      if (!actor)
        return {
          treks: [],
          yatras: [],
          packages: [],
          stays: [],
          blogPosts: []
        };
      return actor.searchAll(term);
    },
    enabled: !!actor && !isFetching && term.length >= 2
  });
}
export {
  useTrekBySlug as a,
  useAllYatras as b,
  useYatraBySlug as c,
  useAllPackages as d,
  usePackageBySlug as e,
  useAllStays as f,
  useStayBySlug as g,
  useAllBlogPosts as h,
  useBlogPostBySlug as i,
  useSearch as j,
  useAllTreks as u
};
