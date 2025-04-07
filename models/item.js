import mongoose, { Schema } from 'mongoose';
import { ItemStatus } from '../constants/item.constant.js';

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    thumbnail: { type: String, required: true },
    seller: { type: Schema.ObjectId, ref: "User", required: true },
    description: { type: String},
    buyer: { type: Schema.ObjectId, ref: "User" },
    status: { type: String, enum: [ ItemStatus.SOLD,  ItemStatus.AVAILABLE ], default: ItemStatus.AVAILABLE},
    created_date: { type: Date, required: true},
    updated_date: { type: Date},
    auction_start_date: { type: Date },
    auction_end_date: { type: Date }
},{
    timestamps: true
});

export default mongoose.model('Item', ItemSchema);
