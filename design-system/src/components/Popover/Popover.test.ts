/// <reference types="bun-types" />
import { test, expect } from "bun:test";
import React from "react";
import { Popover } from "./index";

test("Popover component instantiates with correct props", () => {
  const trigger = React.createElement("button", null, "Click Me");
  const content = React.createElement("div", null, "Popover Content");
  const popover = React.createElement(Popover, {
    trigger,
    content,
    position: "top",
    isOpen: true,
  });

  expect(popover.props.position).toBe("top");
  expect(popover.props.isOpen).toBe(true);
  expect(popover.props.trigger).toBe(trigger);
  expect(popover.props.content).toBe(content);
});
