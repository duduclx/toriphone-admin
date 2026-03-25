import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from "@chakra-ui/react";

import { useApis } from '../../../../ApiProvider';

import TemplateTable from '../../../templates/TemplateTable';
import TemplateTableEmpty from '../../../templates/TemplateTableEmpty';
import QueuesStatsListContent from './QueuesStatsListContent';

const QueuesStatsList = () => {
    // requirements
    const { t } = useTranslation("admin");

    // api
    const { queuesStatistics, queuesStatisticsGet } = useApis();

    // load
    useEffect(() => {
        queuesStatisticsGet();
    }, [])

  return (
    <>
    {queuesStatistics?.items && (
      <TemplateTable>
        <Table.Caption></Table.Caption>
        <Table.Header>
          <Table.Row bg="TableHeaderBg">
            <Table.ColumnHeader>{t("common.actions")}</Table.ColumnHeader>
            <Table.ColumnHeader>{t("common.name")}</Table.ColumnHeader>
            <Table.ColumnHeader>{t("queues.received")}</Table.ColumnHeader>
            <Table.ColumnHeader>{t("queues.answered")}</Table.ColumnHeader>
            <Table.ColumnHeader>{t("queues.answered_rate")}</Table.ColumnHeader>
            <Table.ColumnHeader>{t("queues.average_waiting_time")}</Table.ColumnHeader>
            <Table.ColumnHeader>{t("queues.not_answered")}</Table.ColumnHeader>
            <Table.ColumnHeader>{t("queues.abandonned")}</Table.ColumnHeader>
            <Table.ColumnHeader>{t("queues.blocked")}</Table.ColumnHeader>
            <Table.ColumnHeader>{t("queues.closed")}</Table.ColumnHeader>
            <Table.ColumnHeader>{t("queues.saturated")}</Table.ColumnHeader>
            <Table.ColumnHeader>{t("queues.from")}</Table.ColumnHeader>
            <Table.ColumnHeader>{t("queues.until")}</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {queuesStatistics.items.length == 0 ? (
            <TemplateTableEmpty colSpan="13"/>
          ) : (
            queuesStatistics.items.map((queue, index) => (
              <QueuesStatsListContent queue={queue} key={index} />
            ))
          )}
        </Table.Body>
      </TemplateTable>
    )}
  </>
  )
}

export default QueuesStatsList
