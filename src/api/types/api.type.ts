/*fetch 공통화*/

export interface ApiProps {
  url: string;
  method?: string;
  errorMessage?: string;
  data?: unknown;
}
