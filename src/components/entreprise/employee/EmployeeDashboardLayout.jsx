// @ts-check
import React, { useMemo } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { FaHome, FaTasks } from 'react-icons/fa';
import { getStoredUser, getUserDisplayName } from '../../../lib/auth.js';
import { getEntrepriseById } from '../../../lib/entrepriseStore.js';

function SideLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
          isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10',
        ].join(' ')
      }
      end
    >
      <span className="text-base opacity-90">{icon}</span>
      <span className="whitespace-nowrap">{label}</span>
    </NavLink>
  );
}

export default function EmployeeDashboardLayout() {
  const { entrepriseId } = useParams();
  const user = getStoredUser();

  const entreprise = useMemo(() => {
    if (!entrepriseId) return null;
    return getEntrepriseById(entrepriseId);
  }, [entrepriseId]);

  const base = entrepriseId ? `/entreprise/${entrepriseId}/employee` : '/dashboard';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-0 lg:h-screen border-b lg:border-b-0 lg:border-r border-slate-800/70 bg-slate-950/60 backdrop-blur">
          <div className="p-4 border-b border-slate-800/70">
            <div className="text-white font-extrabold tracking-wide">RH - Employé</div>
            <div className="mt-1 text-xs text-slate-400">{entreprise ? (entreprise.nom_commercial || entreprise.nom) : 'Entreprise'}</div>
          </div>
          <nav className="p-3 flex flex-col gap-1">
            <SideLink to={base} icon={<FaHome />} label="Vue" />
            <SideLink to={`${base}/tasks`} icon={<FaTasks />} label="Mes tâches" />
          </nav>
          <div className="p-4 border-t border-slate-800/70 text-xs text-slate-400">
            Connecté: <span className="text-slate-200">{getUserDisplayName(user)}</span>
          </div>
        </aside>

        <main className="min-h-screen">
          <header className="sticky top-0 z-30 bg-slate-950/70 backdrop-blur border-b border-slate-800/70">
            <div className="px-4 lg:px-8 py-4 flex items-center justify-between gap-4">
              <div>
                <h1 className="text-white font-bold text-lg">Espace Employé</h1>
                <p className="text-slate-400 text-sm">{entreprise ? (entreprise.nom_commercial || entreprise.nom) : 'Chargement…'}</p>
              </div>
              <a href="/logout" className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-red-500/15 text-red-200 hover:bg-red-500/25 transition-colors text-sm font-semibold">Déconnexion</a>
            </div>
          </header>

          <div className="px-4 lg:px-8 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
