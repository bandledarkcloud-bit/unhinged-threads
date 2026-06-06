'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SubmitPhotoButton() {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [email, setEmail] = useState('');
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `customer-photos/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('customer-photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from('customer-photos')
        .getPublicUrl(filePath);

      // Insert into database
      const { error: insertError } = await supabase
        .from('customer_submissions')
        .insert({
          image_url: data.publicUrl,
          caption: caption || null,
          email: email || null,
        });

      if (insertError) throw insertError;

      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
        setFile(null);
        setCaption('');
        setEmail('');
      }, 2000);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-12 py-4 bg-black text-white border-2 border-[#ff0088] text-base font-black tracking-[2px] hover:bg-[#ff0088] hover:text-white active:bg-[#9b00ff] active:border-[#9b00ff] transition-all duration-200"
      >
        SUBMIT YOUR PHOTO
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6">
          <div className="bg-zinc-950 border border-white/20 rounded-2xl max-w-md w-full p-8">
            {!success ? (
              <>
                <h2 className="text-3xl font-black tracking-[-1px] mb-2">SUBMIT YOUR PHOTO</h2>
                <p className="text-white/70 mb-6">Show us how you're wearing the chaos.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-black tracking-[1px] mb-2 text-[#ff0088]">YOUR PHOTO</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#ff0088] file:text-white file:font-black hover:file:bg-white hover:file:text-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black tracking-[1px] mb-2 text-[#ff0088]">CAPTION (OPTIONAL)</label>
                    <textarea
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Wearing this to my ex's wedding"
                      className="w-full bg-black border border-white/20 rounded-xl p-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#ff0088]"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black tracking-[1px] mb-2 text-[#ff0088]">EMAIL (OPTIONAL)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@chaos.com"
                      className="w-full bg-black border border-white/20 rounded-xl p-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#ff0088]"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 py-3 border border-white/30 font-black tracking-[1px] hover:bg-white/5"
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      disabled={!file || uploading}
                      className="flex-1 py-3 bg-[#ff0088] font-black tracking-[1px] disabled:opacity-50 hover:bg-white hover:text-black transition-all"
                    >
                      {uploading ? 'UPLOADING...' : 'SUBMIT'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-[#39ff14] text-7xl mb-6">✓</div>
                <h3 className="text-4xl font-black tracking-[-2px] text-[#39ff14] mb-3">SUBMITTED.</h3>
                <p className="text-xl text-white/70">Got it.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
