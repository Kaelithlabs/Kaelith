/// <reference types="bun-types" />
import { test, expect } from "bun:test";
import React from "react";
import { EmptyState } from "./EmptyState";

test("EmptyState component renders props correctly", () => {
  const element = React.createElement(EmptyState, {
    title: "No Data",
    description: "There are no items to display",
  });
  expect(element.props.title).toBe("No Data");
  expect(element.props.description).toBe("There are no items to display");
});
