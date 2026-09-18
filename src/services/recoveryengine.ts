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
};

export function calculateRecovery(
    input: RecoveryInput
): RecoveryResult {
    // Sleep: 8 hours is treated as the target.
    // We cap the score at 100.
    const sleepScore = Math.min((input.sleep / 8) * 100, 100);

    // Energy: 1-5
    const energyScore = ((input.energy - 1) / 4) * 100;

    // Soreness: lower is better
    const sorenessScore = ((5 - input.soreness) / 4) * 100;

    // Stress: lower is better
    const stressScore = ((5 - input.stress) / 4) * 100;

    // Weighted recovery score
    const score =
        sleepScore * 0.30 +
        energyScore * 0.25 +
        sorenessScore * 0.25 +
        stressScore * 0.20;

    const roundedScore = Math.round(score);

    let status: string;
    let recommendation: string;

    if (roundedScore >= 80) {
        status = 'Good Recovery';
        recommendation =
            'You appear ready for a normal training session today.';
    } else if (roundedScore >= 60) {
        status = 'Moderate Recovery';
        recommendation =
            'Consider reducing training intensity and monitor how you feel.';
    } else {
        status = 'Low Recovery';
        recommendation =
            'Prioritize recovery today with rest, mobility, hydration and adequate sleep.';
    }

    return {
        score: roundedScore,
        status,
        recommendation,
    };
}