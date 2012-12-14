<?php
/*
Plugin Name: ACE Editor for WP
Description: Adds ACE Editor to the post content editor for syntax-highlighting and more
Version: 0.7.1
Author: daxitude
Author URI: http://github.com/daxitude/
Plugin URI: http://github.com/daxitude/ace-4-wp
*/

class ACE_WP_Editor {
	
	public function __construct() {
		global $pagenow;
		
		if ( 'post.php' == $pagenow || 'post-new.php' == $pagenow ) {
			add_action( 'admin_head', array($this, 'inline_css') );
			add_action( 'admin_print_scripts-post.php', array($this, 'add_js') );
			add_action( 'admin_print_scripts-post-new.php', array($this, 'add_js') );			
		}
	}

	// silly jQuery ui-resizable sets the width on #wp-content-editor-container even though we
	// aren't allow resize in that direction. ugh
	// so few styles, might as well inline it for now rather than add another request
	public function inline_css() {
		echo '
<style>
.ace-active .switch-ace{border-color: #CCC #CCC #E9E9E9;background-color:#E9E9E9;color:#333;}
.ace-active .quicktags-toolbar{display:none;}
#wp-content-editor-container{width:auto !important;}
</style>';
	}
	
	public function add_js() {
		wp_register_script( 'acejs', plugins_url( '/ace/ace.js', __FILE__ ), '', '1.0', 'true' );
		wp_enqueue_script( 'acejs' );
		
		wp_register_script( 'aceinit', plugins_url( 'aceinit.min.js', __FILE__ ), array('acejs'), '1.1', 'true' );
		wp_enqueue_script( 'aceinit' );
	}
		
}

if ( is_admin() )
	new ACE_WP_Editor();
