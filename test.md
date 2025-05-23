# 🚀 Guide Complet - Configuration Projet React Native avec Expo

> Guide détaillé pour créer un projet React Native avec authentification, internationalisation, et gestion des thèmes.

---

## 📚 Sommaire

- [1. Création du projet React Native](#1-création-du-projet-react-native)
- [2. Configuration Git et GitHub](#2-configuration-git-et-github)
- [3. Configuration de l'internationalisation](#3-configuration-de-linternationalisation)
- [4. Configuration de l'authentification](#4-configuration-de-lauthentification)
- [5. Configuration des thèmes](#5-configuration-des-thèmes)
- [6. Configuration du routage](#6-configuration-du-routage)
- [7. Structure finale du projet](#7-structure-finale-du-projet)

---

## 1. Création du projet React Native

### 📦 Étape 1.1 : Création du projet

```bash
# Créer le projet avec Expo
npx create-expo-app@latest RideAndGoMobile

# Se déplacer dans le dossier
cd RideAndGoMobile

# Réinitialiser le projet pour repartir de zéro
npm run reset-project
```

### 📋 Étape 1.2 : Installation des dépendances supplémentaires

```bash
# Navigation
npm install expo-router

# SafeArea pour gérer les encoches
npx expo install react-native-safe-area-context

# Icônes
npx expo install @expo/vector-icons

# AsyncStorage pour sauvegarder les données localement
npx expo install @react-native-async-storage/async-storage
```

---

## 2. Configuration Git et GitHub

### 🔄 Étape 2.1 : Initialisation Git et connexion à GitHub

```bash
# Initialiser Git
git init

# Ajouter l'origine remote
git remote add origin https://github.com/NOMO-Gabriel/RideAndGo.git

# Récupérer les branches existantes
git fetch origin

# Créer et basculer sur la branche mobile (écrase le contenu existant)
git checkout -B mobile

# Ajouter tous les fichiers
git add .

# Faire le premier commit
git commit -m "🚀 Initial React Native project setup"

# Pousser vers GitHub (force push pour écraser)
git push -f origin mobile
```

---

## 3. Configuration de l'internationalisation

### 📝 Étape 3.1 : Structure des dossiers pour l'i18n

```bash
# Créer les dossiers nécessaires
mkdir -p src/contexts
mkdir -p src/constants
mkdir -p src/hooks
mkdir -p src/types
```

### 📄 Étape 3.2 : Créer les types TypeScript

```bash
# Créer le fichier des types
touch src/types/index.ts
```

**Contenu de `src/types/index.ts` :**

### 📄 Étape 3.3 : Créer les traductions

```bash
# Créer le fichier des traductions
touch src/constants/translations.ts
```

**Contenu de `src/constants/translations.ts` :**

### 📄 Étape 3.4 : Créer le contexte de localisation

```bash
# Créer le contexte de localisation
touch src/contexts/LocaleContext.tsx
```

**Contenu de `src/contexts/LocaleContext.tsx` :**

---

## 4. Configuration de l'authentification

### 📄 Étape 4.1 : Créer le contexte d'authentification

```bash
# Créer le contexte d'authentification
touch src/contexts/AuthContext.tsx
```

**Contenu de `src/contexts/AuthContext.tsx` :**

---

## 5. Configuration des thèmes

### 📄 Étape 5.1 : Créer les constantes de thèmes

```bash
# Créer le fichier des thèmes
touch src/constants/themes.ts
```

**Contenu de `src/constants/themes.ts` :**

### 📄 Étape 5.2 : Créer le contexte de thème

```bash
# Créer le contexte de thème
touch src/contexts/ThemeContext.tsx
```

**Contenu de `src/contexts/ThemeContext.tsx` :**

---

## 6. Configuration du routage

### 📄 Étape 6.1 : Configurer le layout principal

```bash
# Créer le layout principal
touch app/_layout.tsx
```

**Contenu de `app/_layout.tsx` :**

### 📄 Étape 6.2 : Créer l'écran de chargement

```bash
# Créer l'écran de chargement
touch app/index.tsx
```

**Contenu de `app/index.tsx` :**

### 📄 Étape 6.3 : Créer le groupe d'authentification

```bash
# Créer le dossier et les écrans d'authentification
mkdir -p app/auth
touch app/auth/_layout.tsx
touch app/auth/index.tsx
touch app/auth/login.tsx
touch app/auth/register.tsx
```

**Contenu de `app/auth/_layout.tsx` :**

**Contenu de `app/auth/index.tsx` :**

**Contenu de `app/auth/login.tsx` :**

**Contenu de `app/auth/register.tsx` :**

### 📄 Étape 6.4 : Créer la navigation principale avec onglets

```bash
# Créer le dossier et les écrans principaux
mkdir -p app/\(tabs\)
touch app/\(tabs\)/_layout.tsx
touch app/\(tabs\)/go.tsx
touch app/\(tabs\)/ride.tsx
touch app/\(tabs\)/calculator.tsx
touch app/\(tabs\)/settings.tsx
```

**Contenu de `app/(tabs)/_layout.tsx` :**

**Contenu de `app/(tabs)/go.tsx` :**

**Contenu de `app/(tabs)/ride.tsx` :**

**Contenu de `app/(tabs)/calculator.tsx` :**

**Contenu de `app/(tabs)/settings.tsx` :**