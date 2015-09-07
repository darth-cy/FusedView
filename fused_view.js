Backbone.FusedView = Backbone.View.extend({

  addComponent: function(component, selector){
    this._subComponents().push([component, selector]);
    this._renderComponent(component, selector);
  },

  fusion: function(){
    var fused = this;

    fused._subComponents().each(function(comp){
      fused.addComponent(comp[0], comp[1]);
    })
  },

  remove: function(){
    Backbone.View.prototype.remove.call(this);

    this._subComponents().each(function(comp){
      comp[0].remove();
    });
  },

  emptyComponents: function(){
    this._subComponents().each(function(comp){
      comp[0].remove();
    })

    this._allComponents = {};
    return _(this._allComponents);
  },

  _renderComponent: function(component, selector){
    if(selector){
      this.$el.find(selector).append(component.$el);
    }else{
      this.$el.append(component.$el);
    }
    component.delegateEvents();
    component.render();

    if(component.fusion){
      component.fusion();
    }
  },

  _subComponents: function(){
    this._allComponents = this._allComponents || {};
    return _(this._allComponents);
  }
})
