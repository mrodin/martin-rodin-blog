---
title: "How to make focusable React box components with ease"
excerpt: ""
coverImage: "/assets/blog/covers/react-focusable-box-component.jpg"
date: "2020-06-13T05:35:07.322Z"
author:
    name: Martin Rodin
    picture: "/assets/blog/authors/martin.jpg"
ogImage:
    url: "/assets/blog/covers/react-focusable-box-component.jpg"
---

Recently I was working on a form app containing many boxes with various input fields. One of the requirements was to make each box focusable on mouse hover and on click. I was a bit afraid of this as managing focus in React can be painful, but fortunately, I found an easy solution using CSS.

You can see the final project here in CodeSandbox:

<iframe
     src="https://codesandbox.io/embed/zealous-microservice-ue34m?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="zealous-microservice-ue34m"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-autoplay allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

Suppose we have a box component that looks like this:

```jsx
const Card = () => (
    <div className="card">
        <div className="header">Focusable box</div>
        <div className="content">
            <label for="fname">First name:</label>
            <input type="text" id="fname" name="fname" />
            <div className="space" />
            <label for="lname">Last name:</label>
            <input type="text" id="lname" name="lname" />
        </div>
    </div>
);
```

There are several things we want to achieve:

-   Give the Card component some unique style when the user hovers over it
-   Apply the same style also when the user is typing in the input field inside the Card component (i.e. the input field has a focus)
-   Optionally - we want to make the Card component itself focusable so that the styles are applied also when the user clicks on the Card (outside the input field)

## Applying styles on component hover

This is the easiest part as we can use the `:hover` pseudo-class:

```css
.card:hover {
    box-shadow: 0 1px 9px 0 #cccccc;

    .header {
        background-color: #32e0c4;
    }
}
```

## Using focus-within pseudo-class

To give the Card the same style when one of its input fields have focus, we can use another pseudo-class called :focus-within:

```css
.card:hover,
.card:focus-within {
    box-shadow: 0 1px 9px 0 #cccccc;

    .header {
        background-color: #32e0c4;
    }
}
```

This pseudo-class represents an element that received focus or has a nested element with focus, which is exactly our case.

As for the browser compatibility, `:focus-within` is available in all modern browsers except for Internet Explorer.

## Making Card component focusable

Normally `<div>` elements cannot receive focus either from keyboard events (through tab key) or from mouse clicks. To make the `<div>` element focusable, we need to add `tabIndex={0}` attribute to it.

```html
<div className="card" tabindex="{0}">...</div>
```

And that's it!
