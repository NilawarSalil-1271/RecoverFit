import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function RecoveryResultScreen() {
    const { score, status, recommendation } =
        useLocalSearchParams<{
            score?: string;
            status?: string;
            recommendation?: string;
        }>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Recovery</Text>

            <View style={styles.scoreCard}>
                <Text style={styles.score}>{score ?? '--'}</Text>

                <Text style={styles.outOf}>/ 100</Text>

                <Text style={styles.status}>
                    {status ?? 'Recovery calculated'}
                </Text>
            </View>

            <View style={styles.recommendationCard}>
                <Text style={styles.heading}>
                    Today's Recommendation
                </Text>

                <Text style={styles.recommendation}>
                    {recommendation ??
                        'Complete your check-in to receive a recommendation.'}
                </Text>
            </View>

            <Pressable
                style={styles.button}
                onPress={() => router.replace('/')}
            >
                <Text style={styles.buttonText}>
                    Back to Home
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#ffffff',
    },

    title: {
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 32,
    },

    scoreCard: {
        alignItems: 'center',
        padding: 32,
        borderRadius: 24,
        backgroundColor: '#f5f5f5',
        marginBottom: 24,
    },

    score: {
        fontSize: 64,
        fontWeight: '700',
    },

    outOf: {
        fontSize: 18,
        color: '#777777',
    },

    status: {
        fontSize: 22,
        fontWeight: '600',
        marginTop: 12,
    },

    recommendationCard: {
        padding: 22,
        borderRadius: 18,
        backgroundColor: '#f5f5f5',
        marginBottom: 24,
    },

    heading: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
    },

    recommendation: {
        fontSize: 16,
        lineHeight: 24,
        color: '#555555',
    },

    button: {
        backgroundColor: '#111111',
        padding: 16,
        borderRadius: 14,
        alignItems: 'center',
    },

    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});