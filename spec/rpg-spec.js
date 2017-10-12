
import { Character, Equipment, Team, Encounter } from './../js/rpg.js';
let reusableCharacter;
let monster;
let goodTeam;
let badTeam;
let breastPlate;
let vorpalSword;
let encounter1;
beforeEach(function() {
  goodTeam = new Team("goodguys", 100, true)
  badTeam = new Team("badguys", 100, true)
  reusableCharacter = new Character("warrior", true, goodTeam);
  monster = new Character("mage", false, badTeam);
  breastPlate = new Equipment( breastPlate, false, true, [0,0,0], 5, 100)
  vorpalSword = new Equipment( vorpalSword, true, false, [0,5,3], 0, 50)
  encounter1 = new Encounter(goodTeam, badTeam)
});

describe('Character', function() {
  it('should test whether a Character has the right type', function() {
    expect(reusableCharacter.chrType).toEqual("warrior");
  });

  it('should test whether a Character has the right hitpoints', function() {
    expect(reusableCharacter.hitPoints).toEqual(9);
  });
  it('should test whether a Character has the right attributes', function() {
    expect(reusableCharacter.strength).toEqual(3);
    expect(reusableCharacter.intellect).toEqual(1);
    expect(reusableCharacter.dexterity).toEqual(1);
    expect(reusableCharacter.stamina).toEqual(3);
    expect(reusableCharacter.level).toEqual(1);
  });

  it('should test whether a character can cast correctly on another object', function() {
    expect(reusableCharacter.hitPoints).toEqual(9);
    monster.cast(reusableCharacter)
    expect(reusableCharacter.hitPoints).toEqual(6);
  });

  it('should test whether a character can strike correctly on another object', function() {
    expect(reusableCharacter.hitPoints).toEqual(9);
    monster.strike(reusableCharacter)
    expect(reusableCharacter.hitPoints).toEqual(8);
  });

  it('should test whether a character can sneak correctly on another object', function() {
    expect(reusableCharacter.hitPoints).toEqual(9);
    monster.sneak(reusableCharacter)
    expect(reusableCharacter.hitPoints).toEqual(8);
  });

  it('should test whether a character can heal back to full health', function(){
    reusableCharacter.strike(monster)
    expect(monster.hitPoints).toEqual(6);
    monster.heal()
    expect(monster.hitPoints).toEqual(9);
  });

  it('should test whether a character can kill monster', function(){
    reusableCharacter.strike(monster)
    expect(monster.hitPoints).toEqual(6);
    reusableCharacter.strike(monster)
    expect(monster.hitPoints).toEqual(3);
    reusableCharacter.strike(monster)
    expect(monster.hitPoints).toEqual(0);
    expect(reusableCharacter.experience).toEqual(250);
  });

  it('should test whether a weapon works', function(){
    reusableCharacter.equipWeapon(vorpalSword)
    reusableCharacter.strike(monster)
    expect(monster.hitPoints).toEqual(1);
  });

  it('should test whether a weapon works', function(){
    reusableCharacter.equipWeapon(vorpalSword)
    reusableCharacter.sneak(monster)
    expect(monster.hitPoints).toEqual(5);
  });

  it('should test whether an armor works', function(){
    reusableCharacter.equipWeapon(vorpalSword)
    monster.equipArmor(breastPlate)
    reusableCharacter.strike(monster)
    expect(monster.hitPoints).toEqual(6);
  });

  it('should test whether a character can gain exp', function(){
    reusableCharacter.strike(monster)
    expect(monster.hitPoints).toEqual(6);
    reusableCharacter.strike(monster)
    expect(monster.hitPoints).toEqual(3);
    reusableCharacter.strike(monster)
    expect(monster.hitPoints).toEqual(0);
    expect(reusableCharacter.experience).toEqual(250);
  });

  it('should test whether a character can level up', function(){
    reusableCharacter.experience = 250;
    reusableCharacter.strike(monster);
    reusableCharacter.strike(monster);
    reusableCharacter.strike(monster);
    console.log( '%%%%%%%%%%%%%%%%%%%%%%%%%% experience: ' + reusableCharacter.experience + ' strength : ' + reusableCharacter.strength)
    expect(reusableCharacter.level).toEqual(2);
  });

  it('should test whether a character who faints has their experience reset', function(){
    reusableCharacter.experience = 250;
    monster.cast(reusableCharacter);
    monster.cast(reusableCharacter);
    monster.cast(reusableCharacter);
    expect(reusableCharacter.experience).toEqual(0);
  });
});

describe('Team', function() {
  it('should test whether a team can sell an item', function(){
    goodTeam.equipment.push(breastPlate)
    goodTeam.bank = 0;
    expect(goodTeam.bank).toEqual(0);
    goodTeam.sell(breastPlate);
    expect(goodTeam.bank).toEqual(100);
    expect(goodTeam.equipment.toString()).toEqual([].toString());
  });

  it('should test whether a team can buy an item', function(){
    goodTeam.bank = 100;
    expect(goodTeam.bank).toEqual(100);
    goodTeam.buy(vorpalSword);
    expect(goodTeam.bank).toEqual(50);
    expect(goodTeam.equipment.toString()).toEqual([vorpalSword].toString())
  });

  it('should test whether a team can add an item', function(){
    expect(goodTeam.equipment.toString()).toEqual([].toString());
    goodTeam.add(vorpalSword);
    expect(goodTeam.equipment.toString()).toEqual([vorpalSword].toString())
  });

  it('should test whether a team can drop an item', function(){
    goodTeam.add(vorpalSword);
    expect(goodTeam.equipment.toString()).toEqual([vorpalSword].toString())
    goodTeam.drop(vorpalSword);
    expect(goodTeam.equipment.toString()).toEqual([].toString());
  });
});

describe('Encounter', function() {
  it('should test whether a battle is faught correctly', function(){
    goodTeam.addMember(reusableCharacter);
    badTeam.addMember(monster);
    reusableCharacter.levelUp;
    reusableCharacter.levelUp;
    reusableCharacter.levelUp;
    reusableCharacter.levelUp;
    reusableCharacter.levelUp;
    expect(encounter1.battle()).toEqual("You defeated the computer Player!");
  });
});
