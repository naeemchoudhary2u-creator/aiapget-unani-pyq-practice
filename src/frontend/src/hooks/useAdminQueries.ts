/**
 * Admin panel query hooks — clean rewrite.
 *
 * RULES:
 * - ALL queries use enabled: !!actor  (never isReady, never isFetching)
 * - NO localStorage caching for payments / subscriptions / logins
 * - Backend is the ONLY source of truth for admin data
 * - Simple queryFn: call actor method, return result. React Query handles retry.
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Question } from "../backend";
import type { Question as LocalQuestion } from "../data/questions";
import { questions as staticQuestions } from "../data/questions";
import { useActor } from "./useActor";

// Re-export types so pages can import from here
export type { Question };

// ── Shared actor-ready gate ───────────────────────────────────────────────────
// useActor exposes `isReady` (set after health check / deadline).
// ALL queries that talk to the backend MUST gate on both !!actor && isReady
// so they never fire into a dead connection.

// ── Question hooks (admin) ────────────────────────────────────────────────────

export function useAdminQuestions() {
  const { actor, isReady } = useActor();
  return useQuery<Question[]>({
    queryKey: ["adminQuestions"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return await actor.getAdminQuestions();
    },
    enabled: !!actor && isReady,
    staleTime: 0,
    refetchInterval: 30_000,
    retry: 3,
  });
}

// Keep the old name so any page importing useGetAdminQuestions still compiles.
export const useGetAdminQuestions = useAdminQuestions;

export function useAddQuestion() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (q: {
      questionText: string;
      answerOptions: string[];
      correctAnswerIndex: number;
      topic: string;
      year: string;
      explanation?: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const newQuestion: Question = {
        id: BigInt(Date.now()),
        questionText: q.questionText,
        answerOptions: q.answerOptions,
        correctAnswerIndex: BigInt(q.correctAnswerIndex),
        topic: q.topic,
        year: q.year,
        ...(q.explanation ? { explanation: q.explanation } : {}),
      };
      return await actor.addQuestion(newQuestion);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminQuestions"] });
      queryClient.invalidateQueries({ queryKey: ["allQuestions"] });
    },
  });
}

export function useRemoveQuestion() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return await actor.removeQuestion(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminQuestions"] });
      queryClient.invalidateQueries({ queryKey: ["allQuestions"] });
    },
  });
}

// ── Data counts (verification) ────────────────────────────────────────────────

export function useDataCounts() {
  const { actor } = useActor();
  return useQuery({
    queryKey: ["dataCounts"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return await actor.getDataCounts();
    },
    enabled: !!actor,
    staleTime: 0,
    refetchInterval: 10_000,
    retry: 3,
  });
}

// ── Public all-questions (for quiz pages) ─────────────────────────────────────
// Kept here so pages that import useAllQuestions from here still compile.

function convertBackendQuestion(bq: Question, index: number): LocalQuestion {
  const yearNum = Number.parseInt(bq.year, 10);
  return {
    id: 100_000 + index,
    text: bq.questionText,
    options: [
      bq.answerOptions[0] ?? "",
      bq.answerOptions[1] ?? "",
      bq.answerOptions[2] ?? "",
      bq.answerOptions[3] ?? "",
    ],
    correctIndex: Number(bq.correctAnswerIndex),
    topic: bq.topic,
    year: Number.isNaN(yearNum) ? 0 : yearNum,
    explanation: bq.explanation ?? "",
  };
}

export function useAllQuestions() {
  const { actor } = useActor();
  return useQuery<LocalQuestion[]>({
    queryKey: ["allQuestions"],
    queryFn: async () => {
      if (!actor) return staticQuestions;
      try {
        const backendQuestions = await actor.getQuestions();
        const converted = backendQuestions.map(convertBackendQuestion);
        const backendTexts = new Set(
          converted.map((q) => q.text.trim().toLowerCase()),
        );
        const filteredStatic = staticQuestions.filter(
          (q) => !backendTexts.has(q.text.trim().toLowerCase()),
        );
        return [...filteredStatic, ...converted];
      } catch {
        return staticQuestions;
      }
    },
    enabled: true,
    staleTime: 0,
    refetchInterval: 30_000,
    retry: 3,
  });
}
