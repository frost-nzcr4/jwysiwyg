/**
 * Tips and tricks plugin
 * 
 * Depends on jWYSIWYG
 */
(function ($) {
	if (undefined === $.wysiwyg) {
		throw "wysiwyg.tips-n-tricks.js depends on $.wysiwyg";
	}

	function Tipsntricks() {
		this.wysiwyg = null;
		this.options = null;
		this.close = null;
		this.panel = null;

		this.init = function (Wysiwyg, options) {
			this.wysiwyg = Wysiwyg;
			this.options = options;
			this.close = $(this.options.html.close);
			this.panel = $(this.options.html.panel);

			switch (this.options.position) {
			case "top":
				this.wysiwyg.editor.before(this.panel);
				break;
			}

			this.refresh();
		};

		this.refresh = function () {
			var self = this,
				index = Math.floor(Math.random() * $.wysiwyg.tipsntricks.tips.length);

			this.panel.html($.wysiwyg.tipsntricks.tips[index]);
			this.panel.prepend(this.close);
			this.panel.find(".close").bind("click.wysiwyg", function () {
				window.clearTimeout(self.wysiwyg.timers.tipsntricks);
				$(this).parent().css({"display": "none"});
			});

			this.wysiwyg.timers.tipsntricks = window.setTimeout(function () { self.refresh(); }, 5000);
		};
	}

	var tipsntricks = {
		name: "tipsntricks",
		version: "",
		defaults: {
			position: "top",
			html: {
				close: '<div class="close" unselectable="on">x</div>',
				panel: '<div class="tipsntricks"></div>'
			}
		},

		init: function (Wysiwyg, options) {
			options = options || {};
			options = $.extend(true, this.defaults, options);

			if (!Wysiwyg.plugin) {
				Wysiwyg.plugin = {};
			}

			Wysiwyg.plugin.tipsntricks = new Tipsntricks();
			Wysiwyg.plugin.tipsntricks.init(Wysiwyg, options);
		},

		tips: [
			"tip #1: dolor sit amet dolor sit amet dolordolor sit amet dolor sit ametdolor sit ametdolor sit amet dolor sit amet",
			"tip #2: 222 222 222",
			"tip #3: 33333 3333",
			"tip #4: 4444 4 4444"
		]
	};

	$.wysiwyg.plugin.register(tipsntricks);
	$.wysiwyg.plugin.listen("afterInit", "tipsntricks.init");
})(jQuery);
