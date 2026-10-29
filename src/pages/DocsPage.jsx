import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar.jsx';
import DocsSidebar from '../components/layout/DocsSidebar.jsx';
import CodeBlock from '../components/ui/CodeBlock.jsx';

const docContent = {
  introduction: {
    title: 'Introduction',
    content: (
      <>
        <p className="text-vaani-muted leading-relaxed mb-6">
          VaaniAuth is a voice authentication API platform that enables developers to add secure, 
          passwordless voice-based identity verification to any application. Our platform provides 
          speaker verification, liveness detection, fraud prevention, and continuous authentication 
          through simple REST APIs.
        </p>
        <div className="glass-card p-6 mb-6">
          <h4 className="text-white font-semibold mb-3">Key Capabilities</h4>
          <ul className="space-y-2 text-sm text-vaani-muted">
            <li className="flex items-center gap-2">• Speaker Verification — Match voice samples against stored voiceprints</li>
            <li className="flex items-center gap-2">• Liveness Detection — Confirm live human presence via challenge phrases</li>
            <li className="flex items-center gap-2">• Fraud Detection — Catch replay attacks, deepfakes, and synthetic audio</li>
            <li className="flex items-center gap-2">• Continuous Auth — Re-verify speaker identity during active sessions</li>
          </ul>
        </div>
        <p className="text-vaani-muted leading-relaxed">
          All API endpoints return JSON responses with confidence scores, risk assessments, and 
          signed JWT tokens for downstream use in your authentication flow.
        </p>
      </>
    ),
  },
  quickstart: {
    title: 'Quick Start',
    content: (
      <>
        <p className="text-vaani-muted leading-relaxed mb-6">
          Get up and running with VaaniAuth in under 5 minutes. This guide walks you through 
          registering a user's voice and performing your first authentication.
        </p>

        <h4 className="text-white font-semibold mb-3">1. Get your API key</h4>
        <p className="text-vaani-muted text-sm mb-4">
          Sign up at <span className="text-vaani-blue">dashboard.vaaniauth.io</span> and generate your API key from the dashboard.
        </p>

        <h4 className="text-white font-semibold mb-3">2. Register a voice</h4>
        <div className="mb-6">
          <CodeBlock
            language="javascript"
            code={`const formData = new FormData();
formData.append('user_id', 'user_123');
formData.append('audio', audioBlob, 'voice.wav');

const response = await fetch('https://api.vaaniauth.io/register', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' },
  body: formData,
});

const result = await response.json();
console.log(result.status); // "success"`}
          />
        </div>

        <h4 className="text-white font-semibold mb-3">3. Authenticate</h4>
        <div className="mb-6">
          <CodeBlock
            language="javascript"
            code={`const formData = new FormData();
formData.append('user_id', 'user_123');
formData.append('audio', audioBlob, 'voice.wav');

const response = await fetch('https://api.vaaniauth.io/authenticate', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' },
  body: formData,
});

const { authenticated, confidence, token } = await response.json();
if (authenticated) {
  // Store token, grant access
}`}
          />
        </div>
      </>
    ),
  },
  installation: {
    title: 'Installation',
    content: (
      <>
        <p className="text-vaani-muted leading-relaxed mb-6">
          Install the VaaniAuth SDK for your preferred language.
        </p>

        <h4 className="text-white font-semibold mb-3">JavaScript / Node.js</h4>
        <div className="mb-6">
          <CodeBlock language="bash" code="npm install @vaaniauth/sdk" showLineNumbers={false} />
        </div>

        <h4 className="text-white font-semibold mb-3">Python</h4>
        <div className="mb-6">
          <CodeBlock language="bash" code="pip install vaaniauth" showLineNumbers={false} />
        </div>

        <h4 className="text-white font-semibold mb-3">Initialize the Client</h4>
        <div className="mb-6">
          <CodeBlock
            language="javascript"
            code={`import { VaaniAuth } from '@vaaniauth/sdk';

const vaani = new VaaniAuth({
  apiKey: process.env.VAANIAUTH_API_KEY,
  region: 'us-east-1', // optional
});`}
          />
        </div>
      </>
    ),
  },
  'auth-api': {
    title: 'Authentication API',
    content: (
      <>
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-mono font-semibold rounded-lg">POST</span>
          <code className="text-sm font-mono text-vaani-muted">/api/authenticate</code>
        </div>
        <p className="text-vaani-muted leading-relaxed mb-6">
          Full authentication pipeline: speaker verification → liveness detection → fraud detection → risk scoring.
        </p>

        <h4 className="text-white font-semibold mb-3">Request Body</h4>
        <div className="mb-6">
          <CodeBlock language="json" code={`{
  "user_id": "string (required)",
  "voice_sample": "base64 encoded audio (required)",
  "challenge_phrase": "string (optional)"
}`} />
        </div>

        <h4 className="text-white font-semibold mb-3">Response</h4>
        <div className="mb-6">
          <CodeBlock language="json" code={`{
  "status": "success",
  "authenticated": true,
  "user_id": "user_123",
  "speaker_score": 0.94,
  "speaker_confidence": "high",
  "speaker_decision": "accepted",
  "phrase_match": true,
  "fraud_score": 0.08,
  "fraud_label": "natural_voice",
  "risk_score": 12,
  "final_decision": "accepted",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}`} />
        </div>

        <h4 className="text-white font-semibold mb-3">Status Codes</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 px-4 text-vaani-muted font-medium">Code</th>
                <th className="text-left py-3 px-4 text-vaani-muted font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="text-vaani-muted">
              <tr className="border-b border-white/5"><td className="py-3 px-4 font-mono text-green-400">200</td><td className="py-3 px-4">Authentication successful</td></tr>
              <tr className="border-b border-white/5"><td className="py-3 px-4 font-mono text-yellow-400">400</td><td className="py-3 px-4">Bad request (missing fields, unregistered user)</td></tr>
              <tr className="border-b border-white/5"><td className="py-3 px-4 font-mono text-red-400">401</td><td className="py-3 px-4">Invalid API key</td></tr>
              <tr><td className="py-3 px-4 font-mono text-red-400">500</td><td className="py-3 px-4">Internal server error</td></tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  'register-api': {
    title: 'Register Voice API',
    content: (
      <>
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-mono font-semibold rounded-lg">POST</span>
          <code className="text-sm font-mono text-vaani-muted">/api/register</code>
        </div>
        <p className="text-vaani-muted leading-relaxed mb-6">
          Register a user's voice by providing a voice sample. The system extracts a unique voiceprint embedding 
          and stores it securely for future verification.
        </p>

        <h4 className="text-white font-semibold mb-3">Request</h4>
        <div className="mb-6">
          <CodeBlock language="json" code={`{
  "user_id": "string (required)",
  "audio": "multipart file upload (WAV, MP3, OGG)"
}`} />
        </div>

        <h4 className="text-white font-semibold mb-3">Response</h4>
        <div className="mb-6">
          <CodeBlock language="json" code={`{
  "status": "success",
  "user_id": "user_123",
  "message": "Voice registered successfully",
  "embedding_id": "emb_abc123"
}`} />
        </div>
      </>
    ),
  },
  'verify-api': {
    title: 'Verify Voice API',
    content: (
      <>
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-mono font-semibold rounded-lg">POST</span>
          <code className="text-sm font-mono text-vaani-muted">/api/verify</code>
        </div>
        <p className="text-vaani-muted leading-relaxed mb-6">
          Verify a speaker's identity by comparing a new voice sample against their stored voiceprint.
          Returns a similarity score and confidence level.
        </p>

        <h4 className="text-white font-semibold mb-3">Response</h4>
        <div className="mb-6">
          <CodeBlock language="json" code={`{
  "status": "success",
  "similarity_score": 0.94,
  "confidence": "high",
  "decision": "accepted",
  "threshold": 0.70
}`} />
        </div>
      </>
    ),
  },
  'fraud-api': {
    title: 'Fraud Detection API',
    content: (
      <>
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-mono font-semibold rounded-lg">POST</span>
          <code className="text-sm font-mono text-vaani-muted">/api/detect-fraud</code>
        </div>
        <p className="text-vaani-muted leading-relaxed mb-6">
          Analyze a voice sample for potential fraud indicators including replay attacks, 
          synthetic speech, deepfake audio, and environmental anomalies.
        </p>

        <h4 className="text-white font-semibold mb-3">Response</h4>
        <div className="mb-6">
          <CodeBlock language="json" code={`{
  "status": "success",
  "fraud_score": 0.08,
  "fraud_label": "natural_voice",
  "reasons": [],
  "spectral_analysis": "passed",
  "replay_detected": false
}`} />
        </div>
      </>
    ),
  },
  'continuous-api': {
    title: 'Continuous Auth API',
    content: (
      <>
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-mono font-semibold rounded-lg">POST</span>
          <code className="text-sm font-mono text-vaani-muted">/api/continuous-auth</code>
        </div>
        <p className="text-vaani-muted leading-relaxed mb-6">
          Re-verify a speaker during an active session. Lightweight verification designed for 
          periodic checks without disrupting the user experience.
        </p>

        <h4 className="text-white font-semibold mb-3">Response</h4>
        <div className="mb-6">
          <CodeBlock language="json" code={`{
  "status": "success",
  "session_status": "session_verified",
  "speaker_score": 0.95,
  "speaker_decision": "accepted"
}`} />
        </div>
      </>
    ),
  },
  'js-sdk': {
    title: 'JavaScript SDK',
    content: (
      <>
        <p className="text-vaani-muted leading-relaxed mb-6">
          The official JavaScript SDK provides a type-safe, Promise-based interface for all VaaniAuth APIs.
        </p>
        <div className="mb-6">
          <CodeBlock language="javascript" code={`import { VaaniAuth } from '@vaaniauth/sdk';

const vaani = new VaaniAuth({ apiKey: 'YOUR_API_KEY' });

// Register a voice
const reg = await vaani.register('user_123', audioBlob);

// Authenticate
const auth = await vaani.authenticate('user_123', audioBlob);
console.log(auth.authenticated); // true
console.log(auth.confidence);    // 0.97

// Continuous auth
const session = await vaani.continuousAuth('user_123', audioBlob);
console.log(session.sessionStatus); // "session_verified"`} />
        </div>
      </>
    ),
  },
  'python-sdk': {
    title: 'Python SDK',
    content: (
      <>
        <p className="text-vaani-muted leading-relaxed mb-6">
          The Python SDK supports both synchronous and async usage.
        </p>
        <div className="mb-6">
          <CodeBlock language="python" code={`from vaaniauth import VaaniAuth

client = VaaniAuth(api_key="YOUR_API_KEY")

# Register
result = client.register(
    user_id="user_123",
    audio_path="./voice_sample.wav"
)

# Authenticate
auth = client.authenticate(
    user_id="user_123",
    audio_path="./voice_sample.wav"
)
print(auth.authenticated)  # True
print(auth.confidence)      # 0.97`} />
        </div>
      </>
    ),
  },
  'rest-api': {
    title: 'REST API',
    content: (
      <>
        <p className="text-vaani-muted leading-relaxed mb-6">
          All VaaniAuth endpoints are accessible via standard REST calls.
        </p>
        <div className="glass-card p-6 mb-6">
          <h4 className="text-white font-semibold mb-3">Base URL</h4>
          <code className="text-sm font-mono text-vaani-blue">https://api.vaaniauth.io/v1</code>
        </div>
        <div className="glass-card p-6">
          <h4 className="text-white font-semibold mb-3">Authentication</h4>
          <p className="text-vaani-muted text-sm mb-3">All requests require a Bearer token in the Authorization header:</p>
          <CodeBlock language="bash" code='Authorization: Bearer YOUR_API_KEY' showLineNumbers={false} />
        </div>
      </>
    ),
  },
  errors: {
    title: 'Error Codes',
    content: (
      <>
        <p className="text-vaani-muted leading-relaxed mb-6">
          VaaniAuth uses conventional HTTP status codes. Here are the specific error codes you may encounter.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 px-4 text-vaani-muted font-medium">Code</th>
                <th className="text-left py-3 px-4 text-vaani-muted font-medium">Type</th>
                <th className="text-left py-3 px-4 text-vaani-muted font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="text-vaani-muted">
              <tr className="border-b border-white/5"><td className="py-3 px-4 font-mono">400</td><td className="py-3 px-4">bad_request</td><td className="py-3 px-4">Missing or invalid parameters</td></tr>
              <tr className="border-b border-white/5"><td className="py-3 px-4 font-mono">401</td><td className="py-3 px-4">unauthorized</td><td className="py-3 px-4">Invalid or missing API key</td></tr>
              <tr className="border-b border-white/5"><td className="py-3 px-4 font-mono">404</td><td className="py-3 px-4">not_found</td><td className="py-3 px-4">User not registered</td></tr>
              <tr className="border-b border-white/5"><td className="py-3 px-4 font-mono">429</td><td className="py-3 px-4">rate_limited</td><td className="py-3 px-4">Too many requests</td></tr>
              <tr><td className="py-3 px-4 font-mono">500</td><td className="py-3 px-4">server_error</td><td className="py-3 px-4">Internal server error</td></tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  'rate-limits': {
    title: 'Rate Limits',
    content: (
      <>
        <p className="text-vaani-muted leading-relaxed mb-6">
          Rate limits vary by plan tier.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 px-4 text-vaani-muted font-medium">Plan</th>
                <th className="text-left py-3 px-4 text-vaani-muted font-medium">Requests/min</th>
                <th className="text-left py-3 px-4 text-vaani-muted font-medium">Requests/month</th>
              </tr>
            </thead>
            <tbody className="text-vaani-muted">
              <tr className="border-b border-white/5"><td className="py-3 px-4">Free</td><td className="py-3 px-4">10</td><td className="py-3 px-4">1,000</td></tr>
              <tr className="border-b border-white/5"><td className="py-3 px-4">Pro</td><td className="py-3 px-4">100</td><td className="py-3 px-4">100,000</td></tr>
              <tr><td className="py-3 px-4">Enterprise</td><td className="py-3 px-4">Unlimited</td><td className="py-3 px-4">Unlimited</td></tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  changelog: {
    title: 'Changelog',
    content: (
      <>
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-vaani-blue/10 text-vaani-blue text-xs font-semibold rounded-lg">v1.2.0</span>
              <span className="text-sm text-vaani-muted-dark">April 2026</span>
            </div>
            <ul className="text-sm text-vaani-muted space-y-1 pl-4">
              <li>• Added continuous authentication endpoint</li>
              <li>• Improved deepfake detection accuracy to 99.2%</li>
              <li>• Added Python SDK async support</li>
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-vaani-blue/10 text-vaani-blue text-xs font-semibold rounded-lg">v1.1.0</span>
              <span className="text-sm text-vaani-muted-dark">March 2026</span>
            </div>
            <ul className="text-sm text-vaani-muted space-y-1 pl-4">
              <li>• Launched multilingual support (50+ languages)</li>
              <li>• Added webhook notifications</li>
              <li>• Reduced average latency to under 150ms</li>
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-vaani-blue/10 text-vaani-blue text-xs font-semibold rounded-lg">v1.0.0</span>
              <span className="text-sm text-vaani-muted-dark">February 2026</span>
            </div>
            <ul className="text-sm text-vaani-muted space-y-1 pl-4">
              <li>• Initial public release</li>
              <li>• Speaker verification, liveness detection, fraud detection</li>
              <li>• JavaScript and Python SDKs</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
};

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  const currentDoc = docContent[activeSection] || docContent.introduction;

  return (
    <div className="min-h-screen bg-vaani-bg">
      <Navbar />
      <div className="flex pt-16">
        <DocsSidebar activeSection={activeSection} onSectionClick={setActiveSection} />

        {/* Main content */}
        <main className="flex-1 ml-64 px-8 lg:px-16 py-12 max-w-4xl">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-vaani-muted-dark mb-6">
              <span>Docs</span>
              <span>/</span>
              <span className="text-vaani-muted">{currentDoc.title}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">{currentDoc.title}</h1>
            <div className="prose-custom">
              {currentDoc.content}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
