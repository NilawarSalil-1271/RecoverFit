export type RecoveryInput = {
    sleep: number;
    energy: number;
    soreness: number;
    stress: number;
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