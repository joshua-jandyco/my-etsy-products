Overview
========
MyEtsyProducts is a JavaScript library that allows you to display your Etsy store products wherever you can use 
JavaScript and HTML.

## Limitations
The Etsy API is rate limited to 10 requests per second.  If your site is receiving that much traffic, you may run into 
some issues.  When this happens, the library will direct users to your Etsy store.

## Prerequisites
1. You will need to get an Etsy API key to use MyEtsyProducts.  To do so, create an 
[Etsy App](https://www.etsy.com/developers/register)

## Usage
Include the my-etsy-products JavaScript and CSS and then call the init function like so:
```
window.onload = function() {
    var options = {itemsPerPage: 15};
    myEtsyProducts.init("my-products","storeIdHere", "storeNameHere", 1, 'api-key-here', options);
}
```

For a full treatment, please see see the included [example](https://github.com/joshua-jandyco/my-etsy-products/blob/master/example.html)

## Donate
If you feel compelled to, you can donate here:

[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&encrypted=-----BEGIN%20PKCS7-----MIIHTwYJKoZIhvcNAQcEoIIHQDCCBzwCAQExggEwMIIBLAIBADCBlDCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20CAQAwDQYJKoZIhvcNAQEBBQAEgYAuNhhm%2BJY4nwyDzGrR7jppZSm9rTrwY15BmWqv71juJJmGMywMmhT2a%2FOLzBWOjHJOyyxf%2B1OCFbSMiAhTRGefCoVSmcDd8OCBcTNxe2LbEgFBloVrjZ8KpDZWja9Ucr%2FMcgK3DGUr0Myrz1sZpEMO9XVGaSORzCk8uzi%2FkdfVkjELMAkGBSsOAwIaBQAwgcwGCSqGSIb3DQEHATAUBggqhkiG9w0DBwQI0jpbPwvxQr2Agaj9tGFRaXhW40XknqVdUNOtFxUWYK9WeaCs%2BtFvPv4TslazUtAqqipD2m2b4wn1pl68rFk7MzgFPIi%2BNjSc9E2QdRy4gtDCjEllMeHV8aalQtUKvWLq2XsAg0retIO9a%2BfgroMhd1nts6zZnNl%2FWRl0cRkgrN0317iUGKNQzxpzBnyPvrNf4bbMDETfG7Tr9zq%2BjXcIac37vF6XVKS7vgVOrVMF%2BJJc8kqgggOHMIIDgzCCAuygAwIBAgIBADANBgkqhkiG9w0BAQUFADCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20wHhcNMDQwMjEzMTAxMzE1WhcNMzUwMjEzMTAxMzE1WjCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20wgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBAMFHTt38RMxLXJyO2SmS%2BNdl72T7oKJ4u4uw%2B6awntALWh03PewmIJuzbALScsTS4sZoS1fKciBGoh11gIfHzylvkdNe%2FhJl66%2FRGqrj5rFb08sAABNTzDTiqqNpJeBsYs%2Fc2aiGozptX2RlnBktH%2BSUNpAajW724Nv2Wvhif6sFAgMBAAGjge4wgeswHQYDVR0OBBYEFJaffLvGbxe9WT9S1wob7BDWZJRrMIG7BgNVHSMEgbMwgbCAFJaffLvGbxe9WT9S1wob7BDWZJRroYGUpIGRMIGOMQswCQYDVQQGEwJVUzELMAkGA1UECBMCQ0ExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxFDASBgNVBAoTC1BheVBhbCBJbmMuMRMwEQYDVQQLFApsaXZlX2NlcnRzMREwDwYDVQQDFAhsaXZlX2FwaTEcMBoGCSqGSIb3DQEJARYNcmVAcGF5cGFsLmNvbYIBADAMBgNVHRMEBTADAQH%2FMA0GCSqGSIb3DQEBBQUAA4GBAIFfOlaagFrl71%2Bjq6OKidbWFSE%2BQ4FqROvdgIONth%2B8kSK%2F%2FY%2F4ihuE4Ymvzn5ceE3S%2FiBSQQMjyvb%2Bs2TWbQYDwcp129OPIbD9epdr4tJOUNiSojw7BHwYRiPh58S1xGlFgHFXwrEBb3dgNbMUa%2Bu4qectsMAXpVHnD9wIyfmHMYIBmjCCAZYCAQEwgZQwgY4xCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJDQTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLUGF5UGFsIEluYy4xEzARBgNVBAsUCmxpdmVfY2VydHMxETAPBgNVBAMUCGxpdmVfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tAgEAMAkGBSsOAwIaBQCgXTAYBgkqhkiG9w0BCQMxCwYJKoZIhvcNAQcBMBwGCSqGSIb3DQEJBTEPFw0xNTA0MjUyMjExMzRaMCMGCSqGSIb3DQEJBDEWBBTXKiMcGxmhN9ZZXRtDhFg%2FKjCI3DANBgkqhkiG9w0BAQEFAASBgHnj9cyJJht%2BWeyiO6ERH40TJ9M6Fqcd%2FTYkY8iZ0eEHhTBrQ4wCMTf%2FPfsYIrBaNNwdeappFO678%2FZ2Lb3eDQWwhcUvP34pbdtZgWTPO998fujh2UhT2QdICMoLajIL%2FjcKOVCFWJ4kXlaLqEvYZRGsmBl%2BnhREiccyZeKtAFQf-----END%20PKCS7-----)

The term 'Etsy' is a trademark of Etsy, Inc. This application uses the Etsy API but is not endorsed or certified by Etsy, Inc.
