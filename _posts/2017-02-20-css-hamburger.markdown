---
layout: post
title: CSS simple hamburger
date: 2017-02-20
category: css_js
---
# CSS hamburger without Bootstrap or other framework. 
Very often we do button for mobile version of site.
### We can:
1. use Bootstrap or other framework
2. use icon font like FontAwesome or other
3. or we can create it yourself
This is faster than framework, sinplier in use and I just prefer CSS ;)
### This is the part of code:
```
.hamburger:before,.hamburger:after  {
	content: '';
	position: absolute;
}
.hamburger:before {
	top: -10px;
}
.hamburger:after {
	top: 10px;
}
```
Full result you can [See here](/css_js/hamburger/index.html)