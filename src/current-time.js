class CurrentTime extends HTMLElement {
  static observedAttributes = ["format"];

  connectedCallback() {
    this.render();
    this.refreshTime();
  }

  disconnectedCallback() {
    clearInterval(this.interval);
  }

  refreshTime() {
    this.interval = setInterval(() => {
      this.$time = new Date().toLocaleString();
      this.$timeUtc = new Date().toUTCString();
      this.render();
    }, 1000);
  }

  render() {
    const format = this.getAttribute("format");
    this.innerHTML = /* HTML */ ` <div class="currentTime">
      <p class="currentTime__title">
        Heure ${format === "UTC" ? "UTC" : "Locale"}
      </p>
      <time class="currentTime__time">
        ${format === "UTC" ? this.$timeUtc : this.$time}
      </time>
    </div>`;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }
}

customElements.define("current-time", CurrentTime);
