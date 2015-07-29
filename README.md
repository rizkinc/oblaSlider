# oblaSlider
js slider plugin with GSAP and JQuery
open source 

####how to use 

example js:
```javascript
$(document).ready(function () {
    $("#slider_1").obla_slider();
});
```
example HTML:
```html
<ul id="slider_1">
    <li class="slide"><img src="images/1.jpg" alt="" /></li>
    <li class="slide"><img src="images/2.jpg" alt="" /></li>
    <li class="slide"><img src="images/3.jpg" alt="" /></li>
    <li class="slide"><img src="images/4.jpg" alt="" /></li>
</ul>
```

####parameter 

#####1. "type" = 'fade' / 'slideX' / 'slideY' 
<dl>
    <dd>default 'fade'</dd>
    <dd>example js: </dd>
</dl>
```javascript
   $("#slider_1").obla_slider({
      type :'fade'
   });
```

#####2. intervalTime = float 
<dl>
    <dd>default 4</dd>
    <dd>example js: </dd>
</dl>
```javascript
   $("#slider_1").obla_slider({
      intervalTime : 5
   });
```

#####3. animDuration = float
<dl>
    <dd>default  0.5</dd>
    <dd>example js: </dd>
</dl>
```javascript
$("#slider_1").obla_slider({
    animDuration : 0.3
});
```

#####4. randomStart = boolean 
<dl>
    <dd>default  false</dd>
    <dd>example js: </dd>
</dl>
```javascript
$("#slider_1").obla_slider({
  randomStart : true
});
```

#####5. pauseOnFocus = boolean 
<dl>
    <dd>default  false</dd>
    <dd>example js: </dd>
</dl>
```javascript
$("#slider_1").obla_slider({
  pauseOnFocus : true
});
```

#####6. zoomOnPause = boolean 
<dl>
    <dd>default  true</dd>
    <dd>example js: </dd>
</dl>
```javascript
   $("#slider_1").obla_slider({
      pauseOnFocus : false
   });
```

#####7. ease = string 
<dl>
    <dd>default  'Linear.easeOut'</dd>
    <dd>example js: </dd>
</dl>
```javascript
   $("#slider_1").obla_slider({
      ease : 'Cubic.easeOut'
   });
```   
>read more at https://greensock.com/get-started-js#easing
  

#####8. navDirection = null / selector (init nav direction slider )
<dl>
    <dd>default  null</dd>
    <dd>example js: </dd>
</dl>
```javascript
   $("#slider_1").obla_slider({
      navDirection:$(".obla_navDirection")
   });
```  
<dl>
    <dd>example HTML: </dd>
</dl>
```html
<div class="obla_navDirection">
 <a href="" class="prev">prev</a>
 <a href="" class="next">next</a>
</div>
```   
#####9. navPager = null / selector (init nav pager slider )
<dl>
    <dd>default  null</dd>
    <dd>example js: </dd>
</dl>
```javascript
$("#slider_1").obla_slider({
  navPager:$(".obla_navPager")
});
```  
<dl>
    <dd>example HTML: </dd>
</dl>
```html
<div class="obla_navPager">
    <a href="" data-index="0">1</a>
    <a href="" data-index="1">2</a>
    <a href="" data-index="2">3</a>
    <a href="" data-index="3">4</a>
</div>
```   
#####10. afterSlide = method (call back after slide)
<dl>
    <dd>example JS: </dd>
</dl>
```javascript
$("#slider_1").obla_slider({
  afterSlide:function(current_slide,next_slide,previous_slide,index){
    //get current index  - index.current_index
    //get next index  - index.prev_index
    //get prev index  - index.next_index
  }
});
```    
    
#####11. beforeSlide = method (call back before slide)
<dl>
    <dd>example JS: </dd>
</dl>
```javascript
$("#slider_1").obla_slider({
  beforeSlide:function(current_slide,next_slide,previous_slide,index){
    //get current index  - index.current_index
    //get next index  - index.prev_index
    //get prev index  - index.next_index
  }
});
```    

