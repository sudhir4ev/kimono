import React from 'react';
import ReactDOMClient from 'react-dom/client'
import singleSpaReact, { SingleSpaContext } from 'single-spa-react';

import App from './app/app';

export const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: App,
  errorBoundary(err, info, props) {
    // https://reactjs.org/docs/error-boundaries.html
    return <div>This renders when a catastrophic error occurs</div>;
  },
});
