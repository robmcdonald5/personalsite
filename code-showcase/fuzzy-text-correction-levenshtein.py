class MenuFuzzer:
    def __init__(self, menu_items, meats, rice, beans, toppings, debug=False):
        self.debug = debug
        # Build a vocabulary with plural forms
        self.vocabulary = self._build_vocabulary(menu_items, meats, rice, beans, toppings)

    def _build_vocabulary(self, menu_items, meats, rice, beans, toppings):
        vocabulary = {
            'menu_items': set(menu_items),
            'meats': set(meats),
            'rice': set(rice),
            'beans': set(beans),
            'toppings': set(toppings)
        }
        for category, words in vocabulary.items():
            expanded_words = set()
            for word in words:
                expanded_words.add(word)
                # Include simple plural forms to handle plural misspellings
                if not word.endswith('s'):
                    expanded_words.add(f"{word}s")
            vocabulary[category] = expanded_words
        return vocabulary

    def _should_attempt_correction(self, word, candidate):
        # Skip very short words and require matching first and last letters
        if len(word) < 3:
            return False
        return (word[0].lower() == candidate[0].lower() and word[-1].lower() == candidate[-1].lower())

    def _find_closest_match(self, word, max_distance=2):
        # Return early for short words
        if len(word) < 3:
            return word, '', -1
        min_distance = max_distance + 1
        best_match = word
        best_category = ''
        # Check each vocabulary entry for minimal Levenshtein distance
        for category, valid_words in self.vocabulary.items():
            for valid_word in valid_words:
                if not self._should_attempt_correction(word, valid_word):
                    continue
                current_distance = distance(word.lower(), valid_word.lower())
                if current_distance < min_distance and current_distance <= max_distance:
                    min_distance = current_distance
                    best_match = valid_word
                    best_category = category
        if min_distance <= max_distance:
            return best_match, best_category, min_distance
        return word, '', -1

    def correct_text(self, text):
        words = text.split()
        corrections = []
        corrected_words = []
        for word in words:
            # Skip known vocabulary terms
            if any(word.lower() in word_set for word_set in self.vocabulary.values()):
                corrected_words.append(word)
                continue
            corrected_word, category, dist = self._find_closest_match(word)
            if dist != -1:
                corrections.append((word, corrected_word, category))
                corrected_words.append(corrected_word)
            else:
                corrected_words.append(word)
        corrected_text = ' '.join(corrected_words)
        return corrected_text, corrections
