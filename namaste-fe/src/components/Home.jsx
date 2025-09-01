import React, { useState } from "react";
import Contacts from "./Contacts";
import Chat from "./Chat";

export default function Home() {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Alice", lastMessage: "Hey!", online: true },
    { id: 2, name: "Bob", lastMessage: "Good morning", online: true },
    // ...add more as needed
  ]);
  const [selectedContactId, setSelectedContactId] = useState(contacts[0]?.id);
  const selectedContact = contacts.find(c => c.id === selectedContactId);

  // Add contact and select
  function handleAddContact() {
    const name = prompt("Contact name:");
    if (name) {
      const newContact = {
        id: Date.now(),
        name,
        lastMessage: "",
        online: false,
      };
      setContacts(prev => [newContact, ...prev]);
      setSelectedContactId(newContact.id);
    }
  }

  return (
    <div className="h-screen flex flex-row w-screen bg-gray-900">
  {/* Sidebar */}
    <Contacts contacts={contacts}/>
  {/* Chat area */}
    <main className="flex flex-grow bg-gray-900">
        <Chat/>
  </main>
</div>
  );
}
