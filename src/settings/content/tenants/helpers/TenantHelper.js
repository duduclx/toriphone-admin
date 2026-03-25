import { useApis } from "../../../../ApiProvider";

const TenantHelper = () => {
  const { userGet } = useApis();

  const getUserFromUuid = async (uuid) => {
    try {
      const myuser = await userGet({ uuid: uuid });
      const updtuser = {
        ...myuser,
        label: `${myuser.firstname} ${myuser.lastname}`,
        name: `${myuser.firstname} ${myuser.lastname}`,
      };
      return updtuser;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const tenantAuthMethodOptions = [
    { label: "Native", value: "native" },
    { label: "SAML", value: "saml" },
    { label: "LDAP", value: "ldap" },
  ];
  return { getUserFromUuid, tenantAuthMethodOptions };
};

export default TenantHelper;
