import { createComponent, type JSX } from '@solidjs/web';
import {
  children as resolveChildren,
  createContext,
  createMemo,
  createSignal,
  createUniqueId,
  untrack,
  useContext,
} from 'solid-js';
import type { TooltipRootProps } from '../../contracts/tooltip';

interface TooltipContextValue {
  contentId: string;
  open: () => boolean;
  setOpen: (open: boolean) => void;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

function TooltipTree(props: {
  children?: JSX.Element;
  class?: JSX.HTMLAttributes<HTMLDivElement>['class'];
  native: JSX.HTMLAttributes<HTMLDivElement>;
}) {
  const context = useContext(TooltipContext);
  const resolvedChildren = resolveChildren(() => props.children);
  const setOpen = (open: boolean) => context?.setOpen(open);
  return (
    <div
      {...props.native}
      class={props.class}
      data-scope="tooltip"
      data-part="root"
      data-state={context?.open() ? 'open' : 'closed'}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusIn={() => setOpen(true)}
      onFocusOut={() => setOpen(false)}
    >
      {resolvedChildren()}
    </div>
  );
}

function Root(props: TooltipRootProps) {
  const {
    class: className,
    open: _open,
    defaultOpen: _defaultOpen,
    onOpenChange: _onOpenChange,
    onMouseEnter: _onMouseEnter,
    onMouseLeave: _onMouseLeave,
    onFocusIn: _onFocusIn,
    onFocusOut: _onFocusOut,
    ...native
  } = props;
  const contentId = createUniqueId();
  const [uncontrolledOpen, setUncontrolledOpen] = createSignal(
    untrack(() => props.defaultOpen ?? false),
  );
  const isOpen = createMemo(() => props.open ?? uncontrolledOpen());
  const setOpen = (next: boolean) => {
    if (props.open === undefined) setUncontrolledOpen(next);
    props.onOpenChange?.(next);
  };

  return createComponent(TooltipContext, {
    value: { contentId, open: isOpen, setOpen },
    get children() {
      return (
        <TooltipTree class={className} native={native}>
          {props.children}
        </TooltipTree>
      );
    },
  });
}

function Trigger(props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = useContext(TooltipContext);
  const describedBy = props['aria-describedby'] ?? context?.contentId;
  const handleEnter: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
    (props.onMouseEnter as unknown as ((event: MouseEvent) => void) | undefined)?.(event);
    context?.setOpen(true);
  };
  const handleLeave: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
    (props.onMouseLeave as unknown as ((event: MouseEvent) => void) | undefined)?.(event);
    context?.setOpen(false);
  };
  const handleFocus: JSX.EventHandler<HTMLButtonElement, FocusEvent> = (event) => {
    (props.onFocus as unknown as ((event: FocusEvent) => void) | undefined)?.(event);
    context?.setOpen(true);
  };
  const handleBlur: JSX.EventHandler<HTMLButtonElement, FocusEvent> = (event) => {
    (props.onBlur as unknown as ((event: FocusEvent) => void) | undefined)?.(event);
    context?.setOpen(false);
  };
  return (
    <button
      {...props}
      type="button"
      aria-describedby={describedBy}
      data-scope="tooltip"
      data-part="trigger"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}

function Content(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const context = useContext(TooltipContext);
  return (
    <div
      {...props}
      id={context?.contentId ?? props.id ?? createUniqueId()}
      role="tooltip"
      hidden={context ? !context.open() : true}
      data-scope="tooltip"
      data-part="content"
      data-state={context?.open() ? 'open' : 'closed'}
    />
  );
}

function Arrow(props: JSX.HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} aria-hidden="true" data-scope="tooltip" data-part="arrow" />;
}

export const NativeTooltip = Object.assign(Root, { Root, Trigger, Content, Arrow });
