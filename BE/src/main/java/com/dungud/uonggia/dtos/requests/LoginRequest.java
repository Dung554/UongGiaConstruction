package com.dungud.uonggia.dtos.requests;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginRequest {
    String username;
    String password;
}
