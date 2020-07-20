/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */


if('function' === typeof importScripts){
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js')
}


if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

const x = self;

self.addEventListener('install',()=>{
  console.log('I am installed')
})

const addSymptom = new workbox.backgroundSync.BackgroundSyncPlugin('symptomQueue', {
  maxRetentionTime: 24 * 60,
  onSync({ queue }) {
    // !!! important call here !!!
    queue.replayRequests(); 
    x.registration.showNotification('Your symptoms have been updated')
  }
});

const addRemark = new workbox.backgroundSync.BackgroundSyncPlugin('addRemarkQueue', {
  maxRetentionTime: 24 * 60,
  onSync({ queue }) {
    // !!! important call here !!!
    queue.replayRequests(); 
    x.registration.showNotification('Your remark has been added to the patient')
  }
});

const editRemark = new workbox.backgroundSync.BackgroundSyncPlugin('editRemarkQueue', {
  maxRetentionTime: 24 * 60,
  onSync({ queue }) {
    // !!! important call here !!!
    queue.replayRequests(); 
    x.registration.showNotification('Your remark has been edited successfully')
  }
});

const deleteRemark = new workbox.backgroundSync.BackgroundSyncPlugin('deleteRemarkQueue', {
  maxRetentionTime: 24 * 60,
  onSync({ queue }) {
    // !!! important call here !!!
    queue.replayRequests(); 
    x.registration.showNotification('Your remark has been deleted successfully')
  }
});

const flag = new workbox.backgroundSync.BackgroundSyncPlugin('flagQueue', {
  maxRetentionTime: 24 * 60,
  onSync({ queue }) {
    // !!! important call here !!!
    queue.replayRequests(); 
    x.registration.showNotification('The Patient has been flagged successfully')
  }
});

workbox.routing.registerRoute(
  'https://fast-hamlet-28566.herokuapp.com/api/add_symptoms',
 new workbox.strategies.NetworkFirst({
    plugins: [addSymptom]
  }),
  'POST'
)

workbox.routing.registerRoute(
  'https://fast-hamlet-28566.herokuapp.com/doctors/add_remark',
 new workbox.strategies.NetworkFirst({
    plugins: [addRemark]
  }),
  'POST'
)

workbox.routing.registerRoute(
  'https://fast-hamlet-28566.herokuapp.com/doctors/edit_remark/1',
 new workbox.strategies.NetworkFirst({
    plugins: [editRemark]
  }),
  'PUT'
)

workbox.routing.registerRoute(
  'https://fast-hamlet-28566.herokuapp.com/doctors/delete_remark/1',
 new workbox.strategies.NetworkFirst({
    plugins: [deleteRemark]
  }),
  'DELETE'
)

workbox.routing.registerRoute(
  'https://fast-hamlet-28566.herokuapp.com/doctors/flag',
 new workbox.strategies.NetworkFirst({
    plugins: [flag]
  }),
  'POST'
)



   
