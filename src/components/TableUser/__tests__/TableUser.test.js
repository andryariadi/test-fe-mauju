// src/components/TableUser.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useQuery } from "react-query";
import useUserStore from "src/libs/storeUser";
import useSearchStore from "src/libs/storeSearch";
import useSortStore from "src/libs/storeSort";
import { getUsers, searchUsers, sortUsers } from "src/libs/data";
import TableUser from "../TableUser";

jest.mock("react-query");
jest.mock("src/libs/storeUser");
jest.mock("src/libs/storeSearch");
jest.mock("src/libs/storeSort");
jest.mock("src/libs/data");

describe("TableUser", () => {
  beforeEach(() => {
    useUserStore.mockReturnValue({
      setUsers: jest.fn(),
      users: [],
    });

    useSearchStore.mockReturnValue({
      query: "",
    });

    useSortStore.mockReturnValue({
      input: { sort: "", order: "" },
    });

    useQuery.mockImplementation(() => ({
      data: [],
      error: null,
      isLoading: false,
      refetch: jest.fn(),
    }));

    getUsers.mockResolvedValue([]);
    searchUsers.mockResolvedValue([]);
    sortUsers.mockResolvedValue([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    useQuery.mockImplementation(() => ({
      data: [],
      error: null,
      isLoading: true,
    }));

    render(<TableUser />);
    expect(screen.getByTestId(/loading/i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    useQuery.mockImplementation(() => ({
      data: [],
      error: new Error("Test Error"),
      isLoading: false,
    }));

    render(<TableUser />);
    expect(screen.getByText(/error: test error/i)).toBeInTheDocument();
  });

  it("should render table header", () => {
    render(<TableUser />);
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  //   it("renders table with users", async () => {
  //     const mockUsers = [
  //       { id: 1, username: "John", gender: "Male", phone: "12345", address: "123 Street", email: "john@example.com" },
  //       // add more mock users if needed
  //     ];

  //     useQuery.mockImplementation(() => ({
  //       data: mockUsers,
  //       error: null,
  //       isLoading: false,
  //       refetch: jest.fn(),
  //     }));

  //     render(<TableUser />);
  //     await waitFor(() => {
  //       expect(screen.getByText("John")).toBeInTheDocument();
  //       // add more assertions based on the structure of your table and mock data
  //     });
  //   });

  //   it("refetches data on query or sort change", () => {
  //     const mockRefetch = jest.fn();

  //     useQuery.mockImplementation(() => ({
  //       data: [],
  //       error: null,
  //       isLoading: false,
  //       refetch: mockRefetch,
  //     }));

  //     const { rerender } = render(<TableUser />);

  //     // Mock store states for query and input changes
  //     useSearchStore.mockReturnValue({
  //       query: "new query",
  //     });

  //     useSortStore.mockReturnValue({
  //       input: { sort: "name", order: "asc" },
  //     });

  //     rerender(<TableUser />);
  //     expect(mockRefetch).toHaveBeenCalled();
  //   });
});
