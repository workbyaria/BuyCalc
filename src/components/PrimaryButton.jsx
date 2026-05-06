import React from 'react';

export default function PrimaryButton({ children, className = '', type = 'button', disabled, ...rest }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={
        'w-full rounded-[22px] py-4 px-5 font-semibold tracking-wide text-[var(--btn-primary-text)] shadow-md ' +
        'bg-[var(--btn-primary)] border border-[var(--btn-primary-border)] ' +
        'hover:opacity-[0.96] active:scale-[0.98] transition-all duration-150 ' +
        'disabled:opacity-50 disabled:pointer-events-none ' +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
}
