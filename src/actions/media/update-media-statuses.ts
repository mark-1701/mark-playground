// actions/media/update-media-statuses.ts
'use server';

import { MediaStatus } from '@/app/generated/prisma/enums';
import prisma from '@/lib/prisma';
import { mediaStatusOperations } from './media-status-operations';

export const updateMediaStatuses = async (postId: string, keys: string[]) => {
  try {
    await prisma.$transaction(mediaStatusOperations(postId, keys));
    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false, message: 'Error actualizando los estados de media' };
  }
};
