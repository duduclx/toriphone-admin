const ingressEvents = () => {
  // ingress_http_created
  const onIngressHttpCreated = async (data) => {
    console.log("ingress_http_created", data);
    // Ici tu peux ajouter le traitement spécifique à la création
  };

  // ingress_http_deleted
  const onIngressHttpDeleted = async (data) => {
    console.log("ingress_http_deleted", data);
    // Ici tu peux ajouter le traitement spécifique à la suppression
  };

  // ingress_http_edited
  const onIngressHttpEdited = async (data) => {
    console.log("ingress_http_edited", data);
    // Ici tu peux ajouter le traitement spécifique à la modification
  };

  return {
    onIngressHttpCreated,
    onIngressHttpDeleted,
    onIngressHttpEdited
  };
};

export default ingressEvents;
