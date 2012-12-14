=== ACE Editor for WP ===
Contributors: daxitude
Tags: admin, code, editor, syntax
Requires at least: 3.4
Tested up to: 3.5
Stable tag: 0.7.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Adds ACE Editor to the post content editor for syntax-highlighting and more

== Description ==

This plugin adds an advanced code editor to the post content box on post.php and post-new.php. A third tab is added alongside Visual and HTML modes and you can toggle between the three.

NOTE: Visual Mode tends to eat up most/all of any special formatting. If you want to use ACE I'd suggest disabling Visual mode completely. You can do this easily yourself under Users -> Your Profile -> 'Disable the visual editor when writing'. You can also do it for all users and for specific post types only. See the accompanying file no-visual.php for an example.

Not all features work in Internet Explorer v8 and earlier.

This does not work in full screen mode. Yet.

= Features =
* Syntax highlighting
* Tabbing
* Line numbers
* Auto closing of tags and quotes
* Line highlighting
* Default theme is TextMate
* Fixed-width, soft wrap, adjustable height
* Remembers your last used mode and loads it up on initial page view

[ACE Editor](http://ace.ajax.org/) can do quite a bit more. If you have integration ideas, let me hear about it

== Installation ==

See [Installing Plugins](http://codex.wordpress.org/Managing_Plugins#Installing_Plugins).

1. Download the zip from here or from [Github](http://github.com/daxitude/ace-4-wp) and drop it into your site's wp-content/plugins directory.
1. Navigate to your site's Admin->Plugins section (wp-admin/plugins.php) and activate the plugin.
1. Go edit a post/page/custom-post-type, or add a new one, and look for the ACE tab next to the Visual and HTML Mode tabs at the top right of the content editor box. If you don't see the Visual tab, that's great! It means you or someone else disabled Visual Mode. That'll make toggling between modes a much more pleasant experience (see more in release notes).

== Screenshots ==

1. Editing a Page

== Todo ==
* make height of editor consistent when toggling between modes
* deal with auto_p? (might help preserve formatting from Visual mode)
* make it work in full screen mode
* allow users to set their ACE preferences on their profile screen

== Changelog ==

= 0.7 =
* bugfix - make sure ACE loads on post-new.php
* bugfix - adjust z-index on ACE Editor so wp nav menus stay on top
* bugfix - make ACE resizable only in south direction

= 0.6 =
* bugfix - in JS, check to make sure tinymce is available

= 0.5 =
* initial release

