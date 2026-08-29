import type { JSX } from '@solidjs/web';

export interface DialogRootProps extends JSX.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  id?: string;
  children?: JSX.Element;
}

export interface DialogPortalProps {
  container?: HTMLElement | SVGElement;
  children?: JSX.Element;
}
