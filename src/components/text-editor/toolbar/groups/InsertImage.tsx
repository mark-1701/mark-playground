import { registerMedia, updateMediaUrl } from '@/actions';
import type { Editor } from '@tiptap/core';
import { useRef } from 'react';
import { PiImage } from 'react-icons/pi';
import { useImageUpload } from '@/hooks/useImageUpload';
import { generateImageKey } from '@/utils/generateImageKey';
import ToolBarButton from '../ui/ToolbarButton';

const InsertImage = ({ editor }: { editor: Editor }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage } = useImageUpload();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !editor) return;

    const key = generateImageKey(file.name);
    const postId = '0f2f61af-915d-422d-98f5-74583eab6941';

    // 1. registrar media
    const media = await registerMedia(postId, key);
    if (!media.ok) {
      console.log('hubo un error');
      return;
    }

    // 2. guardar la imágen en el storage
    const publicUrl = await uploadImage(file, key);

    // 3. actualizar la url
    await updateMediaUrl(media.data?.id, publicUrl);

    editor
      .chain()
      .insertContentAt(editor.state.selection.anchor, {
        type: 'image',
        attrs: {
          src: publicUrl,
          ['data-r2-key']: key
        }
      })
      .focus()
      .run();
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
