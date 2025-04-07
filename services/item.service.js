import BidRepository from "../repositories/bid.repository.js";
import ItemRepository from "../repositories/item.repository.js";

export default class ItemService {

    itemRepository;
    bidRepository;
    constructor(){
        this.itemRepository = new ItemRepository();
        this.bidRepository = new BidRepository();
    }

    async sellItem(payload){
        console.log(payload)
        let auction_end_date = new Date(new Date().getTime() + 60 * 60 * 1000);
        let auction_start_date = new Date()
        return await this.itemRepository.addItem({...payload, created_date: new Date(), auction_end_date, auction_start_date});
    }

    async changeItemStatus(item_id, status){
        const bids = await this.bidRepository.getItemBids(item_id);
        console.log("bid: " + JSON.stringify(bids))
        // Sort bids by amount
        if(bids && bids.length > 0){
            bids.sort((a, b) => Number(a.amount) - Number(b.amount));

            // Get the highest bid (last element in the sorted array)
            const highestBid = bids[bids.length - 1];
            const highestBidderId = highestBid.user;
            console.log("bidder: " + highestBidderId)
            await this.itemRepository.changeStatus(item_id, {status, buyer: highestBidderId});
        }
    }

    async getAllItems() {
        return await this.itemRepository.getAll();
    }

    async getItem(item_id){
        const response = await this.itemRepository.getItem(item_id);

        if(!response){
            throw new Error("failed to find item using provided id")
        }

        return response;
    }

    async getUserItems(user_id) {
        return await this.itemRepository.getUserItems(user_id);
    }

}