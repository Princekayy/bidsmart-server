import ItemService from "../services/item.service.js";

export default class ItemController {

    itemService;
    constructor(){
        this.itemService = new ItemService();
    }

    async sellItem(req, res, next){
        try {
            await this.itemService.sellItem({...req.body, thumbnail: req.file.filename, seller: req.user.user_id});
    
            res.json({ msg: 'successfully sell item' });
        } catch (err) {
            next(err)
        }
    }

    async getItem(req, res, next){
        try {

            const { item_id } = req.params;
    
            const response = await this.itemService.getItem(item_id);
    
            res.json({ msg: 'successfully fetched an item details', data: response});
        } catch (err) {
            next(err)
        }
    }

    async getAllItems(req, res, next){
        try {
    
            const response = await this.itemService.getAllItems()
    
            res.json({ msg: 'successfully get all items', data: response });
        } catch (err) {
            next(err)
        }
    }

    async getUserItems(req, res, next){
        try {

            const { user_id } = req.user;
            console.log("user: " + user_id)
            const response = await this.itemService.getUserItems(user_id)
    
            res.json({ msg: 'successfully fetched user items', data: response });
        } catch (err) {
            next(err)
        }
    }

    async markAsSold(req, res, next){
        try {

            const { item_id } = req.params;
            await this.itemService.changeItemStatus(item_id, "SOLD");
    
            res.json({ msg: 'successfully fetched marked item as sold' });
        } catch (err) {
            next(err)
        }
    }
}