import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppointmentManager from '../AppointmentManager';

// Mock any CSS imports if needed
jest.mock('../AppointmentManager.css', () => ({}));

describe('AppointmentManager Component', () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <AppointmentManager />
      </BrowserRouter>
    );
  };

  test('renders appointment manager with header', () => {
    const { asFragment } = renderComponent();
    expect(screen.getByText('My Mentorship Appointments')).toBeInTheDocument();
    expect(screen.getByText('+ New Appointment')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('displays all appointments by default', () => {
    const { asFragment } = renderComponent();
    const appointmentCards = document.querySelectorAll('.appointment-card');
    expect(appointmentCards.length).toBeGreaterThan(0);
    expect(asFragment()).toMatchSnapshot();
  });

  test('filters appointments when filter button is clicked', () => {
    const { asFragment } = renderComponent();
    const upcomingButton = screen.getByText('Upcoming');
    fireEvent.click(upcomingButton);
    
    const statusBadges = document.querySelectorAll('.status-badge');
    const upcomingBadges = Array.from(statusBadges).filter(badge => 
      badge.textContent?.toLowerCase().includes('upcoming')
    );
    expect(upcomingBadges.length).toBeGreaterThan(0);
    expect(asFragment()).toMatchSnapshot();
  });

  test('shows empty state when no appointments match filter', () => {
    const { asFragment } = renderComponent();
    const cancelledButton = screen.getByText('Cancelled');
    fireEvent.click(cancelledButton);
    
    const cancelledAppointments = document.querySelectorAll('.appointment-card.cancelled');
    if (cancelledAppointments.length === 0) {
      expect(screen.getByText(/no appointments found/i)).toBeInTheDocument();
    }
    expect(asFragment()).toMatchSnapshot();
  });

  test('cancels appointment when cancel button is clicked', () => {
    const { asFragment } = renderComponent();
    const cancelButtons = Array.from(document.querySelectorAll('.cancel-btn'))
      .filter(btn => !btn.closest('.filter-controls'));
    
    fireEvent.click(cancelButtons[0]);
    
    const cancelledBadges = document.querySelectorAll('.status-badge.cancelled');
    expect(cancelledBadges.length).toBeGreaterThan(0);
    expect(asFragment()).toMatchSnapshot();
  });

  // Additional snapshot tests for different states
  test('matches snapshot when viewing confirmed appointments', () => {
    const { asFragment } = renderComponent();
    const confirmedButton = screen.getByText('Confirmed');
    fireEvent.click(confirmedButton);
    expect(asFragment()).toMatchSnapshot();
  });

  test('matches snapshot when viewing completed appointments', () => {
    const { asFragment } = renderComponent();
    const completedButton = screen.getByText('Completed');
    fireEvent.click(completedButton);
    expect(asFragment()).toMatchSnapshot();
  });
});