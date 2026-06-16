import React from 'react';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { setupServer } from 'msw/node';
import { handlers } from './src/services/__tests__/mock-handlers';

export const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Global mock for lucide-react icons to keep test files short and DRY
vi.mock('lucide-react', () => {
  const mockIcon = (name: string) => {
    const Component = (props: Record<string, string | number | boolean | undefined>) =>
      React.createElement('div', {
        ...props,
        'data-testid': `icon-${name}`,
      });

    Component.displayName = `${name}IconMock`;

    return Component;
  };

  const icons = [
    'User',
    'Briefcase',
    'Code2',
    'Cpu',
    'GraduationCap',
    'Languages',
    'FolderGit2',
    'ChevronDown',
    'ChevronUp',
    'Link',
    'Wrench',
    'Users',
    'GripVertical',
    'X',
    'XIcon',
    'Edit2',
    'Plus',
    'Trash2',
    'Terminal',
    'Mail',
    'Phone',
    'MapPin',
    'Linkedin',
    'Github',
    'Globe',
    'Check',
    'Info',
    'Calendar',
    'Building2',
    'ExternalLink',
    'Eye',
    'Settings',
    'MessageSquare',
    'TestTube',
    'Webhook',
    'Server',
    'Zap',
    'Download',
    'Send',
    'Rocket',
    'Save',
    'ScrollText',
    'FilePenLine',
    'Loader2',
    'CheckCircle2',
    'AlertCircle',
    'RefreshCw',
  ];

  const mockExports: Record<
    string,
    React.FC<Record<string, string | number | boolean | undefined>>
  > = {};

  for (const icon of icons) {
    mockExports[icon] = mockIcon(icon);
  }

  return mockExports;
});
