/*
skills
a les sous enfants de agents.skills et queues.skillrules

dird.backends devrait prendre en charge en enfant les type de backend

calld is in application api documentation

se limiter a
```
"service.ressources.#"
"service.ressources.read"
"service.ressources.create"
"service.ressources.{ressource_id ou ressource_uuid}.delete"
"service.ressources.{ressource_id ou ressource_uuid}.update"
```

*/
const acls = {
    "auth": {
        "_full_access": [
            "auth.#"
        ],
        admin: {
            full_access: [
                "auth.admin.#"
            ],
            read_only: [],
            create: [],
            delete: [],
            edit: []
        },
        backends: {
            full_access: [
                "auth.backends.#"
            ],
            read_only: [
                "auth.backends.ldap.read",
                "auth.backends.saml.read"
            ],
            create: [],
            delete: [
                "auth.backends.ldap.delete",
                "auth.backends.saml.delete",
            ],
            edit: [
                "auth.backends.ldap.update",
                "auth.backends.saml.update",
            ]

        },
        emails: {
            full_access: [
                "auth.emails.#"
            ],
            read_only: [
                "auth.emails.{email_uuid}.confirm.read"
            ],
            create: [],
            delete: [],
            edit: [
                "auth.emails.{email_uuid}.confirm.edit"
            ]
        },
        external: {
            full_access: [
                "auth.{auth_type}.external.#"
            ],
            read_only: [
                "auth.{auth_type}.external.config.read",
                "auth.{auth_type}.external.users"
            ],
            create: [
                "auth.{auth_type}.external.config.create"
            ],
            delete: [
                "auth.{auth_type}.external.config.delete"
            ],
            edit: [
                "auth.{auth_type}.external.config.edit",
            ]
        },
        groups: {
            full_access: [
                "auth.groups.#"
            ],
            read_only: [
                "auth.groups.read",
                "auth.groups.{group_uuid}.read"
            ],
            create: [
                "auth.groups.create"
            ],
            delete: [
                "auth.groups.{group_uuid}.delete"
            ],
            edit: [
                "auth.groups.{group_uuid}.edit"
            ]
        },
        idp: {
            full_access: [
                "auth.idp.#"
            ],
            read_only: [
                "auth.idp.read"
            ],
            create: [
                "auth.idp.{idp_type}.users.create"
            ],
            delete: [
                "auth.idp.{idp_type}.users.{user_uuid}.delete"
            ],
            edit: [
                "auth.idp.{idp_type}.users.{user_uuid}.create"
            ]
        },
        policies: {
            full_access: [
                "auth.policies.#"
            ],
            read_only: [
                "auth.policies.read",
                "auth.policies.{policy_uuid}.read"
            ],
            create: [
                "auth.policies.create"
            ],
            delete: [
                "auth.policies.{policy_uuid}.delete"
            ],
            edit: [
                "auth.policies.{policy_uuid}.edit"
            ]
        },
        sessions: {
            full_access: [
               "auth.sessions.#"
            ],
            read_only: [
                "auth.sessions.read"
            ],
            create: [],
            delete: [
                "auth.sessions.{session_uuid}.delete"
            ],
            edit: []
        },
        tenants: {
            full_access: [
               "auth.tenants.#"
            ],
            read_only: [
                "auth.tenants.read",
                "auth.tenants.{tenant_uuid}.read",
                "auth.tenants.{tenant_uuid}.domains.read"
            ],
            create: [
                "auth.tenants.create"
            ],
            delete: [
                "auth.tenants.{tenant_uuid}.delete"
            ],
            edit: [
                "auth.tenants.{tenant_uuid}.edit"
            ]
        },
        users: {
            full_access: [
               "auth.users.#"
            ],
            read_only: [
                "auth.users.read",
                "auth.users.{user_uuid}.read"
            ],
            create: [
                "auth.users.create"
            ],
            delete: [
                "auth.users.{user_uuid}.delete",
            ],
            edit: [
                "auth.users.{user_uuid}.edit"
            ]
        },
        sessions: {
            full_access: [
              "auth.users.{user_uuid}.sessions.#"
            ],
            read_only: [
                "auth.users.{user_uuid}.sessions.read"
            ],
            create: [],
            delete: [
                "auth.users.{user_uuid}.sessions.{session_uuid}.delete",
                "auth.users.{user_uuid}.tokens.{client_id}.delete"
            ],
            edit: []
        },
        reset_password: {
            edit: [
                "auth.users.password.reset.{user_uuid}.create",
            ]
        },
    },
    "call-logd": {
        "_full_access": [
            "call-logd.#"
        ],
        "agents": [
            "call-logd.agents.#",
            "call-logd.agents.statistics.read",
            "call-logd.agents.statistics.{agent_id}.read"
        ],
        "cdr": [
            "call-logd.cdr.#",
            "call-logd.cdr.read",
            "call-logd.cdr.{cdr_id}.read",
            "call-logd.cdr.recordings.media.export.create",
            "call-logd.cdr.recordings.media.delete",
            "call-logd.cdr.{cdr_id}.recordings.{recording_uuid}.media.delete",
            "call-logd.cdr.{cdr_id}.recordings.{recording_uuid}.media.read",
            "call-logd.users.{user_uuid}.cdr.read"
        ],
        "exports": [
            "call-logd.exports.#",
            "call-logd.exports.{export_uuid}.read",
            "call-logd.exports.{export_uuid}.download.read",
            /*
            "call-logd.cdr.recordings.media.export.create"
            */
        ],
        "queues": [
            "call-logd.queues.statistics.#",
            "call-logd.queues.statistics.read",
            "call-logd.queues.statistics.{queue_id}.qos.read",
            "call-logd.queues.statistics.{queue_id}.read"
        ],
        "retention": [
            "call-logd.retention.#",
            "call-logd.retention.read",
            "call-logd.retention.update"
        ],
        "users": [
            "call-logd.users.{user_uuid}.cdr.read"
        ]
    },
    "calld": {
        "_full_access": [
            "calld.#",
        ],
        "calls": [
            "calld.calls.#",
            "calld.calls.create",
            "calld.calls.read",
            "calld.calls.{call_id}.delete",
            "calld.calls.{call_id}.read",
            "calld.calls.{call_id}.answer.update",
            "calld.calls.{call_id}.dtmf.update",
            "calld.calls.{call_id}.hold.start.update",
            "calld.calls.{call_id}.hold.stop.update",
            "calld.calls.{call_id}.mute.start.update",
            "calld.calls.{call_id}.mute.stop.update",
            "calld.calls.{call_id}.park.update",
            "calld.calls.{call_id}.record.start.update",
            "calld.calls.{call_id}.record.stop.update"
        ]
    },
    "confd": {
        "_full_access": [
            "confd.#"
        ],
        "access_features": [
            "confd.access_features.#",
            "confd.access_features.create",
            "confd.access_features.read",
            "confd.access_features.{access_feature_id}.read",
            "confd.access_features.{access_feature_id}.update",
            "confd.access_features.{access_feature_id}.delete"
        ],
        "agents": [
            "confd.agents.#",
            "confd.agents.create",
            "confd.agents.read",
            "confd.agents.{agent_id}.read",
            "confd.agents.{agent_id}.update",
            "confd.agents.{agent_id}.delete",
            "confd.agents.{agent_id}.skills.#",
            "confd.agents.{agent_id}.skills.{skill_id}.update",
            "confd.agents.{agent_id}.skills.{skill_id}.delete",
            "confd.agents.skills.create",
            "confd.agents.skills.read",
            "confd.agents.skills.{skill_id}.read",
            /*
            "confd.users.{user_id}.agents.{agent_id}.update",
            "confd.users.{user_id}.agents.delete",

            "confd.queues.{queue_id}.members.agents.{agent_id}.update",
            "confd.queues.{queue_id}.members.agents.{agent_id}.delete",
            */
        ],
        "application": [
            "confd.applications.#",
            "confd.applications.read",
            "confd.applications.{application_uuid}.read",
            "confd.applications.{application_uuid}.update",
            "confd.applications.{application_uuid}.delete",
            /*
            "confd.lines.{line_id}.applications.{application_uuid}.#",
            "confd.lines.{line_id}.applications.{application_uuid}.update",
            "confd.lines.{line_id}.applications.{application_uuid}.delete",
            */
        ],
        "asterisk": [
            "confd.asterisk.#",
            "confd.asterisk.confbridge.wazo_default_bridge.read",
            "confd.asterisk.confbridge.wazo_default_bridge.update",
            "confd.asterisk.confbridge.wazo_default_user.read",
            "confd.asterisk.confbridge.wazo_default_user.update",
            "confd.asterisk.features.applicationmap.read",
            "confd.asterisk.features.applicationmap.update",
            "confd.asterisk.features.featuremap.read",
            "confd.asterisk.features.featuremap.update",
            "confd.asterisk.features.general.read",
            "confd.asterisk.features.general.update",
            "confd.asterisk.hep.general.read",
            "confd.asterisk.hep.general.update",
            "confd.asterisk.iax.callnumberlimits.read",
            "confd.asterisk.iax.callnumberlimits.update",
            "confd.asterisk.iax.general.read",
            "confd.asterisk.iax.general.update",
            "confd.asterisk.pjsip.doc.read",
            "confd.asterisk.pjsip.global.read",
            "confd.asterisk.pjsip.global.update",
            "confd.asterisk.pjsip.system.read",
            "confd.asterisk.pjsip.system.update",
            "confd.asterisk.queue.general.read",
            "confd.asterisk.queue.general.update",
            "confd.asterisk.rtp.general.read",
            "confd.asterisk.rtp.general.update",
            "confd.asterisk.rtp.ice_host_candidates.read",
            "confd.asterisk.rtp.ice_host_candidates.update",
            "confd.asterisk.sccp.general.read",
            "confd.asterisk.sccp.general.update",
            "confd.asterisk.voicemail.general.read",
            "confd.asterisk.voicemail.general.update",
            "confd.asterisk.voicemail.zonemessages.read",
            "confd.asterisk.voicemail.zonemessages.update",
        ],
        "callfilters": [
            "confd.callfilters.#",
            "confd.callfilters.read",
            "confd.callfilters.create",
            "confd.callfilters.{callfilter_id}.delete",
            "confd.callfilters.{callfilter_id}.read",
            "confd.callfilters.{callfilter_id}.update",
            "confd.callfilters.{callfilter_id}.fallbacks.read",
            "confd.callfilters.{callfilter_id}.recipients.users.update",
            "confd.callfilters.{callfilter_id}.surrogates.users.update",
            "confd.callfilters.{callfilter_id}.fallbacks.update",
        ],
        "callpermissions": [
            "confd.callpermissions.#",
            "confd.callpermissions.create",
            "confd.callpermissions.read",
            "confd.callpermissions.{callpermission_id}.delete",
            "confd.callpermissions.{callpermission_id}.read",
            "confd.callpermissions.{callpermission_id}.update",
            /*
            "confd.groups.{group_uuid}.callpermissions.{call_permission_id}.delete",
            "confd.groups.{group_uuid}.callpermissions.{call_permission_id}.update",

            "confd.outcalls.{outcall_id}.callpermissions.{call_permission_id}.delete",
            "confd.outcalls.{outcall_id}.callpermissions.{call_permission_id}.update",

            "confd.users.{user_id}.callpermissions.{call_permission_id}.delete",
            "confd.users.{user_id}.callpermissions.{call_permission_id}.update",
            */
        ],
        "callpickups": [
            "confd.callpickups.#",
            "confd.callpickups.create",
            "confd.callpickups.read",
            "confd.callpickups.{callpickup_id}.delete",
            "confd.callpickups.{callpickup_id}.read",
            "confd.callpickups.{callpickup_id}.update",
            "confd.callpickups.{callpickup_id}.interceptors.groups.update",
            "confd.callpickups.{callpickup_id}.interceptors.users.update",
            "confd.callpickups.{callpickup_id}.targets.groups.update",
            "confd.callpickups.{callpickup_id}.targets.users.update",
        ],
        "conferences": [
            "confd.conferences.#",
            "confd.conferences.create",
            "confd.conferences.{conference_id}.delete",
            "confd.conferences.{conference_id}.read",
            "confd.conferences.{conference_id}.update",
            "confd.conferences.{conference_id}.extensions.{extension_id}.update",
            "confd.conferences.{conference_id}.extensions.{extension_id}.delete",
            /*
            "confd.asterisk.confbridge.wazo_default_bridge.read",
            "confd.asterisk.confbridge.wazo_default_bridge.update",
            "confd.asterisk.confbridge.wazo_default_user.read",
            "confd.asterisk.confbridge.wazo_default_user.update"
            */
        ],
        "contexts": [
            "confd.contexts.#",
            "confd.contexts.create",
            "confd.contexts.read",
            "confd.contexts.update",
            "confd.contexts.{context_id}.delete",
            "confd.contexts.{context_id}.read",
            "confd.contexts.{context_id}.contexts.update",
            "confd.contexts.{context_id}.reanges.{range_type}.read",
        ],
        "devices": [
            "confd.devices.#",
            "confd.devices.create",
            "confd.devices.read",
            "confd.devices.{device_id}.delete",
            "confd.devices.{device_id}.read",
            "confd.devices.{device_id}.update",
            "confd.devices.{device_id}.lines.read",
            "confd.devices.unallocated.read",
            "confd.devices.unallocated.{device_id}.update",
            "confd.devices.unallocated.{device_id}.autoprov.read",
            "confd.devices.unallocated.{device_id}.synchronize.read",
            /*
            "confd.lines.{line_id}.read",
            "confd.lines.{line_id}.devices.{device_id}.delete",
            "confd.lines.{line_id}.devices.{device_id}.update",
            */
        ],
        "dhcp": [
            "confd.dhcp.#",
            "confd.dhcp.read",
            "confd.dhcp.update",
        ],
        "emails": [
            "confd.emails.#",
            "confd.emails.read",
            "confd.emails.update",
        ],
        "endpoints": [
            "confd.endpoints.#",
            "confd.endpoints.sip.create",
            "confd.endpoints.sip.read",
            "confd.endpoints.sip.{sip_uuid}.delete",
            "confd.endpoints.sip.{sip_uuid}.read",
            "confd.endpoints.sip.{sip_uuid}.update",
            "confd.endpoints.sip.templates.create",
            "confd.endpoints.sip.templates.read",
            "confd.endpoints.sip.templates.{template_uuid}.read",
            "confd.endpoints.sip.templates.{template_uuid}.delete",
            "confd.endpoints.sip.templates.{template_uuid}.update",
            "confd.endpoints.custom.create",
            "confd.endpoints.custom.read",
            "confd.endpoints.custom.{custom_id}.delete",
            "confd.endpoints.custom.{custom_id}.read",
            "confd.endpoints.custom.{custom_id}.update",
            "confd.endpoints.iax.create",
            "confd.endpoints.iax.read",
            "confd.endpoints.iax.{iax_id}.delete",
            "confd.endpoints.iax.{iax_id}.read",
            "confd.endpoints.iax.{iax_id}.update",
            "confd.endpoints.sccp.create",
            "confd.endpoints.sccp.read",
            "confd.endpoints.sccp.{sccp_id}.delete",
            "confd.endpoints.sccp.{sccp_id}.read",
            "confd.endpoints.sccp.{sccp_id}.update",
            /*
            "confd.lines.{line_id}.endpoints.custom.{custom_id}.delete",
            "confd.lines.{line_id}.endpoints.custom.{custom_id}.update",
            "confd.lines.{line_id}.endpoints.sccp.{sccp_id}.delete",
            "confd.lines.{line_id}.endpoints.sccp.{sccp_id}.update",
            "confd.lines.{line_id}.endpoints.sip.{sip_uuid}.delete",
            "confd.lines.{line_id}.endpoints.sip.{sip_uuid}.update",

            "confd.trunks.{trunk_id}.endpoints.custom.{custom_id}.delete",
            "confd.trunks.{trunk_id}.endpoints.custom.{custom_id}.update",
            "confd.trunks.{trunk_id}.endpoints.iax.{iax_id}.delete",
            "confd.trunks.{trunk_id}.endpoints.iax.{iax_id}.update",
            "confd.trunks.{trunk_id}.endpoints.sip.{sip_uuid}.delete",
            "confd.trunks.{trunk_id}.endpoints.sip.{sip_uuid}.update",

            "confd.users.{user_uuid}.lines.{line_id}.associated.endpoints.sip.read",
            "confd.users.{user_uuid}.lines.main.associated.endpoints.sip.read",
            */
        ],
        "extensions": [
            "confd.extensions.#",
            "confd.extensions.create",
            "confd.extensions.read",
            "confd.extensions.{extension_id}.delete",
            "confd.extensions.{extension_id}.read",
            "confd.extensions.{extension_id}.update",
            "confd.extensions.features.read",
            "confd.extensions.features.{extension_uuid}.read",
            "confd.extensions.features.{extension_uuid}.update",
            /*
            "confd.conferences.{conference_id}.extensions.{extension_id}.delete",
            "confd.conferences.{conference_id}.extensions.{extension_id}.update",
            "confd.groups.{group_uuid}.extensions.{extension_id}.delete",
            "confd.groups.{group_uuid}.extensions.{extension_id}.update",
            "confd.incalls.{incall_id}.extensions.{extension_id}.delete",
            "confd.incalls.{incall_id}.extensions.{extension_id}.update",

            "confd.lines.{line_id}.extensions.create",
            "confd.lines.{line_id}.extensions.{extension_id}.update",
            "confd.lines.{line_id}.extensions.{extension_id}.delete",

            "confd.outcalls.{outcall_id}.extensions.{extension_id}.delete",
            "confd.outcalls.{outcall_id}.extensions.{extension_id}.update",

            "confd.parkinglots.{parking_lot_id}.extensions.{extension_id}.update",
            "confd.parkinglots.{parking_lot_id}.extensions.{extension_id}.delete",

            "confd.queues.{queue_id}.extensions.{extension_id}.update",
            "confd.queues.{queue_id}.extensions.{extension_id}.delete",
            */
        ],
        "external_apps": [
            "confd.external.apps.#",
            "confd.external.apps.read",
            "confd.external.apps.{app_name}.create",
            "confd.external.apps.{app_name}.delete",
            "confd.external.apps.{app_name}.read",
            "confd.external.apps.{app_name}.update",
            /*
            "confd.users.{user_uuid}.external.apps.read",
            "confd.users.{user_uuid}.external.apps.{app_name}.create",
            "confd.users.{user_uuid}.external.apps.{app_name}.delete",
            "confd.users.{user_uuid}.external.apps.{app_name}.read",
            "confd.users.{user_uuid}.external.apps.{app_name}.update",
            */
        ],
        "funckeys": [
            "confd.funckeys.#",
            "confd.funckeys.destinations.read",
            "confd.funckeys.templates.create",
            "confd.funckeys.templates.read",
            "confd.funckeys.templates.{template_id}.delete",
            "confd.funckeys.templates.{template_id}.read",
            "confd.funckeys.templates.{template_id}.update",
            "confd.funckeys.templates.{template_id}.{position}.delete",
            "confd.funckeys.templates.{template_id}.{position}.read",
            "confd.funckeys.templates.{template_id}.{position}.update",
            "confd.funckeys.templates.{template_id}.users.read",
            /*
            "confd.users.{user_id}.funckeys.read",
            "confd.users.{user_id}.funckeys.update",
            "confd.users.{user_id}.funckeys.{position}.delete",
            "confd.users.{user_id}.funckeys.{position}.update",
            "confd.users.{user_id}.funckeys.templates.read",
            "confd.users.{user_id}.funckeys.templates.{template_id}.delete",
            "confd.users.{user_id}.funckeys.templates.{template_id}.update",
            "confd.users.{user_id}.funckeys.{position}.read",
            */
        ],
        "groups": [
            "confd.groups.#",
            "confd.groups.create",
            "confd.groups.read",
            "confd.groups.{group_uuid}.delete",
            "confd.groups.{group_uuid}.read",
            "confd.groups.{group_uuid}.update",
            "confd.groups.{group_uuid}.fallbacks.read",
            "confd.groups.{group_uuid}.fallbacks.update",
            "confd.groups.{group_uuid}.callpermissions.{call_permission_id}.delete",
            "confd.groups.{group_uuid}.callpermissions.{call_permission_id}.update",
            "confd.groups.{group_uuid}.extensions.{extension_id}.delete",
            "confd.groups.{group_uuid}.extensions.{extension_id}.update",
            "confd.groups.{group_uuid}.members.extensions.update",
            "confd.groups.{group_uuid}.members.users.update",
            "confd.groups.{group_uuid}.schedules.{schedule_id}.delete",
            "confd.groups.{group_uuid}.schedules.{schedule_id}.update",
            /*
            "confd.callpickups.{callpickup_id}.interceptors.groups.update",
            "confd.callpickups.{callpickup_id}.targets.groups.update",

            "confd.users.{user_id}.groups",
            */
        ],
        "ha": [
            "confd.ha.#",
            "confd.ha.read",
            "confd.ha.update"
        ],
        "incalls": [
            "confd.incalls.#",
            "confd.incalls.create",
            "confd.incalls.read",
            "confd.incalls.{incall_id}.delete",
            "confd.incalls.{incall_id}.read",
            "confd.incalls.{incall_id}.update",
            "confd.incalls.{incall_id}.extensions.{extension_id}.delete",
            "confd.incalls.{incall_id}.extensions.{extension_id}.update",
            "confd.incalls.{incall_id}.schedules.{schedule_id}.delete",
            "confd.incalls.{incall_id}.schedules.{schedule_id}.update"
        ],
        "ingress": [
            "confd.ingresses.#",
            "confd.ingresses.http.create",
            "confd.ingresses.http.read",
            "confd.ingresses.http.{http_ingress_uuid}.delete",
            "confd.ingresses.http.{http_ingress_uuid}.read",
            "confd.ingresses.http.{http_ingress_uuid}.update",
        ],
        "ivr": [
            "confd.ivr.#",
            "confd.ivr.create",
            "confd.ivr.read",
            "confd.ivr.{ivr_id}.delete",
            "confd.ivr.{ivr_id}.read",
            "confd.ivr.{ivr_id}.update"
        ],
        "lines": [
            "confd.lines.#",
            "confd.lines.create",
            "confd.lines.read",
            "confd.lines.{line_id}.read",
            "confd.lines.{line_id}.delete",
            "confd.lines.{line_id}.update",
            "confd.lines.{line_id}.devices.read",
            "confd.lines.{line_id}.applications.{application_uuid}.delete",
            "confd.lines.{line_id}.applications.{application_uuid}.update",
            "confd.lines.{line_id}.endpoints.custom.{custom_id}.delete",
            "confd.lines.{line_id}.endpoints.custom.{custom_id}.update",
            "confd.lines.{line_id}.devices.{device_id}.delete",
            "confd.lines.{line_id}.devices.{device_id}.update",
            "confd.lines.{line_id}.extensions.create",
            "confd.lines.{line_id}.extensions.{extension_id}.delete",
            "confd.lines.{line_id}.extensions.{extension_id}.update",
            "confd.lines.{line_id}.endpoints.sccp.{sccp_id}.delete",
            "confd.lines.{line_id}.endpoints.sccp.{sccp_id}.update",
            "confd.lines.{line_id}.endpoints.sip.{sip_uuid}.delete",
            "confd.lines.{line_id}.endpoints.sip.{sip_uuid}.update",
            /*
            "confd.users.{user_id}.lines.{line_id}.delete",
            "confd.users.{user_id}.lines.{line_id}.update",
            "confd.users.{user_id}.lines.update",
            "confd.users.{user_uuid}.lines.{line_id}.associated.endpoints.sip.read",
            "confd.users.{user_uuid}.lines.main.associated.endpoints.sip.read",

            "confd.devices.{device_id}.lines.read"
            */
        ],
        "localization": [
            "confd.localization.#",
            "confd.localization.read",
            "confd.localization.update",
        ],
        "meetings": [
            "confd.meetings.#",
            "confd.meetings.create",
            "confd.meetings.read",
            "confd.meetings.{meeting_uuid}.delete",
            "confd.meetings.{meeting_uuid}.read",
            "confd.meetings.{meeting_uuid}.update"
        ],
        "moh": [
            "confd.moh.#",
            "confd.moh.create",
            "confd.moh.read",
            "confd.moh.{moh_uuid}.delete",
            "confd.moh.{moh_uuid}.read",
            "confd.moh.{moh_uuid}.update",
            "confd.moh.{moh_uuid}.files.{moh_filename}.delete",
            "confd.moh.{moh_uuid}.files.{moh_filename}.read",
            "confd.moh.{moh_uuid}.files.{moh_filename}.update"
        ],
        "outcalls": [
            "confd.outcalls.#",
            "confd.outcalls.create",
            "confd.outcalls.read",
            "confd.outcalls.{outcall_id}.delete",
            "confd.outcalls.{outcall_id}.read",
            "confd.outcalls.{outcall_id}.update",
            "confd.outcalls.{outcall_id}.callpermissions.{call_permission_id}.delete",
            "confd.outcalls.{outcall_id}.callpermissions.{call_permission_id}.update",
            "confd.outcalls.{outcall_id}.extensions.{extension_id}.delete",
            "confd.outcalls.{outcall_id}.extensions.{extension_id}.update",
            "confd.outcalls.{outcall_id}.schedules.{schedule_id}.delete",
            "confd.outcalls.{outcall_id}.schedules.{schedule_id}.update",
            "confd.outcalls.{outcall_id}.trunks.update"
        ],
        "pagings": [
            "confd.pagings.#",
            "confd.pagings.create",
            "confd.pagings.read",
            "confd.pagings.{paging_id}.delete",
            "confd.pagings.{paging_id}.read",
            "confd.pagings.{paging_id}.update",
            "confd.pagings.{paging_id}.callers.users.update",
            "confd.pagings.{paging_id}.members.users.update"
        ],
        "parkinglots": [
            "confd.parkinglots.#",
            "confd.parkinglots.create",
            "confd.parkinglots.read",
            "confd.parkinglots.{parking_lot_id}.extensions.{extension_id}.delete",
            "confd.parkinglots.{parking_lot_id}.extensions.{extension_id}.update",
            "confd.parkinglots.{parking_lot_id}.delete",
            "confd.parkinglots.{parking_lot_id}.read",
            "confd.parkinglots.{parking_lot_id}.update"
        ],
        "phone-numbers": [
            "confd.phone-numbers.#",
            "confd.phone-numbers.create",
            "confd.phone-numbers.read",
            "confd.phone-numbers.{phone_number_uuid}.delete",
            "confd.phone-numbers.{phone_number_uuid}.read",
            "confd.phone-numbers.{phone_number_uuid}.update",
            "confd.phone-numbers.main.read",
            "confd.phone-numbers.main.update"
        ],
        "provisioning": [
            "confd.provisioning.networking.#",
            "confd.provisioning.networking.read",
            "confd.provisioning.networking.update"
        ],
        "queues": [
            "confd.queues.#",
            "confd.queues.create",
            "confd.queues.read",
            "confd.queues.{queue_id}.delete",
            "confd.queues.{queue_id}.read",
            "confd.queues.{queue_id}.update",
            "confd.queues.{queue_id}.extensions.{extension_id}.delete",
            "confd.queues.{queue_id}.extensions.{extension_id}.update",
            "confd.queues.{queue_id}.fallbacks.read",
            "confd.queues.{queue_id}.fallbacks.update",
            "confd.queues.{queue_id}.members.agents.{agent_id}.delete",
            "confd.queues.{queue_id}.members.agents.{agent_id}.update",
            "confd.queues.{queue_id}.members.users.{user_id}.update",
            "confd.queues.{queue_id}.members.users.{user_id}.delete",
            "confd.queues.{queue_id}.schedules.{schedule_id}.delete",
            "confd.queues.{queue_id}.schedules.{schedule_id}.update",
            "confd.queues.skillrules.create",
            "confd.queues.skillrules.read",
            "confd.queues.skillrules.{skillrule_id}.delete",
            "confd.queues.skillrules.{skillrule_id}.read",
            "confd.queues.skillrules.{skillrule_id}.update"
        ],
        "registers": [
            "confd.registers.#",
            "confd.registers.iax.create",
            "confd.registers.iax.read",
            "confd.registers.iax.{register_iax_id}.delete",
            "confd.registers.iax.{register_iax_id}.read",
            "confd.registers.iax.{register_iax_id}.update",
            /*
            "confd.trunks.{trunk_id}.registers.iax.{iax_id}.delete",
            "confd.trunks.{trunk_id}.registers.iax.{iax_id}.update"
            */
        ],
        "registrars": [
            "confd.registrars.#",
            "confd.registrars.create",
            "confd.registrars.read",
            "confd.registrars.{registrar_id}.delete",
            "confd.registrars.{registrar_id}.read",
            "confd.registrars.{registrar_id}.update"
        ],
        "schedules": [
            "confd.schedules.#",
            "confd.schedules.create",
            "confd.schedules.read",
            "confd.schedules.{schedule_id}.read",
            "confd.schedules.{schedule_id}.delete",
            "confd.schedules.{schedule_id}.update",
            /*
            "confd.groups.{group_uuid}.schedules.{schedule_id}.delete",
            "confd.groups.{group_uuid}.schedules.{schedule_id}.update",
            "confd.incalls.{incall_id}.schedules.{schedule_id}.delete",
            "confd.incalls.{incall_id}.schedules.{schedule_id}.update",
            "confd.outcalls.{outcall_id}.schedules.{schedule_id}.delete",
            "confd.outcalls.{outcall_id}.schedules.{schedule_id}.update",
            "confd.queues.{queue_id}.schedules.{schedule_id}.delete",
            "confd.queues.{queue_id}.schedules.{schedule_id}.update",
            "confd.users.{user_id}.schedules.{schedule_id}.delete",
            "confd.users.{user_id}.schedules.{schedule_id}.update"
            */
        ],
        "skills": [
            "confd.agents.skills.#",
            "confd.agents.skills.create",
            "confd.agents.skills.read",
            "confd.agents.skills.{skill_id}.delete",
            "confd.agents.skills.{skill_id}.read",
            "confd.agents.skills.{skill_id}.update",
            "confd.agents.{agent_id}.skills.{skill_id}.delete",
            "confd.agents.{agent_id}.skills.{skill_id}.update",
            "confd.queues.skillrules.create",
            "confd.queues.skillrules.read",
            "confd.queues.skillrules.{skillrule_id}.delete",
            "confd.queues.skillrules.{skillrule_id}.read",
            "confd.queues.skillrules.{skillrule_id}.update",
        ],
        "sounds": [
            "confd.sounds.#",
            "confd.sounds.create",
            "confd.sounds.read",
            "confd.sounds.{sound_category}.delete",
            "confd.sounds.{sound_category}.read",
            "confd.sounds.{sound_category}.files.{sound_filename}.delete",
            "confd.sounds.{sound_category}.files.{sound_filename}.read",
            "confd.sounds.{sound_category}.files.{sound_filename}.update",
            "confd.sounds.languages.read"
        ],
        "switchboards": [
            "confd.switchboards.#",
            "confd.switchboards.create",
            "confd.switchboards.read",
            "confd.switchboards.{switchboard_uuid}.delete",
            "confd.switchboards.{switchboard_uuid}.read",
            "confd.switchboards.{switchboard_uuid}.update",
            "confd.switchboards.{switchboard_uuid}.fallbacks.read",
            "confd.switchboards.{switchboard_uuid}.fallbacks.update",
            "confd.switchboards.{switchboard_uuid}.members.users.update"
        ],
        "tenants": [
            "confd.tenants.read",
            "confd.tenants.{tenant_uuid}.read"
        ],
        "timezones": [
            "confd.timezones.read"
        ],
        "trunks": [
            "confd.trunks.#",
            "confd.trunks.create",
            "confd.trunks.read",
            "confd.trunks.{trunk_id}.delete",
            "confd.trunks.{trunk_id}.read",
            "confd.trunks.{trunk_id}.update",
            "confd.trunks.{trunk_id}.endpoints.custom.{custom_id}.delete",
            "confd.trunks.{trunk_id}.endpoints.custom.{custom_id}.update",
            "confd.trunks.{trunk_id}.endpoints.iax.{iax_id}.delete",
            "confd.trunks.{trunk_id}.endpoints.iax.{iax_id}.update",
            "confd.trunks.{trunk_id}.endpoints.sip.{sip_uuid}.delete",
            "confd.trunks.{trunk_id}.endpoints.sip.{sip_uuid}.update",
            "confd.trunks.{trunk_id}.registers.iax.{iax_id}.delete",
            "confd.trunks.{trunk_id}.registers.iax.{iax_id}.update",
            /*
            "confd.outcalls.{outcall_id}.trunks.update"
            */
        ],
        "users": [
            "confd.users.#",
            "confd.users.create",
            "confd.users.read",
            "confd.users.{user_id}.delete",
            "confd.users.{user_id}.read",
            "confd.users.{user_id}.update",
            "confd.users.{user_id}.agents.delete",
            "confd.users.{user_id}.agents.{agent_id}.update",
            "confd.users.{user_id}.callerids.outgoing.read",
            "confd.users.{user_id}.callpermissions.{call_permission_id}.delete",
            "confd.users.{user_id}.callpermissions.{call_permission_id}.update",
            "confd.users.{user_uuid}.external.apps.read",
            "confd.users.{user_uuid}.external.apps.{app_name}.create",
            "confd.users.{user_uuid}.external.apps.{app_name}.delete",
            "confd.users.{user_uuid}.external.apps.{app_name}.read",
            "confd.users.{user_uuid}.external.apps.{app_name}.update",
            "confd.users.{user_id}.fallbacks.read",
            "confd.users.{user_id}.fallbacks.update",
            "confd.users.{user_id}.forwards.read",
            "confd.users.{user_id}.forwards.update",
            "confd.users.{user_id}.forward.{forward_name}.read",
            "confd.users.{user_id}.forwards.{forward_name}.update",
            "confd.users.{user_id}.funckeys.read",
            "confd.users.{user_id}.funckeys.update",
            "confd.users.{user_id}.funckeys.{position}.delete",
            "confd.users.{user_id}.funckeys.{position}.read",
            "confd.users.{user_id}.funckeys.{position}.update",
            "confd.users.{user_id}.funckeys.templates.read",
            "confd.users.{user_id}.funckeys.templates.{template_id}.delete",
            "confd.users.{user_id}.funckeys.templates.{template_id}.update",
            "confd.users.{user_id}.groups",
            "confd.users.{user_id}.lines.{line_id}.delete",
            "confd.users.{user_id}.lines.{line_id}.update",
            "confd.users.{user_id}.lines.update",
            "confd.users.{user_uuid}.lines.{line_id}.associated.endpoints.sip.read",
            "confd.users.{user_uuid}.lines.main.associated.endpoints.sip.read",
            "confd.users.{user_id}.schedules.{schedule_id}.delete",
            "confd.users.{user_id}.schedules.{schedule_id}.update",
            "confd.users.{user_id}.services.read",
            "confd.users.{user_id}.services.update",
            "confd.users.{user_id}.services.{service}.read",
            "confd.users.{user_id}.services.{service}.update",
            "confd.users.{user_id}.voicemails.create",
            "confd.users.{user_id}.voicemails.delete",
            "confd.users.{user_id}.voicemails.read",
            "confd.users.{user_id}.voicemails.{voicemail_id}.update",
            "confd.users.subscriptions.read",
            "confd.users.export.read",
            "confd.users.import.create",
            /*
            "confd.callfilters.{callfilter_id}.recipients.users.update",
            "confd.callfilters.{callfilter_id}.surrogates.users.update",
            "confd.callpickups.{callpickup_id}.interceptors.users.update",
            "confd.callpickups.{callpickup_id}.targets.users.update",
            "confd.funckeys.templates.{template_id}.users.read",
            "confd.groups.{group_uuid}.members.users.update",
            "confd.pagings.{paging_id}.callers.users.update",
            "confd.pagings.{paging_id}.members.users.update",
            "confd.queues.{queue_id}.members.users.{user_id}.delete",
            "confd.queues.{queue_id}.members.users.{user_id}.update",
            "confd.switchboards.{switchboard_uuid}.members.users.update",
            */
        ],
        "voicemails": [
            "confd.voicemails.#",
            "confd.voicemails.create",
            "confd.voicemails.read",
            "confd.voicemails.{voicemail_id}.delete",
            "confd.voicemails.{voicemail_id}.read",
            "confd.voicemails.{voicemail_id}.update",
            /*
            "confd.asterisk.voicemail.zonemessages.read",
            "confd.asterisk.voicemail.zonemessages.update",
            "confd.users.{user_id}.voicemails.{voicemail_id}.update",
            "confd.users.{user_id}.voicemails.create",
            "confd.users.{user_id}.voicemails.delete",
            "confd.users.{user_id}.voicemails.read",
            */
        ]
    },
    "dird": {
        "_full_access": [
            "dird.#"
        ],
        "backends": {
            "conference": [
            "dird.backends.conference.sources.#",
            "dird.backends.conference.sources.create",
            "dird.backends.conference.sources.read",
            "dird.backends.conference.sources.{source_uuid}.delete",
            "dird.backends.conference.sources.{source_uuid}.read",
            "dird.backends.conference.sources.{source_uuid}.update",
            "dird.backends.conference.sources.{source_uuid}.contacts.read"
        ],
        "csv_ws": [
            "dird.backends.csv_ws.sources.create",
            "dird.backends.csv_ws.sources.{source_uuid}.delete",
            "dird.backends.csv_ws.sources.{source_uuid}.update"
        ],
        "csv": [
            "dird.backends.csv.sources.create",
            "dird.backends.csv.sources.{source_uuid}.delete",
            "dird.backends.csv.sources.{source_uuid}.update"
        ],
        "google": [
            "dird.backends.google.sources.create",
            "dird.backends.google.sources.read",
            "dird.backends.google.sources.{source_uuid}.delete",
            "dird.backends.google.sources.{source_uuid}.read",
            "dird.backends.google.sources.{source_uuid}.update",
            "dird.backends.google.sources.{source_uuid}.contacts.read"
        ],
        "ldap": [
            "dird.backends.ldap.sources.create",
            "dird.backends.ldap.sources.{source_uuid}.delete",
            "dird.backends.ldap.sources.{source_uuid}.update"
        ],
        "microsoft": [
            "dird.backends.microsoft.sources.create",
            "dird.backends.microsoft.sources.{source_uuid}.delete",
            "dird.backends.microsoft.sources.{source_uuid}.update"
        ],
        "office365": [
            "dird.backends.office365.sources.{source_uuid}.contacts.read",
        ],
        "personal": [
            "dird.backends.personal.sources.create",
            "dird.backends.personal.sources.{source_uuid}.delete",
            "dird.backends.personal.sources.{source_uuid}.update"
        ],
        "phonebook": [
            "dird.backends.phonebook.sources.create",
            "dird.backends.phonebook.sources.{source_uuid}.delete",
            "dird.backends.phonebook.sources.{source_uuid}.update"
        ],
        "wazo": [
            "dird.backends.wazo.sources.create",
            "dird.backends.wazo.sources.{source_uuid}.delete",
            "dird.backends.wazo.sources.{source_uuid}.update",
            "dird.backends.wazo.sources.{source_uuid}.contacts.read"
        ],
        },
        "display": [
            "dird.displays.create",
            "dird.displays.{display_uuid}.delete",
            "dird.displays.{display_uuid}.update"
        ],
        /*
        "personnal": [
            "dird.personal.create",
            "dird.personal.delete",
            "dird.personal.read",
            "dird.personal.{contact_id}.delete",
            "dird.personal.{contact_id}.read",
            "dird.personal.{contact_id}.update",
            "dird.personal.import.create"
        ],
        */
       "phonebooks": [
            "dird.phonebooks.#",
            "dird.phonebooks.create",
            "dird.phonebooks.read",
            "dird.phonebooks.{phonebook_uuid}.delete",
            "dird.phonebooks.{phonebook_uuid}.edit",
            "dird.phonebooks.{phonebook_uuid}.read",
            "dird.phonebooks.{phonebook_uuid}.contacts.create",
            "dird.phonebooks.{phonebook_uuid}.contacts.read",
            "dird.phonebooks.{phonebook_uuid}.contacts.{contact_id}.delete",
            "dird.phonebooks.{phonebook_uuid}.contacts.{contact_id}.read",
            "dird.phonebooks.{phonebook_uuid}.contacts.{contact_id}.update",
            "dird.backends.phonebook.sources.{source_uuid}.contacts.read",
       ],
        "profiles": [
            "dird.profiles.create",
            "dird.profiles.{profile_uuid}.delete",
            "dird.profiles.{profile_uuid}.update"
        ],
        /*
        "directories": [
            "dird.directories.#",
            "dird.directories.{profile}.sources.read",
            "dird.directories.favorites.{profile}.read",
            "dird.directories.personal.{profile}.read",
            "dird.directories.lookup.{profile}.headers.read",
            "dird.directories.reverse.{profile}.{user_uuid}.read",
            "dird.directories.lookup.{profile}.read",
            "dird.directories.lookup.{profile}.{user_uuid}.read"
        ],
        */
    },
    "plugind": {
        "_full_access": [
            "plugind.#"
        ],
        "market": [
            "plugind.market.read"
        ],
        "plugins": [
            "plugind.plugins.create",
            "plugind.plugins.read",
            "plugind.plugins.{namespace}.{name}.delete",
            "plugind.plugins.{namespace}.{name}.read"
        ]
    },
    "provd": {
        "_full_access": [
            "provd.#"
        ],
        "configure": [
            "provd.configure.#",
            "provd.configure.read",
            "provd.configure.{param_id}.read",
            "provd.configure.{param_id}.update",
            "provd.configure.ftp_proxy.update",
            "provd.configure.http_proxy.update",
            "provd.configure.https_proxy.update",
            "provd.configure.locale.update",
            "provd.configure.nat.update",
            "provd.configure.plugin_server.update",
            "provd.configure.{tenant_uuid}.provisioning_key.update"
        ],
        "devices": [
            "provd.dev_mgr.#",
            "provd.dev_mgr.read",
            "provd.dev_mgr.devices.create",
            "provd.dev_mgr.devices.read",
            "provd.dev_mgr.devices.{device_id}.delete",
            "provd.dev_mgr.devices.{device_id}.read",
            "provd.dev_mgr.devices.{device_id}.update",
            "provd.dev_mgr.dhcpinfo.create",
            "provd.dev_mgr.reconfigure.create",
            "provd.dev_mgr.synchronize.create",
            
        ],
        "operation": [
            "provd.operation.#",
            "provd.operation.delete",
            "provd.operation.read"
        ],
        "plugins": [
            "provd.pg_mgr.#",
            "provd.pg_mgr.read",
            "provd.pg_mgr.install.read",
            "provd.pg_mgr.install.install.create",
            "provd.pg_mgr.install.installable.read",
            "provd.pg_mgr.install.installed.read",
            "provd.pg_mgr.install.uninstall.create",
            "provd.pg_mgr.install.update.create",
            "provd.pg_mgr.install.upgrade.create",
            "provd.pg_mgr.plugins.read",
            "provd.pg_mgr.plugins.{plugin_id}.read",
            "provd.pg_mgr.plugins.{plugin_id}.info.read",
            "provd.pg_mgr.plugins.{plugin_id}.install.read",
            "provd.pg_mgr.plugins.{plugin_id}.install.install.create",
            "provd.pg_mgr.plugins.{plugin_id}.install.installable.read",
            "provd.pg_mgr.plugins.{plugin_id}.install.installed.read",
            "provd.pg_mgr.plugins.{plugin_id}.install.uninstall.create",
            "provd.pg_mgr.reload.create"
        ]
    },
    "webhooksd": {
        "_full_access": [
            "webhooksd.#"
        ],
        "subscriptions": [
            "webhookd.subscriptions.#",
            "webhookd.subscriptions.create",
            "webhookd.subscriptions.read",
            "webhookd.subscriptions.{subscription_uuid}.delete",
            "webhookd.subscriptions.{subscription_uuid}.read",
            "webhookd.subscriptions.{subscription_uuid}.update",
            "webhookd.subscriptions.{subscription_uuid}.logs.read",
            "webhookd.subscriptions.services.read"
        ]
    }
}

export default acls