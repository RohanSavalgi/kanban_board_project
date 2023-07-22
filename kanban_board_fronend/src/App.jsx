import React, { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import KanbanBoard from "./Pages/KanbanBoard/kanbanBoard";
import EventUpdationModal from "./Components/EventUpdationModal/EventUpdationModal";
import Login from "./Pages/Login/login";
import AllBoards from "./Pages/AllBoards/AllBoards";
import { ThemeContext } from "./Themes/theme-context";

const App = () => {
  const [theme, setTheme] = useState("light");

  const routes = createBrowserRouter([
    {
      path: "/board/:board_id",
      element: <KanbanBoard />,
    },
    {
      path: "/allBoards/:user_id",
      element: <AllBoards />,
    },
    {
      path: "/",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default App;
