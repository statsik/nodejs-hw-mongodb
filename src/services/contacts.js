import { Contact } from "../db/models/contacts.js";

export const getAllContacts = async () => {
  const contact = await Contact.find();
  return contact;
};

export const getContactsById = async (id) => {
  const contactId = await Contact.findById(id);
  return contactId;
};