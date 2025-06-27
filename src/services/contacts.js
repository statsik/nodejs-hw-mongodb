import { SORT_ORDER } from "../constance/index.js";
import { Contact } from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

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
            ...options,
        },
    );
    if (!editedContact) return null;
    return editedContact;
}

export const getAllContacts = async ({ page, perPage, sortOrder = SORT_ORDER.ASC, sortBy = '_id', }) => {
    const limit = perPage;
    const skip = perPage * (page - 1);

    const contactsQuery = Contact.find(); 

    const contactsCount = await Contact.find().merge(contactsQuery).countDocuments();
    const contacts = await contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec();
    const paginationData = calculatePaginationData(contactsCount, perPage, page);     

    return {
        data: contacts,
        ...paginationData
    }
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
