var protocol = 'https:';
if(location.protocol == 'http:') protocol = 'http:';
if(typeof(lang_lqs) == 'undefined' || lang_lqs === null) lang_lqs = 'en';
if(typeof(hname_lqs) == 'undefined' || hname_lqs === null) hname_lqs = 'www.ifcmarkets.com';

if( document.readyState === 'loading' ) {
    document.addEventListener('DOMContentLoaded', function () {
        addJs('/js/widgets/helpers.js', get_live_quote_widget_scroll);
    });
} else {
    addJs('/js/widgets/helpers.js', get_live_quote_widget_scroll);
}
function get_live_quote_widget_scroll() {
    cfd_helper.getJSON(protocol+"//"+hname_lqs+"/"+lang_lqs+"/widgets/body/liveQuotes?callback=liveQuotes");
};
function liveQuotes(data) {
    document.getElementById('ifc_widgetlivequotes_scrl').insertAdjacentHTML('afterBegin', data);
    var url = protocol+"//"+hname_lqs + "/" + lang_lqs + "/widgets/body/liveQuotesScroll?protocol=https&hname=" + hname_lqs;
    if(window.instrument_list !== undefined) {
      url += "&instruments=" + encodeURIComponent(window.instrument_list);
    }
    addJs("/js/front/charts/quotesline_gg.js", function() {
        cfd_helper.getJSON( url + "&callback=liveQuotesScroll" );
    });
}
function liveQuotesScroll(data) {
    document.getElementById('ifc_widgetlivequotes_scrl').innerHTML = "";
    document.getElementById('ifc_widgetlivequotes_scrl').insertAdjacentHTML('afterBegin', data);
    cfd_helper.runScripts(document.getElementById('ifc_widgetlivequotes_scrl'));
    
    /* show plank but not on site */
//    var adplank = document.querySelector('div#ifc_nedlivequotes_scrl');
//    document.querySelector('div#ifc_nedlivequotes_scrl').parentNode.removeChild(adplank);
//    document.querySelector('div#ifc_widgetlivequotes_scrl').appendChild(adplank);
//    cfd_helper.addStyle('div#ifc_nedlivequotes_scrl', 'dispaly: block');
//    document.querySelector('.__instruments_list').insertAdjacentHTML('afterBegin', createInstrHtml());
}
function createInstrHtml() {
    var instrHtml = '';
    var instrument_names = instrument_list.split(',');
    for (index = 0; index < instrument_names.length; index++) {
        var instrument = instrument_names[index].replace('#', '');
        instrHtml += '<li class="course_nochange li_'+ instrument +
            '"><div class="img"></div><p class="iname">' + instrument +
            '</p><span class="bidask"><span class="bid">---</span>/' +
            '<span class="ask">---</span>&nbsp;</span></li>';
    }
    
    return instrHtml;
}
function addJs(src, callback) {
    var domEl=document.createElement('script');
    domEl.type='text/javascript';
    domEl.async = true;
    domEl.src = protocol+'//'+hname_lqs+src;
    var scriptEl = document.getElementsByTagName('script')[0];
    scriptEl.parentNode.insertBefore(domEl, scriptEl);
    domEl.onload = callback;
}