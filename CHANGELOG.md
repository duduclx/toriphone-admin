# Changelog

## v1.1.14
- remplacement de toriphone-auth-module par toriphone-auth
- mise à jour des packages

## v1.1.13-demo
- corrections graphique lors de l'édition d'un utilisateur
- l'utilisateur peut avoir 2 lignes avec le même numéro
- ajout de l'application externe calendarMeeting

## v1.1.12-demo
- améliorations des webhooks

## v1.1.11-demo
- mise à jour toriphone-auth-module#1.1.12-demo (support LDAP)
- mise à jour des packages
- correction du forumlaire LDAP

## v1.1.10-demo
- correction des styles dans React-Select pouvant provoquer une erreur dans toriphone Desktop

## v1.1.9-demo
- correction couleur iconButtonStatus.jsx

## v1.1.8-demo
- mise à jour packages
- chakra-ui v2 -> v3
- simplification du fichier traduction
- corrections mineures

## v1.1.7-demo
- corrections mineures

## v1.1.6-demo
- mise à jour des packages
- support chakra-ui v3

## v1.1.5
- correction d'ajout de trunk SIP opérateur lorsque connecté en root

## v1.1.4
- correction de la liste de détails des abonnements
- suppression de firebase
- suppression de code inutile (useMutation)
- mise à jour de toriphone-auth-module#v1.1.7

## v1.1.3
- fix traduction manquante

## v1.1.2
- fix mauvais listing des webhooks après création / édition
- mise à jour du label de l'external app web
- ajout de l'external app subscription
- modification de l'external app licence, et renommée en portal
- ajout de l'external app personnalisée

## v1.1.1
- retrait de console.log
- mise à jour toriphone-auth-module#v1.1.6
- ajout de l'external app Licence

## V1.1.0
- fix nom du serveur vide lorsque connecté en root
- mise à jour toriphone-auth-module#v1.1.5

## V1.0.9
- meilleure gestion des sessions (changement d'utilisateur)
- liste des tenants affichée pendant le chargement
- mise à jour React19
- mise à jour toriphone-auth-module#v1.1.4

## V1.0.8
- ajout du menu abonnements
- possiblité de choisir l'abonnement de l'utilisateur lors de la création et la modification
- correction du champ Nom lors de l'édition d'une ligne SIP
- mise à jour de la liste des plugins du market place

## V1.0.7 (25.08)
- les groupes d'appels ont l'option "ignorer les renvois"
- les utilisateurs peuvent activer/désactiver la supervision
- fix edition d'un utilisateur sans messagerie
- mise à jour des packages

## V1.0.6
- ajout de la possibilité de supprimer toutes les sessions d'un utilisateur en une fois
- modifier le nom d'un utilisateur modifie aussi le caller_id et le nom de la messagerie
- fix mauvaise extension lors de l'édition d'une conférence
- fix traduction manquante dans identités
- mise à jour de toriphone-auth-module#v1.0.5

## v1.0.5
- mise à jour de toriphone-auth-module#v1.0.4
- suppression de l'ajout du userUuid dans portal
- fix de l'erreur pageCount NaN
- fix warning <button> cannot appear as a descendant of <button> dans le menu
- désactivation du debug de i18next
- modification de la couleur du logo de la page "A propos"
- fix html error et traduction sur le formulaire des touches de fonctions

## v1.0.4
- correction visuelle du formulaire des répondeurs
- affichage de la liste des numéros bloqué plus rapide
- correction du formulaire d'édition du profil d'annuaire
- ajout d'un bouton de rechargement de l'historique d'appels
- ajout d'un bouton de rechargement des sessions en cours
- uniformisation de la mise en page des formulaires
- mise à jour des packages
- suppression du paquet toriphone-theme-module
- mise à jour de toriphone-auth-module#v1.0.2

## v1.0.3
- mise à jour de sécurité
- ajout de la version minimale compatible du serveur dans la page A propos
- page user, DTMF déplacé dans services, et renommé l'onglet général en informations
- correction typographique du choix de la langue
- ajout de la page Numéros bloqués (v25.06)
- ajout d'indication de chargement lors de la création / édition ou suppression d'un élément
- correction de la position des boutons lors de la création d'un utilisateur

## V1.0.2
- le formulaire des touches de fonction de l'utilisateur prend maintenant toute la largeur
- fix et amélioration du formulaire des appels sortant
- renommage du menu statistiques en activités
- ajout du choix de langue dans le menu
- ajout du menu Surveillance / Etat des services & retention
- ajout du choix de la langue pour le tenant
- ajout des statistiques des files d'attente
- ajout menu saml et meilleur réunification des méthodes d'authentification SSO et LDAP
- fix formulaire création utilisateur

## V1.0.1
- fix formulaire des trunks
- fix création appel entrant sans trunk
- appel entrant, incall.description = incall.extensions[0].exten, suite à modfi confd, peut être utile.
- groupe d'appel :
    - ajout destination congestion
    - ajout du nombre d'appels maximum
    - ajout checkbox activer le groupe
    - ajout de textes d'aides
    - formulaire de création et édition identique
- numéro d'appelant, correction nom à identifiant de l'appelant
- file d'attente:
    - ajout checkbox activer la file d'attente
    - ajout de l'onglet DTMF
- standard:
    - amélioration du formulaire
- appels sortant
    - formulaire de création et édition identique
    - suppression des extensions liées lors de la suppression de l'appel sortant
    - correction d'un soucis permettant d'ajouter une seule extension à la fois
- webhooks:
    - fix pagination qui n'existe pas sur cette ressource
    - mise en place de la metadata name par défaut (non utilisée actuellement)
- musique d'attente:
    - amélioration graphique du formulaire d'édition (onglet général et fichiers)
- parking:
    - formulaire de création et édition identique
    - correction d'une erreur lors de l'édition du timeout
- annuaire:
    - formulaire de création et édition identique
- contacts:
    - formulaire de création et édition identique
- intercom:
    - fix son d'annonce
    - formulaire de création et édition identique
- annonce d'enregistrement:
    - ajout du menu disponible pour wazo-platform 25.04
- profils:
    - ajout d'une information si pas d'annuaire disponible

## V1.0.0
- mise en place pagination et filtre
- fix erreur création horaires
- fix erreur création serveur vocal intéractif
- fix funkeys groupmember groupe non affiché lors de l'édition
- ajout d'une info si aucune compétence disponible lors d'ajout de compétence à un agent

## V0.9.9
- mise à jour toriphone-auth-module#v1.0.0
- mise en place users dans firebase

## V0.9.8
- traduction formulaire RTP général
- correction formulaire RTP général (options oui/non)
- mise à jour toriphone-auth-module#v0.9.8
- mise à jour des packages
- suppression package inutile

## v0.9.7
- modification de external apps, pour permettre la configuration stun/turn
- mise à jour de toriphone-auth-module#v0.9.5

## v0.9.6
- fix add queue with no members
- fix error on queue delete
- remove meetings sidebar menu (will had it back later)
- add extension queue column
- clean unused confd/identities api, actually authUsers

## v0.9.5
- fix general iax form
- fix timezone from prov device general
- change menu to display user name and user tenant
- change top sidebar to always display the tenant

## v0.9.4
- fix scroll issues
- fix hooks in sidebar
- default value

## v0.9.3
update toriphone-auth-module#v0.9.4
fix wss reconnect

## v0.9.2
use Wazo and apiClient from toriphone-auth-module#0.9.2
- fixed the refresh token process

remove @wazo/sdk from package.json

## v9.0.1
use only one apiClient from toriphone-auth-module#0.9.2

token is refreshed by toriphone-auth-module
user token
apiClient token
wss token

## v9.0.0
root can now log in from toriphone-auth-module#0.9.1