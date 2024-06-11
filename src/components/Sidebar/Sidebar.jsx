import { MdOutlineDashboard, MdWorkOutline } from "react-icons/md";
import { NavLink } from "./NavLink";
import { FaCar } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { NavSection } from "./NavSection";

export function Sidebar() {
  return ( 
    <section className="flex flex-col py-5 border col-span-1">
      <NavSection title="Geral">
        <NavLink title="Dashboard" icon={<MdOutlineDashboard />} to=""/>
        <NavLink title="Vagas" icon={<FaCar />} to="parking-spots"/>
      </NavSection>

      <NavSection title="Gerenciamento">
        <NavLink title="Empregados" icon={<MdWorkOutline />} to="employees" />
        <NavLink title="Clientes" icon={<FaPerson />} to="customers" />
      </NavSection>
   </section>   
  )
}