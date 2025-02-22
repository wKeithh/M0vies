# Projet M0vies : Interfaces riches

## Membres du projet
- **Moser Keith**
- **Leroux Mathis**

## Degré d'expérience avec React
Nous avons un niveau débutant en React.

## Pair Programming
Nous avons en nous répartissant les tâches.

---

## Description du projet
Cette application est une plateforme interactive permettant de visualiser un film tout en offrant plusieurs fonctionnalités d'interaction :
- Navigation dans le contenu via un chapitrage.
- Carte interactive illustrant les lieux du film avec des points d'intérêt.
- Liste dynamique de mots-clés affichée pendant la lecture.
- Chatroom pour discuter et partager des moments du film.

L'interface permet de synchroniser les différentes interactions :
- Un clic sur un point d'intérêt sur la carte ajuste la vidéo et les mots-clés affichés.
- Un clic sur un chapitre modifie la position de la vidéo et met à jour les informations liées.

## Fonctionnalités principales
- **Composant Vidéo** : Affiche le film et permet la navigation via chapitrage.
- **Composant Carte Interactive** : Points d'intérêt cliquables synchronisés avec la vidéo.
- **Composant Mots-Clés** : Affiche des mots-clés en temps réel, cliquables pour plus d'informations.
- **Composant Chatroom** : Discussion entre utilisateurs avec partage de moments du film.
- **Composant Message Chat** : Envoi de messages dans la chatroom, certains contenant des pointeurs vers la vidéo.


## Installation et exécution

1. Cloner le dépôt :
   ```sh
   git clone https://github.com/wKeithh/M0vies.git
   cd M0vies/movies
   ```
2. Placer le film dans le répertoire public avec le nom
    ```
    Route_66_-_an_American_badDream_512kb.mp4
    ```
3. Installer les dépendances :
   ```sh
   npm install --force
   ```
4. Lancer l'application :
   ```sh
   npm start
   ```

## Structure du projet
```
movies/
│── src/
│   │── Components/
│   │   ├── Chat.js
│   │   ├── Lecteur.js
│   │   ├── MapExemple.js
│   │   ├── PageLayout.js
│   │   ├── WikiContent.js
│── public/
│   │── Route_66_-_an_American_badDream_512kb.mp4
│── package.json
│── README.md
```

## Dépôt Git
https://github.com/wKeithh/M0vies.git

---


