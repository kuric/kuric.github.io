---
layout: post
title: Magic effects
date: 2017-02-26
category: blog
excerpt_separator: <!--more-->
---

# Magic effects
Ok, let's continue the theme effects on CSS.
In previous post on this theme ( who do not read - read necessarily [Animate.cs](https://kuric.github.io/blog/2017/02/25/animate-css/))
I showed that gives and how to use the library Animate.css
Today we look what libraries miniMAC.css gives to us.
Let'go!
<!--more-->
## How to use miniMAC
1. Download a library from  here [minimac](https://github.com/miniMAC/magic)
2. Add to you site
3. Make a magic effects

Let's take a closer look at what we can do.
For example:
```
<h1 class="magictime puffIn"> Let's Puff!!!</h1>
```
It's gives to us a wonderful effect of PuffIn a our Header.
Need more examples? Let's go here [Interactive examples](https://www.minimamente.com/example/magic_animations/)

### MiniMAC and JQUERY
We can add classes with JQUERY or with DOM for adding some effects to our site.
For example:
```
$('.btn-default').hover(function () {
  $(this).addClass('magictime magic');
});
```
or like this:
```
setTimeout(function(){
    $('.btn-default').addClass('magictime perspectiveDown');
}, 1000);
```
### Customize MiniMAC
Default CSS timing is:
```
.magictime {
    -webkit-animation-duration: 1s;
    -moz-animation-duration: 1s;
    -o-animation-duration: 1s;
    animation-duration: 1s;
}
```
But you can customize animation-duration, for example like this:
```
.magictime {
    -webkit-animation-duration: 1.5s;
    -moz-animation-duration: 1.5s;
    -o-animation-duration: 1.5s;
    animation-duration: 1.5s;
}
```
Also we can a customize all of classes:
```
.magictime.magic {
    -webkit-animation-duration: 1.5s;
    -moz-animation-duration: 1.5s;
    -o-animation-duration: 1.5s;
    animation-duration: 1.5s;
}
'''
It looks like a simple CSS. Yeah, it's a simple, usefull, fast and more and more and more ;)

I think it will be useful to you. Thank you and thanks to [Christian](https://github.com/miniMAC)

***