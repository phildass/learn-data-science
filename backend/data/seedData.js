const fs = require('fs');
const path = require('path');

// Sample module data for a beginner-friendly data science course focused on Indian job market
const defaultModules = [
  {
    "id": 1,
    "title": "Introduction to Data Science in India",
    "description": "Understanding the Data Science landscape in the Indian job market",
    "content": "Data Science has emerged as one of the most in-demand careers in India, with cities like Bangalore, Hyderabad, Pune, and Mumbai becoming major tech hubs. According to NASSCOM reports, India needs over 1.5 lakh data science professionals by 2025.\n\nKey Topics:\n• The Indian IT ecosystem and Data Science opportunities\n• Major companies hiring: TCS, Infosys, Wipro, Amazon, Flipkart, Ola, Paytm\n• Salary ranges: Entry-level (₹4-8 LPA), Mid-level (₹10-20 LPA), Senior (₹25+ LPA)\n• Essential skills: Python, R, SQL, Machine Learning, Statistics\n• Indian-specific datasets: Census data, Aadhaar, UPI transaction data\n• Government initiatives: Digital India, NITI Aayog AI programs\n\nCase Study: How Flipkart uses Data Science\nFlipkart, India's leading e-commerce platform, employs thousands of data scientists to:\n- Predict product demand during festivals like Diwali and Big Billion Days\n- Optimize delivery routes across 19,000+ pin codes\n- Personalize recommendations for 350+ million customers\n- Detect fraud in transactions\n- Dynamic pricing strategies\n\nCareer Path in India:\n1. Start with foundational courses and certifications\n2. Build portfolio with Indian context projects (IPL analysis, stock market prediction)\n3. Participate in hackathons (Kaggle, Analytics Vidhya, HackerEarth)\n4. Network through meetups in metro cities\n5. Target startups and MNCs with data science divisions",
    "duration": "15 mins"
  },
  {
    "id": 2,
    "title": "Python for Data Science",
    "description": "Master Python programming essentials for data analysis",
    "content": "Python is the most preferred programming language for Data Science in India, with 80% of job postings requiring Python skills.\n\nCore Python Concepts:\n• Variables and Data Types (int, float, str, list, dict, tuple)\n• Control Flow: if-else, loops (for, while)\n• Functions and Lambda expressions\n• List comprehensions\n• File handling and CSV operations\n\nEssential Libraries:\n1. NumPy - Numerical computing\n   - Arrays and matrices\n   - Mathematical operations\n   - Linear algebra\n\n2. Pandas - Data manipulation\n   - DataFrames and Series\n   - Reading CSV, Excel files\n   - Data cleaning and preprocessing\n   - GroupBy operations\n\n3. Matplotlib & Seaborn - Data visualization\n   - Line plots, bar charts, histograms\n   - Scatter plots and heatmaps\n   - Customizing plots\n\nPractical Example: Analyzing Mumbai Local Train Data\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\n# Load railway passenger data\ndf = pd.read_csv('mumbai_local_data.csv')\n\n# Find peak hours\npeak_hours = df.groupby('hour')['passengers'].mean()\npeak_hours.plot(kind='bar')\nplt.title('Average Passengers by Hour - Mumbai Local')\nplt.xlabel('Hour of Day')\nplt.ylabel('Number of Passengers')\nplt.show()\n\nIndian Context Projects:\n- Cricket IPL score prediction\n- Analyzing Indian stock market (NSE/BSE) data\n- Predicting agricultural yield based on monsoon patterns\n- Delhi air quality index forecasting\n- E-commerce sales analysis during festival seasons",
    "duration": "20 mins"
  },
  {
    "id": 3,
    "title": "Statistics and Probability Fundamentals",
    "description": "Statistical concepts essential for data analysis and ML",
    "content": "Statistics forms the backbone of Data Science. Understanding statistical concepts is crucial for interpreting data correctly and building reliable ML models.\n\nDescriptive Statistics:\n• Mean, Median, Mode - Measures of central tendency\n• Standard Deviation and Variance - Measures of spread\n• Percentiles and Quartiles\n• Skewness and Kurtosis\n\nProbability Basics:\n• Probability distributions: Normal, Binomial, Poisson\n• Conditional probability and Bayes' Theorem\n• Expected value and variance\n• Law of large numbers\n\nInferential Statistics:\n• Hypothesis testing (Null vs Alternative hypothesis)\n• p-value and significance level (α = 0.05)\n• Confidence intervals\n• t-tests, chi-square tests, ANOVA\n\nCorrelation and Causation:\n• Pearson and Spearman correlation\n• Understanding causation vs correlation\n• Multicollinearity in datasets\n\nIndian Context Example: Agricultural Data Analysis\nScenario: Analyzing crop yield across Indian states\n\nDataset: Wheat production data from Punjab, Haryana, UP, MP\nVariables:\n- Rainfall (mm)\n- Temperature (°C)\n- Fertilizer usage (kg/hectare)\n- Yield (quintals/hectare)\n\nAnalysis:\n1. Calculate mean yield per state\n2. Find correlation between rainfall and yield\n3. Test hypothesis: \"Fertilizer usage significantly impacts yield\"\n4. Create confidence intervals for yield predictions\n\nReal-world Application:\n- Exit polls prediction during Indian elections\n- A/B testing for Swiggy/Zomato app features\n- Quality control in manufacturing (automotive sector)\n- Insurance claim analysis for Indian insurance companies\n- Bank loan default probability calculations",
    "duration": "25 mins"
  },
  {
    "id": 4,
    "title": "Machine Learning Fundamentals",
    "description": "Core ML algorithms and their applications in Indian context",
    "content": "Machine Learning is transforming industries across India - from agriculture to healthcare, finance to e-commerce.\n\nTypes of Machine Learning:\n1. Supervised Learning\n   - Classification: Spam detection, disease diagnosis\n   - Regression: Price prediction, sales forecasting\n\n2. Unsupervised Learning\n   - Clustering: Customer segmentation\n   - Dimensionality reduction: PCA\n\n3. Reinforcement Learning\n   - Gaming, robotics, autonomous systems\n\nKey Algorithms:\n\nLinear Regression:\n- Predicting house prices in metros (Mumbai, Delhi, Bangalore)\n- Forecasting stock prices on NSE/BSE\n- Estimating cab fares (Ola, Uber)\n\nLogistic Regression:\n- Credit card fraud detection\n- Email spam classification\n- Customer churn prediction for telecom (Airtel, Jio)\n\nDecision Trees and Random Forest:\n- Loan approval systems in Indian banks\n- Customer segmentation for e-commerce\n- Crop recommendation based on soil and climate\n\nK-Means Clustering:\n- Grouping customers by buying behavior\n- Segmenting cities by development index\n- Categorizing products for inventory management\n\nSupport Vector Machines (SVM):\n- Handwriting recognition (Indian languages)\n- Image classification\n- Medical diagnosis\n\nIndian Industry Applications:\n\n1. Agriculture:\n   - Crop yield prediction using weather data\n   - Pest detection using image recognition\n   - Soil health monitoring\n\n2. E-commerce (Amazon, Flipkart):\n   - Product recommendation engines\n   - Demand forecasting for Big Billion Days\n   - Price optimization\n\n3. FinTech (Paytm, PhonePe):\n   - Fraud detection in UPI transactions\n   - Credit scoring for micro-loans\n   - Personalized financial advice\n\n4. Healthcare:\n   - Disease prediction and diagnosis\n   - Drug discovery\n   - Patient risk assessment\n\nModel Evaluation:\n- Train-test split (80-20 rule)\n- Cross-validation\n- Metrics: Accuracy, Precision, Recall, F1-Score, ROC-AUC\n- Confusion Matrix",
    "duration": "30 mins"
  },
  {
    "id": 5,
    "title": "Deep Learning and Neural Networks",
    "description": "Introduction to AI, neural networks, and deep learning applications",
    "content": "Deep Learning is powering the next generation of AI applications in India, from smart cities to personalized healthcare.\n\nNeural Networks Basics:\n• Neurons and layers (Input, Hidden, Output)\n• Activation functions: ReLU, Sigmoid, Tanh, Softmax\n• Forward propagation\n• Backpropagation and gradient descent\n• Loss functions: MSE, Cross-entropy\n\nDeep Learning Frameworks:\n1. TensorFlow (Google)\n2. PyTorch (Facebook/Meta)\n3. Keras (High-level API)\n\nTypes of Neural Networks:\n\n1. Artificial Neural Networks (ANN)\n   - Fully connected layers\n   - Used for: Structured data, classification, regression\n\n2. Convolutional Neural Networks (CNN)\n   - Image recognition and computer vision\n   - Architecture: Conv layers, Pooling, Fully connected\n   - Applications: Face recognition, object detection\n\n3. Recurrent Neural Networks (RNN)\n   - Sequential data processing\n   - LSTM and GRU for handling long-term dependencies\n   - Applications: Time series, text generation, speech recognition\n\n4. Transformers and Attention Mechanisms\n   - BERT, GPT models\n   - Natural Language Processing\n   - Translation, summarization, chatbots\n\nIndian Context Applications:\n\n1. Language and NLP:\n   - Multilingual chatbots (Hindi, Tamil, Telugu, Bengali, etc.)\n   - Translation services for Indian languages\n   - Sentiment analysis of regional language social media\n   - Voice assistants in local languages\n\n2. Computer Vision:\n   - Aadhaar-based face verification systems\n   - Traffic monitoring in smart cities (Pune, Surat)\n   - Agricultural drone imagery analysis\n   - Automatic number plate recognition (ANPR)\n\n3. Finance:\n   - Algorithmic trading on Indian stock exchanges\n   - Fraud detection in UPI/IMPS transactions\n   - Signature verification for banking\n\n4. Healthcare:\n   - X-ray and CT scan analysis\n   - Diabetic retinopathy detection\n   - Predicting disease outbreaks\n   - Drug molecule discovery\n\n5. E-commerce:\n   - Visual search (upload image, find similar products)\n   - Chatbots for customer service\n   - Product quality inspection\n\nReal Projects in India:\n- NITI Aayog's AI for All initiative\n- Microsoft's AI for Agriculture program\n- Google's AI for Social Good projects\n- IIT research labs working on AI solutions\n- Startups: Haptik (chatbots), SigTuple (healthcare AI), Niramai (breast cancer detection)\n\nGetting Started:\n1. Learn Python and basic ML first\n2. Understand mathematics: Linear algebra, calculus\n3. Start with Keras for quick prototyping\n4. Practice on Google Colab (free GPU access)\n5. Participate in AI hackathons",
    "duration": "30 mins"
  },
  {
    "id": 6,
    "title": "Career Roadmap and Certification Prep",
    "description": "Building your Data Science career in India - from learning to landing jobs",
    "content": "A comprehensive guide to building a successful Data Science career in the Indian job market.\n\nLearning Roadmap (6-12 months):\n\nMonth 1-2: Foundations\n- Python programming\n- SQL databases\n- Git and version control\n- Basic statistics\n\nMonth 3-4: Data Analysis\n- NumPy, Pandas, Matplotlib\n- Exploratory Data Analysis (EDA)\n- Data cleaning and preprocessing\n- Excel and PowerBI/Tableau\n\nMonth 5-6: Machine Learning\n- Supervised learning algorithms\n- Unsupervised learning\n- Model evaluation and tuning\n- Scikit-learn library\n\nMonth 7-8: Advanced Topics\n- Deep Learning basics\n- NLP or Computer Vision (choose one)\n- Big Data tools (Hadoop, Spark) - optional\n- Cloud platforms (AWS, Azure, GCP)\n\nMonth 9-12: Projects and Job Prep\n- Build 3-5 portfolio projects\n- Contribute to open source\n- Practice on Kaggle, Analytics Vidhya\n- Interview preparation\n\nCertifications valued in India:\n1. Google Data Analytics Professional Certificate\n2. IBM Data Science Professional Certificate\n3. Microsoft Certified: Azure Data Scientist Associate\n4. AWS Certified Machine Learning - Specialty\n5. Analytics Vidhya Certified Programs\n6. Indian Institute of Technology (IIT) certifications via NPTEL\n\nBuilding Portfolio:\nProject Ideas with Indian Context:\n1. IPL match winner prediction\n2. Stock market analysis (Nifty 50 stocks)\n3. House price prediction (Mumbai/Bangalore/Delhi)\n4. Customer churn analysis for telecom\n5. Loan default prediction\n6. E-commerce product recommendation system\n7. Traffic prediction for metro cities\n8. Crop yield forecasting\n9. Social media sentiment analysis (Twitter/Instagram)\n10. COVID-19 data analysis for Indian states\n\nJob Search Strategy:\n\n1. Online Platforms:\n   - Naukri.com, LinkedIn, Indeed\n   - AngelList (for startups)\n   - Company career pages\n   - Referrals through networking\n\n2. Target Companies:\n   - MNCs: Google, Microsoft, Amazon, Adobe, Oracle\n   - Product Companies: Flipkart, Swiggy, Ola, Paytm, CRED\n   - Consulting: Deloitte, PwC, EY, Accenture\n   - Indian IT: TCS, Infosys, Wipro (analytics divisions)\n   - Startups: Check Inc42, YourStory for growing companies\n\n3. Prepare for Interviews:\n   - Technical: SQL queries, Python coding, ML algorithms\n   - Case studies: Business problem-solving\n   - Statistics and probability questions\n   - Past projects discussion\n   - Domain knowledge (finance, healthcare, e-commerce)\n\n4. Resume Tips:\n   - Highlight projects with metrics (improved accuracy by X%)\n   - Mention relevant coursework and certifications\n   - Include internships and hackathon participations\n   - Keywords: Python, Machine Learning, Deep Learning, SQL, etc.\n   - Keep it to 1-2 pages\n\nSalary Expectations (2024):\n- Fresher (0-1 year): ₹3-6 LPA\n- Junior DS (1-3 years): ₹6-12 LPA\n- Senior DS (3-5 years): ₹12-25 LPA\n- Lead DS (5+ years): ₹25-50 LPA\n- Principal/Director: ₹50+ LPA\n\n*Salaries vary by company, location, and skills\n\nNetworking and Community:\n- Join Data Science meetups in your city\n- LinkedIn networking and content creation\n- Twitter (follow Indian DS professionals)\n- Analytics Vidhya, DataHack Summit\n- PyData conferences\n- College alumni networks\n\nContinuous Learning:\n- Follow industry blogs and papers\n- Take advanced courses as needed\n- Stay updated with latest tools and frameworks\n- Contribute to open-source projects\n- Mentor juniors and give back to community\n\nRemember: Consistency is key. Practice daily, build projects, and keep applying. The Indian Data Science market is growing rapidly, and there are abundant opportunities for skilled professionals!",
    "duration": "25 mins"
  }
];

// Sample quiz questions tied to the modules
const defaultQuiz = [
  {
    "id": 1,
    "question": "Which Indian e-commerce company is mentioned as a major employer of data scientists for demand prediction during festivals?",
    "options": [
      "Amazon India",
      "Flipkart",
      "Myntra",
      "Snapdeal"
    ],
    "correctAnswer": 1,
    "explanation": "Flipkart employs thousands of data scientists to predict product demand during festivals like Diwali and Big Billion Days, optimize delivery routes, and personalize recommendations for 350+ million customers."
  },
  {
    "id": 2,
    "question": "According to NASSCOM, how many data science professionals does India need by 2025?",
    "options": [
      "50,000",
      "1,00,000",
      "1,50,000 (1.5 lakh)",
      "2,00,000"
    ],
    "correctAnswer": 2,
    "explanation": "NASSCOM reports indicate that India needs over 1.5 lakh (150,000) data science professionals by 2025 to meet the growing demand in the IT and tech sector."
  },
  {
    "id": 3,
    "question": "Which Python library is primarily used for data manipulation with DataFrames and is essential for reading CSV files?",
    "options": [
      "NumPy",
      "Matplotlib",
      "Pandas",
      "Seaborn"
    ],
    "correctAnswer": 2,
    "explanation": "Pandas is the essential library for data manipulation in Python. It provides DataFrames and Series data structures and is used for reading CSV/Excel files, data cleaning, and preprocessing."
  },
  {
    "id": 4,
    "question": "In Indian context, which machine learning algorithm would be most suitable for customer segmentation in e-commerce?",
    "options": [
      "Linear Regression",
      "Logistic Regression",
      "K-Means Clustering",
      "Decision Trees"
    ],
    "correctAnswer": 2,
    "explanation": "K-Means Clustering is an unsupervised learning algorithm ideal for customer segmentation. It groups customers by buying behavior, which is valuable for e-commerce platforms like Amazon and Flipkart."
  },
  {
    "id": 5,
    "question": "What is the typical salary range for an entry-level Data Scientist (0-1 year experience) in India as of 2024?",
    "options": [
      "₹2-4 LPA",
      "₹3-6 LPA",
      "₹8-12 LPA",
      "₹15-20 LPA"
    ],
    "correctAnswer": 1,
    "explanation": "Entry-level Data Scientists (0-1 year experience) in India typically earn between ₹3-6 LPA (Lakhs Per Annum), though this can vary based on company, location, and skills."
  },
  {
    "id": 6,
    "question": "Which type of neural network is best suited for image recognition tasks such as Aadhaar-based face verification?",
    "options": [
      "Recurrent Neural Networks (RNN)",
      "Convolutional Neural Networks (CNN)",
      "Artificial Neural Networks (ANN)",
      "Generative Adversarial Networks (GAN)"
    ],
    "correctAnswer": 1,
    "explanation": "Convolutional Neural Networks (CNNs) are specifically designed for computer vision and image recognition tasks. They use convolutional layers and pooling to detect features in images, making them ideal for face verification systems."
  },
  {
    "id": 7,
    "question": "In hypothesis testing, what is the commonly used significance level (α) for determining statistical significance?",
    "options": [
      "0.01",
      "0.05",
      "0.10",
      "0.25"
    ],
    "correctAnswer": 1,
    "explanation": "The significance level α = 0.05 is the most commonly used threshold in hypothesis testing. It means there's a 5% chance of rejecting the null hypothesis when it's actually true (Type I error)."
  },
  {
    "id": 8,
    "question": "Which Indian government initiative is focused on AI and data science development?",
    "options": [
      "Make in India",
      "Digital India and NITI Aayog AI programs",
      "Skill India",
      "Startup India"
    ],
    "correctAnswer": 1,
    "explanation": "Digital India and NITI Aayog's AI programs are the primary government initiatives focused on AI and data science development. NITI Aayog has launched 'AI for All' and other programs to promote AI adoption in India."
  },
  {
    "id": 9,
    "question": "Which deep learning framework is developed by Google and widely used in the Indian tech industry?",
    "options": [
      "PyTorch",
      "Keras",
      "TensorFlow",
      "Caffe"
    ],
    "correctAnswer": 2,
    "explanation": "TensorFlow is developed by Google and is one of the most popular deep learning frameworks used in India and worldwide. It's used for building and training neural networks for various applications."
  },
  {
    "id": 10,
    "question": "For detecting fraud in UPI transactions (Paytm, PhonePe), which type of machine learning would be most appropriate?",
    "options": [
      "Supervised Learning - Classification",
      "Unsupervised Learning - Clustering",
      "Reinforcement Learning",
      "Semi-supervised Learning"
    ],
    "correctAnswer": 0,
    "explanation": "Supervised Learning with Classification algorithms (like Logistic Regression or Random Forest) is most appropriate for fraud detection. The model is trained on labeled data (fraudulent vs legitimate transactions) to classify new transactions."
  }
];

/**
 * Validates if data is valid and complete
 * @param {Array} data - The data to validate
 * @param {string} type - Type of data ('modules' or 'quiz')
 * @returns {boolean} - True if valid, false otherwise
 */
function validateData(data, type) {
  if (!Array.isArray(data) || data.length === 0) {
    return false;
  }

  if (type === 'modules') {
    // Check if we have at least 6 modules with required fields
    if (data.length < 6) return false;
    
    for (const module of data) {
      if (!module.id || !module.title || !module.description || !module.content || !module.duration) {
        return false;
      }
    }
  } else if (type === 'quiz') {
    // Check if we have quiz questions with required fields
    if (data.length === 0) return false;
    
    for (const question of data) {
      if (!question.id || !question.question || !Array.isArray(question.options) || 
          question.correctAnswer === undefined || !question.explanation) {
        return false;
      }
      if (question.options.length < 2) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Initialize data files if they don't exist or are invalid
 * @returns {Object} - Status of initialization
 */
function initializeDataFiles() {
  const modulesPath = path.join(__dirname, 'modules.json');
  const quizPath = path.join(__dirname, 'quiz.json');
  const result = {
    modulesInitialized: false,
    quizInitialized: false,
    modulesValid: false,
    quizValid: false
  };

  // Check and initialize modules.json
  let modulesData = [];
  try {
    if (fs.existsSync(modulesPath)) {
      const fileContent = fs.readFileSync(modulesPath, 'utf8');
      modulesData = JSON.parse(fileContent);
      
      if (validateData(modulesData, 'modules')) {
        console.log('✓ modules.json exists and contains valid data');
        result.modulesValid = true;
      } else {
        console.log('⚠ modules.json exists but is incomplete or invalid');
      }
    } else {
      console.log('✗ modules.json does not exist');
    }
  } catch (error) {
    console.log('✗ Error reading modules.json:', error.message);
  }

  // Initialize modules if needed
  if (!result.modulesValid) {
    try {
      fs.writeFileSync(modulesPath, JSON.stringify(defaultModules, null, 2), 'utf8');
      console.log('✓ modules.json has been created/updated with default data');
      result.modulesInitialized = true;
      result.modulesValid = true;
    } catch (error) {
      console.error('✗ Error writing modules.json:', error.message);
    }
  }

  // Check and initialize quiz.json
  let quizData = [];
  try {
    if (fs.existsSync(quizPath)) {
      const fileContent = fs.readFileSync(quizPath, 'utf8');
      quizData = JSON.parse(fileContent);
      
      if (validateData(quizData, 'quiz')) {
        console.log('✓ quiz.json exists and contains valid data');
        result.quizValid = true;
      } else {
        console.log('⚠ quiz.json exists but is incomplete or invalid');
      }
    } else {
      console.log('✗ quiz.json does not exist');
    }
  } catch (error) {
    console.log('✗ Error reading quiz.json:', error.message);
  }

  // Initialize quiz if needed
  if (!result.quizValid) {
    try {
      fs.writeFileSync(quizPath, JSON.stringify(defaultQuiz, null, 2), 'utf8');
      console.log('✓ quiz.json has been created/updated with default data');
      result.quizInitialized = true;
      result.quizValid = true;
    } catch (error) {
      console.error('✗ Error writing quiz.json:', error.message);
    }
  }

  return result;
}

module.exports = {
  initializeDataFiles,
  validateData,
  defaultModules,
  defaultQuiz
};
