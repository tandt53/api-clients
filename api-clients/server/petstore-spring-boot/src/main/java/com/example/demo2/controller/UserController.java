package com.example.demo2.controller;

import com.example.demo2.model.User;
import com.example.demo2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

import org.apache.commons.lang.math.RandomUtils;

@RestController
@RequestMapping("/api/v3/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping()
    public ResponseEntity createUser(@RequestBody User body) {
        if (body == null) {
            return ResponseEntity.badRequest().body("No User provided. Try again?");
        }
        User addedUser = userService.addUser(body);
        return ResponseEntity.ok(addedUser);
    }

    @PostMapping("/createWithArray")
    public String createUsersWithArrayInput() {
        return "createUsersWithArrayInput";
    }

    @GetMapping("/{username}")
    public ResponseEntity getUserByName(@PathVariable("username") String username) {
        if (username == null) {
            return ResponseEntity.badRequest().body("No username provided. Try again?");
        }

        final User existingUser = userService.findUserByUserName(username);
        if (existingUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        return ResponseEntity.ok(existingUser);
    }

    @PutMapping("/{username}")
    public ResponseEntity updateUser(@PathVariable("username") String username,
                                     @RequestBody User body) {
        if (username == null) {
            return ResponseEntity.badRequest().body("No username provided. Try again?");
        }

        if (body == null) {
            return ResponseEntity.badRequest().body("No User provided. Try again?");
        }

        final User existingUser = userService.findUserByUserName(username);

        if (existingUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        userService.deleteUser(body.getUsername());
        User updatedUser = userService.addUser(body);

        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{username}")
    public ResponseEntity deleteUser(@PathVariable("username") String username) {
        if (username == null) {
            return ResponseEntity.badRequest().body("No username provided. Try again?");
        }

        final User existingUser = userService.findUserByUserName(username);
        if (existingUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        userService.deleteUser(username);
        return ResponseEntity.ok(existingUser);
    }

    @GetMapping("/login")
    public ResponseEntity<String> loginUser(@RequestParam("username") String username,
                                            @RequestParam("password") String password) {
        if (username == null || password == null) {
            return ResponseEntity.badRequest().body("No username or password provided. Try again?");
        }
        Date date = new Date(System.currentTimeMillis() + 3600000);

        User user = userService.findUserByUserName(username);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        if (!user.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username/password supplied");
        }
        return ResponseEntity.ok("Logged in user session: " + RandomUtils.nextLong());
    }
}
