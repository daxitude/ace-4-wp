<?php

add_action( 'admin_head', 'myprefix_no_visual');

function myprefix_no_visual(){
	if ( is_admin() && get_post_type() == 'page' ){
		add_filter( 'user_can_richedit', 'myprefix_force_html' );
	}
}

function myprefix_force_html() {
    //allowed: tinymce, html, test
    return false;
}