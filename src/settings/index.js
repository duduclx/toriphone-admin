import { About } from "./content/about";
import { AccessFeatures, AccessFeatureCreate, AccessFeatureEdit } from "./content/accessFeature";
import { Agents, AgentCreate, AgentEdit } from "./content/agents";
import { AgentsStats } from "./content/agentsStats";
import { Applications, ApplicationCreate, ApplicationEdit } from "./content/applications";
import { AuthUsers, AuthUserCreate, AuthUserEdit } from "./content/authUsers";
import { Backends } from "./content/backends";
import { BackendLdap } from "./content/backendLdap";
import { BackendSaml } from "./content/backendSaml";
import { Blocklist } from "./content/blocklist";
import { Callfilters, CallfilterCreate, CallfilterEdit } from "./content/callfilters";
import { Callpermissions, CallpermissionCreate, CallpermissionEdit } from "./content/callpermissions";
import { Callpickups, CallpickupCreate, CallpickupEdit } from "./content/callpickup";
import { Calls } from "./content/calls";
import { Cdrs } from "./content/cdrs";
import { ConfBridge } from "./content/confBridge";
import { Conferences, ConferenceCreate, ConferenceEdit } from "./content/conferences";
import { Contexts, ContextCreate, ContextEdit } from "./content/contexts";
import { Devices, DeviceCreate, DeviceEdit } from "./content/devices";
import { DevicesPlugins } from "./content/devicesPlugins";
import { Dhcp} from "./content/dhcp";
import { Extensions } from "./content/extensions";
import { Externals, ExternalCreate, ExternalEdit } from "./content/externals";
import { ExternalApps, ExternalAppsCreate, ExternalAppsEdit } from "./content/externalapps";
import { Features } from "./content/features";
import { Funckeys, FunckeyCreate, FunckeyEdit } from "./content/funckeys";
import { Groups, GroupCreate, GroupEdit } from "./content/groups";
import { Iax } from "./content/iax";
import { Incalls, IncallCreate, IncallEdit } from "./content/incalls";
import { Ingresses, IngressCreate, IngressEdit } from "./content/ingresses";
import { Ivrs, IvrCreate, IvrEdit } from "./content/ivrs";
import { Lines, LineCreate, LineEdit } from "./content/lines";
import { Localization } from "./content/localization";
import { Meetings, MeetingCreate, MeetingEdit } from "./content/meetings"
import { Mohs, MohCreate, MohEdit } from "./content/mohs";
import { Monitoring } from "./content/monitoring";
import { Outcalls, OutcallCreate, OutcallEdit } from "./content/outcalls";
import { Pagings, PagingCreate, PagingEdit } from "./content/pagings";
import { Parkings, ParkingCreate, ParkingEdit } from "./content/parkings";
import { Phonebooks, PhonebookCreate, PhonebookEdit } from "./content/phonebooks";
import { PhonebooksContacts, PhonebooksContactCreate, PhonebooksContactEdit } from "./content/phonebookscontacts";
import { PhoneNumbers, PhoneNumberCreate, PhoneNumberEdit } from "./content/phoneNumbers";
import { PjSip } from "./content/pjsip";
import { Plugins } from "./content/plugins";
import { Policies, PolicyCreate, PolicyEdit } from "./content/policies";
import { PoliciesGroups, PolicyGroupCreate, PolicyGroupEdit } from "./content/policiesGroups";
import { Profiles, ProfileEdit } from "./content/profiles";
import { Provisioning } from "./content/provisioning";
import { ProvisioningDevice } from "./content/provisioningDevice";
import { Queues, QueueCreate, QueueEdit } from "./content/queues";
import { QueuesStats } from "./content/queuesStats";
import { RecordingAnnouncement } from "./content/recordingAnnouncement";
import { Retention } from "./content/retention";
import { Rtp } from "./content/rtp";
import { Schedules, ScheduleCreate, ScheduleEdit } from "./content/schedules";
import { Sessions } from "./content/sessions";
import { SipTemplates, SipTemplateCreate, SipTemplateEdit } from "./content/siptemplates";
import { Siptransports, SiptransportCreate, SiptransportEdit } from "./content/siptransports";
import { Skills, SkillCreate, SkillEdit } from "./content/skills";
import { SkillsRules, SkillsRuleCreate, SkillsRuleEdit } from "./content/skillsrules";
import { Sounds, SoundCreate, SoundEdit } from "./content/sounds";
import { Sources, SourceCreate, SourceEdit } from "./content/sources";
import { Subscriptions } from "./content/subscriptions";
import { Switchboards, SwitchboardCreate, SwitchboardEdit } from "./content/switchboards";
import { Tenants, TenantCreate, TenantEdit } from "./content/tenants";
import { Trunks, TrunkCreate, TrunkEdit } from "./content/trunks";
import { Users, UserCreate, UserEdit } from "./content/users";
import { VoicemailGeneral } from "./content/voicemailGeneral";
import { Voicemails, VoicemailCreate, VoicemailEdit } from "./content/voicemails";
import { Webhooks, WebhookCreate, WebhookEdit, WebhookLogs } from "./content/webhooks";

const PageComponents = {
  About,
  AccessFeatures,
  AccessFeatureCreate,
  AccessFeatureEdit,
  Agents,
  AgentCreate,
  AgentEdit,
  AgentsStats,
  Applications,
  ApplicationCreate,
  ApplicationEdit,
  AuthUsers,
  AuthUserCreate,
  AuthUserEdit,
  Backends,
  BackendLdap,
  BackendSaml,
  Blocklist,
  Callfilters,
  CallfilterCreate,
  CallfilterEdit,
  Callpermissions,
  CallpermissionCreate,
  CallpermissionEdit,
  Callpickups,
  CallpickupCreate,
  CallpickupEdit,
  Calls,
  Cdrs,
  ConfBridge,
  Conferences,
  ConferenceCreate,
  ConferenceEdit,
  Contexts,
  ContextCreate,
  ContextEdit,
  Devices,
  DeviceCreate,
  DeviceEdit,
  DevicesPlugins,
  Dhcp,
  Extensions,
  Externals,
  ExternalCreate,
  ExternalEdit,
  ExternalApps,
  ExternalAppsCreate,
  ExternalAppsEdit,
  Features,
  Funckeys,
  FunckeyCreate,
  FunckeyEdit,
  Groups,
  GroupCreate,
  GroupEdit,
  Iax,
  Incalls,
  IncallCreate,
  IncallEdit,
  Ingresses,
  IngressCreate,
  IngressEdit,
  Ivrs,
  IvrCreate,
  IvrEdit,
  Lines,
  LineCreate,
  LineEdit,
  Localization,
  Meetings,
  MeetingCreate,
  MeetingEdit,
  Mohs,
  MohCreate,
  MohEdit,
  Monitoring,
  Outcalls,
  OutcallCreate,
  OutcallEdit,
  Pagings,
  PagingCreate,
  PagingEdit,
  Parkings,
  ParkingCreate,
  ParkingEdit,
  // phonebooks -> contacts
  Phonebooks,
  PhonebookCreate,
  PhonebookEdit,
  PhonebooksContacts,
  PhonebooksContactCreate,
  PhonebooksContactEdit,
  PhoneNumbers,
  PhoneNumberCreate,
  PhoneNumberEdit,
  PjSip,
  Plugins,
  Policies,
  PolicyCreate,
  PolicyEdit,
  PoliciesGroups,
  PolicyGroupCreate,
  PolicyGroupEdit,
  Profiles,
  ProfileEdit,
  Provisioning,
  ProvisioningDevice,
  Queues,
  QueueCreate,
  QueueEdit,
  QueuesStats,
  RecordingAnnouncement,
  Retention,
  Rtp,
  Schedules,
  ScheduleCreate,
  ScheduleEdit,
  Sessions,
  SipTemplates,
  SipTemplateCreate,
  SipTemplateEdit,
  Siptransports,
  SiptransportCreate,
  SiptransportEdit,
  Skills,
  SkillCreate,
  SkillEdit,
  SkillsRules,
  SkillsRuleCreate,
  SkillsRuleEdit,
  Sounds,
  SoundCreate,
  SoundEdit,
  Sources,
  SourceCreate,
  SourceEdit,
  Subscriptions,
  Switchboards,
  SwitchboardCreate,
  SwitchboardEdit,
  Tenants,
  TenantCreate,
  TenantEdit,
  Trunks,
  TrunkCreate,
  TrunkEdit,
  Users,
  UserCreate,
  UserEdit,
  VoicemailGeneral,
  Voicemails,
  VoicemailCreate,
  VoicemailEdit,
  Webhooks,
  WebhookCreate,
  WebhookEdit,
  WebhookLogs
};

export default PageComponents;
