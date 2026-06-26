// WealthOS Unified Investing Dashboard - App Core Logic

// 1. Initial State Definition
const state = {
  user: {
    fullName: "Arpit Agarwal",
    firstName: "Arpit",
    phone: "+91 ••••• ••982",
    avatar: "AA",
    riskProfile: "Moderate", // Conservative, Moderate, Aggressive
    cashBalance: 45000,       // Available uninvested cash in wallet
  },
  
  holdings: [
    { id: "h1", name: "HDFC Nifty 50 Index Fund", shortName: "HDFCN50", category: "mf", subCategory: "index", invested: 120000, currentValue: 138500, units: 1045.28, returnPct: 15.42 },
    { id: "h2", name: "Parag Parikh Flexi Cap Fund Direct", shortName: "PPFCF", category: "mf", subCategory: "equity", invested: 85000, currentValue: 98200, units: 681.94, returnPct: 15.53 },
    { id: "h3", name: "Tata Motors Limited Direct Equity", shortName: "TATA", category: "equity", subCategory: "equity", invested: 72000, currentValue: 88410, units: 95.0, returnPct: 22.79 },
    { id: "h4", name: "Reliance Industries Limited", shortName: "RELIANCE", category: "equity", subCategory: "equity", invested: 66000, currentValue: 69200, units: 28.0, returnPct: 4.85 },
    { id: "h5", name: "Digital Gold (PhonePe Safegold)", shortName: "GOLD", category: "gold", subCategory: "gold", invested: 30000, currentValue: 34000, units: 5.86, returnPct: 13.33 },
    { id: "h6", name: "SBI Tax Saving FD - 5 Year", shortName: "SBIFD", category: "fd", subCategory: "debt", invested: 40000, currentValue: 40000, units: 1.0, returnPct: 0.00 },
    { id: "h7", name: "NPS Tier 1 Scheme E (SBI)", shortName: "NPS", category: "nps", subCategory: "hybrid", invested: 15000, currentValue: 14000, units: 150.0, returnPct: -6.67 },
    { id: "h8", name: "Bitcoin (CoinDCX)", shortName: "BTC", category: "crypto", subCategory: "crypto", invested: 10000, currentValue: 9500, units: 0.0035, returnPct: -5.00 }
  ],
  
  transactions: [
    { type: "BUY", assetName: "Parag Parikh Flexi Cap Fund", date: "Today 10:15 AM", category: "mf", amount: 5000, units: 38.21, price: 130.85, typeLabel: "SIP Execution" },
    { type: "BUY", assetName: "Reliance Industries Ltd", date: "June 20, 2026", category: "equity", amount: 12500, units: 5.0, price: 2500.0, typeLabel: "Manual Order" },
    { type: "BUY", assetName: "Digital Gold (Safegold)", date: "June 15, 2026", category: "gold", amount: 2000, units: 0.32, price: 6250.0, typeLabel: "SIP Execution" },
    { type: "SELL", assetName: "Tata Motors Ltd", date: "June 10, 2026", category: "equity", amount: 15000, units: 20.0, price: 750.0, typeLabel: "Manual Order" },
    { type: "BUY", assetName: "SBI Tax Saving FD", date: "June 01, 2026", category: "fd", amount: 40000, units: 1.0, price: 40000.0, typeLabel: "Manual Order" }
  ],
  
  goals: [
    { id: "g1", name: "Europe Trip", target: 300000, year: 2027, saved: 140000, icon: "trip", monthlySip: 5000 },
    { id: "g2", name: "Home Downpayment", target: 8000000, year: 2035, saved: 2240000, icon: "house", monthlySip: 30000 },
    { id: "g3", name: "Tesla Electric Vehicle", target: 1200000, year: 2030, saved: 336000, icon: "car", monthlySip: 10000 }
  ],
  
  notifications: [
    { id: "n1", type: "warning", title: "Rebalancing needed", description: "Equity represents 58% of your portfolio, drifting past your target of 50%. Sell equity or buy debt to align.", time: "Today 9:42 AM", unread: true },
    { id: "n2", type: "success", title: "SIP Executed Successfully", description: "Your monthly SIP of ₹5,000 in Parag Parikh Flexi Cap Fund was processed via Auto-Debit.", time: "Today 10:15 AM", unread: true },
    { id: "n3", type: "success", title: "Milestone reached!", description: "Your Europe Trip goal is now 46% funded! You are ahead of schedule by 1 month.", time: "Yesterday", unread: true },
    { id: "n4", type: "info", title: "Market news update", description: "SEBI introduces new framework for mutual fund expense ratio caps. Overall impact is neutral.", time: "June 23, 2026", unread: false }
  ],
  
  consents: [
    { id: "c1", accountName: "SBI Savings Account", sourceType: "Account Aggregator", status: "Linked", logo: "SBI" },
    { id: "c2", accountName: "Zerodha Demat Account", sourceType: "Broking APIs", status: "Linked", logo: "Z" },
    { id: "c3", accountName: "MF Central Account", sourceType: "Mutual Fund Registrar", status: "Linked", logo: "MF" },
    { id: "c4", accountName: "PhonePe SafeGold Wallet", sourceType: "Digital Gold API", status: "Linked", logo: "PP" }
  ],
  
  notificationSettings: [
    { id: "s1", name: "Rebalancing alerts", desc: "Trigger notifications when asset allocation drifts more than 5% from target", active: true },
    { id: "s2", name: "SIP reminders", desc: "Send SMS & WhatsApp alerts 3 days before any SIP execution date", active: true },
    { id: "s3", name: "Market news updates", desc: "Receive real-time notifications about major regulatory actions & movements", active: false },
    { id: "s4", name: "Goal milestone achievements", desc: "Notify when goal savings targets hit key percentages (e.g. 25%, 50%, 75%)", active: true },
    { id: "s5", name: "Price alert indicators", desc: "Send triggers when watchlisted stocks change price by more than 3% in a day", active: true }
  ],
  
  explainers: [
    { category: "basics", title: "What is SIP and how does it beat market timing?", readTime: "2 min read", difficulty: "Beginner" },
    { category: "returns", title: "XIRR vs CAGR — which one actually matters?", readTime: "3 min read", difficulty: "Intermediate" },
    { category: "basics", title: "How inflation silently eats your savings over 20 years", readTime: "3 min read", difficulty: "Beginner" },
    { category: "tax", title: "ELSS vs PPF vs NPS — which saves more tax?", readTime: "4 min read", difficulty: "Intermediate" },
    { category: "stocks", title: "How to read a P/E ratio without getting confused", readTime: "3 min read", difficulty: "Beginner" },
    { category: "mf", title: "What does a mutual fund factsheet actually tell you?", readTime: "4 min read", difficulty: "Intermediate" }
  ],
  
  fundsCatalog: [
    { id: "f1", name: "HDFC Nifty 50 Index Fund", category: "mf", subCategory: "index", risk: "High", ret1y: "16.8%", ret3y: "14.2%", aum: "8,940 Cr", bg: "#1e3a8a", initials: "HDFC" },
    { id: "f2", name: "Parag Parikh Flexi Cap Fund", category: "mf", subCategory: "equity", risk: "High", ret1y: "21.4%", ret3y: "17.8%", aum: "48,500 Cr", bg: "#065f46", initials: "PP" },
    { id: "f3", name: "SBI Bluechip Direct Fund", category: "mf", subCategory: "equity", risk: "High", ret1y: "14.2%", ret3y: "13.6%", aum: "38,200 Cr", bg: "#b91c1c", initials: "SBI" },
    { id: "f4", name: "ICICI Prudential Debt Fund", category: "mf", subCategory: "debt", risk: "Low-Moderate", ret1y: "7.2%", ret3y: "6.9%", aum: "12,400 Cr", bg: "#701a75", initials: "ICICI" },
    { id: "f5", name: "Kotak Equity Hybrid Fund", category: "mf", subCategory: "hybrid", risk: "Moderately High", ret1y: "12.8%", ret3y: "11.4%", aum: "15,800 Cr", bg: "#a21caf", initials: "K" },
    { id: "f6", name: "Quant Tax Saver Fund (ELSS)", category: "mf", subCategory: "elss", risk: "Very High", ret1y: "25.6%", ret3y: "22.3%", aum: "9,600 Cr", bg: "#854d0e", initials: "Q" },
    { id: "f7", name: "Tata Motors Limited Direct Equity", category: "equity", subCategory: "equity", risk: "High", ret1y: "48.2%", ret3y: "32.4%", aum: "98,200 Cr (Mcap)", bg: "#0284c7", initials: "TM" },
    { id: "f8", name: "Reliance Industries Direct Equity", category: "equity", subCategory: "equity", risk: "Moderate-High", ret1y: "11.6%", ret3y: "12.8%", aum: "18,40,000 Cr (Mcap)", bg: "#1e40af", initials: "RIL" },
    { id: "f9", name: "MMTC Digital Gold (24K)", category: "gold", subCategory: "gold", risk: "Low", ret1y: "14.8%", ret3y: "11.2%", aum: "PhonePe SafeGold", bg: "#b45309", initials: "DG" },
    { id: "f10", name: "HDFC Bank FD - 1 Year", category: "fd", subCategory: "debt", risk: "No risk", ret1y: "7.1%", ret3y: "7.0%", aum: "HDFC Bank", bg: "#312e81", initials: "HDFD" }
  ],
  
  quizQuestions: [
    {
      q: "What does XIRR capture that CAGR (Compound Annual Growth Rate) ignores?",
      a: "Irregular cash flows (SIPs/withdrawals) at different dates",
      options: [
        "Dividends re-invested automatically",
        "Irregular cash flows (SIPs/withdrawals) at different dates",
        "Impact of expense ratio charges",
        "The effect of capital gains tax"
      ],
      feedback: "XIRR stands for Extended Internal Rate of Return. Unlike CAGR, which only considers start and end values over a duration, XIRR factors in the exact dates of multiple cash inflows and outflows, making it correct for SIP evaluations."
    },
    {
      q: "If an equity investment drifts from 50% to 65% of your portfolio due to a bull run, what is the best risk mitigation action?",
      a: "Rebalance by selling some equity and buying debt",
      options: [
        "Hold it all; winners keep winning",
        "Sell everything and sit in cash",
        "Rebalance by selling some equity and buying debt",
        "Double down on riskier microcap stocks"
      ],
      feedback: "Rebalancing returns your portfolio back to its target asset allocation, keeping your risk alignment aligned with your risk tolerance profile instead of drifting into an over-leveraged state."
    },
    {
      q: "How does inflation affect a fixed deposit (FD) earning 7% interest when inflation is at 6%?",
      a: "Your real rate of return is roughly 1%",
      options: [
        "Your purchasing power grows by 7%",
        "Your real rate of return is roughly 1%",
        "You actually lose money in nominal terms",
        "Inflation doesn't affect fixed interest assets"
      ],
      feedback: "The real rate of return = Nominal interest - Inflation. Earning 7% nominally in an economy with 6% inflation means your purchasing power only increases by about 1%."
    }
  ],
  
  activeQuizIndex: 0,
  quizAnswersRecorded: []
};

// 2. Global Variables for UI components
let portfolioChart = null;

// 3. Page Switching & Navigation
let isAutoScrolling = false;

function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const pages = document.querySelectorAll('.page');
  
  // Intercept normal tag clicks
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPageId = item.getAttribute('data-page');
      isAutoScrolling = true;
      navigateToPage(targetPageId);
      setTimeout(() => {
        isAutoScrolling = false;
      }, 800);
    });
  });

  // Handle in-page navigation clicks (elements with data-goto)
  document.addEventListener('click', (e) => {
    const targetLink = e.target.closest('[data-goto]');
    if (targetLink) {
      e.preventDefault();
      const pageId = targetLink.getAttribute('data-goto');
      isAutoScrolling = true;
      navigateToPage(pageId);
      setTimeout(() => {
        isAutoScrolling = false;
      }, 800);
    }
  });

  // Handle URL hashes on reload
  window.addEventListener('load', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(`${hash}-page`)) {
      navigateToPage(hash);
    } else {
      navigateToPage('hero');
    }
    renderAll();
    initScrollSpy();
  });
}

function navigateToPage(pageId) {
  const navItems = document.querySelectorAll('.nav-item');
  const targetSection = document.getElementById(`${pageId}-page`);
  
  // Format Title
  let formattedTitle = pageId.charAt(0).toUpperCase() + pageId.slice(1);
  if (pageId === 'buddy') formattedTitle = 'AI Finance Buddy';
  if (pageId === 'hero') formattedTitle = 'Home';
  
  const pageTitleElement = document.getElementById('current-page-title');
  if (pageTitleElement) {
    pageTitleElement.textContent = formattedTitle;
  }
  
  // Update active nav link
  navItems.forEach(nav => {
    nav.classList.remove('active');
    if (nav.getAttribute('data-page') === pageId) {
      nav.classList.add('active');
    }
  });

  // Set window hash silently without page trigger loop
  window.history.pushState(null, null, `#${pageId}`);

  // Scroll to section
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  // Page specific re-initializations
  if (pageId === 'portfolio') {
    initPortfolioChart();
  }
}

function initScrollSpy() {
  const sections = document.querySelectorAll('.page');
  const navItems = document.querySelectorAll('.nav-item');
  
  const options = {
    root: null,
    rootMargin: '-85px 0px -60% 0px', // trigger when section occupies top area
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    if (isAutoScrolling) return; // skip updating while smooth scrolling from click
    
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id.replace('-page', '');
        
        // Highlight corresponding nav item
        navItems.forEach(item => {
          if (item.getAttribute('data-page') === id) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
        
        let formattedTitle = id.charAt(0).toUpperCase() + id.slice(1);
        if (id === 'buddy') formattedTitle = 'AI Finance Buddy';
        if (id === 'hero') formattedTitle = 'Home';
        
        const pageTitleElement = document.getElementById('current-page-title');
        if (pageTitleElement) {
          pageTitleElement.textContent = formattedTitle;
        }
      }
    });
  }, options);
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

// 4. Calculations Helpers
function formatRupee(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
}

// Helper to calculate total portfolio numbers
function calculatePortfolioMetrics() {
  let totalVal = 0;
  let totalInv = 0;
  
  state.holdings.forEach(h => {
    totalVal += h.currentValue;
    totalInv += h.invested;
  });
  
  const overallGainVal = totalVal - totalInv;
  const overallGainPct = (overallGainVal / totalInv) * 100;
  
  return {
    totalVal,
    totalInv,
    overallGainVal,
    overallGainPct
  };
}

// 5. Render Core Components

// A. Update Dashboard Numbers and Stats
function renderDashboard() {
  const metrics = calculatePortfolioMetrics();
  
  // Stat Card 1
  document.getElementById('dashboard-total-value').textContent = formatRupee(metrics.totalVal);
  
  // Stat Card 2
  document.getElementById('dashboard-total-invested').textContent = formatRupee(metrics.totalInv);
  const assetClassesCount = new Set(state.holdings.map(h => h.category)).size;
  document.getElementById('dashboard-asset-count').textContent = `${assetClassesCount} asset classes`;
  
  // Stat Card 3
  const overallGainPctElement = document.getElementById('dashboard-overall-gain-pct');
  overallGainPctElement.textContent = `${metrics.overallGainPct >= 0 ? '+' : ''}${metrics.overallGainPct.toFixed(2)}%`;
  overallGainPctElement.className = `stat-value ${metrics.overallGainPct >= 0 ? 'color-success' : 'color-danger'}`;
  
  const overallGainAbsElement = document.getElementById('dashboard-overall-gain-abs');
  overallGainAbsElement.textContent = `${metrics.overallGainVal >= 0 ? '+' : ''}${formatRupee(metrics.overallGainVal)}`;
  overallGainAbsElement.className = `badge ${metrics.overallGainVal >= 0 ? 'badge-success' : 'badge-danger'}`;
  
  // Render Nudge closed / open state
  const isNudgeClosed = localStorage.getItem('nudge-dismissed-rebalance') === 'true';
  const nudgeCard = document.getElementById('dashboard-nudge');
  if (isNudgeClosed) {
    nudgeCard.style.display = 'none';
  } else {
    nudgeCard.style.display = 'flex';
  }
  
  // Render Allocation Segmented Bar
  renderAssetAllocationBar(metrics.totalVal);
  
  // Render Top Holdings (max 5)
  renderTopHoldings();
  
  // Render Recent Transactions (max 5)
  renderRecentTransactions();
}

function renderAssetAllocationBar(totalPortfolioValue) {
  const barContainer = document.getElementById('allocation-bar-container');
  const legendContainer = document.getElementById('allocation-list-legend');
  
  barContainer.innerHTML = '';
  legendContainer.innerHTML = '';
  
  // Aggregate by category
  const categories = {
    equity: { name: "Equities", val: 0, color: "eq" },
    mf: { name: "Mutual Funds", val: 0, color: "mf" },
    gold: { name: "Digital Gold", val: 0, color: "gold" },
    fd: { name: "Fixed Deposits", val: 0, color: "fd" },
    nps: { name: "NPS Benefits", val: 0, color: "nps" },
    crypto: { name: "Crypto", val: 0, color: "crypto" }
  };
  
  state.holdings.forEach(h => {
    if (categories[h.category]) {
      categories[h.category].val += h.currentValue;
    }
  });
  
  Object.keys(categories).forEach(catKey => {
    const cat = categories[catKey];
    if (cat.val > 0) {
      const pct = (cat.val / totalPortfolioValue) * 100;
      
      // 1. Draw segment in bar
      const seg = document.createElement('div');
      seg.className = `allocation-seg ${cat.color}`;
      seg.style.width = `${pct}%`;
      seg.setAttribute('data-percentage', pct.toFixed(0));
      barContainer.appendChild(seg);
      
      // 2. Draw item in legend
      const item = document.createElement('div');
      item.className = 'allocation-item';
      item.innerHTML = `
        <div class="allocation-item-label">
          <span class="allocation-dot ${cat.color}"></span>
          <span>${cat.name}</span>
        </div>
        <span class="allocation-val">${pct.toFixed(1)}%</span>
      `;
      legendContainer.appendChild(item);
    }
  });
}

function renderTopHoldings() {
  const container = document.getElementById('dashboard-holdings-list');
  container.innerHTML = '';
  
  // Sort holdings descending by value
  const sortedHoldings = [...state.holdings]
    .sort((a, b) => b.currentValue - a.currentValue)
    .slice(0, 5);
    
  sortedHoldings.forEach(h => {
    const row = document.createElement('div');
    row.className = 'holding-row';
    row.innerHTML = `
      <div class="holding-info">
        <div class="holding-avatar ${h.category}">${h.shortName.substring(0, 4)}</div>
        <div class="holding-details">
          <span class="holding-name">${h.name}</span>
          <span class="holding-sub">${h.category.toUpperCase()} · ${h.units.toFixed(2)} units</span>
        </div>
      </div>
      <div class="holding-right">
        <div class="holding-value">
          <div class="holding-val-num">${formatRupee(h.currentValue)}</div>
          <span class="badge ${h.returnPct >= 0 ? 'badge-success' : 'badge-danger'}" style="font-size:0.68rem; margin-top:2px;">
            ${h.returnPct >= 0 ? '+' : ''}${h.returnPct.toFixed(1)}%
          </span>
        </div>
      </div>
    `;
    container.appendChild(row);
  });
}

function renderRecentTransactions() {
  const container = document.getElementById('dashboard-transactions-list');
  container.innerHTML = '';
  
  const recent = state.transactions.slice(0, 5);
  
  recent.forEach(t => {
    const row = document.createElement('div');
    row.className = 'transaction-row';
    
    const isBuy = t.type === 'BUY';
    const badgeClass = isBuy ? 'badge-success' : 'badge-danger';
    
    row.innerHTML = `
      <div class="transaction-info">
        <div class="transaction-avatar" style="background:${isBuy ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'}; color:${isBuy ? 'var(--color-success)' : 'var(--color-danger)'}; font-size:0.75rem; border:1px solid ${isBuy ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}">
          ${t.type}
        </div>
        <div class="transaction-details">
          <span class="transaction-name">${t.assetName}</span>
          <span class="transaction-sub">${t.date} · ${t.typeLabel}</span>
        </div>
      </div>
      <div class="transaction-right">
        <div class="transaction-val-text">
          <div class="transaction-val-num" style="color:${isBuy ? 'var(--color-success)' : 'var(--color-danger)'}">
            ${isBuy ? '+' : '-'}${formatRupee(t.amount)}
          </div>
          <span class="transaction-sub" style="font-size:0.68rem;">
            ${t.units} units at ${formatRupee(t.price)}
          </span>
        </div>
      </div>
    `;
    container.appendChild(row);
  });
}

// B. Portfolio View Render
function renderPortfolioBreakdown() {
  const tbody = document.getElementById('portfolio-holdings-table-body');
  tbody.innerHTML = '';
  
  // Sort settings
  const sortSelect = document.getElementById('portfolio-sort-select');
  const activeSort = sortSelect ? sortSelect.value : 'value';
  
  // Filter settings
  const activeTab = document.querySelector('.filter-tab.active');
  const activeFilter = activeTab ? activeTab.getAttribute('data-filter') : 'all';
  
  let filtered = [...state.holdings];
  if (activeFilter !== 'all') {
    filtered = filtered.filter(h => h.category === activeFilter);
  }
  
  // Apply Sort
  if (activeSort === 'value') {
    filtered.sort((a, b) => b.currentValue - a.currentValue);
  } else if (activeSort === 'return') {
    filtered.sort((a, b) => b.returnPct - a.returnPct);
  } else if (activeSort === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }
  
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:32px; color:var(--text-muted);">No holdings in this asset class.</td></tr>`;
    return;
  }
  
  filtered.forEach(h => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="portfolio-asset-info">
          <div class="portfolio-asset-logo ${h.category}">${h.shortName.substring(0, 4)}</div>
          <div>
            <div style="font-weight:600;">${h.name}</div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:2px;">${h.category.toUpperCase()}</div>
          </div>
        </div>
      </td>
      <td style="text-align:right;">
        <div style="font-weight:600;">${h.units.toFixed(2)}</div>
        <div style="font-size:0.72rem; color:var(--text-secondary); margin-top:2px;">Invested: ${formatRupee(h.invested)}</div>
      </td>
      <td style="text-align:right; font-weight:700;">
        ${formatRupee(h.currentValue)}
      </td>
      <td style="text-align:right;">
        <span class="badge ${h.returnPct >= 0 ? 'badge-success' : 'badge-danger'}">
          ${h.returnPct >= 0 ? '+' : ''}${h.returnPct.toFixed(2)}%
        </span>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// C. Invest View Render
function renderInvestCatalog() {
  const grid = document.getElementById('invest-funds-grid');
  grid.innerHTML = '';
  
  // Category tab
  const activeTab = document.querySelector('#invest-category-tabs .filter-tab.active');
  const category = activeTab ? activeTab.getAttribute('data-category') : 'mf';
  
  // Sub filter chip
  const activeChip = document.querySelector('#invest-sub-filters .chip-btn.active');
  const subFilter = activeChip ? activeChip.getAttribute('data-sub') : 'all';
  
  let catalog = state.fundsCatalog.filter(f => f.category === category);
  
  if (category === 'mf' && subFilter !== 'all') {
    catalog = catalog.filter(f => f.subCategory === subFilter);
  }
  
  catalog.forEach((fund, index) => {
    const card = document.createElement('div');
    
    // Bento grid logic: first card is large featured, others fill around it
    let bentoClass = 'b-c2 b-r1'; // default: 1/3 width, 1 row
    if (index === 0) {
      bentoClass = 'b-c4 b-r2 bento-accent-sky'; // featured: 2/3 width, 2 rows
    }
    
    card.className = `glass-card fund-card ${bentoClass}`;
    card.innerHTML = `
      <div>
        <div class="fund-header">
          <div class="fund-logo" style="background:${fund.bg}">${fund.initials}</div>
          <div class="fund-identity">
            <h5 class="fund-title">${fund.name}</h5>
            <span class="fund-category">${fund.category.toUpperCase()} · ${fund.risk}</span>
          </div>
        </div>
        
        <div class="fund-grid-stats">
          <div class="fund-stat-item">
            <span class="fund-stat-label">1Y return</span>
            <span class="fund-stat-val up">${fund.ret1y}</span>
          </div>
          <div class="fund-stat-item">
            <span class="fund-stat-label">3Y return</span>
            <span class="fund-stat-val up">${fund.ret3y}</span>
          </div>
          <div class="fund-stat-item">
            <span class="fund-stat-label">AUM</span>
            <span class="fund-stat-val">${fund.aum}</span>
          </div>
        </div>
      </div>
      
      <button class="btn btn-primary invest-buy-btn" data-fund-id="${fund.id}" style="width:100%; justify-content:center;">
        Invest Now
      </button>
    `;
    grid.appendChild(card);
  });
  
  // Setup CTA events
  document.querySelectorAll('.invest-buy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const fundId = btn.getAttribute('data-fund-id');
      const fund = state.fundsCatalog.find(f => f.id === fundId);
      openInvestCheckoutModal(fund);
    });
  });
}

// D. Goals View Render
function renderGoalsGrid() {
  const grid = document.getElementById('goals-cards-grid');
  grid.innerHTML = '';
  
  let totalActiveCount = state.goals.length;
  let totalTracked = state.goals.reduce((acc, g) => acc + g.target, 0);
  
  document.getElementById('goals-summary-text').textContent = `Active Targets: ${totalActiveCount} goals`;
  
  state.goals.forEach(goal => {
    const pct = Math.min((goal.saved / goal.target) * 100, 100);
    const card = document.createElement('div');
    card.className = 'glass-card goal-card';
    card.innerHTML = `
      <div class="goal-header">
        <div>
          <h5 class="goal-title">${goal.name}</h5>
          <span class="goal-target">Target year: ${goal.year}</span>
        </div>
        <div class="goal-icon-wrapper ${goal.icon}">
          ${getGoalEmoji(goal.icon)}
        </div>
      </div>
      
      <div class="goal-progress-box">
        <div class="goal-progress-stats">
          <span class="goal-percentage">${pct.toFixed(0)}% saved</span>
          <span class="goal-saved-ratio">${formatRupee(goal.saved)} of ${formatRupee(goal.target)}</span>
        </div>
        <div class="goal-progress-bar">
          <div class="goal-progress-fill ${goal.icon}" style="width:${pct}%;"></div>
        </div>
      </div>
      
      <div class="goal-footer">
        <div class="goal-sip-linked">SIP: <span>${formatRupee(goal.monthlySip)}/mo</span></div>
        <button class="btn btn-secondary add-goal-savings-btn" data-goal-id="${goal.id}" style="padding:6px 12px; font-size:0.75rem;">
          Add Capital
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
  
  // CTA for goal savings additions
  document.querySelectorAll('.add-goal-savings-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const gId = btn.getAttribute('data-goal-id');
      const goal = state.goals.find(g => g.id === gId);
      
      const amtStr = prompt(`Enter savings amount to deploy for target: ${goal.name}`, "10000");
      const amt = parseFloat(amtStr);
      if (!isNaN(amt) && amt > 0) {
        goal.saved += amt;
        
        // Append transaction & notify
        state.transactions.unshift({
          type: "BUY",
          assetName: `${goal.name} (Goal Savings Contribution)`,
          date: "Just Now",
          category: "mf",
          amount: amt,
          units: 1,
          price: amt,
          typeLabel: "Goal Contribution"
        });
        
        state.notifications.unshift({
          id: `n_goal_${Date.now()}`,
          type: "success",
          title: "Goal Updated",
          description: `Successfully allocated ${formatRupee(amt)} to your ${goal.name} target.`,
          time: "Just Now",
          unread: true
        });
        
        // Check milestone trigger
        if (goal.saved >= goal.target) {
          state.notifications.unshift({
            id: `n_goal_comp_${Date.now()}`,
            type: "success",
            title: `Goal Achieved: ${goal.name}!`,
            description: `Congratulations! You have completed your target goal savings of ${formatRupee(goal.target)}.`,
            time: "Just Now",
            unread: true
          });
        }
        
        renderAll();
      }
    });
  });
}

function getGoalEmoji(icon) {
  if (icon === 'trip') return '✈️';
  if (icon === 'house') return '🏠';
  if (icon === 'car') return '🚗';
  return '🌴';
}

// E. Learn Page View Render
function renderLearnHub() {
  // Render Explainers List
  const explainersGrid = document.getElementById('explainers-grid');
  if (explainersGrid) {
    explainersGrid.innerHTML = '';
    state.explainers.forEach(art => {
      const card = document.createElement('div');
      card.className = 'glass-card explainer-card';
      card.innerHTML = `
        <div class="explainer-meta">
          <span class="explainer-cat ${art.category}">${art.category.toUpperCase()}</span>
          <span class="badge badge-info" style="font-size:0.6rem;">${art.difficulty}</span>
        </div>
        <h5 class="explainer-title">${art.title}</h5>
        <div class="explainer-footer">
          <span>${art.readTime}</span>
          <a href="#" class="card-link read-article-btn">Read Now <i data-lucide="arrow-right" style="width:12px;"></i></a>
        </div>
      `;
      explainersGrid.appendChild(card);
    });
  }
}

// F. Notifications Page Render
function renderNotifications() {
  const feed = document.getElementById('notifications-feed');
  if (!feed) return;
  
  feed.innerHTML = '';
  
  let unreadCount = 0;
  state.notifications.forEach(n => {
    if (n.unread) unreadCount++;
    
    const row = document.createElement('div');
    row.className = `notif-row ${n.unread ? 'unread' : ''}`;
    
    let emoji = '🔔';
    if (n.type === 'warning') emoji = '⚠️';
    if (n.type === 'success') emoji = '✅';
    if (n.type === 'info') emoji = 'ℹ️';
    
    row.innerHTML = `
      <div class="notif-icon-box ${n.type}">
        <span>${emoji}</span>
      </div>
      <div class="notif-body">
        <div class="notif-title-row">
          <strong class="notif-title">${n.title}</strong>
          ${n.unread ? `<span class="badge badge-warning" style="font-size:0.6rem; padding: 2px 6px;">New</span>` : ''}
        </div>
        <div class="notif-desc">${n.description}</div>
        <div class="notif-time">${n.time}</div>
      </div>
    `;
    feed.appendChild(row);
  });
  
  // Update sidebar counters
  const notifCountBadge = document.getElementById('sidebar-notif-count');
  const topbarBellDot = document.getElementById('topbar-bell-dot');
  
  if (unreadCount > 0) {
    if (notifCountBadge) {
      notifCountBadge.textContent = unreadCount;
      notifCountBadge.style.display = 'block';
    }
    if (topbarBellDot) topbarBellDot.style.display = 'block';
  } else {
    if (notifCountBadge) notifCountBadge.style.display = 'none';
    if (topbarBellDot) topbarBellDot.style.display = 'none';
  }
}

// G. Profile View Render
function renderProfile() {
  // Render linked accounts
  const container = document.getElementById('linked-accounts-container');
  if (container) {
    container.innerHTML = '';
    state.consents.forEach(acc => {
      const row = document.createElement('div');
      row.className = 'linked-account-row';
      row.innerHTML = `
        <div class="linked-account-info">
          <div class="linked-account-logo">${acc.logo}</div>
          <div>
            <div class="linked-account-name">${acc.accountName}</div>
            <div class="linked-account-source">${acc.sourceType}</div>
          </div>
        </div>
        <span class="badge badge-success">Linked</span>
      `;
      container.appendChild(row);
    });
  }
  
  // Render notifications setting toggles
  const settingsContainer = document.getElementById('notification-settings-list');
  if (settingsContainer) {
    settingsContainer.innerHTML = '';
    state.notificationSettings.forEach(set => {
      const row = document.createElement('div');
      row.className = 'toggle-setting-row';
      row.innerHTML = `
        <div class="toggle-setting-info">
          <span class="toggle-setting-name">${set.name}</span>
          <span class="toggle-setting-desc">${set.desc}</span>
        </div>
        <label class="switch">
          <input type="checkbox" ${set.active ? 'checked' : ''} class="profile-setting-checkbox" data-setting-id="${set.id}">
          <span class="slider"></span>
        </label>
      `;
      settingsContainer.appendChild(row);
    });
    
    // Bind toggle events
    document.querySelectorAll('.profile-setting-checkbox').forEach(box => {
      box.addEventListener('change', () => {
        const setVal = box.checked;
        const setId = box.getAttribute('data-setting-id');
        const settingObj = state.notificationSettings.find(s => s.id === setId);
        settingObj.active = setVal;
      });
    });
  }
  
  // User values on profile view
  const titleLetters = state.user.fullName.split(' ').map(n => n.charAt(0)).join('');
  document.getElementById('profile-avatar-letters').textContent = titleLetters;
  document.getElementById('profile-full-name').textContent = state.user.fullName;
  document.getElementById('profile-masked-phone').textContent = state.user.phone;
  
  // Dynamic Risk Profile descriptions
  const riskLabel = document.getElementById('profile-risk-label');
  const riskDesc = document.getElementById('profile-risk-desc');
  if (riskLabel && riskDesc) {
    riskLabel.className = `risk-level-badge ${state.user.riskProfile.toLowerCase()}`;
    riskLabel.textContent = `${state.user.riskProfile} Risk Profile`;
    
    if (state.user.riskProfile === 'Conservative') {
      riskDesc.textContent = "Your asset allocation targets steady growth and capital preservation. Your suggested model allocation is 30% equities / index funds, 60% FDs & debt instruments, and 10% gold / hedge assets.";
    } else if (state.user.riskProfile === 'Moderate') {
      riskDesc.textContent = "You seek balanced returns over a medium term. Suggested allocation comprises 50% equities / direct funds, 30% Fixed Deposits & government bonds, and 20% gold & alternate sectors.";
    } else {
      riskDesc.textContent = "You focus on long-term compound gains, accepting temporary high volatility. Model allocation recommends 75% equity, 15% debt & bonds, and 10% crypto or digital gold.";
    }
  }
}

// Main overall redraw router
function renderAll() {
  renderDashboard();
  renderPortfolioBreakdown();
  renderInvestCatalog();
  renderGoalsGrid();
  renderLearnHub();
  renderNotifications();
  renderProfile();
  lucide.createIcons();
}

// 6. Interactive Calculators Setup
const calculators = {
  sip: {
    title: "SIP Calculator",
    inputs: [
      { id: "sip-amount", label: "Monthly Deposit (INR)", min: 500, max: 100000, val: 10000, suffix: "₹" },
      { id: "sip-years", label: "Investment Horizon (Years)", min: 1, max: 30, val: 10, suffix: "yrs" },
      { id: "sip-returns", label: "Expected Annual Returns (%)", min: 1, max: 25, val: 12, suffix: "%" }
    ],
    calc: () => {
      const p = parseFloat(document.getElementById('calc-sip-amount').value);
      const yrs = parseFloat(document.getElementById('calc-sip-years').value);
      const r = parseFloat(document.getElementById('calc-sip-returns').value);
      
      const n = yrs * 12;
      const i = (r / 100) / 12;
      
      const invested = p * n;
      const maturity = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      const gain = maturity - invested;
      
      return {
        heroLabel: "Maturity Value",
        heroValue: formatRupee(maturity),
        rows: [
          { label: "Total Deployed capital", val: formatRupee(invested) },
          { label: "Net Investment Gain", val: formatRupee(gain) }
        ]
      };
    }
  },
  cagr: {
    title: "CAGR Calculator",
    inputs: [
      { id: "cagr-initial", label: "Initial Outlay (INR)", min: 1000, max: 10000000, val: 100000, suffix: "₹" },
      { id: "cagr-final", label: "Maturity Value (INR)", min: 2000, max: 20000000, val: 250000, suffix: "₹" },
      { id: "cagr-years", label: "Investment Term (Years)", min: 1, max: 20, val: 5, suffix: "yrs" }
    ],
    calc: () => {
      const init = parseFloat(document.getElementById('calc-cagr-initial').value);
      const fin = parseFloat(document.getElementById('calc-cagr-final').value);
      const yrs = parseFloat(document.getElementById('calc-cagr-years').value);
      
      const cagr = (Math.pow((fin / init), (1 / yrs)) - 1) * 100;
      
      return {
        heroLabel: "Annualised Return (CAGR)",
        heroValue: `${cagr.toFixed(2)}%`,
        rows: [
          { label: "Absolute Gains", val: formatRupee(fin - init) },
          { label: "Timeframe Period", val: `${yrs} years` }
        ]
      };
    }
  },
  inflation: {
    title: "Inflation Impact Calculator",
    inputs: [
      { id: "inf-amount", label: "Current Cost of Living (INR)", min: 10000, max: 2000000, val: 50000, suffix: "₹" },
      { id: "inf-years", label: "Horizon Time (Years)", min: 1, max: 30, val: 15, suffix: "yrs" },
      { id: "inf-rate", label: "Estimated Inflation Rate (%)", min: 1, max: 15, val: 6, suffix: "%" }
    ],
    calc: () => {
      const p = parseFloat(document.getElementById('calc-inf-amount').value);
      const yrs = parseFloat(document.getElementById('calc-inf-years').value);
      const rate = parseFloat(document.getElementById('calc-inf-rate').value);
      
      const finalCost = p * Math.pow((1 + rate/100), yrs);
      
      return {
        heroLabel: "Required Future Outlay",
        heroValue: formatRupee(finalCost),
        rows: [
          { label: "Nominal Depreciation", val: formatRupee(finalCost - p) },
          { label: "Estimated Rate used", val: `${rate}% per annum` }
        ]
      };
    }
  },
  fd: {
    title: "FD Return Calculator",
    inputs: [
      { id: "fd-principal", label: "Principal deposit (INR)", min: 5000, max: 5000000, val: 100000, suffix: "₹" },
      { id: "fd-rate", label: "Interest Rate (%)", min: 3, max: 12, val: 7.25, suffix: "%" },
      { id: "fd-years", label: "FD Period (Years)", min: 1, max: 10, val: 3, suffix: "yrs" }
    ],
    calc: () => {
      const p = parseFloat(document.getElementById('calc-fd-principal').value);
      const r = parseFloat(document.getElementById('calc-fd-rate').value);
      const yrs = parseFloat(document.getElementById('calc-fd-years').value);
      
      // Compounded quarterly in Indian Banks
      const n = yrs * 4;
      const ratePerQuarter = (r / 100) / 4;
      const maturity = p * Math.pow(1 + ratePerQuarter, n);
      
      return {
        heroLabel: "FD Maturity Value",
        heroValue: formatRupee(maturity),
        rows: [
          { label: "Interest Income", val: formatRupee(maturity - p) },
          { label: "Rate of Interest", val: `${r}% compounded quarterly` }
        ]
      };
    }
  },
  goals: {
    title: "Goal Target Calculator",
    inputs: [
      { id: "goal-target", label: "Desired Goal Target (INR)", min: 100000, max: 50000000, val: 1000000, suffix: "₹" },
      { id: "goal-years", label: "Time Limit (Years)", min: 1, max: 25, val: 7, suffix: "yrs" },
      { id: "goal-rate", label: "Expected Portfolio Return (%)", min: 5, max: 20, val: 12, suffix: "%" }
    ],
    calc: () => {
      const target = parseFloat(document.getElementById('calc-goal-target').value);
      const yrs = parseFloat(document.getElementById('calc-goal-years').value);
      const r = parseFloat(document.getElementById('calc-goal-rate').value);
      
      const n = yrs * 12;
      const i = (r / 100) / 12;
      
      // Target monthly SIP formula
      const sip = (target * i) / ((Math.pow(1 + i, n) - 1) * (1 + i));
      
      return {
        heroLabel: "Monthly SIP Required",
        heroValue: formatRupee(sip),
        rows: [
          { label: "Net Capital Contributed", val: formatRupee(sip * n) },
          { label: "Compounding Growth Yield", val: formatRupee(target - (sip * n)) }
        ]
      };
    }
  }
};

function renderSelectedCalculator(calcKey) {
  const container = document.getElementById('calculator-inner-box');
  if (!container) return;
  
  const calcObj = calculators[calcKey];
  
  let inputsHTML = '';
  calcObj.inputs.forEach(inp => {
    inputsHTML += `
      <div class="input-group">
        <div class="input-label-row">
          <label for="calc-${inp.id}">${inp.label}</label>
          <span class="input-val-box" id="lbl-${inp.id}">${inp.val} ${inp.suffix}</span>
        </div>
        <input type="range" class="input-slider calc-slider-input" 
               id="calc-${inp.id}" 
               min="${inp.min}" 
               max="${inp.max}" 
               step="${inp.max / 100}" 
               value="${inp.val}" 
               data-suffix="${inp.suffix}" 
               data-target-lbl="lbl-${inp.id}">
      </div>
    `;
  });
  
  container.innerHTML = `
    <div class="calculator-inputs">
      <h4 class="card-title" style="margin-bottom:12px;">${calcObj.title}</h4>
      ${inputsHTML}
    </div>
    <div class="calculator-outputs" id="calculator-outputs-panel">
      <!-- Calculated outputs inside here -->
    </div>
  `;
  
  // Set output state initially
  updateCalculatorOutput(calcKey);
  
  // Attach listeners
  document.querySelectorAll('.calc-slider-input').forEach(slide => {
    slide.addEventListener('input', () => {
      const lblId = slide.getAttribute('data-target-lbl');
      const suffix = slide.getAttribute('data-suffix');
      
      let formattedVal = slide.value;
      if (suffix === '₹') {
        formattedVal = formatRupee(slide.value);
      } else {
        formattedVal = `${slide.value} ${suffix}`;
      }
      
      document.getElementById(lblId).textContent = formattedVal;
      updateCalculatorOutput(calcKey);
    });
  });
}

function updateCalculatorOutput(calcKey) {
  const calcObj = calculators[calcKey];
  const results = calcObj.calc();
  
  const outPanel = document.getElementById('calculator-outputs-panel');
  
  let rowsHTML = '';
  results.rows.forEach(r => {
    rowsHTML += `
      <div class="output-row">
        <span>${r.label}</span>
        <strong class="output-row-val">${r.val}</strong>
      </div>
    `;
  });
  
  outPanel.innerHTML = `
    <div class="output-hero">
      <span class="output-hero-label">${results.heroLabel}</span>
      <div class="output-hero-val">${results.heroValue}</div>
    </div>
    ${rowsHTML}
  `;
}

function initCalculatorTabs() {
  const tabSip = document.getElementById('calc-tab-sip');
  const tabCagr = document.getElementById('calc-tab-cagr');
  const tabInflation = document.getElementById('calc-tab-inflation');
  const tabFd = document.getElementById('calc-tab-fd');
  const tabGoals = document.getElementById('calc-tab-goals');
  
  const tabs = [tabSip, tabCagr, tabInflation, tabFd, tabGoals];
  const keys = ['sip', 'cagr', 'inflation', 'fd', 'goals'];
  
  tabs.forEach((tab, index) => {
    if (tab) {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderSelectedCalculator(keys[index]);
      });
    }
  });
  
  // Default Sip load
  renderSelectedCalculator('sip');
}

function initLearnTabs() {
  // Navigation tabs binded inline to onclick in index.html
}

window.switchLearnTab = function(btn, targetTab) {
  const tabs = document.querySelectorAll('.learn-tab');
  const sections = document.querySelectorAll('.learn-section');
  
  // Toggle active tab class
  tabs.forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  
  // Toggle active section visibility
  sections.forEach(sec => {
    sec.classList.remove('active');
    if (sec.id === `learn-${targetTab}-section`) {
      sec.classList.add('active');
    }
  });
};

// 7. Dynamic Educational Quizzes Setup
function renderQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container) return;
  
  const totalQ = state.quizQuestions.length;
  const currentIdx = state.activeQuizIndex;
  
  if (currentIdx >= totalQ) {
    // Quiz completed state
    let correctCount = state.quizAnswersRecorded.filter(x => x === true).length;
    container.innerHTML = `
      <div style="text-align:center; padding:24px;">
        <i data-lucide="award" style="width:64px; height:64px; color:var(--color-success); margin-bottom:16px;"></i>
        <h4 class="card-title" style="font-size:1.4rem; margin-bottom:12px;">Quiz Completed!</h4>
        <p style="color:var(--text-secondary); margin-bottom:20px; font-size:0.95rem;">
          You scored <strong>${correctCount} out of ${totalQ}</strong> correct answers!
        </p>
        <div style="background:rgba(255,255,255,0.02); padding:16px; border-radius:var(--border-radius-md); border:1px solid var(--border-glass); font-size:0.85rem; line-height:1.5; text-align:left; max-width:400px; margin:0 auto 24px auto;">
          <strong>AI Insights:</strong> ${correctCount === totalQ ? 'Exceptional literacy! You understand complex returns metrics. Your risk score has improved by 0.5 points.' : 'Good start! Try reading our explainers on CAGR/XIRR to optimize your decision making.'}
        </div>
        <button class="btn btn-primary" id="quiz-restart-btn">Restart Quiz</button>
      </div>
    `;
    lucide.createIcons();
    
    document.getElementById('quiz-restart-btn').addEventListener('click', () => {
      state.activeQuizIndex = 0;
      state.quizAnswersRecorded = [];
      renderQuiz();
    });
    
    // Update dashboard health score if they got all right!
    if (correctCount === totalQ) {
      document.getElementById('health-score-num').textContent = "7.7";
      document.getElementById('health-bar-risk').style.width = "75%";
      document.getElementById('health-score-risk').textContent = "7.5/10";
    }
    
    return;
  }
  
  const question = state.quizQuestions[currentIdx];
  
  let optionsHTML = '';
  question.options.forEach((opt, oIdx) => {
    optionsHTML += `
      <li class="quiz-option" data-option="${opt}">
        <span>${opt}</span>
        <i data-lucide="circle" style="width:16px;height:16px; color:var(--text-muted);"></i>
      </li>
    `;
  });
  
  container.innerHTML = `
    <div class="quiz-header">
      <span>Question ${currentIdx + 1} of ${totalQ}</span>
      <span>Financial Literacy Score Tracker</span>
    </div>
    
    <div class="quiz-question-box">
      <h4 class="quiz-question-text">${question.q}</h4>
    </div>
    
    <ul class="quiz-options-list">
      ${optionsHTML}
    </ul>
    
    <div class="quiz-feedback" id="quiz-feedback-box">
      <!-- Injected answer feedback -->
    </div>
    
    <div style="margin-top:24px; display:flex; justify-content:flex-end;">
      <button class="btn btn-primary" id="quiz-next-btn" style="display:none;">Next Question <i data-lucide="arrow-right"></i></button>
    </div>
  `;
  
  lucide.createIcons();
  
  // Event listeners on options
  document.querySelectorAll('.quiz-option').forEach(el => {
    el.addEventListener('click', () => {
      // Avoid double clicks
      if (document.getElementById('quiz-next-btn').style.display === 'inline-flex') return;
      
      const chosen = el.getAttribute('data-option');
      const isCorrect = chosen === question.a;
      
      state.quizAnswersRecorded.push(isCorrect);
      
      // Update element styles
      document.querySelectorAll('.quiz-option').forEach(optionNode => {
        const val = optionNode.getAttribute('data-option');
        if (val === question.a) {
          optionNode.classList.add('correct');
          optionNode.querySelector('i').outerHTML = `<i data-lucide="check-circle" style="color:var(--color-success);width:16px;height:16px;"></i>`;
        } else if (val === chosen && !isCorrect) {
          optionNode.classList.add('incorrect');
          optionNode.querySelector('i').outerHTML = `<i data-lucide="x-circle" style="color:var(--color-danger);width:16px;height:16px;"></i>`;
        }
      });
      
      const feedbackBox = document.getElementById('quiz-feedback-box');
      feedbackBox.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
      feedbackBox.innerHTML = `
        <strong>${isCorrect ? '✅ Correct Answer!' : '❌ Incorrect.'}</strong><br>
        ${question.feedback}
      `;
      feedbackBox.style.display = 'block';
      
      document.getElementById('quiz-next-btn').style.display = 'inline-flex';
      lucide.createIcons();
    });
  });
  
  document.getElementById('quiz-next-btn').addEventListener('click', () => {
    state.activeQuizIndex++;
    renderQuiz();
  });
}

// 8. Dynamic Portfolio Performance Graph (Chart.js)
function initPortfolioChart() {
  const ctx = document.getElementById('portfolioMainChart');
  if (!ctx) return;
  
  // Clean up if existing chart exists
  if (portfolioChart) {
    portfolioChart.destroy();
  }
  
  // Determine chart colors matching asset category
  const activeTab = document.querySelector('.filter-tab.active');
  const filterType = activeTab ? activeTab.getAttribute('data-filter') : 'all';
  
  let strokeColor = '#3b82f6'; // default equity blue
  if (filterType === 'mf') strokeColor = '#10b981';
  if (filterType === 'gold') strokeColor = '#f59e0b';
  if (filterType === 'fd') strokeColor = '#8b5cf6';
  if (filterType === 'nps') strokeColor = '#06b6d4';
  if (filterType === 'crypto') strokeColor = '#ec4899';
  
  // Setup Gradient Fill
  const chartCtx = ctx.getContext('2d');
  const gradient = chartCtx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, hexToRgba(strokeColor, 0.15));
  gradient.addColorStop(1, hexToRgba(strokeColor, 0.0));
  
  // Generate mock dates/points based on timeframe
  const activeTfBtn = document.querySelector('.timeframe-selector .tf-btn.active');
  const timeframe = activeTfBtn ? activeTfBtn.getAttribute('data-tf') : '3m';
  
  const dataPoints = getChartDataForTimeframe(timeframe, filterType);
  
  portfolioChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dataPoints.labels,
      datasets: [{
        label: 'Portfolio Value (INR)',
        data: dataPoints.data,
        borderColor: strokeColor,
        borderWidth: 2,
        pointBackgroundColor: strokeColor,
        pointBorderColor: '#ffffff',
        pointHoverRadius: 6,
        pointRadius: 2,
        fill: true,
        backgroundColor: gradient,
        tension: 0.35
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: '#0f1422',
          borderColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1,
          titleFont: { family: 'Plus Jakarta Sans', weight: 'bold' },
          bodyFont: { family: 'Plus Jakarta Sans' },
          callbacks: {
            label: function(context) {
              return ` Value: ${formatRupee(context.parsed.y)}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: '#6b7280',
            font: { family: 'Plus Jakarta Sans', size: 10 }
          }
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.03)' },
          ticks: {
            color: '#6b7280',
            font: { family: 'Plus Jakarta Sans', size: 10 },
            callback: function(value) {
              return '₹' + (value / 1000) + 'k';
            }
          }
        }
      }
    }
  });
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Generate data mapping
function getChartDataForTimeframe(tf, filterType) {
  // Base allocation valuations
  const metrics = calculatePortfolioMetrics();
  let baseVal = metrics.totalVal;
  
  // If filtering a specific asset type, baseVal is different
  if (filterType !== 'all') {
    baseVal = state.holdings
      .filter(h => h.category === filterType)
      .reduce((acc, h) => acc + h.currentValue, 0);
  }
  
  if (baseVal === 0) baseVal = 50000; // fallback
  
  let size = 10;
  let labels = [];
  let data = [];
  
  if (tf === '1w') {
    size = 7;
    labels = ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'];
    for(let i=0; i<size; i++) {
      data.push(baseVal - (size - i - 1) * 600 - (Math.random() * 400));
    }
  } else if (tf === '1m') {
    size = 12;
    labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    for(let i=0; i<size; i++) {
      data.push(baseVal - (size - i - 1) * 2000 + (Math.sin(i) * 1500));
    }
    labels = Array.from({length: size}, (_, i) => `Day ${i*2 + 1}`);
  } else if (tf === '3m') {
    size = 15;
    labels = Array.from({length: size}, (_, i) => `Wk ${i + 1}`);
    for(let i=0; i<size; i++) {
      data.push(baseVal - (size - i - 1) * 4000 + (Math.cos(i) * 3000));
    }
  } else if (tf === '1y') {
    size = 12;
    labels = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    for(let i=0; i<size; i++) {
      data.push(baseVal - (size - i - 1) * 10000 + (Math.sin(i) * 5000));
    }
  } else { // ALL
    size = 8;
    labels = ['2020', '2021', '2022', '2023', '2024', '2025', '2026'];
    for(let i=0; i<size; i++) {
      data.push(baseVal - (size - i - 1) * 45000 + (Math.cos(i) * 12000));
    }
    labels = Array.from({length: size}, (_, i) => `'${20 - size + i + 1}`);
  }
  
  // Set the final point to exactly reflect the active calculated valuation
  data[data.length - 1] = baseVal;
  
  return { labels, data };
}

// Attach timeframe and sort changes to redraw
function bindPortfolioEvents() {
  // Filters switching
  document.querySelectorAll('#portfolio-filters .filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#portfolio-filters .filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update UI components
      renderPortfolioBreakdown();
      initPortfolioChart();
    });
  });
  
  // Timeframe selector
  document.querySelectorAll('.timeframe-selector .tf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.timeframe-selector .tf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      initPortfolioChart();
    });
  });
  
  // Sort drop list changes
  const sortSelect = document.getElementById('portfolio-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      renderPortfolioBreakdown();
    });
  }
}

// 9. Autocomplete Search Utility
function initSearchAutocomplete() {
  const searchInput = document.getElementById('global-search-input');
  const dropdown = document.getElementById('search-dropdown');
  
  if (!searchInput || !dropdown) return;
  
  searchInput.addEventListener('input', () => {
    const val = searchInput.value.trim().toLowerCase();
    
    if (val.length === 0) {
      dropdown.classList.remove('active');
      return;
    }
    
    // Filter matching assets from catalog
    const matches = state.fundsCatalog.filter(f => 
      f.name.toLowerCase().includes(val) || 
      f.category.toLowerCase().includes(val)
    );
    
    if (matches.length === 0) {
      dropdown.innerHTML = `<div style="padding:12px; font-size:0.8rem; color:var(--text-muted); text-align:center;">No results found for "${val}"</div>`;
      dropdown.classList.add('active');
      return;
    }
    
    dropdown.innerHTML = '';
    matches.slice(0, 5).forEach(m => {
      const item = document.createElement('div');
      item.className = 'search-result-item';
      item.innerHTML = `
        <div class="search-result-info">
          <div class="search-result-avatar" style="background:${m.bg}; color:#fff;">${m.initials}</div>
          <div class="search-result-text">
            <span class="search-result-name">${m.name}</span>
            <span class="search-result-type">${m.category.toUpperCase()} · 1Y Ret: ${m.ret1y}</span>
          </div>
        </div>
        <i data-lucide="arrow-right" style="width:14px;color:var(--text-muted);"></i>
      `;
      
      item.addEventListener('click', () => {
        searchInput.value = m.name;
        dropdown.classList.remove('active');
        
        // Jump to Invest page with that category
        navigateToPage('invest');
        
        // Activate respective invest tab
        document.querySelectorAll('#invest-category-tabs .filter-tab').forEach(tab => {
          tab.classList.remove('active');
          if (tab.getAttribute('data-category') === m.category) {
            tab.classList.add('active');
          }
        });
        
        renderInvestCatalog();
      });
      
      dropdown.appendChild(item);
    });
    
    lucide.createIcons();
    dropdown.classList.add('active');
  });
  
  // Close dropdown on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      dropdown.classList.remove('active');
    }
  });
}

// 10. CSV Exporter Utility
function initExportCSV() {
  const exportBtn = document.getElementById('portfolio-export-csv-btn');
  if (!exportBtn) return;
  
  exportBtn.addEventListener('click', () => {
    // Generate CSV string
    let csv = 'Asset Name,Short Name,Category,Amount Invested,Current Value,Growth Percentage\n';
    
    state.holdings.forEach(h => {
      csv += `"${h.name}","${h.shortName}",${h.category},${h.invested},${h.currentValue},${h.returnPct.toFixed(2)}%\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, 'wealthos_holdings.csv');
    } else {
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute('download', 'wealthos_holdings_report.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    state.notifications.unshift({
      id: `n_csv_${Date.now()}`,
      type: "success",
      title: "CSV Export Successful",
      description: "Successfully exported holdings dataset. Look in your device downloads folder.",
      time: "Just Now",
      unread: true
    });
    renderNotifications();
  });
}

// 11. Modal Controllers Integration
function setupModals() {
  
  // Generic open/close functions
  const openModal = (id) => document.getElementById(id).classList.add('active');
  const closeModal = (id) => document.getElementById(id).classList.remove('active');
  
  // A. Add Funds
  document.getElementById('action-add-funds').addEventListener('click', () => openModal('modal-add-funds'));
  document.getElementById('close-modal-funds').addEventListener('click', () => closeModal('modal-add-funds'));
  document.getElementById('cancel-funds-btn').addEventListener('click', () => closeModal('modal-add-funds'));
  
  document.getElementById('confirm-funds-btn').addEventListener('click', () => {
    const inputAmt = parseFloat(document.getElementById('fund-amount-input').value);
    if (!isNaN(inputAmt) && inputAmt > 0) {
      state.user.cashBalance += inputAmt;
      
      // Update transactions
      state.transactions.unshift({
        type: "BUY",
        assetName: "Cash Capital Injection",
        date: "Just Now",
        category: "fd",
        amount: inputAmt,
        units: 1.0,
        price: inputAmt,
        typeLabel: "Fund Deposit"
      });
      
      // Add system notification
      state.notifications.unshift({
        id: `n_funds_${Date.now()}`,
        type: "success",
        title: "Capital Loaded Successfully",
        description: `Successfully added ${formatRupee(inputAmt)} into your linked wallet from SBI Bank.`,
        time: "Just Now",
        unread: true
      });
      
      closeModal('modal-add-funds');
      renderAll();
    } else {
      alert("Please enter a valid amount.");
    }
  });

  // B. Start SIP (Dynamic targets select list populate)
  document.getElementById('action-start-sip').addEventListener('click', () => {
    const select = document.getElementById('sip-target-select');
    select.innerHTML = '';
    state.fundsCatalog.forEach(f => {
      select.innerHTML += `<option value="${f.name}">${f.name} (${f.category.toUpperCase()})</option>`;
    });
    openModal('modal-start-sip');
  });
  
  document.getElementById('close-modal-sip').addEventListener('click', () => closeModal('modal-start-sip'));
  document.getElementById('cancel-sip-btn').addEventListener('click', () => closeModal('modal-start-sip'));
  
  document.getElementById('confirm-sip-btn').addEventListener('click', () => {
    const name = document.getElementById('sip-target-select').value;
    const amount = parseFloat(document.getElementById('sip-amount-input').value);
    const date = document.getElementById('sip-date-input').value;
    
    if (!isNaN(amount) && amount > 0) {
      // Create SIP notification
      state.notifications.unshift({
        id: `n_sip_${Date.now()}`,
        type: "success",
        title: "SIP Registration Completed",
        description: `New monthly SIP of ${formatRupee(amount)} registered for ${name}. Triggers on the ${date}th of every month.`,
        time: "Just Now",
        unread: true
      });
      
      closeModal('modal-start-sip');
      renderAll();
    } else {
      alert("Enter a valid monthly sum.");
    }
  });

  // C. New Goal creation modal
  document.getElementById('action-new-goal').addEventListener('click', () => openModal('modal-new-goal'));
  document.getElementById('close-modal-goal').addEventListener('click', () => closeModal('modal-new-goal'));
  document.getElementById('cancel-goal-btn').addEventListener('click', () => closeModal('modal-new-goal'));
  
  document.getElementById('confirm-goal-btn').addEventListener('click', () => {
    const name = document.getElementById('goal-name-input').value;
    const target = parseFloat(document.getElementById('goal-target-amount-input').value);
    const year = parseInt(document.getElementById('goal-year-input').value);
    const monthlySip = parseFloat(document.getElementById('goal-sip-input').value);
    const icon = document.getElementById('goal-icon-select').value;
    
    if (name.trim().length > 0 && !isNaN(target) && target > 0) {
      state.goals.push({
        id: `g_${Date.now()}`,
        name,
        target,
        year,
        saved: 0,
        icon,
        monthlySip
      });
      
      state.notifications.unshift({
        id: `n_goal_${Date.now()}`,
        type: "success",
        title: "New Target Activated",
        description: `Goal "${name}" tracking has been successfully added to your roadmap.`,
        time: "Just Now",
        unread: true
      });
      
      closeModal('modal-new-goal');
      renderAll();
    } else {
      alert("Please check your target goal name and amount.");
    }
  });

  // D. Risk profile quiz modal (trigger on Profile Page)
  const profileRetakeQuizBtn = document.getElementById('profile-retake-quiz-btn');
  if (profileRetakeQuizBtn) {
    profileRetakeQuizBtn.addEventListener('click', () => {
      renderQuizModalFlow();
      openModal('modal-risk-quiz');
    });
  }
  document.getElementById('close-modal-quiz').addEventListener('click', () => closeModal('modal-risk-quiz'));
  document.getElementById('quiz-modal-cancel').addEventListener('click', () => closeModal('modal-risk-quiz'));

  // E. RIA Booking Modal
  const bookCallBtn = document.getElementById('buddy-book-call-btn');
  if (bookCallBtn) {
    bookCallBtn.addEventListener('click', () => openModal('modal-book-call'));
  }
  document.getElementById('close-modal-call').addEventListener('click', () => closeModal('modal-book-call'));
  document.getElementById('cancel-call-btn').addEventListener('click', () => closeModal('modal-book-call'));
  document.getElementById('confirm-call-btn').addEventListener('click', () => {
    const dateVal = document.getElementById('call-date-input').value;
    const slotVal = document.getElementById('call-time-input').value;
    
    state.notifications.unshift({
      id: `n_call_${Date.now()}`,
      type: "success",
      title: "Advisor Call Scheduled",
      description: `A 30-min session with RIA advisor has been booked for ${dateVal} at ${slotVal}. Meet link sent to your email.`,
      time: "Just Now",
      unread: true
    });
    
    closeModal('modal-book-call');
    renderAll();
  });
  
  // Link More Consent Account
  const linkConsentBtn = document.getElementById('profile-link-consent-btn');
  if (linkConsentBtn) {
    linkConsentBtn.addEventListener('click', () => {
      const consentName = prompt("Enter bank or broking account provider to link via Account Aggregator:", "ICICI Direct");
      if (consentName && consentName.trim().length > 0) {
        state.consents.push({
          id: `c_${Date.now()}`,
          accountName: consentName,
          sourceType: "Account Aggregator Consent",
          status: "Linked",
          logo: consentName.substring(0, 2).toUpperCase()
        });
        
        state.notifications.unshift({
          id: `n_consent_${Date.now()}`,
          type: "success",
          title: "Account Consent Authorized",
          description: `Linked ${consentName} data feed to your unified investing dashboard.`,
          time: "Just Now",
          unread: true
        });
        renderAll();
      }
    });
  }
}

// Direct buy/sell order modal checkout
let activeFundForPurchase = null;

function openInvestCheckoutModal(fund) {
  activeFundForPurchase = fund;
  document.getElementById('checkout-title').textContent = `Purchase units of ${fund.name}`;
  document.getElementById('checkout-asset-class').textContent = fund.category.toUpperCase();
  document.getElementById('checkout-asset-nav').textContent = `1Y Yield: ${fund.ret1y}`;
  document.getElementById('checkout-asset-risk').textContent = `${fund.risk} Risk level`;
  
  const amtInput = document.getElementById('checkout-amount-input');
  amtInput.value = '10000';
  
  document.getElementById('modal-invest-checkout').classList.add('active');
  
  setTimeout(() => {
    amtInput.focus();
    amtInput.select();
  }, 100);
}

// Confirm investment purchase handlers
function bindInvestCheckoutEvents() {
  const cancelBtn = document.getElementById('cancel-checkout-btn');
  const confirmBtn = document.getElementById('confirm-checkout-btn');
  const overlay = document.getElementById('modal-invest-checkout');
  
  const close = () => overlay.classList.remove('active');
  
  if (cancelBtn) cancelBtn.addEventListener('click', close);
  document.getElementById('close-modal-checkout').addEventListener('click', close);
  
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      const amount = parseFloat(document.getElementById('checkout-amount-input').value);
      if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid investment capital.");
        return;
      }
      
      const fund = activeFundForPurchase;
      
      // Update holding values dynamically
      let existHolding = state.holdings.find(h => h.shortName.toLowerCase() === fund.initials.toLowerCase());
      
      if (existHolding) {
        existHolding.invested += amount;
        existHolding.currentValue += amount;
        // recalculate returns percent
        existHolding.returnPct = ((existHolding.currentValue - existHolding.invested) / existHolding.invested) * 100;
      } else {
        // Create new holding entry
        state.holdings.push({
          id: `h_${Date.now()}`,
          name: fund.name,
          shortName: fund.initials,
          category: fund.category,
          subCategory: fund.subCategory,
          invested: amount,
          currentValue: amount,
          units: amount / 120, // dummy price NAV factor
          returnPct: 0.0
        });
      }
      
      // Log Transaction
      state.transactions.unshift({
        type: "BUY",
        assetName: fund.name,
        date: "Just Now",
        category: fund.category,
        amount: amount,
        units: parseFloat((amount / 120).toFixed(2)),
        price: 120.0,
        typeLabel: "Manual Order"
      });
      
      // Notify
      state.notifications.unshift({
        id: `n_buy_${Date.now()}`,
        type: "success",
        title: "Investment Purchase Confirmed",
        description: `Successfully allocated ${formatRupee(amount)} to ${fund.name}. Units will allocate in T+1 business days.`,
        time: "Just Now",
        unread: true
      });
      
      close();
      renderAll();
    });
  }
}

// User risk quiz flow modal layout
function renderQuizModalFlow() {
  const container = document.getElementById('quiz-question-container');
  if (!container) return;
  
  const questions = [
    {
      q: "What is your primary investment goal timeframe?",
      opts: ["Under 2 Years (Short)", "2 to 5 Years (Medium)", "Over 5 Years (Long)"],
      scores: ["Conservative", "Moderate", "Aggressive"]
    },
    {
      q: "How do you react if your equity portfolio drops 15% due to market corrections?",
      opts: ["Panic and sell immediately to avoid further loss", "Hold steady and wait for market recovery", "Buy more units to average down the cost"],
      scores: ["Conservative", "Moderate", "Aggressive"]
    }
  ];
  
  let currentStep = 0;
  let answers = [];
  
  const renderQuizStep = () => {
    const qObj = questions[currentStep];
    let optsHTML = '';
    qObj.opts.forEach((opt, idx) => {
      optsHTML += `
        <div class="quiz-option quiz-modal-step-option" data-idx="${idx}" style="margin-bottom:12px;">
          <span>${opt}</span>
          <i data-lucide="circle" style="width:16px;height:16px;"></i>
        </div>
      `;
    });
    
    container.innerHTML = `
      <div style="font-size:0.75rem; color:var(--text-secondary); margin-bottom:10px;">Step ${currentStep + 1} of 2</div>
      <h4 style="font-size:1.05rem; font-weight:700; line-height:1.4; margin-bottom:18px;">${qObj.q}</h4>
      <div class="quiz-options-list" style="list-style:none; padding:0;">
        ${optsHTML}
      </div>
    `;
    lucide.createIcons();
    
    // Bind option click
    document.querySelectorAll('.quiz-modal-step-option').forEach(el => {
      el.addEventListener('click', () => {
        const oIdx = parseInt(el.getAttribute('data-idx'));
        answers.push(qObj.scores[oIdx]);
        
        currentStep++;
        if (currentStep < questions.length) {
          renderQuizStep();
        } else {
          // Process quiz final result
          let consCount = answers.filter(x => x === 'Conservative').length;
          let aggCount = answers.filter(x => x === 'Aggressive').length;
          
          let finalRisk = "Moderate";
          if (consCount > aggCount) finalRisk = "Conservative";
          if (aggCount > consCount) finalRisk = "Aggressive";
          
          state.user.riskProfile = finalRisk;
          
          container.innerHTML = `
            <div style="text-align:center; padding:12px;">
              <i data-lucide="shield-alert" style="width:48px;height:48px;color:var(--color-equity); margin-bottom:12px;"></i>
              <h4 style="font-size:1.2rem; font-weight:800; margin-bottom:8px;">Evaluation Finished!</h4>
              <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.4; margin-bottom:20px;">
                Based on your diagnostic, your risk appetite is categorized as <strong>${finalRisk}</strong>. We've updated your asset guidelines.
              </p>
              <button class="btn btn-primary" id="close-risk-quiz-result-btn" style="width:100%; justify-content:center;">Apply Allocation Target</button>
            </div>
          `;
          lucide.createIcons();
          
          // Trigger notifications
          state.notifications.unshift({
            id: `n_risk_${Date.now()}`,
            type: "info",
            title: "Risk Profile Diagnostic Concluded",
            description: `Evaluated risk status updated to: ${finalRisk}. Rebalancing guidelines adjusted.`,
            time: "Just Now",
            unread: true
          });
          
          document.getElementById('close-risk-quiz-result-btn').addEventListener('click', () => {
            document.getElementById('modal-risk-quiz').classList.remove('active');
            renderAll();
          });
        }
      });
    });
  };
  
  renderQuizStep();
}

// 12. AI Finance Buddy Chatbot
function setupChatbot() {
  const sendBtn = document.getElementById('chat-send-btn');
  const chatInput = document.getElementById('chat-input-field');
  const chatWindow = document.getElementById('chat-messages');
  
  if (!sendBtn || !chatInput || !chatWindow) return;
  
  const sendMessage = () => {
    const txt = chatInput.value.trim();
    if (txt.length === 0) return;
    
    appendChatMessage("user", txt);
    chatInput.value = '';
    
    // Simulate typing
    showChatbotTypingIndicator();
    
    setTimeout(() => {
      removeChatbotTypingIndicator();
      const response = generateAIResponse(txt);
      appendChatMessage("ai", response);
    }, 1200 + Math.random() * 800);
  };
  
  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
  
  // Suggested Questions chips
  document.querySelectorAll('.suggested-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const txt = chip.textContent;
      appendChatMessage("user", txt);
      
      showChatbotTypingIndicator();
      
      setTimeout(() => {
        removeChatbotTypingIndicator();
        const response = generateAIResponse(txt);
        appendChatMessage("ai", response);
      }, 1200);
    });
  });
}

function appendChatMessage(sender, text) {
  const container = document.getElementById('chat-messages');
  const wrapper = document.createElement('div');
  wrapper.className = `message-wrapper ${sender}`;
  
  const isAi = sender === 'ai';
  const avatarText = isAi ? 'AI' : 'UA';
  
  wrapper.innerHTML = `
    <div class="message-avatar">${avatarText}</div>
    <div class="message-bubble">
      ${formatMarkdown(text)}
    </div>
  `;
  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
}

function showChatbotTypingIndicator() {
  const container = document.getElementById('chat-messages');
  const wrapper = document.createElement('div');
  wrapper.className = 'message-wrapper ai';
  wrapper.id = 'chat-typing-indicator-node';
  
  wrapper.innerHTML = `
    <div class="message-avatar">AI</div>
    <div class="message-bubble" style="padding: 8px 16px;">
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>
  `;
  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
}

function removeChatbotTypingIndicator() {
  const indicator = document.getElementById('chat-typing-indicator-node');
  if (indicator) {
    indicator.remove();
  }
}

// Markdown Formatter
function formatMarkdown(text) {
  // Simple markdown processor converting bold blocks and line breaks
  let html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');
  
  // Process list lines starting with -
  const lines = html.split('<br>');
  let insideList = false;
  let result = [];
  
  lines.forEach(l => {
    if (l.trim().startsWith('- ')) {
      if (!insideList) {
        result.push('<ul>');
        insideList = true;
      }
      result.push(`<li>${l.trim().substring(2)}</li>`);
    } else {
      if (insideList) {
        result.push('</ul>');
        insideList = false;
      }
      result.push(l);
    }
  });
  
  if (insideList) result.push('</ul>');
  
  return result.join('<br>').replace(/<\/ul><br>/g, '</ul>').replace(/<br><ul>/g, '<ul>');
}

// Chatbot Knowledge Engine matcher
function generateAIResponse(query) {
  const lower = query.toLowerCase();
  
  if (lower.includes('risk') || lower.includes('allocation')) {
    const metrics = calculatePortfolioMetrics();
    return `Your current portfolio values at **${formatRupee(metrics.totalVal)}** with a risk profile set to **${state.user.riskProfile}**.\n
Here is your current diversification status:
- **Mutual Funds / Indexes:** ₹2,50,700 (~52%)
- **Direct Equities:** ₹1,57,610 (~33%)
- **Digital Gold:** ₹34,000 (~7%)
- **Fixed Deposits / NPS:** ₹54,000 (~11%)
- **Cryptocurrencies:** ₹9,500 (~2%)\n
**AI Insight:** Under your Moderate risk guidelines, you are slightly overweight in direct equities and index funds (totaling 85% vs the 50% target). Your **Risk Alignment** rating is **6/10**. We recommend routing future capitals into Fixed Deposits or debt funds to safeguard your margin.`;
  }
  
  if (lower.includes('sip') || lower.includes('1 cr') || lower.includes('crore')) {
    return `To accumulate **₹1 Crore** over a horizon of **20 years**, the required monthly SIP depends on your expected compound rate of return:\n
- **At 10% CAGR (Conservative Equity):** You need a monthly SIP of **₹13,170**
- **At 12% CAGR (Moderate Flexi-Cap):** You need a monthly SIP of **₹10,010**
- **At 15% CAGR (Aggressive Small-Cap):** You need a monthly SIP of **₹6,680**\n
*Note: These simulations do not factor in inflation. A ₹1 Cr target in 20 years will buy equivalent to only ₹31 Lakhs today at a 6% inflation drag. Adjust target to ₹3.2 Cr to match actual purchasing power.*`;
  }
  
  if (lower.includes('elss') || lower.includes('tax')) {
    return `**ELSS (Equity Linked Savings Scheme)** is an excellent tax-saving instrument under Section 80C of the Income Tax Act:\n
- **Lock-in period:** 3 years (the shortest among all 80C instruments like PPF's 15-year or tax-saver FD's 5-year lock).
- **Tax deduction:** Claim tax deduction on up to **₹1.5 Lakhs** of investment capital, saving up to ₹46,800 annually for individuals in the 30% tax bracket.
- **Returns potential:** Since ELSS funds invest directly in equities, they historically compound at 12-15% over long horizons, beat inflation, but are subject to market volatility.`;
  }
  
  if (lower.includes('rebalance') || lower.includes('drift')) {
    return `**Asset Allocation Rebalancing is highly recommended.**\n
Your equity target is **50%**, but your actual exposure is **85%** (Mutual Funds + direct stocks). This drift of **+35%** exposes your capital to elevated volatility if markets correct.\n
**Action Plan:**
1. Sell ₹18,000 worth of direct equities (e.g. Tata Motors which is up 22%).
2. Re-allocate that ₹18,000 directly into Fixed Deposits or high-yield debt mutual funds.
3. Pause direct stock SIP purchases and redirect inputs to liquid debt funds until your equity proportion falls back to 50-55%.`;
  }
  
  return `I understand you are asking about: "${query}".\n
Here is a helpful summary of what we know:
- **Your Current Portfolio Health:** 7.2 out of 10. You have good diversification but high equity risk drift.
- **Goals status:** Europe Trip is on track. Home Downpayment requires an additional monthly SIP of ₹8,000.
- **Linked sources:** zerodha, Groww, SBI savings feed are currently sync'd via Account Aggregator.
\nLet me know if you would like me to explain CAGR vs XIRR or evaluate your ELSS limits!`;
}

// 13. Initialization & Event Triggers
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  bindPortfolioEvents();
  initSearchAutocomplete();
  initExportCSV();
  setupModals();
  bindInvestCheckoutEvents();
  initCalculatorTabs();
  initLearnTabs();
  renderQuiz();
  setupChatbot();
  
  // Close welcome nudge card alert logic
  const closeNudgeBtn = document.getElementById('close-dashboard-nudge');
  if (closeNudgeBtn) {
    closeNudgeBtn.addEventListener('click', () => {
      localStorage.setItem('nudge-dismissed-rebalance', 'true');
      document.getElementById('dashboard-nudge').style.display = 'none';
    });
  }
  
  // Goals nudge dismiss
  const closeGoalsNudgeBtn = document.getElementById('close-goals-nudge');
  if (closeGoalsNudgeBtn) {
    closeGoalsNudgeBtn.addEventListener('click', () => {
      document.getElementById('goals-milestone-nudge').style.display = 'none';
    });
  }
  
  // Topbar settings trigger
  const topbarSettingsBtn = document.getElementById('topbar-settings-btn');
  if (topbarSettingsBtn) {
    topbarSettingsBtn.addEventListener('click', () => {
      navigateToPage('profile');
    });
  }
  
  // Topbar bell trigger
  const topbarBellBtn = document.getElementById('topbar-bell-btn');
  if (topbarBellBtn) {
    topbarBellBtn.addEventListener('click', () => {
      navigateToPage('notifications');
    });
  }
  
  // Sidebar settings trigger
  const sidebarSettingsBtn = document.getElementById('sidebar-settings-btn');
  if (sidebarSettingsBtn) {
    sidebarSettingsBtn.addEventListener('click', () => {
      navigateToPage('profile');
    });
  }
  
  // Notifications mark all read button
  const notifMarkReadBtn = document.getElementById('notif-mark-read-btn');
  if (notifMarkReadBtn) {
    notifMarkReadBtn.addEventListener('click', () => {
      state.notifications.forEach(n => n.unread = false);
      renderAll();
    });
  }
  
  // Initial render
  renderAll();
  initPortfolioChart();
  initSpotlightNavbar();
});

// ─── SpotlightNavbar Engine ──────────────────────────────────────────────────
function initSpotlightNavbar() {
  const nav    = document.getElementById('spotlight-nav');
  const pill   = document.getElementById('nav-spotlight-pill');
  const cursor = document.getElementById('nav-spotlight-cursor');
  if (!nav || !pill || !cursor) return;

  // Position the pill over a given nav <li> element
  function movePillTo(el) {
    const navRect = nav.getBoundingClientRect();
    const elRect  = el.getBoundingClientRect();
    pill.style.left  = (elRect.left - navRect.left) + 'px';
    pill.style.width = elRect.width + 'px';
    pill.style.opacity = '1';
  }

  // Move pill to the current active item immediately (no transition on first paint)
  function snapPillToActive() {
    const active = nav.querySelector('.nav-item.active');
    if (!active) return;
    pill.style.transition = 'none';
    movePillTo(active);
    // Re-enable transition after next frame
    requestAnimationFrame(() => {
      pill.style.transition = '';
    });
  }

  // On load, snap to active without animation
  snapPillToActive();

  // Also re-snap whenever window resizes (pill position is absolute px)
  window.addEventListener('resize', snapPillToActive);

  // Hover: slide pill to hovered item
  nav.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', () => movePillTo(item));
    item.addEventListener('mouseleave', () => {
      // Return to active item
      const active = nav.querySelector('.nav-item.active');
      if (active) movePillTo(active);
    });
  });

  // After navigation click the active class changes — re-snap pill
  const origNavigateToPage = window.navigateToPage;
  nav.addEventListener('click', () => {
    // Wait for active class to be set (navigateToPage runs synchronously)
    requestAnimationFrame(() => snapPillToActive());
  });

  // Cursor glow: track mouse position relative to nav and update the ::before pseudo
  nav.addEventListener('mousemove', (e) => {
    const rect = nav.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cursor.style.setProperty('--cx', x + 'px');
    cursor.style.setProperty('--cy', y + 'px');
    cursor.style.background =
      `radial-gradient(circle 80px at ${x}px ${y}px, rgba(255,255,255,0.10) 0%, transparent 70%)`;
  });

  nav.addEventListener('mouseleave', () => {
    cursor.style.background = 'none';
  });
}
