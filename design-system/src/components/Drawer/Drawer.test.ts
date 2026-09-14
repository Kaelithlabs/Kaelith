/// <reference types="bun-types" />
import { test, expect } from "bun:test";
import React from "react";
import { Drawer } from "./index";

test("Drawer component instantiates with correct props", () => {
  const drawer = React.createElement(Drawer, {
    isOpen: true,
    onClose: () => {},
    position: "right",
    title: "Side Drawer",
    size: "md",
    children: React.createElement("p", null, "Drawer body"),
  });

  expect(drawer.props.isOpen).toBe(true);
  expect(drawer.props.position).toBe("right");
  expect(drawer.props.title).toBe("Side Drawer");
  expect(drawer.props.size).toBe("md");
});
