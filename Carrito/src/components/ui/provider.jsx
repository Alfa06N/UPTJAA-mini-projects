"use client";

import PropTypes from "prop-types";
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";

const system = createSystem(defaultConfig, {
  globalCss: {
    body: {
      colorPalette: "purple",
    },
  },
  theme: {
    tokens: {
      fonts: {
        body: { value: "var(--font-inter)" },
      },
    },
    semanticTokens: {
      radii: {
        l1: { value: "0.125rem" },
        l2: { value: "0.25rem" },
        l3: { value: "0.375rem" },
      },
    },
  },
});

const Provider = (props) => (
  <ChakraProvider value={system}>
    <ColorModeProvider>{props.children}</ColorModeProvider>
  </ChakraProvider>
);
export { Provider };

Provider.propTypes = {
  children: PropTypes.node,
};
