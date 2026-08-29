import { createUniqueId } from 'solid-js';
import type { InputProps } from '../../contracts/input';

export function NativeInput(props: InputProps) {
  const { invalid = false, class: className, id: providedId, ...native } = props;
  const id = providedId ?? createUniqueId();
  return (
    <input
      {...native}
      id={id}
      class={className}
      aria-invalid={invalid ? 'true' : undefined}
      data-state={invalid ? 'invalid' : 'valid'}
      data-scope="input"
      data-part="root"
      data-invalid={invalid ? '' : undefined}
    />
  );
}
