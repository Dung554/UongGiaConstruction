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
    Long typicalProjectId;

    String name;
    String description;
    LocalDate date;

    @OneToMany(mappedBy = "typicalProject", cascade = CascadeType.ALL, orphanRemoval = true)
    List<PictureURL> pictureURLs;
}
