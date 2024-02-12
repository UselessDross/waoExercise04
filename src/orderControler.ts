import { Request, Response } from "express";
//import { Order } from "./orderSchema.js";
import mongoose from "mongoose";

const connection = mongoose.createConnection('mongodb://localhost:27017/')
export const model = connection.model('Orders',)

const list = async (req: Request, res: Response) => {
  const { f, t, m } = req.query;
  console.log(f, t, m);
  let filter = {}
  
  if(m) {
    filter = { material: m }
  }
  
  if(f && t) {   filter = { ...filter, timestamp: { $gt: f, $lt: t }} } 
  else {  
         if(f) { filter = { ...filter, timestamp: { $gt: f }} }
         if(t) { filter = { ...filter, timestamp: { $lt: t }} }
       }
  res.json(await model.find(filter).lean())
};

const get = async (req: Request, res: Response) => {
  const { uid } = req.params; 
  res.json(await model.findById(uid).lean())
};

const post = async (req: Request, res: Response) => {
  const { order } = req.body;
  res.json(await model.create(order));
};

const put = async (req: Request, res: Response) => {
  const { uid } = req.params;
  const { order } = req.body; 
  console.log(req.body)
  res.json(await model.findOneAndReplace({_id: uid}, order).lean());
};

const patch = async (req: Request, res: Response) => {
  const { uid } = req.params;
  const { order } = req.body;
  res.send(await model.findByIdAndUpdate(uid, order));
};

const remove = async (req: Request, res: Response) => {
  const { uid } = req.params;
  res.json(await model.findByIdAndDelete(uid));
};

export {
  list,
  get,
  post,
  put,
  patch,
  remove,
}