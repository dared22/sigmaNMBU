import { cn } from '@/lib/cn';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface CodeBlockProps extends Omit<ComponentPropsWithoutRef<'pre'>, 'children'> {
  children: ReactNode;
  className?: string;
}

function normalizePreChildren(children: ReactNode) {
  if (
    children &&
    typeof children === 'object' &&
    'props' in children &&
    children.props &&
    typeof children.props === 'object' &&
    'children' in children.props
  ) {
    return children.props.children as ReactNode;
  }

  return children;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  return (
    <div
      className={cn(
        'overflow-x-auto rounded-xl bg-black/25 p-4 font-mono text-sm leading-relaxed ghost-border shadow-[inset_0_1px_0_rgb(255_255_255_/_0.03)]',
        className,
      )}
    >
      <pre className="whitespace-pre-wrap break-words text-neutral/80" {...props}>
        {normalizePreChildren(children)}
      </pre>
    </div>
  );
}
