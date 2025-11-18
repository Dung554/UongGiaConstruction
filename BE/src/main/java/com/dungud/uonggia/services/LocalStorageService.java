package com.dungud.uonggia.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

@Service
public class LocalStorageService {

    @Value("${upload.dir}")
    private String uploadDir;

    public Path getUploadPath() {
        return Paths.get(uploadDir).toAbsolutePath().normalize();
    }

    public String saveFile(Long id, MultipartFile file, String folder) throws IOException {

        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        Path projectPath = Paths.get(uploadDir, folder, String.valueOf(id)).normalize();

        Files.createDirectories(projectPath);

        Path filePath = projectPath.resolve(filename).normalize();
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // FE sẽ load bằng URL /photos/TypicalProject/2/xxx.png
        return "/photos/" + folder + "/" + id + "/" + filename;
    }

    public void deleteFileByUrl(String fileUrl) throws IOException {
        if (fileUrl == null || fileUrl.isBlank()) return;

        // /photos/TypicalProject/2/a.png → TypicalProject/2/a.png
        String relativePath = fileUrl.replaceFirst("^/photos/", "");

        Path realPath = Paths.get(uploadDir, relativePath).normalize();

        Files.deleteIfExists(realPath);
    }

    public void deleteFolder(Long id, String folder) throws IOException {
        Path folderPath = Paths.get(uploadDir, folder, String.valueOf(id))
                .toAbsolutePath()
                .normalize();

        if (!Files.exists(folderPath)) return;

        Files.walk(folderPath)
                .sorted((a, b) -> b.compareTo(a)) // Xoá file trước thư mục
                .forEach(path -> {
                    try {
                        Files.deleteIfExists(path);
                    } catch (IOException e) {
                        throw new RuntimeException("Failed to delete: " + path, e);
                    }
                });
    }

}
