-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 02 fév. 2026 à 19:42
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bd_backendrhm`
--

-- --------------------------------------------------------

--
-- Structure de la table `avantages`
--

CREATE TABLE `avantages` (
  `id_avantage` bigint(20) UNSIGNED NOT NULL,
  `libelle` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `type_avantage` varchar(50) NOT NULL,
  `valeur` varchar(50) NOT NULL,
  `date_expiration` datetime DEFAULT NULL,
  `statut` varchar(10) NOT NULL DEFAULT 'Actif',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `matricule` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `avantages`
--

INSERT INTO `avantages` (`id_avantage`, `libelle`, `description`, `type_avantage`, `valeur`, `date_expiration`, `statut`, `created_at`, `updated_at`, `matricule`) VALUES
(1, 'Prime transport', NULL, 'Prime', '100', NULL, 'Actif', '2026-01-28 09:29:39', NULL, 'EMP001'),
(2, 'Assurance', NULL, 'Social', 'Complète', NULL, 'Actif', '2026-01-28 09:29:39', NULL, 'EMP002');

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `candidats`
--

CREATE TABLE `candidats` (
  `id_candidat` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(50) NOT NULL,
  `post_nom` varchar(50) NOT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `candidats`
--

INSERT INTO `candidats` (`id_candidat`, `nom`, `post_nom`, `prenom`, `email`, `telephone`, `created_at`, `updated_at`) VALUES
(1, 'Kasongo', 'Lwamba', 'David', 'david@gmail.com', '+243811111111', '2026-01-28 09:29:39', NULL),
(2, 'Mbuyi', 'Kabongo', 'Alice', 'alice@gmail.com', '+243822222222', '2026-01-28 09:29:39', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `contrats`
--

CREATE TABLE `contrats` (
  `id_contrat` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(50) NOT NULL,
  `date_debut` date NOT NULL,
  `details` text DEFAULT NULL,
  `salaire_base` decimal(15,2) NOT NULL,
  `date_fin` date DEFAULT NULL,
  `contrat` varchar(50) NOT NULL,
  `statut` varchar(10) NOT NULL DEFAULT 'En_attente',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `matricule` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `contrats`
--

INSERT INTO `contrats` (`id_contrat`, `type`, `date_debut`, `details`, `salaire_base`, `date_fin`, `contrat`, `statut`, `created_at`, `updated_at`, `matricule`) VALUES
(1, 'CDI', '2024-01-01', NULL, 1200.00, NULL, 'Temps plein', 'En_attente', '2026-01-28 09:29:39', NULL, 'EMP001'),
(2, 'CDD', '2024-02-01', NULL, 1000.00, NULL, '6 mois', 'En_attente', '2026-01-28 09:29:39', NULL, 'EMP002');

-- --------------------------------------------------------

--
-- Structure de la table `documents`
--

CREATE TABLE `documents` (
  `id_document` bigint(20) UNSIGNED NOT NULL,
  `type_document` varchar(100) NOT NULL,
  `fichier` varchar(255) NOT NULL,
  `statut` varchar(10) NOT NULL DEFAULT 'Soumis',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `matricule` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `documents`
--

INSERT INTO `documents` (`id_document`, `type_document`, `fichier`, `statut`, `created_at`, `updated_at`, `matricule`) VALUES
(1, 'Contrat', 'contrat_emp001.pdf', 'Soumis', '2026-01-28 09:29:39', NULL, 'EMP001'),
(2, 'Diplôme', 'diplome_emp002.pdf', 'Soumis', '2026-01-28 09:29:39', NULL, 'EMP002');

-- --------------------------------------------------------

--
-- Structure de la table `employes`
--

CREATE TABLE `employes` (
  `matricule` varchar(20) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `post_nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `sexe` varchar(2) NOT NULL,
  `date_naissance` date NOT NULL,
  `lieu_naissance` varchar(100) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `date_embauche` date NOT NULL DEFAULT curdate(),
  `statut` varchar(10) NOT NULL DEFAULT 'Actif',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id_poste` bigint(20) UNSIGNED NOT NULL,
  `id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `employes`
--

INSERT INTO `employes` (`matricule`, `nom`, `post_nom`, `prenom`, `sexe`, `date_naissance`, `lieu_naissance`, `adresse`, `telephone`, `email`, `date_embauche`, `statut`, `created_at`, `updated_at`, `id_poste`, `id`) VALUES
('EMP001', 'Mukendi', 'Kalala', 'Jean', 'M', '1995-03-12', 'Kinshasa', 'Limete', '+243810000002', 'jean@rhm.com', '2026-01-28', 'Actif', '2026-01-28 09:29:39', NULL, 1, 2),
('EMP002', 'Kabeya', 'Mutombo', 'Grace', 'F', '1997-07-10', 'Lubumbashi', 'Kamalondo', '+243810000003', 'grace@rhm.com', '2026-01-28', 'Actif', '2026-01-28 09:29:39', NULL, 2, 3),
('EMP003', 'Tshibangu', 'Mbuyi', 'Patrick', 'M', '1992-11-05', 'Mbuji-Mayi', 'Diulu', '+243810000004', 'patrick@rhm.com', '2026-01-28', 'Actif', '2026-01-28 09:29:39', NULL, 1, 4),
('EMP004', 'Ilunga', 'Kanku', 'Sarah', 'F', '1996-02-20', 'Kananga', 'Ndesha', '+243810000005', 'sarah@rhm.com', '2026-01-28', 'Actif', '2026-01-28 09:29:39', NULL, 3, 5);

-- --------------------------------------------------------

--
-- Structure de la table `entreprises`
--

CREATE TABLE `entreprises` (
  `id_entreprise` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `password` varchar(20) NOT NULL,
  `photo_profil` varchar(255) DEFAULT NULL,
  `photo_couverture` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `statut` varchar(10) NOT NULL DEFAULT 'Actif',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `entreprises`
--

INSERT INTO `entreprises` (`id_entreprise`, `nom`, `email`, `telephone`, `password`, `photo_profil`, `photo_couverture`, `description`, `adresse`, `statut`, `created_at`, `updated_at`) VALUES
(1, 'Tech RDC', 'contact@techrdc.com', '+243810000001', 'password', NULL, NULL, NULL, NULL, 'Actif', '2026-01-28 09:29:39', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `entretiens`
--

CREATE TABLE `entretiens` (
  `id_entretien` bigint(20) UNSIGNED NOT NULL,
  `lieu` varchar(255) NOT NULL,
  `note` text DEFAULT NULL,
  `statut` varchar(10) NOT NULL DEFAULT 'Planifié',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id_postulation` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `entretiens`
--

INSERT INTO `entretiens` (`id_entretien`, `lieu`, `note`, `statut`, `created_at`, `updated_at`, `id_postulation`) VALUES
(1, 'Salle RH', NULL, 'Planifié', '2026-01-28 09:29:39', NULL, 1),
(2, 'Salle IT', NULL, 'Planifié', '2026-01-28 09:29:39', NULL, 2);

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `fiche_paies`
--

CREATE TABLE `fiche_paies` (
  `id_paie` bigint(20) UNSIGNED NOT NULL,
  `mois_paiement` varchar(50) NOT NULL,
  `annee_paiement` varchar(50) NOT NULL,
  `montant` decimal(35,2) NOT NULL,
  `statut` varchar(10) NOT NULL DEFAULT 'Générée',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `matricule` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `fiche_paies`
--

INSERT INTO `fiche_paies` (`id_paie`, `mois_paiement`, `annee_paiement`, `montant`, `statut`, `created_at`, `updated_at`, `matricule`) VALUES
(1, 'Janvier', '2026', 1200.00, 'Générée', '2026-01-28 09:29:39', NULL, 'EMP001'),
(2, 'Janvier', '2026', 1000.00, 'Générée', '2026-01-28 09:29:39', NULL, 'EMP002');

-- --------------------------------------------------------

--
-- Structure de la table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_01_22_144815_create_entreprises_table', 1),
(5, '2026_01_22_150808_create_offre_emplois_table', 1),
(6, '2026_01_22_151927_create_services_table', 1),
(7, '2026_01_22_152131_create_postes_table', 1),
(8, '2026_01_22_153021_create_employes_table', 1),
(9, '2026_01_22_160037_create_candidats_table', 1),
(10, '2026_01_22_161405_create_fiche_paies_table', 1),
(11, '2026_01_22_162159_create_contrats_table', 1),
(12, '2026_01_22_162423_create_avantages_table', 1),
(13, '2026_01_22_162556_create_documents_table', 1),
(14, '2026_01_22_162912_create_presences_table', 1),
(15, '2026_01_22_192656_create_postulations_table', 1),
(16, '2026_01_22_192843_create_entretiens_table', 1),
(17, '2026_01_22_193059_create_participants_table', 1),
(18, '2026_01_29_140419_create_personal_access_tokens_table', 2),
(19, '2026_02_02_154548_add_fields_to_users_table', 3);

-- --------------------------------------------------------

--
-- Structure de la table `offre_emplois`
--

CREATE TABLE `offre_emplois` (
  `id_offre` bigint(20) UNSIGNED NOT NULL,
  `titre` varchar(50) NOT NULL,
  `description` varchar(50) NOT NULL,
  `photo` varchar(50) DEFAULT NULL,
  `date_limite` datetime NOT NULL,
  `salaire_base` decimal(15,2) NOT NULL,
  `statut` varchar(10) NOT NULL DEFAULT 'Publiée',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id_entreprise` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `offre_emplois`
--

INSERT INTO `offre_emplois` (`id_offre`, `titre`, `description`, `photo`, `date_limite`, `salaire_base`, `statut`, `created_at`, `updated_at`, `id_entreprise`) VALUES
(1, 'Développeur Laravel', 'Backend API', NULL, '2026-12-31 00:00:00', 1500.00, 'Publiée', '2026-01-28 09:29:39', NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `participants`
--

CREATE TABLE `participants` (
  `matricule` varchar(20) NOT NULL,
  `id_entretien` bigint(20) UNSIGNED NOT NULL,
  `details` text DEFAULT NULL,
  `decision` varchar(50) DEFAULT NULL,
  `statut` varchar(10) NOT NULL DEFAULT 'Invité',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `participants`
--

INSERT INTO `participants` (`matricule`, `id_entretien`, `details`, `decision`, `statut`, `created_at`, `updated_at`) VALUES
('EMP001', 1, NULL, NULL, 'Invité', '2026-01-28 09:29:39', NULL),
('EMP002', 2, NULL, NULL, 'Invité', '2026-01-28 09:29:39', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 3, 'auth_token', '4a7f82cdbd024e3262bd8f61af63ecd054717c43bc180590aeb58fd8df38e844', '[\"*\"]', NULL, NULL, '2026-02-02 13:05:30', '2026-02-02 13:05:30'),
(2, 'App\\Models\\User', 3, 'auth_token', '6bb8141b6357ddc7a20ce52508f8164d4e3d88b68491b225c8c56664048b2a30', '[\"*\"]', '2026-02-02 13:06:55', NULL, '2026-02-02 13:06:42', '2026-02-02 13:06:55'),
(3, 'App\\Models\\User', 3, 'auth_token', '0e8fd9f1f5a9b6557a96f0cf9af28985398762226cc4ab3d83b756a7362f00b6', '[\"*\"]', NULL, NULL, '2026-02-02 13:07:26', '2026-02-02 13:07:26'),
(4, 'App\\Models\\User', 3, 'auth_token', '08c7079fb783c121b9412fe46d7edc86eebb79b463a3c7bc2e49fb06aa9b1cba', '[\"*\"]', '2026-02-02 16:11:27', NULL, '2026-02-02 13:14:35', '2026-02-02 16:11:27'),
(5, 'App\\Models\\User', 3, 'auth_token', 'ee53afca591922116ce49d62b41b91e7d351a0fab09bdf66f13a5a610e369014', '[\"*\"]', '2026-02-02 16:13:56', NULL, '2026-02-02 16:11:59', '2026-02-02 16:13:56'),
(6, 'App\\Models\\User', 3, 'auth_token', '6ec99aeaf29776f0c300215621a6a03d700bdef89a815a319d3d062f436b7df8', '[\"*\"]', '2026-02-02 16:52:20', NULL, '2026-02-02 16:14:06', '2026-02-02 16:52:20'),
(7, 'App\\Models\\User', 3, 'auth_token', '5ded1fdc2c97a10cae325347ad604db1412c73e30d748410c703832749a23eb7', '[\"*\"]', '2026-02-02 16:52:56', NULL, '2026-02-02 16:52:40', '2026-02-02 16:52:56'),
(8, 'App\\Models\\User', 3, 'auth_token', '6a0060ece2ad96ce4aaf90e1619b615be51ff5ad37c551d202a3d700f8658ec1', '[\"*\"]', '2026-02-02 17:13:39', NULL, '2026-02-02 16:53:07', '2026-02-02 17:13:39'),
(9, 'App\\Models\\User', 8, 'auth_token', '936eca723d6ab2d9be6ff53b230877cb3448707bb83795a11e0edfc4132c259f', '[\"*\"]', NULL, NULL, '2026-02-02 17:12:50', '2026-02-02 17:12:50'),
(10, 'App\\Models\\User', 9, 'auth_token', '0b9e232504222e999df57e278288e502fff9b2c9f044987fae6bf51ba85f830e', '[\"*\"]', NULL, NULL, '2026-02-02 17:13:34', '2026-02-02 17:13:34');

-- --------------------------------------------------------

--
-- Structure de la table `postes`
--

CREATE TABLE `postes` (
  `id_poste` bigint(20) UNSIGNED NOT NULL,
  `titre_poste` varchar(50) NOT NULL,
  `detail` text NOT NULL,
  `statut` varchar(10) NOT NULL DEFAULT 'Vacant',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id_service` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `postes`
--

INSERT INTO `postes` (`id_poste`, `titre_poste`, `detail`, `statut`, `created_at`, `updated_at`, `id_service`) VALUES
(1, 'Développeur', 'Développement web', 'Vacant', '2026-01-28 09:29:39', NULL, 1),
(2, 'RH Manager', 'Gestion RH', 'Vacant', '2026-01-28 09:29:39', NULL, 2),
(3, 'Comptable', 'Gestion comptable', 'Vacant', '2026-01-28 09:29:39', NULL, 3);

-- --------------------------------------------------------

--
-- Structure de la table `postulations`
--

CREATE TABLE `postulations` (
  `id_postulation` bigint(20) UNSIGNED NOT NULL,
  `cv` varchar(255) NOT NULL,
  `lettre` text NOT NULL,
  `statut` varchar(10) NOT NULL DEFAULT 'Soumise',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id_candidat` bigint(20) UNSIGNED NOT NULL,
  `id_offre` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `postulations`
--

INSERT INTO `postulations` (`id_postulation`, `cv`, `lettre`, `statut`, `created_at`, `updated_at`, `id_candidat`, `id_offre`) VALUES
(1, 'cv_david.pdf', 'Motivation', 'Soumise', '2026-01-28 09:29:39', NULL, 1, 1),
(2, 'cv_alice.pdf', 'Motivation', 'Soumise', '2026-01-28 09:29:39', NULL, 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `presences`
--

CREATE TABLE `presences` (
  `id_presence` bigint(20) UNSIGNED NOT NULL,
  `justification` varchar(50) DEFAULT NULL,
  `statut` varchar(10) NOT NULL DEFAULT 'Présent',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `matricule` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `presences`
--

INSERT INTO `presences` (`id_presence`, `justification`, `statut`, `created_at`, `updated_at`, `matricule`) VALUES
(1, NULL, 'Présent', '2026-01-28 09:29:39', NULL, 'EMP001'),
(2, NULL, 'Présent', '2026-01-28 09:29:39', NULL, 'EMP002');

-- --------------------------------------------------------

--
-- Structure de la table `services`
--

CREATE TABLE `services` (
  `id_service` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `statut` varchar(10) NOT NULL DEFAULT 'Actif',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id_entreprise` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `services`
--

INSERT INTO `services` (`id_service`, `nom`, `description`, `statut`, `created_at`, `updated_at`, `id_entreprise`) VALUES
(1, 'Informatique', 'Service IT', 'Actif', '2026-01-28 09:29:39', NULL, 1),
(2, 'RH', 'Ressources humaines', 'Actif', '2026-01-28 09:29:39', NULL, 1),
(3, 'Finance', 'Service financier', 'Actif', '2026-01-28 09:29:39', NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('0cF5cwmjlKTBAomw3Xdu9pq4pjbLvmoRJ4VbCHgc', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVG1JVzJRYjkzajFuUG1JY25UalZWdVhyWHVhYVZrWFVRbnV5V2xPOSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjtzOjU6InJvdXRlIjtzOjE5OiJzYW5jdHVtLmNzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770041200),
('0pC5yyOxK8PVLm8Z7Tacf6IL3WEIo1rj5vwHwC5F', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiT2FEYTRsV08yNGFuUEhzUjg3UTBEc0RhNG1aVVc0OHlxQmtYVEcxdiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjtzOjU6InJvdXRlIjtzOjE5OiJzYW5jdHVtLmNzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770041674),
('7uMDuqw3T9pg2qXKJBvujruOVJruKpiwMdDlsb4b', NULL, '127.0.0.1', 'PostmanRuntime/7.51.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRVJIUU1OY25sZ014VGlPWWdWeU9xUFJCSlloc0FJVFVaVlhEdkpGOCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770010184),
('9TFJdVaZA2hugdny18fIWmPRD5V90Sz5FfLvKnd7', NULL, '127.0.0.1', 'PostmanRuntime/7.51.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiREpobFZLRDRJWWpzZGhyeU5jZlZzN2dCa05SWjN3WTFkcE9rWWdncCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770037852),
('d5h8wjZ3T5AQ8k7glX6V5zbyNTGsWlzfefxwDFM3', NULL, '127.0.0.1', 'PostmanRuntime/7.51.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOFJHTFNnVGprVHB3TjcxangwaG1MY3VFMUpHT2xka1lGSXk5Q2x5ZyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1769700125),
('ehtJJh0GhwpoVGvIQo7LZx3wGIi8ceuyHBdd69Cw', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVDRFSk5Sb05vUWl0R05UMWRHMUV2d2FrdDczM2Y0OGRCeFN2dDFSOSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjtzOjU6InJvdXRlIjtzOjE5OiJzYW5jdHVtLmNzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1769924892),
('EXpgwQlKFJUMLrYoFE09pu8kkxaOX9YQFdUhMSJm', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMHIwTVByYWZJRU5TRE5GWk9GTUpQYkdYdVpnbzgzQlBKSTdzSnhTcCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjtzOjU6InJvdXRlIjtzOjE5OiJzYW5jdHVtLmNzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770014801),
('fbje5mIQVA46fVjJQaE4xxUiPr11KJIAEIsOmwdq', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUTRJYUZvVENYYXRHdGZxbFV6bVlyMTlKM0hwT1dhVGxndWtjWE8yViI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjtzOjU6InJvdXRlIjtzOjE5OiJzYW5jdHVtLmNzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770052292),
('goL1fOlqo8ZC3SEG2ctg9evNjAcTbuSihzDwNpst', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYTlFTFZiQ3lrQzZYU1VZTXhka0ZnZXBidk5YSG5IYVF5WlduaDFYdyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjtzOjU6InJvdXRlIjtzOjE5OiJzYW5jdHVtLmNzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770013724),
('J2JAyEMi2W0l1PuHCWvWupajC1RcSzFV7xX6PL5h', NULL, '127.0.0.1', 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36 Edg/144.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiU2IwMGNGYkUyejdPN3lybTdtT0NkYkJneks4Q3pQbkhYWVpzRVlmUSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjtzOjU6InJvdXRlIjtzOjE5OiJzYW5jdHVtLmNzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770054786),
('J8wI1ytLVh4bB7l1L0tawcQQbM6CxxHwlOVwjIbF', NULL, '127.0.0.1', 'PostmanRuntime/7.51.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidHVPYmlTdm9EdWp5ZG5pRm0yblJYVXZ4dERnVjFzUTRPajlUTllacCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770037962),
('ll3xoIMSTy3WhtvANscdNuySrOVtkmurBMbFwHOv', NULL, '127.0.0.1', 'PostmanRuntime/7.51.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUTFLeTRxb09WRGp5VUlWS3BKZml2cmpwREF3TjBYbkZBWlR5R21jMyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770037834),
('NMfzMURYz1Ovm59bB7URxmW9TCOPCJ64UyA1Dvkx', NULL, '127.0.0.1', 'PostmanRuntime/7.51.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSnBWVElSSXRSeDRpVW81TDlxMng1bHpsSE1xWGdyYUZrWmJMTEZwYiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770017019),
('o8TLYbPwLdn16tFpNCpcTgO3wU7jPqZz5ExcUNC4', NULL, '127.0.0.1', 'PostmanRuntime/7.51.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZVJYNkhsVHZoY1JZVm1zekNVeDFoQWJrckpjZ3N6VnV1QkxkTEN3QyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjtzOjU6InJvdXRlIjtzOjE5OiJzYW5jdHVtLmNzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770022172),
('pDiUSR0147jap8MOhqELYISxf6unIgUUEz8D9Vps', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiV25FenFUOEZKQjNmMFNKWDZLeWpwc1F4dTZQYkpPQUh5NGNLQTQwUCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjtzOjU6InJvdXRlIjtzOjE5OiJzYW5jdHVtLmNzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1769924857),
('PxayVYd6rJDNPu70EaYZ2siceblt93EeGO4XiwNq', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQUlLeGs1Mm5GTG11UHBKY1NuQ3h0NzdXdnlwUE5FSmt4clhXbUdCaSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjtzOjU6InJvdXRlIjtzOjE5OiJzYW5jdHVtLmNzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770013850),
('sCwWAReC3YfFY7brmETcyefcVMFLaG3yJBDKvzlT', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWnVmT0p1azdKcEI3R2Y5Um5iYWhPRFZEdlU3UkNqcXZvZGdGcXRlcSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770016509),
('UQIKkv5XhaluQrRbZ0np8SpSMX1sz2ZylmqHeCFV', NULL, '127.0.0.1', 'PostmanRuntime/7.51.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicFBKWmp6S24xbVVIa0JHN3ZNdmJYbjE5a1FYcmZkWG9ya3JzN1huYSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1769594620),
('V4cZvDhpLTXNZaltUYcZj22CtGVed76ZvwOstGPz', NULL, '127.0.0.1', 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36 Edg/144.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieUV3eDNHOElxa0RpVUNqTUJtc1Q0YmlvNjNucEZyWHNXZ29rVzhxayI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjtzOjU6InJvdXRlIjtzOjE5OiJzYW5jdHVtLmNzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770052422),
('WeVZtHkhigYOaSwjw7PZdshoEAFadeJOxF4uP3ow', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSUV3cWw1THRCak5EcEc4Y2t5YWJ5dlAySDNzYnNQd3hqZ1NVSW5xWiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjtzOjU6InJvdXRlIjtzOjE5OiJzYW5jdHVtLmNzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1769924815),
('WNRg6168BsDN0Od9MoYxQfoXDzFN3Yrje19GD1Cu', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ2Q5SFBEeUtuUzBpdWxaa1ZpYUI5N2NoNUM5TkYxdUt1NmdqQWVhMCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjtzOjU6InJvdXRlIjtzOjE5OiJzYW5jdHVtLmNzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770052318),
('wO3FIOduYDqY2rZ3SSPIHR14EqD1f8QdNiLBQXUM', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYkx0ZWZ5UGNXdjBNMEZIanliQWFEY0NFV0IzSExNSnFIaklORllXSiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjtzOjU6InJvdXRlIjtzOjE5OiJzYW5jdHVtLmNzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770015044),
('X0sQ4SY3beznUkdOsN8YPvamiQaPWm2YHsZtgIz9', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN01yRzBiejRaRGt0cFhnZmNnaFN6SVQwamtmUFJEYXo3eG5aUTFyZyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjtzOjU6InJvdXRlIjtzOjE5OiJzYW5jdHVtLmNzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770041245),
('YKyBWpqEqwWm1mzpu9T0zdC1LWSZtkbl3cNBWXBb', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiY2lkbThaemhVeVhJU1RMSUhQbXREWDhUZ3NtWDR1Uk9NYUJSR2QzNyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjtzOjU6InJvdXRlIjtzOjE5OiJzYW5jdHVtLmNzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770016346),
('ySj2llLD9snDZUCSqTq1SLcHKwFWkI6AP2nZZY41', NULL, '127.0.0.1', 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36 Edg/144.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaHJBUzZ2WkhUUUR2WWRhZWdtOU5xZHBTVXFpcTJ6NlFZZUhxdTlsbyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjtzOjU6InJvdXRlIjtzOjE5OiJzYW5jdHVtLmNzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770054758),
('YyPzoK9qq6p9MnnNmHDnY2IwRaPmQc2nS5rcZ4Br', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ2ZmTGdRZ0dXZ1JLN2ttaE9SRnhsQzl1NU5aeGNrRDZCSjVzZzFwOCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjtzOjU6InJvdXRlIjtzOjE5OiJzYW5jdHVtLmNzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770041652),
('zutLkmlQn5G0VYWB1bFcMUezbp22YRlcO5oqcNFw', NULL, '127.0.0.1', 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36 Edg/144.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWWsxRDd1UmdKRGQ4R3A3SXd1Vmg1U3Q5YkJFU0RieFVSTjJLZEE0NCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjtzOjU6InJvdXRlIjtzOjE5OiJzYW5jdHVtLmNzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770052445),
('ZYedOviG3MztHTpQWRZSCI2H8PAM9BS9UJt7VnHO', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoia3Q3RWtCYTFOYmd1eVdQVWtyY1Z6VU42RHpIejdiY1VWb3F1SzZaVSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjtzOjU6InJvdXRlIjtzOjE5OiJzYW5jdHVtLmNzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770039127);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(255) NOT NULL,
  `post_nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('utilisateur','rh','manager','admin','compta','directeur','it') NOT NULL DEFAULT 'utilisateur',
  `statut` enum('actif','inactif','suspendu','conge','resilie','en_attente') NOT NULL DEFAULT 'actif',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `post_nom`, `prenom`, `name`, `email`, `telephone`, `adresse`, `email_verified_at`, `password`, `role`, `statut`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, '', NULL, '', 'Admin RH', 'admin@rhm.com', '', '', NULL, 'password', 'utilisateur', 'actif', NULL, '2026-01-28 09:29:38', '2026-01-28 09:29:38'),
(2, '', NULL, '', 'Jean Mukendi', 'jean@rhm.com', '', '', NULL, 'password', 'utilisateur', 'actif', NULL, '2026-01-28 09:29:38', '2026-01-28 09:29:38'),
(3, '', NULL, '', 'Grace Kabeya', 'grace@rhm.com', '', '', NULL, '$2y$12$XJVujq73pHYUH0uBprR4D.niKw14tUbSpLQoPk7a59/hb5MrGWVgu', 'utilisateur', 'actif', NULL, '2026-01-28 09:29:38', '2026-02-02 07:07:25'),
(4, '', NULL, '', 'Patrick Tshibangu', 'patrick@rhm.com', '', '', NULL, 'password', 'utilisateur', 'actif', NULL, '2026-01-28 09:29:38', '2026-01-28 09:29:38'),
(5, '', NULL, '', 'Sarah Ilunga', 'sarah@rhm.com', '', '', NULL, 'password', 'utilisateur', 'actif', NULL, '2026-01-28 09:29:38', '2026-01-28 09:29:38'),
(6, '', NULL, '', 'Nouvel Utilisateur', 'nouveau@rhm.com', '', '', NULL, '$2y$12$TzKdEUBl1EZgc3EfXcj0ouwAUiC0eNZlZGRzEhsTxuNms9X5NdI3y', 'utilisateur', 'actif', NULL, '2026-02-02 07:10:02', '2026-02-02 07:18:52'),
(7, '', NULL, '', 'Utilisateur Test', 'test@rhm.com', '', '', NULL, '$2y$12$yU13M0rh/R3BzSUxL9pf/Oabq/bc7YP7.8IslZg/Uxd6zRIEB3O8m', 'utilisateur', 'actif', NULL, '2026-02-02 07:21:28', '2026-02-02 07:21:28'),
(8, 'Dupont', 'Martin', 'Jean', 'Dupont Martin', 'jean@example.com', '+243123456789', 'Kinshasa', NULL, '$2y$12$hO9a7EbtyHMho8pMBF/knevpkRFBiOz0ZNEaVd4qdtn96D48/KXvm', 'utilisateur', 'actif', NULL, '2026-02-02 17:12:50', '2026-02-02 17:12:50'),
(9, 'yered', 'josh', 'bell', 'yered josh', 'yered@gmail.com', '09000000', 'luk', NULL, '$2y$12$4isEnFUFBloYwbfhHEoZO.0vBt2TauNDq0hS2OS8ZhvYg39u2NNzy', 'utilisateur', 'actif', NULL, '2026-02-02 17:13:34', '2026-02-02 17:13:34');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `avantages`
--
ALTER TABLE `avantages`
  ADD PRIMARY KEY (`id_avantage`),
  ADD KEY `avantages_matricule_foreign` (`matricule`);

--
-- Index pour la table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Index pour la table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Index pour la table `candidats`
--
ALTER TABLE `candidats`
  ADD PRIMARY KEY (`id_candidat`);

--
-- Index pour la table `contrats`
--
ALTER TABLE `contrats`
  ADD PRIMARY KEY (`id_contrat`),
  ADD KEY `contrats_matricule_foreign` (`matricule`);

--
-- Index pour la table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id_document`),
  ADD KEY `documents_matricule_foreign` (`matricule`);

--
-- Index pour la table `employes`
--
ALTER TABLE `employes`
  ADD PRIMARY KEY (`matricule`),
  ADD UNIQUE KEY `employes_id_unique` (`id`),
  ADD KEY `employes_id_poste_foreign` (`id_poste`);

--
-- Index pour la table `entreprises`
--
ALTER TABLE `entreprises`
  ADD PRIMARY KEY (`id_entreprise`);

--
-- Index pour la table `entretiens`
--
ALTER TABLE `entretiens`
  ADD PRIMARY KEY (`id_entretien`),
  ADD KEY `entretiens_id_postulation_foreign` (`id_postulation`);

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Index pour la table `fiche_paies`
--
ALTER TABLE `fiche_paies`
  ADD PRIMARY KEY (`id_paie`),
  ADD KEY `fiche_paies_matricule_foreign` (`matricule`);

--
-- Index pour la table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Index pour la table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `offre_emplois`
--
ALTER TABLE `offre_emplois`
  ADD PRIMARY KEY (`id_offre`),
  ADD KEY `offre_emplois_id_entreprise_foreign` (`id_entreprise`);

--
-- Index pour la table `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`matricule`,`id_entretien`),
  ADD KEY `participants_id_entretien_foreign` (`id_entretien`);

--
-- Index pour la table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Index pour la table `postes`
--
ALTER TABLE `postes`
  ADD PRIMARY KEY (`id_poste`),
  ADD KEY `postes_id_service_foreign` (`id_service`);

--
-- Index pour la table `postulations`
--
ALTER TABLE `postulations`
  ADD PRIMARY KEY (`id_postulation`),
  ADD KEY `postulations_id_candidat_foreign` (`id_candidat`),
  ADD KEY `postulations_id_offre_foreign` (`id_offre`);

--
-- Index pour la table `presences`
--
ALTER TABLE `presences`
  ADD PRIMARY KEY (`id_presence`),
  ADD UNIQUE KEY `presences_matricule_unique` (`matricule`);

--
-- Index pour la table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id_service`),
  ADD KEY `services_id_entreprise_foreign` (`id_entreprise`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `avantages`
--
ALTER TABLE `avantages`
  MODIFY `id_avantage` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `candidats`
--
ALTER TABLE `candidats`
  MODIFY `id_candidat` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `contrats`
--
ALTER TABLE `contrats`
  MODIFY `id_contrat` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `documents`
--
ALTER TABLE `documents`
  MODIFY `id_document` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `entreprises`
--
ALTER TABLE `entreprises`
  MODIFY `id_entreprise` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `entretiens`
--
ALTER TABLE `entretiens`
  MODIFY `id_entretien` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `fiche_paies`
--
ALTER TABLE `fiche_paies`
  MODIFY `id_paie` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `offre_emplois`
--
ALTER TABLE `offre_emplois`
  MODIFY `id_offre` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `postes`
--
ALTER TABLE `postes`
  MODIFY `id_poste` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `postulations`
--
ALTER TABLE `postulations`
  MODIFY `id_postulation` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `presences`
--
ALTER TABLE `presences`
  MODIFY `id_presence` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `services`
--
ALTER TABLE `services`
  MODIFY `id_service` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `avantages`
--
ALTER TABLE `avantages`
  ADD CONSTRAINT `avantages_matricule_foreign` FOREIGN KEY (`matricule`) REFERENCES `employes` (`matricule`);

--
-- Contraintes pour la table `contrats`
--
ALTER TABLE `contrats`
  ADD CONSTRAINT `contrats_matricule_foreign` FOREIGN KEY (`matricule`) REFERENCES `employes` (`matricule`);

--
-- Contraintes pour la table `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_matricule_foreign` FOREIGN KEY (`matricule`) REFERENCES `employes` (`matricule`);

--
-- Contraintes pour la table `employes`
--
ALTER TABLE `employes`
  ADD CONSTRAINT `employes_id_foreign` FOREIGN KEY (`id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `employes_id_poste_foreign` FOREIGN KEY (`id_poste`) REFERENCES `postes` (`id_poste`);

--
-- Contraintes pour la table `entretiens`
--
ALTER TABLE `entretiens`
  ADD CONSTRAINT `entretiens_id_postulation_foreign` FOREIGN KEY (`id_postulation`) REFERENCES `postulations` (`id_postulation`);

--
-- Contraintes pour la table `fiche_paies`
--
ALTER TABLE `fiche_paies`
  ADD CONSTRAINT `fiche_paies_matricule_foreign` FOREIGN KEY (`matricule`) REFERENCES `employes` (`matricule`);

--
-- Contraintes pour la table `offre_emplois`
--
ALTER TABLE `offre_emplois`
  ADD CONSTRAINT `offre_emplois_id_entreprise_foreign` FOREIGN KEY (`id_entreprise`) REFERENCES `entreprises` (`id_entreprise`);

--
-- Contraintes pour la table `participants`
--
ALTER TABLE `participants`
  ADD CONSTRAINT `participants_id_entretien_foreign` FOREIGN KEY (`id_entretien`) REFERENCES `entretiens` (`id_entretien`),
  ADD CONSTRAINT `participants_matricule_foreign` FOREIGN KEY (`matricule`) REFERENCES `employes` (`matricule`);

--
-- Contraintes pour la table `postes`
--
ALTER TABLE `postes`
  ADD CONSTRAINT `postes_id_service_foreign` FOREIGN KEY (`id_service`) REFERENCES `services` (`id_service`);

--
-- Contraintes pour la table `postulations`
--
ALTER TABLE `postulations`
  ADD CONSTRAINT `postulations_id_candidat_foreign` FOREIGN KEY (`id_candidat`) REFERENCES `candidats` (`id_candidat`),
  ADD CONSTRAINT `postulations_id_offre_foreign` FOREIGN KEY (`id_offre`) REFERENCES `offre_emplois` (`id_offre`);

--
-- Contraintes pour la table `presences`
--
ALTER TABLE `presences`
  ADD CONSTRAINT `presences_matricule_foreign` FOREIGN KEY (`matricule`) REFERENCES `employes` (`matricule`);

--
-- Contraintes pour la table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_id_entreprise_foreign` FOREIGN KEY (`id_entreprise`) REFERENCES `entreprises` (`id_entreprise`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
