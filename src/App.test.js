import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app header and main content', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Reverb', level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('main')).toBeInTheDocument();
});
