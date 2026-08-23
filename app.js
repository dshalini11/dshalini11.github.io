/**
 * SHALINI DAS - DATA ANALYST PORTFOLIO INTERACTIVE APPLICATION
 * Features: Interactive Data Sandbox Chart.js, Skills Radar, Dynamic Typing, Project Modals, Resume Viewer
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. TYPING ANIMATION IN HERO
  // ==========================================
  const typingElement = document.getElementById('typing-element');
  const roles = [
    "Data Analyst",
    "SQL & DBMS Specialist",
    "Python Analytics Explorer",
    "Tableau & Power BI Dashboarder",
    "Machine Learning Developer"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at top
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // ==========================================
  // 2. NAVBAR SCROLL EFFECT & MOBILE MENU
  // ==========================================
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight active section on scroll
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href*=${sectionId}]`);

      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile nav when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // ==========================================
  // 3. INTERACTIVE DATA SANDBOX (CHART.JS)
  // ==========================================
  const sandboxTabs = document.querySelectorAll('.sandbox-tab');
  const chartTitle = document.getElementById('sandbox-chart-title');
  const codeContent = document.getElementById('sandbox-code-content');
  const impactText = document.getElementById('sandbox-impact-text');
  const kpiContainer = document.getElementById('sandbox-kpi-container');
  const btnRefreshData = document.getElementById('btn-refresh-data');
  const btnCopySql = document.getElementById('btn-copy-sql');

  let sandboxChartInstance = null;

  // Datasets Configuration
  const datasetsConfig = {
    market: {
      title: "Real-Time Financial Stock Trends & LLM Forecasts",
      chartType: "line",
      labels: ["09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30"],
      dataSets: [
        {
          label: "Stock Price ($)",
          data: [178.5, 181.2, 179.8, 184.6, 186.1, 185.3, 189.4],
          borderColor: "#00f2fe",
          backgroundColor: "rgba(0, 242, 254, 0.12)",
          fill: true,
          tension: 0.35,
          borderWidth: 3
        },
        {
          label: "50-MA Indicator ($)",
          data: [176.0, 177.5, 178.9, 180.2, 181.8, 183.1, 184.5],
          borderColor: "#8b5cf6",
          borderDash: [5, 5],
          borderWidth: 2,
          fill: false
        }
      ],
      kpis: [
        { label: "Current Price", value: "$189.40" },
        { label: "Live Trend Insights", value: "+6.1% Bullish" },
        { label: "LLM Confidence", value: "94.2% (Groq)" }
      ],
      code: `# Python Pandas & Groq LLM Market Analysis Pipeline
import pandas as pd
from groq import Groq

def analyze_market_trends(df_stocks):
    # Calculate 50-day Moving Average & Technical Indicators
    df_stocks['50_MA'] = df_stocks['Close'].rolling(window=50).mean()
    df_stocks['RSI'] = compute_rsi(df_stocks['Close'], periods=14)

    # Invoke Groq LLM for real-time sentiment & risk metrics
    prompt = f"Analyze stock trend: Price={df_stocks['Close'].iloc[-1]}, RSI={df_stocks['RSI'].iloc[-1]}"
    response = client.chat.completions.create(model="llama-3.1-70b", prompt=prompt)
    return response.choices[0].text`,
      impact: "Integrated live stock streaming APIs with Groq LLMs to generate real-time technical indicators (RSI, Moving Averages) and automated market sentiment reports."
    },

    ngo: {
      title: "NGO Field Survey Response & Category Analysis",
      chartType: "bar",
      labels: ["Healthcare", "Education", "Sanitation", "Employment", "Infrastructure"],
      dataSets: [
        {
          label: "Validated Survey Responses",
          data: [3420, 2890, 2150, 1980, 1420],
          backgroundColor: [
            "rgba(0, 242, 254, 0.8)",
            "rgba(79, 172, 254, 0.8)",
            "rgba(139, 92, 246, 0.8)",
            "rgba(16, 185, 129, 0.8)",
            "rgba(245, 158, 11, 0.8)"
          ],
          borderRadius: 6
        }
      ],
      kpis: [
        { label: "Total Rows Cleaned", value: "11,860" },
        { label: "Data Quality Rate", value: "99.4%" },
        { label: "Primary Need", value: "Healthcare (28.8%)" }
      ],
      code: `-- SQL CTE Query for NGO Survey Data Aggregation
WITH CleanedSurveyData AS (
    SELECT 
        respondent_id,
        LOWER(TRIM(category)) AS survey_category,
        COALESCE(satisfaction_score, 0) AS score,
        DATE_TRUNC('month', response_date) AS survey_month
    FROM raw_field_responses
    WHERE response_date IS NOT NULL AND status = 'VALIDATED'
)
SELECT 
    survey_category,
    COUNT(respondent_id) AS total_responses,
    ROUND(AVG(score), 2) AS avg_satisfaction_score
FROM CleanedSurveyData
GROUP BY survey_category
ORDER BY total_responses DESC;`,
      impact: "Transformed unstructured volunteer field survey data into clean SQL tables, building dynamic pivot tables and charts to guide resource allocation for non-profits."
    },

    mri: {
      title: "Attention U-Net Brain Tumor MRI Accuracy & Metrics",
      chartType: "bar",
      labels: ["ET (Enhancing Tumor)", "TC (Tumor Core)", "WT (Whole Tumor)", "Mean IoU"],
      dataSets: [
        {
          label: "Dice Score Accuracy (%)",
          data: [98.2, 97.9, 99.1, 98.5],
          backgroundColor: "rgba(16, 185, 129, 0.75)",
          borderColor: "#10b981",
          borderWidth: 1,
          borderRadius: 6
        },
        {
          label: "IoU Score (%)",
          data: [96.5, 95.8, 97.8, 96.7],
          backgroundColor: "rgba(0, 242, 254, 0.75)",
          borderColor: "#00f2fe",
          borderWidth: 1,
          borderRadius: 6
        }
      ],
      kpis: [
        { label: "Overall Accuracy", value: "98.5%" },
        { label: "BraTS 2020 Dataset", value: "Multi-Modal MRI" },
        { label: "Mean Dice Score", value: "0.985" }
      ],
      code: `# Attention U-Net Loss & Segmentation Evaluation
import tensorflow as tf
from tensorflow.keras import backend as K

def dice_coef(y_true, y_pred, smooth=1e-6):
    y_true_f = K.flatten(y_true)
    y_pred_f = K.flatten(y_pred)
    intersection = K.sum(y_true_f * y_pred_f)
    return (2. * intersection + smooth) / (K.sum(y_true_f) + K.sum(y_pred_f) + smooth)

# Evaluate model performance on BraTS 2020 multi-modal scans
test_loss, test_acc, test_dice = model.evaluate(x_test_nifti, y_test_masks)
print(f"Segmentation Accuracy: {test_acc*100:.2f}% | Dice Score: {test_dice:.4f}")`,
      impact: "Trained an Attention U-Net model on multi-modal NIfTI scans achieving 98.5% segmentation accuracy with high Dice coefficient and IoU precision."
    }
  };

  function renderSandboxChart(key) {
    const config = datasetsConfig[key];
    if (!config) return;

    chartTitle.textContent = config.title;
    codeContent.textContent = config.code;
    impactText.textContent = config.impact;

    // Render KPIs
    kpiContainer.innerHTML = config.kpis.map(k => `
      <div class="kpi-card">
        <span class="kpi-label">${k.label}</span>
        <span class="kpi-value">${k.value}</span>
      </div>
    `).join('');

    // Destroy existing chart if present
    if (sandboxChartInstance) {
      sandboxChartInstance.destroy();
    }

    const ctx = document.getElementById('sandboxChart').getContext('2d');
    sandboxChartInstance = new Chart(ctx, {
      type: config.chartType,
      data: {
        labels: config.labels,
        datasets: config.dataSets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 12 } }
          },
          tooltip: {
            backgroundColor: 'rgba(9, 13, 22, 0.9)',
            titleColor: '#00f2fe',
            bodyColor: '#f1f5f9',
            borderColor: 'rgba(0, 242, 254, 0.3)',
            borderWidth: 1
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#94a3b8' }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#94a3b8' }
          }
        }
      }
    });
  }

  // Initial sandbox render
  renderSandboxChart('market');

  // Tab Switching Event Listeners
  sandboxTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      sandboxTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const datasetKey = tab.getAttribute('data-dataset');
      renderSandboxChart(datasetKey);
    });
  });

  // Refresh data simulator button
  if (btnRefreshData) {
    btnRefreshData.addEventListener('click', () => {
      const activeTab = document.querySelector('.sandbox-tab.active');
      const key = activeTab ? activeTab.getAttribute('data-dataset') : 'market';
      
      // Randomize data slightly for live simulation feel
      datasetsConfig[key].dataSets.forEach(dataset => {
        dataset.data = dataset.data.map(val => Number((val + (Math.random() * 2 - 1)).toFixed(1)));
      });
      renderSandboxChart(key);
    });
  }

  // Copy SQL / Python code snippet
  if (btnCopySql) {
    btnCopySql.addEventListener('click', () => {
      navigator.clipboard.writeText(codeContent.textContent).then(() => {
        btnCopySql.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
        setTimeout(() => {
          btnCopySql.innerHTML = `<i class="fa-regular fa-copy"></i> Copy`;
        }, 2000);
      });
    });
  }

  // ==========================================
  // 4. SKILLS RADAR CHART (CHART.JS)
  // ==========================================
  const radarCtx = document.getElementById('skillsRadar');
  if (radarCtx) {
    new Chart(radarCtx.getContext('2d'), {
      type: 'radar',
      data: {
        labels: [
          'SQL & Querying',
          'Python Analytics',
          'Excel & Pivots',
          'Tableau / BI',
          'Machine Learning',
          'Data Cleaning'
        ],
        datasets: [{
          label: 'Skill Proficiency',
          data: [92, 88, 90, 82, 85, 94],
          backgroundColor: 'rgba(0, 242, 254, 0.2)',
          borderColor: '#00f2fe',
          pointBackgroundColor: '#00f2fe',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#00f2fe',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          r: {
            angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
            grid: { color: 'rgba(255, 255, 255, 0.08)' },
            pointLabels: {
              color: '#f1f5f9',
              font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' }
            },
            ticks: { display: false, min: 0, max: 100 }
          }
        }
      }
    });
  }

  // ==========================================
  // 5. PROJECT CATEGORY FILTERING
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 6. PROJECT INSPECTION MODAL
  // ==========================================
  const projectModal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const projectDetailsMap = {
    market: {
      title: "Market Analysis Dashboard",
      subtitle: "Real-Time Stock Analytics & Groq LLM Insights",
      tech: ["Python", "Streamlit", "Financial APIs", "LLM (Groq)", "Plotly", "Pandas"],
      architecture: [
        "Ingests real-time financial market ticker streams using financial APIs.",
        "Calculates technical indicators like 14-day RSI, 50-day & 200-day Moving Averages, and Volatility.",
        "Integrates Groq LLM API to automatically process technical indicators and generate human-readable trend analyses, short-term forecasting, and risk warnings.",
        "Delivers an intuitive Streamlit interface with interactive Plotly charts."
      ],
      outcomes: "Provides stock traders and analysts with instantaneous AI-augmented market reports without manual chart calculations."
    },

    mri: {
      title: "Brain Tumor Segmentation using Attention U-Net",
      subtitle: "Medical Image Analysis on BraTS 2020 MRI Dataset (~98.5% Accuracy)",
      tech: ["TensorFlow", "Keras", "OpenCV", "Nibabel", "Scikit-learn", "Python"],
      architecture: [
        "Handled multi-modal NIfTI medical imaging files (FLAIR, T1w, T1gd, T2w scans).",
        "Built end-to-end data preprocessing pipeline: cropping, intensity normalization, zero-padding, and dataset slicing.",
        "Implemented Attention U-Net architecture with attention gates to highlight salient tumor regions while suppressing background brain tissue.",
        "Evaluated performance using Dice Similarity Coefficient, Intersection over Union (IoU), and F1 Score metrics reaching 98.5% test accuracy."
      ],
      outcomes: "Demonstrated advanced deep learning capabilities in computer vision and biomedical data analysis."
    },

    code: {
      title: "AI Code Analyzer & Review Tool",
      subtitle: "Full-Stack Code Quality & Static Vulnerability System",
      tech: ["Python (Flask)", "Gemini API", "HTML5", "CSS3", "JavaScript", "REST APIs"],
      architecture: [
        "Developed full-stack web tool accepting multi-language source code snippets.",
        "Invokes Google Gemini API to analyze cyclomatic complexity, code smells, performance bottlenecks, and security vulnerabilities.",
        "Designed RESTful API endpoints for health monitoring, model selection, and code parsing.",
        "Provides syntax-highlighted review report with suggested code patches and quality scores."
      ],
      outcomes: "Streamlines code reviews for developer teams with automated AI feedback."
    }
  };

  document.querySelectorAll('.btn-inspect-project').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      const info = projectDetailsMap[key];
      if (!info) return;

      modalBody.innerHTML = `
        <div style="margin-bottom: 1rem;">
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--primary-cyan); text-transform: uppercase;">Technical Deep-Dive</span>
          <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--text-main); margin-top: 0.2rem;">${info.title}</h3>
          <p style="font-size: 0.9rem; color: var(--primary-blue);">${info.subtitle}</p>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem;">
          ${info.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.6rem;"><i class="fa-solid fa-layer-group" style="color: var(--primary-cyan);"></i> Architecture & Data Pipeline</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem;">
            ${info.architecture.map(step => `
              <li style="font-size: 0.88rem; color: var(--text-muted); display: flex; gap: 0.5rem;">
                <i class="fa-solid fa-check" style="color: var(--accent-emerald); margin-top: 0.2rem;"></i>
                <span>${step}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); padding: 1rem; border-radius: var(--radius-md);">
          <h5 style="font-size: 0.9rem; font-weight: 700; color: var(--accent-emerald); margin-bottom: 0.3rem;"><i class="fa-solid fa-trophy"></i> Business Impact & Result</h5>
          <p style="font-size: 0.85rem; color: var(--text-muted);">${info.outcomes}</p>
        </div>
      `;

      projectModal.classList.add('active');
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      projectModal.classList.remove('active');
    });
  }

  // ==========================================
  // 7. RESUME MODAL & DOWNLOAD LOGIC
  // ==========================================
  const resumeModal = document.getElementById('resume-modal');
  const btnOpenResume = document.getElementById('btn-open-resume');
  const heroResumeBtn = document.getElementById('hero-resume-btn');
  const resumeCloseBtn = document.getElementById('resume-close-btn');

  function openResume() {
    resumeModal.classList.add('active');
  }

  if (btnOpenResume) btnOpenResume.addEventListener('click', openResume);
  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResume);

  if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener('click', () => {
      resumeModal.classList.remove('active');
    });
  }

  // Close modals when clicking outside card
  [projectModal, resumeModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }
  });

  // ==========================================
  // 8. CONTACT FORM & EMAIL COPY
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const btnCopyEmail = document.getElementById('btn-copy-email');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;
      formStatus.className = "form-status";
      formStatus.innerHTML = "";

      const formData = new FormData(contactForm);

      try {
        const response = await fetch("https://formspree.io/f/xeajwoez", {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formStatus.className = "form-status success";
          formStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. Shalini will get back to you shortly.`;
          contactForm.reset();
        } else {
          const data = await response.json();
          formStatus.className = "form-status error";
          if (data && data.errors && data.errors.length > 0) {
            formStatus.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ` + data.errors.map(err => err.message).join(", ");
          } else {
            formStatus.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Oops! There was a problem submitting your form.`;
          }
        }
      } catch (error) {
        formStatus.className = "form-status error";
        formStatus.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Network error. Please check your connection and try again.`;
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });
  }

  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', () => {
      navigator.clipboard.writeText('dshalini2816@gmail.com').then(() => {
        btnCopyEmail.innerHTML = `<i class="fa-solid fa-check" style="color: var(--accent-emerald);"></i>`;
        setTimeout(() => {
          btnCopyEmail.innerHTML = `<i class="fa-regular fa-copy"></i>`;
        }, 2000);
      });
    });
  }

});
