import { useState } from 'react';
import { createPresignedUpload } from '@/services/storage/r2';
import { generateImageKey } from '@/utils/generateImageKey';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      const key = generateImageKey(file.name);
      const { publicUrl, uploadUrl } = await createPresignedUpload({
        key,
        fileType: file.type
      });

      const response = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type }
      });

      if (!response.ok) throw new Error('Upload failed');

      return publicUrl;
    } catch {
      setError('Ocurrió un error al subir la imagen');
      throw new Error('Ocurrió un error al subir la imagen');
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadImage, isUploading, error };
};
