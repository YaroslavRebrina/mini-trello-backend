"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = __importDefault(require("./todos"));
const users_1 = __importDefault(require("./users"));
const router = (0, express_1.Router)();
router.use('/todo', todos_1.default);
router.use('/user', users_1.default);
exports.default = router;
