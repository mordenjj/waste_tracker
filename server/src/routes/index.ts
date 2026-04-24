import { Router, type IRouter } from "express";
import healthRouter from "./health";
import wasteEventsRouter from "./wasteEvents";

const router: IRouter = Router();

router.use(healthRouter);
router.use(wasteEventsRouter);

export default router;
