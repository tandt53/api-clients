package com.example.demo2.controller;

import com.example.demo2.model.Pet;
import com.example.demo2.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v3/pet")
public class PetController {

    @Autowired
    private PetService petData;


    // POST /pet
    @PostMapping()
    public ResponseEntity createPet(@RequestBody Pet pet) {
        if (pet == null) {
            return new ResponseEntity<String>("No Pet provided. Try again?", HttpStatus.BAD_REQUEST);
        }
        petData.addPet(pet);

        return new ResponseEntity(pet, HttpStatus.OK);
    }


    //    GET /pet/{petId}
    @GetMapping("/{petId}")
    public ResponseEntity getPetById(@PathVariable("petId") Long petId) {
        if (petId == null) {
            return new ResponseEntity<String>("No petId provided. Try again?", HttpStatus.BAD_REQUEST);
        }

        final Pet existingPet = petData.getPetById(petId);
        if (existingPet == null) {
            return new ResponseEntity<String>("Pet not found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(existingPet, HttpStatus.OK);
    }


    //    GET /pet/findByStatus
    @GetMapping("/findByStatus")
    public ResponseEntity getPetByStatus(@RequestParam("status") String status) {
        if (status == null) {
            return new ResponseEntity<String>("No status provided. Try again?", HttpStatus.BAD_REQUEST);
        }

        List<Pet> existingPet = petData.findPetByStatus(status);
        if (existingPet == null) {
            return new ResponseEntity<String>("Pet not found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(existingPet, HttpStatus.OK);
    }

    //    POST /pet/{petId}/uploadImage
    @PostMapping(value = "/{petId}/uploadImage")
    public ResponseEntity uploadImage(@PathVariable("petId") Long petId,
                                      @RequestParam("additionalMetadata") @Nullable String additionalMetadata,
                                      HttpServletRequest httpServletRequest) {
        if (petId == null) {
            return new ResponseEntity<String>("No petId provided. Try again?", HttpStatus.BAD_REQUEST);
        }

        if (httpServletRequest == null) {
            return new ResponseEntity<String>("No file provided. Try again?", HttpStatus.BAD_REQUEST);
        }

        try (ServletInputStream inputStream = httpServletRequest.getInputStream()) {
            new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))
                    .lines().forEach(System.out::println);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        Pet existingPet = petData.getPetById(petId);
        if (existingPet == null) {
            return new ResponseEntity<String>("Pet not found", HttpStatus.NOT_FOUND);
        }

        petData.deletePetById(petId);
        petData.addPet(existingPet);

        return new ResponseEntity(existingPet, HttpStatus.OK);
    }

}
