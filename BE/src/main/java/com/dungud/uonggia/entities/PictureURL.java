package com.dungud.uonggia.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "picture_urls")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PictureURL {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pictureURLId;

    private String URL;

    @ManyToOne
    @JoinColumn(name = "TypicalProjectsId")
    private TypicalProject typicalProject;
}
