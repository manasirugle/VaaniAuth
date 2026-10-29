import numpy as np
import librosa
import os


def extract_voice_features(audio_path: str):
    """
    Extracts audio features useful for fraud detection.
    Returns a dictionary of feature values.
    """

    if not os.path.exists(audio_path):
        raise FileNotFoundError(f"Audio file not found: {audio_path}")

    y, sr = librosa.load(audio_path, sr=16000)

    # Pitch extraction
    pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
    pitch_values = pitches[pitches > 0]
    pitch_values = pitch_values[pitch_values < 400]

    pitch_variation = (
        np.std(pitch_values) if len(pitch_values) > 0 else 0
    )

    # Spectral flatness (detects overly smooth audio)
    sf_feat = librosa.feature.spectral_flatness(y=y)
    spectral_flatness = np.nan_to_num(sf_feat.mean())

    # Background noise variance
    background_variance = np.nan_to_num(np.var(y))

    # Zero crossing rate (waveform activity)
    zcr_feat = librosa.feature.zero_crossing_rate(y)
    zcr = np.nan_to_num(zcr_feat.mean())

    # RMS energy (helps detect unnatural silence patterns)
    rms_feat = librosa.feature.rms(y=y)
    rms = np.nan_to_num(rms_feat.mean())

    # Silence ratio (portion of near-silent samples)
    silence_ratio = np.nan_to_num(np.mean(np.abs(y) < 0.01))

    return {
        "pitch_variation": float(np.nan_to_num(pitch_variation)),
        "spectral_flatness": float(spectral_flatness),
        "background_variance": float(background_variance),
        "zero_crossing_rate": float(zcr),
        "rms_energy": float(rms),
        "silence_ratio": float(silence_ratio)
    }


def detect_voice_fraud(audio_path: str):
    """
    Detects potential replay attacks or synthetic voices
    using heuristic rules.
    """

    features = extract_voice_features(audio_path)

    fraud_score = 0
    reasons = []

    # 1. Background variance (MOST IMPORTANT for replay)
    if features["background_variance"] < 0.0002:
        fraud_score += 30
        reasons.append("very_low_background_variance")

    # 2. Spectral flatness (more relaxed)
    if features["spectral_flatness"] < 0.008:
        fraud_score += 20
        reasons.append("overly_flat_spectrum")

    # 3. Pitch variation (reduce sensitivity)
    if features["pitch_variation"] < 50:
        fraud_score += 20
        reasons.append("low_pitch_variation")

    # 4. Zero crossing (adjust threshold)
    if features["zero_crossing_rate"] < 0.03:
        fraud_score += 15
        reasons.append("low_wave_activity")

    # 5. RMS energy (optional minor factor)
    if features["rms_energy"] < 0.008:
        fraud_score += 15
        reasons.append("low_energy")

    # Silence ratio (replay often has cleaner silence)
    if features["silence_ratio"] > 0.75:
        fraud_score += 20
        reasons.append("too_much_clean_silence")

    # Risk classification
    if fraud_score >= 65:
        label = "likely_replay_or_synthetic"

    elif fraud_score >= 35:
        label = "suspicious"

    else:
        label = "natural_voice"
    return {
        "fraud_score": fraud_score,
        "fraud_label": label,
        "reasons": reasons,
        "features": features
    }


def get_fraud_risk_level(fraud_score: int):
    """
    Converts fraud score into risk level.
    """

    if fraud_score >= 60:
        return {
            "risk_level": "high",
            "risk_score": 90
        }

    elif fraud_score >= 30:
        return {
            "risk_level": "medium",
            "risk_score": 50
        }

    else:
        return {
            "risk_level": "low",
            "risk_score": 10
        }


if __name__ == "__main__":

    test_files = {
        "REAL VOICE": "samples/real/prerna.wav",
        "RECORDED REPLAY": "samples/recorded/prerna_recorded.wav",
        "OTHER PERSON": "samples/other_person/SecureBanking.wav"
    }

    for label, path in test_files.items():

        print("\n==============================")
        print(f"TEST CASE: {label}")
        print("==============================")

        result = detect_voice_fraud(path)

        print("Fraud Score:", result["fraud_score"])
        print("Fraud Label:", result["fraud_label"])
        print("Reasons:", result["reasons"])
        print("Features:", result["features"])