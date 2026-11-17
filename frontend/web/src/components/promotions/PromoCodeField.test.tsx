import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import PromoCodeField from './PromoCodeField';

const preview = vi.fn();

describe('PromoCodeField', () => {
  afterEach(() => {
    cleanup();
    preview.mockReset();
  });

  it('applies a code: calls the preview with the trimmed code and reports code + percent', async () => {
    preview.mockResolvedValue({ code: 'NAVIDAD15', percent: 15, discountCents: 1950, totalCents: 11050 });
    const onChange = vi.fn();
    render(<PromoCodeField onPreview={preview} applied={null} discountCents={0} totalCents={13000} onChange={onChange} />);

    fireEvent.change(screen.getByLabelText('Código de promoción'), { target: { value: ' NAVIDAD15 ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Aplicar' }));

    await vi.waitFor(() => expect(onChange).toHaveBeenCalledWith({ code: 'NAVIDAD15', percent: 15 }));
    expect(preview).toHaveBeenCalledWith('NAVIDAD15');
  });

  it('shows the API error inline and keeps no code applied', async () => {
    preview.mockRejectedValue(new Error('Este código no aplica a este libro'));
    const onChange = vi.fn();
    render(<PromoCodeField onPreview={preview} applied={null} discountCents={0} totalCents={13000} onChange={onChange} />);

    fireEvent.change(screen.getByLabelText('Código de promoción'), { target: { value: 'AMOR10' } });
    fireEvent.click(screen.getByRole('button', { name: 'Aplicar' }));

    expect(await screen.findByRole('alert')).toHaveProperty('textContent', 'Este código no aplica a este libro');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('disables Aplicar while the input is empty', () => {
    render(<PromoCodeField onPreview={preview} applied={null} discountCents={0} totalCents={13000} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Aplicar' })).toHaveProperty('disabled', true);
  });

  it('shows the discount line and new total when applied, and Quitar removes it', () => {
    const onChange = vi.fn();
    render(
      <PromoCodeField onPreview={preview} applied={{ code: 'NAVIDAD15', percent: 15 }} discountCents={1950} totalCents={11050} onChange={onChange} />,
    );
    expect(screen.getByText('Descuento (NAVIDAD15)')).toBeTruthy();
    expect(screen.getByText('−S/ 19.50')).toBeTruthy();
    expect(screen.getByText('S/ 110.50')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Quitar' }));
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('hides Quitar when the code is already stored on the order', () => {
    render(
      <PromoCodeField onPreview={preview} applied={{ code: 'NAVIDAD15', percent: 15 }} locked discountCents={1950} totalCents={11050} onChange={vi.fn()} />,
    );
    expect(screen.queryByRole('button', { name: 'Quitar' })).toBeNull();
  });
});
