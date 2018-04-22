package com.github.hisener.timetracker.service;

import com.github.hisener.timetracker.model.TimeLog;
import com.github.hisener.timetracker.repository.LogRepository;
import com.github.hisener.timetracker.response.PagedResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.validation.Valid;

@Service
public class LogService {

    private static final int PAGE_SIZE = 10;

    private LogRepository logRepository;

    @Autowired
    public LogService(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    public TimeLog save(@Valid TimeLog timeLog) {
        return logRepository.save(timeLog);
    }

    public PagedResponse<TimeLog> list(String filter, Integer page) {
        PageRequest request = PageRequest.of(page - 1, PAGE_SIZE,
                new Sort(Sort.Direction.DESC, "dateTime"));

        Page<TimeLog> result = logRepository.findByDescriptionLikeIgnoreCase(filter, request);

        return new PagedResponse<TimeLog>()
                .setData(result.getContent())
                .setPage(page)
                .setTotalPages(result.getTotalPages());
    }
}
