import { useEffect } from "react";
import { Field } from "@chakra-ui/react";
import { AsyncSelectUi } from "../../../ui";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";

const UserEditSchedules = ({ user, setUser }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { schedulesGet } = useApis();

  const load = () => {
    return new Promise(async (resolve) => {
      const schedules = await schedulesGet();
      const filtered = schedules.items.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      resolve(filtered);
    });
  };

  useEffect(() => {
    if (user.schedules.length > 0) {
      const updatedSchedules = user.schedules.map((schedule) => ({
        ...schedule,
        label: schedule.name,
      }));

      setUser((prevUser) => ({
        ...prevUser,
        schedules: updatedSchedules,
      }));
    }
  }, []);

  const onchange = (selectedOptions) => {
    if (selectedOptions) {
      const transformed = {
        id: selectedOptions.value,
        name: selectedOptions.label,
        label: selectedOptions.label,
      };
      setUser((prev) => ({
        ...prev,
        schedules: [transformed],
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        schedules: [],
      }));
    }
  };

  return (
    <Field.Root>
      <Field.Label>{t("common.schedules")} :</Field.Label>
      <AsyncSelectUi
        cacheOptions
        loadOptions={load}
        defaultOptions
        isClearable
        onChange={onchange}
        value={
          user.schedules
            ? user.schedules.map((item) => ({
                label: item.label,
                value: item.id,
              }))
            : []
        }
        placeholder={t("users.lines.schedule_select")}
      />
    </Field.Root>
  );
};

export default UserEditSchedules;
