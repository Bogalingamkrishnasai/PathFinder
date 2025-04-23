import { render, screen, fireEvent } from '@testing-library/react';
import AppointmentScheduler from '../AppointmentScheduler';

// Mock CSS imports
jest.mock('../AppointmentScheduler.css', () => ({}));

describe('AppointmentScheduler Component', () => {
  const mockMentors = [
    { id: '1', name: 'Dr. Sarah Johnson', specialty: 'Programming Fundamentals' },
    { id: '2', name: 'Prof. Mark Williams', specialty: 'Web Development' }
  ];

  const renderComponent = () => {
    return render(<AppointmentScheduler mentors={mockMentors} />);
  };

  test('renders scheduler form', () => {
    const { asFragment } = renderComponent();
    expect(screen.getByText('Schedule Appointment with Mentor')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Mentor:')).toBeInTheDocument();
    expect(screen.getByLabelText('Appointment Date:')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('shows validation errors when submitting empty form', () => {
    const { asFragment } = renderComponent();
    const submitButton = screen.getByText('Schedule Appointment');
    fireEvent.click(submitButton);
    
    // Check for browser-native validation messages
    const mentorSelect = screen.getByLabelText('Select Mentor:');
    const dateInput = screen.getByLabelText('Appointment Date:');
    
    expect(mentorSelect).toBeInvalid();
    expect(dateInput).toBeInvalid();
    expect(asFragment()).toMatchSnapshot();
  });

  test('shows time slots after date is selected', () => {
    const { asFragment } = renderComponent();
    const dateInput = screen.getByLabelText('Appointment Date:');
    fireEvent.change(dateInput, { target: { value: '2024-12-31' } });
    
    expect(screen.getByText('Available Time Slots:')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /AM|PM/ }).length).toBeGreaterThan(0);
    expect(asFragment()).toMatchSnapshot();
  });

  test('shows confirmation after successful submission', () => {
    const { asFragment } = renderComponent();
    
    // Fill out form
    fireEvent.change(screen.getByLabelText('Select Mentor:'), { 
      target: { value: '1' } 
    });
    fireEvent.change(screen.getByLabelText('Appointment Date:'), { 
      target: { value: '2024-12-31' } 
    });
    fireEvent.click(screen.getAllByRole('button', { name: /AM|PM/ })[0]);
    
    // Submit
    fireEvent.click(screen.getByText('Schedule Appointment'));
    
    expect(screen.getByText('Appointment Scheduled Successfully!')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  // Additional snapshots
  test('matches empty form snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  test('matches time slots selection snapshot', () => {
    const { asFragment } = renderComponent();
    fireEvent.change(screen.getByLabelText('Appointment Date:'), { 
      target: { value: '2024-12-31' } 
    });
    expect(asFragment()).toMatchSnapshot();
  });
});