import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../atoms/layout/Box';

const meta: Meta<typeof Box> = {
  title: 'Atoms/Layout/Box',
  component: Box,
  tags: ['autodocs'],
  argTypes: {
    display: { control: 'select', options: ['flex', 'inline-flex', 'grid', 'block', 'none'] },
    direction: { control: 'select', options: ['row', 'row-reverse', 'column', 'column-reverse'] },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch', 'baseline'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'between', 'around', 'evenly'] },
  },
};
export default meta;
type Story = StoryObj<typeof Box>;

const swatch = (label: string, color: string) => (
  <div
    key={label}
    style={{
      width: 60,
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: color,
      color: 'white',
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
    }}
  >
    {label}
  </div>
);

export const FlexRow: Story = {
  args: {
    display: 'flex',
    gap: 12,
    padding: 16,
    children: [swatch('A', 'var(--teal-700)'), swatch('B', 'var(--teal-600)'), swatch('C', 'var(--teal-500)')],
  },
};

export const FlexColumn: Story = {
  args: {
    display: 'flex',
    direction: 'column',
    gap: 8,
    padding: 16,
    children: [swatch('A', 'var(--teal-700)'), swatch('B', 'var(--teal-600)'), swatch('C', 'var(--teal-500)')],
  },
};

export const SpaceBetween: Story = {
  args: {
    display: 'flex',
    justify: 'between',
    align: 'center',
    padding: 16,
    style: { width: 320 },
    children: [swatch('Left', 'var(--teal-700)'), swatch('Right', 'var(--red-500)')],
  },
};

export const PaddingAndPosition: Story = {
  render: () => (
    <Box position="relative" width={220} height={120} style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-dim)' }}>
      <Box position="absolute" top={8} right={8}>
        {swatch('abs', 'var(--red-500)')}
      </Box>
      <Box padding={16}>{swatch('padded', 'var(--teal-600)')}</Box>
    </Box>
  ),
};
