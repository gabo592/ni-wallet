import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Textarea } from '@/components/ui/textarea';

describe('Textarea', () => {
  it('renders a textarea element', () => {
    render(<Textarea placeholder="Escribe algo..." />);

    expect(screen.getByPlaceholderText('Escribe algo...')).toBeInTheDocument();
  });
});
