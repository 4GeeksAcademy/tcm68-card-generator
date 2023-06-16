import "./style.css";
window.onload = function() {
  const suits = ["♠", "♣", "♥", "♦"];
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ];

  const cardContainer = document.getElementById("cardContainer");
  const topLeft = document.querySelector(".topLeft");
  const value = document.querySelector(".value");
  const bottomRight = document.querySelector(".bottomRight");
  const generateButton = document.getElementById("generateButton");
  const cardStyleSelect = document.getElementById("cardStyle");
  const autoGenerateButton = document.getElementById("autoGenerateButton");
  const imageContainer = document.getElementById("imageContainer");
  const assetImage = document.getElementById("assetImage");
  const cardWidthInput = document.getElementById("cardWidth");
  const cardHeightInput = document.getElementById("cardHeight");
  const applySizeButton = document.getElementById("applySizeButton");

  let intervalId;

  generateButton.addEventListener("click", generateCard);
  cardStyleSelect.addEventListener("change", updateCardStyle);
  autoGenerateButton.addEventListener("click", toggleAutoGenerate);

  generateCard();

  function generateCard() {
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];

    topLeft.textContent = randomSuit;
    value.textContent = randomValue;
    bottomRight.textContent = randomSuit;

    cardContainer.style.backgroundImage = "";

    const selectedStyle = cardStyleSelect.value;

    if (selectedStyle === "radial") {
      cardContainer.classList.add("radial");
      cardContainer.classList.remove("default");
      imageContainer.style.display = "block";
      assetImage.src = `src/assets/img/${randomValue}${randomSuit}.png`;
      topLeft.style.display = "none";
      value.style.display = "none";
      bottomRight.style.display = "none";
    } else {
      cardContainer.classList.remove("radial");
      cardContainer.classList.add("default");
      imageContainer.style.display = "none";
      assetImage.src = "";
      topLeft.style.display = "block";
      value.style.display = "block";
      bottomRight.style.display = "block";
    }

    if (randomSuit === "♥" || randomSuit === "♦") {
      topLeft.classList.add("red");
      bottomRight.classList.add("red");
      value.classList.add("red");
    } else {
      topLeft.classList.remove("red");
      bottomRight.classList.remove("red");
      value.classList.remove("red");
    }
  }

  function updateCardStyle() {
    generateCard();
  }

  function toggleAutoGenerate() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = undefined;
      autoGenerateButton.textContent = "Auto Generate";
    } else {
      intervalId = setInterval(generateCard, 2000);
      autoGenerateButton.textContent = "Stop Auto Generate";
    }
  }

  applySizeButton.addEventListener("click", applyCardSize);

  function applyCardSize() {
    const width = cardWidthInput.value;
    const height = cardHeightInput.value;

    cardContainer.style.width = `${width}px`;
    cardContainer.style.height = `${height}px`;
  }
};
