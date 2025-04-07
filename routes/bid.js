import { Router } from "express";
import BidController from "../controllers/bid.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validation.middleware.js";

const bidRouter = Router();
const bidController = new BidController();

// Register
bidRouter.post('/place-bid', validate({}), authMiddleware, async (req, res, next) => {
    await bidController.placeBid(req, res, next);
});


export default bidRouter;
