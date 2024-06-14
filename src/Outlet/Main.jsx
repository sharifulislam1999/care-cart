import { Outlet, ScrollRestoration } from "react-router-dom";
import Nav from "../Components/Nav/Nav";
import Footer from "../Components/Footer/Footer";

const Main = () => {
  return (
    <div>
      <Nav></Nav>
      <ScrollRestoration />
      <Outlet></Outlet>
      <div className="bg-black bg-opacity-">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Main;
