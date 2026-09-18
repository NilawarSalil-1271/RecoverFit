import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    CheckInRecord,
    getCheckIns,
} from '../services/checkInStorage';

export default function ProgressScreen() {
    const [history, setHistory] = useState<CheckInRecord[]>([]);
    const [loading, setLoading] = useState(true);

    const loadHistory = async () => {
        setLoading(true);

        const data = await getCheckIns();

        // Newest first
        setHistory([...data].reverse());

        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            loadHistory();
        }, [])
    );

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
        });
    };

    // -----------------------------
    // Statistics
    // -----------------------------

    const scores = history.map((item) => item.score);

    const averageScore =
        scores.length > 0
            ? Math.round(
                scores.reduce((sum, score) => sum + score, 0) /
                scores.length
            )
            : 0;

    const highestScore =
        scores.length > 0 ? Math.max(...scores) : 0;

    const lowestScore =
        scores.length > 0 ? Math.min(...scores) : 0;

    const latest = history[0];

    // -----------------------------
    // Loading
    // -----------------------------

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />

                <Text style={styles.loadingText}>
                    Loading your progress...
                </Text>
            </View>
        );
    }

    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >
            <Text style={styles.title}>
                Recovery Progress
            </Text>

            <Text style={styles.subtitle}>
                Understand how your recovery changes over time.
            </Text>

            {/* Latest Score */}

            {latest && (
                <View style={styles.latestCard}>
                    <Text style={styles.latestLabel}>
                        Latest Recovery
                    </Text>

                    <Text style={styles.latestScore}>
                        {latest.score}
                    </Text>

                    <Text style={styles.outOf}>
                        / 100
                    </Text>

                    <Text style={styles.latestStatus}>
                        {latest.status}
                    </Text>
                </View>
            )}

            {/* Statistics */}

            <Text style={styles.sectionTitle}>
                Your Statistics
            </Text>

            <View style={styles.statsRow}>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>
                        {averageScore}
                    </Text>

                    <Text style={styles.statLabel}>
                        Average
                    </Text>
                </View>

                <View style={styles.statCard}>
                    <Text style={styles.statValue}>
                        {highestScore}
                    </Text>

                    <Text style={styles.statLabel}>
                        Highest
                    </Text>
                </View>

                <View style={styles.statCard}>
                    <Text style={styles.statValue}>
                        {lowestScore}
                    </Text>

                    <Text style={styles.statLabel}>
                        Lowest
                    </Text>
                </View>
            </View>

            {/* Check-in Count */}

            <View style={styles.countCard}>
                <View>
                    <Text style={styles.countTitle}>
                        Check-ins completed
                    </Text>

                    <Text style={styles.countSubtitle}>
                        Keep checking in to build your recovery history.
                    </Text>
                </View>

                <Text style={styles.countNumber}>
                    {history.length}
                </Text>
            </View>

            {/* History */}

            <Text style={styles.sectionTitle}>
                Recent Check-ins
            </Text>

            {history.length === 0 ? (
                <View style={styles.emptyCard}>
                    <Text style={styles.emptyTitle}>
                        No check-ins yet
                    </Text>

                    <Text style={styles.emptyText}>
                        Complete your first daily check-in to start
                        tracking your recovery.
                    </Text>
                </View>
            ) : (
                history.map((item) => (
                    <View
                        key={item.id}
                        style={styles.historyCard}
                    >
                        <View style={styles.historyInfo}>
                            <Text style={styles.date}>
                                {formatDate(item.date)}
                            </Text>

                            <Text style={styles.historyStatus}>
                                {item.status}
                            </Text>

                            <Text style={styles.metrics}>
                                Sleep {item.sleep}h • Energy {item.energy}
                                /5 • Soreness {item.soreness}/5
                            </Text>
                        </View>

                        <View style={styles.scoreContainer}>
                            <Text style={styles.historyScore}>
                                {item.score}
                            </Text>

                            <Text style={styles.historyOutOf}>
                                /100
                            </Text>
                        </View>
                    </View>
                ))
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        paddingBottom: 50,
        backgroundColor: '#ffffff',
    },

    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },

    loadingText: {
        marginTop: 12,
        color: '#666666',
    },

    title: {
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 24,
        lineHeight: 23,
    },

    latestCard: {
        alignItems: 'center',
        padding: 28,
        borderRadius: 22,
        backgroundColor: '#f5f5f5',
        marginBottom: 28,
    },

    latestLabel: {
        fontSize: 15,
        color: '#666666',
        marginBottom: 8,
    },

    latestScore: {
        fontSize: 64,
        fontWeight: '700',
    },

    outOf: {
        fontSize: 17,
        color: '#777777',
    },

    latestStatus: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 10,
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 14,
    },

    statsRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 18,
    },

    statCard: {
        flex: 1,
        paddingVertical: 18,
        paddingHorizontal: 8,
        borderRadius: 16,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },

    statValue: {
        fontSize: 27,
        fontWeight: '700',
    },

    statLabel: {
        fontSize: 13,
        color: '#777777',
        marginTop: 5,
    },

    countCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderRadius: 18,
        backgroundColor: '#f5f5f5',
        marginBottom: 30,
    },

    countTitle: {
        fontSize: 17,
        fontWeight: '600',
    },

    countSubtitle: {
        fontSize: 13,
        color: '#777777',
        marginTop: 5,
        maxWidth: 230,
    },

    countNumber: {
        fontSize: 34,
        fontWeight: '700',
    },

    emptyCard: {
        padding: 24,
        borderRadius: 18,
        backgroundColor: '#f5f5f5',
    },

    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },

    emptyText: {
        fontSize: 15,
        color: '#666666',
        lineHeight: 22,
    },

    historyCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 18,
        borderRadius: 16,
        backgroundColor: '#f5f5f5',
        marginBottom: 12,
    },

    historyInfo: {
        flex: 1,
        paddingRight: 10,
    },

    date: {
        fontSize: 16,
        fontWeight: '600',
    },

    historyStatus: {
        fontSize: 13,
        color: '#777777',
        marginTop: 4,
    },

    metrics: {
        fontSize: 12,
        color: '#888888',
        marginTop: 7,
    },

    scoreContainer: {
        alignItems: 'flex-end',
    },

    historyScore: {
        fontSize: 28,
        fontWeight: '700',
    },

    historyOutOf: {
        fontSize: 12,
        color: '#888888',
    },
});