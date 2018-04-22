package com.github.hisener.timetracker.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.time.Instant;

@Document
public class TimeLog {

    @Id
    private String id;

    @NotBlank
    private String description;

    private Instant dateTime;

    @Min(1)
    private Long timeSpent;

    public String getId() {
        return id;
    }

    public TimeLog setId(String id) {
        this.id = id;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public TimeLog setDescription(String description) {
        this.description = description;
        return this;
    }

    public Instant getDateTime() {
        return dateTime;
    }

    public TimeLog setDateTime(Instant dateTime) {
        this.dateTime = dateTime;
        return this;
    }

    public Long getTimeSpent() {
        return timeSpent;
    }

    public TimeLog setTimeSpent(Long timeSpent) {
        this.timeSpent = timeSpent;
        return this;
    }
}
