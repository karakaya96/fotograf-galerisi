import requests

api_key = "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"
url = "https://openrouter.ai/api/v1/chat/completions"

# ASCII karakter kullandık
headers = {
    "Authorization": f"Bearer {api_key}",
    "HTTP-Referer": "https://seninsiten.com",
    "X-Title": "BenimAppIsmim"  # Türkçe karakter kaldırıldı
}

data = {
    "model": "x-ai/grok-4.1-fast",  # Ücretsiz model
    "messages": [
        {"role": "user", "content": "Merhaba, nasılsın?"}
    ]
}

# JSON verisini 'json=' ile gönderiyoruz, böylece headers otomatik ayarlanıyor
resp = requests.post(url, headers=headers, json=data)

# Yanıtı yazdır
print(resp.json())
