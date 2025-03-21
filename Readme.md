# Tutoriel React Native pour Débutants - Application de Quiz avec Expo

## Préparation de votre environnement Git

Avant de commencer le développement, vous devez créer une nouvelle branche dans votre dépôt GitHub pour isoler votre travail. Voici comment procéder:

### Création d'une nouvelle branche vide

```bash
# 1. Assurez-vous d'avoir la dernière version de la branche principale
git checkout main  # ou master selon votre configuration
git pull

# 2. Créez une nouvelle branche
git checkout -b quiz-app

# 3. Si vous souhaitez une branche vraiment vide (sans les fichiers actuels)
# Option A - Créer une branche orpheline (sans historique partagé avec main)
git checkout --orphan quiz-app-empty
git rm -rf .  # Supprime tous les fichiers de l'index

# Option B - Garder l'historique mais sans les fichiers
git checkout -b quiz-app
git rm -rf .
git commit -m "Création d'une branche vide pour l'application de quiz"
```

Maintenant que vous avez votre branche prête, passons au développement de l'application!

## Table des matières

1. [Introduction à React Native](#introduction-à-react-native)
2. [Installation et configuration](#installation-et-configuration)
3. [Structure du projet](#structure-du-projet)
4. [Composants principaux](#composants-principaux)
5. [Intégration de l'API Gemini](#intégration-de-lapi-gemini)
6. [Gestion des scores](#gestion-des-scores)
7. [Navigation entre les écrans](#navigation-entre-les-écrans)
8. [Styles et thème](#styles-et-thème)
9. [Tests et déploiement](#tests-et-déploiement)
10. [Ressources supplémentaires](#ressources-supplémentaires)

## Introduction à React Native

### Qu'est-ce que React Native?

React Native est un framework JavaScript créé par Facebook qui permet de développer des applications mobiles natives pour iOS et Android à partir d'une seule base de code. Contrairement aux applications hybrides, React Native compile votre code en composants natifs réels, ce qui donne à vos applications des performances proches des applications natives.

### Concepts clés à comprendre

1. **Composants** - Ce sont les blocs de construction de votre interface utilisateur, similaires aux éléments HTML dans le développement web.
   
2. **Props** - Les "properties" sont des paramètres que vous passez aux composants, comme les attributs en HTML.
   
3. **State** - C'est l'état interne d'un composant qui peut changer au fil du temps.
   
4. **JSX** - C'est une extension de syntaxe JavaScript qui ressemble à du HTML et permet de décrire l'interface utilisateur.
   
5. **Hooks** - Introduits dans React 16.8, les Hooks comme `useState` et `useEffect` permettent d'utiliser l'état et d'autres fonctionnalités de React sans écrire de classes.

### Différences avec le développement web

- Les éléments d'interface ne sont pas des balises HTML mais des composants spécifiques à React Native comme `View` (div), `Text` (span, p), etc.
- Le style utilise une version modifiée de CSS avec certaines propriétés absentes et d'autres ajoutées.
- La mise en page utilise principalement Flexbox, qui fonctionne un peu différemment que sur le web.

### Pourquoi Expo?

Expo est une plateforme qui simplifie le développement React Native en offrant:
- Une configuration plus facile sans avoir à gérer Xcode ou Android Studio
- Un accès aux API natives courantes via des modules simples
- Un client mobile pour tester rapidement vos applications
- Des outils de déploiement simplifiés

## Installation et configuration

### Installation des outils nécessaires

Avant de commencer, vous aurez besoin de:
1. Node.js (version 14 ou supérieure)
2. npm ou yarn
3. Un éditeur de code (VS Code recommandé)
4. L'application Expo Go sur votre smartphone (pour tester en direct)

Ouvrez votre terminal et installez Expo CLI globalement:

```bash
npm install -g expo-cli
```

### Création du projet

Créons notre projet React Native avec Expo:

```bash
# Cette commande crée un nouveau projet avec un template de base
npx create-expo-app QuizGeminiApp

# Naviguez dans le dossier du projet
cd QuizGeminiApp
```

> **Explication**: `create-expo-app` est un outil qui configure un nouveau projet React Native avec Expo. Il crée la structure de base et installe les dépendances nécessaires.

### Structure initiale du projet

Après la création, votre projet aura cette structure:

```
QuizGeminiApp/
├── assets/            # Images, polices, etc.
├── node_modules/      # Packages installés
├── .gitignore         # Fichiers à ignorer par Git
├── App.js             # Composant principal
├── app.json           # Configuration Expo
├── babel.config.js    # Configuration Babel
└── package.json       # Dépendances et scripts
```

Ouvrez le fichier `App.js` pour voir le composant de base:

```jsx
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

> **Explication**: 
> - `import`: Permet d'importer des composants et fonctions d'autres fichiers
> - `View`: Équivalent d'une `<div>` en HTML - un conteneur pour d'autres composants
> - `Text`: Composant pour afficher du texte (tout texte doit être dans un composant `Text`)
> - `StyleSheet.create`: Méthode pour définir des styles similaires au CSS
> - `flex: 1`: Fait occuper tout l'espace disponible au composant
> - `alignItems` et `justifyContent`: Contrôlent l'alignement avec Flexbox

### Lancer l'application

Pour démarrer votre application:

```bash
npx expo start
```

Cela ouvrira une fenêtre de contrôle dans votre navigateur avec un code QR. Scannez ce code avec l'application Expo Go sur votre téléphone pour voir l'application en direct.

> **Note**: Chaque fois que vous modifiez votre code, l'application se recharge automatiquement grâce au "hot reloading".

### Installation des dépendances supplémentaires

Notre application de quiz aura besoin de plusieurs bibliothèques:

```bash
# Pour la navigation entre écrans
npm install @react-navigation/native @react-navigation/stack

# Pour supporter React Navigation
npx expo install react-native-screens react-native-safe-area-context

# Pour le stockage local sécurisé
npx expo install expo-secure-store

# Pour les requêtes HTTP vers l'API Gemini
npm install axios

# Pour les onglets de navigation (si nécessaire)
npm install @react-navigation/bottom-tabs

# Pour les variables d'environnement (clés API)
npx expo install react-native-dotenv
```

> **Explication**:
> - `@react-navigation/native`: Bibliothèque principale pour gérer la navigation
> - `expo-secure-store`: Permet de stocker des données de manière sécurisée, similaire à localStorage mais crypté
> - `axios`: Client HTTP pour faire des requêtes à l'API Gemini
> - `react-native-dotenv`: Permet d'utiliser des variables d'environnement pour cacher les clés API

### Configuration de dotenv

Créez un fichier `.env` à la racine de votre projet:

```
GEMINI_API_KEY=votre_clé_api_gemini
```

Modifiez `babel.config.js` pour ajouter le plugin:

```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blacklist": null,
        "whitelist": null,
        "safe": false,
        "allowUndefined": true
      }]
    ]
  };
};
```

> **Explication**: Ce plugin permet d'accéder aux variables d'environnement dans votre code via `import { GEMINI_API_KEY } from '@env';`

## Structure du projet

Avant de commencer à coder, organisons notre projet avec une structure claire:

```bash
# Créez les dossiers nécessaires
mkdir -p src/{api,components,screens,navigation,utils,theme}
```

Voici à quoi ressemblera la structure:

```
QuizGeminiApp/
├── assets/                # Images, polices, etc.
├── src/
│   ├── api/               # Services d'API
│   │   └── gemini.js      # Client API Gemini
│   ├── components/        # Composants réutilisables
│   │   ├── QuizQuestion.js
│   │   ├── ScoreCard.js
│   │   └── Button.js
│   ├── screens/           # Écrans de l'application
│   │   ├── HomeScreen.js
│   │   ├── QuizScreen.js
│   │   └── ScoreScreen.js
│   ├── navigation/        # Configuration de navigation
│   │   └── AppNavigator.js
│   ├── utils/             # Fonctions utilitaires
│   │   └── storage.js     # Gestion du stockage local
│   └── theme/             # Styles et thème
│       └── index.js
├── App.js                 # Point d'entrée de l'application
├── .env                   # Variables d'environnement
└── package.json
```

> **Explication**:
> - Cette structure suit le principe de séparation des préoccupations
> - `screens`: Contient les écrans principaux comme l'accueil, le quiz, etc.
> - `components`: Contient des éléments réutilisables plus petits
> - `api`: Contient la logique de communication avec des services externes
> - `utils`: Contient des fonctions utilitaires comme le stockage
> - `navigation`: Gère la navigation entre les écrans
> - `theme`: Contient les styles globaux et la thématique de l'app

## Composants principaux

Commençons par créer les fichiers principaux de notre application.

### App.js - Le point d'entrée

Modifions le fichier `App.js` à la racine du projet:

```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AppNavigator />
    </NavigationContainer>
  );
}
```

> **Explication**:
> - `NavigationContainer`: Composant racine qui gère l'état de navigation
> - `StatusBar`: Contrôle l'apparence de la barre d'état en haut de l'écran
> - `AppNavigator`: Notre navigateur personnalisé que nous allons créer

### Configuration de la navigation

Créez le fichier `src/navigation/AppNavigator.js`:

```javascript
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import ScoreScreen from '../screens/ScoreScreen';

// Création d'un navigateur de pile (pour naviguer d'un écran à l'autre)
const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0066CC',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Quiz App' }} 
      />
      <Stack.Screen 
        name="Quiz" 
        component={QuizScreen}
        options={{ title: 'Questions' }} 
      />
      <Stack.Screen 
        name="Score" 
        component={ScoreScreen}
        options={{ title: 'Résultats' }} 
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
```

> **Explication**:
> - `createStackNavigator`: Crée un navigateur qui montre un seul écran à la fois avec une animation de transition
> - `Stack.Navigator`: Conteneur pour tous nos écrans
>   - `initialRouteName`: Écran affiché au démarrage
>   - `screenOptions`: Options de style pour tous les écrans
> - `Stack.Screen`: Définit un écran dans la pile de navigation
>   - `name`: Identifiant unique pour y naviguer
>   - `component`: Le composant React à afficher
>   - `options`: Configuration spécifique à cet écran

### Écran d'accueil

Créez le fichier `src/screens/HomeScreen.js`:

```javascript
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  FlatList,
  SafeAreaView
} from 'react-native';
import { getTopScores } from '../utils/storage';

export default function HomeScreen({ navigation }) {
  // État local pour stocker les meilleurs scores et indiquer le chargement
  const [topScores, setTopScores] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect s'exécute après le rendu du composant
  useEffect(() => {
    loadTopScores();
    
    // Recharger les scores lorsque l'écran est de nouveau affiché
    const unsubscribe = navigation.addListener('focus', () => {
      loadTopScores();
    });

    // Nettoyage lors du démontage du composant
    return unsubscribe;
  }, [navigation]); // Se déclenchera uniquement si navigation change

  // Fonction pour charger les meilleurs scores
  const loadTopScores = async () => {
    try {
      setLoading(true);
      const scores = await getTopScores();
      setTopScores(scores);
    } catch (error) {
      console.error('Erreur lors du chargement des scores:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour démarrer le quiz
  const startQuiz = () => {
    navigation.navigate('Quiz'); // Navigue vers l'écran 'Quiz'
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Quiz Gemini</Text>
      <Text style={styles.subtitle}>
        Testez vos connaissances avec 10 questions générées par IA
      </Text>

      {/* Bouton pour commencer le quiz */}
      <TouchableOpacity 
        style={styles.startButton} 
        onPress={startQuiz}
      >
        <Text style={styles.startButtonText}>Commencer le Quiz</Text>
      </TouchableOpacity>

      {/* Affichage des meilleurs scores */}
      <View style={styles.scoresContainer}>
        <Text style={styles.scoresTitle}>Meilleurs scores:</Text>
        
        {loading ? (
          // Indicateur de chargement
          <ActivityIndicator size="large" color="#0066CC" />
        ) : topScores.length > 0 ? (
          // Liste des scores si disponible
          <FlatList
            data={topScores}
            keyExtractor={(item, index) => `score-${index}`}
            renderItem={({ item, index }) => (
              <View style={styles.scoreItem}>
                <Text style={styles.scoreRank}>#{index + 1}</Text>
                <Text style={styles.scoreValue}>{item} points</Text>
              </View>
            )}
          />
        ) : (
          // Message si aucun score
          <Text style={styles.noScores}>
            Aucun score enregistré. Jouez pour apparaître ici!
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

// Styles du composant
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
  },
  startButton: {
    backgroundColor: '#0066CC',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    elevation: 3, // Ombre pour Android
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoresContainer: {
    marginTop: 40,
    width: '100%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
  },
  scoresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  scoreRank: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#0066CC',
  },
  scoreValue: {
    fontSize: 16,
    color: '#333',
  },
  noScores: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888',
    marginVertical: 20,
  },
});
```

> **Explication des concepts clés**:
> 
> 1. **Hooks React**:
>    - `useState`: Crée des variables d'état locales qui déclenchent un re-rendu quand elles changent
>    - `useEffect`: Exécute du code après le rendu et/ou lors des mises à jour de dépendances
> 
> 2. **Composants React Native**:
>    - `SafeAreaView`: S'assure que le contenu est visible en évitant les encoches et barres système
>    - `View`: Conteneur générique (comme div en HTML)
>    - `Text`: Affiche du texte
>    - `TouchableOpacity`: Surface tactile qui change d'opacité quand on appuie dessus
>    - `FlatList`: Liste performante pour afficher des données
>    - `ActivityIndicator`: Indicateur de chargement tournant
> 
> 3. **Navigation**:
>    - `navigation.navigate('Screen')`: Change d'écran
>    - `navigation.addListener('focus', callback)`: Exécute une fonction quand l'écran devient actif
> 
> 4. **StyleSheet**:
>    - Les styles React Native ressemblent au CSS mais utilisent camelCase (`marginBottom` au lieu de `margin-bottom`)
>    - Les valeurs numériques sont en unités de densité de pixels (pas besoin de 'px')

## Intégration de l'API Gemini

Maintenant, créons le service pour interagir avec l'API Gemini qui nous fournira les questions du quiz.

### src/api/gemini.js

```javascript
import axios from 'axios';
import { GEMINI_API_KEY } from '@env';

// URL de base de l'API Gemini
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * Génère une question de quiz avec Gemini API
 * @param {string} category - Catégorie optionnelle du quiz
 * @returns {Promise<{question: string, options: string[], correctAnswer: string}>}
 */
export const generateQuizQuestion = async (category = 'général') => {
  try {
    // Construction du prompt pour Gemini
    const prompt = `Génère une question de quiz à choix multiple sur le sujet "${category}" avec exactement 4 options de réponse (A, B, C, D). 
    Fournis la question, les 4 options de réponse et indique la lettre de la réponse correcte. 
    Réponds uniquement au format JSON suivant sans aucun texte additionnel:
    {
      "question": "La question du quiz ici",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "A"
    }`;

    // Requête à l'API Gemini
    const response = await axios.post(
      `${API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,  // Contrôle la créativité/aléatoire des réponses (0-1)
          maxOutputTokens: 1024,  // Limite la longueur de la réponse
        }
      }
    );

    // Extraction de la réponse JSON de la réponse de l'API
    const content = response.data.candidates[0].content.parts[0].text;
    
    // Nettoyage et parsing du JSON
    const cleanedContent = content.replace(/```json|```/g, '').trim();
    const parsedResponse = JSON.parse(cleanedContent);

    return {
      question: parsedResponse.question,
      options: parsedResponse.options,
      correctAnswer: parsedResponse.correctAnswer
    };
  } catch (error) {
    console.error('Erreur lors de la génération de question:', error);
    
    // En cas d'erreur, retourne une question par défaut
    return {
      question: "Quelle est la capitale de la France?",
      options: ["Londres", "Paris", "Berlin", "Madrid"],
      correctAnswer: "B"
    };
  }
};

/**
 * Génère un lot de questions de quiz
 * @param {number} count - Nombre de questions à générer
 * @returns {Promise<Array>} - Tableau de questions
 */
export const generateQuizBatch = async (count = 10) => {
  const questions = [];
  // Différentes catégories pour varier les questions
  const categories = [
    'histoire', 'géographie', 'sciences', 'littérature', 
    'sport', 'cinéma', 'musique', 'technologie', 'art', 'nature'
  ];

  try {
    for (let i = 0; i < count; i++) {
      // Sélection d'une catégorie aléatoire
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const question = await generateQuizQuestion(randomCategory);
      questions.push(question);
    }
    return questions;
  } catch (error) {
    console.error('Erreur lors de la génération du lot de questions:', error);
    throw error;
  }
};
```

> **Explication**:
> 
> 1. **API Gemini**:
>    - Gemini est une IA générative de Google capable de traiter du texte et de générer des réponses
>    - Nous utilisons l'endpoint `generateContent` pour créer des questions de quiz
> 
> 2. **Appels API avec axios**:
>    - `axios.post()` envoie une requête POST au serveur
>    - Nous configurons la requête avec un prompt qui demande spécifiquement un format JSON
> 
> 3. **Structure du prompt**:
>    - Nous demandons explicitement un format précis pour faciliter le parsing
>    - Nous spécifions 4 options et une lettre pour la réponse correcte
> 
> 4. **Gestion des erreurs**:
>    - En cas d'échec de l'API, nous fournissons une question par défaut
>    - Les erreurs sont également enregistrées dans la console pour le débogage

### Système de stockage des scores

Créez le fichier `src/utils/storage.js` pour gérer le stockage des scores:

```javascript
import * as SecureStore from 'expo-secure-store';

// Clé utilisée pour stocker les scores dans SecureStore
const TOP_SCORES_KEY = 'quiz_top_scores';

/**
 * Récupère les meilleurs scores stockés
 * @returns {Promise<number[]>} Tableau des meilleurs scores
 */
export const getTopScores = async () => {
  try {
    // Récupérer la chaîne JSON stockée
    const storedScores = await SecureStore.getItemAsync(TOP_SCORES_KEY);
    
    // Si rien n'est stocké, retourner un tableau vide
    if (!storedScores) {
      return [];
    }
    
    // Convertir la chaîne JSON en tableau JavaScript
    return JSON.parse(storedScores);
  } catch (error) {
    console.error('Erreur lors de la récupération des scores:', error);
    return [];
  }
};

/**
 * Sauvegarde un nouveau score et ne garde que les 3 meilleurs
 * @param {number} newScore - Le nouveau score à sauvegarder
 * @returns {Promise<boolean>} - Succès de l'opération
 */
export const saveNewScore = async (newScore) => {
  try {
    // Récupérer les scores actuels
    const currentScores = await getTopScores();
    
    // Ajouter le nouveau score au tableau
    const allScores = [...currentScores, newScore];
    
    // Trier par ordre décroissant (du plus grand au plus petit)
    allScores.sort((a, b) => b - a);
    
    // Garder uniquement les 3 meilleurs scores
    const topScores = allScores.slice(0, 3);
    
    // Sauvegarder les meilleurs scores en format JSON
    await SecureStore.setItemAsync(TOP_SCORES_KEY, JSON.stringify(topScores));
    
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du score:', error);
    return false;
  }
};
```

> **Explication**:
> 
> 1. **SecureStore**:
>    - Une API Expo qui stocke les données de manière sécurisée sur l'appareil
>    - Alternative à AsyncStorage mais avec chiffrement
> 
> 2. **Stockage de données**:
>    - Les données doivent être stockées sous forme de chaînes
>    - `JSON.stringify()` convertit les objets JavaScript en chaînes JSON
>    - `JSON.parse()` convertit les chaînes JSON en objets JavaScript
> 
> 3. **Gestion des meilleurs scores**:
>    - Nous récupérons les scores existants, ajoutons le nouveau, trions, et gardons les 3 meilleurs
>    - Le tri utilise une fonction de comparaison (`(a, b) => b - a`) pour trier en ordre décroissant
>    - `.slice(0, 3)` extrait uniquement les 3 premiers éléments du tableau

### Écran de quiz

Créez le fichier `src/screens/QuizScreen.js` qui contiendra la logique principale du quiz:

```javascript
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView
} from 'react-native';
import { generateQuizBatch } from '../api/gemini';

export default function QuizScreen({ navigation }) {
  // États pour gérer les questions et le déroulement du quiz
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(null);

  // Mappages pour convertir entre index et lettres d'options
  const optionToIndex = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
  const indexToOption = ['A', 'B', 'C', 'D'];

  // Chargement des questions au montage du composant
  useEffect(() => {
    loadQuestions();
  }, []);

  // Fonction pour charger les questions depuis l'API
  const loadQuestions = async () => {
    try {
      setLoading(true);
      const quizQuestions = await generateQuizBatch(10);
      setQuestions(quizQuestions);
    } catch (error) {
      Alert.alert(
        "Erreur",
        "Impossible de charger les questions. Veuillez réessayer.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } finally {
      setLoading(false);
    }
  };

  // Gestion de la sélection d'une option
  const handleOptionSelect = (optionIndex) => {
    // Empêcher de changer de réponse après avoir déjà répondu
    if (answeredCorrectly !== null) return;

    setSelectedOption(optionIndex);
    
    const currentQuestion = questions[currentQuestionIndex];
    const correctIndex = optionToIndex[currentQuestion.correctAnswer];
    
    // Vérifier si la réponse est correcte
    if (optionIndex === correctIndex) {
      setScore(prevScore => prevScore + 1);
      setAnsweredCorrectly(true);
    } else {
      setAnsweredCorrectly(false);
    }
  };

  // Passage à la question suivante
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Passer à la question suivante
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
      setAnsweredCorrectly(null);
    } else {
      // Fin du quiz - naviguer vers l'écran des résultats
      navigation.replace('Score', { score, totalQuestions: questions.length });
    }
  };

  // Affichage de l'indicateur de chargement
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
        <Text style={styles.loadingText}>Chargement des questions...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.container}>
      {/* Barre de progression */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Question {currentQuestionIndex + 1}/{questions.length}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
            ]}
          />
        </View>
      </View>

      {/* Affichage de la question */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      {/* Options de réponse */}
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === index && styles.selectedOption,
              answeredCorrectly !== null && index === optionToIndex[currentQuestion.correctAnswer] && 
                styles.correctOption,
              answeredCorrectly === false && selectedOption === index && 
                styles.incorrectOption
            ]}
            onPress={() => handleOptionSelect(index)}
            disabled={answeredCorrectly !== null}
          >
            <Text style={styles.optionLetter}>{indexToOption[index]}</Text>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Affichage du feedback après réponse */}
      {answeredCorrectly !== null && (
        <View style={styles.feedbackContainer}>
          <Text style={[
            styles.feedbackText,
            answeredCorrectly ? styles.correctFeedback : styles.incorrectFeedback
          ]}>
            {answeredCorrectly
              ? "Correct! 👏"
              : `Incorrect. La bonne réponse est ${currentQuestion.correctAnswer}.`}
          </Text>
          <TouchableOpacity 
            style={styles.nextButton}
            onPress={goToNextQuestion}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex < questions.length - 1 ? "Question suivante" : "Voir le résultat"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Affichage du score actuel */}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score actuel: {score}/{currentQuestionIndex + 1}</Text>
      </View>
    </SafeAreaView>
  );
}

// Styles du composant
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden', // Pour que le remplissage ne dépasse pas
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0066CC',
  },
  questionContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2, // Ombre pour Android
  },
  questionText: {
    fontSize: 18,
    color: '#333',
    lineHeight: 26, // Espacement des lignes
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedOption: {
    borderColor: '#0066CC',
    backgroundColor: '#E6F0FF',
  },
  correctOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  incorrectOption: {
    borderColor: '#F44336',
    backgroundColor: '#FFEBEE',
  },
  optionLetter: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 30, // Centrer verticalement le texte
    marginRight: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  feedbackContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  correctFeedback: {
    color: '#4CAF50',
  },
  incorrectFeedback: {
    color: '#F44336',
  },
  nextButton: {
    backgroundColor: '#0066CC',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreContainer: {
    padding: 16,
    backgroundColor: '#E6F0FF',
    borderRadius: 8,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066CC',
  },
});
```

> **Explication des concepts avancés**:
> 
> 1. **Gestion d'état complexe**:
>    - Plusieurs `useState` pour suivre différents aspects du quiz:
>      - `questions`: tableau des questions chargées
>      - `currentQuestionIndex`: index de la question actuelle
>      - `selectedOption`: option choisie par l'utilisateur
>      - `score`: nombre de bonnes réponses
>      - `loading`: état de chargement
>      - `answeredCorrectly`: état de la dernière réponse
> 
> 2. **Styles conditionnels**:
>    - Nous utilisons des tableaux dans le prop `style` pour combiner des styles de base et conditionnels
>    - `[baseStyle, condition && conditionalStyle]` applique le style conditionnel uniquement si la condition est vraie
> 
> 3. **Barre de progression**:
>    - Utilise une division imbriquée avec largeur dynamique basée sur la progression

### Écran de résultats

Créez le fichier `src/screens/ScoreScreen.js`:

```javascript
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Share
} from 'react-native';
import { saveNewScore, getTopScores } from '../utils/storage';

export default function ScoreScreen({ route, navigation }) {
  // Récupérer les paramètres passés via la navigation
  const { score, totalQuestions } = route.params;
  
  // États locaux
  const [loading, setLoading] = useState(true);
  const [isHighScore, setIsHighScore] = useState(false);
  const [rank, setRank] = useState(null);

  // Calculer le pourcentage de bonnes réponses
  const percentage = Math.round((score / totalQuestions) * 100);

  // Sauvegarder le score et vérifier s'il s'agit d'un record
  useEffect(() => {
    saveScoreAndCheckRanking();
  }, []);

  const saveScoreAndCheckRanking = async () => {
    try {
      setLoading(true);
      
      // Sauvegarder le score
      await saveNewScore(score);
      
      // Récupérer tous les scores pour déterminer le classement
      const topScores = await getTopScores();
      
      // Vérifier si c'est un top score (parmi les 3 meilleurs)
      const scoreIndex = topScores.indexOf(score);
      if (scoreIndex !== -1) {
        setIsHighScore(true);
        setRank(scoreIndex + 1);
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du score:', error);
    } finally {
      setLoading(false);
    }
  };

  // Message de feedback basé sur le score
  const getFeedbackMessage = () => {
    if (percentage >= 90) return "Excellent! Tu es un expert!";
    if (percentage >= 70) return "Très bien! Tu as de bonnes connaissances!";
    if (percentage >= 50) return "Pas mal! Tu peux encore t'améliorer.";
    return "Continue à apprendre, tu feras mieux la prochaine fois!";
  };

  // Fonction pour partager le score
  const shareResult = async () => {
    try {
      await Share.share({
        message: `J'ai obtenu ${score}/${totalQuestions} (${percentage}%) dans le Quiz Gemini! 🎯`,
      });
    } catch (error) {
      console.log('Erreur lors du partage:', error);
    }
  };

  // Redémarrer le quiz
  const restartQuiz = () => {
    navigation.navigate('Quiz');
  };

  // Retourner à l'écran d'accueil
  const goHome = () => {
    navigation.navigate('Home');
  };

  // Afficher l'indicateur de chargement pendant la sauvegarde
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
        <Text style={styles.loadingText}>Sauvegarde de votre score...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Carte de score */}
      <View style={styles.scoreCard}>
        <Text style={styles.resultTitle}>Résultat Final</Text>
        
        {/* Affichage du score */}
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreNumber}>{score}</Text>
          <Text style={styles.totalQuestions}>/{totalQuestions}</Text>
        </View>
        
        {/* Pourcentage */}
        <Text style={styles.percentageText}>{percentage}%</Text>
        
        {/* Message de feedback */}
        <Text style={styles.feedbackMessage}>{getFeedbackMessage()}</Text>
        
        {/* Message de record si applicable */}
        {isHighScore && (
          <View style={styles.highScoreContainer}>
            <Text style={styles.highScoreText}>
              🏆 Nouveau record! #{rank} au classement
            </Text>
          </View>
        )}
      </View>
      
      {/* Boutons d'actions */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={shareResult}>
          <Text style={styles.buttonText}>Partager</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={restartQuiz}>
          <Text style={styles.buttonText}>Rejouer</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.homeButton]} 
          onPress={goHome}
        >
          <Text style={styles.buttonText}>Accueil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles du composant
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  scoreCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    width: '100%',
    alignItems: 'center',
    elevation: 4,
    marginBottom: 30,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  scoreCircle: {
    flexDirection: 'row',
    alignItems: 'baseline', // Aligne les textes de tailles différentes par le bas
    marginBottom: 10,
  },
  scoreNumber: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  totalQuestions: {
    fontSize: 28,
    color: '#666',
  },
  percentageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  feedbackMessage: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginBottom: 15,
    lineHeight: 24,
  },
  highScoreContainer: {
    backgroundColor: '#FFF9C4', // Jaune pâle
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  highScoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8F00', // Orange
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#0066CC',
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    elevation: 2,
  },
  homeButton: {
    backgroundColor: '#4CAF50', // Vert
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
```

> **Explication**:
> 
> 1. **Paramètres de route**:
>    - `route.params` contient les données passées lors de la navigation (`score` et `totalQuestions`)
> 
> 2. **API de partage**:
>    - `Share.share()` ouvre le menu de partage natif du système d'exploitation
>    - Permet de partager du texte avec d'autres applications
> 
> 3. **Navigation**:
>    - `navigation.navigate('Screen')` accède à un écran existant (ou en crée un nouveau s'il n'existe pas)
>    - Contrairement à `navigation.replace()` qui remplace l'écran actuel (utile pour éviter le retour arrière)

## Création d'un thème global

Pour maintenir une cohérence visuelle dans toute l'application, créons un fichier de thème global:

Créez le fichier `src/theme/index.js`:

```javascript
export default {
  colors: {
    primary: '#0066CC',
    secondary: '#4CAF50',
    background: '#f5f5f5',
    card: '#ffffff',
    text: '#333333',
    textSecondary: '#666666',
    border: '#dddddd',
    correct: '#4CAF50',
    incorrect: '#F44336',
    highlight: '#FFF9C4',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    small: 5,
    medium: 10,
    large: 15,
    circle: 999,
  },
  typography: {
    title: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    body: {
      fontSize: 16,
    },
    button: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      color: '#666666',
    },
  },
};
```

> **Explication**:
> - Un thème global permet de centraliser les valeurs de style comme les couleurs et les tailles
> - Cela facilite les changements globaux (comme un mode sombre)
> - Pour l'utiliser, importez le thème dans un composant: `import theme from '../theme';`
> - Puis accédez aux valeurs: `backgroundColor: theme.colors.primary`

## Tester l'application

Pour lancer l'application et la tester sur votre appareil:

```bash
# Dans le répertoire du projet
npx expo start
```

Cela générera un code QR que vous pouvez scanner avec:
- **Android**: l'application Expo Go (à télécharger depuis Google Play)
- **iOS**: l'application appareil photo (puis installez Expo Go si demandé)

### Astuces de développement:

1. **Hot reloading**: Les modifications de code sont automatiquement visibles sans redémarrer l'application
2. **Console de développement**: Appuyez trois fois sur l'écran pour ouvrir les options développeur
3. **Exécuter sur émulateur**:
   - Pour Android: `npx expo start --android` (après avoir configuré l'émulateur)
   - Pour iOS: `npx expo start --ios` (sur macOS avec Xcode)

## Déployer votre application

Pour créer une version de production avec Expo EAS:

```bash
# Installer EAS CLI
npm install -g eas-cli

# Se connecter à votre compte Expo
eas login

# Configurer le build
eas build:configure

# Créer un build pour Android
eas build --platform android

# Créer un build pour iOS (nécessite un compte Apple Developer)
eas build --platform ios
```

## Exercices pour progresser

Après avoir terminé ce tutoriel, voici quelques améliorations à essayer:

1. **Ajoutez des catégories personnalisables**:
   - Créez un écran de sélection de catégories avant le quiz
   - Modifiez l'API pour générer des questions uniquement de la catégorie choisie

2. **Créez un mode hors ligne**:
   - Mettez en cache quelques questions par défaut
   - Utilisez-les quand il n'y a pas de connexion internet

3. **Améliorez l'interface utilisateur**:
   - Ajoutez des animations lors des transitions
   - Intégrez un système de thèmes (clair/sombre)

4. **Créez des niveaux de difficulté**:
   - Facile: questions plus simples et plus de temps
   - Difficile: questions plus complexes et temps limité

## Ressources d'apprentissage complémentaires

### Documentation officielle
- [Documentation React Native](https://reactnative.dev/docs/getting-started)
- [Documentation Expo](https://docs.expo.dev/)
- [Documentation React Navigation](https://reactnavigation.org/docs/getting-started)
- [API Gemini](https://ai.google.dev/docs/gemini_api)

### Tutoriels et cours
- [React Native - The Practical Guide](https://www.udemy.com/course/react-native-the-practical-guide/)
- [CS50's Mobile App Development with React Native](https://cs50.harvard.edu/mobile/)
- [The Complete React Native + Hooks Course](https://www.udemy.com/course/the-complete-react-native-and-redux-course/)

### Communauté et support
- [React Native Community](https://github.com/react-native-community)
- [Expo Forums](https://forums.expo.dev/)
- [Stack Overflow - React Native](https://stackoverflow.com/questions/tagged/react-native)

## Conclusion

Félicitations! Vous avez créé une application de quiz complète avec React Native et Expo. Ce projet vous a permis d'apprendre:

- La structure d'un projet React Native
- L'utilisation des composants et des hooks
- La navigation entre écrans
- L'intégration d'une API d'IA (Gemini)
- Le stockage local de données
- La création d'une interface utilisateur attrayante

N'hésitez pas à continuer à enrichir cette application et à explorer davantage les possibilités offertes par React Native!