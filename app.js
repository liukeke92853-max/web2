const tabTips = {
  upgradeable: "仅展示当前可提升橱窗佣金的商品。升级后不会改变已发布视频关联链接，投流商品请先加入白名单，避免影响投放效果。",
  zombie: "僵尸品包含失效商品及 3 个月前加入的无动销非定向商品。可释放坑位，提升橱窗坑位出单率。",
  whitelist: "您可以将不希望升级的商品加入白名单中进行保护。商家定向商品及投流商品会自动加入白名单中。"
};

const products = [
  {
    id: 1,
    account: "小公主",
    fans: 117,
    title: "SG / 杨依姗 SS 夏季面料超薄斜口袋抽绳半身裙",
    shop: "STELLAGIGI",
    price: "¥209.9",
    publicCommission: "5%",
    currentCommission: "10%",
    bossCommission: "10%",
    sevenSales: 0,
    yesterdaySales: 0,
    tabs: ["all", "upgradeable"],
    direction: "non-merchant",
    status: "",
    commissionScene: "no-boss-link"
  },
  {
    id: 2,
    account: "小公主",
    fans: 117,
    title: "SG / 杨依姗 SS 韩系碎花撞色荷叶边抹胸连衣裙",
    shop: "STELLAGIGI",
    price: "¥139",
    publicCommission: "5%",
    currentCommission: "10%",
    bossCommission: "10%",
    sevenSales: 0,
    yesterdaySales: 0,
    tabs: ["all", "upgradeable"],
    direction: "non-merchant",
    status: "expiring",
    commissionScene: "equal-partner",
    rewardText: "点击获得更多保障"
  },
  {
    id: 3,
    account: "小公主",
    fans: 117,
    title: "方形吸管杯牛奶果汁杯创意高值耐热水杯",
    shop: "热心宇宙人",
    price: "¥88",
    publicCommission: "5%",
    currentCommission: "30%",
    bossCommission: "30%",
    sevenSales: 13,
    yesterdaySales: 2,
    tabs: ["all", "whitelist"],
    direction: "non-merchant",
    status: "",
    commissionScene: "protected",
    addType: "手动添加"
  },
  {
    id: 4,
    account: "小公主",
    fans: 117,
    title: "轻氧 T 恤莫代尔薄透气短袖上衣",
    shop: "STELLAGIGI",
    price: "¥79.9",
    publicCommission: "5%",
    currentCommission: "10%",
    bossCommission: "20%",
    sevenSales: 0,
    yesterdaySales: 0,
    tabs: ["all", "upgradeable"],
    direction: "non-merchant",
    status: "",
    commissionScene: "higher-partner",
    estimatedEarn: "¥126.80",
    rebate: "5%"
  },
  {
    id: 5,
    account: "小公主",
    fans: 117,
    title: "直播间定向合作款高弹防晒外套",
    shop: "MOO LAB",
    price: "¥169",
    publicCommission: "20%",
    currentCommission: "20%",
    bossCommission: "20%",
    sevenSales: 6,
    yesterdaySales: 1,
    tabs: ["all", "whitelist"],
    direction: "merchant",
    status: "",
    commissionScene: "protected",
    addType: "自动添加"
  },
  {
    id: 6,
    account: "小公主",
    fans: 117,
    title: "失效商品 / 春季旧款宽松卫衣",
    shop: "原野商店",
    price: "¥99",
    publicCommission: "8%",
    currentCommission: "8%",
    bossCommission: "8%",
    sevenSales: 0,
    yesterdaySales: 0,
    tabs: ["all", "zombie"],
    direction: "non-merchant",
    status: "decreased",
    commissionScene: "zombie",
    zombieReason: "已失效商品",
    threeMonthSales: 0,
    addedAt: "2026-07-01 19:38:12",
    isInvalid: true
  },
  {
    id: 7,
    account: "小公主",
    fans: 117,
    title: "三个月前加入无动销非定向商品",
    shop: "清单供应链",
    price: "¥59",
    publicCommission: "10%",
    currentCommission: "10%",
    bossCommission: "10%",
    sevenSales: 0,
    yesterdaySales: 0,
    tabs: ["all", "zombie"],
    direction: "non-merchant",
    status: "will-decrease",
    commissionScene: "zombie",
    zombieReason: "近 3 个月无动销的非定向商品",
    threeMonthSales: 0,
    addedAt: "2026-05-08 14:20:36",
    isInvalid: false
  }
];

const state = {
  activeTab: "all",
  selectedIds: new Set(),
  query: "",
  statusFilters: {
    decreased: "all",
    expiring: "all",
    willDecrease: "all"
  },
  filters: {
    sales: "all",
    direction: "all"
  }
};

const productBody = document.querySelector("#productBody");
const productTableHead = document.querySelector("#productTableHead");
const tableShell = document.querySelector("#tableShell");
const emptyState = document.querySelector("#emptyState");
const tabTip = document.querySelector("#tabTip");
const bulkActions = document.querySelector("#bulkActions");
let selectAll = document.querySelector("#selectAll");
const searchInput = document.querySelector("#searchInput");
const filterSelects = document.querySelectorAll(".filter-select");
const recordModal = document.querySelector("#recordModal");
const upgradeModal = document.querySelector("#upgradeModal");
const upgradeModalTitle = document.querySelector("#upgradeModalTitle");
const upgradeModalDesc = document.querySelector("#upgradeModalDesc");
const settingConfirmModal = document.querySelector("#settingConfirmModal");
const settingConfirmTitle = document.querySelector("#settingConfirmTitle");
const settingConfirmDesc = document.querySelector("#settingConfirmDesc");
const confirmSettingCloseBtn = document.querySelector("#confirmSettingCloseBtn");
const keepSettingOpenBtn = document.querySelector("#keepSettingOpenBtn");
const removeWhiteModal = document.querySelector("#removeWhiteModal");
const preventAutoWhiteCheckbox = document.querySelector("#preventAutoWhiteCheckbox");
const cancelRemoveWhiteBtn = document.querySelector("#cancelRemoveWhiteBtn");
const confirmRemoveWhiteBtn = document.querySelector("#confirmRemoveWhiteBtn");
const addWhiteModal = document.querySelector("#addWhiteModal");
const cancelAddWhiteBtn = document.querySelector("#cancelAddWhiteBtn");
const confirmAddWhiteBtn = document.querySelector("#confirmAddWhiteBtn");
const releaseZombieModal = document.querySelector("#releaseZombieModal");
const releaseZombieDesc = document.querySelector("#releaseZombieDesc");
const cancelReleaseZombieBtn = document.querySelector("#cancelReleaseZombieBtn");
const confirmReleaseZombieBtn = document.querySelector("#confirmReleaseZombieBtn");
const autoReleaseGuideModal = document.querySelector("#autoReleaseGuideModal");
const cancelAutoReleaseGuideBtn = document.querySelector("#cancelAutoReleaseGuideBtn");
const confirmAutoReleaseGuideBtn = document.querySelector("#confirmAutoReleaseGuideBtn");

let pendingSettingSwitch = null;
let pendingRemoveWhiteIds = [];
let pendingAddWhiteIds = [];
let pendingReleaseZombieIds = [];
const currentOperator = {
  isOrgOwner: true
};

const statusFilterMap = {
  decreased: "decreased",
  expiring: "expiring",
  willDecrease: "will-decrease"
};

const settingCloseCopy = {
  autoUpgrade: {
    title: "确定关闭自动升级？",
    desc: "关闭后，机构下所有账号橱窗商品将不再自动替换为更高佣金链接。"
  },
  autoClean: {
    title: "确定关闭自动清理？",
    desc: "关闭后，系统将不再自动为僵尸品释放坑位。若橱窗满额，将无法升佣或添加商品到橱窗。"
  },
  homeReminder: {
    title: "确定关闭首页提醒？",
    desc: "关闭后，将不再收到订单首页橱窗商品升佣的弹窗提醒。"
  }
};

function matchYesNoFilter(value, matched) {
  return value === "all" || (value === "yes" && matched) || (value === "no" && !matched);
}

function getUpgradeableSortWeight(product) {
  if (product.commissionScene === "higher-partner") return 0;
  if (product.commissionScene === "equal-partner") return 1;
  return 2;
}

function tabProducts() {
  const filteredProducts = products.filter((product) => {
    const matchTab = product.tabs.includes(state.activeTab);
    const query = state.query.trim();
    const matchQuery = !query || product.title.includes(query) || product.shop.includes(query);
    const matchStatus = Object.entries(state.statusFilters).every(([key, value]) => {
      return matchYesNoFilter(value, product.status === statusFilterMap[key]);
    });
    const matchSales = state.filters.sales === "all"
      || (state.filters.sales === "has-sales" && product.sevenSales > 0)
      || (state.filters.sales === "no-sales" && product.sevenSales === 0);
    const matchDirection = state.filters.direction === "all" || product.direction === state.filters.direction;
    return matchTab && matchQuery && matchStatus && matchSales && matchDirection;
  });

  if (state.activeTab !== "upgradeable") return filteredProducts;

  return [...filteredProducts].sort((a, b) => {
    const priorityDiff = getUpgradeableSortWeight(a) - getUpgradeableSortWeight(b);
    return priorityDiff || products.indexOf(a) - products.indexOf(b);
  });
}

function renderCommission(product) {
  const current = `<strong>当前佣金 ${product.currentCommission}</strong>`;

  if (product.commissionScene === "no-boss-link") {
    return `
      <div class="commission-main simple">${current}</div>
      <p>联系顾问申请高佣</p>
    `;
  }

  if (product.commissionScene === "equal-partner") {
    return `
      <div class="commission-main">${current}</div>
      <button class="commission-action reward" type="button" data-row-action="upgrade" data-id="${product.id}">
        <span>抖老板高佣${product.bossCommission}，${product.rewardText}</span>
      </button>
    `;
  }

  if (product.commissionScene === "higher-partner") {
    return `
      <div class="commission-main">${current}</div>
      <button class="commission-action high" type="button" data-row-action="upgrade" data-id="${product.id}">
        <span>抖老板高佣 ${product.bossCommission}</span>
        <strong>预计多赚 ${product.estimatedEarn}</strong>
      </button>
    `;
  }

  if (product.commissionScene === "protected") {
    return `
      <div class="commission-main simple">${current}</div>
      <p>白名单保护中，不参与升佣</p>
    `;
  }

  if (product.commissionScene === "zombie") {
    return `
      <div class="commission-main simple">${current}</div>
    `;
  }

  return `<div class="commission-main simple">${current}</div>`;
}

function renderProductStatus(product) {
  const statusMap = {
    decreased: { text: "已降佣", className: "zombie", note: "佣金已低于原橱窗佣金" },
    expiring: { text: "7日内到期", className: "expire", note: "链接即将到期请联系客服" },
    "will-decrease": { text: "即将降佣", className: "expire", note: "该商品次日即将降佣请联系客服" }
  };
  const status = statusMap[product.status];

  if (status) {
    return `
      <div class="status-stack">
        <div class="tag-row">
          <span class="tag ${status.className}">${status.text}</span>
        </div>
        <span class="status-muted">${status.note}</span>
      </div>
    `;
  }

  if (product.tabs.includes("whitelist")) {
    if (state.activeTab !== "whitelist") {
      return `
        <div class="status-stack">
          <div class="tag-row">
            <span class="tag neutral">白名单保护中</span>
          </div>
          <span class="status-muted">不参与升佣</span>
        </div>
      `;
    }

    const addTypeClass = product.addType === "自动添加" ? "auto" : "manual";
    return `
      <div class="status-stack">
        <div class="tag-row">
          <span class="tag ${addTypeClass}">${product.addType || "手动添加"}</span>
        </div>
      </div>
    `;
  }

  return `<span class="status-muted">暂无风险状态</span>`;
}

function renderProductTitleStatus(product) {
  const statusMap = {
    decreased: { text: "已降佣", className: "zombie" },
    expiring: { text: "7日内到期", className: "expire" },
    "will-decrease": { text: "即将降佣", className: "expire" }
  };
  const status = statusMap[product.status];
  return status ? `<span class="tag ${status.className}">${status.text}</span>` : "";
}

function renderTableHeader() {
  const isZombie = state.activeTab === "zombie";
  productTableHead.innerHTML = isZombie
    ? `
      <tr>
        <th class="check-col"><input type="checkbox" id="selectAll"></th>
        <th>商品信息</th>
        <th>归属账号</th>
        <th>橱窗佣金</th>
        <th>近3个月我的出单</th>
        <th>添加橱窗时间</th>
        <th>建议清理原因</th>
        <th>操作</th>
      </tr>
    `
    : `
      <tr>
        <th class="check-col"><input type="checkbox" id="selectAll"></th>
        <th class="index-col">序号</th>
        <th>商品信息</th>
        <th>账号</th>
        <th>佣金状态</th>
        <th>出单表现</th>
        ${state.activeTab === "whitelist" ? "<th>添加类型</th>" : ""}
        <th>操作</th>
      </tr>
    `;
  selectAll = document.querySelector("#selectAll");
}

function renderZombieRows(items) {
  productBody.innerHTML = items.map((product) => {
    const checked = state.selectedIds.has(product.id) ? "checked" : "";
    const invalidClass = product.isInvalid ? " is-invalid" : "";
    const reasonTag = product.isInvalid
      ? { text: "失效商品", className: "zombie" }
      : { text: "无动销商品", className: "expire" };

    return `
      <tr class="zombie-product-row">
        <td><input type="checkbox" class="row-check" data-id="${product.id}" ${checked}></td>
        <td>
          <div class="product-info zombie-product-info${invalidClass}">
            <div class="product-thumb"></div>
            <div>
              <strong>${product.title}</strong>
              <p><span class="price">${product.price}</span> · 商品橱窗佣金：${product.currentCommission}</p>
            </div>
          </div>
        </td>
        <td class="account-cell">
          <div class="mini-account compact">
            <div class="mini-avatar"></div>
            <div>
              <strong>${product.account}</strong>
              <span>当前运营人：拿铁</span>
            </div>
          </div>
        </td>
        <td>
          <strong>当前佣金 ${product.currentCommission}</strong>
        </td>
        <td class="sales-cell">
          <p>${product.threeMonthSales ?? 0}</p>
        </td>
        <td class="time-cell">${product.addedAt || "-"}</td>
        <td class="reason-cell">
          <div class="status-stack">
            <div class="tag-row">
              <span class="tag ${reasonTag.className}">${reasonTag.text}</span>
            </div>
            <span class="status-muted">${product.zombieReason}</span>
          </div>
        </td>
        <td>
          <div class="row-actions">
            <button type="button" data-row-action="release-zombie" data-id="${product.id}">释放坑位</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function renderRows(items) {
  if (state.activeTab === "zombie") {
    renderZombieRows(items);
    return;
  }

  productBody.innerHTML = items.map((product, index) => {
    const checked = state.selectedIds.has(product.id) ? "checked" : "";
    const isWhitelistProduct = product.tabs.includes("whitelist");
    const addWhiteAction = isWhitelistProduct
      ? `<button class="is-disabled" type="button" disabled>加白名单</button>`
      : `<button type="button" data-row-action="add-white" data-id="${product.id}">加白名单</button>`;
    let action = `<button type="button" data-row-action="upgrade" data-id="${product.id}">升级</button>${addWhiteAction}<button class="danger-link" type="button" data-row-action="delete" data-id="${product.id}">删除</button>`;
    if (state.activeTab === "whitelist") {
      action = `<button class="danger-link" type="button" data-row-action="remove-white" data-id="${product.id}">移出白名单</button>`;
    }

    return `
      <tr>
        <td><input type="checkbox" class="row-check" data-id="${product.id}" ${checked}></td>
        <td>${index + 1}</td>
        <td>
          <div class="product-info">
            <div class="product-thumb"></div>
            <div>
              <div class="product-title-line">
                <strong>${product.title}</strong>
                ${state.activeTab !== "whitelist" ? renderProductTitleStatus(product) : ""}
              </div>
              <p>店铺：${product.shop}</p>
              <p><span class="price">${product.price}</span> · 公开佣金：${product.publicCommission}</p>
            </div>
          </div>
        </td>
        <td class="account-cell">
          <div class="mini-account">
            <div class="mini-avatar"></div>
            <div>
              <strong>${product.account}<span class="level-badge">LV0</span></strong>
              <span>粉丝：${product.fans} · 当前运营人：拿铁</span>
            </div>
          </div>
        </td>
        <td class="commission-cell">
          ${renderCommission(product)}
        </td>
        <td class="sales-cell">
          <p>近30日我的出单：${product.sevenSales}</p>
        </td>
        ${state.activeTab === "whitelist" ? `<td class="status-cell">${renderProductStatus(product)}</td>` : ""}
        <td>
          <div class="row-actions">${action}</div>
        </td>
      </tr>
    `;
  }).join("");
}

function renderBulkActions(items) {
  const selectedCount = state.selectedIds.size;
  const commonCount = `<span class="selected-count">已选：${selectedCount}</span>`;
  const whitelistCount = `<span class="selected-count">已选：${selectedCount}/100</span>`;
  const currentSelectAll = document.querySelector("#selectAll");

  if (selectedCount === 0) {
    bulkActions.innerHTML = state.activeTab === "whitelist" ? whitelistCount : commonCount;
    if (currentSelectAll) {
      currentSelectAll.checked = false;
    }
    return;
  }

  const templates = {
    all: `${commonCount}<button class="primary-btn" type="button" data-action="upgrade-selected">升级商品</button><button class="secondary-btn" type="button" data-action="sync-cart">同步抖音选品车</button><button class="secondary-btn" type="button" data-action="add-white">加入白名单</button><button class="danger-btn" type="button" data-action="delete-selected">删除</button>`,
    upgradeable: `${commonCount}<button class="primary-btn" type="button" data-action="upgrade-selected">升级商品</button><button class="secondary-btn" type="button" data-action="sync-cart">同步抖音选品车</button><button class="secondary-btn" type="button" data-action="add-white">加入白名单</button><button class="danger-btn" type="button" data-action="delete-selected">删除</button>`,
    zombie: `${commonCount}<button class="primary-btn" type="button" data-action="release-zombie">释放坑位</button>`,
    whitelist: `${whitelistCount}<button class="danger-btn" type="button" data-action="remove-white">移出白名单</button>`
  };

  bulkActions.innerHTML = templates[state.activeTab];
  if (currentSelectAll) {
    currentSelectAll.checked = items.length > 0 && items.every((item) => state.selectedIds.has(item.id));
  }
}

function renderEmpty() {
  tableShell.classList.add("hidden");
  emptyState.classList.remove("hidden");

  if (state.activeTab === "whitelist") {
    emptyState.innerHTML = `
      <div class="whitelist-empty-tip">
        您可以将不希望升级的商品加入白名单中进行保护。<br>
        商家定向商品及投流商品会自动加入白名单中。
      </div>
      <div class="empty-center">
        <div>
          <div class="empty-illustration"><i data-lucide="package-open"></i></div>
        </div>
        <div>
          <h3>暂无白名单商品</h3>
        </div>
        <div class="empty-actions">
          <button class="secondary-btn" type="button" data-action="choose-product">去选品</button>
          <button class="primary-btn" type="button" data-switch-tab="all">新增商品</button>
        </div>
      </div>
    `;
  } else if (state.activeTab === "zombie") {
    emptyState.innerHTML = `
      <div class="empty-center">
        <div class="empty-illustration"><i data-lucide="badge-check"></i></div>
        <div>
          <h3>您的橱窗很健康</h3>
          <p>暂无需要释放的僵尸品</p>
        </div>
      </div>
    `;
  } else {
    emptyState.innerHTML = `
      <div class="empty-center">
        <div class="empty-illustration"><i data-lucide="inbox"></i></div>
        <h3>暂无数据</h3>
      </div>
    `;
  }
}

function render() {
  const items = tabProducts();
  renderTableHeader();

  if (state.activeTab === "all") {
    tabTip.classList.add("hidden");
    tabTip.innerHTML = "";
  } else if (state.activeTab === "zombie") {
    tabTip.classList.remove("hidden");
    tabTip.innerHTML = `
      <div class="zombie-tip-layout">
        <div class="tip-copy">
          <i data-lucide="info"></i>
          <span>${tabTips.zombie}</span>
        </div>
        <div class="zombie-stats">
          <span>昨日失败次数 <strong>0</strong> 次</span>
          <span>橱窗达上限账号 <strong>0</strong> 个</span>
          <span>可释放坑位数 <strong>${items.length}</strong> 个</span>
          <button class="primary-btn zombie-release-all" type="button" data-action="release-zombie-all">一键释放</button>
        </div>
      </div>
    `;
  } else {
    tabTip.classList.remove("hidden");
    tabTip.innerHTML = `<i data-lucide="info"></i><span>${tabTips[state.activeTab]}</span>`;
  }
  renderBulkActions(items);

  if (items.length === 0) {
    renderEmpty();
  } else {
    emptyState.classList.add("hidden");
    tableShell.classList.remove("hidden");
    renderRows(items);
  }

  document.querySelectorAll(".main-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === state.activeTab);
  });
  filterSelects.forEach((select) => {
    const groupName = select.dataset.filterGroup;
    select.value = state.statusFilters[groupName] ?? state.filters[groupName];
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function switchTab(tab) {
  state.activeTab = tab;
  state.selectedIds.clear();
  state.query = "";
  state.statusFilters = { decreased: "all", expiring: "all", willDecrease: "all" };
  state.filters = { sales: "all", direction: "all" };
  searchInput.value = "";
  filterSelects.forEach((select) => {
    select.value = "all";
  });
  recordModal.classList.add("hidden");
  render();
}

function resetFilters() {
  state.query = "";
  state.statusFilters = { decreased: "all", expiring: "all", willDecrease: "all" };
  state.filters = { sales: "all", direction: "all" };
  state.selectedIds.clear();
  searchInput.value = "";
  filterSelects.forEach((select) => {
    select.value = "all";
  });
  render();
}

function removeFromWhitelist(ids) {
  products.forEach((product) => {
    if (!ids.includes(product.id)) return;
    product.tabs = product.tabs.filter((tab) => tab !== "whitelist");
    product.addType = "";
  });
  state.selectedIds.clear();
  render();
}

function addToWhitelist(ids) {
  products.forEach((product) => {
    if (!ids.includes(product.id)) return;
    if (!product.tabs.includes("whitelist")) {
      product.tabs.push("whitelist");
    }
    product.addType = "手动添加";
  });
  state.selectedIds.clear();
  switchTab("whitelist");
}

function releaseZombieProducts(ids) {
  products.forEach((product) => {
    if (!ids.includes(product.id)) return;
    product.tabs = product.tabs.filter((tab) => tab !== "zombie");
    product.status = "";
  });
  state.selectedIds.clear();
  render();
}

function openUpgradeModal(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  upgradeModalTitle.textContent = "升级商品";
  if (product.commissionScene === "equal-partner") {
    upgradeModalDesc.textContent = `抖老板高佣${product.bossCommission}，升级后可领取金币激励，并获得抖老板链接保障。`;
  } else if (product.commissionScene === "higher-partner") {
    upgradeModalDesc.textContent = `合作链接佣金 ${product.bossCommission} 高于当前佣金 ${product.currentCommission}，预计多赚 ${product.estimatedEarn}。`;
  } else {
    upgradeModalDesc.textContent = "该商品暂无可升级的抖老板合作链接。";
  }
  upgradeModal.classList.remove("hidden");
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function openSettingConfirmModal(switchButton) {
  const copy = settingCloseCopy[switchButton.dataset.settingKey] || settingCloseCopy.autoUpgrade;
  pendingSettingSwitch = switchButton;
  settingConfirmTitle.textContent = copy.title;
  settingConfirmDesc.textContent = copy.desc;
  settingConfirmModal.classList.remove("hidden");
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function closeSettingConfirmModal() {
  settingConfirmModal.classList.add("hidden");
  pendingSettingSwitch = null;
}

function openRemoveWhiteModal(ids) {
  pendingRemoveWhiteIds = ids;
  preventAutoWhiteCheckbox.checked = false;
  removeWhiteModal.classList.remove("hidden");
}

function closeRemoveWhiteModal() {
  removeWhiteModal.classList.add("hidden");
  pendingRemoveWhiteIds = [];
}

function openAddWhiteModal(ids) {
  pendingAddWhiteIds = ids;
  addWhiteModal.classList.remove("hidden");
}

function closeAddWhiteModal() {
  addWhiteModal.classList.add("hidden");
  pendingAddWhiteIds = [];
}

function openReleaseZombieModal(ids, mode = "selected") {
  pendingReleaseZombieIds = ids;
  if (mode === "all") {
    const accountCount = new Set(
      products
        .filter((product) => ids.includes(product.id))
        .map((product) => product.account)
    ).size;
    releaseZombieDesc.textContent = `本次将释放 ${accountCount} 个账号下的 ${ids.length} 个僵尸品坑位`;
  } else {
    releaseZombieDesc.textContent = ids.length > 1
      ? `确认释放已勾选的${ids.length}个僵尸品坑位吗？`
      : "确认释放该僵尸品坑位吗？";
  }
  releaseZombieModal.classList.remove("hidden");
}

function closeReleaseZombieModal() {
  releaseZombieModal.classList.add("hidden");
  pendingReleaseZombieIds = [];
}

function shouldShowAutoReleaseGuide() {
  const autoCleanSwitch = document.querySelector('[data-setting-key="autoClean"]');
  const isAutoCleanOn = autoCleanSwitch?.classList.contains("is-on");
  return currentOperator.isOrgOwner && !isAutoCleanOn;
}

function openAutoReleaseGuideModal() {
  autoReleaseGuideModal.classList.remove("hidden");
}

function closeAutoReleaseGuideModal() {
  autoReleaseGuideModal.classList.add("hidden");
}

document.querySelectorAll(".main-tab").forEach((tab) => {
  tab.addEventListener("click", () => switchTab(tab.dataset.tab));
});

document.querySelector("#resetFilterBtn").addEventListener("click", resetFilters);

document.querySelector("#queryFilterBtn").addEventListener("click", () => {
  state.selectedIds.clear();
  render();
});

filterSelects.forEach((select) => {
  select.addEventListener("change", () => {
    const group = select.dataset.filterGroup;
    if (group in state.statusFilters) {
      state.statusFilters[group] = select.value;
    } else {
      state.filters[group] = select.value;
    }
    state.selectedIds.clear();
    render();
  });
});

document.body.addEventListener("click", (event) => {
  const switchBtn = event.target.closest("[data-switch-tab]");
  if (switchBtn) {
    switchTab(switchBtn.dataset.switchTab);
    return;
  }

  const actionBtn = event.target.closest("[data-action]");
  if (!actionBtn) return;

  const action = actionBtn.dataset.action;
  if (action === "add-product") {
    switchTab("all");
  } else if (action === "choose-product") {
    switchTab("upgradeable");
  } else if (action === "remove-white") {
    const ids = state.selectedIds.size > 0
      ? Array.from(state.selectedIds)
      : tabProducts().map((product) => product.id);
    openRemoveWhiteModal(ids);
  } else if (action === "add-white") {
    openAddWhiteModal(Array.from(state.selectedIds));
  } else if (action === "release-zombie") {
    const ids = state.selectedIds.size > 0
      ? Array.from(state.selectedIds)
      : tabProducts().map((product) => product.id);
    openReleaseZombieModal(ids);
  } else if (action === "release-zombie-all") {
    openReleaseZombieModal(tabProducts().map((product) => product.id), "all");
  } else if (action === "upgrade-all" || action === "upgrade-selected") {
    const targetId = state.selectedIds.size > 0
      ? Array.from(state.selectedIds)[0]
      : tabProducts().find((product) => product.tabs.includes("upgradeable"))?.id;
    if (targetId) {
      openUpgradeModal(targetId);
    }
  } else {
    actionBtn.blur();
  }
});

productBody.addEventListener("click", (event) => {
  const rowAction = event.target.closest("[data-row-action]");
  if (!rowAction) return;

  const id = Number(rowAction.dataset.id);
  if (rowAction.dataset.rowAction === "remove-white") {
    openRemoveWhiteModal([id]);
  } else if (rowAction.dataset.rowAction === "release-zombie") {
    openReleaseZombieModal([id]);
  } else if (rowAction.dataset.rowAction === "add-white") {
    openAddWhiteModal([id]);
  } else if (rowAction.dataset.rowAction === "upgrade") {
    openUpgradeModal(id);
  }
});

productBody.addEventListener("change", (event) => {
  const checkbox = event.target.closest(".row-check");
  if (!checkbox) return;

  const id = Number(checkbox.dataset.id);
  if (checkbox.checked) {
    state.selectedIds.add(id);
  } else {
    state.selectedIds.delete(id);
  }
  render();
});

tableShell.addEventListener("change", (event) => {
  if (event.target.id !== "selectAll") return;

  const items = tabProducts();
  if (event.target.checked) {
    items.forEach((item) => state.selectedIds.add(item.id));
  } else {
    items.forEach((item) => state.selectedIds.delete(item.id));
  }
  render();
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  state.selectedIds.clear();
  render();
});

document.querySelector("#openRecordBtn").addEventListener("click", () => {
  recordModal.classList.remove("hidden");
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

document.querySelector("#closeRecordBtn").addEventListener("click", () => {
  recordModal.classList.add("hidden");
});

recordModal.addEventListener("click", (event) => {
  if (event.target === recordModal) {
    recordModal.classList.add("hidden");
  }
});

document.querySelector("#closeUpgradeBtn").addEventListener("click", () => {
  upgradeModal.classList.add("hidden");
});

document.querySelector("#cancelUpgradeBtn").addEventListener("click", () => {
  upgradeModal.classList.add("hidden");
});

upgradeModal.addEventListener("click", (event) => {
  if (event.target === upgradeModal) {
    upgradeModal.classList.add("hidden");
  }
});

document.querySelectorAll(".switch").forEach((switchButton) => {
  switchButton.addEventListener("click", (event) => {
    const currentSwitch = event.currentTarget;
    if (currentSwitch.classList.contains("is-on")) {
      openSettingConfirmModal(currentSwitch);
      return;
    }
    currentSwitch.classList.add("is-on");
  });
});

confirmSettingCloseBtn.addEventListener("click", () => {
  if (pendingSettingSwitch) {
    pendingSettingSwitch.classList.remove("is-on");
  }
  closeSettingConfirmModal();
});

keepSettingOpenBtn.addEventListener("click", closeSettingConfirmModal);

settingConfirmModal.addEventListener("click", (event) => {
  if (event.target === settingConfirmModal) {
    closeSettingConfirmModal();
  }
});

cancelRemoveWhiteBtn.addEventListener("click", closeRemoveWhiteModal);

confirmRemoveWhiteBtn.addEventListener("click", () => {
  if (preventAutoWhiteCheckbox.checked) {
    products.forEach((product) => {
      if (pendingRemoveWhiteIds.includes(product.id)) {
        product.preventAutoWhite = true;
      }
    });
  }
  removeFromWhitelist(pendingRemoveWhiteIds);
  closeRemoveWhiteModal();
});

removeWhiteModal.addEventListener("click", (event) => {
  if (event.target === removeWhiteModal) {
    closeRemoveWhiteModal();
  }
});

cancelAddWhiteBtn.addEventListener("click", closeAddWhiteModal);

confirmAddWhiteBtn.addEventListener("click", () => {
  addToWhitelist(pendingAddWhiteIds);
  closeAddWhiteModal();
});

addWhiteModal.addEventListener("click", (event) => {
  if (event.target === addWhiteModal) {
    closeAddWhiteModal();
  }
});

cancelReleaseZombieBtn.addEventListener("click", closeReleaseZombieModal);

confirmReleaseZombieBtn.addEventListener("click", () => {
  const shouldGuide = shouldShowAutoReleaseGuide();
  const releaseIds = [...pendingReleaseZombieIds];
  closeReleaseZombieModal();
  releaseZombieProducts(releaseIds);
  if (shouldGuide) {
    openAutoReleaseGuideModal();
  }
});

releaseZombieModal.addEventListener("click", (event) => {
  if (event.target === releaseZombieModal) {
    closeReleaseZombieModal();
  }
});

cancelAutoReleaseGuideBtn.addEventListener("click", closeAutoReleaseGuideModal);

confirmAutoReleaseGuideBtn.addEventListener("click", () => {
  const autoCleanSwitch = document.querySelector('[data-setting-key="autoClean"]');
  autoCleanSwitch?.classList.add("is-on");
  closeAutoReleaseGuideModal();
});

autoReleaseGuideModal.addEventListener("click", (event) => {
  if (event.target === autoReleaseGuideModal) {
    closeAutoReleaseGuideModal();
  }
});

const floatingSidebar = document.querySelector("#floatingSidebar");
const sidebarToggle = document.querySelector(".sidebar-toggle");
const appSidebarToggle = document.querySelector("#appSidebarToggle");

appSidebarToggle.addEventListener("click", () => {
  const isCollapsed = document.body.classList.toggle("app-sidebar-collapsed");
  appSidebarToggle.setAttribute("aria-label", isCollapsed ? "展开侧边导航" : "收起侧边导航");
});

sidebarToggle.addEventListener("click", () => {
  const isCollapsed = floatingSidebar.classList.toggle("is-collapsed");
  sidebarToggle.setAttribute("aria-label", isCollapsed ? "展开侧边栏" : "收起侧边栏");
});

render();
