## schedules list - fait
- incalls.description
- incalls.extensions
- group.label
- queue.label

## users list - fait
- group.label
- queue.label

## callpickup list - fait
- group_interceptors.label
- group_targets.label

## extensions list - fait
- group.label
- queue.label
- incalls.description
- incalls.extensions

## funckey list - fait
destination type:
- group_label (groupmember)
- queue_name
- conference_name
- paging_name

## trunks
trunkSIP = siptemplates
trunkCustom = linecustom

peut-être faire un composant ?

quand on récupère le endpointSip
on a 
templates = [
    {uuid: "string"}
]
il faudrait avoir le label
templates [
    {
        uuid: "string",
        label: "template.label"
    }
]
on a
transport = {
    {uuid: "string"}
}
il faudrait avoir le label
transport = {
        uuid: "string",
        label; "transport.name"
}
on a
context = "uuid"
faire context_label = "context.label"
le mieux serait 
context: {
    uuid: "string,
    label: "context.label"
}
mais demande à modifier l'api

## queue Edit
v24.09
il faudra Edit le Label et non le Name
en attente maj version avec PR

non résolu en 24.17

## callfilters - ??
callfilters.interceptors.groups
id
name (non lisible)
il faudrait label

## ressources side deps - ??
- users need agentsGet car il manque queues dans agent
user {
    agent: {
        id: 1,
        links: [],
        number: "1001",
        queues: [
            {
            id: "",
            name: ""
            }
        ]
    }
}

## mohs - a discuter
music_on_hold = fields.String(allow_none=True, validate=Length(max=128))
- application
- conference
- group
- parking
- queue
- switchboard

we could have:
music_on_hold: {
    name: "moh-tenantname-uuid",
    label: "string",
    uuid: "string
}
or
music_on_hold: "moh-tenantname-uuid",
music_on_hold_label: "string",
music_on_hold_uuid: "string"

## sounds - a discuter
greeting_sound = fields.String(validate=Length(max=255), allow_none=True)
- incall
- ivr

### contexts - a discuter
context = fields.String(required=True)
- conference
- extensionsList (remplaçable avec contextsAll facilement)
- GroupeCreate/edit
- IncallCreate/edit
- LineCreate/edit
- ParkingCreate/edit
- QueueCreate/edit
- TrunkCreate/edit
- UserEditLine
- VoicemailsCreate/edit