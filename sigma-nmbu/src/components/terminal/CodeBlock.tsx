import { cn } from '@/lib/cn';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  return (
    <div
      className={cn(
        'rounded-lg bg-bg-deep p-4 font-mono text-sm leading-relaxed ghost-border overflow-x-auto',
        className,
      )}
    >
      <pre className="text-neutral/80">
        {children}
      </pre>
    </div>
  );
}
