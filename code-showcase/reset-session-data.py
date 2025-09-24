@app.route('/reset_session', methods=['POST'])
def reset_session():
    try:
        data = request.get_json()
        session_id = data.get('session_id')
        if not session_id:
            logger.warning("reset_session called without session_id.")
            return jsonify({"error": "session_id not provided."}), 400
        db_instance = db.get_db()
        result_orders = db_instance.Orders.delete_many({"session_id": session_id})
        result_sessions = db_instance.Sessions.delete_one({"session_id": session_id})
        logger.info(f"Deleted {result_orders.deleted_count} orders and {result_sessions.deleted_count} sessions for session_id {session_id}.")
        return jsonify({"status": "Session reset successfully."}), 200
    except Exception as e:
        logger.error(f"Error resetting session {session_id}: {e}")
        return jsonify({"error": "Internal server error."}), 500
