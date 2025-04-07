import { ItemStatus } from "../constants/item.constant.js";
import item from "../models/item.js";

export default class ItemRepository {
    constructor() {

    }

    async addItem(itemData) {
        return await item.create(itemData)
    }

    async changeStatus(item_id, payload){
        await item.findByIdAndUpdate(item_id, payload);
    }

    async getItem(item_id){
        return await item.findOne({_id: item_id}).populate([{
            path: "seller",
            select: "phone email "
        }]);
    }

    async getAll(){
        return await item.find({ status: ItemStatus.AVAILABLE }).select("name thumbnail seller description buyer status created_date").populate([{path: "seller", select: "phone email"}, "buyer"]);
    }
    async getUserItems(user_id){
        return await item.find({ seller: user_id }).select("name thumbnail created_date status buyer");
    }

}