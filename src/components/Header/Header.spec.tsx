import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './Header';

describe('Header Component', () => {
  test('check if head links are in document', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Search Results')).toBeInTheDocument();
    expect(screen.getByText('Fare Information')).toBeInTheDocument();
  });

  test('links navigate to the correct paths', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Search Results').closest('a')).toHaveAttribute('href', '/search-results');
    expect(screen.getByText('Fare Information').closest('a')).toHaveAttribute('href', '/fare-information');
  });
});
