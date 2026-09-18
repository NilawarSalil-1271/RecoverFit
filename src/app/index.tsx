import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>RecoverFit</Text>

        <Text style={styles.tagline}>
          Train smarter. Recover better.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.question}>
          How are you feeling today?
        </Text>

        <Text style={styles.description}>
          Complete your daily check-in to understand your
          recovery and get a personalized training
          recommendation.
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => router.push('/check-in')}
        >
          <Text style={styles.buttonText}>
            Start Check-in
          </Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.push('/progress')}
        >
          <Text style={styles.secondaryButtonText}>
            View Progress
          </Text>
        </Pressable>
      </View>

      <Text style={styles.footer}>
        Your recovery. Your training. Your progress.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },

  title: {
    fontSize: 38,
    fontWeight: '700',
    marginBottom: 8,
  },

  tagline: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 40,
  },

  card: {
    padding: 24,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },

  question: {
    fontSize: 23,
    fontWeight: '600',
    marginBottom: 12,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666666',
    marginBottom: 24,
  },

  button: {
    backgroundColor: '#111111',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },

  secondaryButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dddddd',
  },

  secondaryButtonText: {
    color: '#111111',
    fontSize: 17,
    fontWeight: '600',
  },

  footer: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 14,
    color: '#999999',
  },
});