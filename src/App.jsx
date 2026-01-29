// @ts-check
import React from 'react';

import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Login from './components/auth/login.jsx';
import Register from './components/auth/register.jsx';
import Menu from './components/common/Menu.jsx';
import { useState } from 'react';
import Entreprise from './components/entreprise/Entreprise.jsx';
import Footer from './components/common/Footer.jsx';

import RequireAuth from './routes/RequireAuth.jsx';
import RequireEntrepriseAdmin from './routes/RequireEntrepriseAdmin.jsx';
import DashboardLanding from './routes/DashboardLanding.jsx';
import Logout from './routes/Logout.jsx';

import AdminDashboardLayout from './components/entreprise/admin/AdminDashboardLayout.jsx';
import AdminOverview from './components/entreprise/admin/pages/Overview.jsx';
import AdminMembers from './components/entreprise/admin/pages/Members.jsx';
import AdminSettings from './components/entreprise/admin/pages/Settings.jsx';

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
      <header className="py-10 px-2 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32 w-full relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-[520px] h-[520px] bg-blue-500/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-[520px] h-[520px] bg-emerald-500/10 blur-3xl rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto text-center px-2 sm:px-4 md:px-8 relative">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider text-blue-300 uppercase bg-blue-400/10 rounded-full border border-blue-400/20">
            Plateforme RH multi-entreprises
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            Le tableau de bord RH <span className="bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">simple</span>,
            <span className="block">moderne et prêt pour la production.</span>
          </h1>

          <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto">
            Chaque utilisateur peut créer sa propre entreprise et gérer ses données en toute autonomie.
            Le dashboard admin est unique et réutilisable pour toutes les entreprises: il se charge selon l’ID de l’entreprise.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/entreprise/creer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-slate-950 font-bold hover:bg-blue-400 transition-colors shadow-xl"
            >
              Créer mon entreprise
            </a>
            <a
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-white/15 transition-colors font-semibold border border-white/10"
            >
              Se connecter
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-4">
              <div className="text-white font-bold">Multi-entreprises</div>
              <div className="text-slate-400 text-sm mt-1">Chaque entreprise a son espace admin isolé.</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-4">
              <div className="text-white font-bold">Rôles & accès</div>
              <div className="text-slate-400 text-sm mt-1">Admin entreprise, puis permissions fines.</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-4">
              <div className="text-white font-bold">Évolutif</div>
              <div className="text-slate-400 text-sm mt-1">Prêt à connecter au backend et à scaler.</div>
            </div>
          </div>
        </div>
      </header>

      {/* How it works */}
      <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 pb-10 md:pb-12">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 md:p-8">
          <h2 className="text-white font-extrabold text-2xl">Comment ça marche</h2>
          <p className="mt-2 text-slate-400 text-sm">
            Un parcours clair pour les nouveaux utilisateurs, avec un accès au dashboard uniquement après création d’entreprise.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
              <div className="text-blue-300 font-bold">1. Créez un compte</div>
              <div className="text-slate-400 text-sm mt-2">Inscription + connexion sécurisée.</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
              <div className="text-emerald-300 font-bold">2. Créez votre entreprise</div>
              <div className="text-slate-400 text-sm mt-2">Vous devenez admin de votre entreprise automatiquement.</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
              <div className="text-purple-300 font-bold">3. Accédez au dashboard</div>
              <div className="text-slate-400 text-sm mt-2">Overview, membres, paramètres (et modules RH à brancher).</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <main className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 pb-10 md:pb-16 lg:pb-20">
        <div className="mb-6 md:mb-10">
          <h2 className="text-white font-extrabold text-2xl">Modules du projet</h2>
          <p className="mt-2 text-slate-400 text-sm max-w-3xl">
            Cette page présente le périmètre fonctionnel. Le dashboard admin sert de point d’entrée unique pour gérer l’entreprise,
            et chaque module pourra ensuite être connecté à l’API et à la base de données.
          </p>
        </div>
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
              Explorer (bientôt)
            </button>
          </div>
        </div>

        {/* Professional details / trust */}
        <div className="mt-10 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
            <h3 className="text-white font-bold text-lg">Qualité & bonnes pratiques</h3>
            <ul className="mt-3 text-sm text-slate-400 space-y-2 list-disc pl-5">
              <li>Routing clair et protégé (auth + admin entreprise).</li>
              <li>Dashboard réutilisable pour toutes les entreprises.</li>
              <li>UI Tailwind cohérente, responsive et lisible.</li>
              <li>Préparation pour branchement backend (API / DB / permissions).</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
            <h3 className="text-white font-bold text-lg">Pour les nouveaux venus</h3>
            <p className="mt-3 text-sm text-slate-400">
              Commencez par créer un compte, puis créez votre entreprise.
              Une fois l’entreprise créée, vous êtes redirigé automatiquement vers le dashboard admin.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="/register" className="inline-flex px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/15 transition-colors font-semibold">
                Créer un compte
              </a>
              <a href="/entreprise/creer" className="inline-flex px-4 py-2 rounded-lg bg-white text-slate-950 font-bold hover:bg-blue-400 transition-colors">
                Créer une entreprise
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
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
        <Outlet />
      </div>

      {/* Footer FIXE */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages publiques (avec Menu + Footer) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/entreprise/creer" element={<Entreprise />} />
        </Route>

        {/* Utilitaires */}
        <Route path="/logout" element={<Logout />} />

        {/* Dashboard (protégé) */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<DashboardLanding />} />

          <Route path="/entreprise/:entrepriseId/admin" element={<RequireEntrepriseAdmin />}>
            <Route element={<AdminDashboardLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="members" element={<AdminMembers />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;