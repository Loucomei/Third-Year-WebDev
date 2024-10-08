import BookList from "./books/BookList";

import { RouterProvider } from "react-router-dom";
import { router } from "./router";


function App() {

  return (
    // <>
    //  <h1>Adv web dev</h1>
    //  <BookList />
    // </>

    <>
      <RouterProvider router={router}/>
    </>

  )
}

export default App
