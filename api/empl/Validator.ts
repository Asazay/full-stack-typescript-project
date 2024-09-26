import {Response, Request, NextFunction} from "express";
import {Employee} from "./Employee.model";

export function validateAsEmployee(req: Request, res: Response, next: NextFunction){
    try{
        const reqBody = req.body;
        if(!(reqBody as Employee).name){
            throw new FieldError('Name required!')
        }

        if(!['Manager', 'HR', 'Engineer'].includes((reqBody as Employee).position)){
            throw new FieldError('Invalid position!')
        }

        if(!(reqBody as Employee).salary){
            throw new FieldError('Salary required!')
        }

        const parsedBody: Partial<Employee> = {
            name: reqBody.name,
            position: reqBody.positon,
            salary: reqBody.salary
        }

        req.body = parsedBody
        next()
    }
    catch(e){
        if(e instanceof FieldError){
            res.status(400)
        }
        next(e)
    }
}

class FieldError extends Error {

}