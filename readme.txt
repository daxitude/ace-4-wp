/*  This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as 
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

=== Plugin Name ===
Contributors: daxitude
Tags: 
Requires at least: 3.4
Tested up to: 3.4.2
Stable tag: 0.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

This plugin adds a third tab to the post content editor that enables ACE syntax-highlighted code editing

== Description ==

When editing large posts and pages you may often miss your trusty old TextMate (or insert-favorite-code-editor-name-here). With [ACE Editor](http://ace.ajax.org/) you can have your cake and eat it, too. ACE Editor for WP adds a third tab to post.php and post-new.php that enables ACE Editor on the post content editor.

== Installation ==

See [Installing Plugins](http://codex.wordpress.org/Managing_Plugins#Installing_Plugins).

This plugin hasn't been submitted to the WordPress Plugin Directory yet. In the mean time, you can install it this way:

1. Download the zip (or clone the repo) from [Github](http://github.com/daxitude/wp-abt) and drop it into your site's wp-content/plugins directory.
1. Navigate to your site's Admin->Plugins section (wp-admin/plugins.php) and activate the plugin.
1. Go edit a post/page/custom post type, or add a new one, and look for the "ACE" tab next to the "Visual" and "HTML" tabs at the top right of the editor content box. If you don't have the Visual tab, that's great! It means you or someone else disabled visual mode. That'll make toggling between modes a much more pleasant experience (see more in release notes).
1. Many of the plugin's admin screens have contextual help


== Release Notes ==

= v0.1 =
Things are a little finicky when toggling to/from the Visual mode. It will probably obliterate the pretty HTML formatting you spent all that precious time creating. So, I recommend getting rid of Visual mode. You can do this easily yourself under Users -> Your Profile -> 'Disable the visual editor when writing'. You can also (en)force no-Visual-mode in certain places on your site. See no-visual.php for an example.

There are still some bugs, but it's already making me smile :{D

== Screenshots ==

tbd

== TODO ==
* make height of editor consistent when toggling between modes
* deal with auto_p 
* allow users to set their ACE preferences on their profile screen

