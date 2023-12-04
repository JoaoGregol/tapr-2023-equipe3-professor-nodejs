import { Request, Response } from 'express';
import ProfessorService from '../../services/professor.service';

export class ProfessorController {
    all(_: Request, res: Response): void {
        ProfessorService.all().then((r) => res.json(r));
    }

    getById(req: Request, res: Response): void {
        ProfessorService.getById(req.params['id']).then((r) => res.json(r));
    }

    post(req: Request, res: Response): void {
        ProfessorService.saveNew(req.body).then((r) => res.json(r));
    }

    update(req: Request, res: Response): void {
        ProfessorService.update(req.params['id'], req.body).then((r) => res.json(r));
    }
    
    delete(req: Request, res: Response): void {
        ProfessorService.delete(req.params['id']).then((r) => res.json(r));
    }

    updateEvent(req:Request, res:Response): void{
        ProfessorService.updateEvent(req.body.data).then((r) => res.json(r)).catch(() => res.status(404).end());
    }
}

export default new ProfessorController();