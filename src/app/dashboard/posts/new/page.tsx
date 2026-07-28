import EditPostPage from '@/features/post/pages/EditPostPage';
import { Suspense } from 'react';

export default function NewPostPage() {
  // todo: investigar si esto es necesario
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <EditPostPage />
    </Suspense>
  );
}
