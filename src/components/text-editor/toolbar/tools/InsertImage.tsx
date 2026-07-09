import type { Editor } from '@tiptap/core';
import { useRef } from 'react';
import { PiImage } from 'react-icons/pi';
import { useInsertImage } from '../../hooks/useInsertImage';
import ToolBarButton from '../components/ToolbarButton';

const postId = '0f2f61af-915d-422d-98f5-74583eab6941';

const InsertImage = ({ editor }: { editor: Editor }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { insertImage, isUploadingImage } = useInsertImage();

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) insertImage(editor, postId, file);
        }}
      />

      <ToolBarButton
        disabled={isUploadingImage}
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center justify-center gap-1 disabled:opacity-70"
      >
        +
        <PiImage size={24} className="text-gray-700" />
      </ToolBarButton>
    </>
  );
};

export default InsertImage;
