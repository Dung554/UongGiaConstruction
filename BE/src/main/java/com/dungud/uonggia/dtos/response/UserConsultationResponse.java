package com.dungud.uonggia.dtos.response;

import com.dungud.uonggia.enums.UserConsultationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserConsultationResponse {
    Long userConsultationId;

    String guestName;
    String guestPhoneNumber;
    String email;
    LocalDate createDate;
    UserConsultationStatus status;
}
