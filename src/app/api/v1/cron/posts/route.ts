import { NextResponse } from 'next/server';
import { deleteOrphanMedia } from '@/actions/media/delete-orphan-media';
import { deleteOrphanMediaFromStorage } from '@/actions/media/delete-orphan-media-from-storage';
import { getOrphanMedia } from '@/actions/media/get-orphan-media';

export async function GET() {
  try {
    // 1. obtener los registros huérfanos
    const orphans = await getOrphanMedia();

    if (!orphans.ok) {
      throw new Error(orphans.message);
    }

    if (orphans.data.length === 0) {
      return NextResponse.json({
        ok: true,
        message: 'No hay nada que hacer'
      });
    }

    // 2. eliminar los huérfanos del servicio storage
    const deletedFromStorage = await deleteOrphanMediaFromStorage(orphans.data);

    if (!deletedFromStorage.ok) {
      throw new Error(deletedFromStorage.message);
    }

    // 3. marcar como eliminados los huérfanos elinados del servicio storage
    const deletedFromDb = await deleteOrphanMedia(deletedFromStorage.data);

    if (!deletedFromDb.ok) {
      throw new Error(deletedFromDb.message);
    }

    return NextResponse.json({
      ok: true,
      data: null,
      message: 'recursos consultados exitosamente'
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Ocurrió un error';
    return NextResponse.json(
      {
        ok: false,
        message
      },
      {
        status: 500
      }
    );
  }
}
