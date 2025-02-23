import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./pages/Home";
import React from "react";

describe("Home Component", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  test("should add a new task", async () => {

    mock.onPost("http://localhost:8080/api/v1/task/createTask").reply(201, {
      id: 1,
      taskName: "Test Task",
      description: "Test Description",
      status: false,
    });

    mock.onGet("http://localhost:8080/api/v1/task/getAllTasks").reply(200, [
      { id: 1, taskName: "Test Task", description: "Test Description", status: false },
    ]);

    render(<Home />);

    fireEvent.change(screen.getByPlaceholderText("Title (Required)*"), {
      target: { value: "Test Task" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description (Required)*"), {
      target: { value: "Test Description" },
    });

    fireEvent.click(screen.getByText("Create Task"));

    await waitFor(() => {
      expect(screen.getByText("Test Task")).toBeInTheDocument();
    });
  });
});
