import React from "react";
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import KanbanBoard from "./Pages/KanbanBoard/kanbanBoard";

const App = () => {

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <KanbanBoard />
    }
  ])

  return(
    <React.Fragment>
      <RouterProvider router={routes} />
    </React.Fragment>
  );
}

export default App;