import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Copy, CheckCircle2, MessageSquare, Globe, ExternalLink, Loader2 } from 'lucide-react';

// ──────────────────────────────────────────────────────────────────────────────
// HOW IT WORKS:
// This form uses Web3Forms (https://web3forms.com) to deliver messages
// directly to your email inbox — no backend server needed.
//
// SETUP (one-time, takes 30 seconds):
// 1. Go to https://web3forms.com
// 2. Enter your email: haseebashfaq60@gmail.com
// 3. You'll receive an "Access Key" in your inbox
// 4. Paste that key in the WEB3FORMS_ACCESS_KEY variable below
//
// BONUS: You can also view ALL submissions on the Web3Forms dashboard
// at https://web3forms.com/dashboard — this is your "second source".
// ──────────────────────────────────────────────────────────────────────────────

const WEB3FORMS_ACCESS_KEY = '0520dca2-c86c-4910-a65f-f86a719e31cf';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('haseebashfaq60@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact: ${formData.name}`,
          from_name: 'Portfolio Website',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(result.message || 'Something went wrong');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Failed to send message. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-neonBlue/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-neonPurple/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side: CTA & Links */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              Let's build something <span className="text-gradient">extraordinary</span> together.
            </h2>
            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-md">
              Looking for a developer who can bring your vision to life? I'm currently available for freelance projects and exciting full-time opportunities.
            </p>

            <div className="space-y-6">
              <button 
                onClick={handleCopyEmail}
                className="group flex items-center gap-4 p-4 pr-6 rounded-2xl glass-card hover:bg-white/5 transition-all w-fit hover-target"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-neonBlue/20 transition-colors">
                  {copied ? <CheckCircle2 className="text-green-400" /> : <Copy className="text-white" />}
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-400 font-medium">Drop me an email</p>
                  <p className="text-lg font-bold text-white group-hover:text-neonBlue transition-colors">haseebashfaq60@gmail.com</p>
                </div>
              </button>

              <div className="flex gap-4 pt-4">
                <a href="https://wa.me/923288091852" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-green-400 hover:glow-blue transition-all hover-target group">
                  <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://github.com/Haseebdev60" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-white hover:glow-blue transition-all hover-target group">
                  <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.upwork.com/freelancers/~01db4fcee36c1a7fe0?mp_source=share" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full glass flex items-center gap-2 text-white hover:text-green-400 hover:glow-blue transition-all hover-target group">
                  <span className="font-bold font-display">Upwork</span>
                  <ExternalLink className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 rounded-3xl space-y-6 relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-br from-neonBlue/5 to-neonPurple/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-3xl pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <div className="relative">
                  <input 
                    type="text" 
                    id="name"
                    required
                    className="block w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-neonBlue/50 focus:border-transparent transition-all peer"
                    placeholder=" "
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <label htmlFor="name" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-neonBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">
                    Your Name
                  </label>
                </div>

                <div className="relative">
                  <input 
                    type="email" 
                    id="email"
                    required
                    className="block w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-neonBlue/50 focus:border-transparent transition-all peer"
                    placeholder=" "
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  <label htmlFor="email" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-neonBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">
                    Email Address
                  </label>
                </div>

                <div className="relative">
                  <textarea 
                    id="message"
                    required
                    rows={5}
                    className="block w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-neonBlue/50 focus:border-transparent transition-all peer resize-none"
                    placeholder=" "
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                  <label htmlFor="message" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-neonBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-4 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">
                    Project Details
                  </label>
                </div>

                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 px-8 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-neonBlue hover:text-black transition-colors duration-300 hover-target disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Status Messages */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400"
                    >
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium">Message sent successfully! I'll get back to you soon.</span>
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400"
                    >
                      <span className="text-sm font-medium">{errorMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
