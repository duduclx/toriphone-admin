const acls = {
  full: ["confd.access_features.#"],
  create: ["confd.access_features.create"],
  read: ["confd.access_features.read", "confd.access_features.{access_feature_id}.read"],
  edit: ["confd.access_features.{access_feature_id}.update"],
  delete: ["confd.access_features.{access_feature_id}.delete"],
  dependencies: ["other service"]
};