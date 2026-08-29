import type { JSX } from '@solidjs/web';

export interface CheckboxRootProps extends JSX.LabelHTMLAttributes<HTMLLabelElement> {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export type CheckboxPartProps = JSX.HTMLAttributes<HTMLSpanElement>;
