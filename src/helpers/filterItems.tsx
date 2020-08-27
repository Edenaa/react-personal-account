import { IContacts } from "../redux/typesContacts";

export const filterItems = (filter: string, items: IContacts[]) => {
  const ignoreSearchFields = [
    'id',
    'show'
  ]
  return items.map(item => {
    if(!filter) {
      item.show = true
    } else {
      let filterLowerCase = filter.toLowerCase().replace(/\s/g,"");
      for (const [key, value] of Object.entries(item)) {
        if(!ignoreSearchFields.includes(key)) {
          let valueLowerCase = value.toLowerCase().replace(/\s/g,"");
          if(valueLowerCase.indexOf(filterLowerCase) === -1) {
            item.show = false
          } else {
            item.show = true;
            break;
          }
        } 
      }
    }
    return item;
  })
}