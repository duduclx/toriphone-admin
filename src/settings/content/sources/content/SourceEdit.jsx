import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useApis } from "../../../../ApiProvider";
import TemplatePage from "../../../templates/TemplatePage";

import SourceEditConference from "./SourceEditConference";
import SourceEditCsv from "./SourceEditCsv";
import SourceEditCsvWs from "./SourceEditCsvWs";
import SourceEditGoogle from "./SourceEditGoogle";
import SourceEditLdap from "./SourceEditLdap";
import SourceEditOffice from "./SourceEditOffice";
import SourceEditPersonal from "./SourceEditPersonal";
import SourceEditPhonebook from "./SourceEditPhonebook";
import SourceEditWazo from "./SourceEditWazo";

const SourceEdit = ({ setSelectedComponent }) => {
  // requirements
  const { t } = useTranslation("admin");

  // api
  const { sourceSelected, backendsSourceGet, backendsSourceEdit } = useApis();

  // errors
  const [errors, setErrors] = useState(null);

  // load
  const [loading, setLoading] = useState(false);

  // resource
  const [source, setSource] = useState(null);

  useEffect(() => {
    const fetchSource = async () => {
      const res = await backendsSourceGet(sourceSelected.backend, sourceSelected);
      setSource(res);
    };
    fetchSource();
  }, []);

  // submit
  const submit = async () => {
    setErrors(null);
    setLoading(true);
    const res = await backendsSourceEdit(sourceSelected.backend, source);
    if (res.error) {
      setLoading(false);
      setErrors({ title: res.status, description: res.message });
    } else {
      setLoading(false);
      setSelectedComponent("sources");
    }
  };

  return (
    <TemplatePage
      title={t("sources.edit.title", { name: source?.name })}
      setSelectedComponent={setSelectedComponent}
      route={"sources"}
      submit={submit}
      isEdit
      hasTabs
      errors={errors}
      loading={loading}
    >
      {source && sourceSelected.backend === "conference" && (
        <SourceEditConference source={source} setSource={setSource} />
      )}
      {source && sourceSelected.backend === "csv" && (
        <SourceEditCsv source={source} setSource={setSource} />
      )}
      {source && sourceSelected.backend === "csv_ws" && (
        <SourceEditCsvWs source={source} setSource={setSource} />
      )}
      {source && sourceSelected.backend === "google" && (
        <SourceEditGoogle source={source} setSource={setSource} />
      )}
      {source && sourceSelected.backend === "ldap" && (
        <SourceEditLdap source={source} setSource={setSource} />
      )}
      {source && sourceSelected.backend === "office365" && (
        <SourceEditOffice source={source} setSource={setSource} />
      )}
      {source && sourceSelected.backend === "personal" && (
        <SourceEditPersonal source={source} setSource={setSource} />
      )}
      {source && sourceSelected.backend === "phonebook" && (
        <SourceEditPhonebook source={source} setSource={setSource} />
      )}
      {source && sourceSelected.backend === "wazo" && (
        <SourceEditWazo source={source} setSource={setSource} />
      )}
    </TemplatePage>
  );
};

export default SourceEdit;
