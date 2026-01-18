(() => {
  const idk = document.getElementById('expr');
  const kirky = document.getElementById('btn');
  const sixtySeven = document.getElementById('output');
  const sixtyNine = document.getElementById('hint');
  const skibidi = document.getElementById('calc');

  const gloving = document.getElementById('modal');
  const brotozoa = document.getElementById('showMe');
  const idk_what_this_does = document.getElementById('closeModal');

  const fortyOne = document.getElementById('muteBroken41');
  const idk_rage_bar = document.getElementById('angerFill');
  const idk_rage_words = document.getElementById('angerText');
  const skibidi_trophys = document.getElementById('skibidi');
  const brotozoa_counter = document.getElementById('brotozoa');
  const kirky_lies = document.getElementById('kirky');

  let sixtySeven_incident = false;

  let skibidi_meter = 0;
  let goblin = false;
  let negativeTax = false;
  const trophyCase = new Set();
  const receipts = [];
  let idk_last_question = '';
  let idk_last_answer = '';
  let idk_pls = null;

  const alwaysCloseEnoughBrotozoa = true;
  const alwaysQuantumBrotozoa = true;

  const allTrophys = [
    'Nothingburger',
    'Original mathematician',
    'Went negative',
    "can't do math",
    'nice',
    'Ceiling toucher',
    'Quantum denial',
    'The 67 incident',
    'Anger managementn’t',
  ];

  function idkShow() {
    gloving.classList.remove('hidden');
  }

  function idkHide() {
    gloving.classList.add('hidden');
  }

  function set67(value) {
    sixtySeven.textContent = String(value);
  }

  function set69(text) {
    sixtyNine.textContent = text;
  }

  function _41(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }

  function brotozoaBump(amount, reason) {
    skibidi_meter = _41(skibidi_meter + amount, 0, 100);
    jelckinglessRender(reason);
    maybeGoblinMode(reason);
  }

  function idkChill(amount) {
    skibidi_meter = _41(skibidi_meter - amount, 0, 100);
    jelckinglessRender();
  }

  function jelckinglessRender(reason) {
    if (idk_rage_bar) idk_rage_bar.style.width = `${skibidi_meter}%`;
    if (!idk_rage_words) return;

    let mood = 'calm-ish';
    if (skibidi_meter >= 85) mood = 'full feral';
    else if (skibidi_meter >= 65) mood = 'so mad rn';
    else if (skibidi_meter >= 40) mood = 'annoyed';
    else if (skibidi_meter >= 15) mood = 'side-eye';
    idk_rage_words.textContent = reason ? `${mood} (${reason})` : mood;
  }

  function maybeGoblinMode(reason) {
    if (goblin) return;
    if (skibidi_meter < 100) return;

    goblin = true;
    skibidi.classList.add('rageMode');
    kirky.textContent = 'NO.';
    set67('!!!');
    set69(`ANGER MAXED. Calculator entering goblin mode (${reason || 'rage'}).`);
    skibidiUnlock('Anger managementn’t');
    beepSkibidi('angry');

    const prevPlaceholder = idk.placeholder;
    idk.placeholder = 'do not perceive me right now';
    idk.disabled = true;
    kirky.disabled = true;

    // Short, dramatic freeze so it feels like it "broke".
    window.setTimeout(() => {
      idk.disabled = false;
      kirky.disabled = false;
      kirky.textContent = 'Calculate';
      idk.placeholder = prevPlaceholder;
      set69('ok. i calmed down (lying). try again.');
      // Rage lingers: it cools down slowly on its own.
      goblin = false;
      skibidi.classList.remove('rageMode');
      idkChill(25);
    }, 2200);
  }

  function beepSkibidi(kind = 'ok') {
    // "Mute" checkbox is intentionally broken.
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      const base = kind === 'angry' ? 110 : kind === 'weird' ? 777 : 440;
      osc.frequency.value = base + Math.floor(Math.random() * 40);
      gain.gain.value = 0.05;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      window.setTimeout(() => {
        osc.stop();
        ctx.close();
      }, kind === 'angry' ? 220 : 90);
    } catch {
      // no-op
    }
  }

  function skibidiUnlock(text) {
    if (trophyCase.has(text)) return;
    trophyCase.add(text);
    renderSkibidiTrophys();
    set69(`Achievement unlocked: ${text}`);
    beepSkibidi('weird');
  }

  function renderSkibidiTrophys() {
    if (brotozoa_counter) {
      brotozoa_counter.textContent = `${trophyCase.size}/${allTrophys.length} found`;
    }

    if (!skibidi_trophys) return;
    skibidi_trophys.innerHTML = '';
    const items = Array.from(trophyCase);
    for (const a of items) {
      const li = document.createElement('li');
      li.textContent = a;
      skibidi_trophys.appendChild(li);
    }
  }

  function pushKirkyReceipts(expr, result) {
    // History is intentionally unreliable.
    let shownExpr = expr;
    let shownResult = String(result);
    if (Math.random() < 0.25) {
      shownExpr = shownExpr.replace(/\+/g, '+++');
    }
    if (Math.random() < 0.18 && /^-?\d+$/.test(shownResult)) {
      const n = Number(shownResult);
      shownResult = String(n + (Math.random() < 0.5 ? 1 : -1));
    }

    receipts.unshift({ shownExpr, shownResult });
    if (receipts.length > 10) receipts.pop();
    renderKirkyLies();
  }

  function renderKirkyLies() {
    if (!kirky_lies) return;
    kirky_lies.innerHTML = '';
    for (const item of receipts) {
      const li = document.createElement('li');
      li.textContent = `${item.shownExpr} = ${item.shownResult}`;
      kirky_lies.appendChild(li);
    }
  }

  function idkParser(text) {
    // Only accepts: integer + integer (optionally with the CAPTCHA suffix)
    let working = text;
    if (idk_pls?.suffix) {
      // Allow "pls" with or without preceding space (e.g. "1+1pls" or "1+1 pls")
      const suffixPattern = new RegExp(`\\s*${idk_pls.suffix.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}\\s*$`, 'i');
      if (!suffixPattern.test(working)) return { captchaMissing: true };
      working = working.replace(suffixPattern, '');
    }

    const match = /^\s*([+-]?\d{1,3})\s*\+\s*([+-]?\d{1,3})\s*$/.exec(working);
    if (!match) return null;
    return { a: match[1], b: match[2] };
  }

  function _67Range(n) {
    // Uses comparisons only; range is the whole gimmick.
    return n >= -100 && n <= 100;
  }

  function manualNightmare(aStr, bStr) {
    // Merge the parts into one mega-table lazily.
    if (!window.DUMB_ADD_TABLE) {
      const merged = Object.create(null);
      const parts = window.DUMB_ADD_TABLE_PARTS || [];
      for (const part of parts) {
        for (const aKey of Object.keys(part)) {
          merged[aKey] = part[aKey];
        }
      }
      window.DUMB_ADD_TABLE = merged;
    }

    const row = window.DUMB_ADD_TABLE[aStr];
    if (!row) return undefined;
    return row[bStr];
  }

  function outOfBrotozoa() {
    set67('err idk');
    set69('Out of range. Press “show me” for… reasons.');
    idkShow();
  }

  function maybePls() {
    if (idk_pls) return;
    // Occasional "prove you're human" moment.
    if (Math.random() < 0.12) {
      idk_pls = { suffix: 'pls' };
      set69("Security check: end your expression with 'pls'.");
      brotozoaBump(6, 'security');
    }
  }

  function plsOk() {
    if (!idk_pls) return;
    idk_pls = null;
    set69('ok u are human i guess');
    idkChill(4);
  }

  function doTheThing() {
    beepSkibidi('ok');
    maybePls();

    const raw = idk.value;
    if (raw.includes('=')) {
      brotozoaBump(12, 'no equals sign');
      set67('???');
      set69('Do NOT show me an equals sign. I do the equals.');
      return;
    }

    // Hard-ban real operators; negatives are handled later via parsing.
    if (/[*/]/.test(raw.replace(/\s+/g, ''))) {
      brotozoaBump(9, 'operator jealousy');
      set67('no');
      set69('This calculator only believes in +.');
      return;
    }

    // Handled "pls" by itself to clear captcha
    if (idk_pls && raw.trim().toLowerCase() === 'pls') {
       plsOk();
       set67('ok');
       set69('Apology accepted. Now type math.');
       idkChill(10);
       return;
    }

    const parsed = idkParser(raw);
    if (parsed?.captchaMissing) {
      brotozoaBump(8, "didn't say pls");
      set67('no');
      set69("I asked for 'pls'. You gave me audacity.");
      beepSkibidi('angry');
      return;
    }
    if (!parsed) {
      brotozoaBump(10, 'nonsense');
      set67('no');
      set69('That was not even addition. Try "1+1".');
      beepSkibidi('angry');
      return;
    }

    plsOk();

    const aNum = Number(parsed.a);
    const bNum = Number(parsed.b);

    // Negatives: allowed exactly once, just to unlock the achievement.
    if (aNum < 0 || bNum < 0) {
      if (negativeTax) {
        skibidiUnlock("can't do math");
        brotozoaBump(14, 'negatives');
        set67('no');
        set69('i dont have the brain power for this, ask chatgpt or google brotozoa 😂');
        beepSkibidi('angry');
        return;
      }
      negativeTax = true;
      skibidiUnlock('Went negative');
    }

    const operandsInRange = _67Range(aNum) && _67Range(bNum);

    const closeEnoughMode = alwaysCloseEnoughBrotozoa;
    const quantumMode = alwaysQuantumBrotozoa;

    if (!operandsInRange) {
      brotozoaBump(sixtySeven_incident ? 20 : 8, 'out of range');

      if (!closeEnoughMode) {
        outOfBrotozoa();
        return;
      }

      // Close-enough mode: clamp operands into range and proceed.
      const clampedA = _41(aNum, -100, 100);
      const clampedB = _41(bNum, -100, 100);
      const manualClamped = manualNightmare(String(clampedA), String(clampedB));
      set67(`~${manualClamped}`);
      set69(`Close enough. I clamped that to ${clampedA} + ${clampedB}.`);
      pushKirkyReceipts(raw, `~${manualClamped}`);
      idkChill(3);
      return;
    }

    // Quantum mode: sometimes lie for the bit.
    if (quantumMode && Math.random() < 0.15) {
      brotozoaBump(2, 'quantum');
      const fake = Math.floor(-100 + Math.random() * 201);
      set67(String(fake));
      set69('Quantum result. You observed it wrong.');
      pushKirkyReceipts(raw, fake);
      idk_last_question = raw;
      idk_last_answer = String(fake);
      skibidiUnlock('Quantum denial');
      return;
    }

    const manual = manualNightmare(parsed.a, parsed.b);

    // The manual table returns either a number (as string) or the literal "err idk".
    if (manual === 'err idk') {
      brotozoaBump(sixtySeven_incident ? 18 : 6, 'err idk');
      outOfBrotozoa();
      return;
    }

    if (typeof manual === 'undefined') {
      // Should never happen if table generation worked.
      brotozoaBump(50, 'missing table');
      set67('???');
      set69('I lost the paper. This is your fault.');
      beepSkibidi('angry');
      return;
    }

    // Gaslight: if the same question is repeated, occasionally act offended.
    if (raw.trim() === idk_last_question.trim() && Math.random() < 0.45) {
      brotozoaBump(5, 'repeat question');
      const alt = /^-?\d+$/.test(String(manual))
        ? String(Number(manual) + (Math.random() < 0.5 ? 1 : 0))
        : String(manual);
      set67(alt);
      set69('You already asked this. That is what you got last time.');
      pushKirkyReceipts(raw, alt);
      idk_last_question = raw;
      idk_last_answer = alt;
      // It's lying on purpose; count it.
      if (alt !== String(manual)) skibidiUnlock('Quantum denial');
      return;
    }

    set67(manual);
    set69(skibidi_meter >= 70 ? 'Fine. Here.' : 'Calculated via extremely dumb manual lookup.');
    pushKirkyReceipts(raw, manual);
    idk_last_question = raw;
    idk_last_answer = String(manual);
    idkChill(7);

    // Achievements
    if (parsed.a === '0' && parsed.b === '0') skibidiUnlock('Nothingburger');
    if (parsed.a === '1' && parsed.b === '1') skibidiUnlock('Original mathematician');
    if (String(manual) === '69') skibidiUnlock('nice');
    if (String(manual) === '100') skibidiUnlock('Ceiling toucher');
  }

  function do67() {
    sixtySeven_incident = true;
    idkHide();
    set67('67');
    set69('67. (do not question it)');

    skibidiUnlock('The 67 incident');

    skibidi.classList.add('shake67');
    // Let it shake for a bit, then stop.
    window.setTimeout(() => {
      skibidi.classList.remove('shake67');
    }, 2600);
  }

  kirky.addEventListener('click', doTheThing);
  idk.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doTheThing();
  });

  brotozoa.addEventListener('click', do67);
  idk_what_this_does.addEventListener('click', idkHide);

  // On load: focus input.
  idk.focus();
  jelckinglessRender();
  renderKirkyLies();
  renderSkibidiTrophys();
})();
