// @ts-check
import React from 'react';

export default function EmployeeTasks() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-white font-bold text-xl">Mes tâches</h2>
        <p className="mt-2 text-slate-400">Liste simplifiée des tâches assignées.</p>

        <div className="mt-4">
          <ul className="space-y-2">
            <li className="p-3 rounded bg-slate-800/30 border border-slate-700">Aucune tâche pour le moment</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
