import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

import TemplatePage from "../../../templates/TemplatePage";
import MeetingForm from "../forms/MeetingForm";

const MeetingEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { meetingSelected, meetingUpdate, userGet } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [meeting, setMeeting] = useState(meetingSelected);

  // user form
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const fetchedOwners = [];

        for (const uuid of meeting.owner_uuids) {
          const user = await userGet({ uuid });
          // ne garder que les propriétés firstname, lastname et uuid
          const { firstname, lastname, uuid: userUuid } = user;
          fetchedOwners.push({ label: firstname + " " + lastname, uuid: userUuid, value: userUuid });
        }
        setMeeting((prev) => ({
          ...prev,
          owners: fetchedOwners,
        }));
        setUsers(fetchedOwners);
      } catch (error) {
        //console.error("Error fetching users:", error);
      }
    };

    if (meeting.owner_uuids?.length > 0) {
      fetch();
    }
  }, []);

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
    const res = await meetingUpdate(meeting);
    if (res.status) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("meetings");
    }
  };

  return (
    <TemplatePage
      title={t("meetings.edit.title", { name: meeting.name })}
      setSelectedComponent={setSelectedComponent}
      route={"meetings"}
      submit={submit}
      isEdit
      errors={errors}
      loading={loading}
    >
      <MeetingForm meeting={meeting} setMeeting={setMeeting} users={users} setUsers={setUsers} />
    </TemplatePage>
  );
};

export default MeetingEdit;
