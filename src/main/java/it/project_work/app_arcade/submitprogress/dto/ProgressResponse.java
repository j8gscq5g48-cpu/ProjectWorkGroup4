package it.project_work.app_arcade.submitprogress.dto;

public record ProgressResponse(
        Integer bestScore,
        Integer lastScore,
        Long xpTotal,
        Integer level,
        Boolean leveledUp,
        Long xpIntoLevel,
        Long xpToNext
        ) {

}
