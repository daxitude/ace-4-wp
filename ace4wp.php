<?php
/*
Plugin Name: ACE Editor for WP
Description: Adds a third tab to posts, pages, and custom post types that enables ACE syntax-highlighted code editing
Version: 0.1
Author: daxitude
Author URI: http://github.com/daxitude/
Plugin URI: 
*/

class ACE_Editor {
	
	public function __construct() {
		add_action( 'admin_head', array($this, 'inline_css') );
		add_action( 'admin_print_scripts-post.php', array($this, 'add_js') );
		add_action( 'admin_print_scripts-post-new.php', array($this, 'add_js') );
	}
	
	public function inline_css() {
		echo '<style>.ace-active .switch-ace{border-color: #CCC #CCC #E9E9E9;background-color: #E9E9E9;color: #333;}</style>';
	}
	
	public function add_js() {
		$url = 'http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js';
		wp_register_script( 'acejs', $url, '', '1.0', 'true' );
		wp_enqueue_script( 'acejs' );
		
		wp_register_script( 'aceinit', plugins_url( 'aceinit.js', __FILE__ ), array('acejs'), '1.0', 'true' );
		wp_enqueue_script( 'aceinit' );
	}
	
}

if ( is_admin() )
	new ACE_Editor();
