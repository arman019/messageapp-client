import React, { useRef,useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../Contexts/ContactsProvider'
import { useConversations } from '../Contexts/ConversationsProvider'

export default function NewConversationModal({ closeModal }) {
  const idRef = useRef()
  const nameRef = useRef()
  const { contacts } = useContacts()
  const [selectedContactIds, setSelectedContactIds] = useState([])

  const { createConversation } = useConversations()

  function handleSubmit(e) {
    e.preventDefault()
    createConversation(selectedContactIds)
    closeModal()
  };

const handleCheckboxChange = (contactId)=>{ // here i am setting my contacts in my state
  setSelectedContactIds((prevSelectedContactIds )=>{
    if(prevSelectedContactIds.includes(contactId)){
      return prevSelectedContactIds.filter((prevId)=>{
        return contactId !== prevId // this filter will onl accept values which is not inclueded in the cantact list 
      })
    }
    else{
      return [...prevSelectedContactIds,contactId]
    }
  })
}
  

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map(contact => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}