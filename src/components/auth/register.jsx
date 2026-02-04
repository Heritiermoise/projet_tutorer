// @ts-check
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  // ✅ State du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    post_nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    mot_de_passe: '',
    confirmer_mot_de_passe: '',
    role: 'utilisateur',
  });

  const [errors, setErrors] = useState(/** @type {{[key: string]: string}} */ ({}));
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // ✅ Validation email
  /** @param {string} email */
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // ✅ Validation globale du formulaire
  const validateForm = () => {
    const newErrors = /** @type {{[key: string]: string}} */ ({});

    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    else if (!validateEmail(formData.email)) newErrors.email = "Format d'email invalide";
    if (!formData.telephone.trim()) newErrors.telephone = "Le téléphone est requis";
    if (!formData.adresse.trim()) newErrors.adresse = "L'adresse est requise";
    if (!formData.mot_de_passe.trim()) newErrors.mot_de_passe = "Le mot de passe est requis";
    else if (formData.mot_de_passe.length < 6) newErrors.mot_de_passe = "Le mot de passe doit contenir au moins 6 caractères";
    if (formData.mot_de_passe !== formData.confirmer_mot_de_passe) newErrors.confirmer_mot_de_passe = "Les mots de passe ne correspondent pas";
    if (!acceptTerms) newErrors.terms = "Vous devez accepter les conditions d'utilisation";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Gestion des changements de champs
  /** @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // ✅ Soumission du formulaire
  /** @param {React.FormEvent<HTMLFormElement>} e */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setSuccessMessage('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: formData.nom,
          post_nom: formData.post_nom,
          prenom: formData.prenom,
          email: formData.email,
          telephone: formData.telephone,
          adresse: formData.adresse,
          password: formData.mot_de_passe,
          password_confirmation: formData.confirmer_mot_de_passe,
          role: formData.role,
          statut: 'actif'
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Inscription réussie! Redirection vers la connexion...');
        setFormData({
          nom: '',
          post_nom: '',
          prenom: '',
          email: '',
          telephone: '',
          adresse: '',
          mot_de_passe: '',
          confirmer_mot_de_passe: '',
          role: 'utilisateur',
        });
        setAcceptTerms(false);

        setTimeout(() => window.location.href = '/login', 2000);
      } else {
        setErrors({ submit: data.errors ? JSON.stringify(data.errors) : data.message || 'Erreur lors de l\'inscription' });
      }
    } catch (error) {
      setErrors({ submit: 'Erreur serveur. Veuillez réessayer.' });
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl relative z-10">
        <div className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-slate-700/60 shadow-2xl overflow-hidden animate-fade-in">
          <div className="bg-linear-to-r from-blue-600 via-purple-600 to-emerald-600 p-6 sm:p-8 text-center flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">Créer un compte</h2>
            <p className="text-blue-100 text-sm font-medium tracking-wide">Remplissez les informations pour créer votre compte</p>
          </div>

          <div className="p-6 sm:p-8">
            {successMessage && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg animate-fade-in">
                <p className="text-green-400 text-sm">{successMessage}</p>
              </div>
            )}

            {errors.submit && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg animate-shake">
                <p className="text-red-400 text-sm">{errors.submit}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] lg:max-h-160 overflow-y-auto pr-2">
              {/* Nom */}
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2">Nom *</label>
                <input type="text" name="nom" value={formData.nom} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg bg-slate-800/70 border border-slate-700 focus:border-blue-500 text-white text-sm" />
                {errors.nom && <p className="text-red-400 text-xs mt-1">{errors.nom}</p>}
              </div>

              {/* Post-nom */}
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2">Post-nom</label>
                <input type="text" name="post_nom" value={formData.post_nom} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg bg-slate-800/70 border border-slate-700 focus:border-blue-500 text-white text-sm" />
              </div>

              {/* Prénom */}
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2">Prénom *</label>
                <input type="text" name="prenom" value={formData.prenom} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg bg-slate-800/70 border border-slate-700 focus:border-blue-500 text-white text-sm" />
                {errors.prenom && <p className="text-red-400 text-xs mt-1">{errors.prenom}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2">Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg bg-slate-800/70 border border-slate-700 focus:border-blue-500 text-white text-sm" />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Téléphone */}
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2">Téléphone *</label>
                <input type="tel" name="telephone" value={formData.telephone} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg bg-slate-800/70 border border-slate-700 focus:border-blue-500 text-white text-sm" />
                {errors.telephone && <p className="text-red-400 text-xs mt-1">{errors.telephone}</p>}
              </div>

              {/* Adresse */}
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2">Adresse *</label>
                <input type="text" name="adresse" value={formData.adresse} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg bg-slate-800/70 border border-slate-700 focus:border-blue-500 text-white text-sm" />
                {errors.adresse && <p className="text-red-400 text-xs mt-1">{errors.adresse}</p>}
              </div>

              {/* Rôle */}
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2">Type de compte</label>
                <select name="role" value={formData.role} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg bg-slate-800/70 border border-slate-700 focus:border-blue-500 text-white text-sm">
                  <option value="utilisateur">Utilisateur</option>
                  <option value="rh">Ressources Humaines</option>
                  <option value="manager">Manager</option>
                </select>
              </div>

              {/* Mot de passe */}
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2">Mot de passe *</label>
                <input type="password" name="mot_de_passe" value={formData.mot_de_passe} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg bg-slate-800/70 border border-slate-700 focus:border-blue-500 text-white text-sm" />
                {errors.mot_de_passe && <p className="text-red-400 text-xs mt-1">{errors.mot_de_passe}</p>}
              </div>

              {/* Confirmer mot de passe */}
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2">Confirmer mot de passe *</label>
                <input type="password" name="confirmer_mot_de_passe" value={formData.confirmer_mot_de_passe} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg bg-slate-800/70 border border-slate-700 focus:border-blue-500 text-white text-sm" />
                {errors.confirmer_mot_de_passe && <p className="text-red-400 text-xs mt-1">{errors.confirmer_mot_de_passe}</p>}
              </div>

              {/* Terms */}
              <div className="flex items-center gap-2">
                <input type="checkbox" id="terms" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} className="w-4 h-4 rounded bg-slate-800 border-slate-700 cursor-pointer accent-blue-600" />
                <label htmlFor="terms" className="text-slate-400 text-xs cursor-pointer">J'accepte les <a href="#" className="text-blue-400 hover:text-blue-300">conditions d'utilisation</a></label>
                {errors.terms && <p className="text-red-400 text-xs">{errors.terms}</p>}
              </div>

              <button type="submit" disabled={loading} className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg mt-4">{loading ? 'Création en cours...' : 'Créer un compte'}</button>
            </form>

            <p className="text-center text-slate-400 text-sm mt-4">
              Déjà inscrit? <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold ml-1">Se connecter</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
