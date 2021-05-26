$( document ).ready(function() {
    var urlVars = getUrlVars();

    if (urlVars['id'] != null) {
        $.ajax({
            url: "/output/" + urlVars['id'],
            type: 'GET',
            contentType: 'application/json',
            success: setOutput,
            error: function (error) {
                // do nothing
            }
        });
    }

    $('#btnRecal').on('click', function(e) {
        window.location.href = "/form?recal=True&id=" + urlVars["id"] + "&sid=" + urlVars["sid"] + "&uid=" + urlVars["uid"];
    });

    $('#btnInflight').on('click', function(e) {
        window.location.href = "/inflight?id=" + urlVars["id"] + "&sid=" + urlVars["sid"];
    });

    function setOutput(data) {
        console.log(data);
        if (data['isCalculated']) {
            $("#campaignName").text(data['name']);
            $("#targetLaunch").text(data['launchDate']);
            $("#crdDueDate").text(data['crdDue']);
            $("#projDesc").text(data['description']);
            $("#prodLoc").text(data['prodLoc']);
            $("#numLang").text(data['numLang']);
            $("#numMarkets").text(data['numMarkets']);
            numEmails = 0

            if (data['landingPage'] != null) {
                mapDeliverables(data['landingPage'], "landingPage");
                $("#numLp").text(data['landingPage']['count']);
            }

            if (data['emailHtmlBuild'] != null) {
                mapDeliverables(data['emailHtmlBuild'], "emailHtml");
                numEmails += data['emailHtmlBuild']['count'];
            }

            if (data['existingHtml'] != null) {
                mapDeliverables(data['existingHtml'], "existHtml");
                numEmails += data['existingHtml']['count'];
            }

            if (data['emailQa'] != null) {
                mapDeliverables(data['emailQa'], "emailQa");
            }

            if (data['pushBuild'] != null) mapDeliverables(data['pushBuild'], "pushBuild");

            if (data['pushQa'] != null) mapDeliverables(data['pushQa'], "pushQa");

            if (data['program'] != null) $("#projProgram").text(data['program']);

            if (data['ampInit'] != null) mapDeliverables(data['ampInit'], "ampInit");

            if (data['ampModule'] != null) mapDeliverables(data['ampModule'], "ampModule");

            if (data['ampSection'] != null) mapDeliverables(data['ampSection'], "ampSection");

            if (data['sendCount'] != null) mapDeliverables(data['sendCount'], "sendCount");

            if (data['signalVerification'] != null) mapDeliverables(data['signalVerification'], "signalVer");

            if (data['emailRendering'] != null) mapDeliverables(data['emailRendering'], "emailRendering");

            if (data['incentiveBatch'] != null) mapDeliverables(data['incentiveBatch'], "incentiveBatch");

            if (data['localContent'] != null) mapDeliverables(data['localContent'], "localContent");

            if (data['localContentAmp'] != null) mapDeliverables(data['localContentAmp'], "localContentAmp");

            if (data['localContentPush'] != null) mapDeliverables(data['localContentPush'], "localContentPush");

            if (data['localContentRedwood'] != null) mapDeliverables(data['localContentRedwood'], "localContentRedwood");

            if (data['localizationPm'] != null) mapDeliverables(data['localizationPm'], "localPm");

            if (data['newProgTrans'] != null) mapDeliverables(data['newProgTrans'], "newProgTrans");

            if (data['techApproach'] != null) mapDeliverables(data['techApproach'], "techApproach");

            if (data['changeRoundExec'] != null) mapDeliverables(data['changeRoundExec'], "changeRoundExec");

            if (data['changeRoundMgmt'] != null) mapDeliverables(data['changeRoundMgmt'], "changeRoundMgmt");

            if (data['addDeviceTest'] != null) {
                mapDeliverables(data['addDeviceTest'], "addDeviceTest");
                if (data['addDeviceTest']['count'] > 0) $("#addDeviceTest").text('Yes');
            }

            if (data['cmpExecution'] != null) {
                mapDeliverables(data['cmpExecution'], "cmpExecution");
                $("#mpmLoc").text(data['cmpExecution']['location']);
            }

            if (data['cmpPlanning'] != null) mapDeliverables(data['cmpPlanning'], "cmpPlanning");

            if (!data['localization']) $("#localHeader").hide();
            if (!data['monitoring']) $("#monitoringHeader").hide();
            if (data['campaignType'] != "STANDARD") $(".standard").hide();

            $("#numEmails").text(numEmails);

            if (data['product'] != null) $("#projProduct").text(data['product']);

            if (data['accountMgmt'] != null) $("#accntMgmt").text(data['accountMgmt'])

            if (data['region'] != null) $("#projRegion").text(data['region']);

            if (data['abtesting'] != null) $("#abtesting").text(data['abtesting']);

            if (data['rush'] != null) $("#rushCampaign").text(data['rush']);
            if (data['rushFee'] != null) {
                if (data['rushFee'] == "$0.00") $("#rushRow").hide();
                else $("#rushFee").text(data['rushFee']);
            }

            if (data['incremental'] != null) $("#incrementalCampaign").text(data['incremental']);
            if (data['incrementalFee'] != null) {
                if (data['incrementalFee'] == "$0.00") $("#incrementalRow").hide();
                else $("#incrementalFee").text(data['incrementalFee']);
            }

            if (data['accessibilityAdv'] != null) {
                if (data['accessibilityAdv'] == "$0.00") $("#accessibilityAdvRow").hide();
                else $("#accessibilityAdv").text(data['accessibilityAdv']);
            }

            if (data['cancellation'] != null) {
                if (data['cancellation'] == "$0.00") $("#cancellationRow").hide();
                else $("#cancellation").text(data['cancellation']);
            }

            if (data['cmpMonitoring'] != null) $("#campaignMonitoring").text(data['cmpMonitoring']);

            if (data['total'] != null) $("#delivTotal").text(data['total'])

            if ((data['projStatus'] == "SCO" || data['projStatus'] == "PLN") && !data['uploadCRD'] && data['parentCampaign'] == '' && !data['hoursInputed']) $("#divRecal").css("display", "block");
            else $("#divInflight").css("display", "block");

            $("#divOutput").show();
        } else {
            $("#divNotCalculated").show();
        }

    }

    function mapDeliverables (deliverable, tableid) {
        if (deliverable['count'] > 0) {
            $("#" + tableid + "Loc").text(deliverable['location']);
            $("#" + tableid + "Cnt").text(deliverable['count']);
            $("#" + tableid + "Fee").text(deliverable['cost']);
        } else {
            $("#" + tableid + "Row").hide();
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
});
