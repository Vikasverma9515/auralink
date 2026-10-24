"use client";
// Shared bubble-thread renderer for Live Conversation (passenger and crew screens send/receive
// the same {type:"conv_message"} stream — see hub/main.py handle_conv_text). Unreviewed, like
// Free Talk: every bubble shows the machine-translated text, growing token by token while
// `done` is false, never used for safety content.
import { Icon } from "@/lib/icons";

export function ConvThread({ messages, mineFrom }) {
  if (!messages.length) return <p className="conv-empty">…</p>;
  return (
    <div className="conv-thread">
      {messages.map((m) => (
        <div key={m.id} className={`conv-bubble ${m.from === mineFrom ? "mine" : "theirs"}`}>
          {m.from === mineFrom ? <p className="conv-original">{m.original}</p> : null}
          <p className="conv-text">{m.translated || "…"}{!m.done ? <span className="conv-typing"> ●●●</span> : null}</p>
        </div>
      ))}
    </div>
  );
}

export function ConvToggle({ on, onClick, label }) {
  return (
    <button type="button" className={`conv-toggle ${on ? "on" : ""}`} onClick={onClick}>
      <Icon id={on ? "stop" : "chat"} />{label}
    </button>
  );
}
