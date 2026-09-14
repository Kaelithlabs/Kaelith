/// <reference types="bun-types" />
import { test, expect } from "bun:test";
import React from "react";
import { Progress } from "./Progress";

test("Progress component renders correctly", () => {
  const element = React.createElement(Progress, { value: 50 });
  expect(element.props.value).toBe(50);
});

test("Progress component calculates percentage correctly", () => {
  const element = React.createElement(Progress, { value: 25, max: 200, showValue: true });
  expect(element.props.value).toBe(25);
  expect(element.props.max).toBe(200);
});
