/**
form javascript controls
**/
$( document ).ready(function() {
    var urlVars = getUrlVars();
    var url = "https://acngoogle.my.workfront.com/task/view?ID=" + urlVars['id']
    $("#linkout").attr("href", url + "task/view?ID=" + urlVars['id'])
    console.log("top: " + url);

    var shortCode = {
        "email": "EMAILHTMLDARKA11YCOMPLIANT",
        "qa": "EMAILQADARKA11YCOMPLIANT",
        "landingPage": "LPHTMLDARKA11YCOMPLIANT",
        "existingBuild": "EMAILEXISTINGDARKA11YCOMPLIANT",
        "push": "GNPPUSHBLD",
        "pushQa": "GNPPUSHQA",
        "sigVer": "CAMPMONITORSV",
        "emailRen": "CAMPMONITORER",
        "sendCount": "CAMPMONITOR",
        "localCon": "LOCALIZEDDARKA11YCOMPLIANT",
        "localConRedwood": "LOCALCNOREDWOOD",
        "localPm": "LOCALPM"
    };

    var subTaskUsers = [];

    var deletedTasks = [];

    var stdDeliv = 0;
    var push = 0;

    if (urlVars['id'] != null) {
        $.ajax({
            url: window.origin + "/subtask/" + urlVars['id'],
            type: 'GET',
            contentType: 'application/json',
            success: setSubTask,
            error: function (error) {
                // do nothing
            }
        });
    }

    /* deliverable button handlers */
    $("#btnAddTask").on('click', function () {
        var taskrow = $("#standardTemplate .task").clone();

        taskrow.find('.assignment').typeahead({
          minLength: 1,
          hint: true,
          highlight: true
        },
        {
          name: 'assignment',
          source: substringMatcher(subTaskUsers)
        });

        $(taskrow).appendTo("#divDeliverables");
    });

    $("#divDeliverables").on("click", "button.btnRemoveTask", function(){
        if ($(this).closest(".task").find(".subTaskId").val != "") deletedTasks.push($(this).closest(".task").find(".subTaskId").val());
        console.log(deletedTasks);

        $(this).closest(".task").remove();
    });

    /* calculate handler */
    $('#btnSubmit').on('click', function(e) {

        taskList = [];
        $("#divDeliverables .task").each(function() {
            assignment = $(this).find(".tt-input").val();

            var subTask = {
                "id": $(this).find(".subTaskId").val(),
                "name": $(this).find(".taskType option:selected").val(),
                "assignment": assignment,
                "hours": $(this).find(".taskHours").val(),
            }

            taskList.push(subTask);
        });

        request = {
            "parentTask": urlVars['id'],
            "deletedTasks": deletedTasks,
            "taskList": taskList
        };

        $.ajax({
            url: window.origin + "/subtask",
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(request),
            success: function (data) {
                //alert("success");
                console.log("success");
                $('#linkout')[0].click();
            },
            error: function (error) {
                // replace this eventually with something else
                console.log(error);
                alert("There was an error, contact an administrator for support.");
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

    function setSubTask(setup) {
        console.log("data");
        console.log(setup);
        if (setup != null) {
            $("#titleCampaign").text(setup['campaign']);
            $("#titleProgram").text(setup['program']);
            $("#titleDeliverable").text(setup['task']);

            if (setup['subtaskOptions'].length > 0) {
                var options = setup['subtaskOptions']
                for (var i = 0; i < options.length; i++) {
                    $('.taskType').append(new Option(options[i], options[i]))
                }
            }

            if (setup['userOptions'].length > 0) {
                subTaskUsers = setup['userOptions'];
            }

            if (setup['subTaskList'].length > 0) {
                for (var i = 0; i < setup['subTaskList'].length; i++) {
                    var row = $("#standardTemplate .task").clone();

                    row.find(".subTaskId").val(setup['subTaskList'][i]['id']);
                    row.find(".taskType option[value='" + setup['subTaskList'][i]['name'] + "']").attr('selected', 'selected');
                    row.find(".taskHours").val(setup['subTaskList'][i]['hours']);
                    if (setup['subTaskList'][i]["hoursAssigned"]) row.find('.btnRemoveTask').hide();

                    $(row).appendTo("#divDeliverables");

                    row.find('.assignment').typeahead({
                      minLength: 1,
                      hint: true,
                      highlight: true
                    },
                    {
                      name: 'assignment',
                      source: substringMatcher(subTaskUsers)
                    });

                    row.find('.assignment').typeahead('val', setup['subTaskList'][i]['assignment']);
                }
            }

            $(".container").show();
        }
    }

    var substringMatcher = function(strs) {
      return function findMatches(q, cb) {
        var matches, substringRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
          if (substrRegex.test(str)) {
            matches.push(str);
          }
        });

        cb(matches);
      };
    };

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

