'use server';

import prisma from '@/lib/prisma';

export const registerMedia = async (key: string) => {
  try {
    const media = await prisma.media.create({
      data: {
        r2Key: key
      }
    });

    return media;
  } catch (error) {
    throw new Error('Error registrando el recurso');
  }
};
