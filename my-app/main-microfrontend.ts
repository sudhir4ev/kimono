import React from "react";
import ReactDOMClient from "react-dom/client";
import App from "./app";
import singleSpaReact from "single-spa-react";
import { getMenuManager, type MedusaProductProps } from "@evooq/medusa-core";

export const getOrchestratorLifecycle = () => {
  return {
    setup(props: MedusaProductProps<"@evooq/medusa-dummy-react">) {
      console.log("Setting up", props);

      const productId = props.product.id;

      const menuManager = getMenuManager();
      menuManager.addItem({
        classIcon: "fa-light fa-film",
        classIconActive: "fa-solid fa-film",
        isAvailable: () => true,
        name: "React My App",
        productId,
        url: "/my-app-react",
        weight: 730
      });

    }
  };
};

export const getSingleSpaLifecycle = () => {
  const { bootstrap, mount, unmount } = singleSpaReact({
    domElementGetter(props: MedusaProductProps) {
      return props.getRootElement();
    },
    React,
    ReactDOMClient,
    rootComponent: App
  });
  return { bootstrap, mount, unmount };
};
