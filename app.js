(() => {
  'use strict';
  const data = window.QUIZ_DATA;
  const ref = window.QUIZ_REFERENCE;
  const logic = window.QuizLogic;
  if (!data || !ref || !logic) {
    document.body.innerHTML = '<p style="padding:2rem">無法載入問卷資料。請確認所有 .js 檔案位於同一個資料夾。</p>';
    return;
  }

  const $ = (selector) => document.querySelector(selector);
  const screens = { home: $('#screen-home'), quiz: $('#screen-quiz'), profile: $('#screen-profile'), results: $('#screen-results') };
  let answers = {};
  let currentIndex = 0;
  let result = null;
  let displayName = '';
  let researchStatus = '本次沒有儲存研究資料。';
  const total = data.questions.length;

  function setScreen(name) {
    for (const [key, element] of Object.entries(screens)) element.hidden = key !== name;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function start() {
    answers = {};
    currentIndex = 0;
    result = null;
    displayName = '';
    researchStatus = '本次沒有儲存研究資料。';
    $('#profile-form').reset();
    renderQuestion();
    setScreen('quiz');
  }

  function renderQuestion() {
    const q = data.questions[currentIndex];
    const count = currentIndex + 1;
    $('#progress-number').textContent = `QUESTION ${String(count).padStart(2, '0')} / ${total}`;
    $('#progress-percent').textContent = `${Math.round(count / total * 100)}%`;
    $('#progress-bar').style.width = `${count / total * 100}%`;
    $('#question-counter').textContent = `第 ${count} 題，共 ${total} 題`;
    $('#question-title').textContent = q.text;

    const options = $('#scale-options');
    options.replaceChildren();
    for (let value = 1; value <= 7; value++) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'scale-button' + (answers[q.id] === value ? ' selected' : '');
      button.textContent = String(value);
      button.dataset.value = String(value);
      button.setAttribute('aria-label', `${value} 分${value === 1 ? '，非常不同意' : value === 7 ? '，非常同意' : ''}`);
      button.setAttribute('aria-pressed', answers[q.id] === value ? 'true' : 'false');
      button.addEventListener('click', () => selectAnswer(value));
      options.appendChild(button);
    }
    $('#back-btn').disabled = currentIndex === 0;
    $('#next-btn').disabled = !answers[q.id];
    $('#next-btn').textContent = currentIndex === total - 1 ? '查看結果 ↗' : '下一題 →';
    $('#answer-state').textContent = answers[q.id] ? `已選 ${answers[q.id]} 分` : '請選擇答案';
  }

  function selectAnswer(value) {
    const q = data.questions[currentIndex];
    answers[q.id] = value;
    for (const button of $('#scale-options').children) {
      const selected = Number(button.dataset.value) === value;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', selected ? 'true' : 'false');
    }
    $('#next-btn').disabled = false;
    $('#answer-state').textContent = `已選 ${value} 分`;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);
  }

  function pctDifference(value) {
    const prefix = value > 0 ? '+' : '';
    return `${prefix}${value.toFixed(1)}%`;
  }

  function renderResults() {
    try {
      result = logic.scoreAnswers(answers, data, ref);
    } catch (error) {
      window.alert(error.message);
      return;
    }
    const greeting = $('#report-personalization');
    greeting.hidden = !displayName;
    greeting.textContent = displayName ? `${displayName}，這是你的衝突人格報告！` : '';
    $('#research-save-status').textContent = researchStatus;
    const role = result.role;
    $('#result-animal').textContent = role.emoji;
    $('#result-title').textContent = role.name;
    $('#result-english').textContent = role.english;
    $('#result-quote').textContent = `「${role.quote}」`;
    $('#result-description').textContent = role.description;
    $('#role-strength').textContent = role.strength;
    $('#role-caution').textContent = role.caution;
    $('#role-advice').textContent = role.advice;
    $('#rarity-percent').textContent = `${result.occurrence.toFixed(1)}%`;
    $('#rarity-tier').textContent = result.rarity + ' · RESEARCH SAMPLE';
    $('#rarity-text').textContent = `研究中的台灣受試者，有 ${result.roleN} / ${result.taiwanN} 人屬於這種角色。`;

    const caveats = [];
    if (result.flatProfile) caveats.push('五種風格原始分數相當接近，本次角色只是相對分類，不代表你明顯偏好其中兩種。');
    if (result.lowSeparation) caveats.push('第二與第三種風格的標準化分數接近，稍微改變答案可能就會換成另一種角色。');
    const warning = $('#result-warning');
    warning.hidden = caveats.length === 0;
    warning.textContent = caveats.join(' ');

    const styles = $('#style-chart');
    styles.innerHTML = data.styleKeys.map(key => {
      const c = result.comparisons[key];
      return `<div class="score-row">
        <span class="score-label">${escapeHtml(data.scaleLabels[key])}</span>
        <div class="score-bars" aria-label="你的分數 ${c.person.toFixed(2)}，台灣樣本平均 ${c.average.toFixed(2)}">
          <div class="score-track"><div class="score-fill" style="width:${(c.person/7*100).toFixed(2)}%"></div></div>
          <div class="score-track"><div class="score-fill reference" style="width:${(c.average/7*100).toFixed(2)}%"></div></div>
        </div>
        <div class="score-measure"><strong>${c.person.toFixed(2)} / 7</strong><span class="${c.percentDifference < 0 ? 'negative' : ''}">${pctDifference(c.percentDifference)} vs 台灣樣本</span></div>
      </div>`;
    }).join('');

    $('#self-scores').innerHTML = ['independent', 'interdependent'].map(key => {
      const c = result.comparisons[key];
      const dir = c.percentDifference >= 0 ? '高於' : '低於';
      return `<div class="self-card">
        <span class="mini-label">${escapeHtml(data.scaleLabels[key])}</span>
        <div class="big-score">${c.person.toFixed(2)} <small>/ 7</small></div>
        <div class="diff ${c.percentDifference < 0 ? 'negative' : ''}">${dir}台灣研究樣本平均 ${Math.abs(c.percentDifference).toFixed(1)}%</div>
        <p class="avg-note">台灣研究樣本平均：${c.average.toFixed(2)} / 7</p>
      </div>`;
    }).join('');
    $('#copy-status').textContent = '';
    setScreen('results');
  }

  function next() {
    if (!answers[data.questions[currentIndex].id]) return;
    if (currentIndex === total - 1) return showProfile();
    currentIndex++;
    renderQuestion();
    $('#question-title').focus?.();
  }

  function showProfile() {
    $('#profile-error').hidden = true;
    const cfg = window.STORAGE_CONFIG || {};
    $('#storage-preview').textContent = cfg.enabled && cfg.endpoint
      ? '已設定研究資料接收端點。只有你自願同意後，資料才會送出。'
      : '研究資料儲存尚未啟用；即使勾選同意，也不會上傳答案。';
    setScreen('profile');
  }

  async function saveResearchData(age, gender) {
    const cfg = window.STORAGE_CONFIG || {};
    if (!cfg.enabled || !cfg.endpoint) return '研究資料儲存尚未啟用：本次沒有上傳任何資料。';
    if (!/^https:\/\//.test(cfg.endpoint)) return '儲存端點設定錯誤，資料沒有上傳。';
    const submission = {
      quiz_version: 'tw-demo-0.2', consent_version: 'tw-privacy-v1.2-2026-11-14',
      locale: 'zh-TW', consent: true, age, gender,
      answers: { ...answers }, scores: { ...result.scores }, role: result.role.id
      // 有意不加入 displayName：姓名只留在瀏覽器中，永不上傳。
    };
    try {
      const ctrl = new AbortController();
      const time = setTimeout(() => ctrl.abort(), 10000);
      let response;
      try {
        response = await fetch(cfg.endpoint, {
          method: 'POST', mode: 'cors', credentials: 'omit',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submission), signal: ctrl.signal
        });
      } finally { clearTimeout(time); }
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const saved = await response.json();
      if (!saved.id) throw new Error('Missing record id');
      return `已收到研究資料，紀錄編號 ${saved.id}。請保留編號，方便日後提出撤回請求。`;
    } catch (_err) {
      return '研究資料上傳失敗或無法確認成功；個人結果仍可查看。若需確認，請向研究負責人查詢。';
    }
  }

  async function submitProfile(event) {
    event.preventDefault();
    const error = $('#profile-error');
    error.hidden = true;
    displayName = $('#profile-name').value.trim().slice(0, 40);
    const rawAge = $('#profile-age').value.trim();
    const age = rawAge ? Number(rawAge) : null;
    const gender = $('#profile-gender').value;
    const consented = $('#research-consent').checked;
    if (rawAge && (!Number.isInteger(age) || age < 1 || age > 120)) {
      error.textContent = '請輸入有效的年齡（1–120 歲），或留白。';
      error.hidden = false; return;
    }
    if (consented && (age === null || age < 18)) {
      error.textContent = '只有年滿 18 歲的使用者才能同意研究資料儲存；請填寫年齡，或取消勾選研究同意。';
      error.hidden = false; return;
    }
    try { result = logic.scoreAnswers(answers, data, ref); }
    catch (err) { error.textContent = err.message; error.hidden = false; return; }
    const button = $('#profile-submit');
    button.disabled = true;
    button.textContent = '正在產生報告…';
    researchStatus = consented
      ? await saveResearchData(age, gender)
      : '你未同意提供研究資料，因此本次答案沒有上傳。';
    button.disabled = false;
    button.textContent = '產生我的報告 ↗';
    renderResults();
  }

  function back() {
    if (currentIndex === 0) return;
    currentIndex--;
    renderQuestion();
  }

  async function copySummary() {
    if (!result) return;
    const lines = [
      `${displayName ? displayName + '是' : '我是'} ${result.role.emoji} ${result.role.name}！`,
      result.role.quote,
      `角色出現率：台灣研究樣本 ${result.occurrence.toFixed(1)}%（${result.roleN}/${result.taiwanN}）`,
      `獨立自我建構：${result.scores.independent.toFixed(2)}/7`,
      `互依自我建構：${result.scores.interdependent.toFixed(2)}/7`,
      'Between Us｜衝突人格小測驗（開發測試版，非正式心理測量）'
    ];
    const text = lines.join('\n');
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(text);
      $('#copy-status').textContent = '分享文字已複製！';
    } catch (_error) {
      const field = document.createElement('textarea');
      field.value = text;
      field.style.position = 'fixed';
      field.style.left = '-10000px';
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand('copy');
      field.remove();
      $('#copy-status').textContent = copied ? '分享文字已複製！' : '目前無法自動複製，請擷取結果頁分享。';
    }
  }

  $('#start-btn').addEventListener('click', start);
  $('#back-btn').addEventListener('click', back);
  $('#next-btn').addEventListener('click', next);
  $('#restart-btn').addEventListener('click', start);
  $('#profile-form').addEventListener('submit', submitProfile);
  $('#profile-back').addEventListener('click', () => { currentIndex = total - 1; renderQuestion(); setScreen('quiz'); });
  $('#copy-btn').addEventListener('click', copySummary);
  $('#brand-btn').addEventListener('click', () => setScreen('home'));
  document.addEventListener('keydown', (event) => {
    if (screens.quiz.hidden || event.ctrlKey || event.metaKey || event.altKey) return;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
    if (/^[1-7]$/.test(event.key)) selectAnswer(Number(event.key));
  });
  setScreen('home');
})();
