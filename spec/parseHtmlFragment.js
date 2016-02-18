var temporarilyRegisteredComponents = [];

describe('Parse HTML fragment', function() {
    beforeEach(jasmine.prepareTestNode);
    afterEach(function() {
        _.each(temporarilyRegisteredComponents, function(componentName) {
            ko.components.unregister(componentName);
        });
        temporarilyRegisteredComponents = [];
    });

    _.each(
    [
        { html: '<tr-component></tr-component>', parsed: ['<tr-component></tr-component>'], jQueryRequiredVersion: "3.0" },
        { html: '<thead><tr><th><thcomponent>hello</thcomponent></th></tr></thead>', parsed: ['<thead><tr><th><thcomponent>hello</thcomponent></th></tr></thead>'], ignoreRedundantTBody: true },
        { html: '<tbody-component>world</tbody-component>', parsed: ['<tbody-component>world</tbody-component>'], jQueryRequiredVersion: "3.0" },
        { html: '<tfoot-component>foo</tfoot-component>', parsed: ['<tfoot-component>foo</tfoot-component>'], jQueryRequiredVersion: "3.0" },
        { html: '<div></div>', parsed: ['<div></div>'] },
        { html: '<custom-component></custom-component>', parsed: ['<custom-component></custom-component>'] },
        { html: '<tr></tr>', parsed: ['<tr></tr>'] },
        { html: '<tr></tr><tr></tr>', parsed: ['<tr></tr>', '<tr></tr>'] },
        { html: '<td></td>', parsed: ['<td></td>'] },
        { html: '<th></th>', parsed: ['<th></th>'] },
        { html: '<tbody></tbody>', parsed: ['<tbody></tbody>'] },
        { html: '<table><tbody></tbody></table>', parsed: ['<table><tbody></tbody></table>'] },
        { html: '<div></div><div></div>', parsed: ['<div></div>', '<div></div>'] },
        { html: '<optgroup label=x><option>text</option></optgroup>', parsed: ['<optgroup label=x><option>text</option></optgroup>'] },
        { html: '<option>text</option>', parsed: [ '<option>text</option>' ] }
    ], function (data) {
        // jQuery's HTML parsing fails on element names like tr-* (but this is fixed in jQuery 3.x).
        if (window.jQuery && data.jQueryRequiredVersion && jQuery.fn.jquery < data.jQueryRequiredVersion) {
            it('unsupported environment for parsing ' + data.html, function () { });
            return;
        }

        it('should parse ' + data.html + ' correctly', function () {
            var parsedNodes = ko.utils.parseHtmlFragment(data.html, document);

            // Assert that we have the expected collection of elements (not just the correct .innerHTML string)
            expect(parsedNodes.length).toEqual(data.parsed.length);
            for (var i = 0; i < parsedNodes.length; i++) {
                testNode.innerHTML = '';
                testNode.appendChild(parsedNodes[i]);
                expect(testNode).toContainHtml(data.parsed[i], function(htmlToClean) {
                    // Old IE strips quotes from certain attributes. The easiest way of normalising this across
                    // browsers is to forcibly strip the equivalent quotes in all browsers for the test.
                    return htmlToClean.replace(/"x"/g, 'x');
                });
            }
        });
    });
});
