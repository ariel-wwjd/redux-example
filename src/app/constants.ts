import { PaginationFilter } from '@edgeiq/edgeiq-api-js/dist/models';
import { StatusTheme } from '../models/common';

export const defaultItemsPerPage = 24;
export const SEARCH_LETTERS_QUANTITY = 3;
export const errorHighlight = 'Something went wrong';
export const warningHighlight = 'Warning!';
export const mainBoxShadow = '0px 8px 16px rgba(112, 144, 176, 0.12)';
export const devicesTemplateURL =
  'https://s3.amazonaws.com/edgeiq-assets/sample_gateway.csv';
export const devicesDocsURL = 'https://dev.edgeiq.io/docs/bulk-device-creation';

export const recoverPassData = {
  subject: 'Password Reset',
  greeting: `We've received a request to reset your password.\n
  Use the link below to choose a new password for your account. If you did not request to reset your password, ignore this email and the link will expire on its own.`,
};

export const errorsMessages: {
  [key: string]: string;
} = {
  'Invalid password': 'The password is incorrect. Try again.',
};

export const heartbeatStatus = ['never_reported', 'online', 'offline', 'idle'];

export const heartBeatStatusLabel: {
  [key: string]: string;
} = {
  never_reported: 'Never Reported',
  online: 'Online',
  offline: 'Offline',
  idle: 'Idle',
};

export const heartbeatColorThemeMap: {
  [key: string]: StatusTheme;
} = {
  online: 'success',
  offline: 'error',
  idle: 'warning',
  never_reported: 'info',
};

export const hearbeatFields: {
  [key: string]: string;
} = {
  connections: 'Connections',
  cell_signal: 'Cell Signal',
  cell_usage: 'Cell Usage',
  cpu_usage: 'CPU Usage',
  disk_size: 'Disk Size',
  disk_free: 'Disk Space free',
  disk_usage: 'Disk Space Usage',
  ram_usage: 'RAM Usage',
  sim_card: 'SIM Card',
  wifi_clients: 'WIFI Clients',
};

export const defaultPaginationFilter: PaginationFilter = {
  page: 1,
  itemsPerPage: 24,
};

export const optionsPaginationsFilter: PaginationFilter = {
  page: 1,
  itemsPerPage: 1000,
};

export const attachPaginationFilter: PaginationFilter = {
  page: 1,
  itemsPerPage: 1000,
};

export const transferStatus = [
  'transfer_initiated_at',
  'transfer_initiated_at_ne',
  'transfer_completed_at_ne',
];

export const transferStatusLabel: {
  [key: string]: string;
} = {
  transfer_initiated_at: 'Not yet initiated',
  transfer_initiated_at_ne: 'Transfer initiated',
  transfer_completed_at_ne: 'Transfer complete',
};

export const deviceTypeLabel: {
  [key: string]: string;
} = {
  cloud_native: 'Cloud Native',
};

export const deviceDetailsTabsLabel = {
  details: 'Details',
  ingestors: 'Ingestors',
  policies: 'Policies',
  commands: 'Commands',
  softwareUpdate: 'Software Update',
  metadata: 'Metadata',
  relations: 'Relations',
};

export const activityLabel: {
  [key: string]: string;
} = {
  error: 'Error',
  alert: 'Alert',
  update: 'Update',
};

export const activityColorThemeMap: {
  [key: string]: StatusTheme;
} = {
  error: 'error',
  alert: 'warning',
  update: 'info',
};

export const activityFilterOptions = [
  { value: 'error', label: 'Error' },
  { value: 'alert', label: 'Alert' },
  { value: 'update', label: 'Update' },
];

export const hearbeatValuesLabel: {
  [key: string]: string;
}[] = [
  {
    value: 'connections',
    label: 'Connections',
  },
  {
    value: 'disk_size',
    label: 'Disk Size',
  },
  {
    value: 'disk_free',
    label: 'Disk Space Free',
  },
  {
    value: 'cell_usage',
    label: 'Cell Usage',
  },
  {
    value: 'ram_usage',
    label: 'RAM Usage',
  },
  {
    value: 'wifi_clients',
    label: 'WIFI Clients',
  },
  {
    value: 'disk_usage',
    label: 'Disk Space Usage',
  },
  {
    value: 'custom',
    label: 'Cell Space Usage',
  },
  {
    value: 'cell_signal',
    label: 'Cell Signal',
  },
  {
    value: 'cpu_usage',
    label: 'CPU Usage',
  },
  {
    value: 'sim_card',
    label: 'SIM Cards',
  },
];

export const genericViewOptions = ['list', 'grid'];

export const profileTypesMap: {
  [key: string]: string;
} = {
  gateway: 'Gateway',
  sensor: 'Sensor',
  cloud_native: 'Cloud Native',
  modem: 'Modem',
  lwm2m: 'LWM2M',
};

export const dataManagementTabsLabels = {
  ingestors: 'Ingestors',
  translators: 'Translators',
  integrations: 'Integrations',
  pollableAttributes: 'Pollable Attributes',
  policies: 'Policies',
};

export const ingestorListenerTypesMap: {
  [key: string]: string;
} = {
  shell_polling: 'Shell Polling',
  icmp_polling: 'ICMP Polling',
  snmp_polling: 'SNMP Polling',
  tcp_server: 'TCP Server',
  tcp_client: 'TCP Client',
  udp_server: 'UDP Server',
  udp_client: 'UDP Client',
  http_server: 'HTTP Server',
  http_client: 'HTTP Client',
  dev: 'Linux Dev',
  tcp_modbus: 'TCP Modbus',
  opcua: 'OPC UA',
  bacnet: 'BACnet',
  dbus_signal: 'D-Bus Signal',
  cloud: 'Cloud HTTP Ingest',
  cloud_polling_inmarsat: 'Inmarsat Cloud Polling',
  cloud_polling_orbcomm: 'ORBCOMM Cloud Polling',
  cloud_gcp_pubsub_jci: 'GCP Pub/Sub',
  cloud_polling_assetlink: 'Assetlink Cloud Polling',
};

export const ingestorHandlerTypesMap: {
  [key: string]: string;
} = {
  fixed: 'Fixed',
  delimited: 'Delimited',
  router: 'Router',
  dbus: 'D-BUS',
  passthrough: 'Passthrough',
};

export const translatorTypesMap: {
  [key: string]: string;
} = {
  javascript: 'Javascript',
  template: 'Template',
  altair: 'SSI Smart Label Translator',
  gs: 'Globalstar Device Translator',
  inmarsat: 'Inmarsat Device Translator',
  orbcomm: 'Orbcomm Device Translator',
  assetlink: 'Assetlink Device Translator',
};

export const deleteHighlight = (
  count: number,
  single: string,
  plural: string,
): string => `${count === 1 ? single : plural} deleted correctly`;

export const integrationTypesMap: {
  [key: string]: string;
} = {
  aws_device_integrations: 'IoT - AWS',
  azure_device_integrations: 'IoT - Microsoft Azure',
  gcp_cloud_native_device_integrations:
    'Google Cloud Platform (GCP) - Cloud Native',
  gs_cloud_native_device_integrations: 'GlobalStar (GS) - Cloud Native',
  inmarsat_cloud_native_device_integrations:
    'Isat Data Pro (Inmarsat) - Cloud Native',
  orbcomm_cloud_native_device_integrations:
    'Isat Data Pro (Orbcomm) - Cloud Native',
  postmark_rule_action_integrations: 'E-Mail - Postmark',
  smtp_rule_action_integrations: 'E-Mail - SMTP',
  twilio_rule_action_integrations: 'SMS - Twilio',
};

export const pollableAttributeTypesMap: {
  [key: string]: string;
} = {
  snmp_mib: 'SNMP MIB',
  snmp_mib_integer: 'SNMP MIB Integer',
  snmp_mib_octet_string: 'SNMP MIB Octet String',
};
