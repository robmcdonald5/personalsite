def run_test(test: dict) -> None:
    test_name = test.get("name", "Unnamed Test")
    inputs = test.get("inputs", [])
    session_id = str(uuid.uuid4())  # unique session for each test
    print(f"=== Running {test_name} ===\nSession ID: {session_id}\n")
    for idx, user_input in enumerate(inputs, 1):
        print(f"Input {idx}: {user_input}")
        payload = {"message": user_input, "session_id": session_id}
        try:
            response = requests.post(CHATBOT_URL, json=payload)
            if response.status_code == 200:
                data = response.json()
                chatbot_response = data.get("response", "")
                returned_session_id = data.get("session_id", session_id)
                print(f"Output {idx}: {chatbot_response}\n")
                if returned_session_id != session_id:
                    print(f"[WARNING] Session ID mismatch. Expected {session_id}, got {returned_session_id}\n")
                    session_id = returned_session_id  # update if chatbot changed it
            else:
                print(f"Output {idx}: Error {response.status_code} - {response.text}\n")
        except requests.exceptions.RequestException as e:
            print(f"Output {idx}: Exception occurred - {e}\n")
        time.sleep(0.5)  # brief pause between requests
    print(f"=== {test_name} Completed ===\n{'-'*50}\n")
    reset_session(session_id)
    time.sleep(RESET_DELAY)
