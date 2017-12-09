import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import Chart from 'chart.js';
import './landing-page.html'

Chart.defaults.global.defaultFontColor = "#E5F9E7";


const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

var activeMemberData = {
  labels: [
    "Active Members",
    "Regular Members",
    "Meeting Attenders",
    "Officers",
    "Faculty"
  ],
  datasets: [
    {
      data: [133.3, 86.2, 52.2, 51.2, 50.2],
      backgroundColor: [
        "#FF6384",
        "#63FF84",
        "#84FF63",
        "#8463FF",
        "#6384FF"
      ]
    }]
};

Template.Landing_Page.helpers(activeMemberData);

Template.Landing_Page.onCreated(function onCreated() {
});

Template.Landing_Page.onRendered(function () {
  let activeMemberCtx = this.$("#activemembers");
  var doughnutChart = new Chart(activeMemberCtx, {
    type: 'doughnut',
    data: activeMemberData,
    options: {
      responsive: false
    }
  });

  let eventsCtx = $("#events").get(0).getContext("2d");
  var myChart = new Chart(eventsCtx, {
    type: 'bar',
    data: {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      datasets: [{
        label: 'Non-Members',
        data: [12, 19, 3, 17, 6, 3, 7],
        backgroundColor: "#FF6384",
      }, {
        label: 'Members',
        data: [2, 29, 5, 5, 2, 3, 10],
        backgroundColor: "#63FF84",
      }]
    },
    options: {
      responsive: false
    }
  });

  let activityCtx = $("#activity").get(0).getContext("2d");
  var myChart = new Chart(activityCtx, {
    type: 'line',
    data: {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      datasets: [{
        label: 'Non-Members',
        data: [12, 19, 3, 17, 6, 3, 7],
        backgroundColor: "#FF6384",
      }, {
        label: 'Members',
        data: [2, 29, 5, 5, 2, 3, 10],
        backgroundColor: "#63FF84",
      }]
    },
    options: {
      responsive: false
    }
  });
})

Template.Landing_Page.helpers({

});


Template.Landing_Page.events({

});


