import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from './App';
import { AuthProvider } from './auth/AuthContext';

describe('main player flow', () => {
  beforeEach(() => localStorage.clear());

  it('lets a player sign in, choose a grid and start playing', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'Loic' } });
    fireEvent.click(screen.getByRole('button', { name: 'Enter the game' }));

    expect(await screen.findByRole('heading', { name: 'Choose your grid' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: /Warm-up.*3 × 3.*9 bits/i }));

    expect(await screen.findByRole('heading', { name: '3 × 3' })).toBeInTheDocument();
    expect(screen.getAllByRole('gridcell')).toHaveLength(9);
    expect(screen.getByText('In progress')).toBeInTheDocument();
  });
});
