import { render } from '@testing-library/react';
import App from './App';

test('default', () => {
  render(<App />);
  expect(true).toBe(true);
});
