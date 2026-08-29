import { defineConfig } from '@pandacss/dev';
export declare const tiroxPandaConfig: import('@pandacss/dev').Config & {
  name: string;
};
export declare const defineTiroxPandaConfig: (
  config?: Parameters<typeof defineConfig>[0],
) => import('@pandacss/dev').Config & {
  name: string;
};
