import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import KanbanBoard from "./Pages/KanbanBoard/kanbanBoard";
import EventUpdationModal from "./Components/EventUpdationModal/EventUpdationModal";
import Login from "./Pages/Login/login";
import AllBoards from "./Pages/AllBoards/AllBoards";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <KanbanBoard />,
    },
    {
      path: "/allBoards/:user_id",
      element: <AllBoards />
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);

  const mainHtml = document.getElementById("body");
  mainHtml.classList.add("dark_theme");

  return (
    <React.Fragment>
      <RouterProvider router={routes} />
    </React.Fragment>
  );
};

export default App;
