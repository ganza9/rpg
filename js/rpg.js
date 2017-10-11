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
    }
    if(this.experience >= this.expBar && this.player){
      this.levelUp();
    }
  }
}

export class Equipment {
  constructor(name, type, attackBonuses, defenseBonus, value) {
    this.name = name;
    this.type = type;
    this.castBonus = attackBonuses[0];
    this.strikeBonus = attackBonuses[1];
    this.sneakBonus = attackBonuses[2];
    this.defense = defenseBonus;
    this.value = value;
  }
}

export class Team {
  constructor(name, bank) {
    this.name = name;
    this.members = [];
    this.bank = bank;
    this.armors = [];
    this.weapons = [];
  }
}
