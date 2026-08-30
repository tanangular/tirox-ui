import { render } from '@solidjs/web';
import { Button } from '@tirox-ui/solid/button';
import { button } from '../../styled-system/recipes';

const mountNode = document.querySelector<HTMLElement>('[data-button-demo]');

if (mountNode) {
  render(
    () => <Button class={button({ variant: 'solid', size: 'md' }).root}>Get started</Button>,
    mountNode,
  );
}
