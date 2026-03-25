## overRide connect options

const uaConfigOverrides = {
  peerConnectionOptions: {
    iceServers = [
      {urls: "stun:stun.example.com:443"},  // STUN server
      {urls: "turn:turn.example.com:443", username: "login", credential: "secret" },  // TURN server
      ...
    ]
  }
}

rawOptions: {
  media: {something here},
  uaConfigOverrides: {
    traceSip:: boolean,
    somethingelse: any
    },
audioDeviceOutput: "string",
audioDeviceRing: "string
}

Wazo.Phone.connect({
    media: {
      audio: true,
      video: true,
    },
    uaConfigOverrides: {
        peerConnectionOptions: {
            iceServers = [
                {urls: "stun:stun.example.com:443"}, 
                {urls: "turn:turn.example.com:443", username: "login", credential: "secret" }
            ]
        }
    }
});

## stun trun & ice
Hello, please be careful, many people doesn't really understand the ICE (stun/turn).
There is different part for that.

1/ you need to understand that ICE is here to help webrtc with NAT,
it's like a magical system for the end user to don't care about NAT configuration.

2/ ICE use turn/stun to help, stun is for signalisation and turn add media.
Please check doc on internet if you don't understand turn/stun.

3/ For wazo there is different configuration, a. asterisk configuration,
if you want to use turn or stun for your Asterisk because of NAT you can use it,
but if you use webrtc, you need to enable ICE and add turn ou stun service or add the mapping for the ice candidate.
The API support the both.

4/ You need to add in your client the ICE configuration with a STUN or TURN service,
be careful TURN is in general not really mandatory for web/desktop application because the nat network is not really complicated and it's type 2.
For a mobile application it's in general more restrictif and you need to use a TURN server

The RTP configuration, including ICE, for Asterisk depends on the global settings defined for Asterisk.
ICE configuration for end users can vary based on your specific logic, such as being configured by tenant.
There are no strict constraints on how ICE is implemented.

For STUN, media does not pass through the server.
For TURN, the media is handled by the service itself.
In both cases, media, including RTP for both video and audio, is managed and transmitted via RTP

## autres sites
. https://www.metered.ca
. http://etoilediese.fr/
. https://dev.to/alakkadshaw/google-stun-server-list-21n4

https://www.metered.ca/blog/asterisk-stun-turn-server/

https://support.wazo.io/hc/fr-fr/articles/360055443372-Installer-votre-propre-serveur-STUN-TURN