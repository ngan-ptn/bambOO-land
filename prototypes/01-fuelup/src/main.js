import './style.css'

/**
 * DATABASE
 */
const FOOD_DB = [
    { id: 'pho-bo', name_vi: 'Phở Bò', name_en: 'Beef Pho', category: 'Noodles', icon: '🍜', portions: { S: { kcal: 350, p: 18, c: 45, f: 10 }, M: { kcal: 450, p: 25, c: 60, f: 12 }, L: { kcal: 600, p: 35, c: 80, f: 15 } } },
    { id: 'banh-mi', name_vi: 'Bánh Mì', name_en: 'Baguette', category: 'Bread', icon: '🥖', portions: { S: { kcal: 280, p: 10, c: 40, f: 12 }, M: { kcal: 420, p: 18, c: 55, f: 18 }, L: { kcal: 580, p: 25, c: 75, f: 24 } } },
    { id: 'com-tam', name_vi: 'Cơm Tấm', name_en: 'Broken Rice', category: 'Rice', icon: '🍛', portions: { S: { kcal: 400, p: 20, c: 55, f: 15 }, M: { kcal: 650, p: 35, c: 75, f: 25 }, L: { kcal: 900, p: 50, c: 100, f: 35 } } },
    { id: 'bun-cha', name_vi: 'Bún Chả', name_en: 'Grilled Pork Noodles', category: 'Noodles', icon: '🥣', portions: { S: { kcal: 380, p: 20, c: 50, f: 15 }, M: { kcal: 520, p: 28, c: 65, f: 20 }, L: { kcal: 750, p: 40, c: 90, f: 28 } } },
    { id: 'ca-phe-sua-da', name_vi: 'Cà Phê Sữa Đá', name_en: 'Iced Milk Coffee', category: 'Drinks', icon: '☕', portions: { S: { kcal: 120, p: 2, c: 20, f: 4 }, M: { kcal: 180, p: 3, c: 30, f: 6 }, L: { kcal: 260, p: 4, c: 45, f: 8 } } }
];

/**
 * STREAK PARTNERS STATE
 */
let state = {
    profiles: [
        { id: 'u1', name: 'Duy', target: 2200, macros: { p: 150, c: 250, f: 70 }, avatarColor: '#4E3D42' },
        { id: 'u2', name: 'Anh', target: 1800, macros: { p: 110, c: 200, f: 55 }, avatarColor: '#E29578' }
    ],
    activeId: 'u1',
    partnerId: 'u2',
    logs: [],
    streak: {
        days: 12,
        lastLoggedDate: new Date().toDateString(),
        milestones: [7, 30, 100]
    },
    currentView: 'dashboard',
    currentCategory: 'All',
    selectedFood: null
};

/**
 * INITIALIZATION
 */
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    renderCategoryTabs();
    renderFoodGrid();
    refreshUI();

    // Simulating the "Evening Warning"
    setTimeout(() => {
        const today = new Date().toDateString();
        const partnerLogs = state.logs.filter(l => l.profileId === state.partnerId && new Date(l.date).toDateString() === today);
        if(partnerLogs.length === 0) {
            document.getElementById('partner-nudge-card').classList.remove('hidden');
            document.getElementById('nudge-text').textContent = `Don't let ${state.profiles.find(p=>p.id===state.partnerId).name} down!`;
        }
    }, 1000);
});

function loadData() {
    const savedData = localStorage.getItem('fuelup_streak_state');
    if (savedData) {
        const parsed = JSON.parse(savedData);
        state.logs = parsed.logs || [];
        state.activeId = parsed.activeId || 'u1';
        state.streak = parsed.streak || state.streak;
    } else {
        // Seed a log for the partner to simulate they already started today
        state.logs.push({
            id: 'seed-p',
            profileId: 'u2',
            date: new Date().toISOString(),
            name_vi: 'Bánh Mì',
            kcal: 420,
            protein: 15, carbs: 50, fat: 12, icon: '🥖', portion: 'M'
        });
    }
    saveData();
}

function saveData() {
    localStorage.setItem('fuelup_streak_state', JSON.stringify({
        logs: state.logs,
        activeId: state.activeId,
        streak: state.streak
    }));
}

/**
 * DASHBOARD & STREAK LOGIC
 */
function refreshUI() {
    const activeUser = state.profiles.find(p => p.id === state.activeId);
    const partner = state.profiles.find(p => p.id === state.partnerId);

    // Header Update
    document.getElementById('active-user-name').textContent = activeUser.name;
    const avatar = document.getElementById('current-user-avatar');
    avatar.textContent = activeUser.name.charAt(0).toUpperCase();
    avatar.style.backgroundColor = activeUser.avatarColor;

    // Streak Count
    document.getElementById('streak-counter').textContent = state.streak.days;

    // Daily Status Indicators
    const today = new Date().toDateString();
    const myLogs = state.logs.filter(l => l.profileId === state.activeId && new Date(l.date).toDateString() === today);
    const partnerLogs = state.logs.filter(l => l.profileId === state.partnerId && new Date(l.date).toDateString() === today);

    const meLogged = myLogs.length > 0;
    const pLogged = partnerLogs.length > 0;

    updateIndicator('me', activeUser, meLogged);
    updateIndicator('partner', partner, pLogged);

    // If both logged, we might check for milestone celebrate or increment (simplified)
    if(meLogged && pLogged) {
        document.getElementById('status-text').textContent = "Both fuels in! Streak is safe today. 🔥";
        document.getElementById('status-text').classList.remove('text-brown-neutral');
        document.getElementById('status-text').classList.add('text-green-primary');
        // Hide nudge card if it was there
        document.getElementById('partner-nudge-card').classList.add('hidden');
    } else {
        document.getElementById('status-text').textContent = "One of you still needs to log fuel!";
        document.getElementById('status-text').classList.remove('text-green-primary');
        document.getElementById('status-text').classList.add('text-brown-neutral');
    }

    // Calorie summary
    const myTotals = myLogs.reduce((acc, curr) => ({
        kcal: acc.kcal + curr.kcal, p: acc.p + curr.protein, c: acc.c + curr.carbs, f: acc.f + curr.fat
    }), { kcal: 0, p: 0, c: 0, f: 0 });

    document.getElementById('display-remaining').textContent = Math.round(activeUser.target - myTotals.kcal);
    const ring = document.getElementById('main-progress-ring');
    ring.style.strokeDashoffset = 175.93 - (Math.min(myTotals.kcal / activeUser.target, 1) * 175.93);

    renderMealList(myLogs);
    saveData();
}

function updateIndicator(type, user, isLogged) {
    const icon = document.getElementById(`${type}-indicator-icon`);
    const label = document.getElementById(`${type}-indicator-label`);
    const dot = document.getElementById(`${type}-status-dot`);

    icon.textContent = user.name.charAt(0).toUpperCase();
    icon.style.backgroundColor = user.avatarColor;
    label.textContent = user.name;

    if (isLogged) {
        dot.className = "w-2 h-2 rounded-full bg-green-primary shadow-[0_0_8px_rgba(120,157,138,0.8)]";
    } else {
        dot.className = "w-2 h-2 rounded-full bg-red-400";
    }
}

/**
 * MEAL LOG & SCANNER
 */
window.navigate = function(view) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById(`view-${view}`).classList.remove('hidden');
    state.currentView = view;

    document.querySelectorAll('nav button').forEach(b => {
        b.classList.remove('text-green-primary');
        b.classList.add('text-gray-400');
    });
    const activeBtn = document.getElementById(`nav-${view}`);
    if (activeBtn) {
        activeBtn.classList.remove('text-gray-400');
        activeBtn.classList.add('text-green-primary');
    }

    if(view === 'settings') renderHouseholdList();
    if(view === 'dashboard') refreshUI();
    window.scrollTo(0, 0);
}

window.setAddMode = function(mode) {
    const manualView = document.getElementById('quick-add-manual');
    const scanView = document.getElementById('quick-add-scan');
    const manualBtn = document.getElementById('mode-manual-btn');
    const scanBtn = document.getElementById('mode-scan-btn');
    if(mode === 'manual') {
        manualView.classList.remove('hidden');
        scanView.classList.add('hidden');
        manualBtn.className = "flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all bg-white text-brown-90 shadow-sm";
        scanBtn.className = "flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all text-gray-400";
    } else {
        manualView.classList.add('hidden');
        scanView.classList.remove('hidden');
        scanBtn.className = "flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all bg-white text-brown-90 shadow-sm";
        manualBtn.className = "flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all text-gray-400";
        resetScanner();
    }
}

window.startScanning = function() {
    document.getElementById('capture-btn').classList.add('hidden');
    document.getElementById('scanning-label').classList.remove('hidden');
    document.getElementById('scan-anim').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('scanning-label').classList.add('hidden');
        document.getElementById('scan-anim').classList.add('hidden');
        document.getElementById('camera-overlay').classList.add('hidden');
        document.getElementById('scan-result').classList.remove('hidden');
        state.selectedFood = FOOD_DB.find(f => f.id === 'pho-bo');
    }, 2000);
}

function resetScanner() {
    document.getElementById('capture-btn').classList.remove('hidden');
    document.getElementById('scan-result').classList.add('hidden');
    document.getElementById('camera-overlay').classList.remove('hidden');
}

window.logScannedFood = function() {
    if(!state.selectedFood) return;
    selectPortion('M');
}

window.openPortionPicker = function(foodId) {
    const food = FOOD_DB.find(f => f.id === foodId);
    state.selectedFood = food;
    document.getElementById('ps-name-vi').textContent = food.name_vi;
    document.getElementById('ps-name-en').textContent = food.name_en;
    document.getElementById('ps-cal-s').textContent = food.portions.S.kcal + ' kcal';
    document.getElementById('ps-cal-m').textContent = food.portions.M.kcal + ' kcal';
    document.getElementById('ps-cal-l').textContent = food.portions.L.kcal + ' kcal';
    document.getElementById('portion-overlay').classList.add('opacity-100', 'pointer-events-auto');
    document.getElementById('portion-sheet').classList.add('active');
}

window.closePortionPicker = function() {
    document.getElementById('portion-overlay').classList.remove('opacity-100', 'pointer-events-auto');
    document.getElementById('portion-sheet').classList.remove('active');
}

window.selectPortion = function(size) {
    if (!state.selectedFood) return;
    const p = state.selectedFood.portions[size];
    const log = {
        id: 'l-' + Date.now(), date: new Date().toISOString(), profileId: state.activeId,
        name_vi: state.selectedFood.name_vi, icon: state.selectedFood.icon, portion: size,
        kcal: p.kcal, protein: p.p, carbs: p.c, fat: p.f
    };
    state.logs.push(log);

    // Logic to check if streak milestones hit
    checkMilestones();

    refreshUI();
    closePortionPicker();
    showToast(`${log.name_vi} logged! 🔥 Streak safe.`);
    setTimeout(() => navigate('dashboard'), 600);
}

function checkMilestones() {
    const today = new Date().toDateString();
    const meLogged = state.logs.some(l => l.profileId === state.activeId && new Date(l.date).toDateString() === today);
    const pLogged = state.logs.some(l => l.profileId === state.partnerId && new Date(l.date).toDateString() === today);

    if (meLogged && pLogged) {
        // In a real app, logic would prevent double increment. For demo, we assume first time both log today.
        if(state.streak.milestones.includes(state.streak.days)) {
            showToast(`🏆 Milestone! ${state.streak.days} Days Streak!`);
        }
    }
}

function renderMealList(logs) {
    const list = document.getElementById('meal-list');
    const mealCount = document.getElementById('meal-count');
    if (logs.length === 0) {
        list.innerHTML = `<div class="text-center py-10 bg-white/50 rounded-2xl-24 border-2 border-dashed border-gray-200"><p class="text-xs font-black text-gray-400">Log some urban fuel to protect the streak!</p></div>`;
        mealCount.textContent = `0 ITEMS`;
        return;
    }
    mealCount.textContent = `${logs.length} ITEMS`;
    list.innerHTML = logs.slice().reverse().map(log => `
        <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between group fade-in-up">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-xl">${log.icon}</div>
                <div>
                    <div class="font-bold text-sm text-brown-90">${log.name_vi}</div>
                    <div class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">${log.portion} • ${Math.round(log.kcal)} KCAL</div>
                </div>
            </div>
            <button onclick="deleteMeal('${log.id}')" class="p-2 text-gray-200 hover:text-brown-neutral opacity-0 group-hover:opacity-100"><span class="material-symbols-outlined text-lg">delete</span></button>
        </div>`).join('');
}

window.deleteMeal = function(id) {
    state.logs = state.logs.filter(l => l.id !== id);
    refreshUI();
    showToast('Meal removed');
}

/**
 * CATEGORY & GRID
 */
function renderCategoryTabs() {
    const container = document.getElementById('category-tabs');
    const categories = ['All', 'Noodles', 'Rice', 'Bread', 'Drinks'];
    container.innerHTML = categories.map(cat => `
        <button onclick="setCategory('${cat}')" class="whitespace-nowrap px-5 py-2 rounded-full font-bold text-xs transition-all ${state.currentCategory === cat ? 'bg-brown-90 text-white shadow-sm' : 'bg-white text-gray-400 border border-gray-100'}">${cat}</button>`).join('');
}

window.setCategory = function(cat) {
    state.currentCategory = cat;
    renderCategoryTabs();
    renderFoodGrid();
}

function renderFoodGrid() {
    const grid = document.getElementById('food-grid');
    const filtered = state.currentCategory === 'All' ? FOOD_DB : FOOD_DB.filter(f => f.category === state.currentCategory);
    grid.innerHTML = filtered.map(food => `
        <button onclick="openPortionPicker('${food.id}')" class="food-tile bg-white rounded-2xl-24 p-4 text-left border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-1 hover:border-purple-tertiary transition-all">
            <div class="text-3xl mb-1">${food.icon}</div>
            <div class="font-bold text-xs text-brown-90 truncate w-full text-center">${food.name_vi}</div>
        </button>`).join('');
}

/**
 * PARTNERSHIP CONTROLS
 */
function renderHouseholdList() {
    const list = document.getElementById('household-members-list');
    list.innerHTML = state.profiles.map(p => `
        <div class="bg-white p-4 rounded-2xl border ${p.id === state.activeId ? 'border-orange-secondary ring-2 ring-orange-secondary/10' : 'border-gray-100'} flex items-center justify-between cursor-pointer" onclick="switchProfile('${p.id}')">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full flex items-center justify-center font-black text-white" style="background-color: ${p.avatarColor}">${p.name[0].toUpperCase()}</div>
                <span class="font-bold text-sm text-brown-90">${p.name} ${p.id === state.activeId ? '(You)' : ''}</span>
            </div>
        </div>`).join('');
}

window.switchProfile = function(id) {
    state.activeId = id;
    state.partnerId = (id === 'u1') ? 'u2' : 'u1';

    const partner = state.profiles.find(p => p.id === state.partnerId);
    document.getElementById('partner-settings-name').textContent = partner.name;
    document.getElementById('partner-settings-avatar').textContent = partner.name[0];
    document.getElementById('partner-settings-avatar').style.backgroundColor = partner.avatarColor;

    refreshUI();
    showToast(`Perspective switched to ${state.profiles.find(p=>p.id===id).name}`);
    if(state.currentView === 'settings') renderHouseholdList();
}

window.sendNudge = function() {
    const partner = state.profiles.find(p => p.id === state.partnerId);
    showToast(`Nudge sent to ${partner.name}! 🔔`);
    document.getElementById('partner-nudge-card').classList.add('hidden');
}

function showToast(msg) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'bg-brown-90/95 backdrop-blur text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center justify-between mb-2 pointer-events-auto animate-in slide-in-from-bottom duration-300';
    toast.innerHTML = `<span class="text-[11px] font-black tracking-tight">${msg}</span><button onclick="this.parentElement.remove()" class="text-white/40 ml-4"><span class="material-symbols-outlined text-sm">close</span></button>`;
    container.appendChild(toast);
    setTimeout(() => {
        if(toast.parentElement) {
            toast.classList.add('opacity-0');
            setTimeout(()=>toast.remove(), 500);
        }
    }, 4000);
}

window.clearAllData = function() {
    if(confirm('Reset streak and history?')) {
        localStorage.clear();
        location.reload();
    }
}
