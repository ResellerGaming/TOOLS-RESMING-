let selectedAI = null;
let chatHistory = [];

const apiEndpoints = {
    chatgpt: 'https://api.resellergaming.my.id/ai/chatgpt?question=',
    gemini: 'https://api.resellergaming.my.id/ai/gemini?question=',
    grok: 'https://api.resellergaming.my.id/ai/grok?question=',
    aicoder: 'https://api.resellergaming.my.id/tools/aicoder?text='
};

const aiNames = {
    chatgpt: 'ChatGPT',
    gemini: 'Gemini',
    grok: 'Grok',
    aicoder: 'AI Coder'
};

// Event listeners
document.querySelectorAll('.ai-card').forEach(card => {
    card.addEventListener('click', () => selectAI(card.dataset.ai));
});

document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
document.getElementById('clear-chat').addEventListener('click', clearChat);

function selectAI(ai) {
    selectedAI = ai;
    
    // Update UI
    document.querySelectorAll('.ai-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`[data-ai="${ai}"]`).classList.add('selected');
    
    document.getElementById('current-ai').textContent = `Menggunakan: ${aiNames[ai]}`;
    document.getElementById('message-input').disabled = false;
    document.getElementById('send-btn').disabled = false;
    document.getElementById('clear-chat').style.display = 'block';
    
    // Clear chat
    clearChat();
    addMessage('ai', `Halo! Saya ${aiNames[ai]} siap membantu Anda. Apa yang ingin Anda tanyakan?`);
}

function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (!message || !selectedAI) return;
    
    // Add user message
    addMessage('user', message);
    input.value = '';
    
    // Show loading
    document.getElementById('loading').style.display = 'block';
    
    // Send to API
    fetch(apiEndpoints[selectedAI] + encodeURIComponent(message))
        .then(response => response.text())
        .then(data => {
            document.getElementById('loading').style.display = 'none';
            addMessage('ai', data);
        })
        .catch(error => {
            document.getElementById('loading').style.display = 'none';
            addMessage('ai', 'Maaf, terjadi kesalahan. Silakan coba lagi.');
            console.error('Error:', error);
        });
}

function addMessage(sender, text) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    chatBox.appendChild(messageDiv);
    
    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
    
    // Store in history
    chatHistory.push({ sender, text });
}

function clearChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';
    chatHistory = [];
    
    if (selectedAI) {
        addMessage('ai', `Halo! Saya ${aiNames[selectedAI]} siap membantu Anda. Apa yang ingin Anda tanyakan?`);
    } else {
        chatBox.innerHTML = `
            <div class="welcome-message">
                <i class="fas fa-comments"></i>
                <h3>Selamat Datang di AI Hub</h3>
                <p>Pilih salah satu AI di atas untuk memulai percakapan</p>
            </div>
        `;
    }
                            }}

function clearChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';
    chatHistory = [];

    if (selectedAI) {
        addMessage('ai', `Halo! Saya ${aiNames[selectedAI]} siap membantu Anda. Apa yang ingin Anda tanyakan?`);
    } else {
        chatBox.innerHTML = `
            <div class="welcome-message">
                <i class="fas fa-comments"></i>
                <h3>Selamat Datang di AI Hub</h3>
                <p>Pilih salah satu AI di atas untuk memulai percakapan</p>
            </div>
        `;
    }
}

// Auto-resize textarea
input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px';
});}

function clearChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';
    chatHistory = [];

    if (selectedAI) {
        addMessage('ai', `Halo! Saya ${aiNames[selectedAI]} siap membantu Anda. Apa yang ingin Anda tanyakan?`);
    } else {
        chatBox.innerHTML = `
            <div class="welcome-message">
                <i class="fas fa-comments"></i>
                <h3>Selamat Datang di AI Hub</h3>
                <p>Pilih salah satu AI di atas untuk memulai percakapan</p>
            </div>
        `;
    }
}

// Auto-resize textarea
input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px';
});            </div>
        `;
    }
}
