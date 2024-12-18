import { Outlet } from "react-router-dom"
import { AsideMenu } from "./components/aside-menu/AsideMenu";

function App() {
  return (
    <div className="flex">
      <AsideMenu />
      <main className="lg:mx-auto lg:w-[67vw] lg:ml-auto lg:mr-0 w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
