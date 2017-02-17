define(["./ui-loadscript-viewer-props", "qlik", "./lib/codemirror", "text!./template.html", "./mode/javascript/javascript", "./themes", "css!./custom.css"],
    function(props, qlik, CodeMirror, template) {
        'user strict';



        return {
            definition: props,
            template: template,
            support: {
                snapshot: true,
                export: true,
                exportData: false
            },

            controller: ['$scope', function($scope) {
                //add your rendering code here
                $scope.html = "Hello World";

                getScript()
                    .then(function(result) {
                        var tabNames = [];
                        var rows = [];
                        result.forEach(function(tab) {
                            tabNames.push(tab.tab);
                            rows.push(tab.rows);
                        })
                        $scope.tabs = tabNames;
                        $scope.rows = rows;
                        $scope.info = result;
                        $scope.showRows($scope.info[0].rows);

                    })
                    .then(function() {
                        return "Hello";
                    });


                $scope.component.model.Validated.bind(function() {
                    formatRows($scope.currentRows, $scope.layout.props.cssScheme)
                });

                $scope.showRows = function(rows) {
                    $scope.currentRows = rows;
                    formatRows(rows, $scope.layout.props.cssScheme);

                }
            }]
        }

        function formatRows(rows, theme) {
            $("#scriptInfo").html('');
            var test = rows.toString().replace(/\\t/g, "\t");
            var final = test.toString().replace(/\\r\\n/g, "\r\n");
            var finalfinal = final.toString().replace(/\\"/g, "\"");
            var html = '<textarea id="code">' + finalfinal + '</textarea>';

            $("#scriptInfo").append(html);

            var myCode = CodeMirror.fromTextArea(document.getElementById("code"), {
                lineNumbers: true,
                lineWrapping: true,
                readOnly: "nocursor",
                mode: "javascript",
                theme: theme
            });
        }

        function getScript() {
            return new Promise(function(resolve, reject) {
                var enigmaModel = qlik.currApp().model.enigmaModel;
                var tabArray = [];
                var rowArray = [];

                enigmaModel.getScript()
                    .then(function(result) {
                        var strResult = JSON.stringify(result)
                        return strResult.split("///$tab");
                    })
                    .then(function(tabs) {
                        var tabNames = [];


                        tabs.forEach(function(tab) {
                            var bar = tab.indexOf("\\r\\n");
                            var tabName = tab.substr(0, bar);
                            var rows = tab.substring(bar + 4);
                            var tabObject = {
                                tab: tabName,
                                rows: rows
                            };
                            tabNames.push(tabObject);
                        });
                        return tabNames;
                    })
                    .then(function(tabNames) {
                        tabNames.shift();
                        resolve(tabNames);
                    })
            });
        }

        function loadCss(url) {
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            document.getElementsByTagName("head")[0].appendChild(link);
        }

    });