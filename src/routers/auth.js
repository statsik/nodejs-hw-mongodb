import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper";
import { validateBody } from "../middlewares/validateBody";
import { loginUserSchema } from "../validation/auth";
import { loginUserController, logoutUserController, registerUserController } from "../controllers/auth";
import { registerUser } from "../services/auth";

const router = Router();

router.post(
    '/register',
    validateBody(registerUser),
    ctrlWrapper(registerUserController),
)

router.post(
    '/login',
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
);

router.post(
    '/logout',
    ctrlWrapper(logoutUserController));

export default router;