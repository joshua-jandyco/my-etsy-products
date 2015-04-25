// Copyright 2015 joshua-jandyco (https://www.github.com/joshua-jandyco)
var myEtsyProducts = (function(){
    var myEtsyProducts = {}

    /**
     * Initialize MyEtsyProducts which will trigger it to create your product listing.
     *
     * @param {dom} parentId the container for the products
     * @param {string} storeId the Etsy store id to retrieve products for
     * @param {string} storeName the Etsy store name to retrieve products for
     * @param {integer} page The page of products to retrieve. Numbering starts at 1.
     * @param {string} apikey The Etsy apikey.
     * @param {object} options An object of options including itemsPerPage and descriptionLength
     */
    myEtsyProducts.init = function(parentId,storeId,storeName,page,apikey, options) {
        myEtsyProducts.options = merge_options({
            itemsPerPage: 10,
            descriptionLength: 500,
        }, options)
        var parent = document.getElementById(parentId);
        this.apikey = apikey;
        this.storeName = storeName;
        loadPage(parent,storeId,page,apikey)
    }

    /**
     * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
     * @param obj1
     * @param obj2
     * @returns obj3 a new object based on obj1 and obj2
     */
    function merge_options(obj1,obj2){
        var obj3 = {};
        for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
        return obj3;
    }

    function loadPage(parent,store,page) {
        clearChildren(parent)
        showDownloading(parent)
        getProducts(store,  page, function(products) {
            clearChildren(parent)
            if (products.ok === true) {
                renderProducts(parent,products.results);
                var numPages = Math.ceil(products.count / myEtsyProducts.options.itemsPerPage)
                myEtsyProducts.paginationRenderer.renderPagination(parent,store,page,numPages );
                parent.appendChild(createAttribution())
            } else {
                renderRateLimitMessage(parent,store);
            }
        });
    }

    function renderRateLimitMessage(parent,store) {
        var message = document.createElement("div");
        message.className = "etsy-products-ratelimited";
        message.innerHTML = "We are receiving a lot of traffic, to see our products, please go directly to our " +
            "<a href='https://www.etsy.com/shop/" + myEtsyProducts.storeName + "'>Etsy store.</a>";
        parent.appendChild(message);

    }

    function clearChildren(parent) {
        while (parent.hasChildNodes()) {
            parent.removeChild(parent.lastChild);
        }
    }

    function showDownloading(parent) {
        var loading = document.createElement('div');
        loading.className = "spinner"
        loading.innerHTML = "Retrieving products...";
        parent.appendChild(loading);
    }

    function getProducts(storeId,page,callback) {
        $jsonp.send("https://openapi.etsy.com/v2/shops/" + storeId + "/listings/active.js?api_key=" +
                    myEtsyProducts.apikey +
                    "&page=" + page +
                    "&limit=" + myEtsyProducts.options.itemsPerPage +
                    "&includes=MainImage" +
                    "&callback=products", {
            callbackName: "products",
            onSuccess: function(products){
                callback(products);
            },
            onTimeout: function(){ },
            timeout: 5
        })
    }

    function renderProducts(parent,products) {
        for (var i =0; i < products.length; ++i) {
            myEtsyProducts.productRenderer.renderProduct(parent,products[i])
        }
    }

    function createAttribution() {
        var attribution = document.createElement("p");
        attribution.className = "etsy-attribution";
        attribution.innerHTML = "Product listing by " +
            "<a href='https://github.com/joshua-jandyco/my-etsy-products'>MyEtsyProducts.</a> " +
            "The term 'Etsy' is a trademark of Etsy, Inc. This application uses the Etsy API but is not endorsed or " +
            "certified by Etsy, Inc."
        return attribution;
    }

    myEtsyProducts.paginationRenderer = (function(){
        var renderer = {}

        /**
         * Render the pagination for the product listing.
         *
         * @param {DOM} parent The container that holds the product listing.
         * @param {string} store The store that is being accessed.
         * @param {integer} currentPage The current page being displayed
         * @param {integer} numPages Total number of pages
         */
        renderer.renderPagination = function(parent,store,currentPage, numPages) {
            var container = createContainer();
            container.appendChild(goToFirst(parent,store,currentPage));
            container.appendChild(prev(parent,store,currentPage));
            var pages = createPages(parent,store,currentPage,numPages)
            for (var i = 0; i < pages.length; ++i) {
                container.appendChild(pages[i]);
            }
            container.appendChild(next(parent,store,currentPage,numPages));
            container.appendChild(goToLast(parent,store,currentPage,numPages));
            parent.appendChild(container);
        }

        function createContainer() {
            var container = document.createElement("div");
            container.className = "etsy-product-pagination";
            return container;
        }

        function goToFirst(parent,store,currentPage) {
            if (currentPage != 1) {
                return createLink(parent,store,1,"&lt;&lt;")
            } else {
                return createSpan("&lt;&lt;")
            }
        }

        function prev(parent,store,currentPage ) {
            if (currentPage != 1) {
                return createLink(parent,store,currentPage-1,"&lt;")
            } else {
                return createSpan("&lt;")
            }
        }

        function createPages(parent,store,currentPage, numPages) {
            pages = [];
            for (var i =1; i <= numPages; i++) {
                if (i != currentPage) {
                    pages.push(createLink(parent,store,i,i));
                } else {
                    pages.push(createSpan(i))
                }
            }
            return pages;
        }

        function next(parent,store,currentPage,numPages) {
            if (currentPage != numPages) {
                return createLink(parent,store,currentPage+1,"&gt;")
            } else {
                return createSpan("&gt;")
            }
        }

        function goToLast(parent,store,currentPage,numPages) {
            if (currentPage != numPages) {
                return createLink(parent,store,numPages,"&gt;&gt;")
            } else {
                return createSpan("&gt;&gt;")
            }
        }

        function createLink(parent,store,page,text) {
            var link = document.createElement('a');
            link.className = "etsy-product-pagination-page";
            link.innerHTML = text;
            link.href="javascript:void(0)";
            link.onclick = function() {
                loadPage(parent,store,page);
            };
            return link;
        }

        function createSpan(text) {
            var page = document.createElement("span");
            page.className = "etsy-product-pagination-page";
            page.innerHTML = text;
            return page;

        }

        return renderer;
    })();

    myEtsyProducts.productRenderer = (function(){
        var renderer = {};

        /**
         * Renders the products on the page
         *
         * @param {DOM} parent The container for the products
         * @param {Listing} product An Etsy Listing object with an additional image field that contains the image url.
         */
        renderer.renderProduct = function(parent,product) {
            var productContainer = createContainer();
            productContainer.appendChild(link(createImage(product.MainImage.url_fullxfull),product));
            productContainer.appendChild(link(createTextItem('h1','title',product.title),product));
            productContainer.appendChild(createTextItem('p','price',"$" + product.price + " " + product.currency_code));
            productContainer.appendChild(createTextItem('p','description',product.description,
                                                        myEtsyProducts.options.descriptionLength));
            parent.appendChild(productContainer);
        }

        function createContainer() {
            var productContainer = document.createElement('div');
            productContainer.className = "etsy-product";
            return productContainer;
        }

        function createTextItem(tag,name,text,maxLength) {
            var textItem = document.createElement(tag);
            textItem.className = "etsy-product-" + name;
            if (typeof maxLength == "number" && text.length > maxLength) {
                textItem.innerHTML = text.substring(0,maxLength) + "...";
            } else {
                textItem.innerHTML = text;
            }
            return textItem;
        }

        function createImage(imageLocation) {
            var image = document.createElement('img');
            image.className = "etsy-product-image"
            image.src = imageLocation
            return image
        }

        function link(element, product) {
            var a = document.createElement('a');
            a.href = product.url;
            a.title = product.title;
            a.appendChild(element);
            return a;
        }
        return renderer;
    })();

    //https://github.com/sobstel/jsonp.js
    var $jsonp = (function(){
        var that = {};

        that.send = function(src, options) {
            var callback_name = options.callbackName || 'callback',
            on_success = options.onSuccess || function(){},
            on_timeout = options.onTimeout || function(){},
            timeout = options.timeout || 10; // sec

            var timeout_trigger = window.setTimeout(function(){
                window[callback_name] = function(){};
                on_timeout();
            }, timeout * 1000);

            window[callback_name] = function(data){
                window.clearTimeout(timeout_trigger);
                on_success(data);
            }

            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = src;

            document.getElementsByTagName('head')[0].appendChild(script);
        }

        return that;
    })();

    return myEtsyProducts;

})();
