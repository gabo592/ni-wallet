import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Separator } from '@/components/ui/separator';

describe('Separator', () => {
  it('renders a horizontal separator by default', () => {
    const { container } = render(<Separator />);

    const separator = container.querySelector('[data-slot="separator"]');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('renders a vertical separator', () => {
    const { container } = render(<Separator orientation="vertical" />);

    const separator = container.querySelector('[data-slot="separator"]');
    expect(separator).toHaveAttribute('data-orientation', 'vertical');
  });
});
