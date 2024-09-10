// src/components/AddUser.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddUser from "../AddUser";

// Mock the useSortStore hook
const mockSetInput = jest.fn();
jest.mock("src/libs/storeSort", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    input: { sort: "", order: "" },
    setInput: mockSetInput,
  })),
}));

// Mock the UserForm component
jest.mock("src/components/UserForm/UserForm", () => ({
  __esModule: true,
  default: ({ isOpen, setIsOpen }) => (
    <div>
      UserForm Mock - isOpen: {isOpen.toString()}
      <button onClick={() => setIsOpen(false)}>Close</button>
    </div>
  ),
}));

describe("AddUser Component", () => {
  beforeEach(() => {
    // Clear mocks before each test
    mockSetInput.mockClear();
  });

  it("renders User Lists header", () => {
    render(<AddUser />);
    expect(screen.getByText("User Lists")).toBeInTheDocument();
  });

  it("renders sort and order select elements", () => {
    render(<AddUser />);
    expect(screen.getByLabelText("Sort By")).toBeInTheDocument();
    expect(screen.getByLabelText("Order By")).toBeInTheDocument();
  });

  it("updates sort and order input values", () => {
    render(<AddUser />);

    const sortSelect = screen.getByLabelText("Sort By");
    fireEvent.change(sortSelect, { target: { value: "firstName", name: "sort" } });
    expect(mockSetInput).toHaveBeenCalledWith({ sort: "firstName" });

    const orderSelect = screen.getByLabelText("Order By");
    fireEvent.change(orderSelect, { target: { value: "asc", name: "order" } });
    expect(mockSetInput).toHaveBeenCalledWith({ order: "asc" });
  });

  it("toggles UserForm on IoPersonAddSharp icon click", () => {
    render(<AddUser />);

    const addUserIcon = screen.getByTestId("add-user-icon");
    fireEvent.click(addUserIcon);
    expect(screen.getByText("UserForm Mock - isOpen: true")).toBeInTheDocument();

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);
    expect(screen.queryByText("UserForm Mock - isOpen: true")).not.toBeInTheDocument();
  });
});
