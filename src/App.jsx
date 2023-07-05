import { useEffect, useState } from "react";
import "./style/App.css";
import React, { Component } from 'react'
import { Howl } from "howler"

function App() {
  const [question, setQuestion] = useState(1);

  const [time, setTime] = useState(30);
  const [start, setStart] = useState(false);
  const [result, setResult] = useState(false);
  const moneyData = [
    { id: 1, amount: "$ 100" },
    { id: 2, amount: "$ 200" },
    { id: 3, amount: "$ 300" },
    { id: 4, amount: "$ 500" },
    { id: 5, amount: "$ 1.000" },
    { id: 6, amount: "$ 2.000" },
    { id: 7, amount: "$ 4.000" },
    { id: 8, amount: "$ 8.000" },
    { id: 9, amount: "$ 16.000" },
    { id: 10, amount: "$ 32.000" },
    { id: 11, amount: "$ 64.000" },
    { id: 12, amount: "$ 125.000" },
    { id: 13, amount: "$ 250.000" },
    { id: 14, amount: "$ 500.000" },
    { id: 15, amount: "$ 1.000.000" },
  ].reverse();

  const questionData = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "Phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "Food",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "When did the website `Facebook` launch?",
      answers: [
        {
          text: "2004",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
        {
          text: "2007",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "Johnny Deep",
          correct: false,
        },
        {
          text: "Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Red Cliff",
          correct: true,
        },
      ],
    },

    {
      id: 4,
      question: 'Who composed "Rhapsody in Blue?',
      answers: [
        {
          text: "Irving Berlin",
          correct: false,
        },
        {
          text: "George Gershwin",

          correct: true,
        },
        {
          text: "Aaron Copland",
          correct: false,
        },
        {
          text: "Cole Porter",
          correct: false,
        },
      ],
    },
  ];

  useEffect(() => {

    let timeInterval = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    {
      time <= 0 ? clearInterval(timeInterval) : "";
    }

    {
      start ? "" : clearInterval(timeInterval);
    }

    let outofTime = () => {
      // setResult(true);
      // setStart(false)

      console.log('zaman bitti!')

    }

    {
      time === 0 ? (outofTime()) : "";
    }

    return () => clearInterval(timeInterval);
  });

  // sounds //

  const correctSound = 'src/sounds/src_sounds_correct.mp3'
  const wrongSound = 'src/sounds/src_sounds_wrong.mp3'
  const startSound = 'src/sounds/src_sounds_play.mp3'
  const waitSound = 'src/sounds/src_sounds_wait.mp3'

  const callMySound = (src) => {

    const sound = new Howl({
      src,
      html5: true,
    })

    sound.play();

  }

  useEffect(() => {
    callMySound(startSound)
  }, [question])

  // sounds end //


  const givenAnswer = (answer, val) => {



    let moneyAmount = document.querySelector(
      ".container-progress-list-container-active"
    );

    let earnedMoney = moneyAmount.lastChild.textContent;





    if (answer === true) {
      val.classList.add('container-main-answers-correct')



      setTimeout(() => {

        setQuestion(question + 1)
        setTime(30);
        val.classList.remove('container-main-answers-correct')

      }, 5000)


      setTimeout(() => {
        callMySound(correctSound)
      }, 2500)


    } else {
      console.log(`${earnedMoney} kazandiniz!`);
      setTimeout(() => {
        callMySound(wrongSound)
      }, 2500)
      val.classList.add('container-main-answers-wrong')
    }
  };

  return (
    <div className="container">
      {start ? (
        <div className="container-main">
          <div className="container-main-left">
            <div className="container-main-left-time">
              <p>{time}</p>
            </div>
            <div className="container-main-question">
              <p>{questionData[question - 1].question}</p>
              <br />
              <br />
            </div>

            {/* benim isim burada */}

            <div className="container-main-answers">
              {questionData[question - 1].answers.map((answer) => {
                return (
                  <div onClick={(e) => {
                    e.target.classList.add('selected')

                  }}>
                    <p

                      className="container-main-answers-div"
                      onClick={(e) => {
                        let selectedOption = e.target;
                        let playerAnswer = answer.correct;
                        givenAnswer(playerAnswer, selectedOption);
                      }}
                    >

                      {answer.text}

                    </p>
                  </div>
                );
              })}
            </div>

            {/* benim isim burada */}
          </div>

          <div className="container-progress">
            <ul className="container-progress-list">

              {moneyData.map((money) => {
                return (
                  <div
                    className={
                      question == money.id
                        ? "container-progress-list-container-active"
                        : "container-progress-list-container"
                    }
                  >
                    <li className="container-progress-list-item-id">
                      {money.id}
                    </li>
                    <li className="container-progress-list-item-amount">
                      {money.amount}
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div className="container-start">
          <h2 className="container-start-title">
            Hello! Who Wants to Be a Millionaire?
          </h2>
          <button
            onClick={() => setStart(true)}
            className="container-start-button"
          >
            Start the game!
          </button>
        </div>
      )}

    </div>
  );
}

export default App;
