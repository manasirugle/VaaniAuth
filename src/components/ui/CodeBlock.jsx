import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const languageLabels = {
  javascript: 'JavaScript',
  python: 'Python',
  curl: 'cURL',
  json: 'JSON',
  bash: 'Bash',
};

function highlightSyntax(code, language) {
  let highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Strings
  highlighted = highlighted.replace(
    /("(?:[^"\\]|\\.)*")/g,
    '<span class="code-string">$1</span>'
  );

  // Numbers
  highlighted = highlighted.replace(
    /\b(\d+\.?\d*)\b/g,
    '<span class="code-number">$1</span>'
  );

  // Keywords
  const keywords = ['const', 'let', 'var', 'function', 'return', 'async', 'await', 'import', 'from', 'export', 'default', 'if', 'else', 'try', 'catch', 'new', 'class', 'def', 'print', 'True', 'False', 'None', 'true', 'false', 'null'];
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b(${kw})\\b`, 'g');
    highlighted = highlighted.replace(regex, '<span class="code-keyword">$1</span>');
  });

  // Comments
  highlighted = highlighted.replace(
    /(\/\/.*$|#.*$)/gm,
    '<span class="code-comment">$1</span>'
  );

  // Properties (before colon in JSON-like)
  highlighted = highlighted.replace(
    /(&quot;|")(\w+)(&quot;|")(\s*:)/g,
    '<span class="code-property">"$2"</span>$4'
  );

  return highlighted;
}

export default function CodeBlock({ code, language = 'javascript', title, showLineNumbers = true }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className="code-block overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
          </div>
          <span className="text-xs text-vaani-muted-dark font-mono">
            {title || languageLabels[language] || language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-vaani-muted-dark hover:text-white transition-colors cursor-pointer"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Code */}
      <div className="p-4 overflow-x-auto">
        <pre className="text-[13px] leading-relaxed">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              {showLineNumbers && (
                <span className="select-none text-vaani-muted-dark/50 w-8 text-right mr-4 flex-shrink-0">
                  {i + 1}
                </span>
              )}
              <span dangerouslySetInnerHTML={{ __html: highlightSyntax(line, language) }} />
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

export function CodeTabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 mb-4 p-1 bg-white/5 rounded-xl w-fit">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-all duration-300 cursor-pointer ${
              activeTab === i
                ? 'bg-vaani-blue/20 text-vaani-blue'
                : 'text-vaani-muted hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Code Block */}
      <CodeBlock
        code={tabs[activeTab].code}
        language={tabs[activeTab].language}
        title={tabs[activeTab].title}
      />
    </div>
  );
}
