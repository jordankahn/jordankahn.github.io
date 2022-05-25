(function()  {
        let template = document.createElement("template");
        template.innerHTML = `
            <form id="form">
                <fieldset>
                    <legend>Change Image</legend>
                    <table>
                        <tr>
                            <td>Image Link</td>
                            <td><input id="gauge-svg" type="text" size="40" maxlength="100"></td>
                        </tr>
                    </table>
                    <input type="submit" style="display:none;">
                </fieldset>
            </form>
        `;

        class GaugeBps extends HTMLElement {
            constructor() {
                super();
                this._shadowRoot = this.attachShadow({mode: "open"});
                this._shadowRoot.appendChild(template.content.cloneNode(true));
                this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
            }

            _submit(e) {
                e.preventDefault();
                this.dispatchEvent(new CustomEvent("propertiesChanged", {
                        detail: {
                            properties: {
                                link: this.link
                            }
                        }
                }));
            }

            set link(newSVGLink) {
                this._shadowRoot.getElementById("gauge-svg").value = newSVGLink;
            }

            get link() {
                return this._shadowRoot.getElementById("gauge-svg").value;
            }
        }

    customElements.define("com-demo-gauge-bps", GaugeBps);
})();