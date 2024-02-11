"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const ordersRouter_1 = __importDefault(require("./ordersRouter"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
// using the ordersRouter file
app.use('/', ordersRouter_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
