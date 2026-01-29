// @ts-check
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEntreprise } from '../../lib/entrepriseStore.js';
import { getStoredUser, getUserId } from '../../lib/auth.js';

const Entreprise = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getStoredUser();
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    nom: '',
    nom_commercial: '',
    email: '',
    telephone: '',
    password: '',
    photo_profil: null,
    photo_couverture: null,
    description: '',
    adresse: ''
  });
  const [errors, setErrors] = useState(/** @type {{[key: string]: string}} */ ({}));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const validateForm = () => {
    const newErrors = /** @type {{[key: string]: string}} */ ({});
    if (!formData.nom.trim()) newErrors.nom = "Le nom de l'entreprise est requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    if (!formData.telephone.trim()) newErrors.telephone = "Le téléphone est requis";
    if (!formData.password.trim()) newErrors.password = "Le mot de passe est requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e */
  const handleChange = (e) => {
    const target = e.target;
    const { name, value } = target;

    // Champs fichiers: on conserve un File|null
    if (target instanceof HTMLInputElement && target.type === 'file') {
      const file = target.files && target.files[0] ? target.files[0] : null;
      setFormData((prev) => ({
        ...prev,
        [name]: file
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  /** @param {React.FormEvent<HTMLFormElement>} e */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const user = getStoredUser();
    const userId = getUserId(user);
    if (!userId) {
      setErrors({ submit: 'Veuillez vous connecter pour créer une entreprise.' });
      navigate('/login', { replace: true });
      return;
    }

    setLoading(true);
    setSuccess('');
    try {
      // MVP pro: stockage local multi-entreprises. À remplacer ensuite par un vrai backend.
      await new Promise((r) => setTimeout(r, 600));
      const entreprise = createEntreprise(
        {
          nom: formData.nom,
          nom_commercial: formData.nom_commercial,
          email: formData.email,
          telephone: formData.telephone,
          description: formData.description,
          adresse: formData.adresse,
        },
        String(userId)
      );

      setSuccess('Entreprise créée avec succès ! Redirection...');
      setLoading(false);
      navigate(`/entreprise/${entreprise.id}/admin`, { replace: true });
    } catch {
      setErrors({ submit: "Erreur lors de la création." });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4 sm:p-6 relative">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl relative z-10">
        <div className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-slate-700/60 shadow-2xl overflow-hidden animate-fade-in">
          <div className="bg-linear-to-r from-blue-600 via-purple-600 to-emerald-600 p-6 sm:p-8 text-center flex flex-col items-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-blue-600 shadow-lg text-2xl">
                <span className="material-icons">business</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 text-center">Créer une entreprise</h2>
            <p className="text-blue-100 text-sm font-medium tracking-wide">Remplissez les informations de votre entreprise</p>
          </div>
          <div className="p-6 sm:p-8">
            {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">{success}</div>}
            {errors.submit && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">{errors.submit}</div>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2 flex items-center gap-1">Nom de l'entreprise *</label>
                <input type="text" name="nom" value={formData.nom} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg bg-slate-800/70 border transition-all duration-300 focus:outline-none focus:ring-2 ${errors.nom ? 'border-red-400 focus:ring-red-400' : 'border-slate-700 focus:ring-blue-500'}`} />
                {errors.nom && <p className="text-red-400 text-xs mt-1">{errors.nom}</p>}
              </div>
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2 flex items-center gap-1">Nom commercial</label>
                <input type="text" name="nom_commercial" value={formData.nom_commercial} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-slate-800/70 border border-slate-700 focus:border-blue-500 focus:outline-none transition-all duration-300" />
              </div>
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2 flex items-center gap-1">Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg bg-slate-800/70 border transition-all duration-300 focus:outline-none focus:ring-2 ${errors.email ? 'border-red-400 focus:ring-red-400' : 'border-slate-700 focus:ring-blue-500'}`} />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2 flex items-center gap-1">Téléphone *</label>
                <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg bg-slate-800/70 border transition-all duration-300 focus:outline-none focus:ring-2 ${errors.telephone ? 'border-red-400 focus:ring-red-400' : 'border-slate-700 focus:ring-blue-500'}`} />
                {errors.telephone && <p className="text-red-400 text-xs mt-1">{errors.telephone}</p>}
              </div>
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2 flex items-center gap-1">Mot de passe *</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg bg-slate-800/70 border transition-all duration-300 focus:outline-none focus:ring-2 ${errors.password ? 'border-red-400 focus:ring-red-400' : 'border-slate-700 focus:ring-blue-500'}`} />
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2 flex items-center gap-1">Photo de profil</label>
                <input type="file" name="photo_profil" accept="image/*" onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-slate-800/70 border border-slate-700 focus:border-blue-500 focus:outline-none transition-all duration-300" />
              </div>
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2 flex items-center gap-1">Photo de couverture</label>
                <input type="file" name="photo_couverture" accept="image/*" onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-slate-800/70 border border-slate-700 focus:border-blue-500 focus:outline-none transition-all duration-300" />
              </div>
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2 flex items-center gap-1">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-slate-800/70 border border-slate-700 focus:border-blue-500 focus:outline-none transition-all duration-300 resize-none" rows={3} />
              </div>
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2 flex items-center gap-1">Adresse</label>
                <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-slate-800/70 border border-slate-700 focus:border-blue-500 focus:outline-none transition-all duration-300" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 px-4 bg-linear-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none text-lg tracking-wide mt-2">
                {loading ? (
                  <span className="flex items-center justify-center gap-2"><span className="material-icons animate-spin">autorenew</span> Création...</span>
                ) : (
                  <span className="flex items-center justify-center gap-2"><span className="material-icons">business</span> Créer l'entreprise</span>
                )}
              </button>
            </form>
          </div>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Entreprise;
