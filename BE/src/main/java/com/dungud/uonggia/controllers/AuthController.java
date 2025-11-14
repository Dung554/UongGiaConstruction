package com.dungud.uonggia.controllers;

import com.dungud.uonggia.dtos.requests.LoginRequest;
import com.dungud.uonggia.dtos.response.ApiResponse;
import com.dungud.uonggia.dtos.response.LoginResponse;
import com.dungud.uonggia.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = authService.login(loginRequest);
        return ApiResponse.<LoginResponse>builder()
                .data(response)
                .build();
    }

    @PostMapping("/register")
    public ApiResponse<Void> register(@RequestBody LoginRequest registerRequest) {
        authService.register(registerRequest);
        return ApiResponse.<Void>builder()
                .message("User registered successfully")
                .build();
    }
}
