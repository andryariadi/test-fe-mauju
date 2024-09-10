// UpdateUser.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UpdateUser from "../UpdateUser";
import { updateUser } from "src/libs/data";
import useUserStore from "src/libs/storeUser";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import userEvent from "@testing-library/user-event";

// Mock the necessary modules
jest.mock("src/libs/data");
jest.mock("src/libs/storeUser");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("react-hot-toast");

describe("UpdateUser Component", () => {
  const mockUser = {
    id: "1",
    username: "john_doe",
    gender: "male",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    university: "Example University",
    address: { address: "123 Main St" },
    phone: "123-456-7890",
  };

  const mockSetIsOpen = jest.fn();
  const mockInUpdateUser = jest.fn();
  const mockRouter = { refresh: jest.fn() };

  beforeEach(() => {
    useUserStore.mockReturnValue({
      users: [],
      inUpdateUser: jest.fn(),
    });
    useRouter.mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render Update User title", () => {
    render(<UpdateUser user={mockUser} isOpen={true} setIsOpen={mockSetIsOpen} />);

    expect(screen.getByTestId("update-user")).toBeInTheDocument();
  });

  it("should input fields are correctly rendered", () => {
    render(<UpdateUser user={mockUser} isOpen={true} setIsOpen={mockSetIsOpen} />);

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const genderInput = screen.getByPlaceholderText(/gender/i);
    const firstNameInput = screen.getByPlaceholderText(/first name/i);
    const lastNameInput = screen.getByPlaceholderText(/last name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const universityInput = screen.getByPlaceholderText(/place your grow up.../i);
    const addressInput = screen.getByPlaceholderText(/jl.../i);
    const phoneInput = screen.getByPlaceholderText(/phone/i);

    expect(usernameInput).toBeInTheDocument();
    expect(genderInput).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(universityInput).toBeInTheDocument();
    expect(addressInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
  });

  it("should render input fields with default values", () => {
    render(<UpdateUser user={mockUser} isOpen={true} setIsOpen={mockSetIsOpen} />);

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const genderInput = screen.getByPlaceholderText(/gender/i);
    const firstNameInput = screen.getByPlaceholderText(/first name/i);
    const lastNameInput = screen.getByPlaceholderText(/last name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const universityInput = screen.getByPlaceholderText(/place your grow up.../i);
    const addressInput = screen.getByPlaceholderText(/jl.../i);
    const phoneInput = screen.getByPlaceholderText(/phone/i);

    expect(usernameInput).toHaveValue(mockUser.username);
    expect(genderInput).toHaveValue(mockUser.gender);
    expect(firstNameInput).toHaveValue(mockUser.firstName);
    expect(lastNameInput).toHaveValue(mockUser.lastName);
    expect(emailInput).toHaveValue(mockUser.email);
    expect(universityInput).toHaveValue(mockUser.university);
    expect(addressInput).toHaveValue(mockUser.address.address);
    expect(phoneInput).toHaveValue(mockUser.phone);
  });

  it("should render the button update", () => {
    render(<UpdateUser user={mockUser} isOpen={true} setIsOpen={mockSetIsOpen} />);

    const updateBtn = screen.getByRole("button", { name: /update/i });

    expect(updateBtn).toBeInTheDocument();
    expect(updateBtn).not.toBeDisabled();
    expect(updateBtn).toHaveTextContent("Update");
  });

  it("button should be disabled and display 'Updating...' when updating", () => {
    render(<UpdateUser user={mockUser} isOpen={true} setIsOpen={mockSetIsOpen} />);

    const updateBtn = screen.getByRole("button", { name: /update/i });

    expect(updateBtn).not.toBeDisabled();

    fireEvent.submit(screen.getByRole("form"));

    expect(updateBtn).toBeDisabled();
    expect(screen.getByText(/updating\.\.\./i)).toBeInTheDocument();
  });

  it("closes the form and refreshes the router on close button click", () => {
    render(<UpdateUser user={mockUser} isOpen={true} setIsOpen={mockSetIsOpen} />);

    fireEvent.click(screen.getByTestId("close-button"));

    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    expect(mockRouter.refresh).toHaveBeenCalled();
  });

  it("should update user successfully and display success toast", async () => {
    const updatedUser = {
      ...mockUser,
      username: "jane_doe",
      gender: "female",
      firstName: "Jane",
      lastName: "Doe",
      university: "University of Testing",
      address: { address: "123 Test St" },
      phone: "+621234567890",
    };

    updateUser.mockResolvedValue(updatedUser);
    useUserStore.mockReturnValue({
      users: [mockUser],
      inUpdateUser: mockInUpdateUser,
    });

    render(<UpdateUser user={mockUser} isOpen={true} setIsOpen={mockSetIsOpen} />);

    // Update multiple input fields except email using userEvent
    await userEvent.clear(screen.getByPlaceholderText(/username/i));
    await userEvent.type(screen.getByPlaceholderText(/username/i), "jane_doe");

    await userEvent.clear(screen.getByPlaceholderText(/gender/i));
    await userEvent.type(screen.getByPlaceholderText(/gender/i), "female");

    await userEvent.clear(screen.getByPlaceholderText(/first name/i));
    await userEvent.type(screen.getByPlaceholderText(/first name/i), "Jane");

    await userEvent.clear(screen.getByPlaceholderText(/last name/i));
    await userEvent.type(screen.getByPlaceholderText(/last name/i), "Doe");

    await userEvent.clear(screen.getByPlaceholderText("Place your grow up..."));
    await userEvent.type(screen.getByPlaceholderText("Place your grow up..."), "University of Testing");

    await userEvent.clear(screen.getByPlaceholderText(/jl.../i));
    await userEvent.type(screen.getByPlaceholderText(/jl.../i), "123 Test St");

    await userEvent.clear(screen.getByPlaceholderText(/phone/i));
    await userEvent.type(screen.getByPlaceholderText(/phone/i), "+621234567890");

    // Click the update button
    const submitButton = screen.getByRole("button", { name: /update/i });

    expect(submitButton).not.toBeDisabled();

    fireEvent.submit(screen.getByRole("form"));

    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/updating\.\.\./i)).toBeInTheDocument();

    // Wait for the updateUser function to be called
    await waitFor(() => {
      expect(updateUser).toHaveBeenCalledWith({
        id: mockUser.id,
        username: "jane_doe",
        gender: "female",
        firstName: "Jane",
        lastName: "Doe",
        email: mockUser.email, // Ensure email is unchanged
        university: "University of Testing",
        address: { address: "123 Test St" },
        phone: "+621234567890",
      });
    });

    // Verify success toast and store update
    expect(toast.success).toHaveBeenCalledWith("User updated successfully!");
    expect(mockInUpdateUser).toHaveBeenCalledWith(updatedUser);
  }); // Jika menggunakan userEvent

  //   it("should update user successfully and display success toast", async () => {
  //     const updatedUser = {
  //       ...mockUser,
  //       username: "jane_doe",
  //       gender: "female",
  //       firstName: "Jane",
  //       lastName: "Doe",
  //       university: "University of Testing",
  //       address: { address: "123 Test St" },
  //       phone: "+621234567890",
  //     };
  //     updateUser.mockResolvedValue(updatedUser);

  //     render(<UpdateUser user={mockUser} isOpen={true} setIsOpen={mockSetIsOpen} />);

  //     // Update multiple input fields except email
  //     fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: "jane_doe" } });
  //     fireEvent.change(screen.getByPlaceholderText(/gender/i), { target: { value: "female" } });
  //     fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: "Jane" } });
  //     fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: "Doe" } });
  //     fireEvent.change(screen.getByPlaceholderText("Place your grow up..."), { target: { value: "University of Testing" } });
  //     fireEvent.change(screen.getByPlaceholderText(/jl.../i), { target: { value: "123 Test St" } });
  //     fireEvent.change(screen.getByPlaceholderText(/phone/i), { target: { value: "+621234567890" } });

  //     // Click the update button
  //     const submitButton = screen.getByRole("button", { name: /update/i });

  //     expect(submitButton).not.toBeDisabled();

  //     fireEvent.submit(screen.getByRole("form"));

  //     expect(submitButton).toBeDisabled();
  //     expect(screen.getByText(/updating\.\.\./i)).toBeInTheDocument();

  //     // Wait for the updateUser function to be called
  //     await waitFor(() => {
  //       expect(updateUser).toHaveBeenCalledWith({
  //         id: mockUser.id,
  //         username: "jane_doe",
  //         gender: "female",
  //         firstName: "Jane",
  //         lastName: "Doe",
  //         email: mockUser.email, // Ensure email is unchanged
  //         university: "University of Testing",
  //         address: { address: "123 Test St" },
  //         phone: "+621234567890",
  //       });
  //     });

  //     // Verify success toast and store update
  //     expect(toast.success).toHaveBeenCalledWith("User updated successfully!");
  //     expect(useUserStore().inUpdateUser).toHaveBeenCalledWith(updatedUser);
  //   }); // Jika menggunakan fireEvent
});
