# NubitTranscribe.AI

Transform your audio and video content into accurate text with our AI-powered transcription service. Fast, secure, and reliable transcription supporting 40+ languages.

## 🚀 Features

- **Lightning Fast**: Get transcriptions in seconds
- **Highly Accurate**: 95%+ accuracy with advanced AI models
- **Secure & Private**: Files encrypted in transit, never stored
- **Multi-language**: Support for 40+ languages
- **AI Analysis**: Topic modeling, key moments, and anomaly detection
- **Multiple Formats**: Support for MP3, WAV, MP4, MOV, AVI, and more

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS
- **API**: Whisper API for transcription
- **AI Analysis**: Anthropic Claude API
- **Deployment**: Azure Static Web Apps
- **Styling**: Modern gradient design with animations

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/nubittranscribe-ai.git
cd nubittranscribe-ai
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Add your Anthropic API key to `.env.local`:
```bash
REACT_APP_ANTHROPIC_API_KEY=your_api_key_here
```

5. Start the development server:
```bash
npm start
```

## 🌐 Live Demo

Visit [NubitTranscribe.AI](https://nubittranscribe.ai) to try the live application.

## 📖 API Documentation

The application includes comprehensive API documentation accessible at `/api-docs` with:
- Complete endpoint reference
- Code examples in multiple languages
- Authentication details
- Error handling guide

## 🔧 Configuration

### Environment Variables

- `REACT_APP_ANTHROPIC_API_KEY`: Your Anthropic API key for AI analysis features

### API Endpoints

- **Transcription**: `https://whisper-api-app-2025.azurewebsites.net/transcribe/`
- **Supported formats**: MP3, WAV, FLAC, M4A, AAC, OGG, WMA, MP4, AVI, MOV, MKV, FLV, WEBM

## 🚀 Deployment

The project is configured for Azure Static Web Apps but can be deployed to any static hosting service:

### Azure Static Web Apps
The repository includes GitHub Actions workflow for automatic deployment.

### Other Platforms
- **Netlify**: Connect repository, set build command to `npm run build`
- **Vercel**: Auto-detects React configuration
- **GitHub Pages**: Build and deploy to `gh-pages` branch

## 📱 Pages

- **Home**: Main transcription interface
- **About**: Company information and mission
- **Pricing**: Subscription plans and features
- **API Docs**: Complete API documentation
- **Contact**: Contact form and information
- **Terms**: Terms of service
- **Privacy**: Privacy policy

## 🎨 Design Features

- Modern gradient design
- Responsive layout for all devices
- Smooth animations and micro-interactions
- Apple-level design aesthetics
- Accessible color contrast
- Professional typography

## 🔒 Security

- Files encrypted in transit
- No file storage on servers
- Environment variables for sensitive data
- HTTPS enforcement
- Privacy-first approach

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- Email: contact@nubitsaitech.com
- Documentation: [API Docs](https://nubittranscribe.ai/api-docs)
- Issues: [GitHub Issues](https://github.com/your-username/nubittranscribe-ai/issues)

## 🏢 Company

**Nubits.AI Technology LLP**
- Website: [nubittranscribe.ai](https://nubittranscribe.ai)
- Email: contact@nubitsaitech.com
- Location: San Francisco, CA

---

Built with ❤️ by the Nubits.AI team