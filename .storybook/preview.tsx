import type { Preview } from '@storybook/react-vite';
import '../src/index.css';
import theme from './theme';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'void',
      values: [
        { name: 'void', value: 'hsl(185, 88%, 3%)' },
        { name: 'deep', value: 'hsl(185, 88%, 4.5%)' },
        { name: 'panel', value: 'hsl(185, 82%, 6%)' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    docs: {
      theme,
    },
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
