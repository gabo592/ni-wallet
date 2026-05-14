import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { ModeToggle } from '@/components/common/mode-toggle';

const mockSetTheme = vi.fn();

vi.mock('next-themes', () => ({
  useTheme: () => ({ setTheme: mockSetTheme }),
}));

describe('ModeToggle', () => {
  beforeEach(() => {
    mockSetTheme.mockClear();
  });

  it('renders the toggle button', () => {
    render(<ModeToggle />);

    expect(screen.getByTestId('mode-toggle')).toBeInTheDocument();
  });

  it('sets light theme when clicking Claro', async () => {
    const user = userEvent.setup();
    render(<ModeToggle />);

    await user.click(screen.getByTestId('mode-toggle'));
    await user.click(screen.getByTestId('mode-toggle-light'));

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('sets dark theme when clicking Oscuro', async () => {
    const user = userEvent.setup();
    render(<ModeToggle />);

    await user.click(screen.getByTestId('mode-toggle'));
    await user.click(screen.getByTestId('mode-toggle-dark'));

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('sets system theme when clicking Sistema', async () => {
    const user = userEvent.setup();
    render(<ModeToggle />);

    await user.click(screen.getByTestId('mode-toggle'));
    await user.click(screen.getByTestId('mode-toggle-system'));

    expect(mockSetTheme).toHaveBeenCalledWith('system');
  });
});
