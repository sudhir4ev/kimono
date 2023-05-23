import React from 'react'
import ReactDOM from "react-dom";
import "./app.css";

const App = () => {
  return <h1 className="main">It works!!</h1>;
};

export default App

export const renderApp = (mountTo: HTMLElement) => {

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    mountTo
  );


}

