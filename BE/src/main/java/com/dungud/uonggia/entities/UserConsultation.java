package com.dungud.uonggia.entities;

import com.dungud.uonggia.enums.UserConsultationStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Entity
@Table(name = "user_consultation")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserConsultation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long userConsultationId;

    String guestName;
    String guestPhoneNumber;
    String email;
    LocalDate createDate;
    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 50, nullable = false)
    UserConsultationStatus status;
}
