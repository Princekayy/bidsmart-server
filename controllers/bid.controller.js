import BidService from "../services/bid.service.js"

export default class BidController {
    bidService
    constructor(){
        this.bidService = new BidService();
    }

    async placeBid(req, res, next){
        try {
            const { user_id } = req.user;
            const { item, amount } = req.body;
    
            await this.bidService.placeBid({
                item,
                user: user_id,
                amount: amount.toString()
            });
    
            res.json({ msg: 'User registered successfully' });
        } catch (err) {
            next(err)
        }
    }
}