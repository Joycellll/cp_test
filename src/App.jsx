import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { questions, results } from './data';
import './App.css';

function App() {
  // 从 -1 开始，-1 代表“挂号须知”页面
  const [step, setStep] = useState(-1); 
  const [scores, setScores] = useState({ I: 0, P: 0, O: 0, N: 0 });
  // 新增：用于记录每一步选择的向量，实现“悔棋”功能
  const [history, setHistory] = useState([]); 
  const [finalResult, setFinalResult] = useState(null);
  const resultRef = useRef(null);

  const handleAnswer = (vector) => {
    // 1. 记录历史，方便返回上一题
    setHistory([...history, vector]);

    // 2. 鲁棒累加逻辑
    const newScores = {
      I: scores.I + (vector.I || 0),
      P: scores.P + (vector.P || 0),
      O: scores.O + (vector.O || 0),
      N: scores.N + (vector.N || 0)
    };
    setScores(newScores);

    // 3. 跳转或结算逻辑
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      // --- v3.0 全新判定逻辑 ---
      let res;
      // 计算总偏差值，判断是否全为 0
      const totalDeviation = Math.abs(newScores.I) + Math.abs(newScores.P) + Math.abs(newScores.O) + Math.abs(newScores.N);
      
      if (totalDeviation === 0) {
        // 触发全 0 彩蛋结局
        res = results.find(r => r.id === "BLANK");
      } else {
        // 动态遍历所有结果，运行它们的 condition 函数进行匹配（完美支持 HESG-1 等细分亚型）
        res = results.find(r => r.condition && r.condition(newScores));
      }

      // 如果因为某种原因没匹配上，使用数组最后一个结果兜底
      if (!res) {
        res = results[results.length - 1];
      }

      setFinalResult(res);
      setStep(step + 1);
    }
  };

  // 新增：返回上一题逻辑
  const handleBack = () => {
    if (step <= 0) return; // 第1题无法返回

    // 提取上一步的向量并从历史记录中移除
    const lastVector = history[history.length - 1];
    const newHistory = history.slice(0, -1);
    
    // 减去上一步的分数
    setScores({
      I: scores.I - (lastVector.I || 0),
      P: scores.P - (lastVector.P || 0),
      O: scores.O - (lastVector.O || 0),
      N: scores.N - (lastVector.N || 0)
    });

    setHistory(newHistory);
    setStep(step - 1);
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
      {step === -1 ? (
        /* --- 新增：第 0 步 挂号须知 (认知矫正) --- */
        <div className="clinic-room registration-notice">
          <h1 className="title">第一附属医院 · 挂号须知</h1>
          <div className="notice-body" style={{ textAlign: 'left', lineHeight: '1.8', margin: '20px 0', fontSize: '15px' }}>
            <p>欢迎来到赛博病理科。在进行灵魂切片采样前，请仔细阅读以下医嘱：</p>
            <p>1. 本量表测定的是您的<b>“审美偏好与XP”</b>，而非原著角色的客观剧情走向。</p>
            <p>2. 在面对极端选项时，请抛弃逻辑，完全遵从您的<b>第一审美本能</b>。</p>
            <p>3. 诊断结果仅供同担学术交流，不构成对任何纸片人的最终解释权。</p>
          </div>
          <button className="option-btn" style={{ background: '#1a1a1a', color: '#fff', fontWeight: 'bold' }} onClick={() => setStep(0)}>
            [ 确认并签字，进入诊室 ]
          </button>
        </div>
      ) : step < questions.length ? (
        /* --- 答题区 --- */
        <div className="clinic-room">
          <h1 className="title">第一附属医院 · CP病理科</h1>
          
          <div className="progress-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            {step > 0 ? (
              <button onClick={handleBack} style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer', fontWeight: 'bold' }}>
                ← 返回上一题
              </button>
            ) : (
              <span style={{ width: '80px' }}></span> /* 占位，保持排版居中 */
            )}
            <div className="progress" style={{ margin: 0 }}>采样进度：{step + 1} / {questions.length}</div>
          </div>

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
        /* --- 结果报告区 --- */
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

              {/* 诊断结论 */}
              <div className="report-section">
                <div className="section-label">【诊断结论】</div>
                <div className="result-name-large">{finalResult.name}</div>
              </div>

              {/* 典型病例 */}
              <div className="report-section">
                <div className="section-label">【典型病例分析】</div>
                <div className="example-content">
                  {finalResult.example}
                </div>
              </div>

              {/* 病理描述 */}
              <div className="report-section">
                <div className="section-label">【详细病理分析报告】</div>
                <div className="analysis-content">
                  {finalResult.desc}
                </div>
              </div>

              {/* 医嘱 */}
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
            <button className="retry-btn" onClick={() => { setScores({I:0, P:0, O:0, N:0}); setHistory([]); setStep(-1); }}>
              [ 重新挂号 ]
            </button>
          </div>
          
          {/* 收集病例的众筹入口 */}
          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px' }}>
            <a href="这里可以替换成你的腾讯问卷链接" target="_blank" rel="noreferrer" style={{ color: '#666', textDecoration: 'underline' }}>
              没有你的圈子？点击提交 CP 病历供赛博病理科研究
            </a>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;