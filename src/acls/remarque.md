En faite, je doute qu’il soit nécessaire de détailler autant.
On pourrait simplement limiter à:
il peut créer / modifier/ supprimer (full_access)
ou il peut simplement lire (read_only)
ou ne rien avoir.

dans ce cas, cela est suffisant:

policies: {
  full_access: [
      "auth.policies.#"
  ],
  read_only: [
      "auth.policies.read",
      "auth.policies.{policy_uuid}.read"
  ],
},
J’imagines mal le cas où on permet de
de créer, mais ne pas modifier, ne pas effacer
de modifier, mais ne pas créer, ne pas effacer
d’effacer, mais ne pas créer, ne pas modifier.

et je ne sais pas si dans le cas du read_only, on peut se limiter au prremier .read

policies: {
  full_access: [
      "auth.policies.#"
  ],
  read_only: [
      "auth.policies.read", // permet implicitement de lire les sous objets ??
  ],
},
ça simplifierai grandement les acls !