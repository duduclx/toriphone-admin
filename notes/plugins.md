## internal plugins

exemple, j'ai des applications comme:
* mastodonte
* joplin
* slack
* openproject
* gadael
* jellyfin

## queue stats

i have two team, so:
team greeting, with a queue "gretting", and a manager wich is not in the queue, but need stats.
team support, with a queue "support", and a manager wich is not in the queue, but need stats.
I don't want than greeting's manager access support stats.
I don't want than support's manager access gretting stats.

is there a way to define access to queue stats anywhere ?
or should i create a plugin for that ?

typically, queue have :
members.agents
members.users
i'd like to have
members.manager / supervisor !!

surely i have to had acls for the manager, to allow to request stats through the api.

Yes just add ACL you need and use it in your plugin.

## IVR stats
i remember the old time on xivo, i got an IVR, and set "record" on actions made during the IVR dialplan.
So i was able to know incomming calls, abandonned calls, and selected choices, but have to query the database directly.

In the api documentation, i don't see anything around the ivr statistics.

imagine i have an IVR with choices #1, #2, #3, #9
i want to know how many times each choice have been selected, how much calls have been abandonned.

Where can i get it ?
Am i the only one to have this kind of request ?

You can implement this yourself, by sending your IVR options to custom extensions running custom dialplan that record the events into a database table or file.
Wazo IVRs are pretty basic as they are. I don't hear much about requests for IVRs myself, but I'm sure this kind of thing has come up at some point, just not a priority at the moment.

as i remember, i used attached_data, and a long and mysterious querie to make a report:
exten = s,n,CELGenUserEvent(ATTACHED_DATA,my_key=my_value)
as it is part of asterisk, this is surely still available.

https://documentation.xivo.solutions/en/latest/contact_center/pack_reporting/index.html#attached-data

Yep, CELGenUserEvent end up in the cel table, which is the basis of call logs(wazo-call-logd). But custom CEL require custom support in call-logd, so they won't appear in the call logs, but you can access the cel database table on your own.

4:26 PM
(may be easier to use if you used specific CEL events for specific situations, such as IVR_OPTION_SELECTED instead of ATTACHED_DATA, that way you can do something like select * from cel where eventtype = 'IVR_OPTION_SELECTED to process stats for IVR options).

## services for user / bill
attach
users [
    {uuid, firstname, lastname, link}
]
calls.month.total_duration
calls.month.average_cost
calls.month.estimated_bill
total_bill
total_calls