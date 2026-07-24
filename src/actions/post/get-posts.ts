'use server';

import { Post, PostStatus } from '@/app/generated/prisma/client';
import prisma from '@/lib/prisma';
import { ActionResult } from '@/types';

export const getPosts = async (): Promise<ActionResult<Post[]>> => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        AND: [
          // como decir que no incluya los que tienen estatus draft?
          { status: { not: PostStatus.DRAFT } },
          { deletedAt: null }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return {
      ok: true,
      data: posts
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error consultado posts'
    };
  }
};
