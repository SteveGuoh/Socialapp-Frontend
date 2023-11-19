/* eslint-disable */

import React from "react";
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Input from "./Input";

describe("Layout", () => {
  it("has input item", () => {
    const { container } = render(<Input />);
    const input = container.querySelector("input");
    expect(input).toBeInTheDocument();
  });

  it("displays the label provided in props", () => {
    const { queryByText } = render(<Input label="Test Label" />);
    const label = queryByText("Test Label");
    expect(label).toBeInTheDocument();
  });

  it("does not displays the label when not provided in props", () => {
    const { container } = render(<Input />);
    const label = container.querySelector("Test Label");
    expect(label).not.toBeInTheDocument();
  });

  it("has type text when type is not provided as prop", () => {
    const { container } = render(<Input />);
    const input = container.querySelector("input");
    expect(input.type).toBe("text");
  });

  it("has type password when type is provided as password", () => {
    const { container } = render(<Input type="password" />);
    const input = container.querySelector("input");
    expect(input.type).toBe("password");
  });

  it("displays the placeholder provided in props", () => {
    const { container } = render(<Input placeholder="Test placeholder" />);
    const input = container.querySelector("input");
    expect(input.placeholder).toBe("Test placeholder");
  });

  it("has value of the value provided as prop", () => {
    const { container } = render(<Input value="Test value" />);
    const input = container.querySelector("input");
    expect(input.value).toBe("Test value");
  });

  it("has onChange callback when onChange prop is provided", () => {
    const onChange = jest.fn();
    const { container } = render(<Input onChange={onChange} />);
    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: "new-value" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("has default style when there is no validation error or success", () => {
    const { container } = render(<Input />);
    const input = container.querySelector("input");
    expect(input.className).toBe("form-control");
  });

  it("has success style when hasError is false", () => {
    const { container } = render(<Input hasError={false} />);
    const input = container.querySelector("input");
    expect(input.className).toBe("form-control is-valid");
  });

  it("has style for error case when there is error", () => {
    const { container } = render(<Input hasError={true} />);
    const input = container.querySelector("input");
    expect(input.className).toBe("form-control is-invalid");
  });

  it("displays the error text when hasError is true", () => {
    const { queryByText } = render(
      <Input hasError={true} error="Test error" />
    );
    const error = queryByText("Test error");
    expect(error).toBeInTheDocument();
  });

  it("does not display the error text when hasError is false", () => {
    const { queryByText } = render(
      <Input hasError={false} error="Test error" />
    );
    const error = queryByText("Test error");
    expect(error).not.toBeInTheDocument();
  });
});
