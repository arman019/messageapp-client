import React,{useContext} from 'react';
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext =React.createContext();


export const useContacts =()=>{
    return useContext(ContactsContext)
}


export const ContactsProvider = ({children}) =>{
    const [contacts, setContacts]= useLocalStorage('contact',[]);

    const createContact =(id,name)=>{
        setContacts((prevContacts)=>{
            return [...prevContacts,{id,name}]
        })
    }


    return(
        //to easily pass the value in all the components we have used useContext
        <ContactsContext.Provider value={{contacts,createContact}}>        
            {children}
        </ContactsContext.Provider>
    )
}