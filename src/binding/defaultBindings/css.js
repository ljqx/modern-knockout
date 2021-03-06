var classesWrittenByBindingKey = '__ko__cssValue';
ko.bindingHandlers.class = {
    'update': function (element, valueAccessor) {
        var value = _.trim(ko.utils.unwrapObservable(valueAccessor()));
        ko.utils.toggleDomNodeCssClass(element, element[classesWrittenByBindingKey], false);
        element[classesWrittenByBindingKey] = value;
        ko.utils.toggleDomNodeCssClass(element, value, true);
    }
};

ko.bindingHandlers.css = {
    'update': function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        if (_.isObjectLike(value)) {
            _.forOwn(value, function(shouldHaveClass, className) {
                shouldHaveClass = ko.utils.unwrapObservable(shouldHaveClass);
                ko.utils.toggleDomNodeCssClass(element, className, shouldHaveClass);
            });
        } else {
            ko.bindingHandlers.class.update(element, valueAccessor);
        }
    }
};
