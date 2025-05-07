"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const protect_1 = require("../../middlwares/protect");
const express_1 = require("express");
const router = (0, express_1.Router)();
const Todo = mongoose_1.default.model('todos');
router.post('/', protect_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { label, email } = req.body;
        if (!label || !email) {
            res.status(400).json({ message: 'Label and email are required' });
        }
        const newTodo = new Todo({ label, email });
        yield newTodo.save();
        res.status(201).json(newTodo);
    }
    catch (error) {
        console.error('Error creating todo:', error);
        res.status(422).json({ message: 'Error creating todo' });
    }
}));
router.get('/', protect_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        if (!email) {
            res.status(400).json({ message: 'Email is required' });
        }
        const todos = yield Todo.find({ email }).sort({ createdAt: 'desc' });
        res.json(todos);
    }
    catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({
            message: 'Error fetching todos',
        });
    }
}));
router.put('/:id', protect_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { label, email } = req.body;
        if (!label || !email) {
            res.status(400).json({ message: 'Label and email are required' });
        }
        const updatedTodo = yield Todo.findOneAndUpdate({ _id: id, email }, { label }, { new: true });
        if (!updatedTodo) {
            res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTodo);
    }
    catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({
            message: 'Error updating todo',
        });
    }
}));
router.delete('/:id', protect_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ message: 'Email is required' });
        }
        const deletedTodo = yield Todo.findOneAndDelete({ _id: id, email });
        if (!deletedTodo) {
            res.status(404).json({ message: 'Task not found' });
        }
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({
            message: error,
        });
    }
}));
exports.default = router;
