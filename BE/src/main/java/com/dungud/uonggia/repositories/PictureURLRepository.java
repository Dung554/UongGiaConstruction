package com.dungud.uonggia.repositories;

import com.dungud.uonggia.entities.PictureURL;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PictureURLRepository extends JpaRepository<PictureURL, Long> {
    List<PictureURL> findAllByTypicalProject_TypicalProjectId(Long typicalProjectId);
}
