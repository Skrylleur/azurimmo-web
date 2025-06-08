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

azurimmo-next/
│
├── app/                     # Pages & routing Next.js (App Router)
│   ├── admin/               # Dashboard de gestion
│   │   ├── batiments/
│   │   ├── appartements/
│   │   ├── contrats/
│   │   ├── paiements/
│   │   ├── locataires/
│   │   ├── garants/
│   │   └── interventions/
│
├── components/              # Composants réutilisables (formulaires, cards…)
├── lib/                     # Utils & intégration Prisma côté serveur
├── public/                  # Assets statiques
├── styles/                  # Styles globaux
└── …

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