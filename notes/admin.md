## multi tenant
https://wazo-dev.atlassian.net/browse/WAZO-1288
need some adjustements

il manque :
- queue
- applications
- callfilters
- outcalls
- callpermissions

## missing API ?
https://api.wazo.io/documentation/api/application.html#tag/applications
https://api.wazo.io/documentation/api/agent.html#tag/agent

## error Failed to execute 'json' on 'Response': Unexpected end of JSON input
queues.js
queueUpdate
soucis avec les update.error

```js
 const res = await provdConfigParamEdit(item);
      if (res.status) {
        hasErrors = true;
        setErrors({ title: res.status, description: res.message });
      }
```

## A FAIRE

### meetings
error 503 service unavailable
savoir pourquoi

actuellement, je l'ai retiré,
mais il faudrait qu'un admin puisse créer une conférence pour une personne (une secrétaire par exemple)

## Configuration Globale

### export index
permettre à toriphone desktop d'avoir le sidebar menu pour responsive
il faut exporter le sidebar et un menu sidebar séparer, mais que cela soit au final dans le apiProvider
pour l'instant, cela va concerné peut de monde et la vue d'admin demande une page large.

il faudrait aussi pouvoir hériter du togglesidebar du desktop afin que ce soit identique.

a voir pour une future version

### ne semble pas fonctionner quand je me connecte avec julien@tori.fr (tenant admin)
mais fonctionne avec super@tori.fr (admin master tenant)
vérifier le cache et/ou la suppression / réécriture du user dans le localStorage

soucis corrigé en vidant le cache.

si
connect super
déconnect super
connect julien
le localStorage tori_admin_session n'est pas créé, comme si l'user n'était pas correctement créé et inexistant
d'où les erreurs 401 sur l'ensemble des requêtes

et tori_admin_log_info n'est pas mis à jour !

en supprimant le localStorage de firebase, ça résout le soucis
ça vient donc de cet partie du code dans le auth module

## acls
modifier pour que ce soit utilisable

dans le fichier <resource>List.jsx
<TableCaption>mettre les acls nécessaires ??</TableCaption>

## endpoints tenant localization
https://api.wazo.io/documentation/api/configuration.html#tag/localization/operation/get_localization
peut ainsi être utilisé lors de la création de la messagerie, en prenant cette valeur par défaut.

devrait faire les modifications suivantes automatiquement:
https://support.wazo.io/hc/fr-fr/articles/360046892472-Configurer-un-EUC-Stack-pour-la-France
+ les voicemails !


il faudrait avoir des config_device_Locale pour chaque langue
faire en sorte que le device prenne le template correspondant automatiquement

pour l'instant, mon interface ne permet que d'avoir le default config device,
car l'api me semble un peu bizarre.
A approfondir !

Mais conference bridge est aussi global.

donc un serveur est finalement mono langue pour le moment !

asterisk sounds ??
https://downloads.asterisk.org/pub/telephony/sounds/

### users
userCreate
ne prend en compte que le premier "internal" dans les extensions possibles.

la logique devrait être au niveau de l'api
sans template, je ne print pas le errors
il faudrait l'intégrer en haut de page

les helpers ne retournent pas les erreurs !
surout pour le userEdit
à modifier !

### generic asterisk page
passer les options en array !
rtp --> general = object 
voicemailGeneral --> object
confbridge --> object

## policyGroups
Edit/create
dans le form membre, afficher username au lieu de firstname/lastname !!
groupMembersForm

## destinationsForm
voir pour faire un switch case ??
outcall --> fait ! mais nécessite un get pour retrouver le label, cf notes plus bas

## traduction pages
application helper
modifier le helper pour avoir la traduction

Dans certaines sections comme ivr ou callfilters, les noms des clés (helper, helper_timeout) ne suivent pas toujours une convention stricte. 
Unifier leur style serait bénéfique (par exemple : 
utiliser xxx_help partout).

## error create / edit required input
actuellement, seulement utilisé dans pagings et parkings et polycyGroup
faire un module
qui peut prendre en charge différent type
voir l'erreur 404 si on supprime une chose inexistante.

```js
if (!parking.name || parking.name.trim() === "") {
      validationErrors.name = tErrors("requiredName");
      setError(validationErrors);
      return;
    }
```

## configuration des appels
ajouter liste ?
endpoint

master tenant only:
.ha ??
.hep ??
.confbridge --> Fait (manque sound bridgeOptions, utile ?)
.sound files system ??
.provisioning registrars ??
.device unallocated dans devices ??

## alls
dans listcontent
vérifier si delete error
puis mettre à jour ou non la liste
print error également !
resource.ok / resource.status == "204"
resource.not ok / resource.status == "400" (error) || "404" (not found)

exemples delete extensions outcall qui est lié à un outcall

## Design upgrade in further version

### webhooks
mettre la traduction des events en ajoutant si user related ou tenant related
récupérer le tenant_uuid
si pas de user, mettre le tenant_uuid
si user, retirer le tenant_uuid (events_wazo_uuid)

### phonebooksold
faire avec un sidebar pour phonebook et contact en content ?

### admin sounds
voir, faire un sidebar,
cf audio_library.png

### Policies
ajouter acl dans create
mettre en place un tableau avec des checkbox
acl | controle | lecture | ecriture

pour le menu admin, bien vérifier si service.# ou service.read/write
sinon, cacher le menu

### policies bis
bouton ajouts acl a revoir
faire une liste type ReactSelect pour choisir dans la liste d'acl
pour éviter les erreurs
voir faire un plugins qui ajoute un endpoint Acl

### voicemails
voicemail Create
mettre language et timezone par défaut en fonction de la langue du tenant.

### code review soucis affichage resource sans label
prendre exemple sur
trunkSipForm et trunkContextForm
ça permet d'avoir le label sans ajouter une propriété dans l'objet
et utilisable en formulaire unique pour create/edit

## Select chakra et react
contexts a un contextForm avec react-Select
voir dans quel cas on utilise l'un ou l'autre
et faire un choix pour uniformiser si possible

## funckeysfom et destinationForm

bsfilter non utilisé car problématique
a corriger

helper funckeys
conference_id
queue_id

helper destination
fallbacks.noanswer_destination.queue_label: null
skill_rule_label: ?? car que skill_rule_id
sound
a faire remonter dans un ticket,
voir demander pour faire un PR

{
    "type": "outcall",
    "exten": "1",
    "outcall_id": 1,
    //"outcall_name: "the name"
}

## profiles
pour avoir les noms, il me faut les sources
je devrait avoir cette information directement quand je récupère mon profil (default)

## tenant import
https://wazo-platform.org/uc-doc/administration/import_export
can create a plugin
or use js client to push config