import { useState } from "react";
import { Link, useLocation } from "react-router-dom"

import { FaXmark } from "react-icons/fa6"
import { PiHouseBold } from "react-icons/pi";
import { MdOutlineMenuOpen } from "react-icons/md"
import { FaPlus } from "react-icons/fa"
import { TbReport } from "react-icons/tb";
import { RiCoinsLine } from "react-icons/ri";

export const AsideMenu = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  const isAtPath = (path: string) => location.pathname === path;

  return (
    <aside className="fixed lg:block z-50">
      <div onClick={toggleMenu} className="absolute top-6 bg-orange text-white text-3xl w-fit p-2 rounded-e-md shadow-sm shadow-gray-500 lg:hidden">
        <MdOutlineMenuOpen />
      </div>
      <div className={`absolute z-20 w-[90vw] shadow-xl shadow-gray-900 transition-all duration-500 ${open ? "" : "-translate-x-[100vw]"} lg:fixed lg:w-[32vw] lg:translate-x-0 lg:shadow-none flex flex-col gap-8 p-2 bg-orange h-screen`}>
        <FaXmark className="text-4xl text-white self-end lg:hidden" onClick={toggleMenu} />
        <nav className="py-8 px-4">
          <h1 className="text-white font-pacifico mb-10"><a href="/">Padaria Web</a></h1>
          <ul className="flex flex-col gap-4">
            <li className={`${isAtPath("/") ? "bg-orange text-white" : "bg-white text-brown"} w-full border-[3px] border-white rounded-full hover:bg-orange hover:text-white`}>
              <Link to="/" onClick={toggleMenu} className="flex items-center gap-4 font-bold p-3 rounded-full focus:outline-black">
                <PiHouseBold className="text-xl" /> Estoque
              </Link>
            </li>
            <li className={`${isAtPath("/relatorio") ? "bg-orange text-white" : "bg-white text-brown"} w-full border-[3px] border-white rounded-full hover:bg-orange hover:text-white`}>
              <Link to="/relatorio" onClick={toggleMenu} className="flex items-center gap-4 font-bold p-3 rounded-full focus:outline-black">
                <TbReport className="text-lg" /> Gerar Relatório de Vendas
              </Link>
            </li>
            <li className={`${isAtPath("/novo") ? "bg-orange text-white" : "bg-white text-brown"} w-full border-[3px] border-white rounded-full hover:bg-orange hover:text-white`}>
              <Link to="/novo" onClick={toggleMenu} className="flex items-center gap-4 font-bold p-3 rounded-full focus:outline-black">
                <FaPlus className="text-lg" /> Cadastrar Novo Produto
              </Link>
            </li>
            <li className={`${isAtPath("/vender") ? "bg-orange text-white" : "bg-white text-brown"} w-full border-[3px] border-white rounded-full hover:bg-orange hover:text-white`}>
              <Link to="/vender" onClick={toggleMenu} className="flex items-center gap-4 font-bold p-3 rounded-full focus:outline-black">
                <RiCoinsLine className="text-lg" /> Vendas
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}