import { Flex, Field } from '@chakra-ui/react';
import { InputUi } from '../../../ui';
import { useTranslation } from 'react-i18next';

const RetentionForm = ({ item, setItem }) => {
    // requirements
    const { t } = useTranslation("admin");

  return (
    <Flex flex="1" flexDirection="column" gap="4">
        <Field.Root>
            <Field.Label>{t("retention.cdr_days")} :</Field.Label>
            <InputUi 
            value={item.cdr_days || ""}
            onChange={(e) => setItem((prev) => ({ ...prev, cdr_days: e.target.value === "" ? null : e.target.value}))}
            />
            <Field.HelperText>{t("retention.retention_helper", {value: item.default_cdr_days})}</Field.HelperText>
        </Field.Root>
        <Field.Root>
            <Field.Label>{t("retention.export_days")} :</Field.Label>
            <InputUi 
            value={item.export_days || ""}
            onChange={(e) => setItem((prev) => ({ ...prev, export_days: e.target.value === "" ? null : e.target.value}))}
            />
            <Field.HelperText>{t("retention.retention_helper", {value: item.default_export_days})}</Field.HelperText>
        </Field.Root>
        <Field.Root>
            <Field.Label>{t("retention.recording_days")} :</Field.Label>
            <InputUi 
            value={item.recording_days || ""}
            onChange={(e) => setItem((prev) => ({ ...prev, recording_days: e.target.value === "" ? null : e.target.value}))}
            />
            <Field.HelperText>{t("retention.retention_helper", {value: item.default_recording_days})}</Field.HelperText>
        </Field.Root>
    </Flex>
  )
}

export default RetentionForm
