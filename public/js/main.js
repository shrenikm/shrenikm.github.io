// Site interactions, vanilla JS (no jQuery or Bootstrap JS):
//   - shorten the fixed navbar after scrolling a little
//   - toggle the mobile navbar menu
//   - add a copy button to each code block

function initNavbar() {
  var navbar = document.querySelector(".navbar");
  if (!navbar) return;

  function onScroll() {
    if (window.pageYOffset > 50) {
      navbar.classList.add("top-nav-short");
    } else {
      navbar.classList.remove("top-nav-short");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = navbar.querySelector(".navbar-toggle");
  var collapse = navbar.querySelector("#main-navbar");
  if (toggle && collapse) {
    toggle.addEventListener("click", function () {
      var open = collapse.classList.toggle("in");
      toggle.classList.toggle("collapsed", !open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      navbar.classList.toggle("top-nav-expanded", open);
    });
  }
}

function initHeadingAnchors() {
  var headings = document.querySelectorAll(
    ".blog-post h1, .blog-post h2, .blog-post h3, .blog-post h4, .blog-post h5, .blog-post h6",
  );
  headings.forEach(function (heading) {
    if (!heading.id || heading.dataset.anchored) return;
    heading.dataset.anchored = "true";

    var anchor = document.createElement("a");
    anchor.className = "heading-anchor";
    anchor.href = "#" + heading.id;
    anchor.setAttribute("aria-label", "Link to this section");
    anchor.textContent = "#";
    heading.insertBefore(anchor, heading.firstChild);
  });
}

function initCopyButtons() {
  var blocks = document.querySelectorAll(".blog-post pre");
  blocks.forEach(function (pre) {
    if (pre.dataset.copyReady) return;
    var code = pre.querySelector("code");
    if (!code) return;
    pre.dataset.copyReady = "true";
    pre.classList.add("code-block");

    var button = document.createElement("button");
    button.type = "button";
    button.className = "code-copy-btn";
    button.textContent = "Copy";
    pre.appendChild(button);

    button.addEventListener("click", function () {
      navigator.clipboard.writeText(code.textContent || "").then(function () {
        button.textContent = "Copied";
        setTimeout(function () {
          button.textContent = "Copy";
        }, 1200);
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initNavbar();
  initHeadingAnchors();
  initCopyButtons();
});
