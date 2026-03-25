const dhcpEvents = () => {
  // dhcp_edited
  const OnDhcpEdited = async (data) => {
    console.log("dhcp_edited", data);
  };

  return {
    OnDhcpEdited,
  };
};

export default dhcpEvents;
