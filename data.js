/* 原創示範題目。正式公開前請完成題目檢核及測量驗證。 */
window.QUIZ_DATA = {
  title: 'Between Us｜衝突時，你是哪一種動物？',
  scaleLabels: {
    avoiding: '迴避',
    accommodating: '妥協',
    compromising: '折衷',
    problemSolving: '問題解決',
    forcing: '主張',
    independent: '獨立自我建構',
    interdependent: '互依自我建構'
  },
  scaleOrder: ['problemSolving', 'compromising', 'avoiding', 'accommodating', 'forcing', 'independent', 'interdependent'],
  styleKeys: ['avoiding', 'accommodating', 'compromising', 'problemSolving', 'forcing'],
  questions: [
    { id: 'q01', scale: 'problemSolving', text: '有分歧時，我會努力尋找能同時照顧雙方需求的方法。' },
    { id: 'q02', scale: 'avoiding', text: '意見衝突時，我通常會先避開當下的爭執。' },
    { id: 'q03', scale: 'independent', text: '做重要決定時，我會優先考慮自己的價值觀。' },
    { id: 'q04', scale: 'compromising', text: '當彼此僵持不下，我會尋找雙方各退一步的選項。' },
    { id: 'q05', scale: 'accommodating', text: '即使意見不同，我仍會優先考量對方的需求。' },
    { id: 'q06', scale: 'interdependent', text: '做決定時，我會把這個決定對重要他人的影響考慮進去。' },
    { id: 'q07', scale: 'forcing', text: '面對重要分歧，我會清楚堅持自己的立場。' },
    { id: 'q08', scale: 'accommodating', text: '為了維持彼此的合作，我願意調整原本的偏好。' },
    { id: 'q09', scale: 'forcing', text: '如果我認為方案不合理，我會直接要求重新討論。' },
    { id: 'q10', scale: 'compromising', text: '我願意交換條件，換取雙方都能接受的結果。' },
    { id: 'q11', scale: 'interdependent', text: '我常透過自己與家人、朋友或團體的關係來理解自己。' },
    { id: 'q12', scale: 'problemSolving', text: '我會主動了解對方真正重視什麼，再一起思考新方案。' },
    { id: 'q13', scale: 'independent', text: '即使周圍的人看法不同，我仍願意依自己的判斷行動。' },
    { id: 'q14', scale: 'avoiding', text: '即使不太同意，我有時也會選擇暫時不表達反對意見。' },
    { id: 'q15', scale: 'forcing', text: '即使對方不認同，我仍會積極爭取自己重視的主張。' },
    { id: 'q16', scale: 'independent', text: '我重視在群體之中保有自己獨特的想法與個性。' },
    { id: 'q17', scale: 'avoiding', text: '如果話題容易引起摩擦，我傾向等氣氛比較合適時再談。' },
    { id: 'q18', scale: 'problemSolving', text: '即使討論變得複雜，我仍願意花時間和對方找出可行的解方。' },
    { id: 'q19', scale: 'accommodating', text: '當對方對某件事特別在意時，我通常願意讓對方優先。' },
    { id: 'q20', scale: 'interdependent', text: '與重要他人保持連結，是我自我認同的一部分。' },
    { id: 'q21', scale: 'compromising', text: '比起長時間僵持，我更傾向先找到彼此都能接受的折衷方案。' }
  ],
  roles: [
    {
      id: 'fox', emoji: '🦊', name: '務實協商家', english: 'The Pragmatic Negotiator',
      styles: ['problemSolving', 'compromising'],
      quote: '不一定要照我的方式，但我們可以找到解法。',
      description: '你傾向把分歧轉化成可以一起處理的問題，也願意考慮現實中的折衷方案。',
      strength: '善於整合觀點、推動共識。',
      caution: '可能太快尋求折衷，而忽略更深層的需求。',
      advice: '在開始解決問題前，先確認雙方真正重視的是什麼。'
    },
    {
      id: 'lion', emoji: '🦁', name: '原則解題者', english: 'The Principled Solver',
      styles: ['problemSolving', 'forcing'],
      quote: '我會聽你的想法，也會說清楚我的立場。',
      description: '你傾向積極處理問題，同時清楚表達自己認為重要的原則。',
      strength: '面對問題直接、具有推進力。',
      caution: '如果節奏太快，可能讓別人感到壓力。',
      advice: '讓對方有足夠空間表達，比一味追求速度更有效。'
    },
    {
      id: 'owl', emoji: '🦉', name: '冷靜修復者', english: 'The Thoughtful Resolver',
      styles: ['problemSolving', 'avoiding'],
      quote: '先整理一下，再把事情好好談清楚。',
      description: '你不一定喜歡當下交鋒，但仍願意在適當時機把問題好好處理。',
      strength: '懂得降溫，也願意尋找解方。',
      caution: '延後對話太久，可能讓問題持續累積。',
      advice: '需要空間時，告訴對方你預計什麼時候再談。'
    },
    {
      id: 'swan', emoji: '🦢', name: '共感調和者', english: 'The Empathic Solver',
      styles: ['problemSolving', 'accommodating'],
      quote: '事情要解決，彼此的感受也很重要。',
      description: '你積極尋求解決問題的方法，也會將對方的需求納入考量。',
      strength: '兼顧關係與問題處理。',
      caution: '可能不自覺承擔過多協調工作。',
      advice: '理解對方的同時，也要清楚表達自己的需求。'
    },
    {
      id: 'beaver', emoji: '🦫', name: '和平緩衝者', english: 'The Peaceful Mediator',
      styles: ['compromising', 'avoiding'],
      quote: '先把火氣放下來，我們再找中間點。',
      description: '你比較傾向降低正面衝突，再尋找雙方能接受的方式。',
      strength: '善於緩和情勢、尋找折衷。',
      caution: '有時為求和平，可能太早放棄重要議題。',
      advice: '可以降低衝突強度，但別讓重要問題永遠懸著。'
    },
    {
      id: 'squirrel', emoji: '🐿️', name: '溫柔整合者', english: 'The Gentle Integrator',
      styles: ['compromising', 'accommodating'],
      quote: '大家都被照顧到，才是我想要的結果。',
      description: '你願意調整立場，也在意如何讓互動保有善意。',
      strength: '體貼、彈性高，擅長維持合作。',
      caution: '可能較少為自己的需要爭取空間。',
      advice: '讓步之前，先問問自己真正的底線在哪裡。'
    },
    {
      id: 'wolf', emoji: '🐺', name: '策略談判家', english: 'The Strategic Negotiator',
      styles: ['compromising', 'forcing'],
      quote: '可以談，也可以退，但底線要清楚。',
      description: '你願意協商與交換條件，也傾向為重視的立場積極爭取。',
      strength: '能把握談判重點、設定優先順序。',
      caution: '過度聚焦條件，可能讓對方感到關係被工具化。',
      advice: '除了談條件，也給彼此說明感受的機會。'
    },
    {
      id: 'rabbit', emoji: '🐰', name: '安撫守護者', english: 'The Gentle Guardian',
      styles: ['accommodating', 'avoiding'],
      quote: '我希望我們不要因為這件事而受傷。',
      description: '你通常重視互動中的平和感，傾向降低摩擦並照顧他人。',
      strength: '善於察覺氣氛、緩和對立。',
      caution: '可能不容易及時表達自己的不滿。',
      advice: '溫柔不代表需要放棄表達自己的感受。'
    },
    {
      id: 'bear', emoji: '🐻', name: '堅忍承擔者', english: 'The Steadfast Protector',
      styles: ['accommodating', 'forcing'],
      quote: '我願意體諒，也希望被同樣尊重。',
      description: '你可以顧及他人，也能在重要事情上明確表達立場。',
      strength: '兼具體貼與主張的能力。',
      caution: '如果界線沒有說清楚，可能讓對方難以預期。',
      advice: '在需要堅持之前，就先說明你重視的原則。'
    },
    {
      id: 'panther', emoji: '🐆', name: '直接主張者', english: 'The Selective Challenger',
      styles: ['forcing', 'avoiding'],
      quote: '不是每件事都要爭，但重要的我不會退。',
      description: '你可能選擇避開不必要的摩擦，在關鍵議題上卻能清楚主張。',
      strength: '知道何時保留精力、何時採取立場。',
      caution: '突然轉為堅定的態度，可能令對方意外。',
      advice: '讓對方知道哪些議題值得你認真討論。'
    }
  ]
};
