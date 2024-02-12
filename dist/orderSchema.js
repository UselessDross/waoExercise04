"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    material: String,
    amount: Number,
    currency: String,
    price: Number,
    timestamp: String,
    delivery: {
        first_name: String,
        last_name: String,
        address: {
            street_name: String,
            street_number: String,
            city: String,
        },
    },
});
exports.orderSchema = orderSchema;
