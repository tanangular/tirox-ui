import { NativeTooltip } from './adapters/native/tooltip';
export type { TooltipRootProps } from './contracts/tooltip';

/** Public Tooltip contract backed by the Solid 2-compatible native adapter. */
export const Tooltip = NativeTooltip;
export type TooltipProps = import('./contracts/tooltip').TooltipRootProps;
