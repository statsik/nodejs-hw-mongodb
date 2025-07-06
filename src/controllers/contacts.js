import createHttpError from 'http-errors';
import { createContact, getAllContacts, getContactsById, editContact, deleteContact } from "../services/contacts.js";
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getAllContactsController = async (req, res) => {
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const { page, perPage } = parsePaginationParams(req.query);
    const { _id: userId } = req.user;
    const contacts = await getAllContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        userId, 
    })
    // const result = {
    //     ...contacts,
    //     data: contacts
    // };

    res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts, 
    })
}

export const getContactsByIdController = async (req, res) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;
    const contact = await getContactsById(contactId, userId);
    
    if (!contact) {
        throw createHttpError (404, 'Contact not found');
    }
    
    res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contact
    })
}

export const createContactsController = async (req, res) => {
    const { _id: userId } = req.user;
    const contact = await createContact({ ...req.body, userId});
    res.status(201).json({
        status: 201,
		message: "Successfully created a contact!",
        data: contact
    });
}

export const editContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;
    const contact = await editContact(contactId, req.body,userId, {
        upsert: true,
    });

    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.status(200).json({
        status: 200,
        message: "Successfully edited a contact!",
        data: contact,
    });
}

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;
    const photo = req.file;
    let photoUrl;

    if (photo) {
        if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToUploadDir(photo);
        }
    }
    const result = await editContact(contactId, {
        ...req.body,
        photo: photoUrl,
    });
    
      if (!result) {
        next(createHttpError(404, 'Student not found'));
        return;
      }
    
      res.json({
        status: 200,
        message: `Successfully patched a student!`,
        data: result.student,
      });

    const contact = await editContact(contactId, req.body, userId);
    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.json({
        status: 200,
        message: `Successfully patched a contact!`,
        data: contact
    })
}

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;
    const contact = await deleteContact(contactId, userId);

    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }
    res.status(204).send();
}

