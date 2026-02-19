package it.project_work.app_arcade.services;

import org.springframework.stereotype.Service;

import it.project_work.app_arcade.dto.ProgressResponse;
import it.project_work.app_arcade.models.User;
import it.project_work.app_arcade.models.UserGameProgress;
import it.project_work.app_arcade.repositories.ProgressRepository;
import it.project_work.app_arcade.repositories.UserRepository;
import jakarta.transaction.Transactional;

@Service
public class ProgressService extends GenericService<Long, UserGameProgress, ProgressRepository> {

    private final UserRepository userRepository;

    public ProgressService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public ProgressResponse submitScore(String username, String gameCode, Integer scoreRun) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Utente non trovato"));

        // standardizza il gameCode
        String code = gameCode.trim().toLowerCase();

        UserGameProgress progress = getRepository()
                .findByUserIdAndGameCode(user.getId(), code)
                .orElseGet(() -> {
                    UserGameProgress p = new UserGameProgress();
                    p.setUser(user);
                    p.setGameCode(code);
                    // best/last/playedCount 0 di default, ok
                    return p;
                });

        progress.setLastScore(scoreRun);
        progress.setPlayedCount(progress.getPlayedCount() + 1);

        if (scoreRun > progress.getBestScore()) {
            progress.setBestScore(scoreRun);
        }

        UserGameProgress saved = getRepository().save(progress);

        return new ProgressResponse(saved.getBestScore(), saved.getLastScore());
    }

}
