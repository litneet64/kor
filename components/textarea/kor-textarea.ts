import { LitElement, css, html, customElement, property } from 'lit-element';
import { sharedStyles } from '../../shared-styles';

/**
 * @prop {String} label - If set, defines the text label shown on top.
 * @prop {String} value - If set, defines the value of the input. Changes upon user interaction.
 * @prop {Number} rows - Defines the visible number of lines in a text area.
 * @prop {Number} maxLength - Defines the maximum number of characters allowed in the text area.
 * @prop {Boolean} active - If set to true, highlights the label and underline.
 * @prop {Boolean} disabled - If set to true, disables mouse clicks and the style gets updated.
 * @prop {Boolean} readonly - If set to true, disables the input without reducing the opacity.
 * @prop {Boolean} autofocus - If set to true, the component gets focused as soon as the page loads.
 */

@customElement('kor-textarea')
export class korTextarea extends LitElement {
  @property({ type: String, reflect: true }) label;
  @property({ type: String, reflect: true }) value;
  @property({ type: Number, reflect: true }) rows = 1;
  @property({ type: Number, reflect: true, attribute: 'max-length' }) maxLength = 1;
  @property({ type: Boolean, reflect: true }) active;
  @property({ type: Boolean, reflect: true }) disabled;
  @property({ type: Boolean, reflect: true }) readonly;
  @property({ type: Boolean, reflect: true }) autofocus;

  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          display: flex;
          align-items: center;
          min-height: 40px;
          border-width: 0px 0px 1px 0px;
          border-style: solid;
          border-color: rgba(var(--neutral-1), 0.2);
          border-radius: 2px;
          box-sizing: border-box;
          padding: 4px 8px 3px 8px;
          width: 100%;
          overflow: visible;
          background-color: rgba(var(--neutral-1), 0.05);
          position: relative;
        }
        :host,
        .label,
        textarea {
          transition: var(--transition-1);
        }
        .center {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
        }
        textarea {
          background: none;
          border: none;
          padding: 0px;
          outline: none;
          font: var(--body-1);
          color: var(--text-1);
          resize: none;
        }
        textarea::-webkit-scrollbar {
          display: none;
        }
        /* active */
        :host([active]) {
          border-color: rgba(var(--neutral-1), 0.6);
        }
        :host([active]) .label {
          color: rgb(var(--accent-1));
        }
        /* disabled */
        :host([disabled]) {
          opacity: 0.2;
        }
        :host([disabled]),
        :host([readonly]) {
          pointer-events: none;
        }
        /* readonly */
        :host([readonly]) {
          background: transparent;
        }
        /* label */
        .label {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font: var(--body-1);
          color: var(--text-2);
          pointer-events: none;
        }
        :host([value]) .label,
        :host([active]) .label {
          font: var(--body-2);
        }
        textarea,
        .label {
          line-height: 16px;
        }
        /* clear */
        .clear-icon {
          transition: var(--transition-1), 0.1s opacity ease-in-out 0.1s;
        }
        :host(:not(:hover):not([active])) .clear-icon {
          transition: var(--transition-1), 0.1s width ease-in-out 0.1s,
            0.1s margin ease-in-out 0.1s;
          font-size: 0;
          max-width: 0px;
          max-height: 0px;
          opacity: 0;
          margin-left: 0;
        }
        /* hover inputs */
        @media (hover: hover) {
          :host(:hover:not([active])) {
            border-color: rgba(var(--neutral-1), 0.4);
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="center">
        ${this.label ? html` <label class="label">${this.label}</label> ` : ''}
        <textarea
          .value="${this.value !== undefined ? this.value : ''}"
          .rows="${this.rows}"
          .columns="${this.rows}"
          .maxLength="${this.maxLength}"
          ?autofocus="${this.autofocus}"
          @input="${(e) =>
            e.target.value
              ? (this.value = e.target.value)
              : this.removeAttribute('value')}"
          @focus="${() => (this.active = true)}"
          @blur="${() => (this.active = false)}"
        ></textarea>
      </div>
    `;
  }

  constructor() {
    super();
    this.addEventListener('click', () => {
      this.active = true;
      this.shadowRoot.querySelector('textarea').focus();
    });
  }

  handleClear() {
    this.value = undefined;
    this.removeAttribute('value');
  }

  attributeChangedCallback(name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }
}
