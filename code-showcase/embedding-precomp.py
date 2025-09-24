# Load SpaCy model and Sentence‑BERT model
nlp = spacy.load(config.SPACY_MODEL)
sentence_model = SentenceTransformer(config.SENTENCE_MODEL)

# Prepare patterns and tags from the intents file
all_patterns = []
pattern_tags = []
for intent in intents['intents']:
    tag = intent['tag']
    for pattern in intent['patterns']:
        cleaned_pattern = clean_sentence(pattern)
        all_patterns.append(cleaned_pattern)
        pattern_tags.append(tag)

# Encode all patterns once using the Sentence‑BERT model
pattern_embeddings = sentence_model.encode(all_patterns)
