import React from 'react';

export default function InputField({
  label,
  value,
  onChange,
  placeholder = '0',
  prefix,
  trailing,
  inputMode = 'decimal',
  className = '',
  labelClassName = '',
}) {
  return (
    <div className={`text-left ${className}`}>
      {label && (
        <div className={`text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-subtext)] mb-2 ${labelClassName}`}>
          {label}
        </div>
      )}
      <div className="input-glow flex items-center gap-2 rounded-2xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 transition-all duration-150">
        {prefix && <span className="text-xl font-semibold text-[var(--color-text)] tabular-nums shrink-0">{prefix}</span>}
        <input
          type="text"
          inputMode={inputMode}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-xl font-semibold text-[var(--color-text)] outline-none tabular-nums placeholder:text-[var(--color-subtext)]/50"
        />
        {trailing && <div className="shrink-0 text-[var(--color-subtext)]">{trailing}</div>}
      </div>
    </div>
  );
}
