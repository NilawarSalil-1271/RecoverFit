import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'recoverfit_checkins';

export type CheckInRecord = {
    id: string;
    date: string;
    sleep: number;
    energy: number;
    soreness: number;
    stress: number;
    score: number;
    status: string;
    recommendation: string;
};

export async function saveCheckIn(
    record: CheckInRecord
): Promise<void> {
    try {
        const existingData = await AsyncStorage.getItem(STORAGE_KEY);

        const history: CheckInRecord[] = existingData
            ? JSON.parse(existingData)
            : [];

        history.push(record);

        await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(history)
        );
    } catch (error) {
        console.error('Failed to save check-in:', error);
    }
}

export async function getCheckIns(): Promise<CheckInRecord[]> {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);

        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Failed to load check-ins:', error);
        return [];
    }
}