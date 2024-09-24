import { UserDoc } from '@/entities/user/types';

type PaginateMeta = {
  startAfterDocId?: string;
  targetUser?: UserDoc;
};

type PaginateResult<T> = {
  collection: T[];
  hasMore: boolean;
  lastDocId?: string;
};

export type { PaginateMeta, PaginateResult };
