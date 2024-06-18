import { NavLink } from "./NavLink";
import { FaCar, FaUserEdit } from "react-icons/fa";
import { NavSection } from "./NavSection";
import { TbPigMoney } from "react-icons/tb";

export function Sidebar() {

  return ( 
    <section className="flex flex-col py-5 col-span-1">
      <NavSection title="Geral">
        <NavLink title="Detalhes da conta" icon={<TbPigMoney />} to=""/>
        <NavLink title="Veículos" icon={<FaCar />} to="/vehicles"/>
        <NavLink title="Atualizar senha" icon={<FaUserEdit />} to="/update-signup" />
      </NavSection>

   </section>   
  )
}
