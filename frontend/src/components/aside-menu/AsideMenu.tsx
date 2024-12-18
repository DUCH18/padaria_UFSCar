import { useState } from "react";
import { FaArrowRight, FaPlus } from "react-icons/fa"
import { FaXmark } from "react-icons/fa6"
import { MdOutlineMenuOpen } from "react-icons/md"
import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-router-dom"

export const AsideMenu = () => {
  const at = location.pathname;
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <aside className="fixed lg:block z-50">
      <div onClick={toggleMenu} className="absolute top-6 bg-orange text-white text-3xl w-fit p-2 rounded-e-md shadow-sm shadow-gray-500 lg:hidden">
        <MdOutlineMenuOpen />
      </div>
      <div className={`absolute z-20 w-[90vw] shadow-xl shadow-gray-900 transition-all duration-500 ${open ? "" : "-translate-x-[100vw]"} lg:fixed lg:w-[32vw] lg:translate-x-0 lg:shadow-none flex flex-col gap-8 p-2 bg-orange h-screen`}>
        <FaXmark className="text-4xl text-white self-end lg:hidden" onClick={toggleMenu} />
        <nav className="py-8 px-4">
          <h1 className="text-white font-pacifico mb-10">Padaria Web</h1>
          <ul className="flex flex-col gap-4">
            <li className={`${at === "/" ? "bg-orange text-white" : "bg-white text-brown"} w-full border-[3px] border-white rounded-full`}>
              <Link to="/" onClick={toggleMenu} className="flex items-center gap-4 font-bold p-3">
                <PiHouseBold className="text-xl" /> Estoque
              </Link>
            </li>
            <li className={`${at === "/novo" ? "bg-orange text-white" : "bg-white text-brown"} w-full border-[3px] border-white rounded-full`}>
              <Link to="/novo" onClick={toggleMenu} className="flex items-center gap-4 font-bold p-3">
                <FaPlus className="text-lg" /> Cadastrar Novo Produto
              </Link>
            </li>
            <li className={`${at === "/relatorio" ? "bg-orange text-white" : "bg-white text-brown"} w-full border-[3px] border-white rounded-full`}>
              <Link to="/relatorio" onClick={toggleMenu} className="flex items-center gap-4 font-bold p-3">
                <FaArrowRight className="text-lg" /> Gerar Relatório de Vendas
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}
