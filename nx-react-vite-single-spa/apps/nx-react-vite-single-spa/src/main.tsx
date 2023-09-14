import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import './styles.css'

import App from "./app/app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

mountAtShadowRoot(document.getElementById('shadow-root') as HTMLElement)

function mountAtShadowRoot(el: HTMLElement) {
  el.attachShadow({ mode: "open" });
  const shadowDomRoot = el.shadowRoot;
  const root = ReactDOM.createRoot(shadowDomRoot as HTMLElement)

  root.render(<StrictMode>
    <App />
  </StrictMode>)
}
