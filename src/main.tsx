import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { clientQuery } from "./Config/query-client.ts";
import 'react-quill/dist/quill.snow.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={clientQuery}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
