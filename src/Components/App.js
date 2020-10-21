import React from 'react'
import Login from './Login'
import useLocalStorage from '../hooks/useLocalStorage';
import { Dashboard } from './Dashboard'
import {ContactsProvider} from '../Contexts/ContactsProvider'
import {ConversationsProvider} from '../Contexts/ConversationsProvider'



function App() {
  const [id, setId] = useLocalStorage('id');

  const dashBoard=  
    (  
    <ContactsProvider>
      <ConversationsProvider>
      <Dashboard id={id} />
      </ConversationsProvider>
      
      </ContactsProvider>
    )
    
    
  
  

  return (
    <>
   { id ? dashBoard : <Login onIdSubmit={setId} />}
    </>
  )
}

export default App;