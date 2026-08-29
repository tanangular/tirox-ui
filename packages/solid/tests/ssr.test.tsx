// @vitest-environment node
import { renderToString } from '@solidjs/web';
import { describe, expect, it } from 'vitest';
import { Button } from '../src/button';
import { Input } from '../src/input';
import { Checkbox } from '../src/checkbox';
import { Select } from '../src/select';
import { Dialog } from '../src/dialog';
import { Tooltip } from '../src/tooltip';

describe('SSR contract', () => {
  it('renders deterministic semantic markup without browser globals', () => {
    const html = renderToString(() => (
      <>
        <Button>Save</Button>
        <Input aria-label="Email" />
        <Checkbox.Root defaultChecked aria-label="Accept terms" />
        <Select.Root defaultValue="th" aria-label="Country">
          <Select.Item value="th">Thailand</Select.Item>
        </Select.Root>
        <Dialog.Root defaultOpen>
          <Dialog.Portal>
            <Dialog.Content>
              <Dialog.Title>Preferences</Dialog.Title>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <Tooltip.Root defaultOpen>
          <Tooltip.Trigger>Help</Tooltip.Trigger>
          <Tooltip.Content>Helpful information</Tooltip.Content>
        </Tooltip.Root>
      </>
    ));
    expect(html).toContain('data-scope="button"');
    expect(html).toContain('data-scope="input"');
    expect(html).toContain('data-scope="checkbox"');
    expect(html).toContain('data-state="checked"');
    expect(html).toContain('data-scope="select"');
    expect(html).toContain('data-value="th"');
    expect(html).toContain('data-scope="dialog"');
    expect(html).toContain('data-scope="tooltip"');
    expect(html).toMatch(/id="(?:cl-)?\d/);
  });
});
