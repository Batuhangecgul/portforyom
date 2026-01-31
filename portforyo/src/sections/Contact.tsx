import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github, Linkedin, Instagram, Send, MapPin, ArrowUpRight, CheckCircle, XCircle } from 'lucide-react';
import MagneticButton from '../components/dom/MagneticButton';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
    { icon: Github, href: 'https://github.com/Batuhangecgul', label: 'GitHub' },
    { icon: Linkedin, href: 'https://tr.linkedin.com/in/batuhan-geçgül-273346359', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/gecgulbatuhan/', label: 'Instagram' },
];

const Contact = () => {
    const containerRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const [formData, setFormData] = useState({
        ad: '',
        email: '',
        telefon: '',
        konu: '',
        mesaj: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useGSAP(() => {
        gsap.from(headingRef.current, {
            scrollTrigger: {
                trigger: headingRef.current,
                start: 'top 80%',
            },
            opacity: 0,
            y: 50,
            duration: 1
        });

        gsap.from(contentRef.current?.children || [], {
            scrollTrigger: {
                trigger: contentRef.current,
                start: 'top 75%',
            },
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.8
        });
    }, { scope: containerRef });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // EmailJS configuration
            const serviceId = 'service_d54pp3g';
            const templateId = 'template_pfw0c28';
            const publicKey = 'i1oe5S-2ofSCL-daf';

            await emailjs.send(
                serviceId,
                templateId,
                {
                    ad: formData.ad,
                    email: formData.email,
                    telefon: formData.telefon,
                    konu: formData.konu,
                    mesaj: formData.mesaj
                },
                publicKey
            );

            setSubmitStatus('success');
            setFormData({ ad: '', email: '', telefon: '', konu: '', mesaj: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } catch (error) {
            console.error('EmailJS Error:', error);
            setSubmitStatus('error');

            // Reset error message after 5 seconds
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section ref={containerRef} id="contact" className="min-h-screen flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto py-20 pointer-events-none">
            <div className="pointer-events-auto z-10 w-full">
                <h2 ref={headingRef} className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-white">
                    Let's work
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        together
                    </span>
                </h2>

                <div ref={contentRef} className="grid md:grid-cols-2 gap-8 md:gap-16 mt-8 md:mt-16">
                    {/* Left side - Info */}
                    <div className="space-y-8">
                        <p className="text-xl text-gray-400 leading-relaxed">
                            I'm currently available for freelance work and full-time opportunities.
                            Let's build something amazing together.
                        </p>

                        <div className="space-y-4">
                            <a
                                href="mailto:gecgulbatuhan@gmail.com"
                                className="group flex items-center gap-3 text-2xl md:text-3xl font-medium text-white hover:text-primary transition-colors"
                            >
                                <Mail size={28} className="text-primary" />
                                gecgulbatuhan@gmail.com
                                <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>

                            <div className="flex items-center gap-3 text-gray-400">
                                <MapPin size={20} className="text-primary" />
                                Istanbul, Turkey
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4 pt-4">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                                >
                                    <Icon size={24} className="text-white group-hover:text-primary transition-colors" />
                                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right side - Form */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                        <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="ad" className="block text-sm font-medium text-gray-400 mb-2">
                                    Ad Soyad
                                </label>
                                <input
                                    type="text"
                                    id="ad"
                                    name="ad"
                                    value={formData.ad}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                                    placeholder="Adınız Soyadınız"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                                    E-posta
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                                    placeholder="ornek@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="telefon" className="block text-sm font-medium text-gray-400 mb-2">
                                    Telefon
                                </label>
                                <input
                                    type="tel"
                                    id="telefon"
                                    name="telefon"
                                    value={formData.telefon}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                                    placeholder="+90 555 123 4567"
                                />
                            </div>

                            <div>
                                <label htmlFor="konu" className="block text-sm font-medium text-gray-400 mb-2">
                                    Konu
                                </label>
                                <input
                                    type="text"
                                    id="konu"
                                    name="konu"
                                    value={formData.konu}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                                    placeholder="Proje hakkında"
                                />
                            </div>

                            <div>
                                <label htmlFor="mesaj" className="block text-sm font-medium text-gray-400 mb-2">
                                    Mesaj
                                </label>
                                <textarea
                                    id="mesaj"
                                    name="mesaj"
                                    value={formData.mesaj}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                                    placeholder="Projeniz hakkında detaylar..."
                                />
                            </div>

                            <MagneticButton
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-semibold shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] transition-all duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                                    <Send size={18} />
                                </span>
                            </MagneticButton>

                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <div className="flex items-center gap-2 text-green-400 bg-green-400/10 border border-green-400/20 rounded-xl p-4">
                                    <CheckCircle size={20} />
                                    <span>Mesajınız başarıyla gönderildi!</span>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl p-4">
                                    <XCircle size={20} />
                                    <span>Bir hata oluştu. Lütfen tekrar deneyin.</span>
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © 2024 Batuhan Geçgül. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-sm">
                        Built with <span className="text-primary">♥</span> using React, Three.js & GSAP
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
