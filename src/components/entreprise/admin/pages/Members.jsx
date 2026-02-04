// @ts-check
import React, { useMemo } from 'react';
import { getStoredUser, getUserId } from '../../../../lib/auth.js';
import { listEntrepriseMembers } from '../../../../lib/entrepriseStore.js';

export default function Members() {
  const entrepriseId = (() => {
    try {
      const match = window.location.pathname.match(/\/entreprise\/([^/]+)/);
      return match ? decodeURIComponent(match[1]) : undefined;
    } catch (e) {
      return undefined;
    }
  })();
  const user = getStoredUser();
  const userId = getUserId(user);

  const members = useMemo(() => {
    if (!entrepriseId) return [];
    return listEntrepriseMembers(entrepriseId);
  }, [entrepriseId]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-xl">Membres</h2>
          <p className="text-slate-400 text-sm">Gestion des accès à l’entreprise (MVP en localStorage).</p>
        </div>
        <button
          type="button"
          className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/15 transition-colors font-semibold"
          onClick={() => alert('Fonction Invitation: à connecter au backend (email + rôle).')}
        >
          Inviter
        </button>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-950/40 text-slate-300">
              <tr>
                <th className="text-left font-semibold px-4 py-3">Utilisateur</th>
                <th className="text-left font-semibold px-4 py-3">Rôle</th>
                <th className="text-left font-semibold px-4 py-3">Ajouté le</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {members.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-slate-400" colSpan={3}>
                    Aucun membre trouvé.
                  </td>
                </tr>
              ) : (
                members.map((m) => (
                  <tr key={`${m.entrepriseId}:${m.userId}`} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-slate-200">
                      {String(m.userId)}{userId && String(m.userId) === String(userId) ? ' (vous)' : ''}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex px-2 py-1 rounded-md bg-white/10 text-slate-200">
                        {m.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{new Date(m.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
