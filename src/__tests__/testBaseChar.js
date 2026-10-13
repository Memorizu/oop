

import Character from '../core/baseChar.js';
import {
  Bowman,
  Swordsman,
  Magician,
  Undead,
  Zombie,
  Daemon,
} from '../core/characters.js';


describe('Классы персонажей', () => {
  test.each([
    [Bowman, 'Bowman', 25, 25],
    [Swordsman, 'Swordsman', 40, 10],
    [Magician, 'Magician', 10, 40],
    [Undead, 'Undead', 25, 25],
    [Zombie, 'Zombie', 40, 10],
    [Daemon, 'Daemon', 10, 40],
  ])('%s создаёт персонажа с правильными свойствами', (Class, type, attack, defense) => {
    const character = new Class('Alex');

    expect(character).toBeInstanceOf(Character);
    expect(character.name).toBe('Alex');
    expect(character.type).toBe(type);
    expect(character.health).toBe(100);
    expect(character.level).toBe(1);
    expect(character.attack).toBe(attack);
    expect(character.defense).toBe(defense);
  });
});

describe('Character', () => {
  test('отклоняет имя не строкового типа', () => {
    expect(() => new Character(123, 'Bowman'))
      .toThrow('Имя должно быть строкой');
  });

  test.each(['A', 'VeryLongName'])('отклоняет имя "%s" неподходящей длины', (name) => {
    expect(() => new Character(name, 'Bowman'))
      .toThrow('Имя должно быть от 2 до 10 символов');
  });

  test('принимает имя длиной от 2 до 10 символов', () => {
    expect(() => new Character('Al', 'Bowman')).not.toThrow();
    expect(() => new Character('Alexander', 'Bowman')).not.toThrow();
  });

  test('отклоняет неизвестный класс', () => {
    expect(() => new Character('Alex', 'Dragon'))
      .toThrow('Непредвиденный класс');
  });

  test('повышает уровень живого персонажа', () => {
    const character = new Bowman('Alex');
    character.health = 50;

    character.levelUp();

    expect(character.level).toBe(2);
    expect(character.attack).toBe(30);
    expect(character.defense).toBe(30);
    expect(character.health).toBe(100);
  });

  test('не повышает уровень персонажа с нулевым здоровьем', () => {
    const character = new Bowman('Alex');
    character.health = 0;

    expect(() => character.levelUp())
      .toThrow('Нельзя повысить левел умершего');
  });

  test('уменьшает здоровье с учётом защиты', () => {
    const character = new Bowman('Alex');

    character.damage(20);

    // 20 урона × (1 − 25 / 100) = 15
    expect(character.health).toBe(85);
  });

  test('не уменьшает здоровье умершего персонажа', () => {
    const character = new Bowman('Alex');
    character.health = 0;

    expect(() => character.damage(10))
      .toThrow('Нельзя повысить левел умершего');
  });
});