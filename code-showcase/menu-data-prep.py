def segment_input(input_sentence):
    # Replace spelled‑out numbers with digits
    input_sentence = replace_spelled_numbers(input_sentence)
    articles = ["a", "an", "the"]
    pattern = r"(?=\b(?:\d+|" + "|".join(articles) + r")\b)"
    substrings = re.split(pattern, input_sentence)
    # Remove empty segments
    return [s.strip() for s in substrings if s.strip()]

def fetch_menu_data():
    menu_item_collection = db.get_db()['MenuItem']
    all_items = list(menu_item_collection.find({}))
    menu = {}
    name_to_colloquial = {}
    for item in all_items:
        name = item['name'].lower()
        price = item['size_details'][0].get('price', 0) if 'size_details' in item and item['size_details'] else 0
        category = item.get('category', 'other')
        colloquial = item.get('colloquialism', '').lower() if item.get('colloquialism') else None
        # Normalize category to lowercase or default
        if isinstance(category, list):
            category = [c.lower() for c in category]
        elif isinstance(category, str):
            category = category.lower()
        else:
            category = 'other'
        menu[name] = {'price': price, 'category': category}
        # Map colloquial names to official menu entries
        if colloquial:
            name_to_colloquial[colloquial] = name
            menu[colloquial] = menu[name]
    # Additional code builds lists of meats, rice, beans and toppings and identifies main menu items
    return menu, meats, rice, beans, toppings, main_items, name_to_colloquial
