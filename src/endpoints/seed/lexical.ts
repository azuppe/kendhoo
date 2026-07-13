export const lexicalText = (text: string, heading?: string): any => ({
  root: {
    type: 'root',
    children: [
      ...(heading
        ? [
            {
              type: 'heading',
              tag: 'h2',
              children: [
                { type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: heading, version: 1 },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          ]
        : []),
      {
        type: 'paragraph',
        children: [
          { type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})
