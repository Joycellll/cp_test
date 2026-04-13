import React, { useState } from 'react';

// ================= Part 1: 原始文本数据 (严禁修改) =================

export const questions = [
  {
    id: 1,
    text: "当一场足以摧毁他们职业生涯的危机降临，你最期待看到的“应激反应”是？",
    options: [
      { text: "背靠背杀出重围，用绝对的实力和鲜血为彼此开路", vector: { I: 2, P: 2, N: 1 } },
      { text: "一方揽下所有罪责，将另一方推向清白但孤独的彼岸", vector: { I: 2, P: -2, O: 2 } },
      { text: "在废墟中相视一笑，从此隐姓埋名去没人认识的街角开个小店", vector: { I: -2, O: 2, N: -2 } },
      { text: "这危机本就是其中一方为了彻底“收纳”另一方亲手布下的局", vector: { I: 1, P: -2, dark: 2 } }
    ]
  },
  {
    id: 2,
    text: "在展现“脆弱”这件事上，你认为最迷人的“临床表现”是？",
    options: [
      { text: "即使剩半条命，在对方面前也要维持那份高傲且危险的自尊", vector: { I: 2, P: 2 } },
      { text: "把示弱当成一种顶级猎手的诱饵，享受对方瞬间的疯狂或怜悯", vector: { I: 1, P: 2, O: -1 } },
      { text: "对方是这世界上唯一一个可以让自己卸下所有伪装的生理性避风港", vector: { I: -2, P: -2, light: 2 } },
      { text: "习惯性地在暗处独自舔舐伤口，拒绝任何形式的介入与怜悯", vector: { I: 1, O: 2, P: -1 } }
    ]
  },
  {
    id: 3,
    text: "如果要用一种生物学现象来形容他们的关系，你觉得是？",
    options: [
      { text: "DNA双螺旋：平行却死死咬合，共同承载宿命与进化", vector: { P: 2, O: 2, N: 1 } },
      { text: "异体器官移植：你是我的血肉，也是我身体里永远的排异反应", vector: { I: 2, P: -1, O: -2 } },
      { text: "吞噬细胞与病原体：充满侵略性，接近就是为了同化与占有", vector: { I: 1, P: -2, dark: 2 } },
      { text: "神经递质与专属受体：在亿万细胞中只为嵌入对方唯一的缺口", vector: { I: -2, P: -2, N: -1 } }
    ]
  },
  {
    id: 4,
    text: "两人的“契约感”或者说“羁绊证明”，最可能承载在什么物件上？",
    options: [
      { text: "一份能证明对方无罪的绝密档案，或者两人共同缔造的勋章", vector: { P: 2, N: 2, O: 2 } },
      { text: "一道为了救对方而留下的、经年累月无法抹去的陈年伤疤", vector: { I: 2, P: -1, O: 2 } },
      { text: "一张泛黄的、拍得并不完美的合影，藏在随身的皮夹里", vector: { I: -1, N: -2, O: 2 } },
      { text: "带有追踪器或某种隐秘控制手段的、昂贵且冰冷的礼物", vector: { I: 1, P: -2, O: -2 } }
    ]
  },
  {
    id: 5,
    text: "当“世界大义”与“私人情感”发生不可调和的撕裂时，他们会？",
    options: [
      { text: "私情高于一切，哪怕与全世界为敌也在所不惜", vector: { I: 2, N: -1, P: -1 } },
      { text: "痛苦地献祭私情，余生都在对方未竟的理想里扮演影子", vector: { I: 2, N: 2, O: 2 } },
      { text: "试图重塑规则，让这个世界变得能够容纳两个人的存在", vector: { P: 2, N: 2, O: 1 } },
      { text: "关掉新闻播报，只在乎明天早餐的吐司是否烤得焦脆", vector: { I: -2, N: -2, O: 2 } }
    ]
  },
  {
    id: 6,
    text: "如果其中一人离世，另一人余生的“预后”画面最可能是？",
    options: [
      { text: "幻肢痛：带着对方的遗愿，在极度的克制中孤独终老", vector: { I: 2, O: 2, N: 1 } },
      { text: "毁灭：让整个世界为之陪葬，或者在毁灭性的思念中彻底崩坏", vector: { I: 2, O: -2, N: 1 } },
      { text: "生还：带着温柔的旧伤疤，像正常人一样努力且平淡地活下去", vector: { I: -2, O: 2, N: -1 } },
      { text: "追随：无法忍受失去锚点的荒原，在那之后不久便殉情而去", vector: { I: 2, O: 2, fate: 2 } }
    ]
  },
  {
    id: 7,
    text: "日常独处时，他们之间空气的“浓度”主要源于？",
    options: [
      { text: "每一句废话都在互相试探底线，针锋相对的博弈感", vector: { P: 2, I: 2 } },
      { text: "充满专业名词的探讨，外人根本无法插足的真空结界感", vector: { P: 2, N: 2, light: 1 } },
      { text: "极其松弛的炭火气，为了晚饭咸淡这种琐事争执半天", vector: { P: -1, I: -2, N: -2 } },
      { text: "沉默中的压抑与依附，对方的存在本身就是一种无形的指令", vector: { P: -2, I: 2, O: 2 } }
    ]
  },
  {
    id: 8,
    text: "如果有“第三者”试图介入这段关系，通常会演变成？",
    options: [
      { text: "毫无波澜：他们之间的排他性自成闭环，第三者如入真空", vector: { P: 2, O: 2 } },
      { text: "血腥清洗：这种冒犯会触碰其中一方那危险且绝对的占有欲", vector: { I: 2, P: -2, O: -1 } },
      { text: "自虐式放手：为了让对方获得“正常的幸福”而主动选择退出", vector: { I: 1, O: 2, P: -2 } },
      { text: "尴尬的试探：在日常的琐碎里引发一场不痛不痒的飞醋", vector: { I: -2, N: -2, O: -1 } }
    ]
  },
  {
    id: 9,
    text: "两人的“权力天平”在你看来应该处于什么状态？",
    options: [
      { text: "绝对平衡，像两颗恒星在真空里互相绕行", vector: { P: 2, O: 2 } },
      { text: "一人主导，另一人甘愿被驯化或成为其延伸的肢体", vector: { P: -2, I: 1 } },
      { text: "随季节动态变化，随时准备反杀或臣服的危险游戏", vector: { P: 1, O: -2 } },
      { text: "互相照顾的邻里感，谁强一点谁就多拎个包", vector: { P: -1, I: -2 } }
    ]
  },
  {
    id: 10,
    text: "关于“背叛”，最让你觉得带感的设定是？",
    options: [
      { text: "立场转换：亲手行刑，以此作为我最后的爱意告白", vector: { I: 2, P: 2, O: 2 } },
      { text: "理想背弃：你居然放弃了我们共同坚守的那座孤岛", vector: { I: 1, N: 2, O: -2 } },
      { text: "情感溢出：哪怕你利用我殆尽，我也愿意做你的踏脚石", vector: { I: 2, P: -2, O: 2 } },
      { text: "平庸的离开：因为受不了生活的琐碎而选择了消失", vector: { I: -2, N: -2, O: -2 } }
    ]
  },
  {
    id: 11,
    text: "假如命运给他们一天的“完全假期”，你会把镜头对准哪？",
    options: [
      { text: "在宏大蓝图前夜，进行一次关于生死与理想的博弈", vector: { N: 2, P: 2 } },
      { text: "在沉迷中互相透支，仿佛这是世界末日前最后的狂欢", vector: { I: 2, O: -2 } },
      { text: "在无人的海边虚度光阴，甚至不怎么说话，只是存在着", vector: { I: -2, N: -1, O: 2 } },
      { text: "在拥挤的超市里挑选打折商品，为了省几块钱而碎碎念", vector: { I: -2, N: -2, P: -1 } }
    ]
  },
  {
    id: 12,
    text: "面对“对方变质/堕落”，另一方的第一反应通常是？",
    options: [
      { text: "既然拉不回来，那我就陪你一起烂在泥潭里", vector: { I: 2, P: -2, O: 2 } },
      { text: "想尽办法把你拽回阳光下，哪怕互相伤害到体无完肤", vector: { I: 1, P: 2, O: -2 } },
      { text: "冷静地完成切割，从此相忘于江湖或成为死敌", vector: { I: 2, P: 2, O: 2 } },
      { text: "无所谓，无论你变成什么鬼样子，晚饭照旧准备你的份", vector: { I: -2, N: -2, O: 2 } }
    ]
  },
  {
    id: 13,
    text: "在你的审美里，最完美的“HE”结局应该是什么样？",
    options: [
      { text: "站在各自领域的顶端，隔空举杯，势均力敌地活着", vector: { P: 2, N: 2, O: 2 } },
      { text: "抛弃旧身份，隐姓埋名消失在平淡的市井烟火里", vector: { I: -2, N: -2, O: 2 } },
      { text: "只要灵魂从未分开，哪怕肉体已经永远对立或消亡", vector: { I: 2, O: 2, fate: 2 } },
      { text: "永远纠缠不休，哪怕遍体鳞伤也要死在同一个坑里", vector: { I: 2, O: -2, dark: 2 } }
    ]
  },
  {
    id: 14,
    text: "你对“老夫老妻感”的容忍度通常是？",
    options: [
      { text: "它是爱情平庸化的坟墓，我宁愿看他们在最高处坠落", vector: { N: 2, I: 2, O: -1 } },
      { text: "它是关系最迷人的终点，是穿过风雨后的生理性平复", vector: { N: -2, I: -2, O: 2 } },
      { text: "它是一种温和的博弈，每一天都在重新发现对方", vector: { P: 2, O: 2, light: 1 } },
      { text: "它是无法挣脱的责任，带有某种名为“习惯”的窒息感", vector: { I: 1, O: 2, P: -2 } }
    ]
  },
  {
    id: 15,
    text: "这段关系的终极美学感悟，你更倾向于？",
    options: [
      { text: "毁灭与牺牲的壮丽，像一场盛大的灰烬告白", vector: { I: 2, N: 2, O: 2 } },
      { text: "生存与陪伴的韧性，像两棵在悬崖边合抱的树", vector: { I: -2, N: -1, O: 2 } },
      { text: "操控与博弈的快感，像一场永不谢幕的心理战", vector: { P: 2, I: 1, O: -2 } },
      { text: "命中注定的量子纠缠，没有任何逻辑可以解释", vector: { I: 2, O: 2, P: -1 } }
    ]
  },
  {
    id: 16,
    text: "最后，你希望这份“诊断报告”给你的 CP 留下什么医嘱？",
    options: [
      { text: "“预后极差，建议患者多吃糖分以维持生命体征。”", vector: { I: 2, O: -1 } },
      { text: "“心态平稳，生活满意度较高，建议保持适度吐槽。”", vector: { I: -2, O: 2 } },
      { text: "“具有高度成瘾性，建议不要试图剥离这种关系。”", vector: { I: 1, dark: 2 } },
      { text: "“智力共振良好，建议进行更深层次的精神交流。”", vector: { P: 2, light: 2 } }
    ]
  }
];

export const results = [
  { id: "HESG", name: "【殉道者的无声墓志铭】", example: "ggad、五夏、团兵", desc: "你是极致悲剧美学的追随者。你爱的不是简单的儿女情长，而是两个纯粹的灵魂在理想与立场的撕裂下的终极遗憾。死别亦是永恒的告白。", prognosis: "预后极差，建议患者多吃糖分以维持生命体征。" },
  { id: "HEVG", name: "【莫比乌斯环的终极对峙】", example: "SC (萨菲罗斯×克劳德)、鸣佐", desc: "爱是调情，也是谋杀。你沉迷于两颗高傲头颅在深渊边缘的博弈，每一次互动都游走在理智与疯狂的边缘，纠缠至死。", prognosis: "精神高度亢奋，伴随持续性心律不齐。" },
  { id: "HAVG", name: "【深渊里的灵魂共生受体】", example: "团孟、军烨", desc: "你偏爱那种带有血腥味和破碎感的依附。在泥泞中互相拖拽、互为药石。这是一种非对称的、生理性的依赖，扒开伤口血肉模糊，却是活下去的唯一理由。", prognosis: "重度成瘾性，建议不要试图剥离这种关系。" },
  { id: "HASG", name: "【碎玻璃里的蜜糖锚点】", example: "瓶邪、盾冬、地久汪史", desc: "跨越时间的守望。你是你，而他是你的理智、你的骨骼、你在这荒诞人间唯一的归航信号。虽位势不对等，但稳如磐石，坚不可摧。", prognosis: "慢性阵痛，但拥有极强的生存意志。" },
  { id: "LESG", name: "【成年人的高阶底牌博弈】", example: "黑花、aeon", desc: "极致清醒与体面。表面上明码标价地算计，但底牌永远只留给对方。这是一种建立在智力对等基础上的浪漫：我们可以不谈爱，但命可以给你。", prognosis: "生理机能正常，心智极其坚定。" },
  { id: "LEVG", name: "【光影双生的莫比乌斯环】", example: "佐鸣、锤基", desc: "镜像的两面，即便打断彼此的手臂也要斩断羁绊，却发现灵魂早已死死咬合。这种关系在博弈中不断波动，在推开与拉近中反复横跳。", prognosis: "生命力顽强，成长空间巨大。" },
  { id: "LESD", name: "【象牙塔内的错频共振】", example: "知妙、时光×俞亮", desc: "智力上的严丝合缝，生活里的鸡飞狗跳。你追求的是灵魂的高度契合，比起肉体接触，你更爱看他们在专业领域互不相让，充满了知性美。", prognosis: "建议保持适度吐槽，预防多巴胺过载。" },
  { id: "LEVD", name: "【夏日午后的苏打水气泡】", example: "校园小甜饼、初恋向", desc: "轻盈、酸甜，且充满了未知。你爱的是那种初见时的悸动与相处中的不确定感。哪怕最后由于现实而分开，此刻的火花也足够灿烂。", prognosis: "短期情绪波动，长期回忆温暖。" },
  { id: "HASD", name: "【无声的观察者与囚徒】", example: "带有禁锢色彩的宿命日常", desc: "在狭窄的空间里，形成了一种极其稳固却又沉重的依附。空气中弥漫着一种名为‘习惯’的窒息感，它是温柔的诅咒，也是无法挣脱的责任。", prognosis: "稳定性极高，但需注意室内通风。" },
  { id: "HAVD", name: "【冰冷手术台上的情感重塑】", example: "带有精神压迫感现实题材", desc: "带有某种改造或重塑性质的病态依附。在琐碎的日常里，一方不断地修剪另一方的灵魂。这种重压下的波动带有一种残缺的美感。", prognosis: "建议介入临床心理干预。" },
  { id: "HESD", name: "【柴米油盐里的精神互剖】", example: "弗吉尼亚·伍尔夫 × 伦纳德", desc: "在极其平凡的日常里，进行着极其深刻的精神解剖。看透了对方最自私的一面，却依然选择在平淡中互相磨损。这是一种冷静的残忍。", prognosis: "警惕抑郁倾向，建议增加户外活动。" },
  { id: "HEVD", name: "【毁灭前夜的享乐主义】", example: "极具张力的都市现实向CP", desc: "为了此刻的火花，不惜点燃整个明天。关系极其不稳定，充满了爆发性的争吵与激情的复合。你们是彼此的兴奋剂，透支生命换取爱意。", prognosis: "备好急救药物，预防精神衰竭。" },
  { id: "LASD", name: "【互补型的精神避风港】", example: "陆花、福华", desc: "你是重症科里的‘轻症奇迹’。一个是天才/疯子，另一个是他的理智与土壤。不需要宏大叙事，长久稳定的陪伴就是最好的生理救赎。", prognosis: "心态平稳，生活满意度较高。" },
  { id: "LAVD", name: "【市井烟火里的长久拉扯】", example: "生活流、市井向HE", desc: "最接地气的CP。充满了琐碎的争吵、误会与和好。这种关系没有英雄主义，只有两个普通人在平淡岁月里最真实的相互磨合。", prognosis: "生活气息浓厚，极具烟火气。" },
  { id: "LASG", name: "【战火余温里的沉默契约】", example: "卫聂、某些主从向CP", desc: "在宏大背景下的一份坚韧契约。位势也许不对等，但那种基于生存本能的依赖在时代的背景板前显得格外动人。这是一种温和的忠诚。", prognosis: "适应性强，能在恶劣环境下生存。" },
  { id: "LAVG", name: "【镜像双生的剥离与重组】", example: "许三多×成才", desc: "看着两棵树的生长。你们走上截然不同的道路，看透了对方的怯懦，却最终在终点处殊途同归。这是一种极具生命力的共同进化。", prognosis: "生命力顽强，成长空间巨大。" }
];

// ================= Part 2: 驱动引擎 (计算逻辑) =================

export default function CPDiagnosticApp() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ I: 0, P: 0, O: 0, N: 0 });
  const [finished, setFinished] = useState(false);

  const handleSelect = (vector) => {
    const newScores = { ...scores };
    // 关键修正：确保只累加定义好的四个维度，忽略文本中可能存在的其他标签
    Object.keys(vector).forEach(key => {
      if (newScores.hasOwnProperty(key)) {
        newScores[key] += vector[key];
      }
    });
    setScores(newScores);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  };

  const getResult = () => {
    // 逻辑判定：正负决定倾向
    const intensity = scores.I >= 0 ? 'H' : 'L';
    const power = scores.P >= 0 ? 'E' : 'A';
    const outcome = scores.O >= 0 ? 'S' : 'V';
    const narrative = scores.N >= 0 ? 'G' : 'D';
    
    const code = `${intensity}${power}${outcome}${narrative}`;
    return results.find(r => r.id === code) || results[results.length - 1];
  };

  if (finished) {
    const res = getResult();
    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', border: '1px solid #ddd' }}>
        <h1 style={{ color: '#d32f2f' }}>赛博病理科 · 临床诊断报告</h1>
        <hr />
        <p><strong>最终诊断结论：</strong><span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{res.name}</span></p>
        <p><strong>典型病例：</strong>{res.example}</p>
        <p><strong>病理分析：</strong>{res.desc}</p>
        <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', borderLeft: '5px solid #d32f2f' }}>
          <strong>主治医师医嘱：</strong> {res.prognosis}
        </div>
        <button onClick={() => window.location.reload()} style={{ marginTop: '20px', padding: '10px 20px' }}>重新挂号</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <div style={{ color: '#666', marginBottom: '10px' }}>进度：{step + 1} / {questions.length}</div>
      <h3 style={{ lineHeight: '1.5' }}>{questions[step].text}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {questions[step].options.map((opt, idx) => (
          <button 
            key={idx} 
            onClick={() => handleSelect(opt.vector)}
            style={{ padding: '15px', textAlign: 'left', cursor: 'pointer', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#fff' }}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}