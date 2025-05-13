# Restaurant Marocain - Application Web

Une application web moderne pour un restaurant marocain, comprenant un site web, une API backend et un chatbot intégré.

## 🚀 Fonctionnalités

- Menu interactif avec catégories de plats
- Système de panier d'achat
- Chatbot intelligent pour les commandes et informations
- Interface utilisateur moderne et responsive
- API RESTful sécurisée
- Intégration avec Dialogflow pour le chatbot

## 🛠️ Technologies Utilisées

### Frontend
- React 18 avec TypeScript
- Vite pour le build
- Tailwind CSS pour le styling
- Zustand pour la gestion d'état
- React Router pour la navigation
- Framer Motion pour les animations
- Axios pour les requêtes API

### Backend
- Node.js avec Express
- TypeScript
- Dialogflow pour le chatbot
- Zod pour la validation
- Helmet pour la sécurité
- Express Rate Limit pour la protection contre les attaques

## 📋 Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn
- Compte Google Cloud pour Dialogflow
- Variables d'environnement configurées

## 🔧 Installation

1. Cloner le repository
```bash
git clone https://github.com/YOUR_USERNAME/morrocan-restaurant.git
cd morrocan-restaurant
```

2. Installer les dépendances
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Configurer les variables d'environnement

Créez un fichier `.env` dans le dossier backend :
```env
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173
DIALOGFLOW_PROJECT_ID=votre_project_id
DIALOGFLOW_PRIVATE_KEY=votre_private_key
DIALOGFLOW_CLIENT_EMAIL=votre_client_email
```

4. Démarrer les serveurs
```bash
# Backend (dans le dossier backend)
npm run dev

# Frontend (dans le dossier frontend)
npm run dev
```

## 🔒 Sécurité

- Protection CORS configurée
- Rate limiting implémenté
- Headers de sécurité avec Helmet
- Validation des entrées avec Zod
- Gestion sécurisée des variables d'environnement

## 📝 Structure du Projet

```
morrocan-restaurant/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   └── app.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── App.tsx
│   └── package.json
└── restaurant-chabot1/
    ├── intents/
    ├── entities/
    └── agent.json
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteurs

- [Votre Nom] - Développeur Principal

## 🙏 Remerciements

- Tous les contributeurs
- La communauté open source
- Les outils et bibliothèques utilisés 