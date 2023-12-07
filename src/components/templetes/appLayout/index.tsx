import { Outlet } from "react-router-dom";
import { NavigationBar } from "../../organisms";

export const AppLayout = () => {
  return (
    <>
      <NavigationBar />
      <div className='p-14 mt-5'>
        <Outlet />
      </div>
    </>
  );
};
