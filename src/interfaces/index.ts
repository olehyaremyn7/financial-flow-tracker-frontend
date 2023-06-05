export type Nullable<T> = T | null;
export type Timeout = ReturnType<typeof setTimeout>;

export interface Init {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
