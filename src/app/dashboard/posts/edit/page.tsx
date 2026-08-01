import EditPostPage from '@/features/post/pages/EditPostPage';
import { Suspense } from 'react';

export default function NewPostPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <EditPostPage />
    </Suspense>
  );
}
