import { getSupportChannels } from "../lib/support-channels.mjs";

export default function SupportLinks({ variant = "contact" }: { variant?: "hero" | "contact" }) {
  const channels = getSupportChannels({
    phone: process.env.NEXT_PUBLIC_SUPPORT_PHONE,
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  });

  if (channels.length === 0) return null;

  return (
    <nav className={`support-links${variant === "hero" ? " support-links-hero" : ""}`} aria-label="Doğrudan destek kanalları">
      {channels.map((channel) => (
        <a
          className="support-link"
          href={channel.href}
          key={channel.kind}
          target={channel.kind === "whatsapp" ? "_blank" : undefined}
          rel={channel.kind === "whatsapp" ? "noreferrer" : undefined}
        >
          <span className="support-link-kind">{channel.label}</span>
          <span className="support-link-value">{channel.displayValue}</span>
          <span className="support-link-detail">{channel.detail}</span>
        </a>
      ))}
    </nav>
  );
}
