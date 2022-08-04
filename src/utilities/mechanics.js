import Elf from '../assets/knight 3.png';
import Goblin from '../assets/knight.png';
import Knight from '../assets/knight 2.jpg';
import Wizard from '../assets/knight 4.png';

const TYPES = {
    MAGIC: {val: 40, name: 'magic', adv: 'MELEE', general: 'MAGIC'},
    MELEE: {val: 40, name: 'strength', adv: 'RANGE', general: 'MELEE'},
    RANGE: {val: 40, name: 'range', adv: 'MAGIC', general: 'RANGE'}
}

export const RACE = [
    {name: 'Wizard', type: TYPES.MAGIC, asset: Wizard},
    {name: 'Goblin', type: TYPES.MELEE, asset: Goblin},
    {name: 'Elf', type: TYPES.RANGE, asset: Elf},
    {name: 'Knight', type: TYPES.MELEE, asset: Knight}
];

const ATTACKS = {
  MAGIC: {move: [
    "Firebolt",
    "Dark Ember",
    "Careless Barrage",
    "Twisted Earth",
    "Earth Bind",
    "Dragon Blast",
    "Scream of Lothai"
  ]},
  MELEE: {},
  RANGE: {}
}

const totalGen = 50;

export const randNum = (min,max) => {
	return Math.floor(Math.random() * (max - min) + min)
}

export const generateCollection = () => {
	const _collection = [];
  
	for(let i = 0; i < totalGen; i++){
  	const _raceIdx = randNum(0,RACE.length);
    _collection.push({
    	id: (i+1).toString().padStart(2,'0'),
    	race: RACE[_raceIdx].name,
      combatType: RACE[_raceIdx].type.general,
      image: RACE[_raceIdx].asset,
      stats: {
      	strength: RACE[_raceIdx].type.general == TYPES.MELEE.general ? randNum(TYPES.MELEE.val,100) : randNum(1,TYPES.MELEE.val),
        range: RACE[_raceIdx].type.general == TYPES.RANGE.general ? randNum(TYPES.RANGE.val,100) : randNum(1,TYPES.RANGE.val),
        magic: RACE[_raceIdx].type.general == TYPES.MAGIC.general ? randNum(TYPES.MAGIC.val,100) : randNum(1,TYPES.MAGIC.val),
        defense: randNum(1,100)
      }
    })
  }
  
  const _finalCollection = _collection.map(asset => ({
  	...asset,
    overall: Object.values(asset.stats).reduce((acc, val) => acc + val,0)
  }));
  
  return _finalCollection;
}

const getAdvantage = (_type1, _type2) => {
	return TYPES[_type1].adv == _type2 ? true : false;
}

const getHitSuccess = (_max) => {
	const _rand = randNum(0,100);
  return _rand >= _max ? true : false;
}

const getAttk = (_attacker, _defender, _curPlayer) => {
	return new Promise((resolve,reject) => {
  	const _combatType = _attacker.combatType;
  	const _advantage = getAdvantage(_combatType, _defender.combatType);
    const _hitRoll = _advantage ? Math.round((_defender.stats.defense + _defender.stats[TYPES[_combatType].name])/2) : _defender.stats.defense;
    const _hitSuccess = getHitSuccess(_hitRoll);
    
    // check how much to hit defender
    if(_hitSuccess){      
    	const _maxHit = Math.round(_attacker.stats[TYPES[_combatType].name] * (1 - (_defender.stats.defense/100)));
      const _hit = randNum(1,_maxHit);
      setTimeout(() => {
      	hitMarkerVisible(_curPlayer == 1 ? 2 : 1, _hit);
        resolve({hit: _hit});
      },2000);
    }else{    	
      setTimeout(() => {
        hitMarkerVisible(_curPlayer == 1 ? 2 : 1, null);
      	resolve({hit: null})
      },2000);
    }
  })
}

const hitMarkerVisible = (_player, _hit) => {
  if(_player == 1){
    if(!_hit){
      document.getElementById('p1-block').style.display = 'block';
    }else{
      document.getElementById('hit-marker-p1').textContent = `-${_hit}`;
      _hit >= 35 ? document.getElementById('hit-marker-p1').style.color = 'orange' : document.getElementById('hit-marker-p1').style.color = 'red';
      document.getElementById('p1-slash').className += 'slash';
      document.getElementById('hit-marker-p1').className += 'marker-visible';
      document.getElementById('p1-img-wrapper').className += 'shake';
    }    
  }else{
    console.log({_player,_hit});
    if(!_hit){
      document.getElementById('p2-block').style.display = 'block';
    }else{
      console.log('placing hit markers');
      document.getElementById('hit-marker-p2').textContent = `-${_hit}`;
      _hit >= 35 ? document.getElementById('hit-marker-p2').style.color = 'orange' : document.getElementById('hit-marker-p2').style.color = 'red';
      document.getElementById('p2-slash').className += 'slash';
      document.getElementById('hit-marker-p2').className += 'marker-visible';
      document.getElementById('p2-img-wrapper').className += 'shake';
    }
  }
}

const log = (_msg) => {
  document.getElementById('game-log').value = `\n${_msg}${document.getElementById('game-log').value}`;
}

const resetHitMarker = (_player) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if(_player == 1){
        document.getElementById('hit-marker-p1').className = '';
        document.getElementById('p1-img-wrapper').className = '';
        document.getElementById('hit-marker-p1').textContent = '';
        document.getElementById('p1-block').style.display = 'none';
        document.getElementById('p1-slash').className = '';
      }else {
        document.getElementById('hit-marker-p2').textContent = '';
        document.getElementById('p2-img-wrapper').className = '';
        document.getElementById('hit-marker-p2').className = '';
        document.getElementById('p2-block').style.display = 'none';
        document.getElementById('p2-slash').className = '';
      }
  
      resolve(true);
    },1250);    
  })  
}

const setDelay = (_delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    },_delay);
  })
}

export const battle = async (p1,p2) => {
    return new Promise(async (resolve) => {
        let curPlayer = randNum(0,1);	// check which player goes first
        const players = [
            {health: 100, id: 0},
          {health: 100, id: 1}
        ]

        await setDelay(1500);
        log(`${curPlayer == 0 ? p1.race : p2.race} goes first...`);
        while(players[0].health > 0 && players[1].health > 0){
            if(curPlayer == 0){	// p1 goes first
              const attk = await getAttk(p1,p2,1);
            if(attk.hit){
              log(`${p1.race} dealt piercing damage: ${attk.hit}`);
              players[1].health = players[1].health - attk.hit;
              document.getElementById('player2-health').children[0].style.transform = `translateX(-${100 - players[1].health}%)`;
              document.getElementById('player2-health-val').textContent = players[1].health > 0 ? `${players[1].health}` : 0;
              
              if(players[1].health > 25 && players[1].health <= 50){
                document.getElementById('player2-health-val').style.color = 'orange';
              }else if(players[1].health >= 0 && players[1].health <= 25){
                document.getElementById('player2-health-val').style.color = 'red';
              }
            }else{
              log(`${p1.race}'s attack was blocked...`)
            }
            curPlayer = 1;
          }else{	// p2 goes first
            const attk = await getAttk(p2,p1,2);
            if(attk.hit){
                log(`${p2.race} dealt piercing damage: ${attk.hit}`);
                players[0].health = players[0].health - attk.hit;
                document.getElementById('player1-health').children[0].style.transform = `translateX(-${100 - players[0].health}%)`;
                document.getElementById('player1-health-val').textContent = players[0].health > 0 ? `${players[0].health}` : 0;

                if(players[0].health > 25 && players[0].health <= 50){
                  document.getElementById('player1-health-val').style.color = 'orange';
                }else if(players[0].health >= 0 && players[0].health <= 25){
                  document.getElementById('player1-health-val').style.color = 'red';
                }
            }else {
              log(`${p2.race}'s attack was blocked...`)
            }
            curPlayer = 0;
          }

          await resetHitMarker(curPlayer == 0 ? 1 : 0)
        }
        
        
        if(players[0].health <= 0){
            log(`${p2.race} Wins!`);
            resolve({status: true, winner: 2})
        }else if(players[1].health <= 0){
          log(`${p1.race} Wins!`);  
          resolve({status: true, winner: 1})
        }
    })
}

