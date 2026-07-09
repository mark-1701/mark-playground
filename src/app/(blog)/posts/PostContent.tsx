'use client';

import { JsonValue } from '@prisma/client/runtime/client';
import { useEffect, useState } from 'react';
import { createHTML } from './create-html';

const PostContent = ({ content }: { content: JsonValue }) => {
  const [html, setHtml] = useState('');

  useEffect(() => setHtml(createHTML(content)), [content]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default PostContent;
