package it.project_work.app_arcade.authentication.dto;

// (success generico)
public record ApiResponse<T>(
        String message,
        T data
        ) {

}
/* 
Esempi:

register ok → ApiResponse<UserResponse>
login ok → ApiResponse<UserResponse>
logout ok → ApiResponse<Void>
*/