package com.dungud.uonggia.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "typical_projects")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TypicalProject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long typicalProjectId;

    private String name;
    private String description;
    private LocalDate date;

    @OneToMany(mappedBy = "typicalProject", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PictureURL> pictureURLs;
}
