export declare const primitiveTokens: {
  readonly colors: {
    readonly gray: {
      readonly 1: '#fcfcfd';
      readonly 2: '#f9f9fb';
      readonly 3: '#f0f0f3';
      readonly 4: '#e8e8ec';
      readonly 5: '#e0e1e6';
      readonly 6: '#d9d9e0';
      readonly 7: '#ceced8';
      readonly 8: '#b9b9c8';
      readonly 9: '#8b8d98';
      readonly 10: '#80818b';
      readonly 11: '#62636c';
      readonly 12: '#1f2024';
    };
    readonly blue: {
      readonly 1: '#fbfdff';
      readonly 2: '#f4faff';
      readonly 3: '#e6f4fe';
      readonly 4: '#d5efff';
      readonly 5: '#c2e5ff';
      readonly 6: '#acd8fc';
      readonly 7: '#91c8f6';
      readonly 8: '#74b0ec';
      readonly 9: '#0090ff';
      readonly 10: '#0585e5';
      readonly 11: '#0d74ce';
      readonly 12: '#113264';
    };
    readonly red: {
      readonly 1: '#fffcfc';
      readonly 2: '#fff8f8';
      readonly 3: '#ffebec';
      readonly 4: '#ffdbdc';
      readonly 5: '#ffcdce';
      readonly 6: '#fdbdbe';
      readonly 7: '#f5a9aa';
      readonly 8: '#eb8e90';
      readonly 9: '#e5484d';
      readonly 10: '#dc3e42';
      readonly 11: '#ce2c31';
      readonly 12: '#641723';
    };
  };
  readonly spacing: {
    readonly 1: '0.25rem';
    readonly 2: '0.5rem';
    readonly 3: '0.75rem';
    readonly 4: '1rem';
    readonly 5: '1.25rem';
    readonly 6: '1.5rem';
    readonly 8: '2rem';
    readonly 10: '2.5rem';
  };
  readonly radii: {
    readonly sm: '0.25rem';
    readonly md: '0.5rem';
    readonly lg: '0.75rem';
    readonly full: '9999px';
  };
  readonly shadows: {
    readonly sm: '0 1px 2px rgb(0 0 0 / 0.08)';
    readonly md: '0 4px 12px rgb(0 0 0 / 0.12)';
  };
  readonly motion: {
    readonly fast: '120ms';
    readonly normal: '180ms';
    readonly slow: '260ms';
    readonly ease: 'cubic-bezier(0.2, 0, 0, 1)';
  };
  readonly layers: {
    readonly base: 0;
    readonly dropdown: 1000;
    readonly dialog: 1100;
    readonly toast: 1200;
    readonly tooltip: 1300;
  };
};
export declare const semanticTokens: {
  readonly colors: {
    readonly text: {
      readonly default: '{colors.gray.12}';
      readonly muted: '{colors.gray.11}';
      readonly inverse: '{colors.gray.1}';
    };
    readonly surface: {
      readonly default: '{colors.gray.1}';
      readonly subtle: '{colors.gray.2}';
      readonly elevated: '#ffffff';
    };
    readonly border: {
      readonly default: '{colors.gray.6}';
      readonly strong: '{colors.gray.8}';
    };
    readonly action: {
      readonly primary: '{colors.blue.9}';
      readonly primaryHover: '{colors.blue.10}';
      readonly danger: '{colors.red.9}';
    };
    readonly focus: {
      readonly ring: '{colors.blue.8}';
    };
  };
  readonly shadows: {
    readonly focus: '0 0 0 3px {colors.blue.5}';
  };
};
export declare const themes: {
  readonly light: {
    readonly surface: '{colors.gray.1}';
    readonly text: '{colors.gray.12}';
  };
  readonly dark: {
    readonly surface: '{colors.gray.12}';
    readonly text: '{colors.gray.1}';
  };
};
