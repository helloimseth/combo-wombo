'use strict';

const p = 4,
      n = 5;

var log = {}, tier = 0, combo = JSON.stringify(createCombo()), keys = Object.keys(JSON.parse(combo));

playRounds(log, tier);

var combos = Object.keys(flattenObject(log)).map(function(x){return x.split('.');});

function logGame(match, outcome, state) {
  state[match] = true;
}

function getKey (home, away) {
  return home + '-' + away;
}

function checkGame(match, state) {
  return state.hasOwnProperty(match);
}

function playGame(home, away, state, outcome) {
  let match = getKey(home, away);

  if (!checkGame(match, state)) {
    logGame(match, outcome, state);
  }
}

function playRounds(state, tier) {
  for (let i = 0; i < keys.length; i++) {
    state[keys[i]] = JSON.parse(combo);
  }

  tier++;

  if (tier < n - 1) {
    for (let i = 0; i < keys.length; i++) {
      playRounds(state[keys[i]], tier);
    }
  }
}

function createCombo(){
  let round =  {};

  for (let home = 0; home < p; home++) {
    for (let away = home + 1; away < p; away++) {
      playGame(home, away, round);
    }
  }

  return round;
}

function flattenObject(ob) {
  var toReturn = {};
  
  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    
    if ((typeof ob[i]) == 'object') {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        
        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};