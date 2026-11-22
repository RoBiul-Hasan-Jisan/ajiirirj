/* "What we do" content: full project story (About page) + a short Problem/Solution/Workflow/AI/Impact explainer for every page. */
(function () {
  'use strict';
  const FIVE = [['problem', 'Problem'], ['solution', 'Solution'], ['workflow', 'Workflow'], ['ai', 'AI approach'], ['impact', 'Impact & next steps']];

  /* ---------------- whole project ---------------- */
  const PROJECT = {
    problem: {
      lead: 'Dengue is a fast-moving, weather-driven disease, and Bangladesh\'s cities find out about outbreaks too late.',
      points: [
        '<b>What goes wrong:</b> Dengue cases follow the monsoon with a delay of a few weeks. City corporations, hospitals and communities usually react after cases are already rising - when beds fill up and larvae are already everywhere.',
        '<b>Who is affected:</b> Residents of dense, water-logged wards (children, pregnant women and older adults are most at risk); ward councillors and city-corporation health teams who must decide where to spray and clean first; hospital managers who must have beds, IV fluids and test kits ready; and public-health planners.',
        '<b>Why it matters:</b> Bangladesh\'s 2023 season was its worst on record (over 300,000 reported cases and 1,700+ deaths, per DGHS). Most deaths are preventable with early care, and vector control is cheap when it is early and targeted - but expensive and ineffective when it is late and everywhere.',
        '<b>The gap:</b> Surveillance reports tell you what <i>has</i> happened. Officers need to know <i>where and when next</i>, at ward level, in time to act - and citizens need trustworthy guidance in Bangla about symptoms and danger signs.'
      ]
    },
    solution: {
      lead: 'Dengue Watch turns weather, ward conditions and case history into a ward-by-ward early warning, with an assistant that explains it in plain language.',
      points: [
        '<b>Early warning 0-12 weeks ahead</b> for 60 wards in 5 cities (Dhaka North, Dhaka South, Chattogram, Gazipur, Narayanganj), plus a long-range seasonal outlook to 2030.',
        '<b>Actionable, not just a number:</b> every ward gets a risk level (Low / Medium / High / Critical), the reasons behind it (rainfall surge, drainage, sanitation, crowding) and a suggested action plan.',
        '<b>What-if tools:</b> change the rainfall or temperature scenario and see how risk shifts - useful for preparedness planning before the monsoon.',
        '<b>Bilingual dengue assistant</b> (English and বাংলা) that answers dengue questions, flags danger signs urgently and queries the forecasts in plain language.',
        '<b>Unique value:</b> ward-level resolution, honest uncertainty (accuracy and limits are shown, not hidden), and one place that joins prediction, explanation, action and public education.'
      ]
    },
    workflow: {
      lead: 'From a date and a city to a decision in four steps.',
      points: [
        '<b>1. Choose</b> a city, a start week and a warning window (2-12 weeks). Optionally set a rainfall scenario.',
        '<b>2. Predict:</b> the matching saved model reads recent weather, rainfall lags and case history up to that week and estimates cases for every ward.',
        '<b>3. Understand:</b> see the city risk level, a ranked ward list, the risk map, the rainfall-to-cases lag explanation and per-ward drivers.',
        '<b>4. Act:</b> the Alerts and Action plan pages turn the highest-risk wards into tasks (larviciding, drain clearance, hospital readiness) that can be ticked off; the assistant answers follow-up questions or explains symptoms to residents.',
        '<b>Typical journeys:</b> a city health officer opens <i>Risk prediction</i> on Monday and plans the week; a hospital manager checks <i>Forecasts</i>; a researcher inspects <i>Model accuracy</i>; a resident asks the assistant "my child has fever - what should I do?".'
      ]
    },
    ai: {
      lead: 'Supervised machine learning on weekly ward data, wrapped in transparent rules and a safety-first assistant.',
      points: [
        '<b>Data:</b> weekly records for 60 wards, 2016-2025: reported dengue cases, temperature, humidity, rainfall, and ward profile (population density, sanitation, water-logging risk).',
        '<b>Models:</b> 13 tuned gradient-boosting regressors with a Poisson loss (suited to case counts) - one nowcast model (h0, weather only) and one for each horizon of 1-12 weeks - trained on lagged rainfall/temperature, seasonality, ward profile and case history.',
        '<b>Validation:</b> trained on 2016-2022 and tested on 2023-2025 held-out years: ward-week R&sup2; &asymp; 0.76, city-week R&sup2; &asymp; 0.89, outbreak-detection AUC &asymp; 0.96 (3-week model). Results are published on the <i>Model accuracy</i> page.',
        '<b>Long-range outlook:</b> because future weather is unknown, each of the past 10 years of weather is replayed as a scenario and the model is run for each, giving an expected value and a plausible range. Held-out yearly totals were off by -16% to +26%.',
        '<b>Explainability:</b> feature-group importance, plain-language ward drivers, and simple risk bands (Low &lt; 2, Medium 2-5, High 5-9, Critical &ge; 9 expected cases per ward-week).',
        '<b>Assistant:</b> a rule-based, offline engine (no external LLM) with a WHO-aligned bilingual knowledge base, safety triage for danger signs, and tools that call the models - so it cannot invent numbers.',
        '<b>Integrations:</b> a Python API (scikit-learn, pandas) serves the dashboard; the design is ready for live feeds such as DGHS case reports, weather services and satellite rainfall.'
      ]
    },
    impact: {
      lead: 'Earlier, better-targeted action that saves effort, beds and lives - built to keep running at low cost.',
      points: [
        '<b>Expected benefits:</b> 2-12 weeks of lead time to target larviciding and drain clearance where risk is highest; earlier hospital readiness; faster, clearer public guidance on danger signs. (These are intended outcomes - they still need field evaluation with partners.)',
        '<b>Sustainability:</b> light stack (Python + static web page), no paid APIs or per-query fees, runs on a standard server, and the model can be retrained as each new season of data arrives.',
        '<b>Responsible use:</b> forecasts are decision support, not official alerts. Limits are shown on screen: the dataset is a research dataset (currently ending 2025-12-29), the model cannot foresee new serotypes or control campaigns, and the assistant never diagnoses or doses.',
        '<b>Next steps:</b> (1) connect live DGHS/hospital case feeds and weather forecasts; (2) pilot with one city corporation and compare against actual outcomes; (3) add SMS / WhatsApp / voice access in Bangla and a clinician review of the health content; (4) extend to more districts and to chikungunya and other climate-sensitive diseases; (5) calibrate risk bands into probabilities and add uncertainty intervals to every forecast.'
      ]
    }
  };

  /* ---------------- per page ---------------- */
  const PAGE = {
    home: { name: 'Risk prediction',
      problem: 'Officers need to know which wards will have dengue trouble in the coming weeks, but reports only show what has already happened.',
      solution: 'Pick a city and a date: the page shows the city risk level and every ward ranked Low to Critical, with the reasons.',
      workflow: 'Choose city, week, warning window (2-12 wk) and an optional rainfall scenario, then press <b>Predict risk</b>. Read the headline, the ward cards and the rainfall-lag chart.',
      ai: 'The saved gradient-boosting model for the chosen horizon predicts expected cases per ward from recent rainfall, temperature, ward profile and case history; cases are mapped to risk bands.',
      impact: 'Turns a 3-8 week head start into a prioritised ward list. Back-tests on past dates are in-sample, so judge accuracy on the Model accuracy page.' },
    map: { name: 'Risk map',
      problem: 'A list of 60 wards is hard to read; officers need to see where risk clusters across the district.',
      solution: 'A tile / orbit map colours every ward by predicted risk and lets you play the forecast week by week.',
      workflow: 'Slide or press <b>Play forecast</b> to move through 1-12 weeks, change the start week or rainfall scenario, and click a ward for its numbers and drivers.',
      ai: 'Runs the same horizon models for all 60 wards at once and bins expected cases into Low / Medium / High / Critical.',
      impact: 'Helps allocate teams and supplies geographically. The tile layout is schematic, not a GIS boundary map - a real ward-boundary map is a planned upgrade.' },
    forecast: { name: 'Forecasts & history',
      problem: 'Planners need to see how cases may evolve week by week and compare it with what was actually reported.',
      solution: 'Charts of predicted cases for 0-12 weeks ahead, recent reported cases and the signals the model relies on.',
      workflow: 'Select a city and horizon, press <b>Update forecast</b>, then read the KPI tiles, the horizon chart, the history chart and the feature-importance bars.',
      ai: 'Totals are the sum of per-ward model predictions; importance comes from the held-out evaluation (seasonality, temperature and rainfall dominate).',
      impact: 'Supports staffing and stock decisions. Importance shows predictive contribution, not cause and effect.' },
    wards: { name: 'Ward explorer',
      problem: 'Each ward has different drainage, sanitation and crowding, so one city-wide message is not enough.',
      solution: 'A searchable ward table ranked by model estimate, with last reported cases, relative priority, rainfall and water-logging.',
      workflow: 'Search a ward ID, compare estimate against last reported cases, then export the table to CSV for field teams.',
      ai: 'Same per-ward predictions as the forecast; priority is the ward\'s percentile within its city.',
      impact: 'Gives field teams a concrete visit list. Priority is relative within the city and is not a clinical risk score.' },
    alerts: { name: 'Alerts',
      problem: 'Busy officers cannot watch every chart; they need the few things that need attention now.',
      solution: 'Automatic alerts generated from the latest prediction - critical wards, rainfall surges and rising trends.',
      workflow: 'Run a prediction; alerts appear here and as a badge in the menu. Open one for the reason, mark as read or mark all read.',
      ai: 'Rules sit on top of the model output (risk level, rainfall change over 4 weeks, ward vulnerability) so every alert is explainable.',
      impact: 'Reduces missed warnings. Alerts are decision support, not official public-health notices.' },
    actions: { name: 'Action plan',
      problem: 'A forecast only helps if it becomes work that gets done.',
      solution: 'A weekly task list generated from the highest-risk wards: larviciding, drain clearance, hospital readiness, community messaging.',
      workflow: 'Review tasks by ward and due date, tick them off as they are done; progress is saved in the browser.',
      ai: 'Tasks are chosen from model risk and ward drivers, following WHO vector-control guidance.',
      impact: 'Links prediction to response and tracks completion. A shared, multi-user task list is a next step.' },
    ask: { name: 'Ask Dengue Watch',
      problem: 'Residents and officers need quick, trustworthy dengue answers in Bangla and English - and urgent help when danger signs appear.',
      solution: 'A bilingual assistant that explains symptoms, warning signs, prevention and care, and answers forecast questions from the live models.',
      workflow: 'Type or tap a question such as "top wards in Gazipur" or "ডেঙ্গুর লক্ষণ কী?". It remembers the city and horizon for follow-ups.',
      ai: 'A rule-based engine (no external LLM) with a WHO-aligned knowledge base, danger-sign triage, and tools that call the forecasting models, so numbers are never invented.',
      impact: 'Scales health education at no per-query cost and surfaces danger signs early. It never diagnoses or gives doses; a clinician should review the content before public use.' },
    accuracy: { name: 'Model accuracy',
      problem: 'Decision-makers should not trust a model without seeing how often it is right or wrong.',
      solution: 'Precision, recall and F1 for outbreak warnings on years the model never saw (2023-2025), for every horizon and alarm threshold.',
      workflow: 'Choose a horizon and slide the alarm threshold to see the trade-off between missed outbreaks and false alarms.',
      ai: 'An outbreak is 10+ cases in a ward-week; predictions above the threshold count as alarms and are compared with reality.',
      impact: 'Builds trust and shows where the model is weak (longer horizons, peak weeks). Re-run after every season to track drift.' },
    method: { name: 'Model & data',
      problem: 'Users need to know what is behind the numbers and what it cannot do.',
      solution: 'A transparent summary of the data, models, validation and limitations.',
      workflow: 'Read the model, data period and held-out metrics; the notice lists the main limitations.',
      ai: 'Tuned Poisson gradient boosting, 13 horizons, trained on 2016-2022 and tested on 2023-2025; long-range uses weather-scenario replay.',
      impact: 'Supports responsible use and peer review. Planned: live data feeds and scheduled retraining.' },
    about: { name: 'About the project' }
  };

  const FUTURE = { name: 'Future forecast 2026+',
    problem: 'The 0-12 week models stop when the data stops, but planners must budget and prepare months ahead.',
    solution: 'A long-range outlook to 2030: expected cases with a plausible range, by week, month and year, for any city or all five.',
    workflow: 'Pick city, dates, and optional rainfall and temperature shifts, then read the weekly curve, monthly and yearly totals and the ward ranking.',
    ai: 'The weather-only model is run once per past weather year (10 scenarios); the average is the forecast and the spread is the range.',
    impact: 'Shows the typical season for budgeting. It cannot say which exact week an outbreak will hit; yearly totals were off by -16% to +26% in held-out years.' };

  const li = (t) => '<li>' + t + '</li>';
  const esc = (s) => s;
  const labels = { problem: 'Problem', solution: 'Solution', workflow: 'Workflow', ai: 'AI approach', impact: 'Impact &amp; next steps' };

  /* ---------------- About page ---------------- */
  function renderAbout() {
    const host = document.getElementById('aboutBody'); if (!host) return;
    host.innerHTML = FIVE.map(([k], i) => {
      const s = PROJECT[k];
      return '<section class="ab-sec" id="ab-' + k + '"><div class="ab-num">' + (i + 1) + '</div><div><h4>' + labels[k] + '</h4><p class="ab-lead">' + s.lead + '</p><ul>' + s.points.map(li).join('') + '</ul></div></section>';
    }).join('');
    const toc = document.getElementById('aboutToc');
    if (toc) toc.innerHTML = FIVE.map(([k]) => '<a href="#about" data-ab="' + k + '">' + labels[k] + '</a>').join('');
    const pages = document.getElementById('aboutPages');
    if (pages) pages.innerHTML = Object.entries(PAGE).filter(([k]) => k !== 'about').map(([k, v]) => '<a class="ab-page" href="#' + k + '"><b>' + v.name + '</b><span>' + v.solution + '</span></a>').join('') +
      '<a class="ab-page" href="future.html"><b>' + FUTURE.name + '</b><span>' + FUTURE.solution + '</span></a>';
  }

  /* ---------------- per-page explainer ---------------- */
  const box = document.getElementById('pageAbout');
  function seen() { try { return JSON.parse(localStorage.getItem('dw.aboutSeen') || '{}'); } catch (_) { return {}; } }
  function mark(pg) { try { const s = seen(); s[pg] = 1; localStorage.setItem('dw.aboutSeen', JSON.stringify(s)); } catch (_) {} }
  function renderPage() {
    if (!box) return;
    let pg = (location.hash || '#home').slice(1); if (!PAGE[pg]) pg = 'home';
    if (pg === 'about') { box.hidden = true; return; }
    box.hidden = false;
    const d = PAGE[pg], first = !seen()[pg];
    box.innerHTML = '<details' + (first ? ' open' : '') + '><summary><span class="pa-ico">i</span><span><b>What does this page do?</b><small>' + d.name + ' &middot; problem, solution, workflow, AI and impact</small></span></summary>' +
      '<dl class="pa-grid">' + FIVE.map(([k]) => '<div class="pa-item"><dt>' + labels[k] + '</dt><dd>' + d[k] + '</dd></div>').join('') + '</dl>' +
      '<a class="pa-more" href="#about">Read the full project story &rarr;</a></details>';
    box.querySelector('details').addEventListener('toggle', (e) => { if (!e.target.open) mark(pg); });
    if (first) mark(pg);
  }
  renderAbout(); renderPage();
  window.addEventListener('hashchange', renderPage);

  /* expose for future.html */
  window.DW_ABOUT = { FUTURE, labels, FIVE };
})();
