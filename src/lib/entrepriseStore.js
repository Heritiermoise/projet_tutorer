// @ts-check

import { getStoredUser, getUserId } from './auth.js';

/** @typedef {{ id: string, nom: string, nom_commercial?: string, email: string, telephone: string, description?: string, adresse?: string, createdAt: string, ownerUserId: string }} Entreprise */
/** @typedef {{ entrepriseId: string, userId: string, role: 'admin' | 'manager' | 'viewer', createdAt: string }} EntrepriseMembership */

const KEYS = {
  entreprises: 'entreprises',
  memberships: 'entrepriseMemberships',
  current: 'currentEntrepriseId',
};

/**
 * @template T
 * @param {string} key
 * @param {T} fallback
 * @returns {T}
 */
function readJson(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return /** @type {T} */ (JSON.parse(raw));
  } catch {
    return fallback;
  }
}

/** @param {string} key @param {any} value */
function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function newId() {
  // eslint-disable-next-line no-undef
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return `ent_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

/** @returns {Entreprise[]} */
export function listEntreprises() {
  return readJson(KEYS.entreprises, /** @type {Entreprise[]} */ ([]));
}

/** @returns {EntrepriseMembership[]} */
export function listMemberships() {
  return readJson(KEYS.memberships, /** @type {EntrepriseMembership[]} */ ([]));
}

/** @param {string} entrepriseId */
export function getEntrepriseById(entrepriseId) {
  return listEntreprises().find((e) => e.id === entrepriseId) || null;
}

/**
 * @param {string} entrepriseId
 * @param {Partial<Omit<Entreprise, 'id' | 'createdAt' | 'ownerUserId'>>} patch
 */
export function updateEntreprise(entrepriseId, patch) {
  const entreprises = listEntreprises();
  const idx = entreprises.findIndex((e) => e.id === entrepriseId);
  if (idx === -1) throw new Error('Entreprise introuvable');
  entreprises[idx] = { ...entreprises[idx], ...patch };
  writeJson(KEYS.entreprises, entreprises);
  return entreprises[idx];
}

/** @param {string} entrepriseId */
export function setCurrentEntrepriseId(entrepriseId) {
  localStorage.setItem(KEYS.current, entrepriseId);
}

export function getCurrentEntrepriseId() {
  return localStorage.getItem(KEYS.current);
}

/**
 * @param {string} entrepriseId
 * @param {string} userId
 */
export function getMembershipRole(entrepriseId, userId) {
  const memberships = listMemberships();
  const found = memberships.find((m) => m.entrepriseId === entrepriseId && m.userId === userId);
  return found?.role ?? null;
}

/** @param {string} entrepriseId */
export function listEntrepriseMembers(entrepriseId) {
  return listMemberships().filter((m) => m.entrepriseId === entrepriseId);
}

/**
 * @param {{ nom: string, nom_commercial?: string, email: string, telephone: string, description?: string, adresse?: string }} payload
 * @param {string} ownerUserId
 * @returns {Entreprise}
 */
export function createEntreprise(payload, ownerUserId) {
  const entreprises = listEntreprises();
  const memberships = listMemberships();

  const entreprise = /** @type {Entreprise} */ ({
    id: newId(),
    nom: payload.nom,
    nom_commercial: payload.nom_commercial || '',
    email: payload.email,
    telephone: payload.telephone,
    description: payload.description || '',
    adresse: payload.adresse || '',
    createdAt: new Date().toISOString(),
    ownerUserId,
  });

  entreprises.push(entreprise);
  memberships.push({
    entrepriseId: entreprise.id,
    userId: ownerUserId,
    role: 'admin',
    createdAt: new Date().toISOString(),
  });

  writeJson(KEYS.entreprises, entreprises);
  writeJson(KEYS.memberships, memberships);
  setCurrentEntrepriseId(entreprise.id);
  return entreprise;
}

/**
 * Retourne les entreprises où l'utilisateur a un membership.
 * @param {string} userId
 */
export function listEntreprisesForUser(userId) {
  const memberships = listMemberships().filter((m) => m.userId === userId);
  const entreprises = listEntreprises();
  return memberships
    .map((m) => {
      const ent = entreprises.find((e) => e.id === m.entrepriseId);
      return ent ? { entreprise: ent, role: m.role } : null;
    })
    .filter(Boolean);
}

export function getMyDefaultEntrepriseAdminRoute() {
  const user = getStoredUser();
  const userId = getUserId(user);
  if (!userId) return null;
  const entries = listEntreprisesForUser(String(userId));
  const admin = entries.find((e) => e && e.role === 'admin');
  if (!admin) return null;
  return `/entreprise/${admin.entreprise.id}/admin`;
}
