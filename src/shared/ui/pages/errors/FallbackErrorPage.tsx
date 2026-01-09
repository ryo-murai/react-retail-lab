import { fallbackMessage } from "@/shared/errors/lib/fallback-error-info";

const toHomeLabel = "Back to Home";

export default function FallbackErrorPage({ message = fallbackMessage }) {
  return (
    <main>
      <h1>{message.title}</h1>
      <p>{message.detail}</p>
      <a href="/">{toHomeLabel}</a>
    </main>
  );
}
