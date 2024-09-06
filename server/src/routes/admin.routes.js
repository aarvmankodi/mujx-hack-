import { Router } from "express";
const router = Router();

import {
  loginAdmin,
  logoutAdmin,
  registerAdmin,
  refreshAccessToken,
  allUsersList,
  getPurchaseData,
  returnData,
} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/adminauth.middleware.js";

router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);

router.route("/logout").post(verifyJWT, logoutAdmin);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/alluserlist").get(verifyJWT, allUsersList);
router.route("/alluserlist/get-purchase-data/:userId").get(verifyJWT, getPurchaseData);
router.route("/alluserlist/return-data/:userId").get(verifyJWT, returnData);

export default router;
