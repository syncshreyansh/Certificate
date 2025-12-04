// ============================================
// APPLICATION LOGIC OUTLINE
// Blockchain Document Verification System
// ============================================

// Global State Management
let currentRole = null;
let userAuthenticated = false;
let otpSent = false;

// ============================================
// NAVIGATION FUNCTIONS
// ============================================

/**
 * Navigate to selected user role section
 * @param {string} role - 'admin', 'hr', or 'user'
 */
function selectRole(role) {
    currentRole = role;
    document.getElementById('homepage').classList.remove('active');
    document.getElementById(role).classList.add('active');
}

/**
 * Return to homepage
 */
function goBack() {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById('homepage').classList.add('active');
    currentRole = null;
    resetAllForms();
}

/**
 * Reset all forms to initial state
 */
function resetAllForms() {
    document.getElementById('certificateForm').classList.add('hidden');
    document.getElementById('marksheetForm').classList.add('hidden');
    document.getElementById('legalForm').classList.add('hidden');
    document.getElementById('docTypeSelect').value = '';

    document.getElementById('verificationResult').classList.add('hidden');

    document.getElementById('otpStep1').classList.remove('hidden');
    document.getElementById('otpStep2').classList.add('hidden');
    document.getElementById('portfolioView').classList.add('hidden');
}

// ============================================
// ADMIN SECTION - DOCUMENT ISSUANCE
// ============================================

/**
 * Display appropriate form based on document type selection
 * @param {string} type - 'certificate', 'marksheet', or 'legal'
 */
function showDocumentForm(type) {
    document.getElementById('certificateForm').classList.add('hidden');
    document.getElementById('marksheetForm').classList.add('hidden');
    document.getElementById('legalForm').classList.add('hidden');

    if (type === 'certificate') {
        document.getElementById('certificateForm').classList.remove('hidden');
    } else if (type === 'marksheet') {
        document.getElementById('marksheetForm').classList.remove('hidden');
    } else if (type === 'legal') {
        document.getElementById('legalForm').classList.remove('hidden');
    }
}

/**
 * Handle Certificate submission
 * @param {Event} e - Form submit event
 */
function handleCertificateSubmit(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('cert_name').value,
        studentId: document.getElementById('cert_studentId').value,
        purpose: document.getElementById('cert_purpose').value,
        type: document.getElementById('cert_type').value,
        mobile: document.getElementById('cert_mobile').value,
        file: document.getElementById('cert_upload').files[0],
    };

    console.log('Certificate Form Data:', formData);
    alert('Certificate issued successfully! (Placeholder)');
}

/**
 * Handle Marksheet submission with auto-calculation
 * @param {Event} e - Form submit event
 */
function handleMarksheetSubmit(e) {
    e.preventDefault();

    const formData = {
        studentName: document.getElementById('mark_name').value,
        standard: document.getElementById('mark_standard').value,
        studentId: document.getElementById('mark_studentId').value,
        fatherName: document.getElementById('mark_father').value,
        motherName: document.getElementById('mark_mother').value,
        maxTotal: document.getElementById('mark_maxTotal').value,
        subjects: [],
        totalObtained: document.getElementById('mark_totalObtained').value,
        percentage: document.getElementById('mark_percentage').value,
        grade: document.getElementById('mark_grade').value,
        email: document.getElementById('mark_email').value,
        mobile: document.getElementById('mark_mobile').value,
        file: document.getElementById('mark_upload').files[0],
    };

    for (let i = 1; i <= 6; i++) {
        const name = document.getElementById(`sub${i}_name`)?.value;
        if (name) {
            formData.subjects.push({
                name,
                maxMarks: document.getElementById(`sub${i}_max`).value,
                obtained: document.getElementById(`sub${i}_obtained`).value,
            });
        }
    }

    console.log('Marksheet Form Data:', formData);
    alert('Marksheet issued successfully! (Placeholder)');
}

/**
 * Calculate total marks and percentage for Marksheet
 */
function calculateTotal() {
    let total = 0;
    const maxTotal = parseFloat(document.getElementById('mark_maxTotal').value) || 0;

    for (let i = 1; i <= 6; i++) {
        const obtained = parseFloat(document.getElementById(`sub${i}_obtained`)?.value) || 0;
        total += obtained;
    }

    document.getElementById('mark_totalObtained').value = total;

    if (maxTotal > 0) {
        const percentage = ((total / maxTotal) * 100).toFixed(2);
        document.getElementById('mark_percentage').value = `${percentage}%`;
    }
}

/**
 * Handle Legal Document submission with Digilocker flow
 * @param {Event} e - Form submit event
 */
function handleLegalDocSubmit(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('legal_name').value,
        docType: document.getElementById('legal_type').value,
        email: document.getElementById('legal_email').value,
        phone: document.getElementById('legal_phone').value,
        mobile: document.getElementById('legal_mobile').value,
        file: document.getElementById('legal_upload').files[0],
    };

    console.log('Legal Document Form Data:', formData);
    alert('Legal Document issued successfully! (Placeholder)');
}

/**
 * Simulate Digilocker verification
 */
function verifyDigilocker() {
    const phone = document.getElementById('legal_phone').value;
    const statusDiv = document.getElementById('digilockerStatus');

    if (!phone) {
        alert('Please enter a phone number first');
        return;
    }

    statusDiv.classList.remove('hidden');
    statusDiv.innerHTML = 'Checking Digilocker...';

    setTimeout(() => {
        const scenario = Math.random();
        if (scenario < 0.33) {
            statusDiv.innerHTML = '✓ Digilocker account verified';
        } else if (scenario < 0.66) {
            statusDiv.innerHTML = '⚠ Digilocker ID not found. Please verify via email or register.';
        } else {
            statusDiv.innerHTML = '⚠ Account not registered. Please register first, then verify.';
        }
    }, 1500);
}

// ============================================
// HR SECTION - DOCUMENT VERIFICATION
// ============================================

/**
 * Verify document using hash/QR code
 */
function verifyDocument() {
    const hash = document.getElementById('verifyHash').value;
    const termsChecked = document.getElementById('termsCheckbox').checked;
    const resultDiv = document.getElementById('verificationResult');

    if (!hash) {
        alert('Please enter a document hash');
        return;
    }

    if (!termsChecked) {
        alert('Please confirm the terms and conditions');
        return;
    }

    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <h3>Verification Result</h3>
        <p><strong>Status:</strong> Valid</p>
        <p><strong>Document Type:</strong> Certificate</p>
        <p><strong>Issued To:</strong> John Doe</p>
        <p><strong>Issued Date:</strong> 2024-01-15</p>
        <p><strong>Issuer:</strong> Axis Colleges</p>
    `;
}

// ============================================
// USER SECTION - PORTFOLIO WITH OTP
// ============================================

/**
 * Send OTP to user's phone
 */
function sendOTP() {
    const phone = document.getElementById('userPhone').value;

    if (!phone) {
        alert('Please enter your phone number');
        return;
    }

    console.log('Sending OTP to:', phone);

    setTimeout(() => {
        alert(`OTP sent to ${phone}`);
        document.getElementById('otpStep1').classList.add('hidden');
        document.getElementById('otpStep2').classList.remove('hidden');
        otpSent = true;
    }, 1000);
}

/**
 * Verify OTP and load user portfolio
 */
function verifyOTP() {
    const otp = document.getElementById('otpInput').value;

    if (!otp || otp.length !== 6) {
        alert('Please enter a valid 6-digit OTP');
        return;
    }

    console.log('Verifying OTP:', otp);

    setTimeout(() => {
        userAuthenticated = true;
        document.getElementById('otpStep2').classList.add('hidden');
        document.getElementById('portfolioView').classList.remove('hidden');
        loadUserDocuments();
    }, 1000);
}

/**
 * Load and display user's documents from blockchain
 */
function loadUserDocuments() {
    const documentsList = document.getElementById('documentsList');

    const mockDocuments = [
        { type: 'Certificate', name: 'Participation Certificate', date: '2024-01-15', hash: '0xabc123...' },
        { type: 'Marksheet', name: 'Grade 12 Marksheet', date: '2024-02-20', hash: '0xdef456...' },
    ];

    documentsList.innerHTML = mockDocuments.map(doc => `
        <div class="document-card">
            <h3>${doc.name}</h3>
            <p><strong>Type:</strong> ${doc.type}</p>
            <p><strong>Date:</strong> ${doc.date}</p>
            <p><strong>Hash:</strong> ${doc.hash}</p>
            <button class="submit-btn" onclick="copyHash('${doc.hash}')">Copy Hash</button>
        </div>
    `).join('');
}

/**
 * Copy hash to clipboard
 * @param {string} hash - Document hash
 */
function copyHash(hash) {
    navigator.clipboard.writeText(hash).then(() => {
        alert('Hash copied to clipboard!');
    });
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    const certForm = document.getElementById('certificateForm');
    if (certForm) {
        certForm.addEventListener('submit', handleCertificateSubmit);
    }

    const markForm = document.getElementById('marksheetForm');
    if (markForm) {
        markForm.addEventListener('submit', handleMarksheetSubmit);
    }

    const legalForm = document.getElementById('legalForm');
    if (legalForm) {
        legalForm.addEventListener('submit', handleLegalDocSubmit);
    }
});

// ============================================
// PLACEHOLDER FUNCTIONS FOR BLOCKCHAIN INTEGRATION
// ============================================

/**
 * Connect to MetaMask wallet
 * TODO: Implement wallet connection
 */
async function connectWallet() {
    if (!window.ethereum) {
        alert('MetaMask not detected. Please install MetaMask or use a compatible wallet.');
        return;
    }

    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
            setCurrentAccount(accounts[0]);
        }
    } catch (err) {
        console.error('Wallet connection failed', err);
    }
}

/**
 * Initialize Web3 provider
 * TODO: Implement Web3/Ethers.js initialization
 */
async function initializeProvider() {
    // Basic provider initialization using window.ethereum.
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts && accounts.length > 0) {
                setCurrentAccount(accounts[0]);
            } else {
                updateWalletUI(null);
            }

            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts && accounts.length > 0) {
                    setCurrentAccount(accounts[0]);
                } else {
                    setCurrentAccount(null);
                }
            });

            window.ethereum.on('chainChanged', (chainId) => {
                // Refresh UI on chain change
                console.log('chainChanged', chainId);
                updateWalletUI(null);
            });
        } catch (err) {
            console.error('Provider init failed', err);
        }
    } else {
        updateWalletUI(null);
    }
}

/**
 * Issue document to blockchain
 * TODO: Implement smart contract interaction
 */
async function issueToBlockchain(documentData) {
    // Implementation pending
}

// ============================================
// Wallet UI helpers
// ============================================
let currentAccount = null;

function setCurrentAccount(address) {
    currentAccount = address;
    updateWalletUI(address);
}

function updateWalletUI(address) {
    const btn = document.getElementById('walletButton');
    const status = document.getElementById('walletStatus');

    if (!btn || !status) return;

    if (address) {
        const short = `${address.slice(0, 6)}...${address.slice(-4)}`;
        btn.textContent = 'Connected';
        btn.classList.add('connected');
        status.textContent = `Account: ${short}`;
    } else {
        btn.textContent = 'Connect Wallet';
        btn.classList.remove('connected');
        status.textContent = window.ethereum ? 'Not connected' : 'No wallet detected';
    }
}

// Bind wallet button on load
document.addEventListener('DOMContentLoaded', function () {
    const walletBtn = document.getElementById('walletButton');
    if (walletBtn) {
        walletBtn.addEventListener('click', connectWallet);
    }

    // initialize provider and reflect any existing connection
    initializeProvider();
});

