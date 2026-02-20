package it.project_work.app_arcade.dto;

import it.project_work.app_arcade.models.User;
import it.project_work.app_arcade.models.UserGameProgress;

public record LeaderboardResponse(
    String username,
    String avatar,
    Integer bestScore,
    Integer level,
    Integer gameCount
) {}