const 정답 = "APPLE";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  //로직들

  //타이머 생성
  const startTimer = () => {
    const start_time = new Date();

    function setTime() {
      const current_time = new Date();
      const past_time = new Date(current_time - start_time);
      const min = past_time.getMinutes().toString().padStart(2, "0");
      const sec = past_time.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#time");
      timeDiv.innerText = `${min}:${sec}`;
    }

    //setInterval의 id가 저장됨, clearInterval로 종료
    timer = setInterval(setTime, 1000);
  };
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:45vw; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };

  const nextLine = () => {
    //줄바꿈
    if (attempts === 6) return gameover();

    attempts++;
    index = 0;
  };

  const gameover = () => {
    //게임종료 : 정답
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };
  const handleBackspace = () => {
    //backspace : 지우기
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index--;
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    //정답확인
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];

      // 정답 여부에 따라 색상 변경
      if (입력한_글자 === 정답_글자) {
        block.style.backgroundColor = "#6AAA64";
        맞은_갯수++;
      } else if (정답.includes(입력한_글자))
        block.style.backgroundColor = "#C9B458";
      else block.style.backgroundColor = "#787C7E";
      block.style.color = "white";
    }

    //정답시 gameover 호출
    if (맞은_갯수 === 5) gameover();

    //오답시 줄바꿈
    nextLine();
  };
  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (keyCode >= 65 && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
