'use server';

import { MediaStatus } from '@/app/generated/prisma/enums';
import prisma from '@/lib/prisma';

export const updateMediaStatuses = async (keys: string[]) => {
  await prisma.$transaction([
    prisma.media.updateMany({
      where: {
        r2Key: {
          in: keys
        }
      },
      data: {
        status: MediaStatus.ATTACHED
      }
    }),
    prisma.media.updateMany({
      where: {
        r2Key: {
          notIn: keys
        }
      },
      data: {
        status: MediaStatus.ORPHAN
      }
    })
  ]);

  try {
  } catch (error) {
    throw new Error('Error actualizando los estados de media');
  }
};
