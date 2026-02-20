package it.project_work.app_arcade.dto;

public record GameTopDTO(
        String gameCode,
        String username,
        String avatar, 
        Integer bestScore,
        Integer level,
        Integer gameCount
) {}