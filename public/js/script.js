(function (global) {

    var dc = {};

    var allCategoriesUrl =
        "https://us-central1-cosmo-ecosystem-123.cloudfunctions.net/api/crop/9898302748";

    // Show loading icon inside element identified by 'selector'.
    var showLoading = function (selector) {
        var html = "<div class='text-center'>";
        html += "<img src='../images/ajax-loader.gif'></div>";
        insertHtml(selector, html);
    };

    // Convenience function for inserting innerHTML for 'select'
    var insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    function buildAndShowCategoriesHTML(data, status) {

        insertHtml("#main-content", JSON.stringify(data));
    }

    // Load the menu categories view
    dc.loadDemo = function () {
        console.log("Done");
        showLoading("#main-content");
        $.get(allCategoriesUrl, buildAndShowCategoriesHTML);
    };

    global.$dc = dc;
})(window);
