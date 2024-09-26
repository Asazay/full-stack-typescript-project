import {Router, Request, Response, NextFunction} from 'express'
import {Employee} from "./Employee.model";
import {EmployeeDataAccess} from "./EmployeeDataAccess";
import {injectDependency} from "../../src/shared/Container";

const dataAccess = new EmployeeDataAccess()
injectDependency('EmployeeDataAccess',dataAccess)

export async function getAll(req: Request, res: Response<Employee[]>, next: NextFunction){
    try{
        const allEmployees = await dataAccess.getAllEmployees()
        res.json(allEmployees)
    }
    catch(e){
        next(e)
    }
}

export async function getById(req: Request<{id: string}>, res: Response<Employee | string>, next: NextFunction){
    try{
        const id = req.params. id
        const employee = await dataAccess.getEmployeeById(id)
        employee ? res.status(200).json(employee) : res.status(404).send(`Empl with id ${id} not found`)
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
        const emplId = await dataAccess.addEmployee(req.body)
        res.json({
            id: emplId
        })
    }
    catch(e){
        next(e)
    }
}