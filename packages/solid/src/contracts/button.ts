import type { JSX } from '@solidjs/web';
import type { ButtonSize, ButtonVariant } from '@tirox-ui/preset';

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}
