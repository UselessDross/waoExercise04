"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.patch = exports.put = exports.post = exports.get = exports.list = exports.model = void 0;
//import { Order } from "./orderSchema.js";
const mongoose_1 = __importDefault(require("mongoose"));
const connection = mongoose_1.default.createConnection('mongodb://localhost:27017/');
exports.model = connection.model('Orders');
const list = async (req, res) => {
    const { f, t, m } = req.query;
    console.log(f, t, m);
    let filter = {};
    if (m) {
        filter = { material: m };
    }
    if (f && t) {
        filter = { ...filter, timestamp: { $gt: f, $lt: t } };
    }
    else {
        if (f) {
            filter = { ...filter, timestamp: { $gt: f } };
        }
        if (t) {
            filter = { ...filter, timestamp: { $lt: t } };
        }
    }
    res.json(await exports.model.find(filter).lean());
};
exports.list = list;
const get = async (req, res) => {
    const { uid } = req.params;
    res.json(await exports.model.findById(uid).lean());
};
exports.get = get;
const post = async (req, res) => {
    const { order } = req.body;
    res.json(await exports.model.create(order));
};
exports.post = post;
const put = async (req, res) => {
    const { uid } = req.params;
    const { order } = req.body;
    console.log(req.body);
    res.json(await exports.model.findOneAndReplace({ _id: uid }, order).lean());
};
exports.put = put;
const patch = async (req, res) => {
    const { uid } = req.params;
    const { order } = req.body;
    res.send(await exports.model.findByIdAndUpdate(uid, order));
};
exports.patch = patch;
const remove = async (req, res) => {
    const { uid } = req.params;
    res.json(await exports.model.findByIdAndDelete(uid));
};
exports.remove = remove;
