import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CardActions,
  Button,
  Container,
  CircularProgress,
  makeStyles,
  Typography
} from '@material-ui/core';

import { RootState } from '../redux/store';
import {
  itemsFetchData,
  changeItemValue,
  itemFetchEdited,
  itemIsDelete,
  itemIsAdd,
  openTemplate,
  templateItem,
  changeTemplateItemValue,
  searchSubstringItems
} from '../redux/actions/contacts';
import { IContact, IContacts } from '../redux/typesContacts';

import { useAuth } from '../authContext';
import { validateValues } from '../helpers/formValidate';
import ContactsCard from '../components/ContactsCard';
import ContactsHeader from '../components/ContactsHeader';
import ContactsList from '../components/ContactsList';


export interface IValues {
  name: string,
  surname: string,
  phone: string,
  address: string
};

const useStyles = makeStyles({
  searchLoading: {
    display: 'flex',
    justifyContent: 'center',
    height: '80vh',
    alignItems: 'center'
  },
});

const Contacts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const items = useSelector(({contactList}: RootState) => contactList.items);
  const open = useSelector(({contactList}: RootState) => contactList.open);
  const newItem = useSelector(({contactList}: RootState) => contactList.newItem);
  const [editable, setEditable] = useState<number | null>(null);
  const [validateErrors, setValidateErrors] = useState({name: "", surname: "", phone: "", address: ""});
  const [seactLoading, setSearchLoading] = useState(false);
  const [showItems, setShowItems] = useState(1);
  const { isLogoutUser } = useAuth();

  const onEdit = (id: number) => {
    setEditable(id);
  };

  const onSave = (item: IContacts) => {
    let errors = validateValues(item);
    setValidateErrors({...errors} as IValues);
    if (Object.values(errors).every(isAllZeroLength)) {
      setEditable(null);
      dispatch(itemFetchEdited(`/api/contacts/${item.id}/`, item))
    }
  }

  const onChange = (id: number, fieldName: string, value: string, newItem?: boolean) => {
    if(newItem) {
      dispatch(changeTemplateItemValue({id, fieldName, value}))
    } else {
      dispatch(changeItemValue({id, fieldName, value}))
    }
  }

  const onDelete = (id: number) => {
    dispatch(itemIsDelete(`/api/contacts/${id}/`, {id}))
  }

  const onNewItem = () => {
    dispatch(openTemplate({open: !open}));
    dispatch(templateItem(
      {
        newItem: {
          name: "",
          surname: "",
          phone: "",
          address: "",
          show: true
        }
      }
    ))
  };

  const onCancel = () => {
    dispatch(openTemplate({open: !open}));
    setValidateErrors({
      name: "",
      surname: "",
      phone: "",
      address: "",
    });
  };

  const isAllZeroLength = (element:string, index: number, array: string[]) => {
    return element.length === 0;
  };

  const onAddItem = (item: IContact) => {
    let errors = validateValues(item);
    setValidateErrors({...errors} as IValues);
    if (Object.values(errors).every(isAllZeroLength)) {
      dispatch(itemIsAdd('/api/contacts', item));
      dispatch(openTemplate({open: !open}));
    }
  };

  const onSearch = (substring: string) => {
    setSearchLoading(true);
    setShowItems(1);
    setTimeout(() => {
      dispatch(searchSubstringItems({substring}));
      setSearchLoading(false);
      let showItems = items.filter(item => item.show === true);
      setShowItems(showItems.length)
    }, 500);
  };

  useEffect(() => {
    dispatch(itemsFetchData('/api/contacts'));
  }, []);

  return (
    <Container>
      <ContactsHeader
        onNewItem={onNewItem}
        onSearch={onSearch}
        isLogoutUser={isLogoutUser}
      />
      {open &&
        <ContactsCard
          id={-1}
          item={newItem}
          addNewItem={true}
          validateErrors={validateErrors}
          onChange={onChange}
        >
          <CardActions>
            <Button size="small" onClick={() => onAddItem(newItem)}>Добавить</Button>
            <Button size="small" onClick={() => onCancel()}>Отменить</Button>
          </CardActions>
        </ContactsCard>
      }
      {seactLoading 
        ? 
          <div className={classes.searchLoading}>
            <CircularProgress  size={60} />
          </div>
        :
          <ContactsList
            items={items}
            validateErrors={validateErrors}
            editable={editable}
            onChange={onChange}
            onSave={onSave}
            onEdit={onEdit}
            onDelete={onDelete}
          />
      }
      {!showItems &&
        <div className={classes.searchLoading}>
          <Typography variant="h2" component="h2" align="center">Ничего не найдено</Typography>
        </div>
      }
    </Container>
  )
}

export default Contacts;