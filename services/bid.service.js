import BidRepository from "../repositories/bid.repository.js"
import ItemRepository from "../repositories/item.repository.js";

export default class BidService {

    bidRepository;
    itemRepository;
    constructor(){
        this.bidRepository = new BidRepository();
        this.itemRepository = new ItemRepository();
    }

    async placeBid(payload){
        const { item } = payload;
        console.log("bid: " + JSON.stringify(payload))
        //check if other exists
        const itemExist = await this.itemRepository.getItem(item)
        
        if(new Date(itemExist.auction_end_date) < new Date()){
            throw new Error("cant bid for on closed auctions")
        }

        // Ensure bids array is valid before proceeding
if (itemExist) {
    const bids = await this.bidRepository.getItemBids(item);
    console.log("bid: " + JSON.stringify(bids))
    // Sort bids by amount
    if(bids && bids.length > 0){
        bids.sort((a, b) => Number(a.amount) - Number(b.amount));

        // Get the highest bid amount after sorting
        const highestAmount = Number(bids[bids.length - 1].amount); // Last element in the sorted array

        // Ensure the new bid is at least 10p higher than the highest bid
        if (payload.amount >= highestAmount + 10) {
            // Proceed to add the new bid
            await this.bidRepository.addBid(payload);
        } else {
            // Throw an error if the bid is not sufficiently higher
            throw new Error("Amount must be at least 10p higher than the current bid.");
        }
    } else {
        await this.bidRepository.addBid(payload);
    }
}

        
     
       
    }
}