package com.dungud.uonggia.services;

import com.dungud.uonggia.entities.PictureURL;
import com.dungud.uonggia.entities.TypicalProject;
import com.dungud.uonggia.repositories.PictureURLRepository;
import com.dungud.uonggia.repositories.TypicalProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Paths;
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

    public void updatePictureURL(Long id, List<MultipartFile> newFiles) throws IOException {
        // Lấy tất cả các PictureURL hiện tại của project
        TypicalProject typicalProject = typicalProjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Typical Project not found with id: " + id));
        List<PictureURL> existingPictures = pictureURLRepository.findAllByTypicalProject_TypicalProjectId(id);

        // Tạo danh sách tên file hiện tại
        List<String> existingFileNames = existingPictures.stream()
                .map(p -> Paths.get(p.getURL()).getFileName().toString())
                .toList();

        // 1. Xoá file cũ nếu không có trong danh sách file mới
        for (PictureURL picture : existingPictures) {
            String fileName = Paths.get(picture.getURL()).getFileName().toString();

            boolean existsInNewFiles = newFiles.stream()
                    .anyMatch(f -> f.getOriginalFilename().equals(fileName));

            if (!existsInNewFiles) {
                // Xoá file trên storage
                storage.deleteFileByUrl(picture.getURL());
                // Xoá record DB
                pictureURLRepository.delete(picture);
            }
        }

        // 2. Thêm file mới chưa có trong DB
        for (MultipartFile file : newFiles) {
            if (!existingFileNames.contains(file.getOriginalFilename())) {
                String imageUrl = storage.saveFile(
                        id,
                        file,
                        "TypicalProject"
                );
                PictureURL pictureURL = PictureURL.builder()
                        .typicalProject(typicalProject)
                        .URL(imageUrl)
                        .build();
                pictureURLRepository.save(pictureURL);
            }
        }
    }

}
