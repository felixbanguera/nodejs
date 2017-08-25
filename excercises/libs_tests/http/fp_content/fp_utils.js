/*
Will try to code the main util functions to use in FP

In this file:

*/

// To communicate through events???
var fs = require('fs');
var events = require('events');
var eventEmitter = new events.EventEmitter();

var webiopi = require('../webiopi.js');

var methods = {};

methods.configure_all_devices = function(config){
  console.log(`configure_all_devices with: ${JSON.stringify(config)}`);
  Object.entries(config).forEach(
    ([dev_id, data]) => {
      try{
        var fp_hw = JSON.parse(fs.readFileSync(__dirname+`/devices_status/${dev_id}.json`, 'utf8'));
      }catch(e){
        // if(e.include('ENOENT')){
        //   console.log(`The device ${dev_id} doesn't have config`);
        // }else{
          console.log(`FP_UTILS::configure_all_devices::${dev_id} - Error>>${e}`);
        // }
      }
    }
  );

};

// To compare statuses
methods.compare_n_notify = function(stored, arrived){
  var changed = false;
  Object.entries(stored).forEach(
    ([pos_id, data]) => {
      if(data.function == 'IN' && (data.value != arrived[pos_id].value)) {
        notify_in_changed(pos_id, arrived[pos_id].value);
        changed = true;
      }
    }
  );
  if(changed) save_new_state(arrived);
};

// To save statuses in files corresponding to devices
methods.save_new_state = function(new_jison){
  console.log(`will save new values to ${JSON.stringify(new_jison)}`);
};

// To notify changes to any sucribed service
methods.notify_in_changed = function(pos_id, value){
  console.log(`${pos_id} has different value, changed to ${value}`);
};

methods.basic_callback = function(status, body){
  console.log(`Response: status code: ${status} and body: ${body}`);
};

exports.do = methods;