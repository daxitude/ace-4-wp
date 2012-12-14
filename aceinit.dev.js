
jQuery(document).ready(function ($) {	
	
	// initialize ACE Editor for the WP post content textarea#content
	$('#content').AceEditor({
		// overwrites the default
		setEditorContent: function () {
			var value = (getUserSetting('editor') == 'tinymce' && window.tinyMCE) ?
				tinyMCE.get(this.element).getContent() :
				this.$elem.val(); // need to use val for compat with IE
			this.editor.getSession().setValue(value);			
		},
		onInit: function () {
			var self = this;
			// if the user has visual disabled, the html tab isn't there
			if (!this.tinymce)
				$('<a id="content-html" class="hide-if-no-js wp-switch-editor switch-html">Text</a>')
					.prependTo('#wp-content-editor-tools');
					
			$('<a id="content-ace" class="hide-if-no-js wp-switch-editor switch-ace">ACE</a>')
				.prependTo('#wp-content-editor-tools')			
				.on('click.toggleAce', function () {if (!self.loaded) self.load();});
			
			$('#content-html, #content-tmce').on('click.destroyAce', function (e) {
				// quick fix to make sure that the right content area gets set to display
				// visible when its tab is clicked. for some reason the html textarea gets stuck on
				// display:none when going from load->ACE->Visual->HTML
				var clicked = $(e.currentTarget).attr('id').split('-')[1];
				switch (clicked) {
					case 'tmce':
						$('#content_parent').show();
						break;
					case 'html':
						self.$elem.show();
						break;
				}
				self.destroy(e);
			});
			
			if (getUserSetting('ace_editor') == 1) this.load();
		},
		onLoaded: function () {
			// wp js api-ish thing. tried setting to 'ace' but won't work with the way the 
			// editor is loaded thru wp server side. not the right filters to hook into
			// so we'll use html instead, cuz that won't obliterate spacing, indentation, etc
			// and then set our own value to check against
			setUserSetting('editor', 'html');
			setUserSetting('ace_editor', 1);
			// hide all the default wp stuff
			$("#wp-content-media-buttons, #content_parent").hide();
			$('#wp-content-wrap').removeClass('html-active tmce-active').addClass('ace-active');
		},
		onDestroy: function (e) {
			var clicked = $(e.currentTarget).attr('id').split('-')[1];
			var check;
			setUserSetting('ace_editor', 0);
			setUserSetting('editor', clicked);
			$("#wp-content-media-buttons").show();
			$('#wp-content-wrap').addClass(clicked + '-active').removeClass('ace-active');
			switch (clicked) {
				case 'tmce':
					this.$elem.hide();
					// the call to show() happens before tinymce has appended #content_parent
					check = setInterval(function () {
						$('#content_parent').show();
						if ($('#content_parent').length > 0) clearInterval(check);
					}, 100);					
					break;
				case 'html':
					this.$elem.css({height: '', minHeight: '200px'});
					break;
			}
			
		}
	});


});

(function ($) {
	
	var AceSettings = AceSettings || {};	
	
	// constructor function
	var AceEditor = function (config) {
		// unpacks all of config and adds it to 'this'
		$.extend(this, config);
		
		// element = the textarea with the content to bring into the ace editor
		this.$elem = this.element;
		this.element = this.$elem.attr('id');
		
		// set the container as the first parent if not provided in options
		this.$container = this.container ? $(this.container) : this.$elem.parent();	
		this.contWd = this.$container.width();
		this.loaded = false;
		// if tinymce shows up, assume we have visual mode enabled on this page
		this.tinymce = !!window.tinymce;
		
		if (this.onInit) this.onInit.call(this);		
	};

	AceEditor.prototype = {
		
		load: function () {
			if (this.loaded) return false;
			var self = this;
			// hide the textarea
			this.$elem.hide();
			// insert the editor div
			this.insertEditor();	
			// init the ace editor
			this.editor = ace.edit(this.aceId);
			this.$editor = $('#' + this.aceId);
			// set some ace properties
			this.setEditorProps();
			// set editor content - either content of textarea or tinymce
			this.setEditorContent();	
			// make the container div resizable in y-direction
			this.containerResizable();
			// update the textarea when the content in the ace div changes
			this.editor.on('change', function () {self.synchronize.apply(self);});		
			// trigger the initial resize event
			this.editor.resize(true);
			// execute callback if it exists
			this.loaded = true;
			if (this.onLoaded) this.onLoaded.call(this);
		},
		
		insertEditor: function () {
			$('<div id="' + this.aceId + '"></div>')
				.css({left: 0, top: 0, bottom: 0, right: 0, zIndex: 1 })
				.insertAfter(this.$elem);
		},
		
		setEditorProps: function () {
			this.editor.setTheme('ace/theme/' + this.theme);
			this.editor.getSession().setMode('ace/mode/html');
			this.editor.getSession().setUseWrapMode(true);
			this.editor.getSession().setWrapLimitRange();
		},
		
		setEditorContent: function () {
			this.editor.getSession().setValue(this.$elem.val()); // seems like html, val, or text OK		
		},
		
		containerResizable: function () {
			var self = this;
			this.$container
				.resizable({handles: 's'})
				.css({position: 'relative', height: this.defaultHt, minHeight: '200px'})
				.on('resize.aceEditorResize', function() {
					self.editor.resize(true);
				});	
		},
		
		synchronize: function () {
			var val = this.editor.getValue();
			this.$elem.val(val); // text, val, html ??
			if (this.tinymce && tinyMCE.get(this.element)) tinyMCE.get(this.element).setContent(val);
		},
		
		destroy: function () {
			if (!this.loaded) return false;
			this.$editor.remove();
			this.editor.destroy();
			this.$container.resizable('destroy').off('resize.aceEditorResize').css({height: ''});
			this.$elem.show();
			this.loaded = false;
			if (this.onDestroy) this.onDestroy.apply(this, arguments);
		}
		
	};
	
	// jquery plugin for ace editor
	// gives us an entry point for method calls if needed in the future
	$.fn.AceEditor = function (option, value) {
		var option = option || null;
		var data = $(this).data('AceEditor');
		// if data exists (has been instantiated) and calling a public method
		if (data && typeof option == 'string' && data[option]) {
			data[option](value || null);
		// if no data, then instantiate the plugin
		} else if (!data) {
			return this.each(function () {
				var config = $.extend({
					element: $(this),
					aceId: 'ace-editor',
					theme: 'textmate',
					defaultHt: '400px',
					container: false
				}, option);		
				$(this).data('AceEditor', new AceEditor(config));
			});
		// else, throw jquery error
		} else {
			$.error( 'Method "' +  option + '" does not exist on AceEditor!');
		}
	};
	
	
})(jQuery);


