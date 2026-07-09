'use server';

import { Post } from '@/app/generated/prisma/client';
import prisma from '@/lib/prisma';
import { ActionResult } from '@/types';

export const getPosts = async (): Promise<ActionResult<Post[]>> => {
  try {
    const posts = await prisma.post.findMany();

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
