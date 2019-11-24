import { LitElement, css, html, customElement, property } from 'lit-element'

@customElement('wa-tabs')
export class waTabs extends LitElement {

  @property({ type: Boolean, reflect: true }) vertical;

  static get styles() {
    return css`
      :host {
        display: flex;
        width: 100%;
        height: fit-content;
      }
      :host([slot="header"]) {
        margin-top: -16px;
      }
      :host(:not([vertical])) {
        border-bottom: 1px solid rgba(var(--neutral-1), .10);
      }
      /* verical tabs */
      :host([vertical]) {
        flex-direction: column;
      }
    `
  }

  render() {
    return html`
      <slot @slotchange="${this.handleVerticalItems()}"></slot>
    `
  }

  handleVerticalItems() {
    (<any>this.childNodes).forEach(el => {
      el.vertical = this.vertical
    });

  }
}
