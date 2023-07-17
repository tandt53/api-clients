package com.example.demo2.model;


import com.fasterxml.jackson.annotation.JsonValue;

public enum Status {

    AVAILABLE("available"),

    PENDING("pending"),

    SOLD("sold");

    @JsonValue
    private String value;

    Status(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return String.valueOf(value);
    }

    public static Status fromValue(String text) {
        for (Status b : Status.values()) {
            if (String.valueOf(b.value).equals(text)) {
                return b;
            }
        }
        return null;
    }
}
