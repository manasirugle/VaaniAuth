import os
import numpy as np
import torchaudio
import torch
import soundfile as sf
from speechbrain.inference.speaker import EncoderClassifier
from sklearn.metrics.pairwise import cosine_similarity
from speechbrain.utils.fetching import LocalStrategy
os.environ["PATH"] += os.pathsep + r"C:\Users\aryan\Downloads\ffmpeg-8.1-essentials_build\ffmpeg-8.1-essentials_build\bin"

os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"
# Folder where registered embeddings will be stored
USER_FOLDER = "users"
os.makedirs(USER_FOLDER, exist_ok=True)

# Load pretrained SpeechBrain model once
classifier = EncoderClassifier.from_hparams(
    source="speechbrain/spkrec-ecapa-voxceleb",
    savedir="models/speechbrain_ecapa",
    local_strategy=LocalStrategy.COPY
)


def extract_embedding(audio_path: str):
    """
    Extract speaker embedding from an audio file.
    Returns a numpy array.
    """
    # Load audio using soundfile
    signal, fs = sf.read(audio_path)

    # Convert to mono if needed
    if len(signal.shape) > 1:  # Check if stereo
        signal = signal.mean(axis=1)  # Average channels to mono

    # Convert to tensor for SpeechBrain, making sure it is Float32
    signal = torch.tensor(signal, dtype=torch.float32).unsqueeze(0)

    # Resample if not 16kHz
    if fs != 16000:
        resampler = torchaudio.transforms.Resample(orig_freq=fs, new_freq=16000)
        signal = resampler(signal)

    embedding = classifier.encode_batch(signal)

    return embedding.squeeze().detach().cpu().numpy()


def register_user(user_id: str, audio_path: str):
    """
    Register a new user by saving their voice embedding.
    """

    embedding = extract_embedding(audio_path)

    save_path = os.path.join(USER_FOLDER, f"{user_id}_embedding.npy")
    np.save(save_path, embedding)

    return {
        "status": "success",
        "message": f"User {user_id} registered successfully",
        "embedding_path": save_path
    }


def verify_user(user_id: str, audio_path: str):
    """
    Verify a user's voice against stored embedding.
    """

    stored_path = os.path.join(USER_FOLDER, f"{user_id}_embedding.npy")

    if not os.path.exists(stored_path):
        return {
            "status": "error",
            "message": f"No registered voice found for {user_id}"
        }

    stored_embedding = np.load(stored_path)
    current_embedding = extract_embedding(audio_path)

    similarity = cosine_similarity(
        [stored_embedding],
        [current_embedding]
    )[0][0]

    # Thresholds for hackathon demo
    if similarity >= 0.75:
        decision = "accepted"
    elif similarity >= 0.60:
        decision = "suspicious"
    else:
        decision = "rejected"

    return {
        "status": "success",
        "user_id": user_id,
        "similarity_score": round(float(similarity), 4),
        "decision": decision
    }


# Optional quick local testing
if __name__ == "__main__":

    # Register once
    print(register_user(
        user_id="aryan",
        audio_path="samples/Register.wav"
    ))

    # Verify later
    print(verify_user(
        user_id="aryan",
        audio_path="samples/Mom.wav"
    ))