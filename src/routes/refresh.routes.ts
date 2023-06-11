import { RefreshController } from "../controllers/refreshController";
import express, { type Router } from "express";

const router: Router = express.Router();

router.post("/refresh-token", RefreshController.refreshTokens);

export default router;
