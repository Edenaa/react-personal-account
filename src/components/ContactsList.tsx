import React from 'react';
import { IValues } from '../pages/Contacts';
import { IContacts } from '../redux/typesContacts';
import ContactsCard from './ContactsCard';
import { CardActions, Button } from '@material-ui/core';

interface IContactsList {
  items: IContacts[],
  validateErrors: IValues,
  editable: number | null,
  onChange(id: number, fieldName: string, value: string): void,
  onSave(item: IContacts): void,
  onEdit(id: number): void,
  onDelete(id: number): void
}

const ContactsList = ({
  items,
  validateErrors,
  editable,
  onChange,
  onSave,
  onEdit,
  onDelete
}: IContactsList) => {
  return (
    <div>
      {items.map(item => {
        return item.show && 
          <ContactsCard
            id={item.id}
            item={item}
            addNewItem={false}
            validateErrors={validateErrors}
            onChange={onChange}
            key={item.id}
            editable={editable}
          >
            <CardActions>
              {editable == item.id ?
                  <Button size="small" onClick={() => onSave(item)}>Сохранить</Button>
                :
                <>
                  <Button size="small" disabled={editable != null} onClick={() => onEdit(item.id)}>Редактировать</Button>
                  <Button size="small" disabled={editable != null} onClick={() => onDelete(item.id)}>Удалить</Button>
                </>
              }
            </CardActions>
          </ContactsCard>
      })}
    </div>
  )
}

export default ContactsList;