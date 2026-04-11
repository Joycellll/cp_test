import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { questions, results } from './data';
import './App.css';

function App() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState({ power: 0, dark: 0, fate: 0 });
  const [finalResult, setFinalResult] = useState(null);
  const resultRef = useRef(null);

  const handleAnswer = (optScore) => {
    const newScore = {
      power: score.power + optScore.power,
      dark: score.dark + optScore.dark,
      fate: score.fate + optScore.fate
    };
    setScore(newScore);

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      const res = results.find(r => r.condition(newScore)) || results[results.length - 1];
      setFinalResult(res);
      setStep(step + 1);
    }
  };

  const handleSaveImage = () => {
    if (resultRef.current) {
      html2canvas(resultRef.current, { scale: 2 }).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'CP临床诊断报告.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <div className="container">
      {step < questions.length ? (
        <div className="clinic-room">
          <h1 className="title">第一附属医院 · CP病理科</h1>
          <div className="progress">精神采样进度：{step + 1} / {questions.length}</div>
          <h2 className="question-text">{questions[step].text}</h2>
          <div className="options-group">
            {questions[step].options.map((opt, idx) => (
              <button key={idx} className="option-btn" onClick={() => handleAnswer(opt.score)}>
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="result-room">
          <div ref={resultRef} className="medical-report">
            <div className="report-header">
              <h1>📋 临床诊断报告单</h1>
              <p>检验科：赛博磕学实验室</p>
            </div>
            <div className="report-body">
              <h2 className="result-name">{finalResult.name}</h2>
              <p className="result-desc">{finalResult.desc}</p>
              <div className="example-box">{finalResult.example}</div>
            </div>
            <div className="report-footer">
              <p>※ 扫码或点击链接，获取你的灵魂切片分析 ※</p>
            </div>
          </div>
          <button className="save-btn" onClick={handleSaveImage}>
            [ 打印并保存病历 (可发朋友圈) ]
          </button>
        </div>
      )}
    </div>
  );
}

export default App;