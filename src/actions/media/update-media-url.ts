'use server';

import prisma from '@/lib/prisma';

export const updateMediaUrl = async (id: string, url: string) => {
  try {
    const updatedMedia = await prisma.media.update({
      where: { id },
      data: { url }
    });

    return updatedMedia;
  } catch (error) {
    throw new Error('Error actualizando la url');
  }
};
