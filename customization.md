Customization
=============
You may customize myEtsyProducts look and feel by changing the layout, stylesheets and rendering.

## Layout
You may choose either the cell or row layout.  This is done by including the respective style sheet as seen below:

```
<link rel="stylesheet" href="etsy-product-style-cell.css" />
```
or
```
<link rel="stylesheet" href="etsy-product-style-row.css" />
```

## Overriding Styles
You may override the styles found in the stylesheets.

## Extension Points
The myEtsyProducts has extension points where pagination rendering and product rendering is done.  You can set a custom
pagination or product renderer by doing the following:

### Custom Product Renderer
```
    myEtsyProducts.productRenderer = {
        renderProduct: function(parent,product) {
            // Your logic here to render a single product.
            // Add the product to parent after created
        }
    }
```

### Custom Pagination Renderer
```
    myEtsyProducts.paginationRenderer = {
        renderPagination: function(parent, store,currentPage, numPages) {
            // Your logic here to render the pagination.
            // Add the product to parent after created
        }
    }
```
