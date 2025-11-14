package com.dungud.uonggia.repositories;

import com.dungud.uonggia.entities.UserConsultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserConsultationRepository extends JpaRepository<UserConsultation, Long> {
    @Query(value = "SELECT * FROM user_consultation " +
            "ORDER BY CASE WHEN status = 'NEW' THEN 0 ELSE 1 END, " +
            "create_date DESC",
            nativeQuery = true)
    List<UserConsultation> findAllSortedByStatusAndDate();
}
