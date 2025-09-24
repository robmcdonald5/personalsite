def process_order_spacy(session_id, input_sentence):
    segments = segment_input(input_sentence)
    # Maintain a mapping of addons for each item
    item_addons = defaultdict(lambda: {"meats": [], "rice": [], "beans": [], "toppings": []})
    items = []
    for seg in segments:
        doc = nlp(seg)
        main_items_in_seg = extract_menu_items(seg)
        if main_items_in_seg:
            main_item = main_items_in_seg[0]
            # Convert a colloquial item name back to its official name
            official_name = name_to_colloquial.get(main_item)
            if official_name:
                main_item = official_name
            items.append(main_item)
            # Match add‑ons using a single PhraseMatcher
            matches = addon_matcher(doc)
            for match_id, start, end in matches:
                span = doc[start:end]
                category = nlp.vocab.strings[match_id]
                addon = span.text.lower()
                # Convert colloquial addon to official name if necessary
                official_addon = name_to_colloquial.get(addon, addon)
                category_key = category.lower()
                if official_addon not in item_addons[main_item][category_key]:
                    item_addons[main_item][category_key].append(official_addon)
    # Code to insert the orders into the database and return a confirmation message is omitted for brevity
