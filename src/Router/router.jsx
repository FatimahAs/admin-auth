import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Home from "../Pages/Home";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import Admin from "../Pages/Admin"





function Layout() {
   

  return (
    <>
       
		<div className="min-h-screen flex flex-col">	  
            <Navbar />
			<main className="flex-grow">
				<Outlet />
			  </main>
			  <Footer/>
			
		</div>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
		{ path: "/", element: <Home /> },
        { path: "signin", element: <Signin /> },
      { path: "signup", element: <Signup /> },
         { path:"admin" ,element:<Admin />},
    ],
  },
]);

function Router() {
  return (
    <><RouterProvider router={router}/></>
  );
}

export default Router;