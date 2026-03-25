# A faire

## dialog / template
dialog ne doit plus être dans Table (template) 
--> renommer Template... en Pages dans un dossier Templates/Pages
faire en sore que les dialog details / delete soient hors du template

## recherche des contacts
https://api.wazo.io/documentation/api/contact.html#tag/directories/operation/reverse
peut permettre la recherche de contacts des utilisateurs ?

# ExternalApps
- penser son évolution
  - twilio (srv, id)
  - facturation ? dans custom
  - sms (ovh, twilio, sarbacane, digitaleo, smsEnvoi)

## plugins
- vérifier comment on sait si un plugin du market est installé
- prendre en charge les nouvelles api de :
  - wazo-prometheus-exporter
  - wazo-calld-queue
  - wazo-calld-application-continue
  - wazo-cel-plugin
- faire en sorte que les infos soit à jour en allant chercher sur
  - https://<url>>/blob/master/wazo/plugin.yml

## Agent
https://api.wazo.io/documentation/api/agent.html#tag/agents/operation/get_agents
dans un futur, il sera possible de connecter un agent à une queue particulière
et d'avoir de meilleure stats par agent et par queue

### french rules
https://documentation.xivo.solutions/en/latest/installation/xivo/installation/defaultfrenchconf.html#default-french-conf

## cdrs
- améliorer la recherche, ajout de filtres, voir ce qui est possible
  https://wazo-platform.org/documentation/api/cdr.html#tag/cdr/paths/~1cdr/get

## phonebookscontacts
- il faudrait ajouter un système de filtre / pagination
- https://api.wazo.io/documentation/api/contact.html#tag/phonebook/operation/list_phonebook_source_contacts

## queues
- add options on edit, je préfère un tableau plus explicite et pour les options utiles
- faire une liste des options déjà prises en compte
- add ring strategy, joinempty, leaveempty on create

## forms
unification du Form pour create et edit
- lines
- queues - queueForm fait pour Edit
- devices - à voir, car le Edit ne me plait pas

## stats
- agent
  - choix des dates
  - choix de l'agent
- queue
  - choix des dates
  - choix de la queue
  - obtenir QOS

### phonebooksSources
mettre des textHelper

## phone numbers
- utiliser l'api range pour mettre plusieurs numéros d'un coup
  https://api.wazo.io/documentation/api/configuration.html#tag/phone-numbers/operation/create_phone_numbers_range
- pouvoir sélectionner le main
  https://api.wazo.io/documentation/api/configuration.html#tag/phone-numbers/operation/set_phone_number_main

## tooltip
cf todo_pr
Schedules --> manque incall
callpickers --> le tooltip doit prendre 2 tableaux, groups et users, groups manque label
extensions

## webhooks
- il n'y a pas de pagination, quand je mets le filtre en place, cela renomme la liste et duplique un même résultat.
- j'ai créer la metadata name par défaut & la fonction subscriptionsGetByName
- il serait possible d'ajouter une recherche par nom ( metadata name) pour affiner la liste
- pouvoir filtrer par tags

## V25.01
api change
https://wazo-dev.atlassian.net/browse/WAZO-3442

## 25.02
- Emails: wazo-auth now has an email notification extension point to allow custom emailing technologies to be used
  cela demande a créer un plugin:
- https://api.wazo.io/documentation/api/authentication.html#tag/users/operation/reset_password
- https://wazo-platform.org/uc-doc/system/wazo-auth/developer/#email-notification
- https://github.com/wazo-platform/wazo-auth/blob/master/wazo_auth/plugins/email_notification/smtp.py

## pagings \ intercom
il manque le choix
- intercom (paging)
- callfilter (bs filter)

## filtres manquants
mettre serviceAll + search
- sounds
- mohs
- contexts

## filtres
Les éléments suivants sont chargé au démarrage et au changement de tenant, car nécessaire pour retrouver un label pour afficher correctement.
Pour éviter cela, il faudrait modifier wazo-confd, cf labelled relations
concerné:
- groupsGet(); // groupsAll + search // funckeys Helper
- conferencesGet(); // conferencesAll + search // funckeys Helper
- queuesGet(); // queuesAll + search // funckeys Helper
- mohsGet();
- contextsGet();
- soundsGet();

search non mise en place:

- phonebooksContacts, dépend de phonebooksSelected et créé une complexité. Mais à voir dans une prochaine release.
- fichiers sonores: cf soundsGet
- musique d'attente: cf mohsGet
- contexts: cf contextsGet

## labelled relations

### groups
utilise groupsAll actuellement, mais supprimable après maj confd
- callpickup
- extension
- user

## user_uuid label
modifier confd pour retourner email, firstname, lastname lors des relations user_uuid
- sessions
- blocklist (fait par wazo)