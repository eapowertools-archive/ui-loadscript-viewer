define([],

    function() {

        var cssScheme = {
            ref: "props.cssScheme",
            label: "css themes",
            type: "string",
            component: "dropdown",
            label: "css theme",
            ref: "props.cssScheme",
            defaultValue: "eclipse",
            options: [
                { value: "eclipse", label: "eclipse" },
                { value: "midnight", label: "midnight" },
                { value: "blackboard", label: "blackboard" },
                { value: "solarized", label: "solarized" },
                { value: "yeti", label: "yeti" },
                { value: "base16-light", label: "base16-light" },
                { value: "vibrant-ink", label: "vibrant-ink" }
            ]

        };

        'use strict';
        var appearanceSection = {
            uses: "settings",
            items: {
                cssScheme: cssScheme
            }
        }
        return {
            type: "items",
            component: "accordion",
            items: {
                appearance: appearanceSection
            }
        };
    }

);


// css: {
//     type: "items",
//     label: "css themes",
//     items: {
//         cssScheme: {
//             type:"string",
//             component:"dropdown",
//             label: "css theme",
//             ref: "props.cssScheme",
//             defaultValue: "./theme/midnight.css",
//             options: [
//                 {value: "./theme/midnight.css", label:"midnight"},
//                 {value: "./theme/blackboard.css", label:"blackboard"},
//                 {value: "./theme/solarized.css", label:"solarized"},
//                 {value: "./theme/yeti.css", label:"yeti"},
//                 {value: "./theme/base16-light.css", label:"base16-light"}
//             ]
//         }
//     }
// }