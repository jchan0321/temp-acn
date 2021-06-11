/**
form javascript controls
**/
$( document ).ready(function() {
    toggleCalculate(false);
    var urlVars = getUrlVars();

    var shortCode = {
        "email": "EMAILHTMLDARKA11YCOMPLIANT",
        "qa": "EMAILQADARKA11YCOMPLIANT",
        "landingPage": "LPHTMLDARKA11YCOMPLIANT",
        "existingBuild": "EMAILEXISTINGDARKA11YCOMPLIANT",
        "push": "PUSHBLD",
        "gnpPush": "GNPPUSHBLD",
        "pushQa": "PUSHQA",
        "pushGnpQa": "GNPPUSHQA",
        "sigVer": "CAMPMONITORSV",
        "emailRen": "CAMPMONITORER",
        "sendCount": "CAMPMONITORSC",
        "localCon": "LOCALIZEDDARKA11YCOMPLIANT",
        "localConRedwood": "LOCALCNOREDWOOD",
        "localPm": "LOCALPM"
    }

    var stdDeliv = 0
    var push = 0

    if (urlVars['id'] != null) {
        $.ajax({
            url: "/calculator/" + urlVars['id'],
            type: 'GET',
            contentType: 'application/json',
            success: setTasks,
            error: function (error) {
                // do nothing
                toggleCalculate(true);
            }
        });
    }

    /* deliverable button handlers */
    $("#btnAddTask").on('click', function () {
        var taskrow = $("#standardTemplate .task").clone();

        $(taskrow).appendTo("#divDeliverables");
    });

    $("#btnAddPushTask").on('click', function () {
        var taskrow = $("#pushTemplate .task").clone();

        $(taskrow).appendTo("#divPush");
    });

    $("#btnAddMonitoringTask").on('click', function () {
        var taskrow = $("#monitoringTemplate .task").clone();

        $(taskrow).appendTo("#divMonitoring");
    });

    $("#btnAddLocalizationTask").on('click', function () {
        var taskrow = $("#localizationTemplate .task").clone();

        $(taskrow).appendTo("#divLocalization");
    });

    $("#btnAddIncentiveTask").on('click', function () {
        var taskrow = $("#incentiveTemplate .task").clone();

        $(taskrow).appendTo("#divIncentive");
    });

    $(".languageOption").change(languageContentToggle);

    $("#divDeliverables").on("click", "button.btnRemoveTask", function(){
        $(this).closest(".task").remove();
    });

    $("#divPush").on("click", "button.btnRemoveTask", function(){
        $(this).closest(".task").remove();
    });

    $("#divMonitoring").on("click", "button.btnRemoveTask", function(){
        $(this).closest(".task").remove();
    });

    $("#divMonitoring").on("click", "button.btnRemoveTask", function(){
        $(this).closest(".task").remove();
    });

    $("#divLocalization").on("click", "button.btnRemoveTask", function(){
        $(this).closest(".task").remove();
    });

    $("#divIncentive").on("click", "button.btnRemoveTask", function(){
        $(this).closest(".task").remove();
    });

    $(document).on("click", "input.crdAMP" , function() {
        $(this).parents(".task").find(".divAddModules").toggle();
        $(this).parents(".task").find(".divAddSections").toggle();
    });

    /* click handlers for drop down select changes */
    $("#divDeliverables").on('click', '.tasktype', function(){
        $(this).data('prev_val', $(this).val());
    }).on('change','.tasktype', function(){
        var prev = $(this).data('prev_val');
        var current = $(this).val();
        $(this).parents(".task").find(".divAmp").show();
        if (prev == shortCode['push'] || prev == shortCode['gnpPush']) {
            push--;
            stdDeliv++;
        } else if (current == shortCode['push'] || current == shortCode['gnpPush']) {
            push++;
            stdDeliv--;
        }

        if (current == shortCode['push'] || current == shortCode['gnpPush'] || current == shortCode['landingPage']) {
            $(this).parents(".task").find(".crdAMP").prop("checked", false);
            $(this).parents(".task").find(".divAmp").hide();
            $(this).parents(".task").find(".divAddModules").hide();
            $(this).parents(".task").find(".divAddSections").hide();
        }
    });

    $("#campType").on('change', function(){
        var selectedVal = $(this).val();

        switch ($(this).val()) {
            case "STANDARD":
                $(".localization").each(function () { $(this).hide(); });
                $(".incentive").each(function () { $(this).hide(); });
                $(".push").each(function () { $(this).hide(); });
                $(".monitoring").each(function () { $(this).hide(); });
                $(".standard").each(function () { $(this).show(); });
                break;
            case "PUSH":
                $(".localization").each(function () { $(this).hide(); });
                $(".incentive").each(function () { $(this).hide(); });
                $(".standard").each(function () { $(this).hide(); });
                $(".monitoring").each(function () { $(this).hide(); });
                $(".push").each(function () { $(this).show(); });
                break;
            case "MONITORING":
                $(".standard").each(function () { $(this).hide(); });
                $(".localization").each(function () { $(this).hide(); });
                $(".incentive").each(function () { $(this).hide(); });
                $(".push").each(function () { $(this).hide(); });
                $(".monitoring").each(function () { $(this).show(); });
                break;
            case "LOCALIZATION":
                $(".standard").each(function () { $(this).hide(); });
                $(".monitoring").each(function () { $(this).hide(); });
                $(".incentive").each(function () { $(this).hide(); });
                $(".push").each(function () { $(this).hide(); });
                $(".localization").each(function () { $(this).show(); });
                break;
            case "INCENTIVEBATCH":
                $(".standard").each(function () { $(this).hide(); });
                $(".monitoring").each(function () { $(this).hide(); });
                $(".localization").each(function () { $(this).hide(); });
                $(".push").each(function () { $(this).hide(); });
                $(".incentive").each(function () { $(this).show(); });
                break;
            default:
                break;
        }
    });

    $("#divMonitoring").on('change','.monitoringtype', function(){
        var selectedVal = $(this).val();

        switch ($(this).val()) {
            case shortCode['emailRen']:
                $(this).parents(".task").find(".sendCountComplexity").hide();
                $(this).parents(".task").find(".signalVerComplexity").hide();
                $(this).parents(".task").find(".emailRenderComplexity").show();
                break;
            case shortCode['sigVer']:
                $(this).parents(".task").find(".sendCountComplexity").hide();
                $(this).parents(".task").find(".signalVerComplexity").show();
                $(this).parents(".task").find(".emailRenderComplexity").hide();
                break;
            case shortCode['sendCount']:
                $(this).parents(".task").find(".sendCountComplexity").show();
                $(this).parents(".task").find(".signalVerComplexity").hide();
                $(this).parents(".task").find(".emailRenderComplexity").hide();
                break;
            default:
                break;
        }
    });

    /* calculate handler */
    $('#btnSubmit').on('click', function(e) {
        toggleCalculate(false);

        var taskList = []

        if ($("#crdHandoffDate").val() == '' || $("#launchDate").val() == '') {
            toggleCalculate(true);
            alert("Please CRD Handoff and Launch Dates");
            return;
        } else {
            if (Date.parse($("#crdHandoffDate").val()) >= Date.parse($("#launchDate").val())) {
                toggleCalculate(true);
                alert("CRD Handoff date must be before Launch Date");
                return;
            }
        }

        if ($("#crdProgram").val() == '') {
            toggleCalculate(true);
            alert("A Program must be selected.");
            return;
        }

        // monitoring deliverables
        monitoringList = []

        $("#divMonitoring .task").each(function() {
            if ($(this).is(":visible")) {
                delivType = $(this).find(".monitoringtype option:selected").val();

                var projTask = {
                    "name": delivType,
                    "location": "IND",
                    "frequency": $(this).find(".frequencytype option:selected").val(),
                    "quantity": $(this).find(".taskquantity").val(),
                }

                if (delivType == shortCode['emailRen']) projTask["complexity"] = $(this).find(".emailRenderComplexity option:selected").val();
                else if (delivType == shortCode['sigVer']) projTask["complexity"] = $(this).find(".signalVerComplexity option:selected").val();
                else projTask["complexity"] = $(this).find(".sendCountComplexity option:selected").val();

                monitoringList.push(projTask);
            }
        });

        var request = {
            "id": urlVars['id'],
            "abtesting": $("#crdABTesting").prop('checked'),
            "campaignType": $("#campType").val(),
            "crdHandoff": $("#crdHandoffDate").val(),
            "description": $("#campDesc").val(),
            "launchDate": $("#launchDate").val(),
            "mpmLoc": $('#mpmLoc').val(),
            "product": $("#crdProduct").val(),
            "prodLoc": $("#prodLoc").val(),
            "program": $("#crdProgram").val(),
            "quarter": $("#quarter").val(),
            "recal": urlVars['recal'],
            "region": $("#crdRegion").val(),
        }

        switch ($("#campType").val()) {
            case "STANDARD":
                // standard deliverables
                var existingBuild = $("#crdExistingCreative").prop('checked');
                $("#divDeliverables .task").each(function() {
                    if ($(this).is(":visible")) {
                        delivType = $(this).find(".tasktype option:selected").val();
                        var amp = {
                            "amp": delivType == shortCode['push'] ? false : $(this).find(".crdAMP").prop('checked'),
                            "addModule": $(this).find(".addModule").val(),
                            "addSection": $(this).find(".addSection").val(),
                        }

                        var projTask = {
                            "name": delivType,
                            "complexity": $(this).find(".taskcomplexity option:selected").val(),
                            "location": "IND",
                            "status": $(this).find(".taskstatus option:selected").val(),
                            "quantity": $(this).find(".taskquantity").val(),
                            "amp": amp
                        }

                        if (delivType == shortCode["email"]) {
                            if (existingBuild) {
                                projTask["name"] = shortCode["existingBuild"];
                                projTask["status"] = "M";
                            }

                            var qaTask = {
                                "name": shortCode["qa"],
                                "complexity": $(this).find(".taskcomplexity option:selected").val(),
                                "location": "IND",
                                "status": $(this).find(".taskstatus option:selected").val(),
                                "quantity": $(this).find(".taskquantity").val(),
                                "amp": { "amp": false }
                            }

                            taskList.push(qaTask);
                        }

                        taskList.push(projTask);
                    }
                });

                localization = {
                    "languageAmt": $("#crdNumberOfLanguages").val(),
                    "contentType": $("#localContentType").val(),
                    "redwood": $("#localContentTypeRedwood").val(),
                    "processManagement": $("#localProcessMgmt").val()
                }

                var standard = {
                    "addDeviceTest": $("#crdAdditionalDeviceTesting").prop('checked'),
                    "accessibilityAdv": $("#crdAdvancedAccessibility").prop('checked'),
                    "built": $("#crdBuilt").prop('checked'),
                    "campaignExecution": $("#crdCampaignExecution").val(),
                    "campaignPlanning": $("#crdCampaignPlanning").val(),
                    "incentiveBatch": $("#crdIncentiveBatch").val(),
                    "incrementalCampaign": $("#crdIsIncrementalCampaign").prop('checked'),
                    "localization": localization,
                    "monitoringTasks": monitoringList,
                    "newOwnerTrans": $("#crdOwnershipTransition").val(),
                    "push": false,
                    "rushCampaign": $("#crdRushCampaign").prop('checked'),
                    "standardTasks": taskList,
                    "technicalApproach": $("#crdTechnicalApproachPlan").val(),
                }
                $.extend(request, standard);
                break;
            case "PUSH":
                $("#divPush .task").each(function() {
                    if ($(this).is(":visible")) {
                        delivType = $(this).find(".tasktype option:selected").val();
                        var amp = {
                            "amp": false
                        }

                        var projTask = {
                            "name": delivType,
                            "complexity": $(this).find(".taskcomplexity option:selected").val(),
                            "location": "IND",
                            "status": "N",
                            "quantity": $(this).find(".taskquantity").val(),
                            "amp": amp
                        }


                        var qaTask = {
                            "name": delivType == shortCode["push"] ? shortCode["pushQa"] : shortCode["pushGnpQa"],
                            "complexity": $(this).find(".taskcomplexity option:selected").val(),
                            "location": "IND",
                            "status": "N",
                            "quantity": $(this).find(".taskquantity").val(),
                            "amp": { "amp": false }
                        }

                        taskList.push(qaTask);

                        taskList.push(projTask);
                    }
                });

                localization = {
                    "languageAmt": $("#crdNumberOfLanguages").val(),
                    "contentType": $("#localContentType").val(),
                    "redwood": $("#localContentTypeRedwood").val(),
                    "processManagement": $("#localProcessMgmt").val()
                }

                var standard = {
                    "addDeviceTest": $("#crdAdditionalDeviceTesting").prop('checked'),
                    "accessibilityAdv": $("#crdAdvancedAccessibility").prop('checked'),
                    "built": $("#crdBuilt").prop('checked'),
                    "campaignExecution": $("#crdCampaignExecution").val(),
                    "campaignPlanning": $("#crdCampaignPlanning").val(),
                    "incentiveBatch": $("#crdIncentiveBatch").val(),
                    "incrementalCampaign": $("#crdIsIncrementalCampaign").prop('checked'),
                    "localization": localization,
                    "monitoringTasks": monitoringList,
                    "newOwnerTrans": $("#crdOwnershipTransition").val(),
                    "push": true,
                    "rushCampaign": $("#crdRushCampaign").prop('checked'),
                    "standardTasks": taskList,
                    "technicalApproach": $("#crdTechnicalApproachPlan").val(),
                }
                $.extend(request, standard);
                break;
            case "MONITORING":
                var monitoring = {
                    "monitoringTasks": monitoringList,
                }
                $.extend(request, monitoring);
                break;
            case "LOCALIZATION":
                // standard deliverables
                var existingBuild = $("#crdExistingCreative").prop('checked');
                $("#divLocalization .task").each(function() {
                    if ($(this).is(":visible")) {

                        var projTask = {
                            "name": $(this).find(".localizationType option:selected").val(),
                            "location": "IND",
                            "status": $(this).find(".taskstatus option:selected").val(),
                            "langAmt": $(this).find(".numberOfLanguages option:selected").val(),
                            "quantity": $(this).find(".taskquantity").val(),
                        }

                        taskList.push(projTask);
                    }
                });

                var localization = {
                    "campaignExecution": $("#localCampaignExecution").val(),
                    "localizationTasks": taskList,
                }
                $.extend(request, localization);
                break;
            case "INCENTIVEBATCH":
                incentiveList = []

                $("#divIncentive .task").each(function() {
                    if ($(this).is(":visible")) {
                        var projTask = {
                            "location": "IND",
                            "complexity": $(this).find(".taskComplexity option:selected").val(),
                            "status": $(this).find(".taskstatus option:selected").val(),
                            "quantity": $(this).find(".taskquantity").val(),
                        }

                        incentiveList.push(projTask);
                    }
                });

                var incentive = {
                    "incentiveTasks": incentiveList,
                }
                $.extend(request, incentive);
                break;
            default:
                break;
        }

        $.ajax({
            url: "/project",
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(request),
            success: function (data) {
                window.location.href = "/waiting?uid=" + data['ownerID'];
            },
            error: function (error) {
                // replace this eventually with something else
                console.log(error);
                toggleCalculate(true);
                alert("There was an error, contact an administrator for support.")
            }
        });

    });

    /* helper function */
    function languageContentToggle() {
        if ($("#localContentType").val() != "NA") {
            $("#localContentTypeRedwood").prop("disabled", "disabled");
        }
        else if ($("#localContentTypeRedwood").val() != "NA") {
            $("#localContentType").prop("disabled", "disabled");
        }
        else {
            $("#localContentType").prop("disabled", false);
            $("#localContentTypeRedwood").prop("disabled", false);
        }
    }

    function getUrlVars()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    function standardDelivPushToggle() {
        if (push > 1) {
            $(".optionStd").each(function () {
                $(this).prop("disabled", "disabled");
            });
        }
        else if (stdDeliv > 1) {
            $(".optionPush").each(function () {
                $(this).prop("disabled", "disabled");
            });
        }
        else {
            $(".optionPush").each(function () {
                $(this).prop("disabled", false);
            });

            $(".optionStd").each(function () {
                $(this).prop("disabled", false);
            });
        }
    }

    function toggleCalculate(on) {
        if (on) {
            // enable calculate button
            $("#btnSubmit").attr("value", "Calculate");
            $("#btnSubmit").css("background", "#ff8200");
            $("#btnSubmit").css("cursor", "pointer");
            $("#btnSubmit").removeAttr("disabled");
        } else {
            // disable calculate button
            $("#btnSubmit").attr("value", "Working...");
            $("#btnSubmit").css("background", "grey");
            $("#btnSubmit").css("cursor", "auto");
            $("#btnSubmit").attr("disabled", "true");
        }
    }

    function setTasks(setup) {
        toggleCalculate(true);

        console.log(setup)

        $("#campType").val(setup['campaignType']);
        $("#campDesc").val(setup['description']);
        $("#crdABTesting").prop('checked', setup['abtest']);
        $("#crdAdvancedAccessibility").prop('checked', setup['accessAdv']);
        $("#crdAdditionalDeviceTesting").prop('checked', setup['addDeviceTest']);
        $("#crdBuilt").prop('checked', setup['built']);
        if (setup['cmpExecution'] != null) $("#crdCampaignExecution").val(setup['cmpExecution']);
        if (setup['cmpPlanning'] != null) $("#crdCampaignPlanning").val(setup['cmpPlanning']);
        if (setup['crdDue'] != null) $("#crdHandoffDate").val(setup['crdDue']);
        $("#crdExistingCreative").prop('checked', setup['existingBuild']);
        if (setup['incentiveBatch'] != null) $("#crdIncentiveBatch").val(setup['incentiveBatch']);
        $("#crdIsIncrementalCampaign").prop('checked', setup['incremental']);
        if (setup['launchDate'] != null) $("#launchDate").val(setup['launchDate']);
        if (setup['localContent'] != null) $("#localContentType").val(setup['localContent']);
        if (setup['localPM'] != null) $("#localProcessMgmt").val(setup['localPM']);
        languageContentToggle();
        if (setup['mpmLoc'] != null) $('#mpmLoc').val([setup['mpmLoc']]);
        if (setup['newProgTrans'] != null) $("#crdOwnershipTransition").val(setup['newProgTrans']);
        if (setup['numLang'] != null) $("#crdNumberOfLanguages").val(setup['numLang']);
        if (setup['prodLoc'] != null) $("#prodLoc").val(setup['prodLoc']);
        if (setup['productsList'].length > 0) {
            var products = setup['productsList']
            for (var i = 0; i < products.length; i++) {
                $('#crdProduct').append(new Option(products[i], products[i]))
            }

            if (setup['product'] != '') $("#crdProduct").val(setup['product']);
        }
        if (setup['programs'].length > 0) {
            var programs = setup['programs']
            for (var i = 0; i < programs.length; i++) {
                $('#crdProgram').append(new Option(programs[i]['name'], programs[i]['ID']))
            }

            if (setup['programId'] != null) $('#crdProgram').val(setup['programId']);
        }
        if (setup['quarter'] != null) $("#quarter").val(setup['quarter']);
        if (setup['redwood'] != null) $("#localContentTypeRedwood").val(setup['redwood'])
        if (setup['region'] != '') $("#crdRegion").val(setup['region']);
        $("#crdRushCampaign").prop('checked', setup['rush']);
        if (setup['techApproach'] != null) $("#crdTechnicalApproachPlan").val(setup['techApproach']);

        switch (setup['campaignType']) {
            case "STANDARD":
                if (setup['standardTasks'].length > 0) {
                    for (var i = 0; i < setup['standardTasks'].length; i++) {
                        var row = $("#standardTemplate .task").clone();

                        if (setup['standardTasks'][i]['shortCode'] == shortCode["existingBuild"]) {
                            row.find(".tasktype option[value='" + shortCode["email"] + "']").attr('selected', 'selected');
                        }
                        else {
                            row.find(".tasktype option[value='" + setup['standardTasks'][i]['shortCode'] + "']").attr('selected', 'selected');
                        }

                        row.find(".taskcomplexity option[value='" + setup['standardTasks'][i]['complexity'] + "']").attr('selected', 'selected');
                        row.find(".taskstatus option[value='" + setup['standardTasks'][i]['modification'] + "']").attr('selected', 'selected');
                        row.find(".taskquantity").val(setup['standardTasks'][i]['count']);

                        if (setup['standardTasks'][i]['amp']) {
                            row.find(".crdAMP").attr('checked', true);
                            row.find(".addSection").val(setup['standardTasks'][i]['ampSection'])
                            row.find(".addModule").val(setup['standardTasks'][i]['ampModule'])
                            row.find(".divAddModules").toggle();
                            row.find(".divAddSections").toggle();
                        }

                        $(row).appendTo("#divDeliverables");
                    }
                } else {
                    var row = $("#standardTemplate .task").clone();
                    $(row).appendTo("#divDeliverables");
                }
                break;
            case "PUSH":
                if (setup['standardTasks'].length > 0) {
                    for (var i = 0; i < setup['standardTasks'].length; i++) {
                        var row = $("#pushTemplate .task").clone();
                        row.find(".tasktype option[value='" + setup['standardTasks'][i]['shortCode'] + "']").attr('selected', 'selected');
                        row.find(".taskcomplexity option[value='" + setup['standardTasks'][i]['complexity'] + "']").attr('selected', 'selected');
                        row.find(".taskstatus option[value='" + setup['standardTasks'][i]['modification'] + "']").attr('selected', 'selected');
                        row.find(".taskquantity").val(setup['standardTasks'][i]['count']);

                        $(row).appendTo("#divPush");
                    }
                }
                $(".standard").each(function () { $(this).hide(); });
                $(".push").each(function () { $(this).show(); });
                break;
            case "MONITORING":
                if (setup['monitoringTasks'].length > 0) {
                    for (var i = 0; i < setup['monitoringTasks'].length; i++) {
                        var row = $("#monitoringTemplate .task").clone();

                        row.find(".monitoringtype option[value='" + setup['monitoringTasks'][i]['shortCode'] + "']").attr('selected', 'selected');

                        switch (setup['monitoringTasks'][i]['shortCode']) {
                            case shortCode['emailRen']:
                                row.find(".emailRenderComplexity option[value='" + setup['monitoringTasks'][i]['complexity'] + "']").attr('selected', 'selected');
                                break;
                            case shortCode['sigVer']:
                                row.find(".signalVerComplexity").show();
                                row.find(".emailRenderComplexity").hide();
                                row.find(".signalVerComplexity option[value='" + setup['monitoringTasks'][i]['complexity'] + "']").attr('selected', 'selected');
                                break;
                            case shortCode['sendCount']:
                                row.find(".sendCountComplexity").show();
                                row.find(".emailRenderComplexity").hide();
                                row.find(".sendCountComplexity option[value='" + setup['monitoringTasks'][i]['complexity'] + "']").attr('selected', 'selected');
                                break;
                            default:
                                break;
                        }

                        row.find(".frequencytype option[value='" + setup['monitoringTasks'][i]['frequency'] + "']").attr('selected', 'selected');
                        row.find(".taskquantity").val(setup['monitoringTasks'][i]['count']);

                        $(row).appendTo("#divMonitoring");
                        $(".monitoring").each(function () { $(this).show(); });
                    }
                }
                break;
            case "LOCALIZATION":
                if (setup['cmpExecution'] != null) $("#localCampaignExecution").val(setup['cmpExecution']);

                for (var i = 0; i < setup['localizationTasks'].length; i++) {
                    var row = $("#localizationTemplate .task").clone();

                    row.find(".localizationType option[value='" + setup['localizationTasks'][i]['name'] + "']").attr('selected', 'selected');
                    row.find(".numberOfLanguages option[value='" + setup['localizationTasks'][i]['complexity'] + "']").attr('selected', 'selected');
                    row.find(".taskstatus option[value='" + setup['localizationTasks'][i]['modification'] + "']").attr('selected', 'selected');
                    row.find(".taskquantity").val(setup['localizationTasks'][i]['count']);

                    $(row).appendTo("#divLocalization");
                }

                $(".standard").each(function () { $(this).hide(); });
                $(".localization").each(function () { $(this).show(); });
                break;
            case "INCENTIVEBATCH":
                for (var i = 0; i < setup['incentiveTasks'].length; i++) {
                    var row = $("#incentiveTemplate .task").clone();

                    row.find(".taskComplexity option[value='" + setup['incentiveTasks'][i]['complexity'] + "']").attr('selected', 'selected');
                    row.find(".taskquantity").val(setup['incentiveTasks'][i]['count']);

                    $(row).appendTo("#divIncentive");
                }

                $(".standard").each(function () { $(this).hide(); });
                $(".incentive").each(function () { $(this).show(); });
                break;
            default:
                break;
        }

    }
});

