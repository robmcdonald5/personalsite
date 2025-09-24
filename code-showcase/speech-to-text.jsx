const handleMicClick = () => {
    if (!isRecording) {
        // start recording
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Your browser does not support speech recognition. Please use Chrome or Edge.');
            return;
        }
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;
        recognitionRef.current = recognition;
        recognition.onstart = () => setIsRecording(true);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setIsRecording(false);
            const userMessage = { text: transcript, sender: 'user' };
            setMessages((prev) => [...prev, userMessage]);
            processUserInput(transcript);
        };
        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            setIsRecording(false);
            alert('Speech recognition error: ' + event.error);
        };
        recognition.onend = () => setIsRecording(false);
        recognition.start();
    } else {
        // stop recording
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsRecording(false);
        }
    }
};
