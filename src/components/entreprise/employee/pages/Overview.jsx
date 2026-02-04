// @ts-check
import React from 'react';

export default function EmployeeOverview() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-white font-bold text-xl">Vue Employé</h2>
        <p className="mt-2 text-slate-400">Bienvenue sur votre tableau de bord employé. Vous trouverez ici vos tâches, informations personnelles et notifications.</p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-700">Indicateur 1</div>
          <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-700">Indicateur 2</div>
          <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-700">Indicateur 3</div>
        </div>
      </div>
    </div>
  );
}
