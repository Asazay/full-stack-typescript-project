import {Response, Request, NextFunction} from "express";
import {Employee} from "./Employee.model";
import {z, ZodError} from 'zod';

const employeeSchema = z.object({
    name: z.string(),
    position: z.enum(['Manager', 'HR', 'Engineer']),
    salary: z.number(),
    employedAt: z.date().optional(),
    id: z.string().optional()
}).strict()

type ZodEmployee = z.infer<typeof employeeSchema>

export function validateAsEmployee(req: Request, res: Response, next: NextFunction){
    try{
        const parsedResult = employeeSchema.parse(req.body)
        next()
    }
    catch(e){
        if(e instanceof ZodError){
            res.status(400);
        }
        next(e)
    }
}

class FieldError extends Error {

}