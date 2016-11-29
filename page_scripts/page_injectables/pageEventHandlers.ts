(function(){
    "use strict";
    window.addEventListener('presenter.module', function (evt) {
        console.log('INHABIT INFO: For app '+ evt.appId +
            ' got module: ' + evt.module.moduleName +
            ' module index ' + evt.moduleConfig.moduleIndex);
    });
    window.addEventListener('presenter.content', function (evt) {
        console.log('INHABIT INFO: For app '+ evt.appId +
            ' got content for module: ' + evt.module.configuration.id +
            ' module index ' + evt.module.configuration.moduleIndex);
    });
    window.addEventListener('presenter.no.content', function (evt) {
        console.log('INHABIT INFO: For app '+ evt.appId +
            ' got NO content for the module: ' + evt.module.configuration.id +
            ' module index ' + evt.module.configuration.moduleIndex);
    });
    window.addEventListener('presenter.error', function (evt) {
        console.log('INHABIT INFO: Presenter error: ' + evt.msg);
    });
    window.addEventListener('presenter.module.getcontent.error', function (evt) {
        console.log('INHABIT INFO: For app '+ evt.appId
            +' presenter module getContent error: ' + evt.module.configuration.id +
            ' error : ' + evt.err);
    });
    window.addEventListener('presenter.module.demand.error', function (evt) {
        console.log('INHABIT INFO: For app '+ evt.appId +
            ' presenter module demanding error: ' + evt.moduleCfg.id +
            ' error : ' + evt.err);
    });

    var arkComponent = document.getElementById("ark-component-content-html");
    console.log("INHABIT INFO: element by id " + arkComponent);

    console.log("documentStart injectable script");
})();
