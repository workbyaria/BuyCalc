import React from 'react';

/**
 * @param {'default' | 'muted' | 'dashed'} variant
 */
export default function GlassCard({ children, className = '', variant = 'default', as: Tag = 'div' }) {
  const base =
    'rounded-[28px] border transition-all duration-300 ' +
    'bg-[var(--glass-bg)] backdrop-blur-[40px] [-webkit-backdrop-filter:blur(40px)] ' +
    'border-[var(--glass-border)] shadow-[var(--glass-shadow)] ' +
    'hover:shadow-[0_8px_40px_rgba(0,0,0,0.1),0_2px_12px_rgba(0,0,0,0.06)]';

  const variants = {
    default: '',
    muted: 'bg-[var(--glass-bg-muted)] border-[var(--glass-border-muted)]',
    dashed: 'border-dashed border-[var(--glass-border-dashed)] bg-[var(--glass-bg-muted)]',
  };

  return <Tag className={`${base} ${variants[variant] ?? ''} ${className}`.trim()}>{children}</Tag>;
}
