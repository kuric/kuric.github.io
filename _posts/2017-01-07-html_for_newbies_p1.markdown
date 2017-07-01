---
layout: post
title: HTML for newbies - part 1
date: 2017-06-30
excerpt_separator: <!--more-->
---

# HTML for newbies - part 1
In this series of posts, we will look in detail at the basis of the HTML, necessary for writing a simple page. 
In the future, we will further analyze the methods of making up rubber pages, adaptive pages, and much, much more.
Today we will study the main tags. 
Let's start with what tags are mandatory on the page and forming its structure.
Are you ready?
Let'go!
<!--more-->
## Structure of the simplest page
The site page is a plain text file with the extension .html . 
Inside this file, the text of the HTML page is stored along with the tags. 
This file must have the following tags: ```<html>``` tag, which should contain the text of the entire site (all that is written outside this tag, the browser will be ignored), and there should be two more tags inside it: the ```<head>```tag for the service the content of the page and the ```<body>``` tag - for the main text, which is visible on the browser screen.
For example:
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Site title!</title>
	</head>
	<body>
		This is my content!
	</body>
</html>
```
This is a simple page, and we will consider it in more detail. I'll just say that ```<! DOCTYPE html>``` is mandatory, there is a lot of information in the standard site between the ```<head>``` and ```</head>```, but for now we need to know about 2 things: 
1. ```<meta charset = "utf-8">``` - encoding
2. ```<title> Site title! </title>``` - the title of the page (displayed at the top, when you hover your mouse over the page in the browser).
Let's better understand the other tags with which we can create a good site, such as ```p, h1-h6, b, i , ul, ol ,li etc..```

## Paragraphs
One of the main elements of the page are paragraphs - tag ```<p>``` - opener tag and tag ```</p>``` - closing tag.
For example:
```
<p>This is my paragraph</p>
<p>This is my paragraph too!</p>
```
## The headings h1, h2, h3, h4, h5, h6
As in any book there are headings and there are paragraphs of text also in HTML there are headings and paragraphs.
The headings display what will be discussed later.
Headers are created using the tags ```<h1>, <h2>, <h3>, <h4>, <h5>, <h6>```. 
They differ in importance of use. In the h1 header - should be located the name of the entire HTML page, in h2 - the name of the page blocks, in h3 - the name of the subblocks and so on.
For example:
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Site title!</title>
	</head>
	<body>
		<h1>Heading h1</h1>
		<h2>Heading h2</h2>
		<h3>Heading h3</h3>
		<h4>Heading h4</h4>
		<h5>Heading h5</h5>
		<h6>Heading h6</h6>
	</body>
</html>
```
In the browser it will look like this:
<h1>Heading h1</h1>
<h2>Heading h2</h2>
<h3>Heading h3</h3>
<h4>Heading h4</h4>
<h5>Heading h5</h5>
<h6>Heading h6</h6>

## The tags ```<b>``` and ```<i>```
Tag b - is a bold tag. It is used to highlight text.
For example:
```
<p><b>This is my paragraph</b></p>
```
Look like this:
<p><b>This is my paragraph</b></p>
With this tag, you can select words, phrases and more in your text to improve the readability of the text and to set the emphasis on individual elements.
Tag i - is a cursive tag. With this tag, you can add addition "beauty" to your text.
For example:

## The lists ```<ol>``` and ```<ul>``` tags
Like the table of contents in the book, lists are also used in the NTML page. Lists are of two types - ordered and unordered. Hence the name of the tags  - ol (ordered list) and ul (unordered list).
The items for this list are created by tags ```<li>``` - list items.
For example:
```
<ol>
	<li>This is first item</li>
	<li>This is second item</li>
</ol>
<ul>
	<li>This is first item</li>
	<li>This is second item</li>
</ul>
```
In browser it look like this:
<ol>
	<li>This is first item</li>
	<li>This is second item</li>
</ol>
<ul>
	<li>This is first item</li>
	<li>This is second item</li>
</ul>
Pay attention to the difference in the display. 
Unordered lists are with circles for items and ordered with numbers for items.
## The links
We use links on all sites. Basically, we use them to go to another page.
The links - ```<a>``` tag.
For example:
```
<a href="">This is link</a>
```
Link has a more attributes - like ```href``` or ```alt```. 
To start with, we have enough ```href``` (more about links attributes you can read here [w3schools.com](https://www.w3schools.com/html/html_links.asp))
## The images
We certainly can create a page with text and links right now, but how can we do without pictures of cats? :)
We can add pictures using the tag - ```img```.
For example:
```
<img src="https://i.ytimg.com/vi/-qj4O2aHQqc/maxresdefault.jpg">
```
Cat here :)
<img src="https://i.ytimg.com/vi/-qj4O2aHQqc/maxresdefault.jpg" style="width:100px;height:100px;">
## The result
So sum up everything that was described above.
With the help of tags, we can create a simple web page, add text, pictures, links or a list. All this can be placed with headings and get a full-fledged work page.
For example:
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>My site about cats!</title>
	</head>
	<body>
		<h1>This is my site about cats</h1>
			<p>
				Since cats were venerated in ancient Egypt, they were commonly believed to have been domesticated there, but there may have been instances of domestication as early as the Neolithic from around 9,500 years ago (7,500 BC)
			</p>
			<ol>
				<li>Cats are cool!</li>
				<li>Cats are very nice!</li>
			</ol>
			Cat here :)
			<img src="https://i.ytimg.com/vi/-qj4O2aHQqc/maxresdefault.jpg" style="width:100px;height:100px;">
			<a href ="https://en.wikipedia.org/wiki/Cat">More about cats!</a>
	</body>
</html>
```
You can just copy the code above and you will get a very simple website.
In the next post we will get acquainted with the basics of CSS and make our simple page more attractive.
Ok. I think it will be useful to you. Thank you.

***