"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Survey.module.css';
import Results from './Results'; // Import the new Results component

const surveyQuestions = [
  {
    type: 'radio',
    questionText: 'How Would You Describe Your Eating Habits?',
    answerOptions: [
      { answerText: 'I eat meat every day' },
      { answerText: "I don't eat meat in my meals" },
      { answerText: 'I eat meat a few times a week' },
    ],
    image: '/assets/images/Survay1.png',
  },
  {
    type: 'radio',
    questionText: 'Do You Recycle Your Waste? (Plastic, metal, glass, paper, and cardboard)',
    answerOptions: [
      { answerText: 'I recycle' },
      { answerText: "I don't recycle" },
    ],
    image: '/assets/images/Survey2.png',
  },
  {
    type: 'number_input',
    questionText: 'What is your average monthly electricity consumption? (EUR)',
    image: '/assets/images/Survey3.png',
    unit: 'Euro'
  },
  {
    type: 'number_input',
    questionText: 'What is your average monthly natural gas consumption? (EUR)',
    image: '/assets/images/Survey4.png',
    unit: 'Euro'
  },
  {
    type: 'number_input',
    questionText: 'What was your total coal consumption last year? (tons)',
    image: '/assets/images/Survey5.png',
    unit: 'Ton'
  },
  {
    type: 'number_input',
    questionText: 'How many times a month do you use delivery services (including apps like Getir, Banabi, etc.)',
    image: '/assets/images/Survey6.png',
    unit: ''
  },
  {
    type: 'number_input',
    questionText: 'How many domestic flights did you take for personal purposes in the past year? (A round trip counts as 2 flights.)',
    image: '/assets/images/Survey7.png',
    unit: ''
  },
  {
    type: 'number_input',
    questionText: 'How many short-haul international flights did you take for personal purposes in the past year? (Within your continent. A round trip counts as 2 flights.)',
    image: '/assets/images/Survey8.png',
    unit: ''
  },
  {
    type: 'radio',
    questionText: 'What is the main mode of transportation you use for personal daily travel?',
    answerOptions: [
        { answerText: "I don't use public transport or private vehicles" },
        { answerText: 'I only use public transport' },
        { answerText: 'I use both public transport and private vehicles/taxis' },
        { answerText: 'I only use private vehicles/taxis' },
    ],
    image: '/assets/images/Survey9.png',
  },
  {
    type: 'radio',
    questionText: 'What type of fuel does your personal vehicle use?',
    answerOptions: [
        { answerText: 'Diesel' },
        { answerText: 'Petrol (Gasoline)' },
        { answerText: 'Hybrid' },
        { answerText: 'Electric' },
    ],
    image: '/assets/images/Survey10.png',
  }
];

const SurveyPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < surveyQuestions.length) {
      setCurrentQuestion(nextQuestion);
    }
  };

  const calculateScore = () => {
    let totalCarbon = 0;

    // 1. Eating Habits
    const meatAnswer = answers[0];
    if (meatAnswer === 'I eat meat every day') totalCarbon += 800;
    if (meatAnswer === 'I eat meat a few times a week') totalCarbon += 400;

    // 2. Recycling
    if (answers[1] === "I don't recycle") totalCarbon += 200;

    // 3. Electricity (EUR to kg CO2)
    totalCarbon += (Number(answers[2]) || 0) * 2.5;

    // 4. Natural Gas (EUR to kg CO2)
    totalCarbon += (Number(answers[3]) || 0) * 2.9;

    // 5. Coal (tons to kg CO2)
    totalCarbon += (Number(answers[4]) || 0) * 2410;

    // 6. Delivery Services
    totalCarbon += (Number(answers[5]) || 0) * 5;

    // 7. Domestic Flights
    totalCarbon += (Number(answers[6]) || 0) * 250;

    // 8. Short-haul International Flights
    totalCarbon += (Number(answers[7]) || 0) * 600;

    // 9. Transportation Mode
    const transportAnswer = answers[8];
    if (transportAnswer === 'I only use public transport') totalCarbon += 500;
    if (transportAnswer === 'I use both public transport and private vehicles/taxis') totalCarbon += 1000;
    if (transportAnswer === 'I only use private vehicles/taxis') totalCarbon += 1500;

    // 10. Fuel Type
    const fuelAnswer = answers[9];
    if (fuelAnswer === 'Diesel') totalCarbon += 2500;
    if (fuelAnswer === 'Petrol (Gasoline)') totalCarbon += 2200;
    if (fuelAnswer === 'Hybrid') totalCarbon += 1200;
    if (fuelAnswer === 'Electric') totalCarbon += 300;

    return totalCarbon;
  };

  const handleFinish = () => {
    const score = calculateScore();
    setFinalScore(score);
    setIsCompleted(true);
  };

  const handleBack = () => {
    const previousQuestion = currentQuestion - 1;
    if (previousQuestion >= 0) {
      setCurrentQuestion(previousQuestion);
    }
  };

  const progress = ((currentQuestion + 1) / 10) * 100; // Total 10 questions

  return (
    <main className={styles.surveyContainer}>
      <div className={styles.surveyCard}>
        {isCompleted ? (
          <Results score={finalScore} />
        ) : (
          <>
            <p className={styles.topBanner}>Our calculations are based on average values in accordance with international standards.</p>
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
            </div>
            <div className={styles.contentWrapper}>
              <div className={styles.questionSection}>
                <div className={styles.questionCount}>
                  <span>{String(currentQuestion + 1).padStart(2, '0')}</span>/10
                </div>
                <div className={styles.questionText}>{surveyQuestions[currentQuestion].questionText}</div>
                <div className={styles.answerSection}>
                  {surveyQuestions[currentQuestion].type === 'radio' && surveyQuestions[currentQuestion].answerOptions?.map((option, index) => (
                    <label key={index} className={styles.radioLabel}>
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        value={option.answerText}
                        checked={answers[currentQuestion] === option.answerText}
                        onChange={() => handleAnswerChange(option.answerText)}
                        className={styles.radioInput}
                      />
                      {option.answerText}
                    </label>
                  ))}
                  {surveyQuestions[currentQuestion].type === 'number_input' && (
                    <div className={styles.numberInputWrapper}>
                      <input
                        type="number"
                        value={answers[currentQuestion] || ''}
                        onChange={(e) => handleAnswerChange(e.target.value)}
                        className={styles.numberInput}
                        placeholder="0"
                      />
                      <span className={styles.unitLabel}>{surveyQuestions[currentQuestion].unit}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.imageSection}>
                <Image
                  src={surveyQuestions[currentQuestion].image}
                  alt="Survey illustration"
                  width={431}
                  height={431}
                  className={styles.surveyImage}
                />
              </div>
            </div>
            <div className={styles.navigationSection}>
                <button onClick={handleBack} disabled={currentQuestion === 0} className={styles.navButton}>
                  ←
                </button>
                {currentQuestion === surveyQuestions.length - 1 ? (
                  <button onClick={handleFinish} className={styles.finishButton}>
                    Finish
                  </button>
                ) : (
                  <button onClick={handleNext} className={styles.navButton}>
                    →
                  </button>
                )}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default SurveyPage;
