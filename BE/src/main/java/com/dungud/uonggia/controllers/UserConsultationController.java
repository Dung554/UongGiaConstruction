package com.dungud.uonggia.controllers;

import com.dungud.uonggia.dtos.StatusModel;
import com.dungud.uonggia.dtos.requests.UserConsultationRequest;
import com.dungud.uonggia.dtos.response.ApiResponse;
import com.dungud.uonggia.dtos.response.UserConsultationResponse;
import com.dungud.uonggia.entities.UserConsultation;
import com.dungud.uonggia.services.UserConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userConsultation")
public class UserConsultationController {
    @Autowired
    UserConsultationService userConsultationService;

    @PostMapping("/create")
    public ApiResponse<Void> create(@RequestBody UserConsultationRequest userConsultation) {
        userConsultationService.create(userConsultation);
        return ApiResponse.<Void>builder()
                .message("User consultation created successfully")
                .build();
    }

    @GetMapping("/getAllConsultations")
    public ApiResponse<List<UserConsultationResponse>> getUserConsultations() {
        List<UserConsultationResponse> responses = userConsultationService.getUserConsultations();
        return ApiResponse.<List<UserConsultationResponse>>builder()
                .data(responses)
                .build();
    }

    @GetMapping("getAllStatus")
    public ApiResponse<List<StatusModel>> getAllStatus() {
        List<StatusModel> statuses = userConsultationService.getStatuses();
        return ApiResponse.<List<StatusModel>>builder()
                .data(statuses)
                .build();
    }

    @PutMapping("/updateStatus/{id}")
    public ApiResponse<Void> updateStatus(@PathVariable Long id, @RequestBody StatusModel request){
        userConsultationService.updateStatus(id, request);
        return ApiResponse.<Void>builder()
                .message("Status updated successfully")
                .build();
    }
}
