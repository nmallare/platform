/* global require */
require(['jquery', 'routing'],
    function ($, routing) {
        'use strict';

        var accessLevelLinkSelector = '.access_level_value a';
        var selectDivSelector = '.access_level_value_choice';
        var linkDivSelector = 'access_level_value_link';

        var accessLevelRoute = 'oro_security_access_levels';

        var objectIdentityAttribute = 'data-identity';
        var selectorNameAttribute = 'data-selector-name';
        var selectorIdAttribute = 'data-selector-id';
        var valueAttribute = 'data-value';

        $(function () {
            $(document).on('click', accessLevelLinkSelector, function () {
                var link = $(this);
                var parentDiv = link.parent().parent();
                var selectDiv = parentDiv.find(selectDivSelector);
                var linkDiv = parentDiv.find(linkDivSelector);
                link.hide();
                var oid = parentDiv.attr(objectIdentityAttribute);
                oid = oid.replace(/\\/g, '_');
                $.ajax({
                    url: routing.generate(accessLevelRoute, {oid: oid}),
                    success: function (data) {
                        var selector = $('<select>');
                        selector.attr('name', parentDiv.attr(selectorNameAttribute));
                        selector.attr('id', parentDiv.attr(selectorIdAttribute));
                        selector.attr('class', 'security-permission');
                        $.each(data, function (value, text) {
                            if (value !== 'template_name') {
                                var option = $('<option>').attr('value', value).text(text);
                                if (parentDiv.attr(valueAttribute) == value) {
                                    option.attr('selected', 'selected');
                                }
                                selector.append(option);
                            }
                        });
                        selectDiv.append(selector);
                        selectDiv.show();
                        linkDiv.remove();
                        $('select').uniform('update');
                    },
                    error: function () {
                        link.show();
                    }
                });

                return false;
            });
        });
    });
