import { Company, EIQLoginUser, User, UserType } from '@edgeiq/edgeiq-api-js';
import { parsePermissions } from '../../helpers/permissions';
import {
  removeToken,
  setInitialFilters,
  setToken,
} from '../../helpers/storage';

export const UserTypes = {
  SET_USER_DATA: 'SET_USER_DATA',
  SET_USER_COMPANY: 'SET_USER_COMPANY',
  SET_USER_COMPANIES: 'SET_USER_COMPANIES',
  SET_USER_TYPE: 'SET_USER_TYPE',
  LOGOUT_USER: 'LOGOUT_USER',
};

export const setUserData = (user: EIQLoginUser | User): UserAction => {
  if ((user as EIQLoginUser).session_token) {
    setToken((user as EIQLoginUser).session_token);
  }
  return {
    type: UserTypes.SET_USER_DATA,
    data: user,
  };
};

export const setUserCompany = (company: Company): UserAction => ({
  type: UserTypes.SET_USER_COMPANY,
  data: company,
});

export const setUserCompanies = (companies: Company[]): UserAction => ({
  type: UserTypes.SET_USER_COMPANIES,
  data: companies,
});

export const setUserType = (userType: UserType): UserAction => ({
  type: UserTypes.SET_USER_TYPE,
  data: userType,
});

export const logoutUser = (): UserAction => {
  removeToken();
  setInitialFilters(true);
  return {
    type: UserTypes.LOGOUT_USER,
    data: null,
  };
};

export type UserState = {
  isLoggedIn: boolean;
  user: EIQLoginUser | User | null;
  userCompany: Company | null;
  userCompanies: Company[];
  userType: UserType | null;
  permissions: {
    [key: string]: {
      create: boolean;
      update: boolean;
      read: boolean;
      delete: boolean;
    };
  };
};

// INITIAL STATE
const userInitialState: UserState = {
  isLoggedIn: false,
  user: null,
  userCompany: null,
  userCompanies: [],
  userType: null,
  permissions: {},
};

export type UserAction = {
  type: string;
  data: EIQLoginUser | User | Company | Company[] | UserType | null;
};

const userReducer = (
  state = userInitialState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case UserTypes.SET_USER_DATA:
      return {
        ...state,
        isLoggedIn: true,
        user: action.data as EIQLoginUser | User,
      };

    case UserTypes.SET_USER_COMPANY:
      return {
        ...state,
        userCompany: action.data as Company,
      };

    case UserTypes.SET_USER_COMPANY:
      return {
        ...state,
        userCompany: action.data as Company,
      };

    case UserTypes.SET_USER_COMPANIES:
      return {
        ...state,
        userCompanies: action.data as Company[],
      };

    case UserTypes.SET_USER_TYPE:
      const userType = action.data as UserType;
      return {
        ...state,
        userType,
        permissions: parsePermissions(userType.abilities),
      };

    case UserTypes.LOGOUT_USER:
      return {
        ...state,
        ...userInitialState,
      };

    default:
      return state;
  }
};

export default userReducer;
