// @ts-check
import React from 'react';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { getStoredUser, getUserId } from '../lib/auth.js';
import { getMembershipRole, setCurrentEntrepriseId } from '../lib/entrepriseStore.js';

export default function RequireEntrepriseMember() {
  const { entrepriseId } = useParams();
  const location = useLocation();
  const user = getStoredUser();
  const userId = getUserId(user);

  if (!entrepriseId) return <Navigate to="/dashboard" replace />;
  if (!userId) return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  const role = getMembershipRole(entrepriseId, String(userId));
  if (!role) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center p-6">
        <div className="max-w-lg w-full rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h1 className="text-xl font-bold text-white">Accès refusé</h1>
          <p className="mt-2 text-slate-400 text-sm">Vous n’êtes pas membre de cette entreprise.</p>
          <div className="mt-4">
            <a className="inline-flex px-4 py-2 rounded-lg bg-white text-slate-950 font-semibold" href="/dashboard">
              Retour au tableau de bord
            </a>
          </div>
        </div>
      </div>
    );
  }

  setCurrentEntrepriseId(entrepriseId);
  return <Outlet />;
}
