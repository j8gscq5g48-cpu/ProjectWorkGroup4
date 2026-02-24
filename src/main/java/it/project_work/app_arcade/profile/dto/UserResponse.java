package it.project_work.app_arcade.profile.dto;

import it.project_work.app_arcade.models.User;
import it.project_work.app_arcade.profile.utilities.Leveling;

public record UserResponse(
        Long id,
        String username,
        String email,
        User.Role role,
        int level,
        boolean enabled,
        Long avatarId,
        long xpTotal,
        int xpIntoLevel,
        int xpToNext
        ) {

    private static int safeInt(long v) {
        return (v > Integer.MAX_VALUE) ? Integer.MAX_VALUE : (int) v;
    }

    public static UserResponse fromEntity(User u) {
        long xpTotal = u.getXpTotal(); // primitive long => mai null
        var info = Leveling.fromTotalXp(xpTotal);

        return new UserResponse(
                u.getId(),
                u.getUsername(),
                u.getEmail(),
                u.getRole(),
                info.level(),
                u.isEnabled(),
                u.getSelectedAvatar() != null ? u.getSelectedAvatar().getId() : 1L,
                xpTotal,
                safeInt(info.xpIntoLevel()),
                safeInt(info.xpToNext())
        );
    }
}
