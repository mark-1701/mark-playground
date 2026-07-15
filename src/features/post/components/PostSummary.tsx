import { useSavePost } from '@/features/post/hooks/useSavePost';
import type { Editor } from '@tiptap/react';
import { useEffect, useState } from 'react';

type PostSummaryProps = {
  editor: Editor;
};

const PostSummary = ({ editor }: PostSummaryProps) => {
  const [title, setTitle] = useState('titulo tentativo');
  const { save, isSaving } = useSavePost();

  const handleTitleChange = () => {
    let found = false;

    editor.state.doc.descendants(node => {
      if (found) return false; // no seguir bajando en el nodo
      if (node.type.name === 'heading' && node.attrs.level === 1) {
        if (node.textContent.trim().length > 0)
          setTitle(node.textContent.trim());
        found = true;
        return false;
      }
    });
  };

  useEffect(() => {
    handleTitleChange();
    editor.on('update', () => handleTitleChange());
    return () => {
      editor.off('update', () => handleTitleChange());
    };
  }, [editor]);

  return (
    <div className="h-min overflow-hidden rounded-md border border-gray-300 p-3">
      <div className="mb-4">
        <label htmlFor="title" className="mb-2 block font-medium">
          Título
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          className="w-full rounded border border-gray-300 p-1"
          onChange={e => setTitle(e.target.value)}
          onBlur={handleTitleChange}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="title" className="mb-2 block font-medium">
          Slug
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="w-full rounded border border-gray-300 p-1"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="title" className="mb-2 block font-medium">
          Miniatura
        </label>
        <input
          type="file"
          name="title"
          id="title"
          className="file:cursor-pointer file:bg-gray-200 file:p-0.5"
        />
      </div>

      <div className="text-right">
        <button
          className="cursor-pointer bg-blue-500 p-1 px-2 text-right text-white"
          onClick={() => save(editor)}
        >
          Publicar
        </button>
      </div>
    </div>
  );
};

export default PostSummary;
