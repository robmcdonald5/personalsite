@app.route('/get_menu_items', methods=['GET'])
def get_menu_items():
    try:
        db_instance = db.get_db()
        if db_instance is None:
            logger.error("Database connection failed")
            return jsonify({"menu_items": [], "error": "Database connection failed"}), 500
        # List collections for debugging
        try:
            collections = db_instance.list_collection_names()
            logger.debug(f"Available collections: {collections}")
        except Exception as e:
            logger.error(f"Error listing collections: {str(e)}")
            return jsonify({"menu_items": [], "error": "Failed to list collections"}), 500
        # Fetch menu items, projecting only needed fields
        try:
            menu_items = list(db_instance.MenuItem.find({}, {"name": 1, "category": 1, "size_details": 1, "_id": 0}))
        except Exception as e:
            logger.error(f"Error querying MenuItem collection: {str(e)}")
            return jsonify({"menu_items": [], "error": "Failed to query menu items"}), 500
        # Process menu items into a simplified structure
        processed_items = []
        for item in menu_items:
            try:
                base_price = 0
                if 'size_details' in item and item['size_details']:
                    base_price = item['size_details'][0].get('price', 0)
                processed_items.append({
                    "name": item.get('name', 'Unknown Item'),
                    "category": item.get('category', ['Uncategorized']),
                    "price": base_price
                })
            except Exception as e:
                logger.error(f"Error processing menu item {item}: {str(e)}")
                continue
        if len(processed_items) == 0:
            logger.warning("No menu items found in database")
            return jsonify({"menu_items": [], "message": "No menu items available"}), 200
        return jsonify({"menu_items": processed_items, "count": len(processed_items) }), 200
    except Exception as e:
        logger.exception(f"Unexpected error in get_menu_items: {str(e)}")
        return jsonify({"menu_items": [], "error": "Internal server error", "details": str(e) }), 500
