'use client';

import { TextEditor } from '@/features/text-editor/TextEditor';
import PostSidebar from '@/features/text-editor/components/PostSidebar';
import { createExtensionsConfig } from '@/features/text-editor/config';
import { useInsertImage } from '@/features/text-editor/hooks/useInsertImage';
import { useEditor } from '@tiptap/react';

const DashboardPage = () => {
  const { insertImage } = useInsertImage();

  const editor = useEditor({
    extensions: createExtensionsConfig({ insertImage }),
    content:
      '<h1>Mi nuevo artículo</h1>' + '<p>puedes empezar a escribir...</p>',
    immediatelyRender: false
  });

  if (!editor) return null;

  return (
    <div className="mx-20">
      <div>
        <h1 className="my-8 text-3xl font-bold">Crear nuevo post</h1>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <TextEditor editor={editor} />
        <PostSidebar editor={editor} />
      </div>
    </div>
  );
};

export default DashboardPage;
