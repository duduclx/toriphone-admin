import { useEffect, useState } from "react";
import { Accordion, Box, Flex, Text, Spacer, Menu } from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";
import { ButtonMenuUi, NativeSelectUi } from "../ui";
import {
  FaBars,
  FaChartBar,
  FaFlag,
  FaQuestionCircle,
  FaUserCog,
  FaUserFriends,
  FaFilter,
  FaFileInvoice,
  FaBook,
  FaAddressBook,
  FaUndo,
  FaClock,
  FaCodeBranch,
  FaCompressAlt,
  FaBan,
  FaCar,
  FaDesktop,
  FaCubes,
  FaMusic,
  FaBullhorn,
  FaLongArrowAltRight,
  FaLongArrowAltLeft,
  FaCompass,
  FaVoicemail,
  FaFileAudio,
  FaLock,
  FaUserShield,
  FaUsersCog,
  FaBuilding,
  FaExternalLinkAlt,
  FaCrown,
  FaTrophy,
  FaPhoneAlt,
  FaExchangeAlt,
  FaTty,
  FaRandom,
  FaBezierCurve,
  FaHandshake,
  FaVrCardboard,
  FaPeopleArrows,
  FaSignOutAlt,
  FaPaperPlane,
  FaVolumeOff,
  FaAsterisk,
  FaCogs,
  FaNetworkWired,
  FaProjectDiagram,
  FaHome,
  FaFax,
  FaPhoneSlash,
  FaClipboardList,
} from "react-icons/fa";
import {
  FaUsers,
  FaHeadset,
  FaArrowDownUpAcrossLine,
  FaArrowsLeftRightToLine,
  FaFileCode,
  FaShare,
  FaShapes,
  FaUserSecret,
  FaArrowRotateLeft,
  FaArrowUpRightDots,
} from "react-icons/fa6";

import { MdMonitorHeart } from "react-icons/md";
import { useTranslation } from "react-i18next";

import isVersionGreaterOrEqual from "./checkMinVersion";

import { useApis } from "../../ApiProvider";
import { useAuth } from "toriphone-auth";

import ButtonColorModeSwitcher from "../../theme/ButtonColorModeSwitcher";
import Logo from "../../theme/Logo";
import { LocaleSwitcher } from "../../utils/LanguageSwitcher";
import FormContainer from "../templates/forms/FormContainer";

const SettingsSidebar = ({ setSelectedComponent, selectedComponent, loginType }) => {
  // requirements
  const { t } = useTranslation("admin");

  // dependencies
  const { user, userLogout, storageSessionRemove } = useAuth();

  // conditional menu
  const [isMasterTenant, setIsMasterTenant] = useState(false);
  const { serverInfos, showSidebar, tenants, tenantCurrent, setTenantCurrent } = useApis();

  const submitLogOut = async () => {
    await userLogout();
    await storageSessionRemove();
    // refresh window
    window.location.reload();
  };

  useEffect(() => {
    if (tenantCurrent?.name) {
      const master = tenantCurrent.name === "master" ? true : false;
      setIsMasterTenant(master);
    }
  }, [tenantCurrent]);

  const handleTenantChange = (e) => {
    const tenant = tenants.items.find((item) => item.uuid === e.target.value);
    setTenantCurrent(tenant);
    setSelectedComponent("");
  };

  return (
    <Flex
      flexDirection="column"
      boxShadow="lg"
      height="100vh"
      p="4"
      width="100%"
      bg="bgSecondary"
      justifyContent="flex-start"
      overflowY="auto"
      className="hide-scrollbar"
      opacity={showSidebar ? 1 : 0}
      transition="visibility 0.4s, opacity 0.4s ease-in-out"
      transitionDelay={!showSidebar ? "0s" : "0.5s"}
    >
      {loginType === "client" ? (
        <Text p="2" textAlign="center" as="b">
          {t("sidebar.sidebar_title")}
        </Text>
      ) : (
        <FormContainer>
          <Flex flexDirection="row" justifyContent="space-between" width="100%">
            <Logo />
            <Box>
              <Text pl="2" as="b">
                {user.server}
              </Text>
              <Text p="2" as="sub">
                V{serverInfos?.wazo_version}
              </Text>
            </Box>
            <Menu.Root variant="subtle">
              <Menu.Trigger>
                <FaBars />
              </Menu.Trigger>
              <Menu.Positioner>
                <Menu.Content p="4" bg="bgDefault" boxShadow="lg">
                  <Menu.Item>
                    <Text textAlign="center" w="100%">
                      {user?.profile?.firstname || user?.profile?.firstName || ""}{" "}
                      {user?.profile?.lastname || user?.profile?.lastName || ""}
                    </Text>
                  </Menu.Item>
                  <Menu.Separator />
                  <ButtonMenuUi
                    borderRadius="0px"
                    isActive={selectedComponent === "about"}
                    onClick={() => setSelectedComponent("about")}
                  >
                    <FaQuestionCircle /> {t("sidebar.sidebar_menu_about")}
                  </ButtonMenuUi>
                  <ButtonColorModeSwitcher />
                  <Box px="3" py="2" bg="bgDefault">
                    <LocaleSwitcher />
                  </Box>
                  <ButtonMenuUi borderRadius="0px" onClick={() => submitLogOut()}>
                    <FaSignOutAlt /> {t("sidebar.sidebar_menu_logout")}
                  </ButtonMenuUi>
                  <Menu.Separator />
                  {tenants?.items?.length > 0 && user.tenantUuid && (
                    <Menu.Item bg="bgDefault">
                      <Text textAlign="center" w="100%">
                        {tenants.items.find((tenant) => tenant.uuid === user.tenantUuid)?.name || "Tenant inconnu"}
                      </Text>
                    </Menu.Item>
                  )}
                </Menu.Content>
              </Menu.Positioner>
            </Menu.Root>
          </Flex>
        </FormContainer>
      )}
      <Spacer />
      <Flex flexDirection="column" alignItems="flex-start" width="100%" height="100vh" mt="8">
        <Box width="100%" mb="8">
          <NativeSelectUi
            value={tenantCurrent?.uuid || ""}
            onChange={(e) => handleTenantChange(e)}
            disabled={!tenants?.items?.length}
          >
            {!tenants?.items?.length ? (
              <option>⏳ {t("sidebar.loading")}</option>
            ) : (
              tenants.items.map((item, index) => (
                <option key={index} value={item.uuid}>
                  {item.name}
                </option>
              ))
            )}
          </NativeSelectUi>
        </Box>
        <Accordion.Root collapsible width="100%" px="4">
          <Accordion.Item className="custom-accordion-container" value="a">
            <Accordion.ItemTrigger>
              <Box as="span" flex="1" textAlign="left">
                {t("sidebar.users_title")}
              </Box>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent pb="4">
              <ButtonMenuUi
                onClick={() => setSelectedComponent("users")}
                isActive={
                  selectedComponent === "users" ||
                  selectedComponent === "userCreate" ||
                  selectedComponent === "userEdit"
                }
              >
                <FaUserCog /> {t("sidebar.users")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("voicemails")}
                isActive={
                  selectedComponent === "voicemails" ||
                  selectedComponent === "voicemailCreate" ||
                  selectedComponent === "voicemailEdit"
                }
              >
                <FaVoicemail /> {t("sidebar.voicemails")}
              </ButtonMenuUi>
            </Accordion.ItemContent>
          </Accordion.Item>

          <Accordion.Item className="custom-accordion-container" value="b">
            <Accordion.ItemTrigger>
              <Box as="span" flex="1" textAlign="left">
                {t("sidebar.phones_title")}
              </Box>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent pb="4">
              <ButtonMenuUi
                onClick={() => setSelectedComponent("devices")}
                isActive={
                  selectedComponent === "devices" ||
                  selectedComponent === "deviceCreate" ||
                  selectedComponent === "deviceEdit"
                }
              >
                <FaPhoneAlt /> {t("sidebar.devices")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("funckeys")}
                isActive={
                  selectedComponent === "funckeys" ||
                  selectedComponent === "funckeyCreate" ||
                  selectedComponent === "funckeyEdit"
                }
              >
                <FaFileInvoice /> {t("sidebar.funckey_templates")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("lines")}
                isActive={
                  selectedComponent === "lines" ||
                  selectedComponent === "lineCreate" ||
                  selectedComponent === "lineEdit"
                }
              >
                <FaExchangeAlt /> {t("sidebar.lines")}
              </ButtonMenuUi>
            </Accordion.ItemContent>
          </Accordion.Item>

          <Accordion.Item className="custom-accordion-container" value="c">
            <Accordion.ItemTrigger>
              <Box as="span" flex="1" textAlign="left">
                {t("sidebar.call_title")}
              </Box>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent pb="4">
              <ButtonMenuUi
                onClick={() => setSelectedComponent("schedules")}
                isActive={
                  selectedComponent === "schedules" ||
                  selectedComponent === "scheduleCreate" ||
                  selectedComponent === "scheduleEdit"
                }
              >
                <FaClock /> {t("sidebar.schedules")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("callfilters")}
                bg={
                  selectedComponent === "callfilters" ||
                  selectedComponent === "callfilterCreate" ||
                  selectedComponent === "callfilterEdit"
                }
              >
                <FaFilter /> {t("sidebar.bsfilters")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("groups")}
                isActive={
                  selectedComponent === "groups" ||
                  selectedComponent === "groupCreate" ||
                  selectedComponent === "groupEdit"
                }
              >
                <FaUsers /> {t("sidebar.groups")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("callpickups")}
                isActive={
                  selectedComponent === "callpickups" ||
                  selectedComponent === "callpickupCreate" ||
                  selectedComponent === "callpickupEdit"
                }
              >
                <FaUndo /> {t("sidebar.callpickup")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("parkings")}
                isActive={
                  selectedComponent === "parkings" ||
                  selectedComponent === "parkingCreate" ||
                  selectedComponent === "parkingEdit"
                }
              >
                <FaCar /> {t("sidebar.parkings")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("pagings")}
                bg={
                  selectedComponent === "pagings" ||
                  selectedComponent === "pagingCreate" ||
                  selectedComponent === "pagingEdit"
                }
              >
                <FaBullhorn /> {t("sidebar.pagings")}
              </ButtonMenuUi>
            </Accordion.ItemContent>
          </Accordion.Item>

          <Accordion.Item className="custom-accordion-container" value="d">
            <Accordion.ItemTrigger>
              <Box as="span" flex="1" textAlign="left">
                {t("sidebar.phonebook_title")}
              </Box>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent pb="4">
              <ButtonMenuUi
                onClick={() => setSelectedComponent("phonebooks")}
                isActive={
                  selectedComponent === "phonebooks" ||
                  selectedComponent === "phonebookCreate" ||
                  selectedComponent === "phonebookEdit"
                }
              >
                <FaBook /> {t("sidebar.phonebooks")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("phonebooksContacts")}
                isActive={
                  selectedComponent === "phonebooksContacts" ||
                  selectedComponent === "phonebooksContactCreate" ||
                  selectedComponent === "phonebooksContactEdit"
                }
              >
                <FaUserFriends /> {t("sidebar.contacts")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("profiles")}
                isActive={
                  selectedComponent === "profiles" ||
                  selectedComponent === "profileCreate" ||
                  selectedComponent === "profileEdit"
                }
              >
                <FaAddressBook /> {t("sidebar.profiles")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("sources")}
                isActive={
                  selectedComponent === "sources" ||
                  selectedComponent === "sourceCreate" ||
                  selectedComponent === "sourceEdit"
                }
              >
                <FaRandom /> {t("sidebar.sources")}
              </ButtonMenuUi>
            </Accordion.ItemContent>
          </Accordion.Item>

          <Accordion.Item className="custom-accordion-container" value="e">
            <Accordion.ItemTrigger>
              <Box as="span" flex="1" textAlign="left">
                {t("sidebar.callcenter_title")}
              </Box>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent pb="4">
              <ButtonMenuUi
                onClick={() => setSelectedComponent("agents")}
                isActive={
                  selectedComponent === "agents" ||
                  selectedComponent === "agentCreate" ||
                  selectedComponent === "agentEdit"
                }
              >
                <FaUsers /> {t("sidebar.agents")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("queues")}
                isActive={
                  selectedComponent === "queues" ||
                  selectedComponent === "queueCreate" ||
                  selectedComponent === "queueEdit"
                }
              >
                <FaUsers /> {t("sidebar.queues")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("skills")}
                isActive={
                  selectedComponent === "skills" ||
                  selectedComponent === "skillCreate" ||
                  selectedComponent === "skillEdit"
                }
              >
                <FaTrophy /> {t("sidebar.skills")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("skillsRules")}
                isActive={
                  selectedComponent === "skillsRules" ||
                  selectedComponent === "skillsRuleCreate" ||
                  selectedComponent === "skillsRuleEdit"
                }
              >
                <FaCrown /> {t("sidebar.skillsrules")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("ivrs")}
                isActive={
                  selectedComponent === "ivrs" || selectedComponent === "ivrCreate" || selectedComponent === "ivrEdit"
                }
              >
                <FaBars /> {t("sidebar.svi")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("switchboards")}
                isActive={
                  selectedComponent === "switchboards" ||
                  selectedComponent === "switchboardCreate" ||
                  selectedComponent === "switchboardEdit"
                }
              >
                <FaDesktop /> {t("sidebar.switchboard")}
              </ButtonMenuUi>
            </Accordion.ItemContent>
          </Accordion.Item>

          <Accordion.Item className="custom-accordion-container" value="f">
            <Accordion.ItemTrigger>
              <Box as="span" flex="1" textAlign="left">
                {t("sidebar.conferences_title")}
              </Box>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent pb="4">
              <ButtonMenuUi
                onClick={() => setSelectedComponent("conferences")}
                isActive={
                  selectedComponent === "conferences" ||
                  selectedComponent === "conferenceCreate" ||
                  selectedComponent === "conferenceEdit"
                }
              >
                <FaCompressAlt /> {t("sidebar.conferences")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("ingresses")}
                isActive={
                  selectedComponent === "ingresses" ||
                  selectedComponent === "ingressCreate" ||
                  selectedComponent === "ingressEdit"
                }
              >
                <FaCompass /> {t("sidebar.ingress")}
              </ButtonMenuUi>
              {/*
              <ButtonMenuUi
                onClick={() => setSelectedComponent("meetings")}
                isActive={
                  selectedComponent === "meetings" ||
                  selectedComponent === "meetingCreate" ||
                  selectedComponent === "meetingEdit"
                }
              >
                <FaHandshake /> {t("sidebar.meetings")}
              </ButtonMenuUi>
              */}
            </Accordion.ItemContent>
          </Accordion.Item>

          <Accordion.Item className="custom-accordion-container" value="g">
            <Accordion.ItemTrigger>
              <Box as="span" flex="1" textAlign="left">
                {t("sidebar.audio_title")}
              </Box>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent pb="4">
              <ButtonMenuUi
                onClick={() => setSelectedComponent("sounds")}
                isActive={
                  selectedComponent === "sounds" ||
                  selectedComponent === "soundCreate" ||
                  selectedComponent === "soundEdit"
                }
              >
                <FaFileAudio /> {t("sidebar.sounds")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("mohs")}
                isActive={
                  selectedComponent === "mohs" || selectedComponent === "mohCreate" || selectedComponent === "mohEdit"
                }
              >
                <FaMusic /> {t("sidebar.mohs")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("recordingAnnouncement")}
                isActive={selectedComponent === "recordingAnnouncement"}
              >
                <FaBullhorn /> {t("sidebar.recordingAnnouncement")}
              </ButtonMenuUi>
            </Accordion.ItemContent>
          </Accordion.Item>

          <Accordion.Item className="custom-accordion-container" value="h">
            <Accordion.ItemTrigger>
              <Box as="span" flex="1" textAlign="left">
                {t("sidebar.call_configuration_title")}
              </Box>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent pb="4">
              <ButtonMenuUi
                onClick={() => setSelectedComponent("incalls")}
                isActive={
                  selectedComponent === "incalls" ||
                  selectedComponent === "incallCreate" ||
                  selectedComponent === "incallEdit"
                }
              >
                <FaLongArrowAltRight /> {t("sidebar.incalls")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("outcalls")}
                isActive={
                  selectedComponent === "outcalls" ||
                  selectedComponent === "outcallCreate" ||
                  selectedComponent === "outcallEdit"
                }
              >
                <FaLongArrowAltLeft /> {t("sidebar.outcalls")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("callpermissions")}
                isActive={
                  selectedComponent === "callpermissions" ||
                  selectedComponent === "callpermissionCreate" ||
                  selectedComponent === "callpermissionEdit"
                }
              >
                <FaBan /> {t("sidebar.callpermissions")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("contexts")}
                isActive={
                  selectedComponent === "contexts" ||
                  selectedComponent === "contextCreate" ||
                  selectedComponent === "contextEdit"
                }
              >
                <FaCodeBranch /> {t("sidebar.contexts")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("trunks")}
                isActive={
                  selectedComponent === "trunks" ||
                  selectedComponent === "trunkCreate" ||
                  selectedComponent === "trunkEdit"
                }
              >
                <FaArrowsLeftRightToLine /> {t("sidebar.trunks")}
              </ButtonMenuUi>
              {serverInfos.wazo_version && isVersionGreaterOrEqual(serverInfos.wazo_version, "24.15") && (
                <ButtonMenuUi
                  onClick={() => setSelectedComponent("phoneNumbers")}
                  isActive={
                    selectedComponent === "phoneNumbers" ||
                    selectedComponent === "phoneNumberCreate" ||
                    selectedComponent === "phoneNumberEdit"
                  }
                >
                  <FaVrCardboard /> {t("sidebar.phoneNumbers")}
                </ButtonMenuUi>
              )}
              {serverInfos.wazo_version && isVersionGreaterOrEqual(serverInfos.wazo_version, "25.06") && (
                <ButtonMenuUi
                  onClick={() => setSelectedComponent("blocklist")}
                  isActive={selectedComponent === "blocklist"}
                >
                  <FaPhoneSlash /> {t("sidebar.blocklist")}
                </ButtonMenuUi>
              )}
              <ButtonMenuUi
                onClick={() => setSelectedComponent("sipTemplates")}
                isActive={
                  selectedComponent === "sipTemplates" ||
                  selectedComponent === "sipTemplateCreate" ||
                  selectedComponent === "sipTemplateEdit"
                }
              >
                <FaFileCode /> {t("sidebar.sipTemplates")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("extensions")}
                isActive={
                  selectedComponent === "extensions" ||
                  selectedComponent === "extensionCreate" ||
                  selectedComponent === "extensionEdit"
                }
              >
                <FaTty /> {t("sidebar.extensions")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("localization")}
                isActive={selectedComponent === "localization"}
              >
                <FaFlag /> {t("sidebar.localization")}
              </ButtonMenuUi>
            </Accordion.ItemContent>
          </Accordion.Item>

          <Accordion.Item className="custom-accordion-container" value="i">
            <Accordion.ItemTrigger>
              <Box as="span" flex="1" textAlign="left">
                {t("sidebar.identity_title")}
              </Box>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent pb="4">
              <ButtonMenuUi
                onClick={() => setSelectedComponent("authUsers")}
                isActive={
                  selectedComponent === "authUsers" ||
                  selectedComponent === "authUserEdit" ||
                  selectedComponent === "authUserCreate"
                }
              >
                <FaUserShield /> {t("sidebar.identities")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("policies")}
                isActive={
                  selectedComponent === "policies" ||
                  selectedComponent === "policyCreate" ||
                  selectedComponent === "policyEdit"
                }
              >
                <FaLock /> {t("sidebar.policies")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("policiesGroups")}
                isActive={
                  selectedComponent === "policiesGroups" ||
                  selectedComponent === "policyGroupCreate" ||
                  selectedComponent === "policyGroupEdit"
                }
              >
                <FaUsersCog /> {t("sidebar.policy_group")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("backends")}
                isActive={
                  selectedComponent === "backends" ||
                  selectedComponent === "backendLdap" ||
                  selectedComponent === "backendSaml"
                }
              >
                <FaBuilding /> {t("sidebar.auths")}
              </ButtonMenuUi>
              {/*
              <ButtonMenuUi
                onClick={() => setSelectedComponent("backendLdap")}
                isActive={
                  selectedComponent === "backendLdap"
                }
              >
                <FaBuilding /> {t("sidebar.auth_ldap")}
              </ButtonMenuUi>
              */}
              {/*
              <ButtonMenuUi
                onClick={() => setSelectedComponent("backendSaml")}
                isActive={
                  selectedComponent === "backendSaml"
                }
              >
                <FaBuilding /> {t("sidebar.auth_saml")}
              </ButtonMenuUi>
              */}
              <ButtonMenuUi
                onClick={() => setSelectedComponent("externals")}
                isActive={
                  selectedComponent === "externals" ||
                  selectedComponent === "externalEdit" ||
                  selectedComponent === "externalCreate"
                }
              >
                <FaExternalLinkAlt /> {t("sidebar.auth_external")}
              </ButtonMenuUi>
            </Accordion.ItemContent>
          </Accordion.Item>

          <Accordion.Item className="custom-accordion-container" value="j">
            <Accordion.ItemTrigger>
              <Box as="span" flex="1" textAlign="left">
                {t("sidebar.services_title")}
              </Box>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent pb="4">
              <ButtonMenuUi
                onClick={() => setSelectedComponent("externalApps")}
                isActive={
                  selectedComponent === "externalApps" ||
                  selectedComponent === "externalAppsCreate" ||
                  selectedComponent === "externalAppsEdit"
                }
              >
                <FaShapes /> {t("sidebar.external_app")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("applications")}
                isActive={
                  selectedComponent === "applications" ||
                  selectedComponent === "applicationCreate" ||
                  selectedComponent === "applicationEdit"
                }
              >
                <FaCubes /> {t("sidebar.applications")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("webhooks")}
                isActive={
                  selectedComponent === "webhooks" ||
                  selectedComponent === "webhookCreate" ||
                  selectedComponent === "webhookEdit" ||
                  selectedComponent === "webhookLogs"
                }
              >
                <FaBezierCurve /> {t("sidebar.webhooks")}
              </ButtonMenuUi>
            </Accordion.ItemContent>
          </Accordion.Item>

          <Accordion.Item className="custom-accordion-container" value="k">
            <Accordion.ItemTrigger>
              <Box as="span" flex="1" textAlign="left">
                {t("sidebar.activities_title")}
              </Box>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent pb="4">
              <ButtonMenuUi onClick={() => setSelectedComponent("cdrs")} isActive={selectedComponent === "cdrs"}>
                <FaArrowRotateLeft /> {t("sidebar.activities_cdrs")}
              </ButtonMenuUi>
              <ButtonMenuUi onClick={() => setSelectedComponent("calls")} isActive={selectedComponent === "calls"}>
                <FaPeopleArrows /> {t("sidebar.activities_calls")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("sessions")}
                isActive={selectedComponent === "sessions"}
              >
                <FaUserSecret /> {t("sidebar.activities_sessions")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("subscriptions")}
                isActive={selectedComponent === "subscriptions"}
              >
                <FaClipboardList /> {t("sidebar.activities_subscriptions")}
              </ButtonMenuUi>
            </Accordion.ItemContent>
          </Accordion.Item>

          <Accordion.Item className="custom-accordion-container" value="l">
            <Accordion.ItemTrigger>
              <Box as="span" flex="1" textAlign="left">
                {t("sidebar.report_title")}
              </Box>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent pb="4">
              <ButtonMenuUi
                onClick={() => setSelectedComponent("agentsStats")}
                isActive={selectedComponent === "agentsStats"}
              >
                <FaHeadset /> {t("sidebar.report_agents")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("queuesStats")}
                isActive={selectedComponent === "queuesStats"}
              >
                <FaChartBar /> {t("sidebar.report_queues")}
              </ButtonMenuUi>
            </Accordion.ItemContent>
          </Accordion.Item>

          <Accordion.Item className="custom-accordion-container" value="m">
            <Accordion.ItemTrigger>
              <Box as="span" flex="1" textAlign="left">
                {t("sidebar.monitoring")}
              </Box>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent pb="4">
              <ButtonMenuUi
                onClick={() => setSelectedComponent("monitoring")}
                isActive={selectedComponent === "monitoring"}
              >
                <MdMonitorHeart /> {t("sidebar.monitoring_services")}
              </ButtonMenuUi>
              <ButtonMenuUi
                onClick={() => setSelectedComponent("retention")}
                isActive={selectedComponent === "retention"}
              >
                <FaArrowUpRightDots /> {t("sidebar.retention")}
              </ButtonMenuUi>
            </Accordion.ItemContent>
          </Accordion.Item>

          {isMasterTenant && (
            <Accordion.Item className="custom-accordion-container" value="n">
              <Accordion.ItemTrigger>
                <Box as="span" flex="1" textAlign="left">
                  {t("sidebar.global_configuration")}
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent pb="4">
                <ButtonMenuUi
                  onClick={() => setSelectedComponent("tenants")}
                  isActive={
                    selectedComponent === "tenants" ||
                    selectedComponent === "tenantCreate" ||
                    selectedComponent === "tenantEdit"
                  }
                >
                  <FaHome /> {t("sidebar.tenants")}
                </ButtonMenuUi>
                <ButtonMenuUi
                  onClick={() => setSelectedComponent("siptransports")}
                  isActive={
                    selectedComponent === "siptransports" ||
                    selectedComponent === "siptransportCreate" ||
                    selectedComponent === "siptransportEdit"
                  }
                >
                  <FaShare /> {t("sidebar.sipTransports")}
                </ButtonMenuUi>
                <ButtonMenuUi
                  onClick={() => setSelectedComponent("plugins")}
                  isActive={selectedComponent === "plugins"}
                >
                  <FaCubes /> {t("sidebar.plugins")}
                </ButtonMenuUi>
                <ButtonMenuUi
                  onClick={() => setSelectedComponent("accessFeatures")}
                  isActive={
                    selectedComponent === "accessFeatures" ||
                    selectedComponent === "accessFeatureCreate" ||
                    selectedComponent === "accessFeatureEdit"
                  }
                >
                  <FaLock /> {t("sidebar.access_feature")}
                </ButtonMenuUi>
                <ButtonMenuUi
                  onClick={() => setSelectedComponent("confBridge")}
                  isActive={selectedComponent === "confBridge"}
                >
                  <FaCompressAlt /> {t("sidebar.confbridge")}
                </ButtonMenuUi>
                <ButtonMenuUi
                  onClick={() => setSelectedComponent("voicemailGeneral")}
                  isActive={selectedComponent === "voicemailGeneral"}
                >
                  <FaPaperPlane /> {t("sidebar.voicemailGeneral")}
                </ButtonMenuUi>
                <ButtonMenuUi onClick={() => setSelectedComponent("rtp")} isActive={selectedComponent === "rtp"}>
                  <FaVolumeOff /> {t("sidebar.rtp")}
                </ButtonMenuUi>
                <ButtonMenuUi
                  onClick={() => setSelectedComponent("features")}
                  isActive={selectedComponent === "features"}
                >
                  <FaAsterisk /> {t("sidebar.features")}
                </ButtonMenuUi>
                <ButtonMenuUi onClick={() => setSelectedComponent("pjSip")} isActive={selectedComponent === "pjSip"}>
                  <FaCogs /> {t("sidebar.pjsip")}
                </ButtonMenuUi>
                <ButtonMenuUi onClick={() => setSelectedComponent("iax")} isActive={selectedComponent === "iax"}>
                  <FaCogs /> {t("sidebar.iax")}
                </ButtonMenuUi>
                <ButtonMenuUi onClick={() => setSelectedComponent("dhcp")} isActive={selectedComponent === "dhcp"}>
                  <FaNetworkWired /> {t("sidebar.dhcp")}
                </ButtonMenuUi>
                <ButtonMenuUi
                  onClick={() => setSelectedComponent("provisioning")}
                  isActive={selectedComponent === "provisioning"}
                >
                  <FaArrowDownUpAcrossLine /> {t("sidebar.provisioning")}
                </ButtonMenuUi>
                <ButtonMenuUi
                  onClick={() => setSelectedComponent("provisioningDevice")}
                  isActive={selectedComponent === "provisioningDevice"}
                >
                  <FaFax /> {t("sidebar.provisioningDevice")}
                </ButtonMenuUi>
                <ButtonMenuUi
                  onClick={() => setSelectedComponent("devicesPlugins")}
                  isActive={selectedComponent === "devicesPlugins"}
                >
                  <FaFax /> {t("sidebar.devicesPlugins")}
                </ButtonMenuUi>
              </Accordion.ItemContent>
            </Accordion.Item>
          )}
        </Accordion.Root>
      </Flex>
    </Flex>
  );
};

export default SettingsSidebar;
