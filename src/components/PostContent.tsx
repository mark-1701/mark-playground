'use client';

import { createHTML } from '@/utils';
import { JsonValue } from '@prisma/client/runtime/client';
import { useEffect, useState } from 'react';

const PostContent = ({ content }: { content: JsonValue }) => {
  const [html, setHtml] = useState('');

  useEffect(() => setHtml(createHTML(content)), [content]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="prose prose-img:max-h-[600px] max-w-none"
    />
  );
};

export default PostContent;
