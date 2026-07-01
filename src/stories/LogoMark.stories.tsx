import type { Meta, StoryObj } from '@storybook/react';
import { LogoMark } from '../atoms/typography/LogoMark';

const meta: Meta<typeof LogoMark> = {
  title: 'Atoms/Typography/LogoMark',
  component: LogoMark,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof LogoMark>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 30, height: 30, color: 'var(--teal-300)' }}>
      <LogoMark>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <circle cx="16" cy="16" r="3" fill="currentColor" />
          <line x1="2" y1="16" x2="13" y2="16" stroke="currentColor" strokeWidth="1" />
          <line x1="19" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1" />
        </svg>
      </LogoMark>
    </div>
  ),
};
