import { Router } from "express";
import { createContactsController, deleteContactController, editContactController, getAllContactsController, getContactsByIdController, patchContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.use(authenticate);
router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:contactId',
    isValidId,
    ctrlWrapper(getContactsByIdController)),
router.post('/',
    validateBody(createContactSchema),
    ctrlWrapper(createContactsController)),
router.put('/:contactId',
    isValidId,
    validateBody(createContactSchema),  
    ctrlWrapper(editContactController));
router.patch('/:contactId',
    isValidId, 
    validateBody(updateContactSchema),
    ctrlWrapper(patchContactController));
router.delete('/:contactId',
    isValidId,
    ctrlWrapper(deleteContactController));

export default router;
 