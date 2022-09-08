import highlightJs from 'highlight.js';

window['hljs'] = highlightJs;

/**
 * Transforms a given code block into its corresponding HTML output. We do this using
 * highlight.js because it allows us to show colored code blocks in our guides.
 */
export function highlightCodeBlock(code: string, language: string) {
  if (language) {
    return highlightJs.highlight(code, {
      language: language.toLowerCase() === 'ts' ? 'typescript' : language,
    }).value;
  }

  return code;
}
