import { NativeDialog } from './adapters/native/dialog';
export type { DialogPortalProps, DialogRootProps } from './contracts/dialog';

/** Public Dialog contract backed by the Solid 2-compatible native adapter. */
export const Dialog = NativeDialog;
export type DialogProps = import('./contracts/dialog').DialogRootProps;
