// @ts-check
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStoredUser, getUserId } from '../lib/auth.js';
import { getMyDefaultEntrepriseAdminRoute } from '../lib/entrepriseStore.js';

export default function DashboardLanding() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getStoredUser();
    const userId = getUserId(user);
    if (!userId) {
      navigate('/login', { replace: true });
      return;
    }

    const adminRoute = getMyDefaultEntrepriseAdminRoute();
    if (adminRoute) {
      navigate(adminRoute, { replace: true });
      return;
    }

    navigate('/entreprise/creer', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center">
      <div className="text-slate-400 text-sm">Chargement du tableau de bord…</div>
    </div>
  );
}
