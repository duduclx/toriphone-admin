import { useTranslation } from "react-i18next";
import { useApis } from "../../../../ApiProvider";

const WebhooksHelper = () => {
  const { t } = useTranslation("admin");
  const { userGet } = useApis();

  const getUserFromUuid = async (uuid) => {
    try {
      const myuser = await userGet({ uuid: uuid });
      const updtuser = {
        uuid: myuser.uuid,
        id: myuser.id,
        label: `${myuser.firstname} ${myuser.lastname}`,
        name: `${myuser.firstname} ${myuser.lastname}`,
      };
      return updtuser;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const webhooksService = ["http", "mobile"];

  const webhooksEventsOptions = [
    { label: t("webhooks.events.agent_paused"), value: "agent_paused" },
    { label: t("webhooks.events.agent_status_update"), value: "agent_status_update" },
    { label: t("webhooks.events.agent_unpaused"), value: "agent_unpaused" },
    { label: t("webhooks.events.call_answered"), value: "call_answered" },
    { label: t("webhooks.events.call_created"), value: "call_created" },
    { label: t("webhooks.events.call_dtmf_created"), value: "call_dtmf_created" },
    { label: t("webhooks.events.call_ended"), value: "call_ended" },
    { label: t("webhooks.events.call_held"), value: "call_held" },
    { label: t("webhooks.events.call_log_user_created"), value: "call_log_user_created" },
    { label: t("webhooks.events.call_resumed"), value: "call_resumed" },
    { label: t("webhooks.events.call_updated"), value: "call_updated" },
    { label: t("webhooks.events.chat_message_received"), value: "chat_message_received" },
    { label: t("webhooks.events.chat_message_sent"), value: "chat_message_sent" },
    { label: t("webhooks.events.chatd_presence_updated"), value: "chatd_presence_updated" },
    { label: t("webhooks.events.chatd_user_room_created"), value: "chatd_user_room_created" },
    { label: t("webhooks.events.chatd_user_room_message_created"), value: "chatd_user_room_message_created" },
    { label: t("webhooks.events.endpoint_status_update"), value: "endpoint_status_update" },
    { label: t("webhooks.events.favorite_added"), value: "favorite_added" },
    { label: t("webhooks.events.favorite_deleted"), value: "favorite_deleted" },
    { label: t("webhooks.events.relocate_initiated"), value: "relocate_initiated" },
    { label: t("webhooks.events.relocate_answered"), value: "relocate_answered" },
    { label: t("webhooks.events.relocate_complete"), value: "relocate_complete" },
    { label: t("webhooks.events.relocate_ended"), value: "relocate_ended" },
    { label: t("webhooks.events.user_status_update"), value: "user_status_update" },
    { label: t("webhooks.events.user_voicemail_message_created"), value: "user_voicemail_message_created" },
    { label: t("webhooks.events.user_voicemail_message_deleted"), value: "user_voicemail_message_deleted" },
    { label: t("webhooks.events.user_voicemail_message_updated"), value: "user_voicemail_message_updated" },
    { label: t("webhooks.events.users_forwards_busy_updated"), value: "users_forwards_busy_updated" },
    { label: t("webhooks.events.users_forwards_noanswer_updated"), value: "users_forwards_noanswer_updated" },
    { label: t("webhooks.events.users_forwards_unconditional_updated"), value: "users_forwards_unconditional_updated" },
    { label: t("webhooks.events.users_services_dnd_updated"), value: "users_services_dnd_updated" },
    { label: t("webhooks.events.users_services_incallfilter_updated"), value: "users_services_incallfilter_updated" },
  ];

  const webhooksMethodOptions = [
    { label: "POST", value: "post" },
    { label: "PUT", value: "put" },
    { label: "GET", value: "get" },
    { label: "DELETE", value: "delete" },
    { label: "HEAD", value: "head" },
  ];

  const webhooksContentTypeOptions = ["application/json", "text/plain", "text/javascript", "text/csv"];

  return {
    getUserFromUuid,
    webhooksService,
    webhooksEventsOptions,
    webhooksMethodOptions,
    webhooksContentTypeOptions,
  };
};

export default WebhooksHelper;

/*
  Wazo.websocket.eventLists =
  [
  "auth_session_expire_soon",
  "favorite_added",
  "favorite_deleted",
  "user_status_update",
  "chat_message_sent",
  "chat_message_received",
  "endpoint_status_update",
  "users_forwards_busy_updated",
  "users_forwards_noanswer_updated",
  "users_forwards_unconditional_updated",
  "users_services_dnd_updated",
  "user_voicemail_message_created",
  "user_voicemail_message_updated",
  "user_voicemail_message_deleted",
  "call_log_user_created",
  "call_answered",
  "call_created",
  "call_dtmf_created",
  "call_ended",
  "call_updated",
  "call_held",
  "call_resumed",
  "auth_user_external_auth_added",
  "auth_user_external_auth_deleted",
  "chatd_presence_updated",
  "chatd_user_room_message_created",
  "chatd_user_room_created",
  "conference_user_participant_joined",
  "conference_user_participant_left",
  "meeting_user_participant_joined",
  "meeting_user_participant_left",
  "conference_user_participant_talk_started",
  "conference_user_participant_talk_stopped",
  "switchboard_queued_calls_updated",
  "switchboard_queued_call_answered",
  "switchboard_held_calls_updated",
  "switchboard_held_call_answered",
  "fax_outbound_user_created",
  "fax_outbound_user_succeeded",
  "fax_outbound_user_failed",
  "application_call_dtmf_received",
  "application_call_entered",
  "application_call_initiated",
  "application_call_deleted",
  "application_call_updated",
  "application_call_answered",
  "application_progress_started",
  "application_progress_stopped",
  "application_destination_node_created",
  "application_node_created",
  "application_node_deleted",
  "application_node_updated",
  "application_playback_created",
  "application_playback_deleted",
  "application_snoop_created",
  "application_snoop_deleted",
  "application_snoop_updated",
  "application_user_outgoing_call_created",
  "trunk_status_updated",
  "line_status_updated",
  "agent_status_update",
  "agent_paused",
  "agent_unpaused",
  "conference_adhoc_participant_left",
  "conference_adhoc_deleted",
  "meeting_user_progress",
  "meeting_user_guest_authorization_created"
]
  */
