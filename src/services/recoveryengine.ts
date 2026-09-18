export type RecoveryInput = {
    sleep: number;
    energy: number;
    soreness: number;
    stress: number;
    // Optional muscle‑specific soreness ratings (1‑5). Undefined means not provided.
    legsSoreness?: number;
    chestSoreness?: number;
    backSoreness?: number;
    shouldersSoreness?: number;
    armsSoreness?: number;
    coreSoreness?: number;
};

export type RecoveryResult = {
    score: number;
    status: string;
    recommendation: string;
    trainingType: string;
    trainingIntensity: string;
    trainingFocus: string;
    reason: string;
};

export function calculateRecovery(
    input: RecoveryInput
): RecoveryResult {
    const sleepScore = Math.min((input.sleep / 8) * 100, 100);
    const energyScore = ((input.energy - 1) / 4) * 100;
    const sorenessScore = ((5 - input.soreness) / 4) * 100;
    const stressScore = ((5 - input.stress) / 4) * 100;

    const score =
        sleepScore * 0.30 +
        energyScore * 0.25 +
        sorenessScore * 0.25 +
        stressScore * 0.20;

    const roundedScore = Math.round(score);

    let status: string;
    let recommendation: string;
    let trainingType: string;
    let trainingIntensity: string;
    let trainingFocus: string;
    let reason: string;

    if (roundedScore >= 80) {
        status = 'Good Recovery';

        recommendation =
            'You appear ready for a normal training session today.';

        trainingType = 'Normal Training';
        trainingIntensity = 'Moderate to High';
        trainingFocus = 'Strength, speed or sport-specific training';

        reason =
            'Your overall recovery indicators support a normal training session.';
    } else if (roundedScore >= 60) {
        status = 'Moderate Recovery';

        recommendation =
            'Consider reducing training intensity and monitor how you feel.';

        trainingType = 'Reduced Training';
        trainingIntensity = 'Light to Moderate';
        trainingFocus = 'Technique, mobility and controlled training';

        reason =
            'Your recovery is moderate, so reducing intensity can help manage training load.';
    } else {
        status = 'Low Recovery';

        recommendation =
            'Prioritize recovery today with rest, mobility, hydration and adequate sleep.';

        trainingType = 'Recovery Session';
        trainingIntensity = 'Low';
        trainingFocus = 'Mobility, stretching and light movement';

        reason =
            'Your current recovery indicators suggest that a lighter day may be more appropriate.';
    }

    // ---------- Muscle‑aware augmentation ----------
    // Identify muscles with high soreness (rating 4 or 5). Undefined or lower ratings are ignored.
    const muscleRatings: { [key: string]: number | undefined } = {
        legs: input.legsSoreness,
        chest: input.chestSoreness,
        back: input.backSoreness,
        shoulders: input.shouldersSoreness,
        arms: input.armsSoreness,
        core: input.coreSoreness,
    };
    const highSorenessAreas = Object.entries(muscleRatings)
        .filter(([_, v]) => v !== undefined && v >= 4)
        .map(([k]) => k);

    if (highSorenessAreas.length > 0) {
        const hasLeg = highSorenessAreas.includes('legs');
        const hasUpper = ['chest', 'back', 'shoulders', 'arms', 'core'].some((area) =>
            highSorenessAreas.includes(area)
        );

        if (roundedScore >= 80) {
            // Good overall recovery – tailor recommendation based on sore area.
            if (hasLeg) {
                trainingType = 'Upper‑body / Technique Focus';
                trainingIntensity = 'Moderate';
                trainingFocus = 'Upper‑body strength, technique and mobility work';
                reason =
                    'High soreness reported in legs; reduce leg loading and focus on upper‑body or technique work.';
            } else if (hasUpper) {
                trainingType = 'Lower‑body / Technique Focus';
                trainingIntensity = 'Moderate';
                trainingFocus = 'Lower‑body strength, technique and mobility work';
                reason =
                    'High soreness reported in upper‑body areas; reduce upper‑body loading and focus on lower‑body or technique work.';
            }
        } else if (roundedScore >= 60) {
            // Moderate overall recovery – be more conservative.
            trainingType = 'Reduced Training';
            trainingIntensity = 'Light';
            trainingFocus = 'Technique, mobility and avoid heavily loading sore areas';
            const areas = highSorenessAreas.join(', ');
            reason = `Moderate recovery with high soreness in ${areas}; consider a lighter session and avoid heavy loading of those areas.`;
        }
        // For low recovery we keep the original low‑recovery recommendation (recovery session).
    }

    return {
        score: roundedScore,
        status,
        recommendation,
        trainingType,
        trainingIntensity,
        trainingFocus,
        reason,
    };
}