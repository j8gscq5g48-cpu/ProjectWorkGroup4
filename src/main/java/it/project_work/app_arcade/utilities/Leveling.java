package it.project_work.app_arcade.utilities;

public final class Leveling {

    private Leveling() {
    }

    public static LevelInfo fromTotalXp(long xpTotal) {
        long xp = Math.max(0, xpTotal);
        int lvl = 1;

        long toNext = 50; // 1->2

        while (lvl < 10 && xp >= toNext) {
            xp -= toNext;
            lvl++;
            toNext *= 2; // raddoppia fino a raggiungere 10
        }

        if (lvl >= 10) {
            // dal 10 in poi: 1000 per livello
            long extra = xp / 1000;
            lvl += (int) extra;
            xp = xp % 1000;
            toNext = 1000;
        }

        return new LevelInfo(lvl, xp, toNext);
    }
}
