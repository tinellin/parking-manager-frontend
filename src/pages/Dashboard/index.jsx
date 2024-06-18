import { Outlet } from 'react-router-dom';

import { Header } from '../../components/Header/Header';
import { Sidebar } from "../../components/Sidebar/Sidebar";

export function LayoutAdmin() {
  return (
    <>
      <Header />
      <div className="grid grid-cols-6">
        <Sidebar className="col-span-1" />
        <main className="col-span-5 bg-my-gray-800 rounded-md p-5">
          <Outlet />
        </main>
      </div>
    </>
  );
}