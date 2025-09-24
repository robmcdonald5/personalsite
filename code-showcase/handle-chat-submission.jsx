const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return; // ignore empty messages
    const userMessage = { text: userInput, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    try {
        const dataToSend = { message: userInput, session_id: sessionId };
        const response = await axios.post(`${baseURL}/chat`, dataToSend, {
            headers: { 'Content-Type': 'application/json' },
        });
        const gptMessage = { text: response.data.response, sender: 'chipotle' };
        setMessages((prev) => [...prev, gptMessage]);
        if (response.data.session_id && response.data.session_id !== sessionId) {
            setSessionId(response.data.session_id);
            localStorage.setItem('session_id', response.data.session_id);
        }
        await fetchOrderDetails();
    } catch (error) {
        console.error('Error sending message:', error);
        setMessages((prev) => [
            ...prev,
            { text: 'Sorry, there was an error. Please try again.', sender: 'chipotle' },
        ]);
    }
    setUserInput('');
};
