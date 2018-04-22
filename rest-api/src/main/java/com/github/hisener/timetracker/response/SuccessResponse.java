package com.github.hisener.timetracker.response;

public class SuccessResponse {

    private String message;

    public SuccessResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public SuccessResponse setMessage(String message) {
        this.message = message;
        return this;
    }
}
