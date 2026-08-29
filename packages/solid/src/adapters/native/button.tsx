import type { ButtonProps } from '../../contracts/button';

export function NativeButton(props: ButtonProps) {
  const {
    variant = 'solid',
    size = 'md',
    loading = false,
    class: className,
    children,
    type = 'button',
    ...native
  } = props;
  return (
    <button
      {...native}
      class={className}
      type={type}
      aria-busy={loading ? 'true' : undefined}
      data-scope="button"
      data-part="root"
      data-variant={variant}
      data-size={size}
      data-state={loading ? 'loading' : props.disabled ? 'disabled' : 'idle'}
      data-disabled={props.disabled ? '' : undefined}
      data-loading={loading ? '' : undefined}
    >
      {children}
    </button>
  );
}
