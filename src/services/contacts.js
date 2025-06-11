import { Contact } from "../db/models/contacts.js";

export const createContact = async (contact) => {
    const newContact = await Contact.create(contact);
    return newContact;
}

export const editContact = async (contactId, payload, options = {}) => {
    const editedContact = await Contact.findOneAndUpdate(
        { _id: contactId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );
    if (!editedContact) return null;
    return {
        contact: editedContact,
        isNew: Boolean(editedContact?.lastErrorObject?.upserted),
    }
}

export const getAllContacts = async () => {
  const contact = await Contact.find();
  return contact;
};

export const getContactsById = async (id) => {
  const contactId = await Contact.findById(id);
  return contactId;
};

export const deleteContact = async (contactId) => {
    const contact = await Contact.findOneAndDelete({
        _id: contactId 
    })

    return contact;
}
