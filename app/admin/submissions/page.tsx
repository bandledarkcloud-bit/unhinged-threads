'use client';

import { useEffect, useState } from 'react';

interface Submission {
  id: number;
  image_url: string;
  caption: string;
  email?: string;
  created_at: string;
}

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/submissions');
      const data = await res.json();
      setSubmissions(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSubmission = async (id: number) => {
    if (!confirm('Delete this submission?')) return;

    try {
      await fetch(`/api/submissions?id=${id}`, { method: 'DELETE' });
      fetchSubmissions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
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

        <h1 className="text-4xl font-black text-[#ff0088] mb-2">CUSTOMER SUBMISSIONS</h1>
        <p className="text-[#39ff14] mb-8">Photos submitted by customers</p>

        <button onClick={fetchSubmissions} className="mb-6 px-6 py-3 bg-[#39ff14] text-black font-bold">
          Refresh
        </button>

        {loading && <p>Loading submissions...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {submissions.map((sub) => (
            <div key={sub.id} className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden">
              <img src={sub.image_url} alt={sub.caption} className="w-full aspect-video object-cover" />
              <div className="p-4">
                {sub.email && (
                  <p className="text-xs text-[#39ff14] mb-1 font-mono">{sub.email}</p>
                )}
                <p className="text-sm text-white/80">{sub.caption}</p>
                <p className="text-xs text-white/50 mt-2">
                  {new Date(sub.created_at).toLocaleDateString()}
                </p>

                <button
                  onClick={() => deleteSubmission(sub.id)}
                  className="mt-4 px-4 py-1.5 bg-red-900 hover:bg-red-800 text-red-400 text-xs font-bold tracking-widest"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
