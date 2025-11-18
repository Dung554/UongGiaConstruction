package com.dungud.uonggia.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TypicalProjectRequest {
    String name;
    String description;
    String thumbnailURL;
    Long square;
    String location;
}
