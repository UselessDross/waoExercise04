"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const ordersRouter_1 = __importDefault(require("./ordersRouter"));
const express_1 = __importDefault(require("express"));
//import './db'; // Import the db.js file
const app = (0, express_1.default)();
const port = process.env.PORT ? Number(process.env.PORT) : 8080; // Use 8080 as default port if PORT is not set
const HOST = '0.0.0.0';
// using the ordersRouter file
app.use('/', ordersRouter_1.default);
app.listen(port, HOST, () => {
    console.log(`Server is running at http://${HOST}:${port}`);
});
