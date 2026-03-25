# toriphone-admin-module

Ce module renvois du code Jsx prêt à l'emploi pour afficher l'interface d'administration.

## build
Il faut faire le build avant chaque release:

Création du module

```sh
npm run build:lib
```

Création du site toriphone-ui
```sh
npm run build:web
```

## utilisation des tags
Créer un tag :
```sh
git tag v1.0.0
```

Pousser le tag vers le dépôt distant :
```sh
git push origin v1.0.0
```

supprimer un tag :

```sh
git tag -d v1.0.0
git push origin --delete v1.0.0
```

## importation

importer la branche par défaut:
```json
"toriphone-admin": "git+https://github.com/duduclx/toriphone-admin.git",
```

importer une version spécifique :
```json
"toriphone-admin": "git+https://github.com/duduclx/toriphone-admin.git#v1.0.0",
```

importer une branche spécifique :
```json
"toriphone-admin": "git+https://github.com/duduclx/toriphone-admin.git#feature-branch",
```

## installation
```sh
npm install
```

## utilisation

dans le fichier où doit apparaitre l'interface:

```js
import ApiProviderWithSettings from "toriphone-admin";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

...

<I18nextProvider i18n={i18n}>
    <ApiProviderWithSettings i18nInstance={i18n} />
</I18nextProvider>
```

## dépedances

Dans votre projet, vous devez avoir obligatoirement avoir:
- "@chakra-ui/react": "^2.10.9",
- "react": "^19.0.0",
- "react-dom": "^19.0.0"