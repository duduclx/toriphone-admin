## pagings
faire la remontée
il est possible d'avoir un member qui soit caller (pas de sens ??)
manque de clareté sur le numéro ... créer un range dans le context ?? un helper ??

// infos de sylvain :
You can use the SIP header we send in the signalization and develop the auto answer on your client.

You can add an option on the client to authorize or not this feature maybe.

check /usr/share/xivo-config/dialplan/asterisk/extensions_lib_paging.conf

And choose one of your favorite
I think Alert-Info: ;info=alert-autoanswer is probably the best choice.

Nothing to do, just get the SIP header from your client.

## auto answer
wazo-js-sdk/src/voice/call.ts
  shouldAutoAnswer() {
    return !!this.sipCall.request?.getHeader('alert-info');
  }
