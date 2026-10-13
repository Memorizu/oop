
const types = ['Bowman', 'Swordsman', 'Magician', 'Daemon', 'Undead', 'Zombie'];


class Character {
  constructor(name, type) {
    if (typeof name !== 'string') {
      throw new Error('Имя должно быть строкой');
    }
    if (name.length < 2 || name.length > 10) {
      throw new Error('Имя должно быть от 2 до 10 символов');
    }

    if (!types.includes(type)) {
      throw new Error('Непредвиденный класс');
    }
    this.name = name;
    this.type = type;
    this.health = 100;
    this.level = 1;
    this.attack = null;
    this.defense = null;
  }

  levelUp() {
    if (this.health <= 0) {
      throw new Error('Нельзя повысить левел умершего');
    }

    this.level++;
    this.attack *= 1.2;
    this.defense *= 1.2;
    this.health = 100;
  }

  damage(points) {
    if (this.health <= 0) {
      throw new Error('Нельзя повысить левел умершего');
    }
    this.health -= points * (1 - this.defense / 100);
  }
}

export default Character;
