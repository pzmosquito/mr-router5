import {renderApp, router} from "./components/App";


router.start(renderApp);

module.hot.accept(renderApp)
