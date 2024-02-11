// src/ordersRouter.ts
import express, { Request, Response } from 'express';
const Order  = require('./orderSchema'); // Import the Mongoose schema (JavaScript file)
const router = express.Router();
import mongoose from 'mongoose';
import './db';

// Existing routes
//router.get('/',           (req, res) => { res.send('GET /orders route'); });
//router.post('/',          (req, res) => { res.send('POST /orders route'); });
//router.get('/:uid',       (req, res) => { res.send(`GET /orders/${req.params.uid} route`); });
//router.put('/:uid',       (req, res) => { res.send(`PUT /orders/${req.params.uid} route`); });
//router.patch('/:uid',     (req, res) => { res.send(`PATCH /orders/${req.params.uid} route`); });
//router.delete('/:uid',    (req, res) => { res.send(`DELETE /orders/${req.params.uid} route`); });






router.get('/', async (req, res) => {
    // Accessing query parameters
    const endDate = req.query.t;
    const startDate = req.query.f;
    const material = req.query.m;

    // Reusing the existing connection
    const db = mongoose.connection;

    // Ensure the connection is open before proceeding
    if (db.readyState !== 1) {
                             res.status(500).json({ error: 'Database connection not ready' });
                             return;
                             }
    try {
        let filter = {};
        // Check if material is specified in the query
        if (material) { filter = { material }; }

        // Check if both start and end dates are specified
        if (startDate && endDate) {
                                  filter = {
                                           ...filter,
                                           timestamp: { $gte: startDate, $lte: endDate },
                                           };
        } else {
               // Check if only start date is specified
               if (startDate) { filter = { ...filter, timestamp: { $gte: startDate } }; }
               // Check if only end date is specified
               if (endDate)   { filter = { ...filter, timestamp: { $lte: endDate   } }; }
               }

        // Use 'Order' model for MongoDB queries
        const filteredOrders = await Order.find(filter).lean();
        res.status(200).json(filteredOrders);

    } catch (error) {
                     console.error('Error during processing:', error);
                     res.status(500).json({ error: 'Internal server error' });
                    }
});



router.get('/seed', async (req, res) => {
    try {
        const sampleOrders = require('../MOCK_DATA_MATERIALS.json');
        console.log('Sample Orders:', sampleOrders);

        await Order.insertMany(sampleOrders);

        console.log('Database seeded successfully');

        res.status(200).json({ message: 'Database seeded successfully' });
    } catch (error) {
                console.error('Error during seeding:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

  router.get('/data', async (req, res) => {
    try {
         const dataFromMongoDB = await Order.find({});
         res.status(200).json(dataFromMongoDB);
        } 
    catch (error) { res.status(500).json({ error: 'Internal server error' }); }
  });
  
  export default router;