// import React, { useState } from 'react';

// const PasswordReset = () => {
//   const [step, setStep] = useState(1); // 1: email, 2: code, 3: nouveau mdp
//   const [formData, setFormData] = useState({
//     email: '',
//     code: '',
//     mot_de_passe: '',
//     confirmer_mot_de_passe: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const validateEmail = (email) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const handleStep1 = async (e) => {
//     e.preventDefault();
//     const newErrors = {};

//     if (!formData.email.trim()) {
//       newErrors.email = "L'email est requis";
//     } else if (!validateEmail(formData.email)) {
//       newErrors.email = "Format d'email invalide";
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/send-reset-code', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           email: formData.email
//         })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccessMessage('Un code de réinitialisation a été envoyé à votre email');
//         setStep(2);
//       } else {
//         setErrors({ submit: data.message || 'Email non trouvé' });
//       }
//     } catch (error) {
//       setErrors({ submit: 'Erreur serveur. Veuillez réessayer.' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStep2 = async (e) => {
//     e.preventDefault();
//     const newErrors = {};

//     if (!formData.code.trim()) {
//       newErrors.code = "Le code de réinitialisation est requis";
//     } else if (formData.code.length !== 6) {
//       newErrors.code = "Le code doit contenir 6 caractères";
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/verify-reset-code', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           code: formData.code
//         })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccessMessage('Code valide. Créez votre nouveau mot de passe');
//         setStep(3);
//       } else {
//         setErrors({ submit: data.message || 'Code invalide ou expiré' });
//       }
//     } catch (error) {
//       setErrors({ submit: 'Erreur serveur. Veuillez réessayer.' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStep3 = async (e) => {
//     e.preventDefault();
//     const newErrors = {};

//     if (!formData.mot_de_passe.trim()) {
//       newErrors.mot_de_passe = "Le mot de passe est requis";
//     } else if (formData.mot_de_passe.length < 6) {
//       newErrors.mot_de_passe = "Le mot de passe doit contenir au moins 6 caractères";
//     }

//     if (formData.mot_de_passe !== formData.confirmer_mot_de_passe) {
//       newErrors.confirmer_mot_de_passe = "Les mots de passe ne correspondent pas";
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/reset-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           code: formData.code,
//           mot_de_passe: formData.mot_de_passe
//         })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccessMessage('Mot de passe réinitialisé avec succès! Redirection vers la connexion...');
//         setTimeout(() => {
//           window.location.href = '/login';
//         }, 2000);
//       } else {
//         setErrors({ submit: data.message || 'Erreur lors de la réinitialisation' });
//       }
//     } catch (error) {
//       setErrors({ submit: 'Erreur serveur. Veuillez réessayer.' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
//       {/* Fond animé */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
//       </div>

//       <div className="w-full max-w-md relative z-10">
//         {/* Container principal */}
//         <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
          
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-8 text-center">
//             <div className="flex items-center justify-center gap-3 mb-3">
//               <div className="w-10 h-10 bg-white rounded flex items-center justify-center font-bold text-blue-600">
//                 RH
//               </div>
//               <h1 className="text-2xl font-bold text-white">BD_RH Manager</h1>
//             </div>
//             <p className="text-blue-100 text-sm">Réinitialisation de mot de passe</p>
//           </div>

//           {/* Contenu */}
//           <div className="p-8">
//             {/* Indicateur de progression */}
//             <div className="flex gap-2 mb-6">
//               <div className={`flex-1 h-2 rounded-full transition-all ${step >= 1 ? 'bg-blue-600' : 'bg-slate-700'}`}></div>
//               <div className={`flex-1 h-2 rounded-full transition-all ${step >= 2 ? 'bg-blue-600' : 'bg-slate-700'}`}></div>
//               <div className={`flex-1 h-2 rounded-full transition-all ${step >= 3 ? 'bg-blue-600' : 'bg-slate-700'}`}></div>
//             </div>

//             <h2 className="text-2xl font-bold text-white mb-2">
//               {step === 1 && "Récupérer votre compte"}
//               {step === 2 && "Vérifier le code"}
//               {step === 3 && "Nouveau mot de passe"}
//             </h2>
//             <p className="text-slate-400 text-sm mb-6">
//               {step === 1 && "Entrez votre email pour recevoir un code de réinitialisation"}
//               {step === 2 && "Vérifiez votre email et entrez le code reçu"}
//               {step === 3 && "Créez un nouveau mot de passe sécurisé"}
//             </p>

//             {/* Message de succès */}
//             {successMessage && (
//               <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
//                 <p className="text-green-400 text-sm">{successMessage}</p>
//               </div>
//             )}

//             {/* Message d'erreur */}
//             {errors.submit && (
//               <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
//                 <p className="text-red-400 text-sm">{errors.submit}</p>
//               </div>
//             )}

//             {/* Étape 1: Email */}
//             {step === 1 && (
//               <form onSubmit={handleStep1} className="space-y-5">
//                 <div>
//                   <label className="block text-slate-300 text-sm font-medium mb-2">
//                     Adresse Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="votre.email@exemple.com"
//                     className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border transition-all duration-300 focus:outline-none ${
//                       errors.email
//                         ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20'
//                         : 'border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
//                     } text-white placeholder-slate-500`}
//                   />
//                   {errors.email && (
//                     <p className="text-red-400 text-xs mt-1">{errors.email}</p>
//                   )}
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none"
//                 >
//                   {loading ? 'Envoi en cours...' : 'Envoyer le code'}
//                 </button>
//               </form>
//             )}

//             {/* Étape 2: Code */}
//             {step === 2 && (
//               <form onSubmit={handleStep2} className="space-y-5">
//                 <div>
//                   <label className="block text-slate-300 text-sm font-medium mb-2">
//                     Code de Réinitialisation
//                   </label>
//                   <input
//                     type="text"
//                     name="code"
//                     value={formData.code}
//                     onChange={handleInputChange}
//                     placeholder="000000"
//                     maxLength="6"
//                     className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border transition-all duration-300 focus:outline-none text-center text-2xl font-bold tracking-widest ${
//                       errors.code
//                         ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20'
//                         : 'border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
//                     } text-white placeholder-slate-500`}
//                   />
//                   {errors.code && (
//                     <p className="text-red-400 text-xs mt-1">{errors.code}</p>
//                   )}
//                 </div>

//                 <div className="text-center">
//                   <p className="text-slate-400 text-sm">
//                     Vous n'avez pas reçu le code? 
//                     <button 
//                       type="button"
//                       onClick={() => {
//                         setStep(1);
//                         setSuccessMessage('');
//                       }}
//                       className="text-blue-400 hover:text-blue-300 font-semibold ml-1"
//                     >
//                       Renvoyez-le
//                     </button>
//                   </p>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none"
//                 >
//                   {loading ? 'Vérification...' : 'Vérifier le code'}
//                 </button>
//               </form>
//             )}

//             {/* Étape 3: Nouveau mot de passe */}
//             {step === 3 && (
//               <form onSubmit={handleStep3} className="space-y-5">
//                 <div>
//                   <label className="block text-slate-300 text-sm font-medium mb-2">
//                     Nouveau Mot de Passe
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? 'text' : 'password'}
//                       name="mot_de_passe"
//                       value={formData.mot_de_passe}
//                       onChange={handleInputChange}
//                       placeholder="••••••••"
//                       className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border transition-all duration-300 focus:outline-none ${
//                         errors.mot_de_passe
//                           ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20'
//                           : 'border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
//                       } text-white placeholder-slate-500 pr-10`}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
//                     >
//                       {showPassword ? '👁️' : '👁️‍🗨️'}
//                     </button>
//                   </div>
//                   {errors.mot_de_passe && (
//                     <p className="text-red-400 text-xs mt-1">{errors.mot_de_passe}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-slate-300 text-sm font-medium mb-2">
//                     Confirmer le Mot de Passe
//                   </label>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="confirmer_mot_de_passe"
//                     value={formData.confirmer_mot_de_passe}
//                     onChange={handleInputChange}
//                     placeholder="••••••••"
//                     className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border transition-all duration-300 focus:outline-none ${
//                       errors.confirmer_mot_de_passe
//                         ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20'
//                         : 'border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
//                     } text-white placeholder-slate-500`}
//                   />
//                   {errors.confirmer_mot_de_passe && (
//                     <p className="text-red-400 text-xs mt-1">{errors.confirmer_mot_de_passe}</p>
//                   )}
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none"
//                 >
//                   {loading ? 'Mise à jour...' : 'Réinitialiser le mot de passe'}
//                 </button>
//               </form>
//             )}

//             {/* Retour */}
//             <div className="mt-6 text-center">
//               <a href="/login" className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors">
//                 ← Retour à la connexion
//               </a>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="bg-slate-800/50 border-t border-slate-700 px-8 py-4 text-center text-slate-400 text-xs">
//             <p>&copy; 2026 BD_RH Manager - Tous droits réservés</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PasswordReset;