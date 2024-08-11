package com.example.demo2.model;

import lombok.*;
import org.springframework.beans.factory.annotation.Value;

import java.util.ArrayList;
import java.util.List;



@Data
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Pet {
    private Long id;
    private Category category;
    private String name;
    private List<String> photoUrls = new ArrayList<>();
    private List<Tag> tags = new ArrayList<>();
    private Status status;
}
