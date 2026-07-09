'use server';

import prisma from '@/lib/prisma';
import { mediaStatusOperations } from '../media/media-status-operations';

type PublshPostActionResult = { ok: true } | { ok: false; message: string };

export const publishPost = async (
  postId: string,
  title: string,
  content: string,
  mediakeys: string[]
): Promise<PublshPostActionResult> => {
  try {
    const contentJSON = JSON.parse(content);

    await prisma.$transaction([
      prisma.post.update({
        where: {
          id: postId
        },
        data: {
          title,
          content: contentJSON
        }
      }),
      ...mediaStatusOperations(postId, mediakeys)
    ]);

    return {
      ok: true
    };
  } catch (error: any) {
    return {
      ok: false,
      message: 'Error publicando el post'
    };
  }
};
