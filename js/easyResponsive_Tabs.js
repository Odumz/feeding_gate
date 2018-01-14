// Easy Responsive Tabs Plugin
// Author: Samson.Onna <Email : samson3d@gmail.com>
(function ($) {
    $.fn.extend({
        easyResponsive_Tabs: function (options) {
            //Set the default values, use comma to separate the settings, example:
            var defaults = {
                type: 'default', //default, vertical, accordion;
                width: 'auto',
                fit: true
            }
            //Variables
            var options = $.extend(defaults, options);            
            var opt = options, jtype = opt.type, jfit = opt.fit, jwidth = opt.width, vtabs = 'vertical', accord = 'accordion';

            //Main function
            this.each(function () {
                var $respTabs = $(this);
                $respTabs.find('ul.resps-tabs-list li').addClass('resps-tab-item');
                $respTabs.css({
                    'display': 'block',
                    'width': jwidth
                });

                $respTabs.find('.resps-tabs-container > div').addClass('resps-tab-content');
                jtab_options();
                //Properties Function
                function jtab_options() {
                    if (jtype == vtabs) {
                        $respTabs.addClass('resps-vtabs');
                    }
                    if (jfit == true) {
                        $respTabs.css({ width: '100%', margin: '0px' });
                    }
                    if (jtype == accord) {
                        $respTabs.addClass('resps-easy-accordion');
                        $respTabs.find('.resps-tabs-list').css('display', 'none');
                    }
                }

                //Assigning the h2 markup
                var $tabItemh2;
                $respTabs.find('.resps-tab-content').before("<h2 class='resps-accordion' role='tab'><span class='resps-arrow'></span></h2>");

                var itemCount = 0;
                $respTabs.find('.resps-accordion').each(function () {
                    $tabItemh2 = $(this);
                    var innertext = $respTabs.find('.resps-tab-item:eq(' + itemCount + ')').text();
                    $respTabs.find('.resps-accordion:eq(' + itemCount + ')').append(innertext);
                    $tabItemh2.attr('aria-controls', 'tab_item-' + (itemCount));
                    itemCount++;
                });

                //Assigning the 'aria-controls' to Tab items
                var count = 0,
                    $tabContent;
                $respTabs.find('.resps-tab-item').each(function () {
                    $tabItem = $(this);
                    $tabItem.attr('aria-controls', 'tab_item-' + (count));
                    $tabItem.attr('role', 'tab');

                    //First active tab                   
                    $respTabs.find('.resps-tab-item').first().addClass('resps-tab-active');
                    $respTabs.find('.resps-accordion').first().addClass('resps-tab-active');
                    $respTabs.find('.resps-tab-content').first().addClass('resps-tab-content-active').attr('style', 'display:block');

                    //Assigning the 'aria-labelledby' attr to tab-content
                    var tabcount = 0;
                    $respTabs.find('.resps-tab-content').each(function () {
                        $tabContent = $(this);
                        $tabContent.attr('aria-labelledby', 'tab_item-' + (tabcount));
                        tabcount++;
                    });
                    count++;
                });

                //Tab Click action function
                $respTabs.find("[role=tab]").each(function () {
                    var $currentTab = $(this);
                    $currentTab.click(function () {

                        var $tabAria = $currentTab.attr('aria-controls');

                        if ($currentTab.hasClass('resps-accordion') && $currentTab.hasClass('resps-tab-active')) {
                            $respTabs.find('.resps-tab-content-active').slideUp('', function () { $(this).addClass('resps-accordion-closed'); });
                            $currentTab.removeClass('resps-tab-active');
                            return false;
                        }
                        if (!$currentTab.hasClass('resps-tab-active') && $currentTab.hasClass('resps-accordion')) {
                            $respTabs.find('.resps-tab-active').removeClass('resps-tab-active');
                            $respTabs.find('.resps-tab-content-active').slideUp().removeClass('resps-tab-content-active resps-accordion-closed');
                            $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resps-tab-active');

                            $respTabs.find('.resps-tab-content[aria-labelledby = ' + $tabAria + ']').slideDown().addClass('resps-tab-content-active');
                        } else {
                            $respTabs.find('.resps-tab-active').removeClass('resps-tab-active');
                            $respTabs.find('.resps-tab-content-active').removeAttr('style').removeClass('resps-tab-content-active').removeClass('resps-accordion-closed');
                            $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resps-tab-active');
                            $respTabs.find('.resps-tab-content[aria-labelledby = ' + $tabAria + ']').addClass('resps-tab-content-active').attr('style', 'display:block');
                        }
                    });
                    //Window resize function                   
                    $(window).resize(function () {
                        $respTabs.find('.resps-accordion-closed').removeAttr('style');
                    });
                });
            });
        }
    });
})(jQuery);

