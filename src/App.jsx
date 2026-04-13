import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { questions, results } from './data';
import './App.css';

function App() {
  const [step, setStep] = useState(0);
  // --- 维度修复：初始化 I, P, O, N 四轴 ---
  const [scores, setScores] = useState({ I: 0, P: 0, O: 0, N: 0 });
  const [finalResult, setFinalResult] = useState(null);
  const resultRef = useRef(null);

  const handleAnswer = (vector) => {
    // 1. 鲁棒累加逻辑：确保每个维度都能正确相加
    const newScores = {
      I: scores.I + (vector.I || 0),
      P: scores.P + (vector.P || 0),
      O: scores.O + (vector.O || 0),
      N: scores.N + (vector.N || 0)
    };
    setScores(newScores);

    // 2. 跳转逻辑
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      // 3. 结果判定逻辑：根据正负值生成 ID (如 HESG)
      const intensity = newScores.I >= 0 ? 'H' : 'L';
      const power = newScores.P >= 0 ? 'E' : 'A';
      const outcome = newScores.O >= 0 ? 'S' : 'V';
      const narrative = newScores.N >= 0 ? 'G' : 'D';
      const resultCode = `${intensity}${power}${outcome}${narrative}`;
      
      const res = results.find(r => r.id === resultCode) || results[results.length - 1];
      setFinalResult(res);
      setStep(step + 1); // 此时 step 达到 questions.length，切换到结果页
    }
  };

  const handleSaveImage = () => {
    if (resultRef.current) {
      html2canvas(resultRef.current, { 
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff' 
      }).then((canvas) => {
        const link = document.createElement('a');
        link.download = `CP临床诊断报告-${finalResult?.name}.png`;
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
          <div className="progress">采样进度：{step + 1} / {questions.length}</div>
          <h2 className="question-text">{questions[step].text}</h2>
          <div className="options-group">
            {/* --- 注意这里传入的是 opt.vector --- */}
            {questions[step].options.map((opt, idx) => (
              <button key={idx} className="option-btn" onClick={() => handleAnswer(opt.vector)}>
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="result-room">
          {finalResult && (
            <div ref={resultRef} className="medical-report">
              <div className="report-header">
                <h1>📋 临床诊断报告单</h1>
                <p>检验科：赛博磕学实验室</p>
                
              </div>
              <div className="report-body">
                <h2 className="result-name">{finalResult.name}</h2>
                <div className="example-box">
                  <strong>典型病例：</strong>{finalResult.example}
                </div>
                <div className="analysis-box">
                  <strong>病理分析：</strong>
                  <p className="result-desc">{finalResult.desc}</p>
                </div>
              
              </div>
              <div className="report-footer">
                <p>※ 赛博病理科监制 ※</p>
              </div>
            </div>
          )}
          <div className="action-bar">
            <button className="save-btn" onClick={handleSaveImage}>
              [ 打印并保存病历单 ]
            </button>
            <button className="retry-btn" onClick={() => window.location.reload()}>
              [ 重新挂号 ]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;