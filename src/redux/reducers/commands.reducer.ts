import { Command } from '@edgeiq/edgeiq-api-js';

export const CommandsTypes = {
  SET_COMMANDS: 'SET_COMMANDS',
  SET_ACTUAL_COMMAND: 'SET_ACTUAL_COMMAND',
  SET_SELECTED_COMMANDS: 'SET_SELECTED_COMMANDS',
};

export const setStateCommands = (commands: Command[]): CommandsAction => ({
  type: CommandsTypes.SET_COMMANDS,
  data: commands,
});

export const setActualCommand = (command: Command): CommandsAction => ({
  type: CommandsTypes.SET_ACTUAL_COMMAND,
  data: command,
});

export const setSelectedCommands = (commands: Command[]): CommandsAction => ({
  type: CommandsTypes.SET_SELECTED_COMMANDS,
  data: commands,
});

export type CommandsState = {
  commands: Command[];
  command: Command | null;
  selectedCommands: Command[];
};

// INITIAL STATE
const commandsInitialState: CommandsState = {
  commands: [],
  command: null,
  selectedCommands: [],
};

export type CommandsAction = {
  type: string;
  data: Command[] | Command;
};

const commandsReducer = (
  state = commandsInitialState,
  action: CommandsAction,
): CommandsState => {
  switch (action.type) {
    case CommandsTypes.SET_COMMANDS:
      return {
        ...state,
        commands: action.data as Command[],
      };

    case CommandsTypes.SET_ACTUAL_COMMAND:
      return {
        ...state,
        command: action.data as Command,
      };

    case CommandsTypes.SET_SELECTED_COMMANDS:
      return {
        ...state,
        selectedCommands: action.data as Command[],
      };

    default:
      return state;
  }
};

export default commandsReducer;
