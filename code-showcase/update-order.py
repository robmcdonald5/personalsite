def update_order(session_id, order_id, field, value):
    if value is None:
        return (f"No modifications provided for {field}.", False)
    # handle "none" selection: set field to empty array and mark as completed
    if isinstance(value, list) and len(value) == 1 and value[0].lower() == "none":
        update_data = {"$set": {field: [], f"{field}_completed": True}}
        db.get_db().Orders.update_one({"session_id": session_id, "order_id": order_id}, update_data)
        # check if all required fields are complete and mark order completed
        order = db.get_db().Orders.find_one({"session_id": session_id, "order_id": order_id})
        required_fields = ["meats", "rice", "beans", "toppings"]
        fields_status = {
            req: (
                order.get(f"{req}_completed", False)
                or (isinstance(order.get(req), list) and len(order.get(req)) > 0)
            )
            for req in required_fields
        }
        if all(fields_status.values()):
            db.get_db().Orders.update_one({"session_id": session_id, "order_id": order_id}, {"$set": {"completed": True}})
        return (f"Set {field} to none for order {order_id}", True)
    # normal case – update with provided values
    update_data = {"$set": {field: value, f"{field}_completed": True}}
    db.get_db().Orders.update_one({"session_id": session_id, "order_id": order_id}, update_data)
    # verify completion again
    order = db.get_db().Orders.find_one({"session_id": session_id, "order_id": order_id})
    required_fields = ["meats", "rice", "beans", "toppings"]
    fields_status = {
        req: (
            order.get(f"{req}_completed", False)
            or (isinstance(order.get(req), list) and len(order.get(req)) > 0)
        )
        for req in required_fields
    }
    if all(fields_status.values()):
        db.get_db().Orders.update_one({"session_id": session_id, "order_id": order_id}, {"$set": {"completed": True}})
    # construct message summarising the update
    return (f"Updated order {order_id} with {field}: {', '.join(value) if value else 'none'}", True)
