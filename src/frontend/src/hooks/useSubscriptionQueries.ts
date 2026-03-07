import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UserSubscription } from "../backend";
import { useActor } from "./useActor";

// Hook to fetch subscription for a specific user
export function useGetSubscriptionByUser(userId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<UserSubscription | null>({
    queryKey: ["subscriptionByUser", userId],
    queryFn: async () => {
      if (!actor || !userId) return null;
      try {
        return await actor.getSubscriptionByUser(userId);
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!userId,
    staleTime: 30_000, // 30 seconds cache
    retry: false,
  });
}

// Hook to activate/update a subscription (admin use)
export function useActivateSubscription() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sub: UserSubscription) => {
      if (!actor) throw new Error("Actor not available");
      return await actor.activateSubscription(sub);
    },
    onSuccess: (_data, sub) => {
      queryClient.invalidateQueries({
        queryKey: ["subscriptionByUser", sub.userId],
      });
      queryClient.invalidateQueries({ queryKey: ["allSubscriptions"] });
    },
  });
}

// Hook to fetch all subscriptions (admin use)
export function useAllSubscriptions() {
  const { actor, isFetching } = useActor();
  return useQuery<UserSubscription[]>({
    queryKey: ["allSubscriptions"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllSubscriptions();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: true,
    retry: false,
  });
}

// Hook to allow user to request device reset
export function useResetSubscriptionDevice() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      if (!actor) throw new Error("Actor not available");
      return await actor.resetSubscriptionDevice(userId);
    },
    onSuccess: (_data, userId) => {
      queryClient.invalidateQueries({
        queryKey: ["subscriptionByUser", userId],
      });
      queryClient.invalidateQueries({ queryKey: ["allSubscriptions"] });
    },
  });
}

// Hook to update last login device
export function useUpdateLastLoginDevice() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      userId,
      deviceId,
    }: { userId: string; deviceId: string }) => {
      if (!actor) return false;
      try {
        return await actor.updateLastLoginDevice(userId, deviceId);
      } catch {
        return false;
      }
    },
  });
}
