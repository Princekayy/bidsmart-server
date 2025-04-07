import { Router } from "express";
import { validate } from "../middleware/validation.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import ItemController from "../controllers/item.controller.js";
import upload from "../middleware/file.middleware.js";

const itemRouter = Router();
const itemController = new ItemController();

// Register
itemRouter.post('/sell', validate({ }), authMiddleware, upload.single("thumbnail"), async (req, res, next) => {
    await itemController.sellItem(req, res, next)
});

itemRouter.get('/my-items', validate({ }), authMiddleware, async (req, res, next) => {
    await itemController.getUserItems(req, res, next)
});

itemRouter.get('/:item_id', validate({ }), authMiddleware, async (req, res, next) => {
    await itemController.getItem(req, res, next)
});

itemRouter.get('/', validate({ }), async (req, res, next) => {
    await itemController.getAllItems(req, res, next)
});

itemRouter.patch('/:item_id', validate({ }),  authMiddleware, async (req, res, next) => {
    await itemController.markAsSold(req, res, next)
});



export default itemRouter;
