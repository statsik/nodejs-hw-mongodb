import { Router } from "express";
import { createContactsController, deleteContactController, editContactController, getAllContactsController, getContactsByIdController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));
router.get('contacts/:contactId', ctrlWrapper(getContactsByIdController));
router.post('/contacts', ctrlWrapper(createContactsController))
router.put('/contacts/:contactId', ctrlWrapper(editContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController))

export default router;
