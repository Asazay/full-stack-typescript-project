import {Router, Request, Response, NextFunction} from 'express'
import {Employee} from "./Employee.model";

export async function getAll(req: Request, res: Response<Employee[]>, next: NextFunction){
    try{
        const allEmployees : Employee[] = []
        res.json(allEmployees)
    }
    catch(e){
        next(e)
    }
}

export async function getById(req: Request<{id: string}>, res: Response<Employee | undefined>, next: NextFunction){
    try{
        const id = req.params. id
        const allEmployees = undefined
        res.json(allEmployees)
    }
    catch(e){
        next(e)
    }
}

type ObjectWithId = {
    id: string
}

export async function addEmployee(req: Request<{}, ObjectWithId, Employee>, res: Response<ObjectWithId | undefined>, next: NextFunction){
    try{
        res.json({
            id: '123'
        })
    }
    catch(e){
        next(e)
    }
}