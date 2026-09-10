import ReactMarkdown from "react-markdown";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { profilePic } from "../assets";
import { usePortfolio } from "../context/PortfolioContext";
import { chatAPI } from "../services/api";

const SUGGESTED_PROMPTS = [
  "What services do you offer?",
  "Tell me about your best projects",
  "What's your tech stack?",
  "How can I contact you?",
];

const DEFAULT_PANEL_SIZE = { width: 400, height: 600 };
const PANEL_LIMITS = {
  width: { min: 340, max: 620 },
  height: { min: 480, max: 780 },
};

const AIAssistant = () => {
  const location = useLocation();
  const { details } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [panelSize, setPanelSize] = useState(DEFAULT_PANEL_SIZE);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const firstName = details?.shortName || details?.name?.split(" ")[0] || "my";

  // Greet the visitor the first time the panel is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "greeting",
          role: "assistant",
          content: `Hi there! 👋 I'm ${firstName}'s AI assistant. Ask me anything about my services, skills, projects, education, or how to get in touch.`,
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Hide the widget on admin pages
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const handleSend = async (overrideText) => {
    const text = (overrideText ?? input).trim();
    if (!text || isLoading) return;

    const userMessage = { id: `${Date.now()}-u`, role: "user", content: text };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const payload = nextMessages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map(({ role, content }) => ({ role, content }));

      const res = await chatAPI.sendMessage(payload);
      const replyText =
        res?.reply ||
        "Sorry, I couldn't generate a response. Please try again.";

      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-a`, role: "assistant", content: replyText },
      ]);
    } catch (err) {
      const friendly =
        err?.message && err.message.length < 150
          ? err.message
          : "Sorry, I'm having trouble connecting right now. Please try again in a moment.";

      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-e`, role: "assistant", content: friendly },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  const showSuggestions = !isLoading && messages.length <= 1;

  const startPanelResize = (event) => {
    event.preventDefault();
    const startX = event.clientX;
    const startY = event.clientY;
    const startSize = panelSize;

    const handlePointerMove = (moveEvent) => {
      setPanelSize({
        width: Math.min(
          PANEL_LIMITS.width.max,
          Math.max(
            PANEL_LIMITS.width.min,
            startSize.width + moveEvent.clientX - startX,
          ),
        ),
        height: Math.min(
          PANEL_LIMITS.height.max,
          Math.max(
            PANEL_LIMITS.height.min,
            startSize.height + moveEvent.clientY - startY,
          ),
        ),
      });
    };

    const stopPanelResize = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopPanelResize);
      document.body.style.removeProperty("cursor");
      document.body.style.removeProperty("user-select");
    };

    document.body.style.cursor = "nwse-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopPanelResize);
  };

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        className="ai-launcher-btn group fixed bottom-5 left-4 sm:left-6 z-[60] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-pointer"
      >
        {!isOpen && <span className="ai-launcher-ping" aria-hidden="true" />}

        <span className="relative z-10 flex items-center justify-center w-full h-full rounded-full overflow-hidden">
          {isOpen ? (
            <i
              className="fa-solid fa-xmark text-white text-xl"
              aria-hidden="true"
            />
          ) : (
            <i
              className="fa-solid fa-comments text-white text-2xl"
              aria-hidden="true"
            />
          )}
        </span>

        {!isOpen && (
          <span className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 bg-[#151030]/95 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl border border-white/10 hidden sm:block">
            Ask my AI Assistant
          </span>
        )}
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="AI Assistant chat"
            style={{
              "--ai-panel-width": `${panelSize.width}px`,
              "--ai-panel-height": `${panelSize.height}px`,
            }}
            className="ai-assistant-panel fixed z-[59] inset-4 sm:inset-auto sm:bottom-24 sm:left-6 sm:max-h-[calc(100vh-140px)] rounded-3xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="ai-assistant-header flex items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#915EFF]/40 flex-shrink-0">
                  <img
                    src={profilePic}
                    alt={details?.name || "AI Assistant"}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#0c091e]" />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm sm:text-[15px] leading-tight truncate">
                    {firstName}&apos;s AI Assistant
                  </p>
                  <p className="text-secondary text-xs">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="ai-panel-close"
                >
                  <i
                    className="fa-solid fa-xmark text-base"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="ai-assistant-messages flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "ai-bubble-user whitespace-pre-wrap"
                        : "ai-bubble-assistant ai-markdown"
                    }`}
                  >
                    {m.role === "assistant" ? (
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    ) : (
                      m.content
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="ai-bubble-assistant px-4 py-3.5 rounded-2xl flex gap-1.5 items-center">
                    <span className="ai-typing-dot" />
                    <span className="ai-typing-dot" />
                    <span className="ai-typing-dot" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Prompts */}
            {showSuggestions && (
              <div className="px-4 pb-3 flex flex-wrap gap-2 flex-shrink-0">
                {SUGGESTED_PROMPTS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleSend(q)}
                    className="ai-suggestion-chip"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={onSubmit}
              className="ai-assistant-input-row flex items-center gap-2 px-3 sm:px-4 py-3 border-t border-white/10 flex-shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my projects, skills..."
                autoComplete="off"
                disabled={isLoading}
                className="ai-chat-input flex-1 bg-transparent outline-none text-white text-sm placeholder:text-secondary/50 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="ai-send-btn"
              >
                <i
                  className="fa-solid fa-paper-plane text-sm"
                  aria-hidden="true"
                />
              </button>
            </form>
            <p className="text-center text-[10px] text-secondary/50 pb-2.5 px-4 flex-shrink-0">
              AI can make mistakes — please verify important details.
            </p>
            <span
              className="ai-panel-resize-handle"
              role="slider"
              aria-label="Resize chat panel"
              aria-valuemin={PANEL_LIMITS.width.min}
              aria-valuemax={PANEL_LIMITS.width.max}
              tabIndex={0}
              onPointerDown={startPanelResize}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
