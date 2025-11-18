package com.dungud.uonggia.services;


import com.dungud.uonggia.dtos.requests.TypicalProjectRequest;
import com.dungud.uonggia.dtos.response.ImageResponse;
import com.dungud.uonggia.dtos.response.TypicalProjectDetailResponse;
import com.dungud.uonggia.dtos.response.TypicalProjectResponse;
import com.dungud.uonggia.entities.TypicalProject;
import com.dungud.uonggia.repositories.PictureURLRepository;
import com.dungud.uonggia.repositories.TypicalProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
public class TypicalProjectService {
    @Autowired
    TypicalProjectRepository typicalProjectRepository;
    @Autowired
    PictureURLRepository pictureURLRepository;
    @Autowired
    LocalStorageService storage;

    public Long create(TypicalProjectRequest request, MultipartFile file) throws IOException, InterruptedException {

        TypicalProject typicalProject = TypicalProject.builder()
                .date(LocalDate.now())
                .name(request.getName())
                .description(request.getDescription())
                .square(request.getSquare())
                .location(request.getLocation())
                .build();
        typicalProjectRepository.save(typicalProject);

        String imageUrl = storage.saveFile(
                typicalProject.getTypicalProjectId(),
                file,
                "TypicalProject"
        );

        typicalProject.setThumbnailURL(imageUrl);
        typicalProjectRepository.save(typicalProject);
        return typicalProject.getTypicalProjectId();
    }

    public void update(Long id, TypicalProjectRequest request, MultipartFile file) throws Exception {
        TypicalProject typicalProject = typicalProjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Typical Project not found with id: " + id));
        typicalProject.setName(request.getName());
        typicalProject.setDescription(request.getDescription());
        typicalProject.setSquare(request.getSquare());
        typicalProject.setLocation(request.getLocation());

        if(typicalProject.getThumbnailURL()!=null && !typicalProject.getThumbnailURL().isEmpty()) {
            String filePath = typicalProject.getThumbnailURL();

            storage.deleteFileByUrl(filePath);

            String imageUrl = storage.saveFile(
                    typicalProject.getTypicalProjectId(),
                    file,
                    "TypicalProject"
            );

            typicalProject.setThumbnailURL(imageUrl);
        }
        typicalProjectRepository.save(typicalProject);
    }

    public void delete(Long id) throws Exception {
        TypicalProject typicalProject = typicalProjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Typical Project not found with id: " + id));

        String filePath = typicalProject.getThumbnailURL();

        storage.deleteFileByUrl(filePath);

        typicalProjectRepository.delete(typicalProject);
    }

    public List<TypicalProjectResponse> getAll(){
        return typicalProjectRepository.findAll().stream().map(tp -> TypicalProjectResponse.builder()
                .typicalProjectId(tp.getTypicalProjectId())
                .name(tp.getName())
                .description(tp.getDescription())
                .thumbnailURL(tp.getThumbnailURL())
                .square(tp.getSquare())
                .location(tp.getLocation())
                .date(tp.getDate())
                .build()).toList();
    }

    public TypicalProjectDetailResponse getById(Long id) {
        TypicalProject tp = typicalProjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Typical Project not found with id: " + id));

        return TypicalProjectDetailResponse.builder()
                .name(tp.getName())
                .description(tp.getDescription())
                .thumbnailURL(tp.getThumbnailURL())
                .square(tp.getSquare())
                .location(tp.getLocation())
                .date(tp.getDate())
                .imageURLs(
                        pictureURLRepository.findAllByTypicalProject_TypicalProjectId(tp.getTypicalProjectId())
                                .stream()
                                .map(pu -> ImageResponse.builder().url(pu.getURL()).build())
                                .toList()
                )
                .build();
    }


}
