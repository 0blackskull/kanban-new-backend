import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { authenticate } from "../middleware/authenticate";

const MainRouter = Router();

MainRouter.post('/auth/login', AuthController.login);
MainRouter.post('/auth/signup', AuthController.signup);
MainRouter.get('/api', authenticate, (req, res) => {
  res.json('Redirected');
})

export default MainRouter;