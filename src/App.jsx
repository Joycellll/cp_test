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

  // ... 前面的逻辑保持不变 ...

  return (
    <div className="container">
      {step < questions.length ? (
        <div className="clinic-room">
          <h1 className="title">第一附属医院 · CP病理科</h1>
          <div className="progress">采样进度：{step + 1} / {questions.length}</div>
          <h2 className="question-text">{questions[step].text}</h2>
          <div className="options-group">
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
              {/* 报告页眉 */}
              <div className="report-header">
                <h1>临床诊断报告单 (Cyber-Pathology)</h1>
                <div className="header-meta">
                  <span>检验科：赛博磕学实验室</span>
                  <span>标本类型：灵魂切片</span>
                </div>
              </div>
              
              <div className="report-divider"></div>

              {/* 诊断结论 - 核心重点 */}
              <div className="report-section">
                <div className="section-label">【诊断结论】</div>
                <div className="result-name-large">{finalResult.name}</div>
              </div>

              {/* 典型病例 - 引用块样式 */}
              <div className="report-section">
                <div className="section-label">【典型病例分析】</div>
                <div className="example-content">
                  {finalResult.example}
                </div>
              </div>

              {/* 病理描述 - 详细分析 */}
              <div className="report-section">
                <div className="section-label">【详细病理分析报告】</div>
                <div className="analysis-content">
                  {finalResult.desc}
                </div>
              </div>

              {/* 医嘱 - 增加灵魂 */}
              <div className="report-section">
                <div className="section-label">【主治医师医嘱】</div>
                <div className="prognosis-content">
                  {finalResult.prognosis || "建议保持适度吐槽，预防多巴胺过载。"}
                </div>
              </div>

              <div className="report-divider-dashed"></div>

              <div className="report-footer">
                <p>※ 赛博病理科监制 ※</p>
                <p className="stamp">已审核 / 电子签名生效</p>
              </div>
            </div>
          )}
          
          <div className="action-bar">
            <button className="save-btn" onClick={handleSaveImage}>
              [ 打印并保存这份病历单 ]
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