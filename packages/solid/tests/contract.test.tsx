import { describe, expect, it } from 'vitest';
import { fireEvent, render } from '@solidjs/testing-library';
import { createSignal, flush } from 'solid-js';
import { Button } from '../src/button';
import { Input } from '../src/input';
import { Checkbox } from '../src/checkbox';
import { Select } from '../src/select';
import { Dialog } from '../src/dialog';
import { Tooltip } from '../src/tooltip';
import {
  createSanitizedCanvasAsset,
  createSanitizedSvg,
  isSafeUrl,
  serializeHydrationState,
} from '../src/security';

describe('core safety contract', () => {
  it('allows safe protocols and rejects executable protocols', () => {
    expect(isSafeUrl('https://example.com')).toBe(true);
    expect(isSafeUrl('javascript:alert(1)')).toBe(false);
    expect(isSafeUrl('data:text/html,pwned')).toBe(false);
  });

  it('requires sanitized SVG and canvas asset boundaries', () => {
    expect(createSanitizedSvg('<svg><path /></svg>', (value) => value)).toContain('<svg>');
    expect(() =>
      createSanitizedSvg('<svg><script>alert(1)</script></svg>', (value) => value),
    ).toThrow();
    expect(
      createSanitizedCanvasAsset(
        { src: 'https://cdn.example.test/icon.png', type: 'image' },
        (asset) => asset,
      ).src,
    ).toBe('https://cdn.example.test/icon.png');
    expect(() =>
      createSanitizedCanvasAsset({ src: 'javascript:alert(1)', type: 'image' }, (asset) => asset),
    ).toThrow();
  });

  it('serializes only allowlisted, non-secret hydration state safely', () => {
    const payload = serializeHydrationState(
      {
        theme: 'dark',
        open: true,
        token: 'must-not-ship',
        label: '</script><script>alert(1)</script>',
      },
      ['theme', 'open', 'token', 'label'],
    );
    expect(payload).toContain('"theme":"dark"');
    expect(payload).toContain('"open":true');
    expect(payload).not.toContain('must-not-ship');
    expect(payload).not.toContain('<script>');
    expect(() =>
      serializeHydrationState({ preferences: { authorization: 'Bearer secret' } }, ['preferences']),
    ).toThrow();
  });
});

describe('Button contract', () => {
  it('renders semantic state attributes and native button behavior', () => {
    const { getByRole } = render(() => <Button loading>Save</Button>);
    const button = getByRole('button', { name: 'Save' });
    expect(button.getAttribute('type')).toBe('button');
    expect(button.getAttribute('data-variant')).toBe('solid');
    expect(button.getAttribute('data-size')).toBe('md');
    expect(button.getAttribute('data-state')).toBe('loading');
    expect(button.hasAttribute('data-loading')).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
  });

  it('exposes disabled state while preserving native button behavior', () => {
    const { getByRole } = render(() => <Button disabled>Save</Button>);
    const button = getByRole('button', { name: 'Save' });
    expect((button as HTMLButtonElement).disabled).toBe(true);
    expect(button.getAttribute('data-state')).toBe('disabled');
    expect(button.getAttribute('data-disabled')).toBe('');
  });
});

describe('Input contract', () => {
  it('provides deterministic ids and explicit invalid semantics', () => {
    const { getByRole } = render(() => <Input aria-label="Email" invalid />);
    const input = getByRole('textbox', { name: 'Email' });
    expect(input.id).toMatch(/^cl-/);
    expect(input.getAttribute('data-scope')).toBe('input');
    expect(input.getAttribute('data-state')).toBe('invalid');
    expect(input.hasAttribute('data-invalid')).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('preserves an explicit consumer id', () => {
    const { getByRole } = render(() => <Input id="account-email" aria-label="Email" />);
    expect(getByRole('textbox', { name: 'Email' }).id).toBe('account-email');
  });

  it('exposes disabled state while preserving native input behavior', () => {
    const { getByRole } = render(() => <Input aria-label="Email" disabled />);
    const input = getByRole('textbox', { name: 'Email' });
    expect((input as HTMLInputElement).disabled).toBe(true);
    expect(input.getAttribute('data-state')).toBe('disabled');
    expect(input.getAttribute('data-disabled')).toBe('');
  });
});

describe('Checkbox contract', () => {
  it('exposes a compound namespace and native checkbox semantics', () => {
    expect(Checkbox.Root).toBeTypeOf('function');
    expect(Checkbox.Control).toBeTypeOf('function');
    expect(Checkbox.Indicator).toBeTypeOf('function');
    const { getByRole } = render(() => (
      <Checkbox.Root aria-label="Accept terms" defaultChecked>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
      </Checkbox.Root>
    ));
    const checkbox = getByRole('checkbox', { name: 'Accept terms' });
    expect((checkbox as HTMLInputElement).checked).toBe(true);
    expect(checkbox.getAttribute('data-part')).toBe('hidden-input');
  });

  it('keeps controlled state and semantic data-state reactive', () => {
    const [checked, setChecked] = createSignal(false);
    const changes: boolean[] = [];
    const view = render(() => (
      <Checkbox.Root
        aria-label="Accept terms"
        checked={checked()}
        onCheckedChange={(next) => {
          changes.push(next);
          setChecked(next);
        }}
      />
    ));
    const checkbox = view.getByRole('checkbox', { name: 'Accept terms' });
    expect(checkbox.parentElement?.getAttribute('data-state')).toBe('unchecked');

    fireEvent.click(checkbox);
    flush();

    expect(changes).toEqual([true]);
    expect((checkbox as HTMLInputElement).checked).toBe(true);
    expect(checkbox.parentElement?.getAttribute('data-state')).toBe('checked');
  });

  it('exposes disabled state while preserving the hidden native input', () => {
    const { getByRole } = render(() => (
      <Checkbox.Root aria-label="Accept terms" disabled>
        <Checkbox.Control />
      </Checkbox.Root>
    ));
    const checkbox = getByRole('checkbox', { name: 'Accept terms' });
    expect((checkbox as HTMLInputElement).disabled).toBe(true);
    expect(checkbox.parentElement?.getAttribute('data-disabled')).toBe('');
  });
});

describe('Select contract', () => {
  it('exposes a namespace and forwards native value changes', () => {
    expect(Select.Root).toBeTypeOf('function');
    expect(Select.Trigger).toBeTypeOf('function');
    let selected = '';
    const { getByRole } = render(() => (
      <Select.Root
        aria-label="Country"
        defaultValue="th"
        onValueChange={(value) => {
          selected = value;
        }}
      >
        <Select.Item value="th">Thailand</Select.Item>
        <Select.Item value="jp">Japan</Select.Item>
      </Select.Root>
    ));
    const select = getByRole('combobox', { name: 'Country' }) as HTMLSelectElement;
    expect(select.id).toMatch(/^cl-/);
    expect(select.value).toBe('th');
    select.value = 'jp';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    expect(selected).toBe('jp');
    expect(select.getAttribute('data-scope')).toBe('select');
  });

  it('keeps a controlled value reactive after the consumer updates it', () => {
    const [value, setValue] = createSignal('th');
    const view = render(() => (
      <Select.Root aria-label="Country" value={value()} onValueChange={setValue}>
        <Select.Item value="th">Thailand</Select.Item>
        <Select.Item value="jp">Japan</Select.Item>
      </Select.Root>
    ));
    const select = view.getByRole('combobox', { name: 'Country' }) as HTMLSelectElement;

    setValue('jp');
    flush();

    expect(select.value).toBe('jp');
    expect(select.getAttribute('data-value')).toBe('jp');
  });

  it('exposes disabled state without replacing native select semantics', () => {
    const { getByRole } = render(() => (
      <Select.Root aria-label="Country" disabled>
        <Select.Item value="th">Thailand</Select.Item>
      </Select.Root>
    ));
    const select = getByRole('combobox', { name: 'Country' });
    expect((select as HTMLSelectElement).disabled).toBe(true);
    expect(select.getAttribute('data-disabled')).toBe('');
  });
});

describe('Dialog contract', () => {
  it('exposes compound parts and deterministic native dialog semantics', () => {
    expect(Dialog.Root).toBeTypeOf('function');
    expect(Dialog.Content).toBeTypeOf('function');
    expect(Dialog.Portal).toBeTypeOf('function');
    const { getByRole } = render(() => (
      <Dialog.Root defaultOpen>
        <Dialog.Content>
          <Dialog.Title>Preferences</Dialog.Title>
          <Dialog.Description>Update settings</Dialog.Description>
          <Dialog.Close>Close</Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    ));
    const dialog = getByRole('dialog');
    expect(dialog.id).toMatch(/^cl-/);
    expect(dialog.hasAttribute('open')).toBe(true);
    expect(dialog.getAttribute('data-state')).toBe('open');
    expect(dialog.getAttribute('aria-labelledby')).toBe(`${dialog.id}-title`);
    expect(dialog.getAttribute('aria-describedby')).toBe(`${dialog.id}-description`);
    expect(getByRole('heading', { name: 'Preferences' })).toBeTruthy();
  });

  it('supports a typed portal container override', () => {
    const container = document.createElement('section');
    document.body.append(container);
    render(() => (
      <Dialog.Root defaultOpen>
        <Dialog.Portal container={container}>
          <Dialog.Content>
            <Dialog.Title>Portal preferences</Dialog.Title>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    ));
    expect(container.querySelector('[data-part="content"]')).toBeTruthy();
    container.remove();
  });

  it('preserves an explicit root id for content and ARIA relationships', () => {
    const { getByRole } = render(() => (
      <Dialog.Root id="settings-dialog" defaultOpen>
        <Dialog.Content>
          <Dialog.Title>Settings</Dialog.Title>
          <Dialog.Description>Manage settings</Dialog.Description>
        </Dialog.Content>
      </Dialog.Root>
    ));
    const dialog = getByRole('dialog');
    expect(dialog.id).toBe('settings-dialog');
    expect(dialog.getAttribute('aria-labelledby')).toBe('settings-dialog-title');
    expect(dialog.getAttribute('aria-describedby')).toBe('settings-dialog-description');
  });

  it('connects trigger and close parts to uncontrolled open state', () => {
    const view = render(() => (
      <Dialog.Root>
        <Dialog.Trigger>Open preferences</Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Preferences</Dialog.Title>
          <Dialog.Close>Close</Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    ));

    fireEvent.click(view.getByRole('button', { name: 'Open preferences' }));
    flush();
    const dialog = view.getByRole('dialog');
    expect(dialog.getAttribute('data-state')).toBe('open');

    fireEvent.click(view.getByRole('button', { name: 'Close' }));
    flush();
    expect(dialog.getAttribute('data-state')).toBe('closed');
  });

  it('does not open from a disabled trigger', () => {
    const view = render(() => (
      <Dialog.Root>
        <Dialog.Trigger disabled>Open preferences</Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Preferences</Dialog.Title>
        </Dialog.Content>
      </Dialog.Root>
    ));
    const trigger = view.getByRole('button', { name: 'Open preferences' });
    fireEvent.click(trigger);
    flush();
    expect(trigger.getAttribute('data-disabled')).toBe('');
    expect(view.getByRole('dialog', { hidden: true }).hasAttribute('open')).toBe(false);
  });
});

describe('Tooltip contract', () => {
  it('exposes compound parts and tooltip semantics', () => {
    expect(Tooltip.Root).toBeTypeOf('function');
    expect(Tooltip.Content).toBeTypeOf('function');
    const { getByRole } = render(() => (
      <Tooltip.Root defaultOpen>
        <Tooltip.Trigger>Help</Tooltip.Trigger>
        <Tooltip.Content>Helpful information</Tooltip.Content>
      </Tooltip.Root>
    ));
    expect(getByRole('button', { name: 'Help' }).getAttribute('aria-describedby')).toBeTruthy();
    expect(getByRole('tooltip', { name: 'Helpful information' })).toBeTruthy();
  });

  it('opens from pointer interaction and links trigger to content', () => {
    const view = render(() => (
      <Tooltip.Root>
        <Tooltip.Trigger>Help</Tooltip.Trigger>
        <Tooltip.Content>Helpful information</Tooltip.Content>
      </Tooltip.Root>
    ));
    const trigger = view.getByRole('button', { name: 'Help' });
    const content = view.getByRole('tooltip', { hidden: true });

    expect(content.hasAttribute('hidden')).toBe(true);
    fireEvent.mouseEnter(trigger);
    flush();

    expect(trigger.getAttribute('aria-describedby')).toBe(content.id);
    expect(content.hasAttribute('hidden')).toBe(false);
    expect(content.getAttribute('data-state')).toBe('open');
    expect(view.getByRole('tooltip', { name: 'Helpful information' })).toBe(content);
  });

  it('does not open from pointer interaction when the trigger is disabled', () => {
    const view = render(() => (
      <Tooltip.Root>
        <Tooltip.Trigger disabled>Help</Tooltip.Trigger>
        <Tooltip.Content>Helpful information</Tooltip.Content>
      </Tooltip.Root>
    ));
    const trigger = view.getByRole('button', { name: 'Help' });
    fireEvent.mouseEnter(trigger);
    flush();
    expect(trigger.getAttribute('data-disabled')).toBe('');
    expect(view.getByRole('tooltip', { hidden: true }).hasAttribute('hidden')).toBe(true);
  });
});
