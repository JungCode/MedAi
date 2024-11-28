import { useState } from "react";
import Chatbot from "./pages/Chatbot";
import HealthOverview from "./pages/HealthOverview";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "Profile",
        element: <HealthOverview />,
      },
      {
        path: "Chatbot",
        element: <Chatbot />,
      },
    ],
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
