(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@wm/typing-kakaomap')) :
    typeof define === 'function' && define.amd ? define(['exports', '@wm/typing-kakaomap'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.WebKakaomap = {}));
}(this, (function (exports) { 'use strict';

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    function isNotEmpty(value) {
        return value != null && value.trim().length > 0;
    }
    function searchAddress(address, callback) {
        try {
            var geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.addressSearch(address, function (results, status) {
                if (status === 'OK') {
                    callback({
                        name: results[0].address_name,
                        x: results[0].x,
                        y: results[0].y,
                    });
                }
                else {
                    callback(null);
                }
            });
        }
        catch (error) {
            //
        }
    }
    function initializeKakaomap(addresses, $elems) {
        var _a;
        var address = addresses.address, addressDetail = addresses.addressDetail, jibunAddress = addresses.jibunAddress;
        var mapButton = $elems.mapButton, mapContainer = $elems.mapContainer, kakaomapButton = $elems.kakaomapButton, kakaonaviButton = $elems.kakaonaviButton;
        (_a = mapButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
            var _a, _b, _c;
            if ((_c = (_a = window.WebUtils) === null || _a === void 0 ? void 0 : (_b = _a).copyToClipboard) === null || _c === void 0 ? void 0 : _c.call(_b, address + " " + addressDetail)) {
                alert('�대┰蹂대뱶�� 蹂듭궗�섏뿀�듬땲��!');
            }
        });
        try {
            var map_1 = new window.kakao.maps.Map(mapContainer, {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
                draggable: false,
                scrollwheel: false,
            });
            var setMap_1 = function (name, x, y) {
                var _a, _b;
                var coords = new window.kakao.maps.LatLng(y, x);
                var marker = new window.kakao.maps.Marker({
                    map: map_1,
                    position: coords,
                });
                marker.setMap(map_1);
                map_1.setCenter(coords);
                (_a = kakaonaviButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
                    window.open('https://map.kakao.com/link/to/' + name + ',' + y + ',' + x, '_blank', 'noopener');
                });
                (_b = kakaomapButton) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
                    window.open('https://map.kakao.com/link/map/' + name + ',' + y + ',' + x, '_blank', 'noopener');
                });
            };
            if (isNotEmpty(addresses.x) && isNotEmpty(addresses.y)) {
                setMap_1(addresses.address, Number(addresses.x), Number(addresses.y));
                return;
            }
            var applyAddress_1 = function (_a) {
                var name = _a.name, x = _a.x, y = _a.y;
                setMap_1(name, x, y);
            };
            searchAddress(address, function (result) {
                if (result != null) {
                    applyAddress_1(result);
                }
                else if (jibunAddress != null && jibunAddress !== '') {
                    searchAddress(jibunAddress, function (result) {
                        if (result != null) {
                            applyAddress_1(result);
                        }
                    });
                }
            });
        }
        catch (error) {
            //
        }
    }

    exports.initializeKakaomap = initializeKakaomap;

    Object.defineProperty(exports, '__esModule', { value: true });

})));