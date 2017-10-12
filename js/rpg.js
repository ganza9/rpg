export class Character {
  constructor(chrType, player, team) {
    this.chrType = chrType;
    this.strength = 1;
    this.intellect  = 1;
    this.dexterity = 1;
    this.stamina = 3;
    this.level = 1;
    this.hitPoints = this.stamina * 3;
    this.equippedWeapon;
    this.equippedArmor;
    this.experience = 0;
    this.expBar = 500;
    this.adjustMainStat(2)
    this.player = player;
    this.team = team;
  }

  readChrType() {
    return self.chrType;
  }

  equipArmor(armor) {
    this.equippedArmor = armor;
  }

  equipWeapon(weapon) {
    this.equippedWeapon = weapon;
  }

  cast(target) {
    let attackPower = this.intellect;
    if (this.equippedWeapon != null){
      attackPower += this.equippedWeapon.castBonus;
    }
    target.receive(attackPower);
    this.checkHp(target);
  }

  strike(target) {
    let attackPower = this.strength;
    if (this.equippedWeapon != null){
      attackPower += this.equippedWeapon.strikeBonus;
    }
    target.receive(attackPower);
    this.checkHp(target);
  }

  sneak(target) {
    let attackPower = this.dexterity;
    if (this.equippedWeapon != null){
      attackPower += this.equippedWeapon.sneakBonus;
    }
    target.receive(attackPower);
    this.checkHp(target);
  }

  receive(damage) {
    if (this.equippedArmor != null){
      damage -= this.equippedArmor.defense;
    }
    if (damage > 0 ){
      this.hitPoints -= damage;
    }
  }

  heal() {
    this.hitPoints = this.stamina * 3;
  }

  experience() {
    this.experience += 250;
    if (this.experience >= this.expBar) {
      self.levelUp
    }
  }

  levelUp() {
    this.level += 1;
    this.stamina += 2;
    this.strength += 1;
    this.intellect += 1;
    this.dexterity += 1;
    this.adjustMainStat(1)
    this.expBar += 750;
    this.experience = 0;
  }

  adjustMainStat(bump) {
    if (this.chrType == "warrior"){
      this.strength += bump;
    } else if (this.chrType == "mage"){
      this.intellect += bump;
    } else {
      this.dexterity += bump;
    }
  }

  checkHp(target) {
    if(target.hitPoints <= 0){
      this.experience += 250;
      target.experience = 0;
      target.team.changeLead();
    }
    if(this.experience >= this.expBar && this.player){
      this.levelUp();
    }
  }
}

export class Equipment {
  constructor(name, weapon, armor, attackBonuses, defenseBonus, value) {
    this.name = name;
    this.weapon = weapon;
    this.armor = armor;
    this.castBonus = attackBonuses[0];
    this.strikeBonus = attackBonuses[1];
    this.sneakBonus = attackBonuses[2];
    this.defense = defenseBonus;
    this.value = value;
  }
}

export class Team {
  constructor(name, bank, computerPlayer) {
    this.name = name;
    this.members = [];
    this.bank = bank;
    this.equipment = [];
    this.lead;
    this.computerPlayer = computerPlayer;
    this.alive = true;
  }

  addMember(character) {
    this.members.push(character)
    if (this.members.length === 1) {
      this.lead = character;
    }
  }

  turn(target){
    if (this.computerPlayer) {
      if (this.lead.chrType === "warrior") {
        this.lead.strike(target)
      } else if (this.lead.chrType === "mage") {
        this.lead.cast(target)
      } else {
        this.lead.sneak(target)
      }
    // } else {
    //   playerTurn;
    }
  }


  changeLead() {
    let startingLead = this.lead
    this.members.forEach(function(member){
      if (member.hitPoints > 0) {
        this.lead = member;
      }
    });

    if (this.lead === startingLead) {
      this.concede()
    }
  }

  concede() {
    this.alive = false;
  }

  sell(item){
    let found = false;
    let length = this.equipment.length;
    this.equipment = this.equipment.filter(function(workingItem){
      found = true;
      return workingItem !== item;
    });
    if (found){
      this.bank += item.value;
    }
  }

  buy(item){
    if (this.bank >= item.value && this.equipment.length < 30){
      this.bank -= item.value
      this.equipment.push(item);
    }
  }

  add(item){
    if (this.equipment.length < 30){
      this.equipment.push(item);
    }
  }

  drop(item){
    this.equipment = this.equipment.filter(function(workingItem){
      return workingItem !== item;
    });
  }
}

export class Encounter {
  constructor(team1, team2) {
    this.team1 = team1;
    this.team2 = team2;
  }

  battle() {
    let turnCounter = 1;
    let deadTeam;
    while (this.team1.alive && this.team2.alive) {
      if(turnCounter % 2 === 1) {
        this.team1.turn(this.team2.lead)
      } else {
        this.team2.turn(this.team1.lead)
      }
      turnCounter++;
    }
    if(this.team1.alive){
      deadTeam = this.team2
    } else {
      deadTeam = this.team1
    }
    if (deadTeam.computerPlayer) {
      return ("You defeated the computer Player!")
    } else {
      return ("Sorry, you were defeated by the computer player.  :(")
    }
  }
}
