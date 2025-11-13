package com.dungud.uonggia.exceptions;

import com.dungud.uonggia.dtos.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return ResponseEntity.badRequest().body(
                ApiResponse.<Map<String, String>>builder()
                        .code(400)
                        .message("Validation failed")
                        .data(errors)
                        .build()
        );
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleUsernameNotFoundException(UsernameNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                ApiResponse.builder()
                        .code(404)
                        .message(ex.getMessage())
                        .data(null)
                        .build()
        );
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse<Object>> handleBadCredentialsException(BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                ApiResponse.builder()
                        .code(401)
                        .message("Invalid username or password")
                        .data(null)
                        .build()
        );
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<Object>> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity.badRequest().body(
                ApiResponse.builder()
                        .code(400)
                        .message(ex.getMessage())
                        .data(null)
                        .build()
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                ApiResponse.builder()
                        .code(500)
                        .message("An error occurred: " + ex.getMessage())
                        .data(null)
                        .build()
        );
    }
}