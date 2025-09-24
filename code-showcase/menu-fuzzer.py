class MenuFuzzer:
    def __init__(self, menu_items, meats, rice, beans, toppings, debug=False):
        self.debug = debug
        self.vocabulary = self._build_vocabulary(menu_items, meats, rice, beans, toppings)

    def _should_attempt_correction(self, word: str, candidate: str) -> bool:
        if len(word) < 3:
            return False
        # first and last letters must match to avoid changing meaning
        return (word[0].lower() == candidate[0].lower() and word[-1].lower() == candidate[-1].lower())

    def _find_closest_match(self, word: str, max_distance: int = 2) -> Tuple[str, str, int]:
        if len(word) < 3:
            return word, '', -1
        min_distance = max_distance + 1
        best_match = word
        best_category = ''
        for category, valid_words in self.vocabulary.items():
            for valid_word in valid_words:
                if not self._should_attempt_correction(word, valid_word):
                    continue
                d = distance(word.lower(), valid_word.lower())
                if d < min_distance and d <= max_distance:
                    min_distance = d
                    best_match = valid_word
                    best_category = category
        if min_distance <= max_distance:
            return best_match, best_category, min_distance
        return word, '', -1

    def correct_text(self, text: str) -> Tuple[str, List[Tuple[str, str, str]]]:
        words = text.split()
        corrections = []
        corrected_words = []
        for word in words:
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
        if self.debug and corrections:
            logger.debug("Fuzzy corrections made:")
            for original, corrected, category in corrections:
                logger.debug(f"  {original} -> {corrected} ({category})")
        return corrected_text, corrections
