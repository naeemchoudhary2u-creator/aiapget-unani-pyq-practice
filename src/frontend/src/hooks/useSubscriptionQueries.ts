import { useQuery } from "@tanstack/react-query";
import type { SubscriptionPlan } from "../backend";
import { useActor } from "./useActor";

export function useGetSubscriptionPlans() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<SubscriptionPlan[]>({
    queryKey: ["subscriptionPlans"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSubscriptionPlans();
    },
    enabled: !!actor && !actorFetching,
  });
}
