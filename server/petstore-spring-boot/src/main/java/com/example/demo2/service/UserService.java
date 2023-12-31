package com.example.demo2.service;

import com.example.demo2.model.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private static List<User> users = new ArrayList<>();

    static {
        users.add(createUser(1, "user1", "first name 1", "last name 1",
                "email1@test.com", "123-456-7890", 1));
        users.add(createUser(2, "user2", "first name 2", "last name 2",
                "email2@test.com", "123-456-7890", 2));
        users.add(createUser(3, "user3", "first name 3", "last name 3",
                "email3@test.com", "123-456-7890", 3));
        users.add(createUser(4, "user4", "first name 4", "last name 4",
                "email4@test.com", "123-456-7890", 1));
        users.add(createUser(5, "user5", "first name 5", "last name 5",
                "email5@test.com", "123-456-7890", 2));
        users.add(createUser(6, "user6", "first name 6", "last name 6",
                "email6@test.com", "123-456-7890", 3));
        users.add(createUser(7, "user7", "first name 7", "last name 7",
                "email7@test.com", "123-456-7890", 1));
        users.add(createUser(8, "user8", "first name 8", "last name 8",
                "email8@test.com", "123-456-7890", 2));
        users.add(createUser(9, "user9", "first name 9", "last name 9",
                "email9@test.com", "123-456-7890", 3));
        users.add(createUser(10, "user10", "first name 10", "last name 10",
                "email10@test.com", "123-456-7890", 1));
        users.add(createUser(11, "user?10", "first name ?10", "last name ?10",
                "email101@test.com", "123-456-7890", 1));

    }

    public User addUser(User user) {
        System.out.println("--- Before add ---");
        users.forEach(u -> System.out.println(u.getUsername()));
        if (users.size() > 0) {
            for (int i = users.size() - 1; i >= 0; i--) {
                if (users.get(i).getUsername().equals(user.getUsername())) {
                    users.remove(i);
                }
            }
        }
        users.add(user);

        System.out.println("--- After add ---");
        users.forEach(u -> System.out.println(u.getUsername()));
        return createUser(user);
    }

    public void deleteUser(String username){
        System.out.println("--- Before delete ---");
        users.forEach(user -> System.out.println(user.getUsername()));
        users.removeIf(user -> user.getUsername().equals(username));
        System.out.println("--- After delete ---");
        users.forEach(user -> System.out.println(user.getUsername()));
    }

    public static User createUser(final long id, final String username, final String firstName,
                                  final String lastName, final String email, final String phone, final int userStatus) {
        final User user = new User();
        user.setId(id);
        user.setUsername(username);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPassword("XXXXXXXXXXX");
        user.setPhone(phone);
        user.setUserStatus(userStatus);
        return user;
    }

    public static User createUser(User user) {
        return createUser(user.getId(), user.getUsername(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getPhone(), user.getUserStatus());
    }

    public User updateUser(String username, User body) {
        return null;
    }

    public User findUserByUserName(String username) {
        for (final User user : users) {
            if (user.getUsername().equals(username)) {
                return user;
            }
        }
        return null;
    }
}
