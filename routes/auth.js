/*!
 * 2020-5-28
 * Copyright©aihanjiao
 */

"use strict";

import express from "express";
import authController from "../controllers/auth";

const router = express.Router();

/**
 * Login successfully set session username
 * @route POST /auth/login
 * @group auth - user auth group
 * @param {string} account.formData.required - username
 * @param {string} password.formData.required - user's password.
 */
router.post("/login", authController.postLogin);

/**
 * Register successfully set session username
 * @route POST /auth/register
 * @group auth - user auth group
 * @param {string} account.formData.required - username
 * @param {string} password.formData.required - user's password.
 */
router.post("/register", authController.register);

/**
 * Logout successfully clean session username
 * @route get /auth/logout
 * @group auth - user auth group
 */
router.get("/logout", authController.logout);

module.exports = router;
