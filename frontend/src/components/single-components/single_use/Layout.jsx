import { Outlet } from "react-router-dom";

const Layout = () => {
  // Outlet component represents all the children of the Layout component
  // Anything nested inside the Layout component
  return (
    <main className="app">
      <Outlet />
    </main>
  );
};

export default Layout;
