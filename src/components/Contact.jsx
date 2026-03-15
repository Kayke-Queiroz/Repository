import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

export default function Contact() {
    const { t } = useLanguage();
    const [status, setStatus] = useState("idle"); // idle, submitting, success, error
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "42860058-ddf0-4d01-8a12-75ec3c71357f",
                    ...formData,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
                // Reset success message after 5 seconds
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus("error");
        }
    };

    return (
        <section id="contatar" className="relative w-full max-w-4xl mx-auto px-4 py-20 mb-10 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
                    {t.contact.title}
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mt-6 rounded-full shadow-[0_0_15px_cyan]" />
                <p className="text-gray-400 mt-6 max-w-xl mx-auto text-lg leading-relaxed">
                    {t.contact.subtitle}
                </p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-2xl mx-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1 flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-400 ml-1">
                                {t.contact.nameLabel}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder={t.contact.namePlaceholder}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all duration-300"
                            />
                        </div>

                        <div className="flex-1 flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-400 ml-1">
                                {t.contact.emailLabel}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder={t.contact.emailPlaceholder}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all duration-300"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-sm font-medium text-gray-400 ml-1">
                            {t.contact.messageLabel}
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="5"
                            placeholder={t.contact.messagePlaceholder}
                            className="w-full resize-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all duration-300"
                        />
                    </div>

                    {/* Status Messages */}
                    {status === "success" && (
                        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm text-center flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            {t.contact.successMessage}
                        </div>
                    )}

                    {status === "error" && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            {t.contact.errorMessage}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={status === "submitting"}
                        className={`
                            mt-2 w-full py-4 rounded-xl font-bold tracking-wide flex items-center justify-center gap-3 transition-all duration-300
                            ${status === "submitting"
                                ? "bg-white/10 text-gray-400 cursor-not-allowed border border-white/5"
                                : "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:-translate-y-1 active:translate-y-0 disabled:opacity-50"}
                        `}
                    >
                        {status === "submitting" ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {t.contact.sending}
                            </>
                        ) : (
                            <>
                                {t.contact.button}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </>
                        )}
                    </button>
                </form>
            </motion.div>
        </section>
    );
}
