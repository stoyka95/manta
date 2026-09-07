import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold-500 text-ink-900 hover:bg-gold-600 shadow-soft hover:shadow-lift",
  secondary:
    "bg-ink-900 text-white hover:bg-ocean-900 shadow-soft hover:shadow-lift",
  outline:
    "bg-white/70 text-ink-900 border border-ink-900/15 hover:border-ocean-600 hover:text-ocean-700 backdrop-blur-sm",
  ghost: "bg-transparent text-ink-900 hover:bg-ocean-100",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: never;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const cls = cn(
    "group inline-flex flex-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-display font-semibold transition-all duration-200 ease-out active:scale-[0.97]",
    variants[variant],
    sizes[size],
    className
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={cls}>
        {children}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- strip non-DOM props before spreading onto <button>
  const { href: _href, variant: _variant, size: _size, className: _className, children: _children, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
