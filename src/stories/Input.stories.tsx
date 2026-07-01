import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../atoms/form/Input';
import { Search, Server, Lock } from 'lucide-react';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = { args: { placeholder: 'Enter hostname...' } };
export const WithLabel: Story = { args: { label: 'Node ID', placeholder: 'e.g. COMPUTE-01' } };
export const WithIcon: Story = { args: { placeholder: 'Search nodes, services...', icon: <Search size={14} /> } };
export const WithError: Story = { args: { label: 'IP Address', placeholder: '10.0.0.1', value: '999.x.x.x', error: 'Invalid IPv4 address format', readOnly: true } };
export const WithHint: Story = { args: { label: 'SSH Port', placeholder: '22', hint: 'Default: 22 for SSH, 443 for HTTPS' } };

export const Form: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '300px' }}>
      <Input label="Node Name" placeholder="COMPUTE-01" icon={<Server size={14} />} />
      <Input label="IP Address" placeholder="10.0.1.100" hint="Must be in the 10.0.0.0/8 subnet" />
      <Input label="Password" placeholder="••••••••" type="password" icon={<Lock size={14} />} />
      <Input label="Search" placeholder="Filter by tag, status..." icon={<Search size={14} />} />
    </div>
  ),
};
