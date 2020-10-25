import React, { useState, useCallback } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useConversations } from '../Contexts/ConversationsProvider'

const OpenConversation = () => {
    const [text, setText] = useState('');
    const { sendMessage, selectedConversation } = useConversations()

    const checkRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({ smooth: true })   
        }
    }, []);



    const handleSubmit = (event) => {
        event.preventDefault()
        sendMessage(selectedConversation.recipients.map(r => r.id), text)
        setText('')
    }


    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column align-items-end px-3">
                    {selectedConversation.messages.map((message, index) => {
                        const lastMsg = selectedConversation.messages.length - 1 === index
                        
                        return (
                            <div
                                ref={lastMsg ? checkRef : null}
                                key={index}
                                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                            >
                                <div
                                    className={`rounded-0 px-2 py-1 align-self-end  align-items-end ${message.fromMe ? 'bg-primary text-white' : ''}`}
                                >
                                    {message.text}
                                </div>

                                <div className={`text-muted small ${message.fromMe ? 'text-right-end' : ''}`}
                                >
                                    {message.fromMe ? 'You' : message.senderName}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}
                            onChange={e => setText(e.target.value)}
                            //onChange={handleChange}

                            style={{ height: '75px', resize: 'none' }}
                        />
                        <InputGroup.Append>
                            <Button type="submit">Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    );
}





export default OpenConversation;

