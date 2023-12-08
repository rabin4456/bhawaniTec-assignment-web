import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/queryClient";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import React from "react";
import { GlobalModal, ModalWrapper } from "./components";

let globalModalRef: any = null;

function App() {
  React.useEffect(() => {
    //Registering modal in the dom
    GlobalModal.setUpModal(globalModalRef);
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
        <ToastContainer
          autoClose={2000}
          newestOnTop={true}
          hideProgressBar={true}
          closeButton={false}
          position='top-right'
          style={{
            top: "5rem",
            zIndex: 999999999,
            width: 400,
          }}
        />
        <ModalWrapper ref={(el) => (globalModalRef = el)} />
      </QueryClientProvider>
    </>
  );
}

export default App;
