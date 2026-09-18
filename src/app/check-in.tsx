import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { saveCheckIn } from '../services/checkInStorage';
import { calculateRecovery } from '../services/recoveryengine';

export default function CheckInScreen() {
    const [sleep, setSleep] = useState('');
    const [energy, setEnergy] = useState<number | null>(null);
    const [soreness, setSoreness] = useState<number | null>(null);
    const [stress, setStress] = useState<number | null>(null);

    const submitCheckIn = async () => {
        if (
            !sleep ||
            energy === null ||
            soreness === null ||
            stress === null
        ) {
            Alert.alert(
                'Incomplete check-in',
                'Please answer all questions before continuing.'
            );
            return;
        }

        const sleepValue = Number(sleep);

        if (isNaN(sleepValue) || sleepValue <= 0 || sleepValue > 24) {
            Alert.alert(
                'Invalid sleep hours',
                'Please enter a valid number of sleep hours.'
            );
            return;
        }

        // Calculate recovery score
        const recovery = calculateRecovery({
            sleep: sleepValue,
            energy,
            soreness,
            stress,
        });

        // Save check-in to local storage
        await saveCheckIn({
            id: Date.now().toString(),
            date: new Date().toISOString(),
            sleep: sleepValue,
            energy,
            soreness,
            stress,
            score: recovery.score,
            status: recovery.status,
            recommendation: recovery.recommendation,
        });

        // Show recovery result
        router.push({
            pathname: '/recovery-result',
            params: {
                score: recovery.score.toString(),
                status: recovery.status,
                recommendation: recovery.recommendation,
                trainingType: recovery.trainingType,
                trainingIntensity: recovery.trainingIntensity,
                trainingFocus: recovery.trainingFocus,
                reason: recovery.reason,
            },
        });
    };

    const RatingButtons = ({
        value,
        onChange,
    }: {
        value: number | null;
        onChange: (value: number) => void;
    }) => {
        return (
            <View style={styles.ratingRow}>
                {[1, 2, 3, 4, 5].map((number) => (
                    <Pressable
                        key={number}
                        style={[
                            styles.ratingButton,
                            value === number && styles.ratingButtonSelected,
                        ]}
                        onPress={() => onChange(number)}
                    >
                        <Text
                            style={[
                                styles.ratingText,
                                value === number && styles.ratingTextSelected,
                            ]}
                        >
                            {number}
                        </Text>
                    </Pressable>
                ))}
            </View>
        );
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
        >
            <Text style={styles.title}>Daily Check-in</Text>

            <Text style={styles.subtitle}>
                Tell us how you're feeling today.
            </Text>

            {/* Sleep */}
            <View style={styles.card}>
                <Text style={styles.question}>
                    How many hours did you sleep?
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="e.g. 7.5"
                    placeholderTextColor="#999999"
                    keyboardType="decimal-pad"
                    value={sleep}
                    onChangeText={setSleep}
                />
            </View>

            {/* Energy */}
            <View style={styles.card}>
                <Text style={styles.question}>
                    How is your energy level?
                </Text>

                <Text style={styles.scaleText}>
                    1 = Very Low   •   5 = Excellent
                </Text>

                <RatingButtons
                    value={energy}
                    onChange={setEnergy}
                />
            </View>

            {/* Soreness */}
            <View style={styles.card}>
                <Text style={styles.question}>
                    How sore are your muscles?
                </Text>

                <Text style={styles.scaleText}>
                    1 = No soreness   •   5 = Very sore
                </Text>

                <RatingButtons
                    value={soreness}
                    onChange={setSoreness}
                />
            </View>

            {/* Stress */}
            <View style={styles.card}>
                <Text style={styles.question}>
                    How stressed do you feel?
                </Text>

                <Text style={styles.scaleText}>
                    1 = Very relaxed   •   5 = Very stressed
                </Text>

                <RatingButtons
                    value={stress}
                    onChange={setStress}
                />
            </View>

            {/* Submit */}
            <Pressable
                style={styles.submitButton}
                onPress={submitCheckIn}
            >
                <Text style={styles.submitButtonText}>
                    Complete Check-in
                </Text>
            </Pressable>

            <Text style={styles.footer}>
                Your answers are used to calculate your recovery score.
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        paddingBottom: 40,
        backgroundColor: '#ffffff',
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
    },

    card: {
        padding: 20,
        borderRadius: 18,
        backgroundColor: '#f5f5f5',
        marginBottom: 18,
    },

    question: {
        fontSize: 19,
        fontWeight: '600',
        marginBottom: 10,
    },

    scaleText: {
        fontSize: 13,
        color: '#777777',
        marginBottom: 16,
    },

    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 17,
    },

    ratingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    ratingButton: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#dddddd',
    },

    ratingButtonSelected: {
        backgroundColor: '#111111',
        borderColor: '#111111',
    },

    ratingText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#333333',
    },

    ratingTextSelected: {
        color: '#ffffff',
    },

    submitButton: {
        backgroundColor: '#111111',
        paddingVertical: 17,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 6,
    },

    submitButtonText: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: '600',
    },

    footer: {
        textAlign: 'center',
        color: '#999999',
        fontSize: 13,
        marginTop: 18,
    },
});