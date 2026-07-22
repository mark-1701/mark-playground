import { title } from 'process';

export const initialPostData = {
  title: 'Mi nuevo artículo',
  content: {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: {
          level: 1,
          textAlign: 'left'
        },
        content: [
          {
            text: 'Mi nuevo artículo',
            type: 'text'
          }
        ]
      },
      {
        type: 'paragraph',
        attrs: {
          textAlign: 'left'
        },
        content: [
          {
            text: 'puedes empezar a escribir...',
            type: 'text'
          }
        ]
      },
      {
        type: 'paragraph',
        attrs: {
          textAlign: 'left'
        }
      }
    ]
  }
};
