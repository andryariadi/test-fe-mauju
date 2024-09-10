import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { login } from "src/libs/data";
import LoginPage from "../page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock("src/libs/data", () => ({
  login: jest.fn(),
}));

describe("LoginPage", () => {
  const push = jest.fn();
  const username = "testuser";
  const password = "password123";

  beforeEach(() => {
    useRouter.mockReturnValue({ push });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form", () => {
    // ARRANGE
    render(<LoginPage />);

    // ASSERT
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("shows error messages when username and password are empty", async () => {
    // ARRANGE
    render(<LoginPage />);

    // ACT
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // ASSERT
    await waitFor(() => {
      expect(screen.getByText(/username is required!/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required!/i)).toBeInTheDocument();
    });
  });

  it("calls login function and redirects on successful login", async () => {
    // ARRANGE
    login.mockResolvedValueOnce({});
    render(<LoginPage />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    // ACT
    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(loginButton);

    // ASSERT
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({ username, password });
      expect(toast.success).toHaveBeenCalledWith("Login successful!");
      expect(push).toHaveBeenCalledWith("/");
    });
  });

  it("shows error toast on failed login", async () => {
    // ARRANGE
    login.mockRejectedValueOnce(new Error("Login failed"));
    render(<LoginPage />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    // ACT
    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(loginButton);

    // ASSERT
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({ username, password });
      expect(toast.error).toHaveBeenCalledWith("Login failed!");
    });
  });

  it("toggles password visibility", () => {
    // Arrange
    const { getAllByRole, getByPlaceholderText } = render(<LoginPage />);
    const passwordInput = getByPlaceholderText("Enter your password");
    const [firstToggleButton] = getAllByRole("button"); // Mengambil tombol pertama dari daftar tombol

    // Act: Klik tombol untuk menampilkan password
    act(() => {
      fireEvent.click(firstToggleButton);
    });

    // Assert: Password harus memiliki tipe 'text'
    expect(passwordInput).toHaveAttribute("type", "text");

    // Act: Klik tombol lagi untuk menyembunyikan password
    act(() => {
      fireEvent.click(firstToggleButton);
    });

    // Assert: Password harus memiliki tipe 'password'
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
