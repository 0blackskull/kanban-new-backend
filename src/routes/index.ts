import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { authenticate } from "../middleware/authenticate";
import { Kanban } from "../controllers/KanbanController";

const MainRouter = Router();
const KanbanRouter = Router();

MainRouter.post("/auth/login", AuthController.login);
MainRouter.post("/auth/signup", AuthController.signup);
MainRouter.use("/api", KanbanRouter);

KanbanRouter.get("/dashboard", authenticate, Kanban.getAllDashboards);
KanbanRouter.get("/dashboard/:title", authenticate, Kanban.getDashboard);

KanbanRouter.get("/tickets", authenticate, Kanban.getAllTickets);

KanbanRouter.post("/tickets", authenticate, Kanban.createTicket);

KanbanRouter.patch("/ticket/:id", authenticate, Kanban.updateTicket);

export default MainRouter;
