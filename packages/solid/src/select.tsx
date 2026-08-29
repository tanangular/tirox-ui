import { NativeSelect } from './adapters/native/select';
export type { SelectRootProps } from './contracts/select';

/** Public Select contract backed by the Solid 2-compatible native adapter. */
export const Select = NativeSelect;
export type SelectProps = import('./contracts/select').SelectRootProps;
