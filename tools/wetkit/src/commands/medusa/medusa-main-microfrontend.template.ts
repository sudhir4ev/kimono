function template(vars: ReactMedusaMicrofrontendTemplateVars) {

  const {
    icons = {
      default: "fa-light fa-film",
      active: "fa-solid fa-film"
    },
    weight = 768
  } = vars;

  return `import React from "react";
import ReactDOMClient from "react-dom/client";
import App from "${vars.rootComponentPath}";
import singleSpaReact from "single-spa-react";
import { getMenuManager, type MedusaProductProps } from "@evooq/medusa-core";

export const getOrchestratorLifecycle = () => {
  return {
    setup(props: MedusaProductProps<"@evooq/medusa-dummy-react">) {
      
      const productId = props.product.id;

      const menuManager = getMenuManager();
      menuManager.addItem({
        classIcon: "${icons.default}",
        classIconActive: "${icons.active}",
        isAvailable: () => true,
        name: "${vars.appName}",
        productId,
        url: "${vars.hostPath}",
        weight: ${weight}
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
};`;

}

export default template;

export type ReactMedusaMicrofrontendTemplateVars = {
  weight?: number;
  appName: string;
  rootComponentPath: string,
  hostPath: string,
  icons?: {
    default: string,
    active: string
  }
}
