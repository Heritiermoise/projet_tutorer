// @ts-check
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEntrepriseById, updateEntreprise } from '../../../../lib/entrepriseStore.js';

export default function Settings() {
  const { entrepriseId } = useParams();
  const entreprise = useMemo(() => (entrepriseId ? getEntrepriseById(entrepriseId) : null), [entrepriseId]);
  const [status, setStatus] = useState('');

  /** @param {React.FormEvent<HTMLFormElement>} e */
  const onSubmit = (e) => {
    e.preventDefault();
    setStatus('');
    if (!entrepriseId) return;
    try {
      const formData = new FormData(e.currentTarget);
      updateEntreprise(entrepriseId, {
        nom: String(formData.get('nom') || ''),
        nom_commercial: String(formData.get('nom_commercial') || ''),
        email: String(formData.get('email') || ''),
        telephone: String(formData.get('telephone') || ''),
        adresse: String(formData.get('adresse') || ''),
        description: String(formData.get('description') || ''),
      });
      setStatus('Enregistré ✅');
      setTimeout(() => setStatus(''), 1500);
    } catch {
      setStatus('Erreur lors de la sauvegarde.');
    }
  };

  if (!entreprise) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 text-slate-400">
        Entreprise introuvable.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-white font-bold text-xl">Paramètres</h2>
        <p className="text-slate-400 text-sm">Profil entreprise (stockage local pour le moment).</p>
      </div>

      <form
        key={entreprise.id}
        onSubmit={onSubmit}
        className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-300 text-sm font-semibold">Nom légal</label>
            <input
              className="mt-2 w-full px-4 py-3 rounded-lg bg-slate-800/70 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="nom"
              defaultValue={entreprise.nom}
            />
          </div>
          <div>
            <label className="text-slate-300 text-sm font-semibold">Nom commercial</label>
            <input
              className="mt-2 w-full px-4 py-3 rounded-lg bg-slate-800/70 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="nom_commercial"
              defaultValue={entreprise.nom_commercial || ''}
            />
          </div>
          <div>
            <label className="text-slate-300 text-sm font-semibold">Email</label>
            <input
              type="email"
              className="mt-2 w-full px-4 py-3 rounded-lg bg-slate-800/70 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="email"
              defaultValue={entreprise.email}
            />
          </div>
          <div>
            <label className="text-slate-300 text-sm font-semibold">Téléphone</label>
            <input
              className="mt-2 w-full px-4 py-3 rounded-lg bg-slate-800/70 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="telephone"
              defaultValue={entreprise.telephone}
            />
          </div>
        </div>

        <div>
          <label className="text-slate-300 text-sm font-semibold">Adresse</label>
          <input
            className="mt-2 w-full px-4 py-3 rounded-lg bg-slate-800/70 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="adresse"
            defaultValue={entreprise.adresse || ''}
          />
        </div>

        <div>
          <label className="text-slate-300 text-sm font-semibold">Description</label>
          <textarea
            className="mt-2 w-full px-4 py-3 rounded-lg bg-slate-800/70 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={4}
            name="description"
            defaultValue={entreprise.description || ''}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            type="submit"
            className="px-5 py-3 rounded-lg bg-white text-slate-950 font-bold hover:bg-blue-400 transition-colors"
          >
            Enregistrer
          </button>
          <div className="text-sm text-slate-400">{status}</div>
        </div>
      </form>
    </div>
  );
}
