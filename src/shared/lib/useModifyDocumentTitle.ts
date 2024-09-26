import { useEffect } from 'react';

export function useModifyDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title + ' / Twitter';
  }, [title]);
}
