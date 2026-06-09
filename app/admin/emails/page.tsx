'use client';

import { useEffect, useState } from 'react';

interface EmailRecord {
  email: string;
  source: string;
  created_at: string;
}

export default function AdminEmails() {
  const [emails, setEmails] = useState<EmailRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/emails');
      const data = await res.json();

      if (Array.isArray(data)) {
        setEmails(data);
      } else {
        setError(data.error || 'Failed to load emails');
        setEmails([]);
      }
    } catch (err) {
      setError('Failed to connect to email API');
      setEmails([]);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (emails.length === 0) return;

    const headers = ['Email', 'Source', 'Created At'];
    const rows = emails.map(e => [
      e.email,
      e.source,
      new Date(e.created_at).toISOString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `unhinged-emails_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Admin Warning + Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <div className="px-4 py-1.5 bg-red-950 border border-red-800 text-red-400 text-xs font-black tracking-[3px]">
            ADMIN ONLY
          </div>
          <div className="flex gap-6 text-sm">
            <a href="/admin/emails" className="text-[#39ff14] hover:underline">Emails</a>
            <a href="/admin/submissions" className="text-[#39ff14] hover:underline">Submissions</a>
          </div>
        </div>

        <h1 className="text-4xl font-black text-[#ff0088] mb-2">EMAIL CAPTURES</h1>
        <p className="text-[#39ff14] mb-8">Customers who completed checkout</p>

        <button
          onClick={fetchEmails}
          className="mb-6 px-6 py-3 bg-[#39ff14] text-black font-bold hover:bg-white"
        >
          Refresh List
        </button>

        <button
          onClick={exportToCSV}
          className="mb-6 ml-4 px-6 py-3 bg-white text-black font-bold hover:bg-[#ff0088] hover:text-white"
        >
          Export CSV
        </button>

        {loading && <p>Loading emails...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Source</th>
                <th className="text-left p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((record, index) => (
                <tr key={index} className="border-b border-zinc-800 hover:bg-zinc-800">
                  <td className="p-4 font-mono">{record.email}</td>
                  <td className="p-4 text-[#39ff14]">{record.source}</td>
                  <td className="p-4 text-white/70">
                    {new Date(record.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}