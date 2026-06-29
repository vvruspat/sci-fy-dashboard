import type { Preview } from '@storybook/react-vite';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'void',
      values: [
        { name: 'void', value: '#030712' },
        { name: 'deep', value: '#050a18' },
        { name: 'panel', value: '#0a1228' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '24px', minWidth: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
