import { NativeCheckbox } from './adapters/native/checkbox';
export type { CheckboxPartProps, CheckboxRootProps } from './contracts/checkbox';

/**
 * Public Checkbox contract. The behavior implementation is intentionally
 * replaceable; native is the Solid 2-compatible adapter until Ark supports it.
 */
export const Checkbox = NativeCheckbox;
export type CheckboxProps = import('./contracts/checkbox').CheckboxRootProps;
