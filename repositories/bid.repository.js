import bids from "../models/bids.js"
import BidService from "../services/bid.service.js";

export default class BidRepository {
    constructor(){

    }

    async addBid(payload){
        await bids.create(payload);
    }

    async getItemBids(item_id){
        return bids.find({ item: item_id})
    }

    async checkBid(item_id){
        return await bids.find({ _id: item_id}).populate(["item"]);
    }
}