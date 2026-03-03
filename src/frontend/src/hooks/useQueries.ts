import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Quiz attempt stored as [timestamp_seconds, correct_answers, total_questions]
export interface QuizAttempt {
  timestamp: number;
  correct: number;
  total: number;
}

const STORAGE_KEY = "aiapget_quiz_history";

function loadAttemptsFromStorage(): QuizAttempt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as QuizAttempt[];
  } catch {
    return [];
  }
}

function saveAttemptsToStorage(attempts: QuizAttempt[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
  } catch {
    // Ignore storage errors
  }
}

export function useQuizHistory() {
  return useQuery<QuizAttempt[]>({
    queryKey: ["quizHistory"],
    queryFn: async () => {
      const attempts = loadAttemptsFromStorage();
      return [...attempts].reverse();
    },
    staleTime: 0,
  });
}

export function useRecordAttempt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (attempt: QuizAttempt) => {
      const existing = loadAttemptsFromStorage();
      saveAttemptsToStorage([...existing, attempt]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizHistory"] });
    },
  });
}

export function useClearHistory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem(STORAGE_KEY);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizHistory"] });
    },
  });
}
