// @ts-check
import React, { useMemo } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getEntrepriseById } from '../../../../lib/entrepriseStore.js';

/**
 * @param {{ title: string, value: string, hint: string }} props
 */
function StatCard({ title, value, hint }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 shadow-xl">
      <div className="text-slate-400 text-sm">{title}</div>
      <div className="mt-2 text-3xl font-extrabold text-white">{value}</div>
      <div className="mt-2 text-xs text-slate-500">{hint}</div>
    </div>
  );
}

export default function Overview() {
  const { entrepriseId } = useParams();
  const entreprise = useMemo(() => (entrepriseId ? getEntrepriseById(entrepriseId) : null), [entrepriseId]);
  const base = entrepriseId ? `/entreprise/${entrepriseId}/admin` : '/dashboard';

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-linear-to-br from-slate-900/60 to-slate-950 p-6">
        <h2 className="text-white font-bold text-xl">Bienvenue</h2>
        <p className="mt-2 text-slate-400 text-sm">
          Vous administrez <span className="text-slate-200 font-semibold">{entreprise ? (entreprise.nom_commercial || entreprise.nom) : 'votre entreprise'}</span>.
          Ce dashboard est le même pour toutes les entreprises: il s’adapte selon l’ID dans l’URL.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <NavLink
            to={`${base}/settings`}
            className="inline-flex px-4 py-2 rounded-lg bg-white text-slate-950 font-semibold"
          >
            Configurer l’entreprise
          </NavLink>
          <NavLink
            to={`${base}/members`}
            className="inline-flex px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/15 transition-colors font-semibold"
          >
            Gérer les membres
          </NavLink>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Employés" value="0" hint="Connectez le module employés" />
        <StatCard title="Présences" value="0" hint="Connectez le module pointage" />
        <StatCard title="Offres" value="0" hint="Connectez le module recrutement" />
        <StatCard title="Documents" value="0" hint="Connectez le module RH" />
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
        <h3 className="text-white font-bold">Prochaines étapes</h3>
        <ul className="mt-3 text-sm text-slate-400 space-y-2 list-disc pl-5">
          <li>Brancher une API backend (entreprises, employés, services, paie).</li>
          <li>Ajouter des permissions fines (admin / manager / viewer).</li>
          <li>Activer l’audit log et l’export (CSV/PDF).</li>
        </ul>
      </div>
    </div>
  );
}
