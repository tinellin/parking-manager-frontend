import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';

export function LayoutClient() {
  return (
    <>
      <Header />
      <main className="bg-my-gray-800 rounded-md p-5 border">
        <Outlet />
      </main>
    </>
  );
}