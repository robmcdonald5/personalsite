def check_missing_fields(session):
    if session.get("pending_action"):
        return None  # Skip slot-filling if a critical action is pending
    session_id = session['session_id']
    orders = list(db.get_db().Orders.find({"session_id": session_id, "completed": False}))
    for order in orders:
        category = order.get("category", "other")
        if category == "entree":
            for field in ["meats", "rice", "beans", "toppings"]:
                is_field_complete = (
                    order.get(f"{field}_completed", False)
                    or (isinstance(order.get(field), list) and len(order.get(field)) > 0)
                )
                if not is_field_complete:
                    session["missing_field_context"]["order_id"] = order["order_id"]
                    session["missing_field_context"]["field"] = field
                    session["is_fixing"] = True
                    return f"For order {order['order_id']}, {field_prompts[field]}"
        else:
            if not order.get("completed"):
                db.get_db().Orders.update_one(
                    {"session_id": session_id, "order_id": order["order_id"]},
                    {"$set": {"completed": True}}
                )
    session["is_fixing"] = False
    return None
