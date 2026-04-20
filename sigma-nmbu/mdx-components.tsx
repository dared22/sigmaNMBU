import type { MDXComponents } from 'mdx/types';
import { CommitLog } from '@/components/about/CommitLog';
import { VisionDict } from '@/components/about/VisionDict';
import { CodeBlock } from '@/components/terminal/CodeBlock';
import { TerminalCard } from '@/components/terminal/TerminalCard';

const components: MDXComponents = {
  h1: (props) => (
    <h1
      className="font-headline text-5xl tracking-[-0.05em] text-neutral md:text-7xl"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-16 mb-6 font-headline text-3xl tracking-[-0.05em] text-neutral md:text-4xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-10 mb-3 font-headline text-xl tracking-[-0.04em] text-neutral md:text-2xl"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="my-4 font-mono text-sm leading-relaxed text-neutral/80 md:text-base"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-accent-primary underline decoration-accent-primary/40 underline-offset-4 hover:decoration-accent-primary"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="my-4 list-none space-y-2 font-mono text-sm text-neutral/80"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="my-4 list-decimal space-y-2 pl-5 font-mono text-sm text-neutral/80"
      {...props}
    />
  ),
  li: (props) => (
    <li
      className="relative pl-4 before:absolute before:left-0 before:text-accent-primary before:content-['>']"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-accent-secondary"
      {...props}
    />
  ),
  pre: (props) => <CodeBlock {...props} />,
  CommitLog,
  TerminalCard,
  VisionDict,
};

export function getMDXComponents(): MDXComponents {
  return components;
}

export function useMDXComponents(): MDXComponents {
  return getMDXComponents();
}
