const intro = `Мини-игра ***Минг Бонг***.
 
Восстал монстр Минг Бонг! Храбрые борцы c монстрами спешат на помощь! Самое время втупить в бой. 

Ну что, погнали?`;

let roundCount = 0;
let health = 50;
let winnerAnnounce = `Монстр не побеждён, но ему так и не удалось захватить мир.`;
const healthLog = [50];
const healLog = [0];
const damageLog = [0];

confirm(intro)
  ? playGame()
  : alert(`Сегодня не лучший день для битвы. Попробуем в следующий раз!

Если передумаете, просто обновите страницу ;-)`);

function playGame() {
  alert(`Доблестные войны, приготовьтесь, мы начинаем сражение!

Каждый раунд игры Минг Бонг выпивает магическое целительное зелье, которое ему поставляет злая колдунья Сардулья, и восстанавливает свое здоровье.

Затем борцы с монстрами поливают Минг Бонга из антимонстропушкаруса, и это отнимает у него здоровье.
`);

  startRound();

  finishGame();
}

function startRound() {
  let healInput = "";
  let heal = 0;
  let damageInput = "";
  let damage = 0;
  do {
    roundCount += 1;
    alert(`
${roundCount} раунд.

Здоровье монстра: ${health}.`);

    getHeal();

    if (health > 100) {
      winnerAnnounce = `Увы! Вы проиграли! Минг Бонг поработил мир!`;
      break;
    }

    getDamage();

    if (health < 0) {
      winnerAnnounce = `Позравляю, вы выйграли! Монстр повержен! Злая колдунья за решёткой!`;
      break;
    }
  } while (
    confirm(`Здоровье монстра: ${health}.

Продолжить игру?`)
  );
}

function getHeal() {
  healInput = prompt(
    `Злая колдунья Сардулья поит Минг Бонга магическим целительным зельем.

Введите количество очков здоровья, которое получит монстр.`,
    "0"
  );
  heal = checkInput(healInput);
  health += heal;
  healLog.push(heal);
  healthLog.push(health);
}

function getDamage() {
  damageInput = prompt(
    `Храбрые борцы с монстрами поливают Минг Бонга из антимонстропушкаруса.
    
Введите количество урона, нанесенного монстру`,
    "0"
  );
  damage = checkInput(damageInput);
  health -= damage;
  damageLog.push(damage);
  healthLog.push(health);
}

function checkInput(input) {
  const regex = /^\d+$/;
  if (!regex.test(input)) {
    input = prompt("Попробуйте еще раз. Введите целое число", "0");
    checkInput(input);
  }
  return +input;
}

function getResult() {
  alert(`${winnerAnnounce}

Статистика игры:

Количество раундов: ${roundCount}.
Максимальный урон: ${Math.max(...damageLog)}.
Максимальное восстановление здоровья: ${Math.max(...healLog)}.
Минимум здоровья монстра: ${Math.min(...healthLog)}
Максимум здоровья монстра: ${Math.max(...healthLog)}`);
}

function finishGame() {
  getResult();
  alert(`Игра окончена!
  
Если хотите сыграть еще раз, просто обновите страницу!`);
}
