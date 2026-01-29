// @ts-check
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: ''
  });
  const [errors, setErrors] = useState(/** @type {{[key: string]: string}} */ ({}));
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  /** @param {string} email */
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    const newErrors = /** @type {{[key: string]: string}} */ ({});

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.mot_de_passe.trim()) {
      newErrors.mot_de_passe = "Le mot de passe est requis";
    } else if (formData.mot_de_passe.length < 6) {
      newErrors.mot_de_passe = "Le mot de passe doit contenir au moins 6 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** @param {React.ChangeEvent<HTMLInputElement>} e */
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

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          mot_de_passe: formData.mot_de_passe
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        console.log('Connexion réussie');
        navigate('/dashboard', { replace: true });
      } else {
        setErrors({ submit: data.message || 'Erreur de connexion' });
      }
    } catch (error) {
      setErrors({ submit: 'Erreur serveur. Veuillez réessayer.' });
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4 sm:p-6 relative">
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
                {/* Logo ou icône simple */}
              </div>
            </div>
            <p className="text-blue-100 text-sm font-medium tracking-wide">Connexion sécurisée</p>
          </div>

          {/* Contenu */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 text-center">Bienvenue</h2>
              <p className="text-slate-400 text-sm mb-4 text-center">Connectez-vous à votre espace professionnel</p>
            </div>

            {errors.submit && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg animate-shake">
                <p className="text-red-400 text-sm text-center">{errors.submit}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="flex items-center gap-1 text-slate-300 text-sm font-semibold mb-2">
                  <span className="material-icons text-blue-400">mail</span> Adresse Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="votre.email@exemple.com"
                    className={`w-full px-4 py-3 rounded-lg bg-slate-800/70 border transition-all duration-300 focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-red-500 focus:border-red-400 focus:ring-red-500/20'
                        : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/20'
                    } text-white placeholder-slate-500 shadow-sm`}
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

              <div>
                <label className="flex items-center gap-1 text-slate-300 text-sm font-semibold mb-2">
                  <span className="material-icons text-blue-400">lock</span> Mot de Passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="mot_de_passe"
                    value={formData.mot_de_passe}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 rounded-lg bg-slate-800/70 border transition-all duration-300 focus:outline-none focus:ring-2 ${
                      errors.mot_de_passe
                        ? 'border-red-500 focus:border-red-400 focus:ring-red-500/20'
                        : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/20'
                    } text-white placeholder-slate-500 pr-12 shadow-sm`}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors text-xl"
                    tabIndex={-1}
                  >
                    <span className="material-icons">{showPassword ? 'visibility' : 'visibility_off'}</span>
                  </button>
                  {errors.mot_de_passe && (
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-red-400 text-lg material-icons">error</span>
                  )}
                </div>
                {errors.mot_de_passe && (
                  <p className="text-red-400 text-xs mt-1">{errors.mot_de_passe}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-slate-400">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-800 border-slate-700 accent-blue-600"
                  />
                  Se souvenir de moi
                </label>
                <Link to="/reset-password" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                  Mot de passe oublié ?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-linear-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none text-lg tracking-wide"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2"><span className="material-icons animate-spin">autorenew</span> Connexion...</span>
                ) : (
                  <span className="flex items-center justify-center gap-2"><span className="material-icons">login</span> Se Connecter</span>
                )}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-900/80 text-slate-400">Ou</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="py-2 bg-slate-800 hover:bg-blue-700 rounded-lg transition-colors text-center text-slate-300 text-sm font-medium flex items-center justify-center gap-1 shadow"
                >
                  <span className="material-icons text-red-400"></span> Google
                </button>
                <button
                  type="button"
                  className="py-2 bg-slate-800 hover:bg-blue-700 rounded-lg transition-colors text-center text-slate-300 text-sm font-medium flex items-center justify-center gap-1 shadow"
                >
                  <span className="material-icons text-blue-600">facebook</span> Facebook
                </button>
                <button
                  type="button"
                  className="py-2 bg-slate-800 hover:bg-blue-700 rounded-lg transition-colors text-center text-slate-300 text-sm font-medium flex items-center justify-center gap-1 shadow"
                >
                  <span className="material-icons text-blue-400">linkedin</span> LinkedIn
                </button>
              </div>

              <p className="text-center text-slate-400 text-sm mt-4">
                Pas encore inscrit ?
                <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold ml-1 transition-colors">
                  Créer un compte
                </Link>
              </p>
            </form>
          </div>

          <div className="bg-slate-800/60 border-t border-slate-700 px-8 py-4 text-center text-slate-400 text-xs">
            <p>&copy; 2026 BD_RH Manager - Tous droits réservés</p>
          </div>
        </div>

        <div className="text-center mt-6 text-slate-400 text-sm">
          <p>Besoin d'aide? <a href="#support" className="text-blue-400 hover:text-blue-300 font-semibold">Contactez le support</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;