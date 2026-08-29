export declare const slotRecipes: {
  readonly button: {
    readonly slots: readonly ['root', 'icon'];
    readonly base: {
      readonly root: {
        readonly alignItems: 'center';
        readonly display: 'inline-flex';
        readonly justifyContent: 'center';
        readonly borderRadius: 'md';
        readonly fontWeight: '600';
        readonly transition: 'background 180ms ease, color 180ms ease';
      };
      readonly icon: {
        readonly flexShrink: 0;
      };
    };
    readonly variants: {
      readonly variant: {
        readonly solid: {
          readonly root: {
            readonly background: 'action.primary';
            readonly color: 'text.inverse';
            readonly _hover: {
              readonly background: 'action.primaryHover';
            };
          };
        };
        readonly outline: {
          readonly root: {
            readonly borderWidth: '1px';
            readonly borderColor: 'border.default';
            readonly color: 'text.default';
            readonly _hover: {
              readonly background: 'surface.subtle';
            };
          };
        };
        readonly ghost: {
          readonly root: {
            readonly color: 'text.default';
            readonly _hover: {
              readonly background: 'surface.subtle';
            };
          };
        };
      };
      readonly size: {
        readonly sm: {
          readonly root: {
            readonly minHeight: '2rem';
            readonly paddingInline: '0.75rem';
            readonly fontSize: '0.875rem';
          };
        };
        readonly md: {
          readonly root: {
            readonly minHeight: '2.5rem';
            readonly paddingInline: '1rem';
            readonly fontSize: '1rem';
          };
        };
        readonly lg: {
          readonly root: {
            readonly minHeight: '3rem';
            readonly paddingInline: '1.25rem';
            readonly fontSize: '1.125rem';
          };
        };
      };
    };
    readonly defaultVariants: {
      readonly variant: 'solid';
      readonly size: 'md';
    };
  };
};
export type ButtonVariant = keyof typeof slotRecipes.button.variants.variant;
export type ButtonSize = keyof typeof slotRecipes.button.variants.size;
