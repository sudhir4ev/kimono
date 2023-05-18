import React from "react";
import ReactDOMClient from "react-dom/client";
import App from "./app";
import singleSpaReact from "single-spa-react";
import type { MedusaProductProps } from "@evooq/medusa-core";

export const getOrchestratorLifecycle = () => {
};

export const getSingleSpaLifecycle = () => {
  return singleSpaReact({
    domElementGetter(props: MedusaProductProps) {
      return props.getRootElement();
    },
    React,
    ReactDOMClient,
    rootComponent: App
  });
};
