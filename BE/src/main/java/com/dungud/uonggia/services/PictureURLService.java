package com.dungud.uonggia.services;

import com.dungud.uonggia.entities.PictureURL;
import com.dungud.uonggia.entities.TypicalProject;
import com.dungud.uonggia.repositories.PictureURLRepository;
import com.dungud.uonggia.repositories.TypicalProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class PictureURLService {
    @Autowired
    PictureURLRepository pictureURLRepository;
    @Autowired
    TypicalProjectRepository typicalProjectRepository;
    @Autowired
    LocalStorageService storage;

    public void UploadMultiplePictures(Long id , List<MultipartFile> files) throws IOException {
        List<PictureURL> pictureURLs = new ArrayList<>();
        TypicalProject typicalProject = typicalProjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Typical Project not found with id: " + id));
        for (MultipartFile file : files) {
            String imageUrl = storage.saveFile(
                    id,
                    file,
                    "TypicalProject"
            );
            PictureURL pictureURL = PictureURL.builder()
                    .typicalProject(typicalProject)
                    .URL(imageUrl)
                    .build();
            pictureURLs.add(pictureURL);
        }

        pictureURLRepository.saveAll(pictureURLs);
    }
}
