import type { JSX } from '@solidjs/web';

export interface SelectRootProps extends JSX.SelectHTMLAttributes<HTMLSelectElement> {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}
