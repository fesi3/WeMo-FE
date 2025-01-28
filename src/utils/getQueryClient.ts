import { QueryClient } from '@tanstack/react-query';

let queryClient: QueryClient | null = null;
//인스턴스를 한개만 생성하기 위한 싱글톤 패턴
export default function getQueryClient() {
  if (!queryClient) {
    queryClient = new QueryClient();
  }
  return queryClient;
}
