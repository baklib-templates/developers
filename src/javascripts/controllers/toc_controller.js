import { Controller } from "@hotwired/stimulus";

/**
 * In-page TOC + scroll spy.
 * Avoid scrollIntoView during spy updates — it can scroll the document and cause
 * jump/flicker near the bottom of long pages.
 */
export default class extends Controller {
  static targets = ["links", "content", "menu"];
  static values = {
    headerSelector: String,
    offset: Number,
    clipboardSuccess: String,
  };

  connect() {
    const validOptions = this.hasContentTarget && this.hasLinksTarget && this.hasMenuTarget;
    if (!validOptions) {
      if (this.hasMenuTarget) this.menuTarget.remove();
      return;
    }

    this.boundHighlight = this.#highlightActiveLink.bind(this);
    this.#generateDirectory();

    const anchor = window.location.hash.replace("#", "");
    if (anchor) {
      const targetElement = document.getElementById(anchor);
      targetElement?.scrollIntoView({ behavior: "instant", block: "start" });
    }
  }

  disconnect() {
    if (this.boundHighlight) {
      window.removeEventListener("scroll", this.boundHighlight, { passive: true });
      this.boundHighlight = null;
    }
    if (this.highlightTimer) {
      clearTimeout(this.highlightTimer);
      this.highlightTimer = null;
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  #generateDirectory() {
    const directory = this.#buildDirectoryTree(this.headings);
    if (directory.children.length > 0) {
      this.#renderDirectory(directory, this.linksTarget);
      window.addEventListener("scroll", this.boundHighlight, { passive: true });
      this.#highlightActiveLink();
      this.element.classList.add("has-toc");
    } else {
      this.element.classList.remove("has-toc");
      this.menuTarget.style.display = "none";
    }
  }

  #buildDirectoryTree(headings) {
    const root = { level: 0, children: [] };
    let currentNode = root;

    headings.forEach((heading, index) => {
      if (heading.textContent.trim() === "") return;

      const level = parseInt(heading.tagName.substr(1), 10);
      const id = this.#generateUniqueId(heading, level, index);
      heading.style.position = "relative";
      const top = this.headerHeight + Number(this.offsetValue || 0);
      heading.insertAdjacentHTML(
        "beforeend",
        `<div js-position style="position: absolute; top: -${top}px; left: 0; width: 0; height: 0" id="${id}"></div>`
      );
      heading.insertAdjacentHTML("beforeend", `<a name="${id}"></a>`);

      const node = { level, id, text: heading.textContent, children: [] };

      if (level > currentNode.level) {
        currentNode.children.push(node);
      } else {
        while (level <= currentNode.level && currentNode !== root) {
          currentNode = currentNode.parent;
        }
        currentNode.children.push(node);
      }

      node.parent = currentNode;
      currentNode = node;
    });

    return root;
  }

  #renderDirectory(directory, container, level = 0) {
    if (directory.children.length === 0) return;

    const ul = document.createElement("ul");

    directory.children.forEach((node) => {
      const li = document.createElement("li");
      const link = document.createElement("button");
      link.type = "button";
      link.textContent = node.text;
      link.dataset.action = "toc#navigateToAnchor";
      link.dataset.tocAnchorParam = node.id;

      li.appendChild(link);
      ul.appendChild(li);

      const heading_pos = document.getElementById(node.id);
      if (!heading_pos) return;

      const heading = heading_pos.parentElement;
      if (!heading) return;

      heading.style.position = "relative";
      heading.classList.add("group");

      const clipboardDiv = document.createElement("span");
      clipboardDiv.className = "inline-flex items-center align-middle ml-1";
      clipboardDiv.setAttribute("data-controller", "clipboard");
      clipboardDiv.setAttribute("data-clipboard-success-value", this.clipboardSuccessValue);
      clipboardDiv.style.verticalAlign = "middle";

      clipboardDiv.innerHTML = `
        <input type="hidden" value="${window.location.href.split("#")[0]}#${node.id}" data-clipboard-target="source" />
        <button type="button" data-action="clipboard#copy" data-clipboard-target="button" class="inline-flex ml-1 opacity-0 group-hover:opacity-100" aria-label="Copy link">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-300 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </button>
      `;

      heading.appendChild(clipboardDiv);

      const lastTextNode = Array.from(heading.childNodes)
        .filter(
          (n) =>
            n.nodeType === Node.TEXT_NODE ||
            (n.nodeType === Node.ELEMENT_NODE &&
              !n.hasAttribute("data-controller") &&
              !n.hasAttribute("js-position"))
        )
        .pop();

      if (lastTextNode?.nextSibling) {
        heading.insertBefore(clipboardDiv, lastTextNode.nextSibling);
      }

      if (node.children.length > 0) {
        const subList = this.#renderDirectory(node, li, level + 1);
        if (subList) li.appendChild(subList);
      }
    });

    container.appendChild(ul);
    return ul;
  }

  #generateUniqueId(node, level, index) {
    return node.id || `heading-menu-h${level}-${index}`;
  }

  #highlightActiveLink() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      if (!this.hasLinksTarget) return;

      const links = Array.from(this.linksTarget.querySelectorAll("[data-toc-anchor-param]"));
      if (links.length === 0) return;

      const activeId = this.#activeHeadingId();
      if (!activeId) return;

      const activeLink = links.find((link) => link.dataset.tocAnchorParam === activeId);
      if (!activeLink || activeLink.classList.contains("text-primary")) {
        if (activeLink) this.#ensureTocLinkVisible(activeLink);
        return;
      }

      links.forEach((link) => link.classList.remove("text-primary", "font-bold"));
      activeLink.classList.add("text-primary", "font-bold");
      this.#ensureTocLinkVisible(activeLink);
    });
  }

  /**
   * Last heading whose anchor top has crossed the sticky header line.
   * Works near page bottom where headings never fully fit in the viewport.
   */
  #activeHeadingId() {
    const probeY = this.headerHeight + Number(this.offsetValue || 0) + 8;
    let currentId = null;

    for (const heading of this.headings) {
      const marker = heading.querySelector("[js-position]");
      if (!marker?.id) continue;
      const top = marker.getBoundingClientRect().top;
      if (top <= probeY) currentId = marker.id;
      else break;
    }

    if (!currentId && this.headings.length > 0) {
      const first = this.headings[0].querySelector("[js-position]");
      currentId = first?.id || null;
    }

    return currentId;
  }

  /** Scroll only the TOC panel, never the document. */
  #ensureTocLinkVisible(activeLink) {
    const menu = this.hasMenuTarget ? this.menuTarget : null;
    if (!menu) return;

    const menuRect = menu.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    const pad = 12;

    if (linkRect.top < menuRect.top + pad) {
      menu.scrollTop -= menuRect.top + pad - linkRect.top;
    } else if (linkRect.bottom > menuRect.bottom - pad) {
      menu.scrollTop += linkRect.bottom - (menuRect.bottom - pad);
    }
  }

  navigateToAnchor(event) {
    const { anchor } = event.params;
    const targetElement = document.getElementById(anchor);
    if (!targetElement) return;

    const top =
      window.scrollY +
      targetElement.getBoundingClientRect().top -
      this.headerHeight -
      Number(this.offsetValue || 0);

    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  get headings() {
    return Array.from(this.contentTarget.querySelectorAll("h1, h2, h3, h4, h5, h6"));
  }

  get headerHeight() {
    if (!this.hasHeaderSelectorValue || !this.headerSelectorValue) return 0;
    const header = document.querySelector(this.headerSelectorValue);
    return header ? header.offsetHeight : 0;
  }
}
