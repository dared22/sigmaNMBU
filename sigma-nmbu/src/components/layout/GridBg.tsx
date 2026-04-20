'use client';

export function GridBg() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 grid-bg opacity-55 [mask-image:linear-gradient(to_bottom,white,rgba(255,255,255,0.55))]"
      aria-hidden="true"
    />
  );
}
