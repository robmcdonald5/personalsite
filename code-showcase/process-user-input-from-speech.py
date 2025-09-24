const processUserInput = async (transcript) => {
    if (!transcript.trim()) {
        return; // Don't send empty messages
    }
    try {
        const dataToSend = {
            message: transcript,
            session_id: sessionId,
        };
        const response = await axios.post(`${baseURL}/chat`, dataToSend);
        const gptMessage = { text: response.data.response, sender: 'chipotle' };
        setMessages((prev) => [...prev, gptMessage]);
        if (response.data.session_id && response.data.session_id !== sessionId) {
            setSessionId(response.data.session_id);
            localStorage.setItem('session_id', response.data.session_id);
        }
    } catch (error) {
        console.error('Error sending message:', error);
        const errorMessage = { text: 'Sorry, there was an error. Please try again.', sender: 'chipotle' };
        setMessages((prev) => [...prev, errorMessage]);
    }
};
