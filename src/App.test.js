import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('moves to the signup page when the signup button is clicked', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

  expect(
    screen.getByRole('heading', { name: '회원가입' })
  ).toBeInTheDocument();
});
