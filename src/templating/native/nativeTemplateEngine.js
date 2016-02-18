ko.nativeTemplateEngine = function () {
    this.allowTemplateRewriting = false;
}

ko.nativeTemplateEngine.prototype = new ko.templateEngine();
ko.nativeTemplateEngine.prototype.constructor = ko.nativeTemplateEngine;
ko.nativeTemplateEngine.prototype.renderTemplateSource = function (templateSource, bindingContext, options, templateDocument) {
    var templateNodesFunc = templateSource.nodes,
        templateNodes = templateNodesFunc ? templateSource.nodes() : null;

    if (templateNodes) {
        return _.toArray(templateNodes.cloneNode(true).childNodes);
    } else {
        var templateText = templateSource.text();
        return ko.utils.parseHtmlFragment(templateText, templateDocument);
    }
};

ko.nativeTemplateEngine.instance = new ko.nativeTemplateEngine();
ko.setTemplateEngine(ko.nativeTemplateEngine.instance);

ko.exportSymbol('nativeTemplateEngine', ko.nativeTemplateEngine);
