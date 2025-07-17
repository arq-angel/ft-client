import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

const DefaultLayout = () => {
  return (
    <div>
      {/* nav bar */}
      <Header />

      {/* actual page content */}
      <main className="main">
        <Outlet />
      </main>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
