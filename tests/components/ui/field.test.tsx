import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';

describe('Field components', () => {
  it('renders FieldSet', () => {
    const { container } = render(
      <FieldSet>
        <div />
      </FieldSet>,
    );
    expect(
      container.querySelector('[data-slot="field-set"]'),
    ).toBeInTheDocument();
  });

  it('renders FieldLegend', () => {
    const { container } = render(
      <fieldset>
        <FieldLegend>Título</FieldLegend>
      </fieldset>,
    );
    expect(
      container.querySelector('[data-slot="field-legend"]'),
    ).toBeInTheDocument();
  });

  it('renders FieldLegend with label variant', () => {
    const { container } = render(
      <fieldset>
        <FieldLegend variant="label">Título</FieldLegend>
      </fieldset>,
    );
    expect(
      container.querySelector('[data-variant="label"]'),
    ).toBeInTheDocument();
  });

  it('renders FieldGroup', () => {
    const { container } = render(
      <FieldGroup>
        <div />
      </FieldGroup>,
    );
    expect(
      container.querySelector('[data-slot="field-group"]'),
    ).toBeInTheDocument();
  });

  it('renders Field', () => {
    const { container } = render(
      <Field>
        <div />
      </Field>,
    );
    expect(container.querySelector('[data-slot="field"]')).toBeInTheDocument();
  });

  it('renders Field with horizontal orientation', () => {
    const { container } = render(
      <Field orientation="horizontal">
        <div />
      </Field>,
    );
    expect(
      container.querySelector('[data-orientation="horizontal"]'),
    ).toBeInTheDocument();
  });

  it('renders Field with responsive orientation', () => {
    const { container } = render(
      <Field orientation="responsive">
        <div />
      </Field>,
    );
    expect(
      container.querySelector('[data-orientation="responsive"]'),
    ).toBeInTheDocument();
  });

  it('renders FieldContent', () => {
    const { container } = render(
      <FieldContent>
        <div />
      </FieldContent>,
    );
    expect(
      container.querySelector('[data-slot="field-content"]'),
    ).toBeInTheDocument();
  });

  it('renders FieldLabel', () => {
    const { container } = render(<FieldLabel>Correo electrónico</FieldLabel>);
    expect(
      container.querySelector('[data-slot="field-label"]'),
    ).toBeInTheDocument();
  });

  it('renders FieldTitle', () => {
    const { container } = render(<FieldTitle>Título</FieldTitle>);
    expect(
      container.querySelector('[data-slot="field-label"]'),
    ).toBeInTheDocument();
  });

  it('renders FieldDescription', () => {
    const { container } = render(
      <FieldDescription>Descripción</FieldDescription>,
    );
    expect(
      container.querySelector('[data-slot="field-description"]'),
    ).toBeInTheDocument();
  });

  it('renders FieldSeparator', () => {
    const { container } = render(<FieldSeparator />);
    expect(
      container.querySelector('[data-slot="field-separator"]'),
    ).toBeInTheDocument();
  });

  it('renders FieldSeparator with children', () => {
    const { container } = render(<FieldSeparator>O</FieldSeparator>);
    expect(
      container.querySelector('[data-slot="field-separator-content"]'),
    ).toBeInTheDocument();
  });

  describe('FieldError', () => {
    it('renders nothing when no content', () => {
      const { container } = render(<FieldError />);
      expect(
        container.querySelector('[data-slot="field-error"]'),
      ).not.toBeInTheDocument();
    });

    it('renders children when provided', () => {
      render(<FieldError>Error personalizado</FieldError>);
      expect(screen.getByText('Error personalizado')).toBeInTheDocument();
    });

    it('renders nothing when errors array is empty', () => {
      const { container } = render(<FieldError errors={[]} />);
      expect(
        container.querySelector('[data-slot="field-error"]'),
      ).not.toBeInTheDocument();
    });

    it('renders a single error message', () => {
      render(<FieldError errors={[{ message: 'Campo requerido' }]} />);
      expect(screen.getByText('Campo requerido')).toBeInTheDocument();
    });

    it('renders multiple error messages as a list', () => {
      render(
        <FieldError
          errors={[{ message: 'Error 1' }, { message: 'Error 2' }]}
        />,
      );
      expect(screen.getByText('Error 1')).toBeInTheDocument();
      expect(screen.getByText('Error 2')).toBeInTheDocument();
    });

    it('deduplicates repeated error messages', () => {
      render(
        <FieldError
          errors={[
            { message: 'Error repetido' },
            { message: 'Error repetido' },
          ]}
        />,
      );
      expect(screen.getAllByText('Error repetido')).toHaveLength(1);
    });
  });
});
