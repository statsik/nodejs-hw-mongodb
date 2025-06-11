import createHttpError from 'http-errors';
import { createContact, getAllContacts, getContactsById, editContact, deleteContact } from "../services/contacts.js";

export const getAllContactsController = async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts
    })
}

export const getContactsByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactsById(contactId);
    
    if (!contact) {
        res.status(404).json({
            message: 'Contact not found'
        });
        throw createHttpError (404, 'Students not found');
    }
    
    res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contact
    })
}

export const createContactsController = async (req, res) => {
    const contact = await createContact(req.body);
    res.status(201).json({
        status: 201,
		message: "Successfully created a contact!",
        data: contact
      });
}

export const editContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await editContact(contactId, req.body, {
        upsert: true,
    });

    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.status(200).json({
        status: 200,
        message: `Successfully edited a student!`,
        data: contact.contact,
    });
}

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId);

    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }
    res.status(204).send();
}