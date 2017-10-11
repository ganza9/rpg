
import { Character, Equipment, Team } from './../js/rpg.js';
describe('Character', function() {
  let reusableCharacter;
  let monster;
  let goodTeam;
  let badTeam;
  let breastPlate;
  let vorpalSword;
  beforeEach(function() {
    goodTeam = new Team("goodguys", 100)
    badTeam = new Team("badguys", 100)
    reusableCharacter = new Character("warrior", true, goodTeam);
    monster = new Character("mage", false, badTeam);
    breastPlate = new Equipment( breastPlate, "armor", [0,0,0], 5, 100)
    vorpalSword = new Equipment( vorpalSword, "weapon", [0,5,3], 0, 50)
  });

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
