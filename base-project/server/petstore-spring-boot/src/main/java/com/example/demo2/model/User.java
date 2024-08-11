package com.example.demo2.model;

import lombok.*;

@Data
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class User {
    private long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private int userStatus;
}
