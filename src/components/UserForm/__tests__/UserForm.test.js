import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserForm from "../UserForm";
import useUserStore from "src/libs/storeUser";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";
import { createUser } from "src/libs/data";
import toast from "react-hot-toast";

// Mock the modules
jest.mock("src/libs/data", () => ({
  createUser: jest.fn(),
}));

jest.mock("src/libs/storeUser", () => {
  const actualStoreUser = jest.requireActual("src/libs/storeUser");
  return {
    __esModule: true,
    ...actualStoreUser,
    default: jest.fn(),
  };
});

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("src/libs/storeUser");

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe("UserForm", () => {
  const setIsOpen = jest.fn();
  const addUser = jest.fn();
  const mockRouter = { refresh: jest.fn() };

  beforeEach(() => {
    useUserStore.mockReturnValue({ addUser });
    useRouter.mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the UserForm component", () => {
    render(<UserForm isOpen={true} setIsOpen={setIsOpen} />);
    expect(screen.getByTestId("add-user")).toBeInTheDocument();
  });

  it("input fields are correctly rendered", () => {
    render(<UserForm isOpen={true} setIsOpen={setIsOpen} />);

    const usernameInput = screen.getByPlaceholderText(/john doe/i);
    const genderInput = screen.getByPlaceholderText(/cwk/i);
    const emailInput = screen.getByPlaceholderText(/email@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const addressInput = screen.getByTestId(/address/i);
    const phoneInput = screen.getByTestId(/phone/i);

    expect(usernameInput).toBeInTheDocument();
    expect(genderInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(addressInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
  });

  it("input fields should be empty", () => {
    render(<UserForm isOpen={true} setIsOpen={setIsOpen} />);

    const usernameInput = screen.getByPlaceholderText(/john doe/i);
    const genderInput = screen.getByPlaceholderText(/cwk/i);
    const emailInput = screen.getByPlaceholderText(/email@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const addressInput = screen.getByTestId(/address/i);
    const phoneInput = screen.getByTestId(/phone/i);

    expect(usernameInput.value).toBe("");
    expect(genderInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
    expect(addressInput.value).toBe("");
    expect(phoneInput.value).toBe("");
  });

  it("toggles password visibility", () => {
    render(<UserForm isOpen={true} setIsOpen={setIsOpen} />);

    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const toggleButton = screen.getByRole("button", { name: "" });

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("errors messages should not be visible", () => {
    render(<UserForm isOpen={true} setIsOpen={setIsOpen} />);

    const usernameError = screen.queryByTestId("username-error");
    const genderError = screen.queryByTestId("gender-error");
    const emailError = screen.queryByTestId("email-error");
    const passwordError = screen.queryByTestId("password-error");
    const addressError = screen.queryByTestId("address-error");
    const phoneError = screen.queryByTestId("phone-error");

    expect(usernameError).not.toBeInTheDocument();
    expect(genderError).not.toBeInTheDocument();
    expect(emailError).not.toBeInTheDocument();
    expect(passwordError).not.toBeInTheDocument();
    expect(addressError).not.toBeInTheDocument();
    expect(phoneError).not.toBeInTheDocument();
  });

  it("erros messages should be visible after submitting an empty form", async () => {
    render(<UserForm isOpen={true} setIsOpen={setIsOpen} />);

    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByTestId("username-error")).toBeInTheDocument();
      expect(screen.getByTestId("gender-error")).toBeInTheDocument();
      expect(screen.getByTestId("email-error")).toBeInTheDocument();
      expect(screen.getByTestId("password-error")).toBeInTheDocument();
      expect(screen.getByTestId("address-error")).toBeInTheDocument();
      expect(screen.getByTestId("phone-error")).toBeInTheDocument();
    });

    // await userEvent.click(submitButton);
    // expect(screen.getByTestId("username-error")).toBeInTheDocument();
    // expect(screen.getByTestId("gender-error")).toBeInTheDocument();
    // expect(screen.getByTestId("email-error")).toBeInTheDocument();
    // expect(screen.getByTestId("password-error")).toBeInTheDocument();
    // expect(screen.getByTestId("address-error")).toBeInTheDocument();
    // expect(screen.getByTestId("phone-error")).toBeInTheDocument();
  });

  it("button submit is correctly rendered", () => {
    render(<UserForm isOpen={true} setIsOpen={setIsOpen} />);

    const submitButton = screen.getByRole("button", { name: /submit/i });

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
    expect(submitButton).toHaveTextContent("Submit");
  });

  it("button should be disabled and display 'Submitting...' when submitting", async () => {
    render(<UserForm isOpen={true} setIsOpen={jest.fn()} />);

    const submitButton = screen.getByRole("button", { name: /submit/i });

    expect(submitButton).not.toBeDisabled();

    fireEvent.submit(screen.getByRole("form"));

    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/submitting\.\.\./i)).toBeInTheDocument();
  });

  // it('button should be disabled and display "Submitting..." when submitting', async () => {
  //   createUser.mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve({ id: 1 }), 1000)));
  //   useUserStore.mockReturnValue({
  //     addUser: jest.fn(),
  //   });

  //   render(<UserForm isOpen={true} setIsOpen={setIsOpen} />);

  //   // Find the submit button
  //   const submitButton = screen.getByRole("button", { name: /submit/i });

  //   // Fill in form fields to make it valid
  //   userEvent.type(screen.getByPlaceholderText("John Doe"), "John Doe");
  //   userEvent.type(screen.getByPlaceholderText("Cwk"), "Male");
  //   userEvent.type(screen.getByPlaceholderText("Email@example.com"), "john@example.com");
  //   userEvent.type(screen.getByPlaceholderText("Enter your password"), "password123");
  //   userEvent.type(screen.getByPlaceholderText("Jl..."), "Jl. Example");
  //   userEvent.type(screen.getByPlaceholderText("+62 *** *** ***"), "+62123456789");

  //   // Click the button to trigger form submission
  //   await act(async () => {
  //     fireEvent.click(submitButton);
  //   });

  //   // Expect the button to be disabled and display "Submitting..."
  //   expect(submitButton).toBeDisabled();
  //   expect(submitButton).toHaveTextContent("Submitting...");

  //   // Wait for the form submission to finish and check the button text again
  //   await waitFor(() => {
  //     expect(submitButton).not.toBeDisabled();
  //     expect(submitButton).toHaveTextContent("Submit");
  //   });
  // });

  it("should create user successfully and display success message", async () => {
    createUser.mockResolvedValue({ id: 1 });
    useUserStore.mockReturnValue({
      addUser: jest.fn(),
    });

    render(<UserForm isOpen={true} setIsOpen={setIsOpen} />);

    // Fill in form fields to make it valid
    await userEvent.type(screen.getByPlaceholderText("John Doe"), "John Doe");
    await userEvent.type(screen.getByPlaceholderText("Cwk"), "Male");
    await userEvent.type(screen.getByPlaceholderText("Email@example.com"), "john@example.com");
    await userEvent.type(screen.getByPlaceholderText("Enter your password"), "password123");
    await userEvent.type(screen.getByPlaceholderText("Jl..."), "Jl. Example");
    await userEvent.type(screen.getByPlaceholderText("+62 *** *** ***"), "+62123456789");

    // Find the submit button
    const submitButton = screen.getByRole("button", { name: /submit/i });

    expect(submitButton).not.toBeDisabled();

    fireEvent.submit(screen.getByRole("form"));

    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/submitting\.\.\./i)).toBeInTheDocument();

    // Wait for the form submission to finish
    await waitFor(() => {
      expect(createUser).toHaveBeenCalledWith({
        username: "John Doe",
        gender: "Male",
        email: "john@example.com",
        password: "password123",
        address: "Jl. Example",
        phone: "+62123456789",
      });

      expect(toast.success).toHaveBeenCalledWith("User created successfully!");

      expect(submitButton).not.toBeDisabled(); // Ensure button is enabled again
      expect(submitButton).toHaveTextContent("Submit"); // Ensure button text is reverted
    });
  });

  it("should handle submission error and display error message", async () => {
    createUser.mockRejectedValue(new Error("Failed to create user!"));
    useUserStore.mockReturnValue({
      addUser: jest.fn(),
    });

    render(<UserForm isOpen={true} setIsOpen={setIsOpen} />);

    // Fill in form fields to make it valid
    await userEvent.type(screen.getByPlaceholderText("John Doe"), "John Doe");
    await userEvent.type(screen.getByPlaceholderText("Cwk"), "Male");
    await userEvent.type(screen.getByPlaceholderText("Email@example.com"), "john@example.com");
    await userEvent.type(screen.getByPlaceholderText("Enter your password"), "password123");
    await userEvent.type(screen.getByPlaceholderText("Jl..."), "Jl. Example");
    await userEvent.type(screen.getByPlaceholderText("+62 *** *** ***"), "+62123456789");

    // Find the submit button
    const submitButton = screen.getByRole("button", { name: /submit/i });

    expect(submitButton).not.toBeDisabled();

    fireEvent.submit(screen.getByRole("form"));

    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/submitting\.\.\./i)).toBeInTheDocument();

    // Wait for the form submission to finish
    await waitFor(() => {
      expect(createUser).toHaveBeenCalledWith({
        username: "John Doe",
        gender: "Male",
        email: "john@example.com",
        password: "password123",
        address: "Jl. Example",
        phone: "+62123456789",
      });
      expect(toast.error).toHaveBeenCalledWith("Failed to create user!");

      expect(submitButton).not.toBeDisabled(); // Ensure button is enabled again
      expect(submitButton).toHaveTextContent("Submit"); // Ensure button text is reverted
    });
  });

  it("closes the form when close icon is clicked", () => {
    render(<UserForm isOpen={true} setIsOpen={setIsOpen} />);

    fireEvent.click(screen.getByTestId("close-icon"));

    expect(setIsOpen).toHaveBeenCalledWith(false);
    expect(mockRouter.refresh).toHaveBeenCalled();
  });
});
