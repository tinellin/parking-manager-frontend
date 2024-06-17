import { Outlet } from 'react-router-dom';

import { Header } from '../../components/Header/Header';
import { Sidebar } from "../../components/Sidebar/Sidebar";

export function LayoutAdmin() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar className="w-1/6" />
        <main className="w-5/6 bg-my-gray-800 rounded-md p-5 border">
          <Outlet />
        </main>
      </div>
    </>
  );
}