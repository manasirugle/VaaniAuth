import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import { CodeTabs } from '../ui/CodeBlock.jsx';

const jsCode = `const response = await fetch('https://api.vaaniauth.io/authenticate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id: 'user_123',
    voice_sample: base64Audio,
  }),
});

const result = await response.json();
// {
//   "authenticated": true,
//   "confidence": 0.97,
//   "risk_score": 12,
//   "token": "eyJhbGciOiJIUzI1NiIs..."
// }`;

const pythonCode = `import requests

response = requests.post(
    "https://api.vaaniauth.io/authenticate",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
    },
    json={
        "user_id": "user_123",
        "voice_sample": base64_audio,
    },
)

result = response.json()
# {
#   "authenticated": True,
#   "confidence": 0.97,
#   "risk_score": 12,
#   "token": "eyJhbGciOiJIUzI1NiIs..."
# }`;

const curlCode = `curl -X POST https://api.vaaniauth.io/authenticate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "user_id": "user_123",
    "voice_sample": "base64_encoded_audio_data"
  }'

# Response:
# {
#   "authenticated": true,
#   "confidence": 0.97,
#   "risk_score": 12,
#   "token": "eyJhbGciOiJIUzI1NiIs..."
# }`;

const responseSample = `{
  "authenticated": true,
  "confidence": 0.97,
  "risk_score": 12,
  "speaker_match": 0.98,
  "liveness_passed": true,
  "fraud_label": "natural_voice",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`;

export default function APIPreview() {
  return (
    <section className="py-24 relative" id="api">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Built for Developers"
          subtitle="Clean, intuitive APIs with comprehensive SDKs. Ship voice authentication in minutes, not months."
        />

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Code tabs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Terminal size={16} className="text-vaani-blue" />
              <span className="text-sm font-mono text-vaani-muted">POST /api/authenticate</span>
            </div>

            <CodeTabs
              tabs={[
                { label: 'JavaScript', language: 'javascript', code: jsCode },
                { label: 'Python', language: 'python', code: pythonCode },
                { label: 'cURL', language: 'curl', code: curlCode },
              ]}
            />
          </motion.div>

          {/* Right: Response */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm font-mono text-vaani-muted">Response · 200 OK</span>
            </div>

            <div className="code-block p-6">
              <pre className="text-[13px] leading-relaxed font-mono">
                <span className="code-comment">// Successful authentication response</span>{'\n'}
                <span dangerouslySetInnerHTML={{ __html: highlightJSON(responseSample) }} />
              </pre>
            </div>

            {/* Features below response */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { label: 'Avg Response', value: '< 200ms' },
                { label: 'Uptime SLA', value: '99.99%' },
                { label: 'Languages', value: '50+' },
                { label: 'Encryption', value: 'AES-256' },
              ].map(stat => (
                <div key={stat.label} className="glass-card p-4">
                  <p className="text-xs text-vaani-muted mb-1">{stat.label}</p>
                  <p className="text-lg font-bold gradient-text">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function highlightJSON(json) {
  return json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"(\w+)"(\s*:)/g, '<span class="code-property">"$1"</span>$2')
    .replace(/: "(.*?)"/g, ': <span class="code-string">"$1"</span>')
    .replace(/: (\d+\.?\d*)/g, ': <span class="code-number">$1</span>')
    .replace(/: (true|false|null)/g, ': <span class="code-keyword">$1</span>');
}
