
jQuery(document).ready(function ($) {
	
	var AceSettings = AceSettings || {};
	
	// constructor function
	var AceEditor = function (config) {
		this.opts = config;
		// element = the textarea with the content to bring into the ace editor
		this.$elem = config.element;
		this.element = config.element.attr('id');
		
		// set the container as the first parent if not provided in options
		this.$container = this.opts.container ? $(this.opts.container) : this.$elem.parent();	
		this.contWd = this.$container.width();
		this.loaded = false;
		// if tinymce shows up, assume we have visual mode enabled on this page
		this.tinymce = !!window.tinymce;
		
		if (this.opts.onInit) this.opts.onInit.call(this);
		
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
			this.editor = ace.edit(this.opts.aceId);		
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
			if (this.opts.onLoaded) this.opts.onLoaded.call(this);
		},
		
		insertEditor: function () {
			$('<div id="' + this.opts.aceId + '"></div>')
				.css({left: 0, top: 0, bottom: 0, right: 0, zIndex: 999 })
				.insertAfter(this.opts.element);
		},
		
		setEditorProps: function () {
			this.editor.setTheme('ace/theme/' + this.opts.theme);
			this.editor.getSession().setMode('ace/mode/html');
			this.editor.getSession().setUseWrapMode(true);
			this.editor.getSession().setWrapLimitRange();
		},
		
		setEditorContent: function () {
			var value = (getUserSetting('editor') == 'tinymce') ? tinyMCE.get(this.element).getContent() : this.$elem.val();
			this.editor.getSession().setValue(value);			
		},
		
		containerResizable: function () {
			var self = this;
			this.$container
				.resizable({minWidth: this.contWd, maxWidth: this.contWd, handles: 'n,s'})
				.css({position: 'relative', height: this.opts.defaultHt})
				.on('resize.aceEditorResize', function() {
					self.editor.resize(true);
				});	
		},
		
		synchronize: function () {
			var val = this.editor.getValue();
			this.$elem.html(val); //.html(val)
			if (this.tinymce && tinyMCE.get(this.element)) tinyMCE.get(this.element).setContent(val);
		},
		
		destroy: function () {
			if (!this.loaded) return false;
			$("#" + this.opts.aceId).remove();
			this.editor.destroy();
			this.$container.resizable('destroy').off('resize.aceEditorResize').css({height: 'initial'});
			this.$elem.show();
			this.loaded = false;
			if (this.opts.onDestroy) this.opts.onDestroy.apply(this, arguments);
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
	
	// initialize ACE Editor for the WP post content textarea#content
	$('#content').AceEditor({
		onInit: function () {
			var self = this;
			// if the user has visual disabled, the html tab isn't there
			if (!this.tinymce)
				$('<a id="content-html" class="hide-if-no-js wp-switch-editor switch-html">HTML</a>')
					.prependTo('#wp-content-editor-tools');
					
			$('<a id="content-ace" class="hide-if-no-js wp-switch-editor switch-ace">ACE</a>')
				.prependTo('#wp-content-editor-tools')			
				.on('click.toggleAce', function () {if (!self.loaded) self.load();});
			
			$('#content-html, #content-tmce').on('click.destroyAce', function (e) {self.destroy(e);});
		},
		onLoaded: function () {
			// hide all the default wp stuff
			$("#wp-content-media-buttons, #ed_toolbar, #content_parent").hide();
			$('#wp-content-wrap').removeClass('html-active tmce-active').addClass('ace-active');
		},
		onDestroy: function (e) {
			var clicked = $(e.currentTarget).attr('id').split('-')[1];
			$("#wp-content-media-buttons").show();
			$('#wp-content-wrap').addClass(clicked + '-active').removeClass('ace-active');
			switch(clicked) {
				case 'tmce':
					$('#content_parent').show();
					$('#ed_toolbar').hide();
					this.$elem.hide();
					break;
				case 'html':
					$('#ed_toolbar').show();
					break;
			}
			
		}
	});

	
});
	


