import { QueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export default function useCreateQueryClient() {
  const [queryClient] = useState<QueryClient>(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 1, // 1분
          },
        },
      }),
  );
  return queryClient;
}
