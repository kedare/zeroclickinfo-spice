(function (env) {
    "use strict";
    
    function getImage(item, size, blank) {  
        if (item.teaserImageUrls[size]) {
            var img = item.teaserImageUrls[size].src;
            if (blank == 1 && img.search("blank") == -1) {
                img = img + '?blank=blank';
            }
            return img;
        } else if (size == 1) {
            return 'http://statistacloudfront.s3.amazonaws.com/Statistic/table/table-355-1.png';
        } else if (size == 2) {
            return 'https://static1.statista.com/Statistic/table/table-100-1.png';
        }
    }
    
    function getTitle(title) {
        return title.replace(/\ \|\ .+?$/, "");
    }
    
    function formatDate(date) {
        var matches = date.match(/(\d+)\.(\d+)\.(\d+)/);
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[(parseInt(matches[2])-1)] + ' ' + matches[3];
    }
    
    function getPremiumClass(item) {
        if (item.Premium == 1) {
            return 'tx-clr--gold';
        } else {
            return 'tx-clr--green';
        }
    }
    
    function getPremiumText(item) {
        if (item.Premium == 1) {
            return 'Premium';
        } else {
            return 'Free';
        }
    }
    
    env.ddg_spice_statista = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('statista');
        }

        Spice.add({
            id: "statista",
            name: "Statista",
            data: api_result.data,
            meta: {
                sourceName: "Statista.com",
                sourceUrl: 'http://www.statista.com/search/?q='+api_result.q
            },
            normalize: function(item) {
                return {
                    title: getTitle(item.title),
                    url: item.Link,
                    description: item.subject ,
                    image: getImage(item, 1, 1),
                    img_m: getImage(item, 1, 0),
                    heading: item.subject,
                    abstract: item.description,
                    footerdate: formatDate(item.date),
                    footerpremiumclass: getPremiumClass(item),
                    footerpremiumtext: getPremiumText(item)
                    
                }  
            },
            templates: {
                group: 'media',
                item_detail: 'products_item_detail',
	            wrap_detail: 'base_detail',
                
                options: {
                    moreAt: true,
                    rating: false,
                    price: false,
                    brand: false,
                    footer: Spice.statista.footer
                }
            },
        });
    };
}(this));
