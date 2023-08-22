import {
  Device,
  DeviceType,
  EscrowDevice,
  Ingestor,
  Integration,
  PollableAttribute,
  Rule,
  Translator,
} from '@edgeiq/edgeiq-api-js';
import SharedTable from './SharedTable';

export type TableItemType =
  | Device
  | DeviceType
  | EscrowDevice
  | Ingestor
  | Integration
  | PollableAttribute
  | Rule
  | Translator;

// An object with the IDs of the items as keys and the values being the arrays of the related items
export type TableSubItemsType = {
  [key: string]: TableItemType[];
};

export type TableAction = {
  label: string;
  actionId: string;
  actionType: string;
  // In the link always set <actionId> for the dynamic part of the link.
  // If the action needs no link, set an empty string
  link: string;
  pageAction?: (actionId: string) => void;
};

/**
 * @param id: Value to access the data to show
 * @param label: Label of the column. Text in the header cell
 * @param type: Type of the column data.
 * @param sortId: The id to send to the BE for sorting. In some cases it can be diffrent from 'id'
 * @param link: Only usable when type is 'link'. the key of the dynamic data in 'baseLink'
 * @param actions: Array of actions added to the column of type 'actions'
 * @param parser: Receives the item (row) and returns a value parsed from it.
 * @param isBold: Receives the item (row) and returns a value if the text should be bold.
 * @param linkDot: Receives the item (row) and returns a value if there should be a dot next to the text.
 * @param stickyColumn: Weither the column should be sticky or not.
 */
export type TableColumn = {
  id: string;
  label: string;
  type: 'text' | 'link' | 'custom';
  sortId?: string;
  actions?: TableAction[];
  // Only works for 'link', 'custom', 'date' or 'text' types
  stickyColumn?: boolean;
  cellValue?: (item: TableItemType) => string;
  link?: (item: TableItemType) => string;
  parser?: (item: TableItemType) => string | number | React.ReactElement;
  isBold?: (item: TableItemType) => boolean;
  linkDot?: (item: TableItemType) => boolean;
};

export default SharedTable;
