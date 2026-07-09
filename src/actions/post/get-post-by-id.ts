'use server';

import { Post } from '@/app/generated/prisma/client';
import prisma from '@/lib/prisma';
import { ActionResult } from '@/types';

export const getPostById = async (id: string): Promise<ActionResult<Post>> => {
  try {
    const post = await prisma.post.findUnique({
      where: { id }
    });

    if (!post) throw new Error(`${id} no existe`);

    return {
      ok: true,
      data: post
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error consultando post'
    };
  }
};
