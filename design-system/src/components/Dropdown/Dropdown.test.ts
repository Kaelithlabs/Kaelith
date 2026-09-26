/// <reference types="bun-types" />
import { test, expect } from "bun:test";
import React from "react";
import { DropdownMenu, DropdownTrigger, Menu, MenuItem, MenuSeparator } from "./index";

test("DropdownMenu components instantiate correctly", () => {
  const trigger = React.createElement(DropdownTrigger, null, "Open Menu");
  const item1 = React.createElement(MenuItem, { onClick: () => {}, children: "Option 1" });
  const item2 = React.createElement(MenuItem, { disabled: true, children: "Option 2" });
  const separator = React.createElement(MenuSeparator, null);
  const menu = React.createElement(Menu, {
    align: "start",
    position: "bottom",
    children: [item1, separator, item2],
  });
  const dropdown = React.createElement(DropdownMenu, {
    defaultOpen: false,
    children: [trigger, menu],
  });

  expect(dropdown.props.defaultOpen).toBe(false);
  expect(trigger.props.children).toBe("Open Menu");
  expect(item1.props.children).toBe("Option 1");
  expect(item2.props.disabled).toBe(true);
});
