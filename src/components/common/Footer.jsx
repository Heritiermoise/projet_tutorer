// @ts-check
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/75 backdrop-blur border-t border-slate-800/70">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="text-xs text-slate-400 text-center sm:text-left">
          © 2026 Projet Tutoré — Système de Gestion RH.
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <NavLink to="/" className="hover:text-slate-200 transition-colors">Accueil</NavLink>
          <NavLink to="/login" className="hover:text-slate-200 transition-colors">Connexion</NavLink>
          <NavLink to="/register" className="hover:text-slate-200 transition-colors">Inscription</NavLink>
          <NavLink to="/entreprise/creer" className="hover:text-slate-200 transition-colors">Entreprise</NavLink>
        </div>
      </div>
    </footer>
  );
}
