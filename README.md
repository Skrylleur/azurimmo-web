# 🏡 AzurImmo – Interface Web (Next.js)

**AzurImmo** est une application web de gestion immobilière développée avec **Next.js 14** et **Tailwind CSS**. Elle permet d’administrer un parc locatif via une interface claire, fluide et responsive, connectée à une API Java Spring Boot.

---

## 🚀 Objectifs

- Gérer efficacement les entités immobilières :
  - Bâtiments 🏢
  - Appartements 🛏️
  - Contrats 📑
  - Paiements 💸
  - Locataires 👥
  - Garants 🤝
  - Interventions 🔧
- Offrir une interface sobre, lisible et responsive
- Permettre des interactions rapides : création, modification, suppression
- Naviguer entre les entités liées (ex : voir les paiements d’un contrat)

---

## 🛠️ Technologies utilisées

- [Next.js 14 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Prisma (client uniquement)](https://www.prisma.io/)
- [Framer Motion](https://www.framer.com/motion/) *(animations UI)*
- [Spring Boot API](https://spring.io/projects/spring-boot) *(backend)*

---

## 📸 Aperçu

![Capture interface AzurImmo](./public/preview.png) <!-- Ajoute une image si disponible -->

---

## 📂 Structure du projet

| Dossier/Fichier                | Description |
|-------------------------------|-------------|
| `app/`                        | Dossier racine des routes Next.js (App Router) |
| ├── `admin/`                  | Zone d'administration avec toutes les entités |
| ├── `admin/batiments/`        | Pages liées aux bâtiments |
| ├── `admin/batiments/[id]/`   | Détail et modification d’un bâtiment |
| ├── `admin/appartements/`     | Pages liées aux appartements |
| ├── `admin/appartements/[id]/`| Détail et modification d’un appartement |
| ├── `admin/contrats/`         | Pages liées aux contrats |
| ├── `admin/contrats/[id]/`    | Détail et modification d’un contrat |
| ├── `admin/paiements/`        | Pages liées aux paiements |
| ├── `admin/locataires/`       | Pages liées aux locataires |
| ├── `admin/garants/`          | Pages liées aux garants |
| └── `admin/interventions/`    | Pages liées aux interventions |
| `components/`                 | Composants réutilisables (UI, formulaires, boutons...) |
| `lib/`                        | Fonctions utilitaires (ex : Prisma Client) |
| `public/`                     | Fichiers statiques (favicon, images...) |
| `styles/`                     | Styles globaux (globals.css) |
| `.env`                        | Variables d’environnement |
| `tailwind.config.ts`          | Configuration Tailwind CSS |
| `tsconfig.json`               | Configuration TypeScript |
| `README.md`                   | Documentation du projet |

---

## ⚙️ Lancer le projet en local

### 1. Prérequis

- Node.js 18+
- Accès à l’API Spring Boot (`http://localhost:8080` ou lien distant)

### 2. Installation

```bash
git clone https://github.com/Skrylleur/azurimmo-next.git
cd azurimmo-next
npm install
npm run dev

Accès via http://localhost:3000