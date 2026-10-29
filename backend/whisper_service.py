import whisper
import os

# Load model once
model = whisper.load_model("base")


def verify_challenge_phrase(audio_path: str, challenge_phrase: str):
    """
    Verifies whether the user spoke the expected challenge phrase.
    """

    try:
        if not os.path.exists(audio_path):
            return {
                "status": "error",
                "message": f"Audio file not found: {audio_path}"
            }

        result = model.transcribe(audio_path)

        spoken = result["text"].strip().lower()
        expected = challenge_phrase.strip().lower()

        phrase_match = expected in spoken

        return {
            "status": "success",
            "expected_phrase": expected,
            "spoken_phrase": spoken,
            "phrase_match": phrase_match,
            "decision": "passed" if phrase_match else "failed"
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }


if __name__ == "__main__":

    challenge_phrase = "secure banking for everyone"

    result = verify_challenge_phrase(
        audio_path="samples/SecureBanking.wav",
        challenge_phrase=challenge_phrase
    )

    print(result)