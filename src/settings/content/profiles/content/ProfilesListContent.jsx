import { Table } from "@chakra-ui/react";

import { useApis } from "../../../../ApiProvider";
import TemplateListContent from "../../../templates/TemplateListContent";

const ProfilesListContent = ({ profile, setSelectedComponent }) => {
  // requirements

  // api
  const { setProfileSelected } = useApis();

  const onEdit = () => {
    setProfileSelected(profile);
    setSelectedComponent("profileEdit");
  };

  return (
    <TemplateListContent onEdit={onEdit} ressource={profile}>
      <Table.Cell>{profile.name}</Table.Cell>
    </TemplateListContent>
  );
};

export default ProfilesListContent;
