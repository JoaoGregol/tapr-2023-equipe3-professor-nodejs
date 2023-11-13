import { Request, Response } from 'express';
import ProfessorService from '../../services/professor.service';

export class ProfessorController {
    all(_: Request, res: Response): void {
        ProfessorService.all().then((r) => res.json(r));
    }

}  

export default new ProfessorController();