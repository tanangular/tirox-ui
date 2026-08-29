import type { JSX } from '@solidjs/web';

export interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}
