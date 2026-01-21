// @ts-check
import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/login.jsx';
import Register from './components/auth/register.jsx';
import Menu from './components/common/Menu.jsx';
import { useState } from 'react';
import Entreprise from './components/entreprise/Entreprise.jsx';
import Footer from './components/common/Footer.jsx';

/**
 * @param {{title: string, description: string, icon: React.ReactNode, color: string}} props
 */
const FeatureCard = ({ title, description, icon, color }) => (
  <div className={`p-6 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-all duration-300 group shadow-lg`}>
    <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">
      {description}
    </p>
  </div>
);


function HomePage() {
  // ...modules et FeatureCard comme avant...
  const modules = [
    {
      title: "Gestion des Employés",
      description: "Suivi complet des fiches employés (Matricule, Sexe, Adresse) et gestion des postes par service.",
      icon: "👥",
      color: "bg-blue-500/20 text-blue-400"
    },
    {
      title: "Recrutement & Offres",
      description: "Publication d'offres d'emploi, gestion des candidats et suivi des postulations et entretiens.",
      icon: "📢",
      color: "bg-purple-500/20 text-purple-400"
    },
    {
      title: "Contrats & Documents",
      description: "Gestion des types de contrats (CDI, CDD), salaires de base et archivage des documents numériques.",
      icon: "📜",
      color: "bg-emerald-500/20 text-emerald-400"
    },
    {
      title: "Paie & Avantages",
      description: "Génération des fiches de paie mensuelles et suivi des avantages (primes, bonus) attribués.",
      icon: "💰",
      color: "bg-amber-500/20 text-amber-400"
    },
    {
      title: "Présences & Pointage",
      description: "Contrôle des présences journalières avec système de justification pour les absences.",
      icon: "📅",
      color: "bg-red-500/20 text-red-400"
    },
    {
      title: "Administration RH",
      description: "Gestion multi-entreprises, services internes et contrôle d'accès des utilisateurs système.",
      icon: "🏢",
      color: "bg-cyan-500/20 text-cyan-400"
    }
  ];
  return (
    <>
      {/* Hero Section */}
      <header className="py-10 px-2 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32 w-full">
        <div className="max-w-4xl mx-auto text-center px-2 sm:px-4 md:px-8">
          <span className="px-3 py-1 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-400/10 rounded-full border border-blue-400/20">
            Base de Données RH Connectée
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            Gérez votre capital humain avec <span className="bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">précision.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 leading-relaxed">   
            Une interface moderne synchronisée avec votre base MariaDB. 
            Visualisez les tables <code className="text-blue-300">employe</code>, 
            <code className="text-blue-300">contrat</code> et <code className="text-blue-300">paie</code> en un clin d'œil.
          </p>
        </div>
      </header>
      {/* Features Grid */}
      <main className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 pb-10 md:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 xl:gap-8">
          {modules.map((module, index) => (
            <FeatureCard key={index} {...module} />
          ))}
        </div>
        {/* SQL Status Indicator */}
        <div className="mt-10 md:mt-16 p-4 md:p-8 rounded-2xl bg-linear-to-br from-slate-900 to-slate-800 border border-slate-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full border-2 border-slate-800 bg-blue-600 flex items-center justify-center">SQL</div>
                <div className="w-10 h-10 rounded-full border-2 border-slate-800 bg-emerald-600 flex items-center justify-center text-xs">VITE</div>
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">Statut du Système</h4>
                <p className="text-slate-400 text-sm">Tailwind CSS v3.4 + React fonctionnels</p>
              </div>
            </div>
            <button className="w-full md:w-auto px-6 md:px-8 py-3 bg-white text-slate-950 font-bold rounded-lg hover:bg-blue-400 transition-colors shadow-xl">
              Explorer la Base de Données
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans overflow-x-hidden">
        {/* Header FIXE: menu (desktop) + barre mobile */}
        <header className="fixed top-0 left-0 right-0 z-50">
          <div className="hidden md:block bg-slate-950/70 backdrop-blur border-b border-slate-800/60">
            <Menu />
          </div>
          <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-950/90 backdrop-blur border-b border-slate-800/70">
            <span className="text-xl font-bold text-white">RH Manager</span>
            <button
              className="flex flex-col gap-1.5 p-2"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <span className="w-6 h-0.5 bg-white block"></span>
              <span className="w-6 h-0.5 bg-white block"></span>
              <span className="w-6 h-0.5 bg-white block"></span>
            </button>
          </div>
        </header>
        {/* Menu mobile overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-60 bg-black/40 flex">
            <Menu mobile onClose={() => setMobileMenuOpen(false)} />
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}
        {/* Contenu principal: défile sous le menu + au-dessus du footer */}
        <div className="w-full max-w-screen-2xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 flex flex-col pt-20 md:pt-24 pb-16">
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/entreprise/creer" element={<Entreprise />} />
            </Routes>
          </div>
        </div>

        {/* Footer FIXE */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;