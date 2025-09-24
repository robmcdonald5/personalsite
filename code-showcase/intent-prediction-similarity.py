def predict_intent(user_input):
    cleaned_input = clean_sentence(user_input)
    input_embedding = sentence_model.encode([cleaned_input])[0]

    # Compute cosine similarity between the input and all patterns
    cosine_similarities = np.dot(pattern_embeddings, input_embedding) / (
        np.linalg.norm(pattern_embeddings, axis=1) * np.linalg.norm(input_embedding)
    )

    # Compute Euclidean distance
    euclidean_distances = np.linalg.norm(pattern_embeddings - input_embedding, axis=1)

    # Compute Jaccard similarity on token sets
    input_tokens = set(cleaned_input.split())
    jaccard_similarities = np.array([
        len(input_tokens.intersection(set(pattern.split()))) / len(input_tokens.union(set(pattern.split())))
        if len(input_tokens.union(set(pattern.split()))) > 0 else 0
        for pattern in all_patterns
    ])

    # Compute Word Mover’s Distance (via spaCy similarity)
    wmd_distances = np.array([
        nlp(cleaned_input).similarity(nlp(pattern))
        for pattern in all_patterns
    ])

    # Normalize distances to [0, 1]
    scaler = MinMaxScaler()
    normalized_euclidean = scaler.fit_transform(euclidean_distances.reshape(-1, 1)).flatten()
    normalized_wmd = scaler.fit_transform(wmd_distances.reshape(-1, 1)).flatten()

    # Dynamically choose metric weights based on input length
    input_length = len(cleaned_input.split())
    weights = config.SHORT_INPUT_WEIGHTS if input_length <= 3 else config.LONG_INPUT_WEIGHTS

    # Combine metrics into a single score
    combined_scores = (
        weights['cosine'] * cosine_similarities +
        weights['euclidean'] * (1 - normalized_euclidean) +
        weights['jaccard'] * jaccard_similarities +
        weights['wmd'] * (1 - normalized_wmd)
    )

    # Pick the best tag and calculate a confidence level
    top_indices = np.argsort(combined_scores)[-3:][::-1]
    top_tags = [pattern_tags[i] for i in top_indices]
    top_scores = combined_scores[top_indices]

    if top_scores[0] >= SIMILARITY_THRESHOLD_HIGH:
        confidence = (
            "medium"
            if len(top_scores) > 1 and (top_scores[0] - top_scores[1]) < config.CONFIDENCE_MARGIN
            else "high"
        )
    elif top_scores[0] >= SIMILARITY_THRESHOLD_MEDIUM:
        confidence = "medium"
    else:
        confidence = "low"

    return top_tags[0], confidence
