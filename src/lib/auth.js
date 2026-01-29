// @ts-check

/** @typedef {Record<string, any>} AnyRecord */

export function getToken() {
  return localStorage.getItem('token');
}

/** @returns {AnyRecord | null} */
export function getStoredUser() {
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return /** @type {AnyRecord} */ (parsed);
    return null;
  } catch {
    return null;
  }
}

/**
 * Tolérant aux formats backend différents.
 * @param {AnyRecord | null} user
 * @returns {string | number | null}
 */
export function getUserId(user) {
  if (!user) return null;
  return (
    user.id ??
    user.user_id ??
    user.id_user ??
    user.utilisateur_id ??
    user.ID ??
    null
  );
}

/** @param {AnyRecord | null} user */
export function getUserDisplayName(user) {
  if (!user) return 'Utilisateur';
  const full = [user.prenom, user.nom].filter(Boolean).join(' ').trim();
  return full || user.email || 'Utilisateur';
}

export function isAuthenticated() {
  return Boolean(getToken() && getStoredUser());
}

export function signOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('currentEntrepriseId');
}
