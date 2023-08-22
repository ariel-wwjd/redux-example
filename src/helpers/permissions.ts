import { Abilities } from '@edgeiq/edgeiq-api-js';

const parsePermissions = (
  abilities: Abilities,
): {
  [key: string]: {
    create: boolean;
    update: boolean;
    read: boolean;
    delete: boolean;
  };
} => {
  const result: {
    [key: string]: {
      create: boolean;
      update: boolean;
      read: boolean;
      delete: boolean;
    };
  } = {};
  for (const model in abilities) {
    if (Object.prototype.hasOwnProperty.call(abilities, model)) {
      const modelPermissions = abilities[model as keyof Abilities];
      result[model] = {
        create: modelPermissions.create !== 'not_allowed',
        update: modelPermissions.update !== 'not_allowed',
        read: modelPermissions.read !== 'not_allowed',
        delete: modelPermissions.delete !== 'not_allowed',
      };
    }
  }
  return result;
};

// TODO: add a function to ask if a user has permission to a specific item

export { parsePermissions };
