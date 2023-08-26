import {Pet} from "../models/pet";

export class PetService{
    private pets: Pet[] = [];
    public createPet(pet: Pet): Pet {
        const id: number = Math.random();
        pet.id = id;
        this.pets.push(pet);
        return pet;
    }

    public getPetById(id: number): Pet {
        return <Pet>this.pets.find(pet => pet.id == id);
    }

    public getPetByStatus(status: string): Pet[] {
        return this.pets.filter(pet => pet.status === status);
    }

    public uploadImage(petId: number, image: Blob): void {
        // save image to local storage


    }
}
