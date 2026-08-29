import { createComponent, Portal, type JSX } from '@solidjs/web';
import {
  children as resolveChildren,
  createContext,
  createMemo,
  createSignal,
  createUniqueId,
  untrack,
  useContext,
} from 'solid-js';
import type { DialogPortalProps, DialogRootProps } from '../../contracts/dialog';

interface DialogContextValue {
  id: string;
  titleId: string;
  descriptionId: string;
  open: () => boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function DialogTree(props: {
  children?: JSX.Element;
  class?: JSX.HTMLAttributes<HTMLDivElement>['class'];
  native: JSX.HTMLAttributes<HTMLDivElement>;
}) {
  const context = useContext(DialogContext);
  const resolvedChildren = resolveChildren(() => props.children);
  return (
    <div
      {...props.native}
      class={props.class}
      data-scope="dialog"
      data-part="root"
      data-state={context?.open() ? 'open' : 'closed'}
    >
      {resolvedChildren()}
    </div>
  );
}

function Root(props: DialogRootProps) {
  const {
    class: className,
    id: providedId,
    open: _open,
    defaultOpen: _defaultOpen,
    onOpenChange: _onOpenChange,
    ...native
  } = props;
  const id = providedId ?? createUniqueId();
  const [uncontrolledOpen, setUncontrolledOpen] = createSignal(
    untrack(() => props.defaultOpen ?? false),
  );
  const isOpen = createMemo(() => props.open ?? uncontrolledOpen());

  const setOpen = (next: boolean) => {
    if (props.open === undefined) setUncontrolledOpen(next);
    props.onOpenChange?.(next);
  };

  return createComponent(DialogContext, {
    value: {
      id,
      titleId: `${id}-title`,
      descriptionId: `${id}-description`,
      open: isOpen,
      setOpen,
    },
    get children() {
      return (
        <DialogTree class={className} native={native}>
          {props.children}
        </DialogTree>
      );
    },
  });
}

function Trigger(props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = useContext(DialogContext);
  const handleClick: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
    if (props.disabled) return;
    (props.onClick as unknown as ((event: MouseEvent) => void) | undefined)?.(event);
    context?.setOpen(!context.open());
  };
  return (
    <button
      {...props}
      type="button"
      data-scope="dialog"
      data-part="trigger"
      aria-controls={context?.id}
      aria-expanded={context?.open() ? 'true' : 'false'}
      data-disabled={props.disabled ? '' : undefined}
      onClick={handleClick}
    />
  );
}

function Content(props: JSX.DialogHtmlAttributes<HTMLDialogElement>) {
  const context = useContext(DialogContext);
  const handleClose: JSX.EventHandler<HTMLDialogElement, Event> = (event) => {
    (props.onClose as unknown as ((event: Event) => void) | undefined)?.(event);
    context?.setOpen(false);
  };
  return (
    <dialog
      {...props}
      id={context?.id ?? props.id ?? createUniqueId()}
      open={context?.open()}
      aria-labelledby={props['aria-labelledby'] ?? context?.titleId}
      aria-describedby={props['aria-describedby'] ?? context?.descriptionId}
      data-scope="dialog"
      data-part="content"
      data-state={context?.open() ? 'open' : 'closed'}
      onClose={handleClose}
    />
  );
}

function Title(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  const context = useContext(DialogContext);
  return (
    <h2
      {...props}
      id={props.id ?? context?.titleId ?? createUniqueId()}
      data-scope="dialog"
      data-part="title"
    />
  );
}

function Description(props: JSX.HTMLAttributes<HTMLParagraphElement>) {
  const context = useContext(DialogContext);
  return (
    <p
      {...props}
      id={props.id ?? context?.descriptionId ?? createUniqueId()}
      data-scope="dialog"
      data-part="description"
    />
  );
}

function Close(props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = useContext(DialogContext);
  const handleClick: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
    (props.onClick as unknown as ((event: MouseEvent) => void) | undefined)?.(event);
    context?.setOpen(false);
  };
  return (
    <button {...props} type="button" data-scope="dialog" data-part="close" onClick={handleClick} />
  );
}

function PortalPart(props: DialogPortalProps) {
  return createComponent(Portal, {
    ...(props.container ? { mount: props.container } : {}),
    get children() {
      return props.children;
    },
  });
}

export const NativeDialog = Object.assign(Root, {
  Root,
  Trigger,
  Content,
  Title,
  Description,
  Close,
  Portal: PortalPart,
});
