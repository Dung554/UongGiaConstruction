package com.dungud.uonggia.dtos;

import com.dungud.uonggia.enums.UserConsultationStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatusModel {
    @Enumerated(EnumType.STRING)
    UserConsultationStatus status;
}
