import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Question as BackendQuestion } from "../backend";
import { type Question, questions as staticQuestions } from "../data/questions";
import { useActor } from "./useActor";

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
      queryClient.refetchQueries({ queryKey: ["adminQuestions"] });
      queryClient.refetchQueries({ queryKey: ["allQuestions"] });
    },
  });
}

export function useGetAdminQuestions() {
  const { actor } = useActor();

  return useQuery<BackendQuestion[]>({
    queryKey: ["adminQuestions"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getQuestions();
      } catch {
        // Silently return empty array on any backend error (including auth errors from old cache)
        return [];
      }
    },
    enabled: !!actor,
    staleTime: 0,
    refetchOnMount: true,
    retry: false,
  });
}

export function useAddQuestion() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (question: {
      questionText: string;
      answerOptions: string[];
      correctAnswerIndex: number;
      topic: string;
      year: string;
      explanation?: string;
    }) => {
      if (!actor) throw new Error("Actor not available");

      const newQuestion: BackendQuestion = {
        id: BigInt(Date.now()),
        questionText: question.questionText,
        answerOptions: question.answerOptions,
        correctAnswerIndex: BigInt(question.correctAnswerIndex),
        topic: question.topic,
        year: String(question.year),
        // Only include explanation if it has a non-empty value
        ...(question.explanation ? { explanation: question.explanation } : {}),
      };

      const result = await actor.addQuestion(newQuestion);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminQuestions"] });
      queryClient.invalidateQueries({ queryKey: ["allQuestions"] });
      queryClient.refetchQueries({ queryKey: ["adminQuestions"] });
      queryClient.refetchQueries({ queryKey: ["allQuestions"] });
    },
  });
}

/**
 * Converts a backend Question (bigint fields) to the local Question format.
 * Backend year is a string (e.g. "2023"), local year is a number.
 */
function convertBackendQuestion(bq: BackendQuestion, index: number): Question {
  const yearNum = Number.parseInt(bq.year, 10);
  const options = bq.answerOptions;
  // Ensure we always have exactly 4 options for the tuple type
  const opts: [string, string, string, string] = [
    options[0] ?? "",
    options[1] ?? "",
    options[2] ?? "",
    options[3] ?? "",
  ];
  return {
    id: 100000 + index, // offset to avoid ID collisions with static questions
    text: bq.questionText,
    options: opts,
    correctIndex: Number(bq.correctAnswerIndex),
    topic: bq.topic,
    year: Number.isNaN(yearNum) ? 0 : yearNum,
    explanation: bq.explanation ?? "",
  };
}

/**
 * Fetches all questions from the backend (public endpoint) and merges them
 * with the static local questions, deduplicating by question text.
 */
export function useAllQuestions() {
  const { actor } = useActor();

  return useQuery<Question[]>({
    queryKey: ["allQuestions"],
    queryFn: async () => {
      if (!actor) return staticQuestions;
      try {
        const backendQuestions = await actor.getQuestions();
        const converted = backendQuestions.map(convertBackendQuestion);

        // Deduplicate: prefer backend questions over static ones with same text
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
    enabled: !!actor,
    staleTime: 0,
    refetchOnMount: true,
    retry: false,
  });
}
