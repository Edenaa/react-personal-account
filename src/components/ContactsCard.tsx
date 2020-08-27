import React from 'react';
import {
  Card,
  CardContent,
  makeStyles,
  TextField
} from '@material-ui/core';

import { IValues } from '../pages/Contacts';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    marginBottom: 20
  },
  input: {
    width: '100%',
  },
  fullName: {
    display: 'flex'
  }
});

interface IContactsCard {
  id: number,
  item: IValues,
  addNewItem: boolean,
  validateErrors: IValues,
  children: React.ReactNode,
  editable?: number | null,
  onChange(id: number, name: string, value: string, newItem: boolean): void,
}

const ContactsCard = ({
  id,
  item,
  addNewItem,
  validateErrors,
  children,
  editable,
  onChange,
}: IContactsCard) => {
  const classes = useStyles();
  const disabledInput = editable !== undefined ? editable != id : false;
  
  return (
    <Card className={classes.card} key={id}>
      <form>
        <CardContent>
          <div className={classes.fullName}>
            <TextField
              helperText={(editable == id || addNewItem && validateErrors.name) && validateErrors.name}
              onChange={(e) => onChange(id, "name", e.target.value, addNewItem)}
              placeholder="Введите имя"
              className={classes.input}
              value={item.name}
              error={(editable == id || addNewItem) && (validateErrors.name.length > 0)}
              disabled={disabledInput}
            />
            <TextField
              helperText={(editable == id || addNewItem && validateErrors.surname) && validateErrors.surname}
              onChange={(e) => onChange(id, "surname", e.target.value, addNewItem)}
              placeholder="Введите фамилию" 
              className={classes.input}
              value={item.surname}
              error={(editable == id || addNewItem) && (validateErrors.surname.length > 0)}
              disabled={disabledInput}
            />
          </div>
          <TextField
            helperText={(editable == id || addNewItem && validateErrors.phone) && validateErrors.phone}
            onChange={(e) => onChange(id, "phone", e.target.value, addNewItem)}
            placeholder="Введите номер"
            className={classes.input}
            value={item.phone}
            error={(editable == id || addNewItem) && (validateErrors.phone.length > 0)}
            disabled={disabledInput}
          />
          <TextField
            helperText={(editable == id || addNewItem && validateErrors.address) && validateErrors.address}
            onChange={(e) => onChange(id, "address", e.target.value, addNewItem)}
            placeholder="Введите адрес"
            className={classes.input}
            value={item.address}
            error={(editable == id || addNewItem) && (validateErrors.address.length > 0)}
            disabled={disabledInput}
          />
        </CardContent>
        {children}
      </form>
    </Card>
  )
}

export default ContactsCard;