# Side-Bar CustomElement
*\<side-bar\>* is a customElement for creating sidebar on a webpage.

#### Attributes:
*\<side-bar\>* has only one custom attribute
- show

	When *show* attribute is present then the sidebar is visible else it is hidden.

#### Events:
*\<side-bar\>* emits two events
- show

	This event is emitted when sidebar goes from hidden to visible.
- hide

	This event is emitted when sidebar goes from visible to hidden.

#### Slots:
*\<side-bar\>* has two slots. Only one slot is a named slot.
- title

	This slot corresponds to the sidebar's heading.

#### Example:
```html
<sidebar show>
	<div slot="title">My Menu</div>
	The menu contents go here.
</sidebar>
```