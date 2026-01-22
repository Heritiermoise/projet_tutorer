// @ts-check
import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBriefcase,
  FaBuilding,
  FaChevronDown,
  FaChevronUp,
  FaCogs,
  FaHome,
  FaIdBadge,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserPlus,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";

/** @typedef {{ title: string, link: string, icon?: React.ReactNode }} MenuLink */
/** @typedef {{ title: string, icon?: React.ReactNode, items: MenuLink[] }} MenuGroup */

const brandName = "RH Manager";

/** @returns {Array<MenuLink | MenuGroup>} */
function useMenuDefinition() {
  return useMemo(
    () => [
      { title: "Accueil", link: "/", icon: <FaHome /> },
      {
        title: "Accès",
        icon: <FaIdBadge />,
        items: [
          { title: "Connexion", link: "/login", icon: <FaSignInAlt /> },
          { title: "Inscription", link: "/register", icon: <FaUserPlus /> },
        ],
      },
      {
        title: "Employés",
        icon: <FaUsers />,
        items: [
          { title: "Liste des employés", link: "/employes" },
          { title: "Ajouter un employé", link: "/employes/ajouter" },
          { title: "Contrats", link: "/contrats" },
          { title: "Documents", link: "/documents" },
          { title: "Fiches de paie", link: "/fiches-paie" },
          { title: "Présence", link: "/presence" },
        ],
      },
      {
        title: "Organisation",
        icon: <FaBriefcase />,
        items: [
          { title: "Services", link: "/services" },
          { title: "Postes", link: "/postes" },
          { title: "Ajouter un poste", link: "/postes/ajouter" },
        ],
      },
      {
        title: "Recrutement",
        icon: <FaUserTie />,
        items: [
          { title: "Offres demploi", link: "/offres" },
          { title: "Candidats", link: "/candidats" },
          { title: "Postulations", link: "/postulations" },
          { title: "Entretiens", link: "/entretiens" },
        ],
      },
      {
        title: "Entreprise",
        icon: <FaBuilding />,
        items: [
          { title: "Créer une entreprise", link: "/entreprise/creer" },
          { title: "Liste dev (privée)", link: "/entreprise/liste-dev" },
        ],
      },
      { title: "Paramètres", link: "/parametres", icon: <FaCogs /> },
    ],
    []
  );
}

/**
 * @param {{ to: string, icon?: React.ReactNode, title: string, onNavigate?: () => void, className?: string }} props
 */
function MenuLinkItem({ to, icon, title, onNavigate, className }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
          isActive
            ? "bg-white/10 text-white"
            : "text-white/85 hover:text-white hover:bg-white/10",
          className || "",
        ].join(" ")
      }
    >
      {icon ? <span className="text-base opacity-90">{icon}</span> : null}
      <span className="whitespace-nowrap">{title}</span>
    </NavLink>
  );
}

/**
 * @param {{ mobile?: boolean, onClose?: () => void }} props
 */
export default function Menu({ mobile = false, onClose = () => {} }) {
  const menu = useMenuDefinition();
  const [openGroupTitle, setOpenGroupTitle] = useState(/** @type {string | null} */ (null));

  /** @param {string} title */
  const toggleGroup = (title) => {
    setOpenGroupTitle((prev) => (prev === title ? null : title));
  };

  if (mobile) {
    return (
      <nav className="w-72 sm:w-80 h-full bg-linear-to-br from-blue-700 via-emerald-500 to-blue-400 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/15">
          <span className="text-xl font-bold text-white">{brandName}</span>
          <button
            type="button"
            onClick={onClose}
            className="text-3xl text-white leading-none"
            aria-label="Fermer le menu"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-1 p-2 overflow-y-auto">
          {menu.map((entry) => {
            if ("items" in entry) {
              const isOpen = openGroupTitle === entry.title;
              return (
                <div key={entry.title} className="rounded-xl bg-white/5">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-3 py-2 text-white"
                    onClick={() => toggleGroup(entry.title)}
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base opacity-90">{entry.icon}</span>
                      <span className="font-medium">{entry.title}</span>
                    </span>
                    <span className="opacity-90">
                      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </button>
                  {isOpen ? (
                    <div className="pb-2">
                      {entry.items.map((item) => (
                        <MenuLinkItem
                          key={item.title}
                          to={item.link}
                          title={item.title}
                          icon={item.icon}
                          onNavigate={onClose}
                          className="mx-2"
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <MenuLinkItem
                key={entry.title}
                to={entry.link}
                title={entry.title}
                icon={entry.icon}
                onNavigate={onClose}
                className="bg-white/5"
              />
            );
          })}

          <div className="mt-6 pt-4 border-t border-white/15">
            <MenuLinkItem
              to="/logout"
              title="Déconnexion"
              icon={<FaSignOutAlt />}
              onNavigate={onClose}
              className="bg-red-500/10 text-red-50 hover:bg-red-500/20"
            />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="hidden md:block w-full bg-slate-950/80 backdrop-blur border-b border-slate-800/70">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-3 flex items-center gap-6">
        <NavLink to="/" className="text-white font-extrabold tracking-wide">
          {brandName}
        </NavLink>

        <div className="flex flex-nowrap items-center gap-2 text-sm overflow-x-auto no-scrollbar whitespace-nowrap">
          {menu.map((entry) => {
            if (!("items" in entry)) {
              return (
                <MenuLinkItem
                  key={entry.title}
                  to={entry.link}
                  title={entry.title}
                  icon={entry.icon}
                />
              );
            }

            const isOpen = openGroupTitle === entry.title;

            return (
              <div key={entry.title} className="relative">
                <button
                  type="button"
                  className={[
                    "inline-flex items-center gap-2 rounded-lg px-3 py-2 transition-colors",
                    isOpen
                      ? "bg-white/10 text-white"
                      : "text-white/85 hover:text-white hover:bg-white/10",
                  ].join(" ")}
                  onClick={() => toggleGroup(entry.title)}
                  aria-expanded={isOpen}
                >
                  <span className="text-base opacity-90">{entry.icon}</span>
                  <span className="whitespace-nowrap">{entry.title}</span>
                  <span className="opacity-80">
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>

                {isOpen ? (
                  <div className="absolute left-0 top-full mt-3 w-72 max-h-80 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/95 backdrop-blur shadow-2xl z-50">
                    <div className="p-2">
                      {entry.items.map((item) => (
                        <MenuLinkItem
                          key={item.title}
                          to={item.link}
                          title={item.title}
                          icon={item.icon}
                          onNavigate={() => setOpenGroupTitle(null)}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="ml-auto">
          <MenuLinkItem
            to="/logout"
            title="Déconnexion"
            icon={<FaSignOutAlt />}
            className="text-red-200/90 hover:text-red-100"
          />
        </div>
      </div>
    </nav>
  );
}
