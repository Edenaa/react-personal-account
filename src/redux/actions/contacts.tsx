import {
  ContactsListTypes,
  IContact,
  IHasError,
  ILoading,
  IChangeFieldValue,
  CONTACTS_LOADED,
  ITEMS_HAS_ERRORED,
  ITEMS_IS_LOADING,
  CHANGE_ITEM_FIELD_VALUE,
  ITEM_DELETE,
  IItemId,
  IOpenTemplate,
  OPEN_TEMPLATE,
  TEMPLATE_ITEM,
  ITemplateItem,
  CHANGE_TEMPLATE_ITEM_FIELD_VALUE,
  IContacts,
  ITEM_ADD,
  ISearchSubstring,
  SEARCH_SUBSTRING,
} from '../typesContacts';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../store';
import { AppThunk } from './login';

export function itemsHasErrored(payload: IHasError): ContactsListTypes {
  return {
    type: ITEMS_HAS_ERRORED,
    payload
  };
};

export function itemsIsLoading(payload: ILoading): ContactsListTypes {
  return {
    type: ITEMS_IS_LOADING,
    payload
  };
};

export function contactsLoaded(payload: Array<IContacts>): ContactsListTypes {
  return {
    type: CONTACTS_LOADED,
    payload
  }
};

export function changeItemValue(payload: IChangeFieldValue): ContactsListTypes {
  return {
    type: CHANGE_ITEM_FIELD_VALUE,
    payload
  }
};

export function changeTemplateItemValue(payload: IChangeFieldValue): ContactsListTypes {
  return {
    type: CHANGE_TEMPLATE_ITEM_FIELD_VALUE,
    payload
  }
};

export function itemDelete(payload: IItemId): ContactsListTypes {
  return {
    type: ITEM_DELETE,
    payload
  }
}

export function itemAdd(payload: IContacts): ContactsListTypes {
  return {
    type: ITEM_ADD,
    payload
  }
}

export function openTemplate(payload: IOpenTemplate): ContactsListTypes {
  return {
    type: OPEN_TEMPLATE,
    payload
  }
}

export function templateItem(payload: ITemplateItem): ContactsListTypes {
  return {
    type: TEMPLATE_ITEM,
    payload
  }
}

export function searchSubstringItems(payload: ISearchSubstring): ContactsListTypes {
  return {
    type: SEARCH_SUBSTRING,
    payload
  }
}

export function itemsFetchData(url: string): AppThunk {
  return async (dispatch) => {
    dispatch(itemsIsLoading({isLoading: true}));

    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(itemsIsLoading({isLoading: false}));

        return response;
      })
      .then((response) => response.json())
      .then((items) => dispatch(contactsLoaded(items)))
      .catch((err) => {
        dispatch(itemsHasErrored({hasErrored: true}));
      });
  };
}

export function itemFetchEdited(url: string, item: IContact): AppThunk {
  return async (dispatch) => {
    return fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
    .then(async response => {
      if(response.ok) {
      } else {
        const json = await response.json();
        const error: string = json[0];
        const actionData = { detail: error };
      }
    })
  }
}

export function itemIsDelete(url: string, id: IItemId): AppThunk {
  return async (dispatch) => {
    return fetch(url, {
      method: 'DELETE',
    })
    .then(async response => {
      if(response.ok) {
        dispatch(itemDelete(id))
      } else {
        const json = await response.json();
        const error: string = json[0];
        const actionData = { detail: error };
      }
    })
    .catch(err=> console.log({...err}))
  }
}

export function itemIsAdd(url: string, item: IContact): AppThunk {
  return async (dispatch) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
    .then(async response => {
      if(response.ok) {
        return response.json()
      } else {
        const json = await response.json();
        const error: string = json[0];
        const actionData = { detail: error };
      }
    })
    .then(json => {
      dispatch(itemAdd(json))
    })
    .catch(err=> console.log({...err}))
  }
}