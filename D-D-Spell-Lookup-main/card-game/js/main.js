//Example fetch using pokemonapi.co (https://www.deckofcardsapi.com/)
// Deck ID: "uf6xu4dzn3ql"
let deckId = ""
//Initial fetch to pull the deck ID
fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      deckId = data.deck_id

    })
  .catch(err => {
    console.log(`error ${err}`)
  });
  // Setting initial player scores to 0
  if (!localStorage.getItem('player1Score')){
    localStorage.setItem('player1Score',0)
  }
  
  if (!localStorage.getItem('player2Score')){
    localStorage.setItem('player2Score',0)
  }


document.querySelector('.button').addEventListener('click', drawTwo)
document.querySelector('.button2').addEventListener('click', newDeckScore)

function drawTwo(){
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector("#player1").src =data.cards[0].image
        document.querySelector("#player2").src =data.cards[1].image
        let player1Value = convertToNum(data.cards[0].value)
        let player2Value = convertToNum(data.cards[1].value)
       //Comparing if Player 1 or Player 2 Won
        if (player1Value > player2Value){
          document.querySelector('h3').innerText='Player 1 Wins'
          let cardScoreVal = Number(localStorage.getItem('player1Score'))
          cardScoreVal += 1
          localStorage.setItem('player1Score',cardScoreVal)
          document.querySelector('#player1Score').innerText = cardScoreVal
        } else if (player1Value < player2Value){
          document.querySelector('h3').innerText='Player 2 Wins'
          let cardScoreVal = Number(localStorage.getItem('player2Score'))
          cardScoreVal += 1
          localStorage.setItem('player2Score',cardScoreVal)
          document.querySelector('#player2Score').innerText = cardScoreVal
        } else{
          document.querySelector('h3').innerText='Draw - Play Again!'
        }


      })
      .catch(err => {
          console.log(`error ${err}`)
      });
    }
//Helper function to convert face cards to numbers.
function convertToNum(val){
  if(val === "ACE"){
    return 14
  }else if (val === "KING"){
    return 13
  }else if (val === "QUEEN"){
    return 12
  }else if (val === "JACK"){
    return 11
  }else{
    return Number(val)
  }
}

function newDeckScore(){
  localStorage.setItem('player1Score',0)
  let player1ScoreVal = Number(localStorage.getItem('player1Score'))
  document.querySelector('#player1Score').innerText = player1ScoreVal
  document.querySelector("#player1").src = ""
  

  localStorage.setItem('player2Score',0)
  let player2ScoreVal = Number(localStorage.getItem('player2Score'))
  document.querySelector('#player2Score').innerText = player2ScoreVal
  document.querySelector("#player2").src =""

  document.querySelector('h3').innerText='Draw Result'
  
  fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      deckId = data.deck_id

    })
  .catch(err => {
    console.log(`error ${err}`)
  });
 

}
