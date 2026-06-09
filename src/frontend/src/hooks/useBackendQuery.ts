import { createActor } from "@/backend";
import type {
  BlogPost,
  Package,
  SearchResults,
  Stay,
  Trek,
  Yatra,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useAllTreks() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Trek[]>({
    queryKey: ["treks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTreks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTrekBySlug(slug: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Trek | null>({
    queryKey: ["trek", slug],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTrekBySlug(slug);
    },
    enabled: !!actor && !isFetching && !!slug,
  });
}

export function useTreksByState(state: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Trek[]>({
    queryKey: ["treks", "state", state],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTreksByState(state);
    },
    enabled: !!actor && !isFetching && !!state,
  });
}

export function useAllYatras() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Yatra[]>({
    queryKey: ["yatras"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllYatras();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useYatraBySlug(slug: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Yatra | null>({
    queryKey: ["yatra", slug],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getYatraBySlug(slug);
    },
    enabled: !!actor && !isFetching && !!slug,
  });
}

export function useAllPackages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Package[]>({
    queryKey: ["packages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPackages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePackageBySlug(slug: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Package | null>({
    queryKey: ["package", slug],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPackageBySlug(slug);
    },
    enabled: !!actor && !isFetching && !!slug,
  });
}

export function useAllStays() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Stay[]>({
    queryKey: ["stays"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStays();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useStayBySlug(slug: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Stay | null>({
    queryKey: ["stay", slug],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStayBySlug(slug);
    },
    enabled: !!actor && !isFetching && !!slug,
  });
}

export function useAllBlogPosts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BlogPost[]>({
    queryKey: ["blog"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBlogPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBlogPostBySlug(slug: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BlogPost | null>({
    queryKey: ["blog", slug],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBlogPostBySlug(slug);
    },
    enabled: !!actor && !isFetching && !!slug,
  });
}

export function useSearch(term: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SearchResults>({
    queryKey: ["search", term],
    queryFn: async () => {
      if (!actor)
        return {
          treks: [],
          yatras: [],
          packages: [],
          stays: [],
          blogPosts: [],
        };
      return actor.searchAll(term);
    },
    enabled: !!actor && !isFetching && term.length >= 2,
  });
}
