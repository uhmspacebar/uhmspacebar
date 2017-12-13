import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Clubs } from '/imports/api/club/ClubCollection';
import Chart from 'chart.js';
import './club-admin.html'

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';
const ONE_SECOND_DELAY = 1000;

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

Template.Club_Admin_Page.onCreated(function onCreated() {
  this.subscribe(Clubs.getPublicationName());
});

Template.Club_Admin_Page.helpers({
  clubAdminValidation() {
    const profile = Clubs.findDoc(FlowRouter.getParam('username'));
    return profile.clubName;
  },
  clubProfile() {
    return Clubs.findDoc(FlowRouter.getParam('username'));
  }
});


Template.Club_Admin_Page.onRendered=Meteor.setTimeout(function () {
  let activeMemberCtx = this.$("#activemembers");
  var doughnutChart = new Chart(activeMemberCtx, {
    type: 'doughnut',
    data: activeMemberData,
    options: {
      legend: {
        labels: {
          fontColor: "black",
          fontSize: 8
        }
      }
  }}
  );

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
      legend: {
        labels: {
          fontColor: "black",
          fontSize: 8
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: "black",
            fontSize: 8,
            stepSize: 1,
            beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {
            fontColor: "black",
            fontSize: 8,
            stepSize: 1,
            beginAtZero: true
          }
        }]
      }
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
      legend: {
        labels: {
          fontColor: "black",
          fontSize: 8
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: "black",
            fontSize: 8,
            stepSize: 1,
            beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {
            fontColor: "black",
            fontSize: 8,
            stepSize: 1,
            beginAtZero: true
          }
        }]
      }
    }
  });
}, ONE_SECOND_DELAY);


/* Delay is necessary in order to allow DOM to fully render */


Template.Club_Admin_Page.helpers({

});


Template.Club_Admin_Page.events({

});


