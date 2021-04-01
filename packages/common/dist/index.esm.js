import { jsx } from 'react/jsx-runtime';
import Icon from '@ant-design/icons';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function Logo() {
    return (jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "180", height: "145.333", version: "1", viewBox: "0 0 135 109" }, { children: jsx("path", { d: "M328 1083c-16-4-18-18-18-116V856l60 59c51 51 60 65 60 96 0 52-49 87-102 72zM1110 885l-54-55 32-32 32-32-35-36-35-36 55-54 55-55 72 72c63 63 72 77 72 108s-9 45-70 106l-69 69-55-55zM764 852c-9-7-36-115-38-157-1-11 6-21 15-23 12-2 20 10 29 45 10 41 13 45 20 27 15-39 32-39 64-2l31 36v-52c0-39 4-51 15-51s17 20 23 84c11 112 0 123-57 57l-43-49-12 36c-13 40-32 59-47 49zM232 637l-52-53 74-72c81-79 105-87 150-51 19 15 26 30 26 56 0 30-10 45-67 104-36 38-69 69-72 69-4 0-30-24-59-53zM774 248c-61-29-56-142 7-168 36-15 99-5 99 15 0 11-12 15-45 15-34 0-47 5-55 20-10 19-8 20 50 20h60v30c0 59-61 95-116 68zM971 251c-7-5-22-6-32-4-18 5-19-1-19-81 0-79 2-86 20-86s20 7 20 59c0 61 16 89 45 77 11-4 15-22 15-71 0-58 2-65 20-65 17 0 20 7 20 53 0 64 19 98 47 81 14-8 19-26 21-73 3-54 5-61 24-61s20 5 16 76c-3 60-7 79-23 90-25 18-60 18-78-1-13-13-16-13-27 0-14 17-48 19-69 6zM1180 246c0-2 14-36 30-76 17-40 30-79 30-86s-12-22-26-33c-16-13-24-27-20-36 17-46 70 13 116 129 22 55 40 101 40 103s-10 3-23 3c-20 0-26-9-42-57l-18-58-19 58c-17 48-23 57-44 57-13 0-24-2-24-4z", transform: "matrix(.1 0 0 -.1 0 109)" }, void 0) }), void 0));
}
var LogoContainer = function () {
    return (jsx("div", __assign({ style: { height: '100%' } }, { children: jsx(Icon, { component: Logo, style: { fontSize: 66 } }, void 0) }), void 0));
};

export { LogoContainer };
