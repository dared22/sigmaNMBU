import { evaluate } from '@mdx-js/mdx';
import { cache } from 'react';
import * as runtime from 'react/jsx-runtime';
import { getMDXComponents } from '../../../mdx-components';

const compileMDXSource = cache(async (source: string) => {
  const evaluated = await evaluate(source, {
    ...runtime,
    baseUrl: import.meta.url,
  });

  return evaluated.default;
});

interface MDXContentProps {
  source: string;
}

export async function MDXContent({ source }: MDXContentProps) {
  const Content = await compileMDXSource(source);

  return <Content components={getMDXComponents()} />;
}
