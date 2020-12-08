const styles = {
  borderLeft: "0.25em solid #dfe2e5",
  marginBottom: "0",
  marginTop: "0",
  marginLeft: "0",
  color: "#6a737d",
  padding: "0 1em",
};

const replyClassName = "ocean-ui-comments-commentbase-comment";
const replyAllClassName = "ocean-ui-comments-commentbase-commentall";
const commentBodyClassName = "ocean-ui-comments-commentbase-body";
const contentClassName = "ocean-ui-comments-commentbase-contents";
const commentOuterClassName = "ocean-ui-comments-post";

(() => {
  setTimeout(() => {
    document.body.addEventListener("click", (e: Event) => {
      if (document.body.dataset.quotoneEnabled !== "true") return;

      const targetEl = e.target as HTMLElement;
      if (targetEl.tagName.toLowerCase() !== "a") return;
      if (
        !targetEl.classList.contains(replyClassName) &&
        !targetEl.classList.contains(replyAllClassName)
      )
        return;
      const commentBodyEl = targetEl.closest(`.${commentBodyClassName}`);
      const contentEl = commentBodyEl.querySelector(`.${contentClassName}`);
      const commentOuterEl = targetEl.closest(`.${commentOuterClassName}`);

      setTimeout(() => {
        const editorEl = commentOuterEl.querySelector("[contenteditable]");
        if (!editorEl) return;

        const wrapperEl = document.createElement("blockquote");

        Object.keys(styles).forEach((key) => {
          wrapperEl.style[key] = styles[key];
        });

        wrapperEl.innerHTML = contentEl.outerHTML;

        const firstChild = editorEl.firstChild as HTMLElement;
        if (firstChild && firstChild.tagName.toLocaleLowerCase() === "br") {
          editorEl.removeChild(firstChild);
        }

        const lastEl = wrapperEl.querySelector("p:last-child") as HTMLElement;
        if (lastEl) {
          lastEl.setAttribute(
            "style",
            `${lastEl.style.cssText} margin-bottom: 0;`
          );
        }

        if (targetEl.classList.contains(replyAllClassName)) {
          editorEl.appendChild(document.createElement("br"));
        }

        editorEl.appendChild(wrapperEl);
        editorEl.appendChild(document.createElement("br"));

        const range = document.createRange();
        const selection = window.getSelection();

        range.setStart(editorEl.lastChild, 0);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }, 100);
    });
  }, 500);

  function initialize() {
    chrome.storage.sync.get("quotoneEnabled", ({ quotoneEnabled = true }) => {
      setEnabled(quotoneEnabled);
    });
    chrome.storage.onChanged.addListener((changes) => {
      if (!changes.quotoneEnabled) return;

      chrome.storage.sync.set({
        quotoneEnabled: changes.quotoneEnabled.newValue,
      });
      setEnabled(changes.quotoneEnabled.newValue);
    });
  }

  function setEnabled(enabled: boolean) {
    document.body.dataset.quotoneEnabled = enabled.toString();
  }

  initialize();
})();
