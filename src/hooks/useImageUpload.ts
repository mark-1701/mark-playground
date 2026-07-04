import { useState } from 'react';
import { createPresignedUpload } from '@/services/storage/r2';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File, key: string) => {
    setIsUploading(true);
    setError(null);

    try {
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
      throw new Error('Error al subir la imagen');
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadImage, isUploading, error };
};
