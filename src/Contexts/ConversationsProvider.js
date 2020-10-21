import React,{useContext} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import {useContacts} from './ContactsProvider'

const ConversationsContext =React.createContext();



export const useConversations =()=>{
    return useContext(ConversationsContext)
}





export const ConversationsProvider = ({children}) =>{
    const [conversations, setConversations]= useLocalStorage('conversations',[]);
    const {contacts} =useContacts();

    const createConversations=(recipients)=>{
        setConversations((prevConversations)=>{
            return [...prevConversations, {recipients,messages: []}]
        })
    };

    const formattedConversation = conversations.map((conversation)=>{
        const recipients = conversation.recipients.map((recp)=>{

            const contact = contacts.find((contact)=>{
                return contact.id === recp
            })

            const name = (contact && contact.name) || recp

            return {id:recp ,name }
        })

        return {...conversation,recipients}

    });
    
    const newValue = {
        conversations:formattedConversation,
        createConversations
    }


    return(
        //to easily pass the value in all the components we have used useContext
        <ConversationsContext.Provider value={newValue}>        
            {children}
        </ConversationsContext.Provider>
    )
}