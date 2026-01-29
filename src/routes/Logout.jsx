// @ts-check
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../lib/auth.js';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    signOut();
    navigate('/login', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center">
      <div className="text-slate-400 text-sm">Déconnexion…</div>
    </div>
  );
}
