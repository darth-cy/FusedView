# Fused View #
This is a Backbone supplementary library that enables easier construction of composite views. It allows recursive removal of subviews and pushing subviews into the current element's $el.

### Site Powered by Fused View ###
My personal project: [SoundBolt][soundbolt]

[soundbolt]: http://www.soundbolt.co

### How to Use ###
Download the fused_view.js file and put it in the javascript util folder in your project.
This will define <code>Backbone.FusedView</code> object on the Backbone namespace. When you want to use it, directly extend FusedView class like normal Backbone Views.

```
  Namespace.Views.yourViewName = Backbone.FusedView.extend({

    initialize: function(){

    },
    ...

  })
```

### APIs ###

+ <code>View.addComponent</code>: This allows adding a subview to the current View element and automatically renders it.
+ <code>View.fusion</code>: This re-renders all subview and is used primarily for rerendering the composite view.
+ <code>View.remove</code>: This method recursively removes all the subviews attached to the current master view.
+ <code>View.emptyComponents</code>: This empties the subviews array.

### Development Highlights ###
+ Event Delegation: Because the subviews are initiated in the master view, it's important to delegate relevant events to the subviews so they subviews don't lose any clicking features.
+ Recursive Removal: It's possible that the subview of a master view is itself a composite view. Therefore, when removing subviews,  it's essential to call the remove function on each element.
