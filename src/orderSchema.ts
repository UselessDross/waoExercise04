import { Schema } from 'mongoose';

const orderSchema = new Schema({
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

export { orderSchema }
