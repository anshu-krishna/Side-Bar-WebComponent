class SideBar extends HTMLElement {
	static get template() {
		if (typeof SideBar._template == "undefined") {
			SideBar._template = document.createElement("template");
			SideBar._template.innerHTML =
				`<style>
:host {
	--width: 400px;
	z-index: 400;
	background: #212121;
	color: #ffffff;
	transition: left 0.2s;
}
#cntr, #overlay {
	position: fixed;
	top: 0;
	height: 100vh;
	max-height: 100vh;
}
#cntr {
	width: var(--width);
	left: calc(-1.2 * var(--width));
	box-sizing: border-box;
	box-shadow: 0 0 0.5em 1px #000;
	transition: inherit;
	background: inherit;
	color: inherit;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: min-content auto;
}
#overlay {
	width: calc(100vw - var(--width));
	left: calc(-1.2 * (100vw - var(--width)));
	background: -webkit-gradient(linear, left top, right top, from(rgba(0,0,0,0.5)),to(rgba(0,0,0,0)));
	background: linear-gradient(to right, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0) 100%);
	transition: inherit;
}
:host([show]) #cntr {
	left: 0;
}
:host([show]) #overlay {
	left: var(--width);
}
#title_cntr {
	display: grid;
	grid-template-columns: min-content auto;
	align-items: center;
	border-bottom: 1px solid;
}
#close_btn {
	font-family: 'Courier New', Courier, monospace;
	font-size: 1.4em;
	padding: 0.2em 0.3em;
	cursor: pointer;
}
#content_cntr {
	max-height: 100%;
	overflow-y: auto;
}
</style>
<div id="cntr">
	<div id="title_cntr"><span id="close_btn">&#128473;</span><div><slot name="title"></slot></div></div>
	<div id="content_cntr"><slot></slot></div>
</div>
<div id="overlay"></div>`;
		}
		return SideBar._template;
	}
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(SideBar.template.content.cloneNode(true));
		this.__nodes = {
			overlay: this.shadowRoot.querySelector('#overlay'),
			title_btn: this.shadowRoot.querySelector('#close_btn')
		};
		this.__nodes.overlay.addEventListener('click', () => { this.show = false; });
		this.__nodes.title_btn.addEventListener('click', () => { this.show = false; });
	}
	// connectedCallback() {}
	// disconnectedCallback() {}
	// adoptedCallback() {}
	static get observedAttributes() {
		return ['show']
	}
	attributeChangedCallback(name, oldval, newval) {
		//	console.log("Changed", name, ":", oldval, "->", newval);
		switch (name) {
			case 'show':
				if (newval === null) {
					this.dispatchEvent(new Event('hide'));
				} else {
					this.dispatchEvent(new Event('show'));
				}
				break;
		}
	}
	get show() {
		return this.hasAttribute("show");
	}
	set show(val) {
		if (val) {
			this.setAttribute("show", '');
		} else {
			this.removeAttribute("show");
		}
	}
}
customElements.define("side-bar", SideBar);