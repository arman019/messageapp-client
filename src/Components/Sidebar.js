import React, { useState } from 'react';
import { Nav, Tab,Button ,Modal} from 'react-bootstrap';
import Contact from './Contact';
import Conversation from './Conversation';
import NewConversationModal from './NewConversationModal'
import NewContactModal from './NewContactModal'


const CONVERSATION_KEY = 'conversations';
const CONTACTS_KEY = 'contacts';

const Sidebar = ({ id }) => {
    const [activekey, setActivekey] = useState(CONVERSATION_KEY);
    const [modalOpen,setModalOpen]=useState(false)

    const conversationOpen =activekey === CONVERSATION_KEY;

    const closeModal=()=>{
        setModalOpen(false)
    }

    return (
        <div style={{ width: '250px' }} className="d-flex flex-column ">
            <Tab.Container activeKey={activekey} onSelect={setActivekey}  >
                <Nav variant="tabs" className=" justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATION_KEY}>
                            Conversation
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY}>
                            Contact
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={CONVERSATION_KEY}>
                        <Conversation />
                    </Tab.Pane>

                    <Tab.Pane eventKey={CONTACTS_KEY}>
                        <Contact />
                    </Tab.Pane>
                </Tab.Content>
                    <div className="p-2 border-top border-right small">
                        Your Id:<span className="text-muted">{id}</span>
                    </div>

                    <Button onClick={()=>setModalOpen(true)} className="rounded-0">
                        New {conversationOpen ? 'Conversation' :'Contact'}
                    </Button>
            </Tab.Container>

            <Modal show={modalOpen} onHide={closeModal} >
                {conversationOpen ? 
                <NewConversationModal closeModal={closeModal} />:
                <NewContactModal closeModal={closeModal}/> }
            </Modal>

        </div>

    )

}


export default Sidebar;