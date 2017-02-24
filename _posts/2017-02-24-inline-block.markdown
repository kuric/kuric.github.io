---
layout: post
title: Inline block elements
date: 2017-02-24
category: blog
---
# Inline and block elements
Hello. 
I often sought, and then lost the information, so I decided to write a post and does unite all that is needed. 
It may be useful to someone other than me. So, let's begin.
		
## HTML Inline and HTML Block Elements.

### Inline Elements
1. Width is the width of the content;
2. They are arranged horizontally one after another;
3. Vertical margin can not be set;
4. Width and Height can not be set;
5. For positioning can use property direction and text-align;
6. Left and right margin can used for horizontal positioning;
7. Property vertical-align can used for vertical positioning;

### Block Elements
1. Property display: block, list-item,table;
2. The default width is the width of the area of the inner container;
3. They are arranged vertically one after another;
4. Can be set width and height;
5. Margins can use for positioning;

### Inline-block Elements
1. Property display: inline-block;
2. We can combine blocks and inlines actions of elements container;
3. For example: ```a { display: inline-block}```
### Notes: IE7- do not support property inline-block for elements thats not inline for default.
Use simple solution:
```{
display: inline-block;
zoom: 1;
display: inline;
}```
### After that:
+ Blocks are arranged horizontally one after another;
+ Can be set width and height;
+ Margins can use for positioning;
+ Property vertical-align can used for vertical positioning;

Ok. Why we can use inline-block?

First and important: as a substitute for float!

### For example:
1. Elements remain part of the stream;
2. It is not necessary to use clearfixes;
3. We can control vertical aligment (use vertical-align: top, middle, bottom;);
4. No additional markings when columns has different heights;
5. We can center our columns with text-align: center;
## IMPORTANT! We can create our grids with inline-block without floats :)