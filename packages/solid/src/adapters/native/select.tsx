import type { JSX } from '@solidjs/web';
import { createMemo, createSignal, createUniqueId, untrack } from 'solid-js';
import type { SelectRootProps } from '../../contracts/select';

function Root(props: SelectRootProps) {
  const {
    children,
    class: className,
    id: providedId,
    value: _value,
    defaultValue: _defaultValue,
    onValueChange: _onValueChange,
    onChange: _onChange,
    ...native
  } = props;
  const id = providedId ?? createUniqueId();
  const [uncontrolledValue, setUncontrolledValue] = createSignal(
    untrack(() => props.defaultValue ?? ''),
  );
  const selectedValue = createMemo(() => props.value ?? uncontrolledValue());

  const handleChange: JSX.EventHandler<HTMLSelectElement, Event> = (event) => {
    const next = event.currentTarget.value;
    if (props.value === undefined) setUncontrolledValue(next);
    (props.onChange as unknown as ((event: Event) => void) | undefined)?.(event);
    props.onValueChange?.(next);
  };

  return (
    <select
      {...native}
      id={id}
      class={className}
      value={selectedValue()}
      data-scope="select"
      data-part="root"
      data-value={selectedValue()}
      data-disabled={props.disabled ? '' : undefined}
      onChange={handleChange}
    >
      {children}
    </select>
  );
}

function Trigger(props: JSX.SelectHTMLAttributes<HTMLSelectElement>) {
  return <Root {...props} data-part="trigger" />;
}

function Content(props: JSX.HTMLAttributes<HTMLOptGroupElement>) {
  return <optgroup {...props} data-scope="select" data-part="content" />;
}

function Item(props: JSX.OptionHTMLAttributes<HTMLOptionElement>) {
  return <option {...props} data-scope="select" data-part="item" />;
}

function Value(props: JSX.HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} data-scope="select" data-part="value" />;
}

export const NativeSelect = Object.assign(Root, { Root, Trigger, Content, Item, Value });
