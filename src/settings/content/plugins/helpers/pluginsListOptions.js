const pluginsListOptions = [
    {
        name: "wazo-calld-queue",
        namespace: "sboily",
        author: "Sylvain Boily",
        display_name: "Queue API and events",
        homepage: "https://github.com/sboily/wazo-calld-queue", // wazo-calld-queue-plugin
        description: "Add queue control to wazo-calld and publish to Wazo websocket Queue log from wazo-call-logd.",
        version: "0.0.7",
        min_wazo_version: "24.02",
        max_wazo_version: null,
        usage: "Check the API in your wazo in calld section in http://wazo_ip/api",
        warning: null,
        tags: ["experimental", "queue"], // api tag ! should go to official plugin ?
        /*
        versions: [
            {
                method: "git",
                options: {
                    ref: "0.0.70",
                    url: "https://github.com/sboily/wazo-calld-queue"
                },
                version: "0.0.7",
                min_wazo_version: "24.02"
            }
        ]
        */
    },
    {
        name: "wazo-smtp-configuration",
        namespace: "official",
        author: "Wazo Support", // Wazo Support ? should choose one, and i prefer Wazo Communication inc.
        display_name: "SMTP configuration",
        homepage: "https://github.com/wazo-communication/wazo-update-smtp-origin", // http://support.wazo.io in the plugin.yml | wazo-update-smtp-origin-plugin
        description: "If you want modify the SMTP origin parameter (default : exemple.wazo.community) to your personal parameter or Domain, relayHost/fallback relayHost and Canical.",
        version: "1.0.1",
        min_wazo_version: "20.01",
        max_wazo_version: null,
        usage: "wazo-update-smtp-origin",
        warning: null,
        tags: ["support", "mail"] // support ? configuration i guess
    },
    {
        name: "wazo-prometheus-exporter",
        namespace: "wazoplatform",
        author: "Wazo authors",
        display_name: "Prometheus Metrics",
        homepage: "https://github.com/wazo-platform/wazo-prometheus-exporter-plugin",
        description: "Adds /metrics to the wazo-auth service as well as Asterisk and Nginx",
        version: "0.0.4",
        min_wazo_version: "23.06",
        max_wazo_version: null,
        usage: "",
        warning: null,
        tags: ["prometheus", "metrics"]
    },
    /*
    {
        name: "wazo-calld-new-line-status",
        namespace: "wazocommunication", // difference between wazocommunication and official ??
        author: "Wazo authors", // Wazo authors ? should choose one, and i prefer Wazo Communication inc.
        display_name: "Fix line status after creation", // not a name, but a description
        homepage: "https://github.com/wazo-communication/wazo-calld-new-line-status-plugin",
        description: "Fix line status after creation. This plugin is only useful for Wazo servers 24.10.",
        version: "1.0.0",
        min_wazo_version: "24.10",
        max_wazo_version: "24.10",
        usage: "After installing this plugin, line status will be correctly updated after the line is created.",
        warning: "Installing this plugin will restart wazo-calld, impacting call processing.",
        tags: ["calls", "lines"] // patch
    },
    */
    /*
    {
        name: "wazo-calld-globalvars",
        namespace: "wazocommunication", // difference between wazocommunication and official ??
        author: "Wazo authors", // Wazo authors ? should choose one, and i prefer Wazo Communication inc.
        display_name: "Avoid Asterisk slowdown in the long run", // bad display name
        homepage: "https://github.com/wazo-communication/wazo-calld-globalvars-plugin",
        description: "Fix global variables accumulation in Asterisk in the long run.",
        version: "1.0.0",
        min_wazo_version: "24.10",
        max_wazo_version: "24.13",
        usage: "After installing this plugin, global variables will be correctly cleaned up.",
        warning: "Installing this plugin will restart wazo-calld, impacting call processing.",
        tags: ["calls", "mobile"] // not mobile, but asterisk
    },
    */
    {
        name: "wazo-plugin-demo",
        namespace: "quintana", // sboily ?
        author: "Sylvain Boily",
        display_name: "Plugin Demo",
        homepage: "https://github.com/wazo-communication/wazo-plugin-demo-dialplan", // wazo-demo-dialplan-plugin
        description: "Demo plugin.",
        version: "0.0.1",
        min_wazo_version: "21.07",
        max_wazo_version: null,
        usage: "This plugin adds an extension ***42 that says Hello World when called.",
        warning: null,
        tags: ["community", "demo"] // dialplan
    },
    /*
    {
        name: "wazo-call-recording-uuid",
        namespace: "wazocommunication", // difference between wazocommunication and official ??
        author: "Wazo authors", // Wazo authors ? should choose one, and i prefer Wazo Communication inc.
        display_name: "Call Recording UUID Migration",
        homepage: "https://github.com/wazo-communication/wazo-call-recording-uuid-plugin",
        description: "Migrate the call recording UUIDs so that they match the file names on the file system",
        version: "1.1.0",
        min_wazo_version: "24.10",
        max_wazo_version: "24.11",
        usage: "After installing this plugin, all new call recordings UUIDs will be synchronized with storage filenames.",
        warning: "Installing this plugin will restart wazo-call-logd.",
        tags: ["cdr", "recording"] // patch ?
    },
    */
    {
        name: "wazo-cel-plugin",
        namespace: "official",
        author: "Wazo Communication inc.", // Wazo authors ? should choose one, and i prefer Wazo Communication inc.
        display_name: "CEL API",
        homepage: "https://github.com/wazo-communication/wazo-cel-plugin",
        description: "This package adds an HTTP API for exposing Channel Event Logs (CEL) from Asterisk. Those can be analyzed to obtain call logs different from those available in Wazo Platform core in wazo-call-logd /cdr.",
        version: "2.5.0",
        min_wazo_version: "25.01",
        max_wazo_version: null,
        usage: "See the OpenAPI specification for wazo-call-logd.",
        warning: "In order to use the API, the user must have the call-logd.cel.read ACL",
        tags: ["api", "call_logs", "cel", "http"] // if api tag, no need http tag
    },
    {
        name: "wazo-provd-coredump",
        namespace: "wazocommunication", // difference between wazocommunication and official ??
        author: "Wazo authors", // Wazo authors ? should choose one, and i prefer Wazo Communication inc.
        display_name: "wazo-provd Core Dump",
        homepage: "https://github.com/wazo-communication/wazo-provd-coredump-plugin",
        description: "Allows wazo-provd to dump core when crashing, e.g. from SIGABRT",
        version: "2.0.0",
        min_wazo_version: "24.02",
        max_wazo_version: null,
        usage: "Core dumps will be created in /var/lib/wazo-provd",
        warning: null,
        tags: ["wazo-provd", "debug"]
    },
    /*
    {
        name: "wazo-asterisk-reduce-stasis-events",
        namespace: "wazocommunication", // difference between wazocommunication and official ??
        author: "Wazo authors", // Wazo authors ? should choose one, and i prefer Wazo Communication inc.
        display_name: "Asterisk Stasis Events Reduction",
        homepage: "https://github.com/wazo-communication/wazo-asterisk-reduce-stasis-events-plugin",
        description: "Reduce the number of events sent by Asterisk, reducing the total load on the system.",
        version: "1.0.0",
        min_wazo_version: "24.01",
        max_wazo_version: "24.03",
        usage: "",
        warning: null,
        tags: ["wazo-asterisk", "mitigation"] // patch
    },
    */
    {
        name: "binauralrecording", // unreadable name
        namespace: "wazo", // mean wazocommunication ? official ?
        author: null, // don't exist
        display_name: null, // don't exist
        homepage: "https://github.com/wazo-communication/wazo-binaural-recording-plugin", // don't exist
        description: "configure recordings with caller and callee in separate audio channels(left and right) for users and call center queues",
        version: "0.0.1",
        min_wazo_version: null, // don't exist
        max_wazo_version: null,
        usage: "",
        warning: null,
        tags: [] // don't exist
    },
    {
        name: "wazo-asterisk-restart",
        namespace: "wazocommunication", // difference between wazocommunication and official ??
        author: "Wazo authors", // Wazo authors ? should choose one, and i prefer Wazo Communication inc.
        display_name: "Asterisk Restart",
        homepage: "https://github.com/wazo-communication/wazo-asterisk-restart-plugin",
        description: "Restart Asterisk every night at 23:30, once no calls are active. If calls are remaining after 1 hour of retrying, the restart task is cancelled until the next day.",
        version: "1.0.0",
        min_wazo_version: "22.01",
        max_wazo_version: null,
        usage: "systemctl status wazo-asterisk-restart.timer and systemctl status wazo-asterisk-restart.service",
        warning: null,
        tags: ["asterisk", "mitigation"] // service 
    },
    {
        name: "wazo-asterisk-tcmalloc",
        namespace: "wazocommunication", // difference between wazocommunication and official ??
        author: "Wazo authors", // Wazo authors ? should choose one, and i prefer Wazo Communication inc.
        display_name: "Asterisk TCMalloc",
        homepage: "https://github.com/wazo-communication/wazo-asterisk-tcmalloc-plugin",
        description: "Modifies the memory allocator to use TCmalloc instead of the default glibc malloc.",
        version: "1.0.0",
        min_wazo_version: "22.01",
        max_wazo_version: null,
        usage: "",
        warning: 'installing / uninstalling this plugin will restart Asterisk, which will interrupt any currently running call.',
        tags: ["asterisk", "memory"]
    },
    /*
    {
        name: "wazo-confd-sip-templates-performance-patch",
        namespace: "wazo", // wazocommunication ? official ?
        author: "Wazo authors", // Wazo Communication inc.
        display_name: "Confd sip templates improvement",
        homepage: "https://github.com/wazo-communication/wazo-confd-sip-templates-performance-patch",
        description: "This patch improve performance of endpoint sip templates PUT requests.",
        version: "0.0.1",
        min_wazo_version: "24.01",
        max_wazo_version: "24.01",
        usage: "",
        warning: null,
        tags: ["patch"]
    },
    */
    {
        name: "wazo-asterisk-reduce-events",
        namespace: "wazocommunication",
        author: "Wazo authors", // Wazo Communication inc.
        display_name: "Asterisk Events Reduction",
        homepage: "https://github.com/wazo-communication/wazo-asterisk-reduce-events-plugin",
        description: "Reduce the number of events sent by Asterisk, reducing the total load on the system.",
        version: "1.0.0",
        min_wazo_version: "23.01",
        max_wazo_version: null,
        usage: "",
        warning: null,
        tags: ["asterisk", "mitigation"] // patch ?
    },
    /*
    {
        name: "wazo-confgend-performance-patch",
        namespace: "quintana", // nope this is wazo-communication repo
        author: "Sylvain Boily", // nope this is wazo-communication repo
        display_name: "Confgend performance improvement",
        homepage: "https://github.com/wazo-communication/wazo-confgend-performance-patch",
        description: "This patch improve performance of confgend service for extensions.conf.",
        version: "0.0.1",
        min_wazo_version: "24.01",
        max_wazo_version: "24.01",
        usage: "",
        warning: null,
        tags: ["patch"]
    },
    */
    {
        name: "wazo-update-penalty",
        namespace: "official",
        author: "Wazo Communication inc.",
        display_name: "Agent Penalty",
        homepage: "https://github.com/wazo-communication/wazo-update-penalty", // http://wazo.io in plugin.yml | /wazo-update-penalty-plugin
        description: "", // no readme.md, no informations
        version: "1.0.0",
        min_wazo_version: "20.01",
        max_wazo_version: null,
        usage: "", // no readme.md, no informations
        warning: null, // no readme.md, no informations
        tags: ["agent", "queue", "penalty"]
    },
    {
        name: "wazo-chanspy",
        namespace: "quintana", // sboily ?
        author: "Sylvain Boily",
        display_name: "",
        homepage: "https://github.com/sboily/wazo-chanspy", // wazo-chanspy-plugin ?
        description: "Chan spy extension",
        version: "0.0.1",
        min_wazo_version: "23.08",
        max_wazo_version: null,
        // too long usage ?
        usage: "Add in /etc/asterisk/extensions_extra.d/xivo-extrafeatures.conf in the context xivo-extrafeatures.include => spy-call. To spy an extension, the channel need to be up and you can use the extension *556 or *556<EXTENSION>.To change the spy mode: 4 - spy mode, 5 - whisper mode, 6 - barge mode",
        warning: "Please edit interfaces.py in /etc/asterisk/extensions_extra.d/ to fill the username and password of the API. Need to have confd acl to get interface from extension.",
        tags: ["experimental"]
    },
    /*
    {
        name: "wazo-auth-service-email", // wazo-auth-email-notification ?
        namespace: "sboily",
        author: "Sylvain Boily",
        display_name: "Email service",
        homepage: "https://github.com/sboily/wazo-auth-email-notification",
        description: "", // no informations
        version: "0.0.1",
        min_wazo_version: "24.08",
        max_wazo_version: null,
        usage: "", // no informations
        warning: null, // no informations
        tags: ["experimental"]
    },
    */
    {
        name: "wazo-calld-application-continue",
        namespace: "sboily",
        author: "Sylvain Boily",
        display_name: "Continue in dialplan from application or switch to application from dialplan", // too long ! this is almost a description ! calld application continue ?
        homepage: "https://github.com/sboily/wazo-calld-application-continue",
        description: "Add continue to dialplan in applications control to wazo-calld. Add switch from dialplan to application to be controlled by wazo-calld.",
        version: "0.0.2",
        min_wazo_version: "23.08",
        max_wazo_version: null,
        usage: "Check the API in your wazo in calld section in http://wazo_ip/api",
        warning: null,
        tags: ["experimental", "application"] // api
    },
    /*
    {
        name: "wazo-agentd-test",
        namespace: "sboily",
        author: "Sylvain Boily",
        display_name: "Agentd plugin test",
        homepage: "https://github.com/sboily/wazo-agentd-test", // wazo-agentd-test-plugin
        description: "Plugin to test wazo-agentd",
        version: "0.0.2",
        min_wazo_version: "24.02",
        max_wazo_version: null,
        usage: "Check the API in your wazo in agentd section in http://wazo_ip/api", // test endpoint sounds like a get status ?
        warning: null,
        tags: ["experimental", "agent"] // api
    },
    */
    /*
    {
        name: "wazo-stt",
        namespace: "quintana", // sboily ?
        author: "Dream Team", // i knew it !! :)
        display_name: "STT voice module",
        homepage: "https://github.com/sboily/wazo-hackathon-wazo-calld-module", // http://www.wazo.io in plugin.yml | wazo-calld-stt-plugin
        description: "Add STT (Speach to text) to wazo-calld",
        version: "0.2.8",
        min_wazo_version: "", // miis it
        max_wazo_version: null,
        usage: "pip3 install google-cloud-speech or Check https://allo-media.github.io/live-api-doc/getting-started/python.html. Check the API in your wazo in agentd section in http://wazo_ip/api",
        warning: null,
        tags: ["beta", "application"] // api, calld
    },
    */
    {
        name: "wazo-user-group-max",
        namespace: "quintana", // sboily ?
        author: "Sylvain Boily",
        display_name: "Add maximum call for group", // nope, this is a description, should be user group max 2 calls, or something like that
        homepage: "https://github.com/sboily/wazo-user-group-max", // wazo-user-group-max-plugin
        description: "Enable the functionality for a user to receive a maximum of only two calls in a group ring.",
        version: "0.0.1",
        min_wazo_version: "23.01",
        max_wazo_version: null,
        usage: "",
        warning: null,
        tags: ["community"] // dialplan
    },
    {
        name: "wazo-calld-application-external-media",
        namespace: "sboily",
        author: "Sylvain Boily",
        display_name: "Stream channel media to external application", // is a description | media to external application
        homepage: "https://github.com/sboily/wazo-calld-application-external-media", // wazo-calld-application-external-media-plugin
        description: "Add channel external media streaming to wazo-calld.",
        version: "0.0.1",
        min_wazo_version: "23.08",
        max_wazo_version: null,
        usage: "Check the API in your wazo in calld section in http://wazo_ip/api",
        warning: null,
        tags: ["experimental", "application"] // api
    },
    {
        name: "mobile-tandem",
        namespace: "sboily",
        author: "Sylvain Boily",
        display_name: "Mobile Tandem",
        homepage: "https://github.com/sboily/wazo-mobile-tandem", // wazo-mobile-tandem-plugin
        description: "This plugin add a mobile tandem feature.",
        version: "0.1.0",
        min_wazo_version: "20.04", // missing information in plugin.yml
        max_wazo_version: null,
        usage: "Please add to your user a phone mobile number to have this feature working and add mobile-tandem subroutine to you user.",
        warning: null,
        tags: ["application"] // dialplan !
    }
    /*
    {
        name: "",
        namespace: "",
        author: "",
        display_name: "",
        homepage: "",
        description: "",
        version: "",
        min_wazo_version: "",
        max_wazo_version: null,
        usage: "",
        warning: null,
        tags: []
    }
        */
]

export default pluginsListOptions;