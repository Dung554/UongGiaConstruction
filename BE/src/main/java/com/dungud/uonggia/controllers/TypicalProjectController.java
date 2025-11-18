package com.dungud.uonggia.controllers;

import com.dungud.uonggia.dtos.requests.TypicalProjectRequest;
import com.dungud.uonggia.dtos.response.ApiResponse;
import com.dungud.uonggia.dtos.response.TypicalProjectDetailResponse;
import com.dungud.uonggia.dtos.response.TypicalProjectResponse;
import com.dungud.uonggia.services.TypicalProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/typicalProject")
public class TypicalProjectController {
    @Autowired
    TypicalProjectService typicalProjectService;

    @GetMapping("/getAll")
    public ApiResponse<List<TypicalProjectResponse>> getAll() {
        List<TypicalProjectResponse> responses = typicalProjectService.getAll();
        return ApiResponse.<List<TypicalProjectResponse>>builder()
                .data(responses)
                .build();
    }

    @GetMapping("/getById/{id}")
    public ApiResponse<TypicalProjectDetailResponse> getById(@PathVariable long id) {
        TypicalProjectDetailResponse response = typicalProjectService.getById(id);
        return ApiResponse.<TypicalProjectDetailResponse>builder()
                .data(response)
                .build();
    }

    @PostMapping("/create")
    public ApiResponse<Long> create(@ModelAttribute TypicalProjectRequest request,
                                    @RequestParam("thumbnail") MultipartFile file) throws IOException, InterruptedException {
        Long id = typicalProjectService.create(request, file);
        return ApiResponse.<Long>builder()
                .message("Tạo dự án tiêu biểu thành công")
                .data(id)
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<Void> update(@PathVariable long id,
                                    @ModelAttribute TypicalProjectRequest request,
                                    @RequestParam(value = "thumbnail", required = false) MultipartFile file) throws Exception {
        typicalProjectService.update(id, request, file);
        return ApiResponse.<Void>builder()
                .message("Cập nhật dự án tiêu biểu thành công")
                .build();
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<Void> delete(@PathVariable long id) throws Exception {
        typicalProjectService.delete(id);
        return ApiResponse.<Void>builder()
                .message("Xóa dự án tiêu biểu thành công")
                .build();
    }
}
