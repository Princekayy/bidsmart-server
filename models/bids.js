import mongoose, { Schema } from 'mongoose';

const bidSchema = new mongoose.Schema({
    item: { type: Schema.ObjectId, ref: "Item", required: true },
    user: { type: Schema.ObjectId, ref: "User", required: true },
    amount: { type: String, required: true }
});

export default mongoose.model('Bid', bidSchema);
