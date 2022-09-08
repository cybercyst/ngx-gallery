import { Renderer, Slugger } from 'marked';

const apiCommentRegex = /<!--\s*api\(([^)]+)\)\s*-->/g;

export class DocsMarkdownRenderer extends Renderer {

  /** Set of fragment links discovered in the currently rendered file. */
  private _referencedFragments = new Set<string>();

  /**
   * Slugger provided by the `marked` package. Can be used to create unique
   * ids  for headings.
   */
  private _slugger = new Slugger();

  /**
   * Transforms a markdown heading into the corresponding HTML output. In our case, we
   * want to create a header-link for each H2, H3, and H4 heading. This allows users to jump to
   * specific parts of the docs.
   */
  heading(label: string, level: number, raw: string) {
    if (level === 2 || level === 3 || level === 4 || level === 5 || level === 6) {
      const headingId = this._slugger.slug(raw);
      return `
        <h${level} id="${headingId}" class="docs-header-link">
          <span header-link="${headingId}"></span>
          ${label}
        </h${level}>
      `;
    }

    return `<h${level}>${label}</h${level}>`;
  }

  /** Transforms markdown links into the corresponding HTML output. */
  // link(href: string, title: string, text: string) {
  //   // We only want to fix up markdown links that are relative and do not refer to guides already.
  //   // Otherwise we always map the link to the "guide/" path.
  //   // TODO(devversion): remove this logic and just disallow relative paths.
  //   if (!href.startsWith('http') && !href.startsWith('#') && !href.includes('guide/')) {
  //     return super.link(`guide/${basename(href, extname(href))}`, title, text);
  //   }
  //
  //   // Keep track of all fragments discovered in a file.
  //   if (href.startsWith('#')) {
  //     this._referencedFragments.add(href.substr(1));
  //   }
  //
  //   return super.link(href, title, text);
  // }

  html(html: string): string {
    // html = html.replace(apiCommentRegex, (_match: string, content: string) => {
    //   // using [\s\S]* because .* does not match line breaks
    //   if (content.match(/\{[\s\S]*\}/g)) {
    //     const {example, file, region} = JSON.parse(content) as {
    //       example: string;
    //       file: string;
    //       region: string;
    //     };
    //     console.log(example, file, region);
    //     return `<div material-docs-api="${example}"
    //                          ${file ? `file="${file}"` : ''}
    //                          ${region ? `region="${region}"` : ''}></div>`;
    //   } else {
    //     console.log(content);
    //     return `<div material-docs-api="${content}"></div>`;
    //   }
    // });

    return super.html(html);
  }
}
