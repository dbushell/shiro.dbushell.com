/*!
 * Shiro.js
 * Copyright (c) David Bushell - http://dbushell.com/shiro/
 * BSD & MIT license
 */

(function(window, document, undefined) {

    var i,
        boxSizing = false,
        boxSizingProps = ['boxSizing', 'MozBoxSizing', 'WebkitBoxSizing'],
        docEl = document.documentElement,
        divEl = document.createElement('div');

    // CSS box-sizing feature detection - inspired by http://www.modernizr.com/
    for (i = 0; i < 3; i++) {
        boxSizing = (divEl.style[boxSizingProps[i]] !== undefined) && (document.documentMode === undefined || document.documentMode > 7);
        if (boxSizing) {
            break;
        }
    }
    docEl.className += boxSizing ? ' boxsizing' : ' no-boxsizing';

    function documentReady()
    {
        // replicate the box-sizing effect
        if (!boxSizing) {

            var gs = [], len, all;

            // get all grid blocks ...
            if (typeof document.getElementsByClassName === 'function') {
                all = document.getElementsByClassName('gs');
                // avoid a live NodeList
                if (typeof all.item !== undefined) {
                    len = all.length;
                    for (i = 0; i < len; i++) {
                        gs[i] = all[i];
                    }
                } else {
                    gs = all;
                }
            // ... try again the slower way
            } else {
                all = document.getElementsByTagName('*');
                len = all.length;
                for (i = 0; i < len; i++) {
                    var cn = ' ' + all[i].className + ' ';
                    if (cn.indexOf(' gs ') !== -1) {
                        gs.push(all[i]);
                    }
                }
            }
            // do an inner wrap to hold the padding
            len = gs.length;
            for (i = 0; i < len; i++) {
                inner = gs[i];
                var parent = inner.parentNode,
                    outer = document.createElement('div');
                outer.className = inner.className;
                outer.style.paddingLeft = 0;
                outer.style.paddingRight = 0;
                inner.className = 'gs-body';
                parent.insertBefore(outer, inner);
                outer.appendChild(inner);
            }
        }

        // add fixed layout class for Internet Explorer 6-8
        docEl.className += (docEl.className.indexOf('lt-ie9') !== -1) ? ' gs-fixed' : '';
    }

    if (window.addEventListener) {
        window.addEventListener('DOMContentLoaded', documentReady, false);
    } else {
        window.onload = function() { documentReady(); };
    }

})(this, this.document);
