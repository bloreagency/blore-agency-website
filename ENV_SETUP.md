# ⚠️ IMPORTANT: Environment Variables Setup

## 🔑 Required API Keys

Create a file named `.env.local` in the root directory with these variables:

```bash
# OpenAI API Key for AI Chatbot
OPENAI_API_KEY=your-openai-key-here

# Resend API Key for Email Automation
RESEND_API_KEY=your-resend-key-here

# Your Email (for receiving leads)
ADMIN_EMAIL=info@bloreagency.com

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 📝 How to Get API Keys:

### OpenAI API Key:
1. Go to: https://platform.openai.com/api-keys
2. Create account or login
3. Click "Create new secret key"
4. Copy the key

### Resend API Key:
1. Go to: https://resend.com
2. Sign up (free)
3. Go to API Keys section
4. Copy the key

## 🔒 Security:

- ✅ `.env.local` is already in `.gitignore`
- ✅ Keys will NOT be committed to Git
- ✅ Safe to use

## ⚠️ REMEMBER:

**After testing, delete the old keys and create new ones!**

1. Delete old OpenAI key: https://platform.openai.com/api-keys
2. Delete old Resend key: https://resend.com/api-keys
3. Create new keys
4. Update `.env.local`
