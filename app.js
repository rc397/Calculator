(() => {
  const exprInput = document.getElementById('expr');
  const btn = document.getElementById('btn');
  const output = document.getElementById('output');
  const hint = document.getElementById('hint');
  const calc = document.getElementById('calc');

  const modal = document.getElementById('modal');
  const showMe = document.getElementById('showMe');
  const closeModal = document.getElementById('closeModal');

  const crash = document.getElementById('crash');
  const crashMsg = document.getElementById('crashMsg');
  const reload = document.getElementById('reload');

  const CRASH_TEXT = "i aint a diddyblud on a calc, so Lowkirkentaperchenuinely stop asking 😂 ✌️";

  let hasShown67 = false;
  let isCrashed = false;

  function showModal() {
    modal.classList.remove('hidden');
  }

  function hideModal() {
    modal.classList.add('hidden');
  }

  function setOutput(value) {
    output.textContent = String(value);
  }

  function setHint(text) {
    hint.textContent = text;
  }

  function crashNow(reason) {
    isCrashed = true;
    crash.classList.remove('hidden');
    crashMsg.textContent = `${CRASH_TEXT}\n\nReason: ${reason}`;
  }

  function parseAdditionExpression(text) {
    // Only accepts: integer + integer
    const match = /^\s*([+-]?\d{1,3})\s*\+\s*([+-]?\d{1,3})\s*$/.exec(text);
    if (!match) return null;
    return { a: match[1], b: match[2] };
  }

  function isInRange(n) {
    // Uses comparisons only; range is the whole gimmick.
    return n >= -100 && n <= 100;
  }

  function getManualAddResult(aStr, bStr) {
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

  function handleOutOfRange() {
    setOutput('err idk');
    setHint('Out of range. Press “show me” for… reasons.');
    showModal();
  }

  function handleCalculate() {
    if (isCrashed) return;

    const parsed = parseAdditionExpression(exprInput.value);
    if (!parsed) {
      setOutput('no');
      setHint('That was not even addition. Try "1+1".');
      return;
    }

    const aNum = Number(parsed.a);
    const bNum = Number(parsed.b);

    // If the user tries out-of-range operands after the 67 reveal, we crash.
    const operandsInRange = isInRange(aNum) && isInRange(bNum);

    if (!operandsInRange) {
      if (hasShown67) {
        crashNow('You asked for numbers outside [-100, 100] after the 67 incident.');
        return;
      }
      handleOutOfRange();
      return;
    }

    const manual = getManualAddResult(parsed.a, parsed.b);

    // The manual table returns either a number (as string) or the literal "err idk".
    if (manual === 'err idk') {
      if (hasShown67) {
        crashNow('You went out-of-range again after the 67 incident.');
        return;
      }
      handleOutOfRange();
      return;
    }

    if (typeof manual === 'undefined') {
      // Should never happen if table generation worked.
      crashNow('Missing manual mapping entry.');
      return;
    }

    setOutput(manual);
    setHint('Calculated via extremely dumb manual lookup.');
  }

  function do67Meme() {
    if (isCrashed) return;

    hasShown67 = true;
    hideModal();
    setOutput('67');
    setHint('67. (do not question it)');

    calc.classList.add('shake67');
    // Let it shake for a bit, then stop.
    window.setTimeout(() => {
      calc.classList.remove('shake67');
    }, 2600);
  }

  btn.addEventListener('click', handleCalculate);
  exprInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleCalculate();
  });

  showMe.addEventListener('click', do67Meme);
  closeModal.addEventListener('click', hideModal);

  reload.addEventListener('click', () => {
    window.location.reload();
  });

  // On load: focus input.
  exprInput.focus();
})();
