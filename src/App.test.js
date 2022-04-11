import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const MockApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

test('renders learn react link', () => {
  render(<MockApp />);
  const heading = screen.getByText(/React Take-home Assignment/i);
  expect(heading).toBeInTheDocument();
});
