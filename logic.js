/* Independent scoring functions (also importable from Node for testing). */
(function (root) {
  'use strict';

  function average(values) {
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  function scoreAnswers(answers, data, reference) {
    const perScale = {};
    for (const q of data.questions) {
      const answer = answers[q.id];
      if (!Number.isInteger(answer) || answer < 1 || answer > 7) {
        throw new Error(`題目 ${q.id} 尚未完成`);
      }
      (perScale[q.scale] ??= []).push(answer);
    }

    const scores = {};
    for (const [scale, values] of Object.entries(perScale)) {
      scores[scale] = average(values);
    }

    const standardized = {};
    for (const key of data.styleKeys) {
      standardized[key] = (scores[key] - reference.pooled.mean[key]) / reference.pooled.sd[key];
    }

    const sorted = [...data.styleKeys].sort((a, b) => {
      const delta = standardized[b] - standardized[a];
      return Math.abs(delta) > 1e-10 ? delta : data.styleKeys.indexOf(a) - data.styleKeys.indexOf(b);
    });
    const topTwo = sorted.slice(0, 2);
    const role = data.roles.find(candidate =>
      candidate.styles.length === 2 && candidate.styles.every(style => topTwo.includes(style))
    );
    if (!role) throw new Error('找不到對應角色');

    const taiwanN = reference.taiwan.n;
    const roleN = reference.roles[role.id].taiwan;
    const occurrence = (roleN / taiwanN) * 100;
    const rarity = occurrence < 3 ? '極稀有' : occurrence < 7 ? '稀有' : occurrence < 12 ? '少見' : '常見';
    const comparisons = {};
    for (const [key, value] of Object.entries(scores)) {
      const ref = reference.taiwan.mean[key];
      comparisons[key] = { person: value, average: ref, percentDifference: ((value - ref) / ref) * 100 };
    }

    const rawStyles = data.styleKeys.map(key => scores[key]);
    const flatProfile = Math.max(...rawStyles) - Math.min(...rawStyles) < 0.35;
    const lowSeparation = (standardized[sorted[1]] - standardized[sorted[2]]) < 0.15;

    return { role, scores, standardized, topTwo, occurrence, rarity, roleN, taiwanN,
      comparisons, flatProfile, lowSeparation };
  }

  const api = { scoreAnswers };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.QuizLogic = api;
})(typeof window !== 'undefined' ? window : undefined);
