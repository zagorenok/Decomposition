const IMAGES = [
	'assets/img1.jpg',
	'assets/img2.jpg',
	'assets/img3.jpg',
]

const createTemplatePlayers = (imgs) => {
	return imgs.map(img => {
			return `
						<div class='opponent'>
							<div class="image">
								<img src="${img}">
							</div>
							<span class='counter'>0</span>
						</div>
						`
	}).join('')
}

const handlerAddPointer = (e) => {
	if(e.target.tagName !== 'IMG') return
	const counter = e.target.parentElement.nextElementSibling
	increaseCounter(counter)
}

const increaseCounter = (counter) => {
	if(counter) {
		counter.innerHTML = ++counter.innerHTML
	}
}


function createApp() {

  const container = document.getElementById('opponents')
	container.innerHTML = createTemplatePlayers(IMAGES)

	container.addEventListener('click', handlerAddPointer)

  
	const opponents = container.getElementsByClassName("opponent")

	const actions = document.getElementById("actions")
  const buttons = actions.children

  const finishButton = buttons[0]
  const resetButton = buttons[1]

  resetButton.onclick = function () {
    for (let index = 0; index < opponents.length; index++) {
      const opponent = opponents[index]
      const children = opponent.children

      const counter = children[1]

      counter.innerHTML = 0
    }
  }
  finishButton.onclick = function () {
    const resultModal = document.getElementById("results")

    let maxScore = 0
    let winners = []
    for (let index = 0; index < opponents.length; index++) {
      const opponent = opponents[index]
      const children = opponent.children

      const target = children[0]
      const counter = children[1]

      const score = Number(counter.innerHTML)

      if (score > maxScore) {
        maxScore = score
        winners = [target]
      } else if (score === maxScore) {
        winners.push(target)
      }
    }

    if (winners.length === 1) {

      const winner = winners.shift().cloneNode(true)

      winner.onclick = function () {
        for (let index = 0; index < opponents.length; index++) {
          const opponent = opponents[index]
          const children = opponent.children

          const counter = children[1]

          counter.innerHTML = 0
        }

        resultModal.classList.toggle("show")
        resultModal.innerHTML = ""
      }

      resultModal.append(winner)
    } else {
      resultModal.innerHTML = `
        <p>draw</p>
        <button id="restart-button">Restart</button>
      `

      const restart = document.getElementById("restart-button")

      restart.onclick = function () {
        for (let index = 0; index < opponents.length; index++) {
          const opponent = opponents[index]
          const children = opponent.children

          const counter = children[1]

          counter.innerHTML = 0
        }

        resultModal.classList.toggle("show")
        resultModal.innerHTML = ""
      }
    }

    resultModal.classList.toggle("show")
  }

}

createApp()

