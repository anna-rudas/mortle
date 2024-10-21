import React from "react";
import { createRoot } from "react-dom/client";
import AppContextProvider from "./context/context";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./components/pages/ErrorPage/ErrorPage";
import MainPage from "./components/pages/MainPage/MainPage";
import FontFaceObserver from "fontfaceobserver";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://3db0636a5c32f8b82f0f196b491db61e@o4508161927348224.ingest.de.sentry.io/4508161929052241",
  integrations: [],
});

function App() {
  return <MainPage />;
}

const logError = (error: Error) => {
  console.error("Unexpected error: ", error);
};

const primaryFontObserver = new FontFaceObserver("Rubik Vinyl");
const secondaryFontObserver = new FontFaceObserver("Nunito");

function AppWithProvider() {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage} onError={logError}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </ErrorBoundary>
  );
}

export default AppWithProvider;

Promise.all([primaryFontObserver.load(), secondaryFontObserver.load()]).then(
  () => {
    createRoot(document.getElementById("root")!).render(<AppWithProvider />);
  }
);
