import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import AddEditBlog from "../pages/AddEditBlog";
import Blog from "../pages/Blog";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
    {path:'/',
    element :<Home></Home>,
    // loader: ()=> fetch('http://localhost:5000/blogs')

},
    {
        path:'/addBlog',
        element:<AddEditBlog></AddEditBlog>
    },
    {
        path:'/editBlog/:id',
        element:<AddEditBlog></AddEditBlog>
    },
    {
        path:'/blogs/:id',
        element:<Blog></Blog>
    },
    {
        path:'/about',
        element:<About></About>
    },
    {
        path:'/*',
        element:<NotFound></NotFound>
    },
])