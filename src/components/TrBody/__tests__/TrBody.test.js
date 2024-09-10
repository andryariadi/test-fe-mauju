// src/components/TrBody/__tests__/TrBody.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TrBody from "src/components/TrBody/TrTbody";
import { deleteUser, getUsersById } from "src/libs/data";
import useUserStore from "src/libs/storeUser";
import toast from "react-hot-toast";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  notFound: jest.fn(),
}));

jest.mock("src/libs/data", () => ({
  deleteUser: jest.fn(),
  getUsersById: jest.fn(),
}));

jest.mock("src/libs/storeUser", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe("TrBody", () => {
  const mockRemoveUser = jest.fn();
  const mockUsers = [
    {
      id: "1",
      username: "testuser",
      gender: "male",
      phone: "1234567890",
      address: { address: "123 Test St" },
      email: "testuser@example.com",
    },
  ];

  beforeEach(() => {
    useUserStore.mockReturnValue({
      users: mockUsers,
      removeUser: mockRemoveUser,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should renders the table row with user data", () => {
    render(<TrBody />);

    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.getByText("male")).toBeInTheDocument();
    expect(screen.getByText("1234567890")).toBeInTheDocument();
    expect(screen.getByText("123 Test St")).toBeInTheDocument();
    expect(screen.getByText("testuser@example.com")).toBeInTheDocument();
  });

  test("should open UpdateUser modal when handles edit button click", async () => {
    getUsersById.mockResolvedValue({
      id: "1",
      username: "testuser",
      gender: "male",
      phone: "1234567890",
      address: { address: "123 Test St" },
      email: "testuser@example.com",
    });

    render(<TrBody />);

    // Click the edit button
    fireEvent.click(screen.getByTestId("edit-button"));

    // Wait for the UpdateUser form to appear
    await waitFor(() => {
      expect(getUsersById).toHaveBeenCalledWith("1");
      expect(screen.getByTestId("update-modal")).toBeInTheDocument();
    });
  });

  test("handles delete button click", async () => {
    deleteUser.mockResolvedValue({ success: true });

    render(<TrBody />);

    fireEvent.click(screen.getByTestId("delete-button"));

    await waitFor(() => {
      expect(deleteUser).toHaveBeenCalledWith("1");
      expect(mockRemoveUser).toHaveBeenCalledWith("1");
      expect(toast.success).toHaveBeenCalledWith("User deleted successfully!");
    });
  });

  test("handles delete button error", async () => {
    deleteUser.mockRejectedValue(new Error("Failed to delete user"));

    render(<TrBody />);

    fireEvent.click(screen.getByTestId("delete-button"));

    await waitFor(() => {
      expect(deleteUser).toHaveBeenCalledWith("1");
      expect(toast.error).toHaveBeenCalledWith("Failed to delete user!");
    });
  });
});
