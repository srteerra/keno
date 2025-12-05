'use client';

import { useState } from 'react';
import { Tip } from '@/lib/schemas/tip.schema';

export default function Home() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('react');

  const generateTips = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, count: 3 })
      });

      const data = await res.json();
      setTips(data.tips || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Dev Productivity Tips</h1>

      <div className="mb-6 flex gap-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="react">React</option>
          <option value="git_command">Git</option>
          <option value="linux">Linux</option>
          <option value="terminal">Terminal</option>
          <option value="python">Python</option>
        </select>

        <button
          onClick={generateTips}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Generando...' : 'Generar Tips'}
        </button>
      </div>

      <div className="grid gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="border rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold">{tip.title}</h2>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {tip.difficulty}
              </span>
            </div>
            <p className="text-gray-700 mb-3">{tip.content}</p>

            {tip.codeExample && (
              <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <code>{tip.codeExample}</code>
              </pre>
            )}

            <div className="flex gap-2 mt-3">
              {tip.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-200 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
