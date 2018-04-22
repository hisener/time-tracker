package com.github.hisener.timetracker.controller;

import com.github.hisener.timetracker.model.TimeLog;
import com.github.hisener.timetracker.response.PagedResponse;
import com.github.hisener.timetracker.response.SuccessResponse;
import com.github.hisener.timetracker.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/logs")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
public class LogController {

    private LogService logService;

    @Autowired
    public LogController(LogService logService) {
        this.logService = logService;
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<SuccessResponse> create(@Valid @RequestBody TimeLog payload) {
        TimeLog timeLog = logService.save(payload);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(timeLog.getId()).toUri();

        return ResponseEntity.created(location).body(new SuccessResponse("Created"));
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<PagedResponse<TimeLog>> list(
            @RequestParam(value = "filter", defaultValue = "") String filter,
            @RequestParam(value = "page", defaultValue = "1") Integer page) {
        PagedResponse<TimeLog> timeLogs = logService.list(filter, page);

        return ResponseEntity.ok().body(timeLogs);
    }

}
