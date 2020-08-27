import {
  IContactList,
  ContactsListTypes,
  ITEMS_HAS_ERRORED,
  ITEMS_IS_LOADING,
  CONTACTS_LOADED,
  CHANGE_ITEM_FIELD_VALUE,
  ITEM_DELETE,
  OPEN_TEMPLATE,
  TEMPLATE_ITEM,
  CHANGE_TEMPLATE_ITEM_FIELD_VALUE,
  ITEM_ADD,
  SEARCH_SUBSTRING,
} from '../typesContacts';
import { filterItems } from '../../helpers/filterItems';

const initialState: IContactList = {
  items: [],
  isLoading: false,
  hasErrored: false,
  open: false,
  newItem: {
    name: "",
    surname: "",
    phone: "",
    address: "",
    show: true
  }
}

export function contactListReducer(
  state = initialState,
  action: ContactsListTypes
): IContactList {
  switch (action.type) {
    case ITEMS_HAS_ERRORED:
      return {
        ...state,
        hasErrored: action.payload.hasErrored
      };
    case ITEMS_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading
      };
    case CONTACTS_LOADED:
      return {
        ...state,
        items: action.payload
      };
    case CHANGE_ITEM_FIELD_VALUE:
      return {
        ...state,
        items: state.items.map(item => item.id === action.payload.id ? {
          ...item,
          [action.payload.fieldName]: action.payload.value
        } : item
      )};
    case CHANGE_TEMPLATE_ITEM_FIELD_VALUE:
      return {
        ...state,
        newItem: {
          ...state.newItem,
          [action.payload.fieldName]: action.payload.value
        }
      };
    case ITEM_DELETE:
      return {
        ...state,
        items: state.items.filter(item => item.id != action.payload.id)
      };
    case ITEM_ADD:
      return {
        ...state,
        items: state.items.concat({...action.payload})
      };
    case OPEN_TEMPLATE:
      return {
        ...state,
        open: action.payload.open
      };
    case TEMPLATE_ITEM:
      return {
        ...state,
        newItem: action.payload.newItem
      };
    case SEARCH_SUBSTRING:
      return {
        ...state,
        items: filterItems(action.payload.substring, state.items)
      };
    default:
      return state;
  }
};