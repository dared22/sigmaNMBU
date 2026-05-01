import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Panel } from '@/components/ui/Panel';
import { cn } from '@/lib/cn';

const inputClassName =
  'w-full rounded-sm border border-line bg-surface-container px-3 py-2 font-mono text-sm text-on-surface focus:border-secondary focus:outline-none';

export function AdminPageHeader({
  title,
  eyebrow,
  action,
}: {
  title: string;
  eyebrow?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        {eyebrow ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-secondary">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-headline text-3xl font-semibold text-on-surface md:text-4xl">
          {title}
        </h1>
      </div>
      {action}
    </header>
  );
}

export function AdminLink({
  href,
  children,
  variant = 'primary',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
}) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center rounded-sm px-5 py-2.5 font-label text-[11px] font-bold uppercase tracking-[0.24em] transition-colors',
        variant === 'primary'
          ? 'border border-secondary bg-secondary text-on-secondary shadow-[0_0_15px_rgba(134,208,239,0.3)]'
          : 'border border-surface-variant bg-transparent text-on-surface hover:bg-surface-variant hover:text-secondary',
      )}
    >
      {children}
    </Link>
  );
}

export function AdminField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
        {label}
      </span>
      {children}
    </label>
  );
}

export function AdminInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={inputClassName} {...props} />;
}

export function AdminSelect(
  props: React.SelectHTMLAttributes<HTMLSelectElement>,
) {
  return <select className={inputClassName} {...props} />;
}

export function AdminTextarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      className={cn(inputClassName, 'min-h-32 resize-y leading-relaxed')}
      {...props}
    />
  );
}

export function AdminCheckbox({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return <Checkbox label={label} name={name} defaultChecked={defaultChecked} />;
}

export function AdminSubmit({
  children,
  variant = 'primary',
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'terminal' | 'ghost';
}) {
  return (
    <Button type="submit" variant={variant}>
      {children}
    </Button>
  );
}

export function EmptyPanel({ children }: { children: React.ReactNode }) {
  return (
    <Panel className="px-5 py-6">
      <p className="font-mono text-sm text-on-surface-variant">{children}</p>
    </Panel>
  );
}
