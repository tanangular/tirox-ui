export const slotRecipes = {
  button: {
    slots: ['root', 'icon'],
    base: {
      root: {
        alignItems: 'center',
        display: 'inline-flex',
        justifyContent: 'center',
        borderRadius: 'md',
        fontWeight: '600',
        transition: 'background 180ms ease, color 180ms ease',
        _reducedMotion: { transition: 'none' },
      },
      icon: { flexShrink: 0 },
    },
    variants: {
      variant: {
        solid: {
          root: {
            background: 'action.primary',
            color: 'text.inverse',
            _hover: { background: 'action.primaryHover' },
          },
        },
        outline: {
          root: {
            borderWidth: '1px',
            borderColor: 'border.default',
            color: 'text.default',
            _hover: { background: 'surface.subtle' },
          },
        },
        ghost: { root: { color: 'text.default', _hover: { background: 'surface.subtle' } } },
      },
      size: {
        sm: { root: { minHeight: '2rem', paddingInline: '0.75rem', fontSize: '0.875rem' } },
        md: { root: { minHeight: '2.5rem', paddingInline: '1rem', fontSize: '1rem' } },
        lg: { root: { minHeight: '3rem', paddingInline: '1.25rem', fontSize: '1.125rem' } },
      },
    },
    defaultVariants: { variant: 'solid', size: 'md' },
  },
  input: {
    slots: ['root'],
    className: 'tx-input',
    base: {
      root: {
        appearance: 'none',
        borderWidth: '1px',
        borderColor: 'border.default',
        borderRadius: 'md',
        color: 'text.default',
        background: 'surface.default',
        minHeight: '2.5rem',
        paddingInline: '0.75rem',
        transition: 'border-color 180ms ease, box-shadow 180ms ease',
        _reducedMotion: { transition: 'none' },
      },
    },
    variants: {
      invalid: {
        true: { root: { borderColor: 'action.danger' } },
        false: { root: {} },
      },
    },
    defaultVariants: { invalid: 'false' },
  },
  checkbox: {
    slots: ['root', 'control', 'indicator', 'label'],
    className: 'tx-checkbox',
    base: {
      root: { alignItems: 'center', display: 'inline-flex', gap: '0.5rem' },
      control: {
        alignItems: 'center',
        borderWidth: '1px',
        borderColor: 'border.default',
        borderRadius: 'sm',
        display: 'inline-flex',
        height: '1.25rem',
        justifyContent: 'center',
        width: '1.25rem',
      },
      indicator: { color: 'text.inverse', fontSize: '0.875rem' },
      label: { color: 'text.default' },
    },
    variants: { disabled: { true: { root: { opacity: '0.5' } }, false: { root: {} } } },
    defaultVariants: { disabled: 'false' },
  },
  select: {
    slots: ['root', 'trigger', 'content', 'item', 'value'],
    className: 'tx-select',
    base: {
      root: {
        appearance: 'none',
        background: 'surface.default',
        borderWidth: '1px',
        borderColor: 'border.default',
        borderRadius: 'md',
        color: 'text.default',
        minHeight: '2.5rem',
        paddingInline: '0.75rem',
      },
      trigger: { width: '100%' },
      content: { background: 'surface.elevated', color: 'text.default' },
      item: { padding: '0.5rem' },
      value: { color: 'text.default' },
    },
    variants: {
      invalid: { true: { root: { borderColor: 'action.danger' } }, false: { root: {} } },
    },
    defaultVariants: { invalid: 'false' },
  },
  dialog: {
    slots: ['root', 'content', 'title', 'description', 'close'],
    className: 'tx-dialog',
    base: {
      root: {
        borderWidth: '0',
        borderRadius: 'lg',
        background: 'surface.elevated',
        color: 'text.default',
        boxShadow: 'md',
        padding: '1.5rem',
        transition: 'opacity 180ms ease',
        _reducedMotion: { transition: 'none' },
      },
      content: { display: 'grid', gap: '1rem' },
      title: { fontSize: '1.25rem', fontWeight: '600' },
      description: { color: 'text.muted' },
      close: { color: 'text.muted' },
    },
    variants: { state: { open: { root: { opacity: '1' } }, closed: { root: { opacity: '0' } } } },
    defaultVariants: { state: 'closed' },
  },
  tooltip: {
    slots: ['root', 'trigger', 'content', 'arrow'],
    className: 'tx-tooltip',
    base: {
      root: { display: 'inline-flex', position: 'relative' },
      trigger: { display: 'inline-flex' },
      content: {
        background: 'gray.12',
        borderRadius: 'sm',
        boxShadow: 'md',
        color: 'gray.1',
        padding: '0.5rem 0.75rem',
        fontSize: '0.875rem',
        transition: 'opacity 120ms ease',
        _reducedMotion: { transition: 'none' },
      },
      arrow: { background: 'gray.12', height: '0.5rem', width: '0.5rem' },
    },
    variants: {
      state: { open: { content: { opacity: '1' } }, closed: { content: { opacity: '0' } } },
    },
    defaultVariants: { state: 'closed' },
  },
} as const;

export type ButtonVariant = keyof typeof slotRecipes.button.variants.variant;
export type ButtonSize = keyof typeof slotRecipes.button.variants.size;
