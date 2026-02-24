/* eslint-disable react-refresh/only-export-components */
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { slideIn, fadeIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { usePortfolio } from "../context/PortfolioContext";

const Contact = () => {
  const formRef = useRef();
  const { socialLinks } = usePortfolio();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_5jgq5nn",
        "template_q39g54q",
        formRef.current,
        "6J3ax4aEv7ugLBiV5"
      )
      .then(
        (result) => {
          console.log("Message Sent:", result.text);
          setLoading(false);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 4000);
        },
        (error) => {
          console.error("Error:", error.text);
          setLoading(false);
          alert("There was an error sending the message.");
        }
      );

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  const contactCards = [
    {
      icon: "fa-solid fa-envelope",
      title: "Email",
      value: "amirliaqat2020@gmail.com",
      link: "mailto:amirliaqat2020@gmail.com",
      color: "#915EFF",
    },
    {
      icon: "fa-solid fa-phone",
      title: "Phone",
      value: "+92 309 0886518",
      link: "tel:+923090886518",
      color: "#38ef7d",
    },
    {
      icon: "fa-brands fa-whatsapp",
      title: "WhatsApp",
      value: "+92 309 0886518",
      link: "https://web.whatsapp.com/send?phone=923090886518",
      color: "#25D366",
    },
    {
      icon: "fa-solid fa-location-dot",
      title: "Location",
      value: "Lahore, Pakistan",
      link: null,
      color: "#fc6767",
    },
  ];

  return (
    <div className="relative">
      {/* Background accents */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-[#915EFF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-60 h-60 bg-[#6B3FA0]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Contact Info Cards */}
      <motion.div
        variants={fadeIn("down", "tween", 0.1, 0.6)}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
      >
        {contactCards.map((card, index) => (
          <div key={index} className="group">
            {card.link ? (
              <a
                href={card.link}
                target={card.link.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="contact-info-card rounded-2xl p-5 flex flex-col items-center text-center gap-3 h-full block"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${card.color}12`,
                    border: `1px solid ${card.color}25`,
                  }}
                >
                  <i
                    className={`${card.icon} text-lg`}
                    style={{ color: card.color }}
                  />
                </div>
                <div>
                  <p className="text-secondary/50 text-xs uppercase tracking-wider mb-1">
                    {card.title}
                  </p>
                  <p className="text-white/80 text-sm font-medium">
                    {card.value}
                  </p>
                </div>
              </a>
            ) : (
              <div className="contact-info-card rounded-2xl p-5 flex flex-col items-center text-center gap-3 h-full">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${card.color}12`,
                    border: `1px solid ${card.color}25`,
                  }}
                >
                  <i
                    className={`${card.icon} text-lg`}
                    style={{ color: card.color }}
                  />
                </div>
                <div>
                  <p className="text-secondary/50 text-xs uppercase tracking-wider mb-1">
                    {card.title}
                  </p>
                  <p className="text-white/80 text-sm font-medium">
                    {card.value}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {/* Main Contact Section */}
      <div className="xl:mt-8 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
        {/* Contact Form */}
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] relative"
        >
          <div className="contact-form-wrapper rounded-2xl p-8 relative overflow-hidden">
            {/* Top border gradient */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#915EFF]/40 to-transparent" />

            {/* Header */}
            <div className="mb-8">
              <p className={styles.sectionSubText}>Get in touch</p>
              <h3 className={styles.sectionHeadText}>
                Contact<span className="text-[#915EFF]">.</span>
              </h3>
              <p className="text-secondary/60 text-sm mt-2">
                Have a project in mind or want to collaborate? Fill out the form
                below and I'll get back to you as soon as possible.
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl flex items-center gap-3"
                style={{
                  background: "rgba(56, 239, 125, 0.1)",
                  border: "1px solid rgba(56, 239, 125, 0.25)",
                }}
              >
                <i className="fa-solid fa-circle-check text-[#38ef7d]" />
                <span className="text-[#38ef7d] text-sm font-medium">
                  Message sent successfully! I'll respond soon.
                </span>
              </motion.div>
            )}

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              <label className="flex flex-col gap-2">
                <span className="text-white/80 font-medium text-sm flex items-center gap-2">
                  <i className="fa-solid fa-user text-[#915EFF] text-xs" />
                  Your Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="contact-input py-4 px-5 placeholder:text-secondary/40 text-white rounded-xl outline-none font-medium text-sm"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-white/80 font-medium text-sm flex items-center gap-2">
                  <i className="fa-solid fa-at text-[#915EFF] text-xs" />
                  Your Email
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="contact-input py-4 px-5 placeholder:text-secondary/40 text-white rounded-xl outline-none font-medium text-sm"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-white/80 font-medium text-sm flex items-center gap-2">
                  <i className="fa-solid fa-message text-[#915EFF] text-xs" />
                  Your Message
                </span>
                <textarea
                  rows="5"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  className="contact-input py-4 px-5 placeholder:text-secondary/40 text-white rounded-xl outline-none font-medium text-sm resize-none"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="contact-submit-btn py-4 px-8 w-full rounded-xl text-white font-semibold text-[15px] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-spinner animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane" />
                    Send Message
                  </>
                )}
              </button>
            </form>

            {/* Social links below form */}
            <div className="mt-8 pt-6 border-t border-secondary/10">
              <p className="text-secondary/40 text-xs text-center mb-4">
                Or reach out via social media
              </p>
              <div className="flex items-center justify-center gap-3">
                {socialLinks.slice(0, 5).map((link, index) => (
                  <a
                    key={index}
                    href={link.link}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-social-icon w-10 h-10 rounded-lg flex items-center justify-center text-secondary/50 text-sm"
                    title={link.name}
                  >
                    <i className={link.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Earth Canvas */}
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
