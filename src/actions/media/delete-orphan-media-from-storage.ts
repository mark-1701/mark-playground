'use server';

import { ActionResult } from '@/types';
import { deleteFromStorage } from '@/services/storage/r2';

export const deleteOrphanMediaFromStorage = async (
  keys: string[]
): Promise<ActionResult<string[]>> => {
  try {
    const deletedKeys = await deleteFromStorage(keys);
    return { ok: true, data: deletedKeys };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Error eliminando archivos del storage';

    return { ok: false, message };
  }
};
