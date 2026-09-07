import { cn } from "@/lib/utils";

const baseInput =
  "w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-500/60 transition-colors focus:border-ocean-500 focus:outline-none";

export function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm font-semibold text-ink-700">
        {label}
      </span>
      {children}
      {error ? <span className="mt-1.5 block text-xs text-red-600">{error}</span> : null}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;
  return <input className={cn(baseInput, className)} {...rest} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className, ...rest } = props;
  return <textarea className={cn(baseInput, "min-h-32 resize-y", className)} {...rest} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { className, ...rest } = props;
  return <select className={cn(baseInput, "appearance-none", className)} {...rest} />;
}
