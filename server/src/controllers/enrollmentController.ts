import { Request, Response } from "express";
import prisma from '../config/prisma'



export const getEnrollment = async (req: Request, res: Response) =>{
    try{
        const Enrollment = await prisma.enrollment.findMany({
            include: {
                student: true,
                course: true,

            }
    });
    res.status(200).json(Enrollment);
    } catch (error) {
        res.status(500).json({ error: "Failed to connect to enrollment" });
    }
};

export const getSEnrollmentById = async (req: Request, res: Response) => {
    const { id } = req.params; //Destructuring


    try {
        const Enrollment = await prisma.enrollment.findUnique({
            where: { id: parseInt(id) },
            include: {
                student: true,
                course: true,
            },
        });
        if (!Enrollment) {
            res.status(404).json({ error: "Enrollment not found" });
            return;
        }
        res.status(200).json(Enrollment);
    } catch (error) {
        res.status(500).json({ error: "Failed to connect to enrollment" });
    }
};

export const createEnrollment = async (req: Request, res: Response) => {
    const { studentId, courseId ,grade } = req.body;
    try {
        const newEnrollment = await prisma.enrollment.create({
            data: { studentId, courseId,grade},
        });
        res.status(201).json({newEnrollment,
            message: "Enrollment created successfully"
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to create Enrollment" });
    }
};

export const updateEnrollment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {studentId, courseId , grade} = req.body;
    try {
        const updateEnrollment = await prisma.enrollment.update({
            where: { id: parseInt(id) },
            data: { studentId, courseId , grade},
        });
        res.status(200).json(updateEnrollment);
    } catch (error) {
        res.status(500).json({ error: "Failed to update Enrollment" });
    }
};

export const deleteEnrollment = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.enrollment.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send({message: "Enrollment deleted successfully"});
    } catch (error) {
        res.status(500).json({ error: "Failed to delete Enrollment" });
    }
};




