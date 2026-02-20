package it.project_work.app_arcade.dto;

public record LeaderboardResponse(
        String username,
        String avatarUrl,
        Long totalScore, // somma bestScore di tutti i giochi
        Long totalPlayed, // somma played_count di tutti i giochi
        Integer level
        ) {

}
