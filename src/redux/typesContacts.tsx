export interface IHasError {
  hasErrored: boolean,
};

export interface ILoading {
  isLoading: boolean,
};

export interface IItemId {
  id: number;
}

export interface IContact {
  name: string,
  surname: string,
  phone: string,
  address: string,
  show: boolean
};

export interface IContacts extends IItemId, IContact {}

export interface IContactList extends IHasError,
  ILoading, IOpenTemplate, ITemplateItem {
  items: Array<IContacts>,
};

export interface IChangeFieldValue extends IItemId {
  fieldName: string,
  value: string,
};

export interface IOpenTemplate {
  open: boolean
}

export interface ITemplateItem {
  newItem: IContact
}

export interface ISearchSubstring {
  substring: string
}


export const CONTACTS_LOADED = "CONTACTS_LOADED";
export const ITEMS_HAS_ERRORED = "ITEMS_HAS_ERRORED";
export const ITEMS_IS_LOADING = "ITEMS_IS_LOADING";
export const ITEM_DELETE = "ITEM_DELETE";
export const ITEM_ADD = "ITEM_ADD";
export const CHANGE_ITEM_FIELD_VALUE = 'CHANGE_ITEM_FIELD_VALUE';
export const OPEN_TEMPLATE = "OPEN_TEMPLATE";
export const TEMPLATE_ITEM = "TEMPLATE_ITEM";
export const CHANGE_TEMPLATE_ITEM_FIELD_VALUE = "CHANGE_TEMPLATE_ITEM_FIELD_VALUE";
export const SEARCH_SUBSTRING = "SEARCH_SUBSTRING";

interface HasError {
  type: typeof ITEMS_HAS_ERRORED,
  payload: IHasError
};

interface Loading {
  type: typeof ITEMS_IS_LOADING,
  payload: ILoading,
}

interface ContactsLoaded {
  type: typeof CONTACTS_LOADED,
  payload: Array<IContacts>
};

interface ChangeItemFieldValue {
  type: typeof CHANGE_ITEM_FIELD_VALUE,
  payload: IChangeFieldValue,
};

interface ContactDelete {
  type: typeof ITEM_DELETE,
  payload: IItemId
}

interface ContactAdd {
  type: typeof ITEM_ADD,
  payload: IContacts
}

interface OpenTemplate {
  type: typeof OPEN_TEMPLATE,
  payload: IOpenTemplate
}

interface TemplateItem {
  type: typeof TEMPLATE_ITEM,
  payload: ITemplateItem
}

interface ChangeTemplateItemFieldValue {
  type: typeof CHANGE_TEMPLATE_ITEM_FIELD_VALUE,
  payload: IChangeFieldValue
}

interface SearchSubctringItems {
  type: typeof SEARCH_SUBSTRING,
  payload: ISearchSubstring
}

export type ContactsListTypes = HasError | Loading |
  ContactsLoaded | ChangeItemFieldValue | ContactDelete |
  ContactAdd | OpenTemplate | TemplateItem |
  ChangeTemplateItemFieldValue | SearchSubctringItems;