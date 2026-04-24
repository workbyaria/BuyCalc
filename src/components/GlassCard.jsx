import React from 'react';

/**
 * @param {'default' | 'muted' | 'dashed'} variant
 */
export default function GlassCard({ children, className = '', variant = 'default', as: Tag = 'div' }) {
  const base =
    'rounded-[26px] border transition-shadow duration-300 ' +
    'bg-[var(--glass-bg)] backdrop-blur-[24px] [-webkit-backdrop-filter:blur(24px)] ' +
    'border-[var(--glass-border)] shadow-[var(--glass-shadow)]';

  const variants = {
    default: '',
    muted: 'bg-[var(--glass-bg-muted)] border-[var(--glass-border-muted)]',
    dashed: 'border-dashed border-[var(--glass-border-dashed)] bg-[var(--glass-bg-muted)]',
  };

  return <Tag className={`${base} ${variants[variant] ?? ''} ${className}`.trim()}>{children}</Tag>;
}
