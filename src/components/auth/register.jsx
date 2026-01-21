// @ts-check
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    nom: '',
    post_nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    mot_de_passe: '',
    confirmer_mot_de_passe: '',
    role: 'utilisateur'
  });

  const [errors, setErrors] = useState(/** @type {{[key: string]: string}} */ ({}));
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  /** @param {string} email */
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    const newErrors = /** @type {{[key: string]: string}} */ ({});

    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis";
    }
    if (!formData.prenom.trim()) {
      newErrors.prenom = "Le prénom est requis";
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    if (!formData.telephone.trim()) {
      newErrors.telephone = "Le téléphone est requis";
    }
    if (!formData.adresse.trim()) {
      newErrors.adresse = "L'adresse est requise";
    }
    if (!formData.mot_de_passe.trim()) {
      newErrors.mot_de_passe = "Le mot de passe est requis";
    } else if (formData.mot_de_passe.length < 6) {
      newErrors.mot_de_passe = "Le mot de passe doit contenir au moins 6 caractères";
    }
    if (formData.mot_de_passe !== formData.confirmer_mot_de_passe) {
      newErrors.confirmer_mot_de_passe = "Les mots de passe ne correspondent pas";
    }
    if (!acceptTerms) {
      newErrors.terms = "Vous devez accepter les conditions d'utilisation";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>} e */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /** @param {React.FormEvent<HTMLFormElement>} e */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:3000/ProjetTutore/routes/api.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nom: formData.nom,
          post_nom: formData.post_nom,
          prenom: formData.prenom,
          email: formData.email,
          telephone: formData.telephone,
          adresse: formData.adresse,
          mot_de_passe: formData.mot_de_passe,
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
          role: 'utilisateur'
        });
        setAcceptTerms(false);
        
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setErrors({ submit: data.message || 'Erreur lors de l\'inscription' });
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
      {/* Fond animé */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl relative z-10">
        {/* Container principal */}
        <div className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-slate-700/60 shadow-2xl overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 via-purple-600 to-emerald-600 p-6 sm:p-8 text-center flex flex-col items-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-blue-600 shadow-lg text-2xl">
                {/* Logo ou icône simple, pas de nom */}
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 text-center">Créer un compte</h2>
            <p className="text-blue-100 text-sm font-medium tracking-wide">Remplissez les informations pour créer votre compte</p>
          </div>

          {/* Contenu */}
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">Inscription</h2>
            <p className="text-slate-400 text-sm mb-6 text-center">Remplissez tous les champs pour créer votre compte professionnel</p>

            {/* Message de succès */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg animate-fade-in">
                <p className="text-green-400 text-sm">{successMessage}</p>
              </div>
            )}

            {/* Message d'erreur global */}
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg animate-shake">
                <p className="text-red-400 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] lg:max-h-160 overflow-y-auto pr-2">
              {/* Nom et Post-nom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 text-sm font-semibold mb-2 flex items-center gap-1">
                    <span className="material-icons text-blue-400">badge</span> Nom *
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    placeholder="Dupont"
                    className={`w-full px-4 py-2 rounded-lg bg-slate-800/70 border transition-all duration-300 focus:outline-none focus:ring-2 ${
                      errors.nom
                        ? 'border-red-500 focus:border-red-400 focus:ring-red-500/20'
                        : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/20'
                    } text-white placeholder-slate-500 text-sm shadow-sm`}
                  />
                  {errors.nom && (
                    <p className="text-red-400 text-xs mt-1">{errors.nom}</p>
                  )}
                </div>
                <div>
                  <label className="text-slate-300 text-sm font-semibold mb-2 flex items-center gap-1">
                    <span className="material-icons text-blue-400">badge</span> Post-nom
                  </label>
                  <input
                    type="text"
                    name="post_nom"
                    value={formData.post_nom}
                    onChange={handleInputChange}
                    placeholder="Martin"
                    className="w-full px-4 py-2 rounded-lg bg-slate-800/70 border border-slate-700 focus:border-blue-500 text-white placeholder-slate-500 text-sm focus:outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Prénom */}
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2 flex items-center gap-1">
                  <span className="material-icons text-blue-400">badge</span> Prénom *
                </label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  placeholder="Jean"
                  className={`w-full px-4 py-2 rounded-lg bg-slate-800/70 border transition-all duration-300 focus:outline-none focus:ring-2 ${
                    errors.prenom
                      ? 'border-red-500 focus:border-red-400 focus:ring-red-500/20'
                      : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/20'
                  } text-white placeholder-slate-500 text-sm shadow-sm`}
                />
                {errors.prenom && (
                  <p className="text-red-400 text-xs mt-1">{errors.prenom}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-slate-300 text-sm font-semibold mb-2 flex items-center gap-1">
                  <span className="material-icons text-blue-400">mail</span> Email *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@exemple.com"
                    className={`w-full px-4 py-2 rounded-lg bg-slate-800/70 border transition-all duration-300 focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-red-500 focus:border-red-400 focus:ring-red-500/20'
                        : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/20'
                    } text-white placeholder-slate-500 text-sm shadow-sm`}
                    autoComplete="username"
                  />
                  {errors.email && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 text-lg material-icons">error</span>
                  )}
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  placeholder="+243 123 456 789"
                  className={`w-full px-4 py-2 rounded-lg bg-slate-800/50 border transition-all duration-300 focus:outline-none ${
                    errors.telephone
                      ? 'border-red-500 focus:border-red-400'
                      : 'border-slate-700 focus:border-blue-500'
                  } text-white placeholder-slate-500 text-sm`}
                />
                {errors.telephone && (
                  <p className="text-red-400 text-xs mt-1">{errors.telephone}</p>
                )}
              </div>

              {/* Adresse */}
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Adresse *
                </label>
                <input
                  type="text"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleInputChange}
                  placeholder="123 Rue de la Paix"
                  className={`w-full px-4 py-2 rounded-lg bg-slate-800/50 border transition-all duration-300 focus:outline-none ${
                    errors.adresse
                      ? 'border-red-500 focus:border-red-400'
                      : 'border-slate-700 focus:border-blue-500'
                  } text-white placeholder-slate-500 text-sm`}
                />
                {errors.adresse && (
                  <p className="text-red-400 text-xs mt-1">{errors.adresse}</p>
                )}
              </div>

              {/* Rôle */}
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Type de Compte
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-blue-500 text-white focus:outline-none text-sm transition-all"
                >
                  <option value="utilisateur">Utilisateur Standard</option>
                  <option value="rh">Ressources Humaines</option>
                  <option value="manager">Manager</option>
                </select>
              </div>

              {/* Mot de passe */}
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Mot de Passe *
                </label>
                <input
                  type="password"
                  name="mot_de_passe"
                  value={formData.mot_de_passe}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2 rounded-lg bg-slate-800/50 border transition-all duration-300 focus:outline-none ${
                    errors.mot_de_passe
                      ? 'border-red-500 focus:border-red-400'
                      : 'border-slate-700 focus:border-blue-500'
                  } text-white placeholder-slate-500 text-sm`}
                />
                {errors.mot_de_passe && (
                  <p className="text-red-400 text-xs mt-1">{errors.mot_de_passe}</p>
                )}
              </div>

              {/* Confirmer mot de passe */}
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Confirmer le Mot de Passe *
                </label>
                <input
                  type="password"
                  name="confirmer_mot_de_passe"
                  value={formData.confirmer_mot_de_passe}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2 rounded-lg bg-slate-800/50 border transition-all duration-300 focus:outline-none ${
                    errors.confirmer_mot_de_passe
                      ? 'border-red-500 focus:border-red-400'
                      : 'border-slate-700 focus:border-blue-500'
                  } text-white placeholder-slate-500 text-sm`}
                />
                {errors.confirmer_mot_de_passe && (
                  <p className="text-red-400 text-xs mt-1">{errors.confirmer_mot_de_passe}</p>
                )}
              </div>

              {/* Conditions d'utilisation */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-800 border-slate-700 cursor-pointer accent-blue-600"
                />
                <label htmlFor="terms" className="text-slate-400 text-xs cursor-pointer">
                  J'accepte les <a href="#" className="text-blue-400 hover:text-blue-300">conditions d'utilisation</a>
                </label>
                {errors.terms && (
                  <p className="text-red-400 text-xs">{errors.terms}</p>
                )}
              </div>

              {/* Bouton Inscription */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-linear-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none mt-4"
              >
                {loading ? 'Création en cours...' : 'Créer un Compte'}
              </button>

              {/* Lien connexion */}
              <p className="text-center text-slate-400 text-sm">
                Déjà inscrit? 
                <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold ml-1">
                  Se connecter
                </Link>
              </p>
            </form>
          </div>

          {/* Footer */}
          <div className="bg-slate-800/50 border-t border-slate-700 px-8 py-4 text-center text-slate-400 text-xs">
            <p>&copy; 2026 BD_RH Manager - Tous droits réservés</p>
          </div>
        </div>

        {/* Lien de support */}
        <div className="text-center mt-6 text-slate-400 text-sm">
          <p>Besoin d'aide? <a href="#support" className="text-blue-400 hover:text-blue-300 font-semibold">Contactez le support</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;