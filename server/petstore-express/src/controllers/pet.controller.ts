import {Request, Response} from "express";
import {PetService} from "../services/pet.service";

const petService = new PetService();

class PetController {
    async create(req: Request, res: Response) {
        const existingPet = petService.getPetById(req.body);
        const pet = petService.createPet(req.body);
        res.status(201).json(pet);
    }

    async getById(req: Request<{ id: number }, {}, {}, {}>, res: Response) {
        const pet = petService.getPetById(req.params.id);
        if (!pet) {
            res.status(404).json({message: `Pet with id ${req.params.id} not found`});
        } else
            res.status(200).json(pet);
    }

    async getByStatus(req: Request<{}, {}, {}, { status: string }>, res: Response) {
        const pet = petService.getPetByStatus(req.query.status);
        if (!pet) {
            res.status(404).json({message: `Pet with status ${req.query.status} not found`});
        } else
            res.status(200).json({data: {pet}});
    }

    async uploadImage(req: Request<{ id: number }, {}, {}, {}>, res: Response) {
        const pet = petService.getPetById(req.params.id);
        const image = req.body;
        if (!pet) {
            res.status(404).json({message: `Pet with id ${req.params.id} not found`});
        } else
            res.status(200).json({message: `Image uploaded`});
    }
}
