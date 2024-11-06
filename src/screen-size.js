class ScreenSize extends HTMLElement {
  static observedAttributes = ["unit"];

  connectedCallback() {
    this.attachShadow({ mode: "open" });

    this.unit = this.getAttribute("unit");

    this.shadowRoot.innerHTML = /* HTML */ `
      <p></p>
      <button>${this.unit}</button>
    `;

    this.$unit = this.shadowRoot.querySelector("p");
    this.$text = this.shadowRoot.querySelector("button");

    this.renderUnit();
    this.renderText();
    this.renderSize();
  }

  renderText() {
    this.$text.addEventListener("click", () => {
      this.$text.textContent = this.unit;
      this.renderSize();
    });
  }

  renderUnit() {
    window.addEventListener("resize", () => {
      this.renderSize();
    });
  }

  renderSize() {
    this.$unit.textContent =
      this.unit === "rem"
        ? window.innerWidth /
            parseInt(
              getComputedStyle(document.body).getPropertyValue("font-size")
            ) +
          "rem"
        : window.innerWidth + "px";
  }
}

customElements.define("screen-size", ScreenSize);
