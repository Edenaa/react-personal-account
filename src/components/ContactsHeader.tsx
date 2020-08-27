import React from 'react';
import { Button, makeStyles, Paper, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  searchBlock: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  buttonHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 30
  }
});

interface IContactsHeader {
  onNewItem(): void,
  onSearch(substring: string): void,
  isLogoutUser(): void,
}

const ContactsHeader = ({
  onNewItem,
  onSearch,
  isLogoutUser
}: IContactsHeader) => {
  const classes = useStyles();

  return (
    <div className={classes.buttonHeader}>
      <Button variant="contained" color="primary" onClick={() => onNewItem()}>
        Новый контакт
      </Button>
      <Paper component="form" className={classes.searchBlock}>
        <InputBase
          placeholder="Поиск"
          inputProps={{ 'aria-label': 'Поиск' }}
          onChange={(e) => onSearch(e.target.value)}
        />
        <SearchIcon />
      </Paper>
      <Button variant="contained" color="primary" onClick={() => isLogoutUser()}>
        Выйти
      </Button>
    </div>
  )
}

export default ContactsHeader;