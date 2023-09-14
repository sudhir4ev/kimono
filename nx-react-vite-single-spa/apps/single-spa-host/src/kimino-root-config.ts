import { registerApplication, start, LifeCycles } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from 'single-spa-layout';

const routes = constructRoutes(`
<single-spa-router>
  <div class="main-content">
    <route path="settings">
      <application name="settings"></application>
    </route>
  </div>
</single-spa-router>
`);

const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});

const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);

registerApplication({
  name: "@single-spa/welcome",
  app: () =>
    System.import<LifeCycles>(
      "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
    ),
  activeWhen: ["/demo"],
});

registerApplication({
  name: "@kimino/nx-vite",
  app: () => System.import<LifeCycles>("http://localhost:8080/assets/microfrontend-cbc4e7a1.js"),
  activeWhen: ["/"]
});


start({
  urlRerouteOnly: true,
});
