import express from "express";

import login from "./routes/auth/login";
import logout from "./routes/auth/logout";
import register from "./routes/auth/register";
import deleteAccount from "./routes/user/delete";
import me from "./routes/user/me";

export const router = express.Router();

router.get("/login", (req, res) => login(req, res));
router.get("/logout", (req, res) => logout(req, res));
router.get("/register", (req, res) => register(req, res));
router.get("/delete", (req, res) => deleteAccount(req, res));
router.get("/me", (req, res) => me(req, res));