import type { JSX } from '@solidjs/web';
import { createMemo, createSignal, createUniqueId } from 'solid-js';
import type { CheckboxPartProps, CheckboxRootProps } from '../../contracts/checkbox';

function Root(props: CheckboxRootProps) {
  const {
    children,
    class: className,
    id: providedId,
    checked: _checked,
    defaultChecked: _defaultChecked,
    disabled: _disabled,
    onCheckedChange: _onCheckedChange,
    ...native
  } = props;
  const id = providedId ?? createUniqueId();
  const [uncontrolledChecked, setUncontrolledChecked] = createSignal(props.defaultChecked ?? false);
  const isChecked = createMemo(() => props.checked ?? uncontrolledChecked());

  const handleChange: JSX.EventHandler<HTMLInputElement, Event> = (event) => {
    const next = event.currentTarget.checked;
    if (props.checked === undefined) setUncontrolledChecked(next);
    props.onCheckedChange?.(next);
  };

  return (
    <label
      {...native}
      class={className}
      id={props.id}
      data-scope="checkbox"
      data-part="root"
      data-state={isChecked() ? 'checked' : 'unchecked'}
      data-disabled={props.disabled ? '' : undefined}
    >
      <input
        id={id}
        type="checkbox"
        checked={isChecked()}
        disabled={props.disabled}
        onChange={handleChange}
        data-scope="checkbox"
        data-part="hidden-input"
      />
      {children}
    </label>
  );
}

function Control(props: CheckboxPartProps) {
  return <span {...props} data-scope="checkbox" data-part="control" aria-hidden="true" />;
}

function Indicator(props: CheckboxPartProps) {
  return (
    <span {...props} data-scope="checkbox" data-part="indicator" aria-hidden="true">
      ✓
    </span>
  );
}

function Label(props: JSX.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} data-scope="checkbox" data-part="label" />;
}

function HiddenInput(props: JSX.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} type="checkbox" data-scope="checkbox" data-part="hidden-input" />;
}

export const NativeCheckbox = Object.assign(Root, { Root, Control, Indicator, Label, HiddenInput });
