package it.project_work.app_arcade.authentication.dto;

import java.util.Map;

public record ApiError(
        String error, // es: "VALIDATION_ERROR", "UNAUTHORIZED", "CONFLICT"
        String message, // messaggio human-friendly
        Map<String, String> fieldErrors // es: {"username":"già usato"}
        ) {

}
