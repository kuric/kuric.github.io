---
layout: post
title: CSS button effect
date: 2017-02-20
category: css_js
excerpt_separator: <!--more-->
---
# CSS button effect. 
Only simple CSS3.
This is faster than framework and I just prefer CSS ;)
In this work I used pure CSS3 (:before and :after and some simple properties).
<!--more-->
### This is the part of code:
```
li:hover:before {
    transform: rotate(-90deg);
    top: -22px;
    left: 50%;
}
li:hover:after {
    transform: rotate(-90deg);
    top: 22px;
    right: 49%;
}
```
Full result you can [See here](/css_js/beautiful__button/index.html)