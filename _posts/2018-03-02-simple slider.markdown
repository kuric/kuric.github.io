---
layout: post
title: Simple Jquery slider
date: 2018-03-02
category: css_js
excerpt_separator: <!--more-->
---
# Simple Jquery carousel

Only simple CSS3, Jquery and some JS.
Very simple in using and config. Pretty result!

<!--more-->
### Simple using:
```
<script type="text/javascript">
	$(document).ready(function() {
	    $('#slidewrapper').cardRotate({
	    	'transitionTime':'2s',
	    	'offsetY':'5%',
	    	'autoPlay':true
	    });
	});
</script>
```
### Simple config:
```
    'transitionTime' : '3s',
    'offsetY': '5%',
    'offsetX': '10%',
    'autoPlay': true
```

Full result you can [See here](/css_js/cardCarousel/index.html)