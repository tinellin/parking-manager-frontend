import { Link } from "react-router-dom";

export function NavLink({ to, icon, title }) {
  return (
    <Link to={`/home${to}`}>
      <div className="flex gap-4 items-center my-3 hover:text-blue-600">
        {icon}
        <span className="text-md font-bold">{ title }</span>
      </div>
    </Link>
  )
}