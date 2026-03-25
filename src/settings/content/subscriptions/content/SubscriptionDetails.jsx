import { Table, Box, Heading } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";

const SubscriptionDetails = () => {
  // requirements
  const { t } = useTranslation("admin");

  // details
  const subscriptions = [
    { level: 0, name: "Starter", content: t("subscriptions.details.starter") },
    { level: 1, name: "Voice", content: t("subscriptions.details.voice") },
    { level: 2, name: "Talk", content: "Voice + Voicemail" },
    { level: 3, name: "Talk+", content: "Talk + Chat" },
    { level: 4, name: "Team", content: "Talk+ + Agent" },
    { level: 5, name: "Team+", content: "Team + Meetings" },
    { level: 6, name: "Pro", content: "Team+ + Conference" },
    { level: 7, name: "Pro+", content: "Pro + External App" },
    { level: 8, name: "Advanced", content: "Pro+ + Webhooks" },
    { level: 9, name: "Advanced+", content: "Advanced + Desktop App" },
    { level: 10, name: "Admin", content: t("subscriptions.details.admin") },
  ];

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        {t("subscriptions.details.title_tab")}
      </Heading>
      <Table.Root variant="line">
        <Table.Header>
          <Table.Row bg="TableHeaderBg">
            <Table.ColumnHeader>{t("subscriptions.details.level")}</Table.ColumnHeader>
            <Table.ColumnHeader>{t("subscriptions.details.name")}</Table.ColumnHeader>
            <Table.ColumnHeader>{t("subscriptions.details.content")}</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {subscriptions.map((sub) => (
            <Table.Row bg="TableBodyBg" key={sub.level}>
              <Table.Cell>{sub.level}</Table.Cell>
              <Table.Cell>{sub.name}</Table.Cell>
              <Table.Cell>{sub.content}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default SubscriptionDetails;
