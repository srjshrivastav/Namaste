import React, { useState, useEffect } from "react";
import Header from "./Header";

export default function Contacts({ contacts, onAddContact, onSelectContact, selectedContactId }) {
  const [search, setSearch] = useState("");
  const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const [dialogOpen, setDialogOpen] = useState(false); 
  const [newContactName, setNewContactName] = useState("");

  function handleOpenDialog() {
    setDialogOpen(true);
    setNewContactName("");
  }

   function handleCloseDialog() {
    setDialogOpen(false);
  }

   function handleSearchNewContact(e) {
    e.preventDefault();
    if (newContactName.trim() === "") return;

    // Pass entered new contact name to parent via onAddContact prop or your logic here
    onAddContact(newContactName.trim());
    setDialogOpen(false); // Close dialog after submission
  }


  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") {
        setDialogOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
    <aside className="w-[300px] bg-gray-800 flex flex-col border-r border-gray-700 relative">
        <Header />
      <div className="p-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-700 text-white rounded px-3 py-1 focus:outline-none placeholder-gray-400"
          placeholder="Search contacts"
        />
      </div>

      <ul className="flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <li className="p-4 text-center text-gray-400">No contacts found.</li>
        )}

        {filtered.map(contact => (
          <li
            key={contact.id}
            onClick={() => onSelectContact(contact.id)}
            className={`px-4 py-3 cursor-pointer flex items-center transition ${
              selectedContactId === contact.id
                ? "bg-indigo-700 text-white"
                : "hover:bg-gray-700 text-gray-200"
            }`}
          >
            {contact.name}
            {contact.online && <span className="ml-auto text-green-500 text-xs">●</span>}
          </li>
        ))}
      </ul>

      {/* Floating Add Contact Button */}
      <button
        onClick={handleOpenDialog}
        aria-label="Add Contact"
        className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition"
        title="Add Contact"
      >
        +
      </button>
    </aside>

     {dialogOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleCloseDialog} // close when clicking outside the dialog box
        >
          <div
            className="bg-gray-800 rounded-md p-6 w-100"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside the box
          >
            <h3 className="text-white text-lg mb-4">Search your friend</h3>
            <form onSubmit={handleSearchNewContact} className="flex space-x-2">
              <input
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                placeholder="Email"
                type="email"
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 text-gray-900 dark:text-white"
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded px-4"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
        </>
  );
}
