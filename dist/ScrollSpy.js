var h = Object.defineProperty;
var g = (r, t, i) => t in r ? h(r, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : r[t] = i;
var c = (r, t, i) => (g(r, typeof t != "symbol" ? t + "" : t, i), i);
class f {
  constructor(t) {
    c(this, "duration", 500);
    /*
     * It get two parameter:
     *   - The targetPosition argument specifies the destination point that you want to scroll to.
     *   - The duration argument determines how long the animation will take to be executed.
     * ------
     * note: The requestAnimationFrame method is a browser API method.
     */
    c(this, "smoothScroll", (t, i = 500) => {
      const n = window.scrollY;
      let s = 0;
      const d = (e, a, l, u) => (e /= u / 2, e < 1 ? l / 2 * e * e + a : (e--, -l / 2 * (e * (e - 2) - 1) + a)), o = (e) => {
        s === 0 && (s = e);
        const a = e - s, l = d(
          a,
          n,
          t,
          i
        );
        window.scrollTo(0, l), a < i && requestAnimationFrame(o);
      };
      requestAnimationFrame(o);
    });
    c(this, "getMainElement", (t) => {
      if (!t)
        throw Error("Element does not exist!");
      return t.hasAttribute("data-wg-link") ? t : this.getMainElement(t.parentElement);
    });
    c(this, "handleClickOnLinkItem", (t) => {
      var o;
      t.preventDefault();
      const n = (o = this.getMainElement(t.target).getAttribute("data-wg-link")) == null ? void 0 : o.replace("#", "");
      if (!n)
        throw new Error("section id is not valid!");
      const s = document.querySelector(
        `[data-wg-section="${n}"]`
      );
      if (!s)
        throw new Error("section id not found!");
      const d = s.getBoundingClientRect();
      this.smoothScroll(Math.ceil(d.top), this.duration);
    });
    c(this, "handleUserScroll", (t) => {
      const i = document.querySelectorAll("[data-wg-section]"), n = Array.from(i).find((e) => {
        const a = e.getBoundingClientRect();
        if (a.height - Math.abs(a.top) > a.height / 2 || a.top > 0)
          return e;
      }), s = document.querySelectorAll("[data-wg-link]");
      Array.from(s).filter(
        (e) => e.getAttribute("data-wg-link") !== `#${n == null ? void 0 : n.getAttribute("data-wg-section")}`
      ).forEach(
        (e) => e.classList.contains("active") && e.classList.remove("active")
      );
      const o = document.querySelector(
        `[data-wg-link="#${n.getAttribute(
          "data-wg-section"
        )}"]`
      );
      o != null && o.classList.contains("active") || o == null || o.classList.add("active");
    });
    t && (this.duration = t);
    const i = document.querySelectorAll("[data-wg-link]");
    i && (document.addEventListener("scroll", this.handleUserScroll), i.forEach((n, s) => {
      s === 0 && n.classList.add("active"), n.addEventListener("click", this.handleClickOnLinkItem);
    }));
  }
}
export {
  f as ScrollSpy
};
