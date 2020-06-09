/*!
 * 2020-5-28
 * Copyright©aihanjiao
 */

"use strict";

import express from "express";
import authController from "../controllers/auth";

const router = express.Router();

/**
 * 登录接口-需要字段加密传输模式
 * @route POST /auth/login
 * @group auth - user auth group
 * @param {string} account.formData.required - user's account by crypto-js encrypt.
 * @param {string} password.formData.required - user's password by crypto-js encrypt.
 */
router.post("/login", authController.login);

/**
 * 登录接口-字段明文模式
 * @route POST /auth/pass/login
 * @group auth - user auth group
 * @param {string} account.formData.required - user's account.
 * @param {string} password.formData.required - user's password.
 */
router.post("/pass/login", authController.loginWithoutCrypt);

/**
 * 注册接口-需要字段加密传输模式
 * @route POST /auth/register
 * @group auth - user auth group
 * @param {string} account.formData.required - user's account by crypto-js encrypt.
 * @param {string} password.formData.required - user's password by crypto-js encrypt.
 * @param {string} name.formData.required - user's name.
 * @param {string} phone.formData.required - user's phone.
 * @param {string} department.formData.required - user's department.
 */
router.post("/crypt/register", authController.register);

/**
 * 注册接口-字段明文模式
 * @route POST /auth/pass/register
 * @group auth - user auth group
 * @param {string} account.formData.required - user's account.
 * @param {string} password.formData.required - user's password.
 * @param {string} name.formData.required - user's name.
 * @param {string} phone.formData.required - user's phone.
 * @param {string} department.formData.required - user's department.
 */
router.post("/pass/register", authController.registerWithoutCrypt);

/**
 * Logout successfully clean session username
 * @route get /auth/logout
 * @group auth - user auth group
 */
router.get("/logout", authController.logout);

module.exports = router;
