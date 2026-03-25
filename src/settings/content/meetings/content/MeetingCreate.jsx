import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import MeetingForm from "../forms/MeetingForm";

const MeetingCreate = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { meetingCreate } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [meeting, setMeeting] = useState({
    name: "",
    persistent: false,
    require_authorization: false,
    owner_uuids: [],
  });

  // user form
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userUuids = users.map((user) => user.uuid);

    setMeeting((prev) => ({
      ...prev,
      owner_uuids: userUuids,
    }));
  }, [users]);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await meetingCreate(meeting);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.error_id, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("meetings");
    }
  };

  return (
    <TemplatePage
      title={t("meetings.create.title")}
      setSelectedComponent={setSelectedComponent}
      route={"meetings"}
      submit={submit}
      isCreate
      errors={errors}
      loading={loading}
    >
      <MeetingForm meeting={meeting} setMeeting={setMeeting} users={users} setUsers={setUsers}/>
    </TemplatePage>
  );
};

export default MeetingCreate;
