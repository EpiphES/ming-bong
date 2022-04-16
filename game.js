const intro = `Мини-игра ***Минг Бонг***.
 
Восстал монстр Минг Бонг! Храбрые борцы c монстрами спешат на помощь! Самое время втупить в бой. 

Ну что, погнали?`;

let roundCount = 0;
let health = 50;
const log = [];

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
  let remedyInput = "";
  let remedy = 0;
  let damageInput = "";
  let damage = 0;
  let consent = true;
  while (consent) {
    roundCount += 1;
    alert(`
${roundCount} раунд.

Здоровье монстра: ${health}.`);
    log.push(new Object());
    const logIndex = roundCount - 1;
    log[logIndex].startHealth = health;

    remedyInput = prompt(
      `Злая колдунья Сардулья поит Минг Бонга магическим целительным зельем.

Введите количество очков здоровья, которое получит монстр.`,
      "0"
    );
    remedy = checkInput(remedyInput);
    health += remedy;
    log[logIndex].remedy = remedy;
    log[logIndex].totalHealth = health;
    log[logIndex].damage = 0;

    if (!checkHealth(health)) break;

    damageInput = prompt(
      `Храбрые борцы с монстрами поливают Минг Бонга из антимонстропушкаруса.
    
Введите количество урона, нанесенного монстру`,
      "0"
    );
    damage = checkInput(damageInput);
    health -= damage;
    log[logIndex].totalHealth = health;
    log[logIndex].damage = damage;

    if (!checkHealth(health)) break;

    consent = confirm(`Здоровье монстра: ${health}.

Продолжить игру?`);
    if (!consent) exitGame();
  }
}

function checkHealth(value) {
  if (value > 100) {
    loseGame();
    return false;
  }
  if (value < 0) {
    winGame();
    return false;
  }
  return true;
}

function checkInput(input) {
  const regex = /^\d+$/;
  if (!regex.test(input)) {
    input = prompt("Попробуйте еще раз. Введите целое число", "0");
    checkInput(input);
  }
  return +input;
}

function exitGame() {
  alert(`Монстр не побеждён, но ему так и не удалось захватить мир.

${makeLog(log)}`);
}

function loseGame() {
  alert(`Увы! Вы проиграли! Минг Бонг поработил мир!
  
${makeLog(log)}`);
}

function winGame() {
  alert(`Позравляю, вы выйграли! Монстр повержен! Злая колдунья за решёткой!

${makeLog(log)}`);
}

function makeLog(arr) {
  return arr.reduce(
    (text, item, index) => {
      return (
        text +
        `Раунд ${index + 1}.
Зелье: ${item.remedy}.
Урон: ${item.damage}.
Здоровье монстра в конце раунда: ${item.totalHealth}.

`
      );
    },
    `Ваша статистика:

Здоровье монстра в начале игры: 50;

`
  );
}

function finishGame() {
  alert(`Игра окончена!
  
Если хотите сыграть еще раз, просто обновите страницу!`);
}
