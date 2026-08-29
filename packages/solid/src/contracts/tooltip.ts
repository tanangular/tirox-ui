import type { JSX } from '@solidjs/web';

export interface TooltipRootProps extends JSX.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: JSX.Element;
}
