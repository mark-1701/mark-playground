import type { Editor } from '@tiptap/core';
import { useRef } from 'react';
import { PiImage } from 'react-icons/pi';
import ToolBarButton from '../ui/ToolbarButton';

const InsertImage = ({ editor }: { editor: Editor }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !editor) return;

    const fileReader = new FileReader();

    fileReader.onload = event => {
      editor
        .chain()
        .insertContentAt(editor.state.selection.anchor, {
          type: 'image',
          attrs: {
            src: fileReader.result
          }
        })
        .focus()
        .run();
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />

      <ToolBarButton
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center justify-center gap-2"
      >
        <PiImage size={24} className="text-gray-700" />
        Cargar
      </ToolBarButton>
    </>
  );
};

export default InsertImage;
