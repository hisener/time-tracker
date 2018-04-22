package com.github.hisener.timetracker.repository;

import com.github.hisener.timetracker.model.TimeLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogRepository extends MongoRepository<TimeLog, String> {

    Page<TimeLog> findByDescriptionLikeIgnoreCase(String description, Pageable pageable);

}
