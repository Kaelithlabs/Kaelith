/// <reference types="bun-types" />
import { test, expect } from "bun:test";
import React from "react";
import { Toast } from "./Toast";

test("Toast component creates element with specified variant and props", () => {
  const element = React.createElement(Toast, {
    variant: "success",
    title: "Operation Success",
    description: "Saved successfully",
  });
  expect(element.props.variant).toBe("success");
  expect(element.props.title).toBe("Operation Success");
  expect(element.props.description).toBe("Saved successfully");
});
