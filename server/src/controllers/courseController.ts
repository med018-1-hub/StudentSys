import { Request, Response } from "express";
import prisma from '../config/prisma'



export const getCourse = async (req: Request, res: Response) =>{
    try{
        const Course = await prisma.course.findMany({
            include: {
                enrollments: true,
            }
    });
    res.status(200).json(Course);
    } catch (error) {
        res.status(500).json({ error: "Failed to connect to database" });
    }
};

export const getSCourseById = async (req: Request, res: Response) => {
    const { id } = req.params; //Destructuring


    try {
        const Course = await prisma.course.findUnique({
            where: { id: parseInt(id) },
            include: {
                enrollments: true,
            },
        });
        if (!Course) {
            res.status(404).json({ error: "Course not found" });
            return;
        }
        res.status(200).json(Course);
    } catch (error) {
        res.status(500).json({ error: "Failed to connect to database" });
    }
};

export const createCourse = async (req: Request, res: Response) => {
    const { title ,credits,deptId} = req.body;
    try {
        const newCourse = await prisma.course.create({
            data: { title ,credits,deptId },
        });
        res.status(201).json({newCourse,
            message: "Course created successfully"
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to create Course" });
    }
};

export const updateCourse = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title,credits,deptId} = req.body;
    try {
        const updateCourse = await prisma.course.update({
            where: { id: parseInt(id) },
            data: { title,credits,deptId},
        });
        res.status(200).json(updateCourse);
    } catch (error) {
        res.status(500).json({ error: "Failed to update Course" });
    }
};

export const deleteCourse = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.course.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send({message: "Course deleted successfully"});
    } catch (error) {
        res.status(500).json({ error: "Failed to delete Course" });
    }
};




