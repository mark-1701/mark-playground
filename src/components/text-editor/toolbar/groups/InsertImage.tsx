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

    try {
      // registrar media
      const media = await registerMedia(key);

      // hostear las imagenes en el servicio storage
      const publicUrl = await uploadImage(file, key);

      // actualizar la url
      await updateMediaUrl(media.id, publicUrl);

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
    } catch (error) {
      console.log('Ocurrió un error insertando la imagen');
    }
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
