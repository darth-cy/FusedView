# Fused View #
This is a Backbone supplementary library that enables easier construction of composite views. It allows recursive removal of subviews and pushing subviews into the current element's $el.

### Site Powered by Fused View ###
My personal project: [SoundBolt][soundbolt]

[soundbolt]: http://www.soundbolt.co

### APIs ###

+ <code>View.addComponent</code>: This allows adding a subview to the current View element and automatically renders it.
+ <code>View.fusion</code>: This re-renders all subview and is used primarily for rerendering the composite view.
+ <code>View.remove</code>: This method recursively removes all the subviews attached to the current master view.
+ <code>View.emptyComponents</code>: This empties the subviews array.

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
### Example Class ###
``` javascript
Soundbolt.Views.UserIndex = Backbone.FusedView.extend({
  template: JST['user_index'],
  className: 'user-view-normal-master row',

  events: {
    "click a#display-my-streams": "displayMyStreams",
  },

  initialize: function(options){
    ... // Initialization utilities.

    this.addSideBar();
    this.addStreamTrackField(); // SideBar and TrackField are subviews of UserIndex.

    this.listenTo(this.model, 'sync', this._resetAssets.bind(this));
  },

  ...

  addSideBar: function(){
    var sideBarView = new Soundbolt.Views.SideBarView({
      user: this.model
    });

    this.addComponent(sideBarView); // Use addComponent to add a subview.
  },

  addStreamTrackField: function(){
    var tracksFieldView = new Soundbolt.Views.TracksFieldView({
      users: this.users,
      user: this.model,
      tracks: this.streams,
      own: false
    });

    this._swapTrackField(tracksFieldView);
  },

  ...

  render: function(){
    var content = this.template()
    var newDiv = $('<div>').html(content).addClass("container");
    this.$el.html(newDiv);

    this.fusion();  // Use fusion to re-render all subviews.

    return this;
  },

  ...

  _swapTrackField: function(trackField){
    this._trackField && this._trackField.remove();
    this._trackField = trackField;

    this.addComponent(trackField);  // Private function that uses addComponent.
  }
})
```

### Development Highlights ###
+ Event Delegation: Because the subviews are initiated in the master view, it's important to delegate relevant events to the subviews so they subviews don't lose any clicking features.
+ Recursive Removal: It's possible that the subview of a master view is itself a composite view. Therefore, when removing subviews,  it's essential to call the remove function on each element.
