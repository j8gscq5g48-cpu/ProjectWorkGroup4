package it.project_work.app_arcade.submitprogress.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SubmitScoreRequest(
        @NotBlank
        String gameCode,
        @NotNull
        @Min(0)
        Integer score
        ) {

}
