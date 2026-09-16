import type { ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*") && part.length > 1) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });
}

/** Renders a paragraph block, preserving single line breaks within it
 * (used for poem-style verse where every line matters) as <br />. */
function renderParagraph(block: string): ReactNode[] {
  const lines = block.split("\n");
  const nodes: ReactNode[] = [];
  lines.forEach((line, i) => {
    if (i > 0) nodes.push(<br key={`br-${i}`} />);
    nodes.push(...renderInline(line).map((n, j) => (
      <span key={`l-${i}-${j}`}>{n}</span>
    )));
  });
  return nodes;
}

/**
 * Renders a story's plain-text/lightly-marked-up body as JSX: blank lines
 * separate paragraphs, a line starting with "## " becomes a heading, and
 * *word* becomes italic. Deliberately minimal — this is prose, not a full
 * markdown document.
 */
export function StoryBody({ content }: { content: string }) {
  const blocks = content.split(/\n\s*\n/).filter((b) => b.trim().length > 0);

  return (
    <>
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="mt-12 mb-4 font-serif text-2xl italic text-ivory-100 first:mt-0"
            >
              {trimmed.slice(3)}
            </h2>
          );
        }
        return (
          <p key={i} className="mb-6">
            {renderParagraph(trimmed)}
          </p>
        );
      })}
    </>
  );
}
