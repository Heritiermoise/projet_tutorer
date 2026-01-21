// @ts-check
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUsers, FaBriefcase, FaBuilding, FaUserTie, FaFileAlt, FaMoneyCheckAlt, FaCalendarCheck, FaCogs, FaSignOutAlt, FaChevronDown, FaChevronUp, FaHome } from "react-icons/fa";

/** @typedef {{ title: string, link?: string, icon?: React.ReactNode, children?: MenuEntry[] }} MenuEntry */

const menuData = [
  {
    title: "Accueil",
    icon: <FaHome />,
import { FaList } from "react-icons/fa";
    link: "/",
  },
  {
    title: "Connexion",
    icon: <FaUserTie />,
    link: "/login",
  },
  {
    title: "Inscription",
    icon: <FaFileAlt />,
    link: "/register",
  },
  {
    title: "Employer",
    icon: <FaUsers />,
    children: [
      { title: "Liste des employés", link: "/employes" },
      { title: "Ajouter un employé", link: "/employes/ajouter" },
      { title: "Avantages", link: "/avantages" },
      { title: "Contrats", link: "/contrats" },
      { title: "Documents", link: "/documents" },
      { title: "Fiches de paie", link: "/fiches-paie" },
      { title: "Présence", link: "/presence" },
    ],
  },
  {
    title: "Service",
    icon: <FaBriefcase />,
    children: [
      { title: "Liste des services", link: "/services" },
      {
        title: "Poste",
        children: [
          { title: "Liste des postes", link: "/postes" },
          { title: "Ajouter un poste", link: "/postes/ajouter" },
        ],
      },
    ],
  },
  {
    title: "Recrutement",
    icon: <FaUserTie />,
    children: [
      { title: "Offres d’emploi", link: "/offres" },
      { title: "Candidats", link: "/candidats" },
      { title: "Postulations", link: "/postulations" },
      { title: "Entretiens", link: "/entretiens" },
    ],
  },
  {
    title: "Entreprise",
    icon: <FaBuilding />,
  {
    title: "Entreprise",
    icon: <FaBuilding />,
    children: [
      { title: "Créer une entreprise", link: "/entreprise/creer" },
      { title: "Liste dev (privée)", link: "/entreprise/liste-dev" },
    ],
  },
    link: "/utilisateurs",
  },
  {
    title: "Paramètres",
    icon: <FaCogs />,
    link: "/parametres",
  },
];

/**
 * @param {{ item: MenuEntry, isOpen: boolean, onClick: () => void, level?: number, onNavigate?: () => void }} props
 */
function MenuItem({ item, isOpen, onClick, level = 0, onNavigate }) {
  const hasChildren = item.children && item.children.length > 0;
  return (
    <div>
      <div
        className={`flex items-center px-3 py-2 cursor-pointer hover:bg-white/10 transition-colors rounded-lg text-white ${level > 0 ? 'pl-4' : ''}`}
        onClick={onClick}
      >
        {item.icon && <span className="text-lg mr-3">{item.icon}</span>}
        <span className="flex-1 font-medium">{item.title}</span>
        {hasChildren && (
          <span>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
        )}
      </div>
      {hasChildren && isOpen && (
        <div className="ml-6 border-l border-white/15">
          {(item.children || []).map((child) =>
            child.children ? (
              <MenuItem
                key={child.title}
                item={child}
                isOpen={isOpen}
                onClick={onClick}
                level={level + 1}
                onNavigate={onNavigate}
              />
            ) : (
              <NavLink
                key={child.title}
                to={child.link || "/"}
                onClick={onNavigate}
                className="block px-3 py-2 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded transition-colors"
                style={{ paddingLeft: `${(level + 2) * 8}px` }}
              >
                {child.title}
              </NavLink>
            )
          )}
        </div>
      )}
    </div>
  );
}

/**
 * @param {{ mobile?: boolean, onClose?: () => void }} props
 */
export default function Menu({ mobile = false, onClose = () => {} }) {
  const [openIndexes, setOpenIndexes] = useState(/** @type {number[]} */ ([]));

  /** @param {number} idx */
  const handleToggle = (idx) => {
    setOpenIndexes((prev) =>
      prev.includes(idx)
        ? prev.filter((i) => i !== idx)
        : [...prev, idx]
    );
  };

  // Menu horizontal pour desktop, menu slide-in pour mobile
  if (mobile) {
    return (
      <nav className="w-72 sm:w-80 h-full bg-linear-to-br from-blue-700 via-emerald-500 to-blue-400 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/15">
          <span className="text-xl font-bold text-white">RH Manager</span>
          <button onClick={onClose} className="text-3xl text-white focus:outline-none">&times;</button>
        </div>
        <div className="flex-1 flex flex-col gap-1 p-2 overflow-y-auto">
          {menuData.map((item, idx) => (
            <MenuItem
              key={item.title}
              item={item}
              isOpen={openIndexes.includes(idx)}
              onClick={() => handleToggle(idx)}
              onNavigate={onClose}
            />
          ))}
          <NavLink
            to="/logout"
            onClick={onClose}
            className="flex items-center px-3 py-2 mt-6 text-red-100 hover:bg-white/10 rounded-lg font-medium transition-colors"
          >
            <span className="text-lg mr-2">
              <FaSignOutAlt />
            </span>
            Déconnexion
          </NavLink>
        </div>
      </nav>
    );
  }

  // Menu horizontal desktop compact, 1 seule ligne (scroll horizontal si besoin)
  return (
    <nav className="hidden md:block w-full bg-slate-950/80 backdrop-blur border-b border-slate-800/70">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-3 flex items-center gap-6">
        <NavLink to="/" className="text-white font-extrabold tracking-wide">
          RH Manager
        </NavLink>

        <div className="flex flex-nowrap items-center gap-4 text-sm overflow-x-auto no-scrollbar whitespace-nowrap">
          {menuData.map((item, idx) => {
            const isOpen = openIndexes.includes(idx);
            const hasChildren = item.children && item.children.length > 0;

            if (!hasChildren) {
              return (
                <NavLink
                  key={item.title}
                  to={item.link || "/"}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors ${isActive ? 'text-white' : ''}`
                  }
                >
                  <span className="text-base opacity-90">{item.icon}</span>
                  <span className="whitespace-nowrap">{item.title}</span>
                </NavLink>
              );
            }

            return (
              <div key={item.title} className="relative">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                  onClick={() => handleToggle(idx)}
                >
                  <span className="text-base opacity-90">{item.icon}</span>
                  <span className="whitespace-nowrap">{item.title}</span>
                  <span className="opacity-80">{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
                </button>

                {isOpen && (
                  <div className="absolute left-0 top-full mt-3 w-72 max-h-72 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/95 backdrop-blur shadow-2xl z-50">
                    <div className="p-2">
                      {item.children.map((child) =>
                        child.children ? (
                          <div key={child.title} className="px-2 py-2">
                            <div className="text-xs font-semibold text-white/70 tracking-wide uppercase">
                              {child.title}
                            </div>
                            <div className="mt-1">
                              {child.children.map((sub) => (
                                <NavLink
                                  key={sub.title}
                                  to={sub.link}
                                  className={({ isActive }) =>
                                    `block px-2 py-2 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors ${isActive ? 'bg-white/10 text-white' : ''}`
                                  }
                                >
                                  {sub.title}
                                </NavLink>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <NavLink
                            key={child.title}
                            to={child.link}
                            className={({ isActive }) =>
                              `block px-2 py-2 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors ${isActive ? 'bg-white/10 text-white' : ''}`
                            }
                          >
                            {child.title}
                          </NavLink>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="ml-auto">
          <NavLink
            to="/logout"
            className="inline-flex items-center gap-2 text-red-200/80 hover:text-red-100 transition-colors text-sm"
          >
            <FaSignOutAlt />
            <span>Déconnexion</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
