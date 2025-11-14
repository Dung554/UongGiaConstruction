package com.dungud.uonggia.services;

import com.dungud.uonggia.dtos.StatusModel;
import com.dungud.uonggia.dtos.requests.UserConsultationRequest;
import com.dungud.uonggia.dtos.response.UserConsultationResponse;
import com.dungud.uonggia.entities.UserConsultation;
import com.dungud.uonggia.enums.UserConsultationStatus;
import com.dungud.uonggia.repositories.UserConsultationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class UserConsultationService {
    @Autowired
    UserConsultationRepository userConsultationRepository;

    public void create(UserConsultationRequest request) {
        UserConsultation userConsultation = UserConsultation.builder()
                .guestName(request.getGuestName())
                .email(request.getEmail())
                .guestPhoneNumber(request.getGuestPhoneNumber())
                .createDate(LocalDate.now())
                .status(UserConsultationStatus.NEW)
                .build();
        userConsultationRepository.save(userConsultation);
    }

    public List<UserConsultationResponse> getUserConsultations() {
        List<UserConsultation> consultations = userConsultationRepository.findAllSortedByStatusAndDate();
        return consultations.stream().map(consultation -> UserConsultationResponse.builder()
                .userConsultationId(consultation.getUserConsultationId())
                .guestName(consultation.getGuestName())
                .guestPhoneNumber(consultation.getGuestPhoneNumber())
                .createDate(consultation.getCreateDate())
                .status(consultation.getStatus())
                .email(consultation.getEmail()).build()).toList();
    }

    public void updateStatus(Long id, StatusModel status) {
        UserConsultation consultation = userConsultationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User Consultation not found with id: " + id));
        consultation.setStatus(status.getStatus());
        userConsultationRepository.save(consultation);
    }

    public List<StatusModel> getStatuses() {
        return List.of(
                new StatusModel(UserConsultationStatus.NEW),
                new StatusModel(UserConsultationStatus.CONTACTED)
        );
    }

}
