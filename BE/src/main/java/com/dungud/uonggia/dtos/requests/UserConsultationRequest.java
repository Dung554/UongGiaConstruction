package com.dungud.uonggia.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserConsultationRequest {
    private String guestName;
    private String guestPhoneNumber;
    private String email;
}
