import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import KanbanBoard from "./Pages/KanbanBoard/kanbanBoard";
import EventUpdationModal from "./Components/EventUpdationModal/EventUpdationModal";
import Login from "./Pages/Login/login";
import AllBoards from "./Pages/AllBoards/AllBoards";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/board/:board_id",
      element: <KanbanBoard />,
    },
    {
      path: "/allBoards/:user_id",
      element: <AllBoards />
    },
    {
      path: "/",
      element: <Login />
    }
  ]);

  return (
    <React.Fragment>
      <RouterProvider router={routes} />
    </React.Fragment>
  );
};

export default App;
