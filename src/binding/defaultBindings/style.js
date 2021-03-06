ko.bindingHandlers.style = {
    'update': function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor() || {});
        _.forOwn(value, function(styleValue, styleName) {
            styleValue = ko.utils.unwrapObservable(styleValue);

            if (_.isNil(styleValue) || styleValue === false) {
                // Empty string removes the value, whereas null/undefined have no effect
                styleValue = "";
            }

            element.style[styleName] = styleValue;
        });
    }
};
