import { Router } from "express";
import {
    getEnrollment,
    getSEnrollmentById,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment,
} from "../controllers/enrollmentController";

const router = Router();

router.get("/", getEnrollment);
router.get("/:id", getSEnrollmentById);
router.post("/", createEnrollment);
router.put("/:id", updateEnrollment);
router.delete("/:id", deleteEnrollment);

export default router;
