import type { MDXComponents } from 'mdx/types';
import { CodeBlock } from '@/components/terminal/CodeBlock';
import { TerminalCard } from '@/components/terminal/TerminalCard';

const components: MDXComponents = {
  h1: (p) => <h1 className="font-headline text-5xl md:text-7xl tracking-[-0.05em] text-neutral" {...p} />,
  h2: (p) => <h2 className="font-headline text-3xl md:text-4xl tracking-[-0.05em] text-neutral mt-16 mb-6" {...p} />,
  h3: (p) => <h3 className="font-headline text-xl md:text-2xl tracking-[-0.04em] text-neutral mt-10 mb-3" {...p} />,
  p:  (p) => <p className="font-mono text-sm md:text-base text-neutral/80 leading-relaxed my-4" {...p} />,
  a:  (p) => <a className="text-accent-primary underline decoration-accent-primary/40 underline-offset-4 hover:decoration-accent-primary" {...p} />,
  ul: (p) => <ul className="font-mono text-sm text-neutral/80 list-none space-y-2 my-4" {...p} />,
  li: (p) => <li className="pl-4 relative before:content-['>'] before:absolute before:left-0 before:text-accent-primary" {...p} />,
  code: (p) => <code className="font-mono text-accent-secondary bg-white/5 px-1.5 py-0.5 rounded" {...p} />,
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  TerminalCard,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
