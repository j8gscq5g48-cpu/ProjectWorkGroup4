package it.project_work.app_arcade.profile.dto;

public record GameTopDTO(
        String username,
        String avatarUrl, 
        Integer bestScore,
        Integer level,
        Integer playedCount
        ) {
}
