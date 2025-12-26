# Module 2: Python for Data Science

## Overview

This module focuses on Python programming essentials specifically tailored for data science applications. Students will learn the core Python libraries used in the data science workflow: NumPy for numerical computing, Pandas for data manipulation, Matplotlib and Seaborn for data visualization. The module emphasizes practical, hands-on experience with Indian datasets to ensure learners can immediately apply their skills to real-world problems in the Indian context.

## Major Topics

### 1. Python Programming Essentials for Data Analysis
Understanding Python fundamentals is crucial before diving into specialized data science libraries. This includes data types, control structures, functions, and object-oriented programming basics.

**India-centric Example:** Write Python code to process Indian mobile phone numbers. Create a function that validates 10-digit Indian phone numbers, identifies the service provider based on the prefix (e.g., numbers starting with 98, 97, 70 for different operators), and formats them with country code (+91). This is useful when building customer databases for Indian businesses.

```python
def validate_indian_mobile(number):
    # Remove spaces and dashes
    clean_number = number.replace(" ", "").replace("-", "")
    
    # Check if 10 digits
    if len(clean_number) == 10 and clean_number.isdigit():
        # Common Indian mobile prefixes
        valid_prefixes = ['98', '97', '96', '95', '94', '93', '92', '91', '90', 
                         '89', '88', '87', '86', '85', '84', '83', '82', '81', '80',
                         '79', '78', '77', '76', '75', '74', '73', '72', '70']
        if clean_number[:2] in valid_prefixes:
            return f"+91-{clean_number}"
    return None
```

### 2. NumPy for Numerical Computing
NumPy provides efficient array operations and mathematical functions essential for handling large datasets and performing complex calculations.

**India-centric Example:** Analyze monthly rainfall data across Indian states using NumPy arrays. Calculate average rainfall, identify monsoon patterns, and determine which states face drought conditions (rainfall < 100mm) or flooding risks (rainfall > 500mm). This helps agricultural planning and insurance companies assess crop risk.

```python
import numpy as np

# Monthly rainfall data (mm) for 5 states: Kerala, Maharashtra, Punjab, Rajasthan, West Bengal
rainfall_data = np.array([
    [300, 350, 200, 180, 450, 780, 850, 820, 650, 280, 150, 250],  # Kerala
    [10, 15, 8, 12, 45, 320, 580, 490, 280, 75, 20, 8],             # Maharashtra
    [25, 30, 35, 15, 40, 180, 320, 250, 120, 15, 10, 20],           # Punjab
    [8, 5, 3, 2, 12, 45, 120, 85, 35, 5, 2, 3],                     # Rajasthan
    [15, 25, 45, 80, 150, 420, 580, 550, 380, 180, 35, 18]          # West Bengal
])

states = ['Kerala', 'Maharashtra', 'Punjab', 'Rajasthan', 'West Bengal']

# Calculate annual rainfall for each state
annual_rainfall = np.sum(rainfall_data, axis=1)
for state, total in zip(states, annual_rainfall):
    print(f"{state}: {total}mm per year")

# Find monsoon months (June-Sept, indices 5-8)
monsoon_rainfall = np.mean(rainfall_data[:, 5:9], axis=1)
print(f"\nStates with highest monsoon rainfall: {states[np.argmax(monsoon_rainfall)]}")
```

### 3. Pandas for Data Manipulation and Analysis
Pandas is the cornerstone library for working with structured data, providing DataFrames for easy data manipulation, cleaning, and analysis.

**India-centric Example:** Analyze a dataset of Indian startup funding data. Load a CSV file containing startup names, sectors, funding amounts (in crores), investor names, and cities. Use Pandas to find which sectors receive the most funding, which cities have the most startups, and calculate average funding by sector.

```python
import pandas as pd

# Load Indian startup funding data
df = pd.DataFrame({
    'Startup': ['Swiggy', 'Ola', 'Byju\'s', 'Paytm', 'Zomato', 'CRED', 'Meesho', 'PhonePe'],
    'Sector': ['FoodTech', 'Mobility', 'EdTech', 'FinTech', 'FoodTech', 'FinTech', 'E-commerce', 'FinTech'],
    'City': ['Bangalore', 'Bangalore', 'Bangalore', 'Noida', 'Gurgaon', 'Bangalore', 'Bangalore', 'Bangalore'],
    'Funding_Crores': [1200, 950, 2800, 3500, 890, 650, 780, 1400],
    'Year': [2021, 2021, 2020, 2019, 2021, 2021, 2021, 2020]
})

# Top sectors by total funding
sector_funding = df.groupby('Sector')['Funding_Crores'].sum().sort_values(ascending=False)
print("Funding by Sector:")
print(sector_funding)

# Average funding per city
city_avg_funding = df.groupby('City')['Funding_Crores'].mean()
print(f"\nAverage funding in Bangalore: ₹{city_avg_funding['Bangalore']:.2f} crores")

# Filter FinTech startups
fintech_startups = df[df['Sector'] == 'FinTech']
print(f"\nTotal FinTech startups: {len(fintech_startups)}")
```

### 4. Matplotlib and Seaborn for Data Visualization
Creating effective visualizations is essential for communicating insights from data analysis. Matplotlib provides basic plotting capabilities while Seaborn offers statistical visualizations with better aesthetics.

**India-centric Example:** Visualize India's COVID-19 vaccination progress across different states. Create line charts showing daily vaccinations, bar charts comparing state-wise coverage, and heatmaps showing vaccination rates by age groups and states.

```python
import matplotlib.pyplot as plt
import seaborn as sns

# Vaccination data (in lakhs) for top 5 states over 6 months
states = ['Maharashtra', 'UP', 'Karnataka', 'Kerala', 'West Bengal']
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
vaccination_data = np.array([
    [45, 52, 68, 85, 92, 98],    # Maharashtra
    [38, 46, 62, 78, 88, 95],    # UP
    [32, 39, 51, 67, 76, 84],    # Karnataka
    [28, 34, 44, 58, 68, 75],    # Kerala
    [25, 31, 42, 55, 64, 72]     # West Bengal
])

# Line plot for vaccination trends
plt.figure(figsize=(10, 6))
for i, state in enumerate(states):
    plt.plot(months, vaccination_data[i], marker='o', label=state)
plt.title('COVID-19 Vaccination Progress Across Indian States')
plt.xlabel('Month (2021)')
plt.ylabel('Vaccinations (in lakhs)')
plt.legend()
plt.grid(True)
plt.show()

# Bar chart for final month comparison
plt.figure(figsize=(10, 6))
final_vaccination = vaccination_data[:, -1]
plt.bar(states, final_vaccination, color=['#FF9933', '#138808', '#000080', '#FF0000', '#FFD700'])
plt.title('Total Vaccinations by State (June 2021)')
plt.ylabel('Vaccinations (in lakhs)')
plt.xlabel('State')
plt.xticks(rotation=45)
plt.show()
```

### 5. Data Cleaning and Preprocessing
Real-world data is messy. This topic covers handling missing values, removing duplicates, dealing with outliers, and transforming data for analysis.

**India-centric Example:** Clean a dataset of Indian railway passenger data that contains missing values (some ticket prices are blank), duplicate entries (same PNR appearing twice), inconsistent date formats (DD/MM/YYYY vs YYYY-MM-DD), and outliers (some ticket prices are unrealistically high due to data entry errors).

### 6. Exploratory Data Analysis (EDA)
EDA involves understanding data distributions, identifying patterns, detecting anomalies, and forming hypotheses through statistical summaries and visualizations.

**India-centric Example:** Perform EDA on Bangalore house price dataset from MagicBricks or Housing.com. Analyze how prices vary by locality (Koramangala vs Whitefield), property size (1BHK vs 3BHK), age of construction, proximity to IT hubs, and availability of amenities like metro connectivity.

## Suggested Projects/Assignments

### Project 1: IPL (Indian Premier League) Data Analysis
**Objective:** Analyze historical IPL match data to uncover insights about team performance, player statistics, and match outcomes.

**Dataset:** Use publicly available IPL datasets from Kaggle or ESPN Cricinfo covering matches from 2008-2023.

**Tasks:**
1. Load and explore the IPL dataset using Pandas
2. Clean data: handle missing values, standardize team names across seasons
3. Analyze:
   - Which teams have the best win percentage?
   - What is the average first innings score at different venues (Wankhede, Chinnaswamy, Eden Gardens)?
   - Which players have the highest batting strike rates (min 500 runs)?
   - How does winning the toss affect match outcomes?
   - What is the impact of home ground advantage?
4. Create visualizations:
   - Line chart of team performance over seasons
   - Bar chart of top run scorers and wicket takers
   - Heatmap showing team vs team win percentages
   - Scatter plot: first innings score vs winning probability
5. Build a simple prediction model: Can you predict if the team batting first will win based on their score?

**Deliverables:**
- Cleaned dataset (CSV)
- Jupyter notebook with complete analysis
- 5-7 meaningful visualizations
- Summary report (2 pages) with insights and recommendations for team strategy

### Project 2: Indian Stock Market Analysis (NSE/BSE)
**Objective:** Analyze stock price movements of top Indian companies and identify trends, correlations, and potential investment insights.

**Dataset:** Download historical stock data for Nifty 50 companies using libraries like `yfinance` or NSE/BSE APIs.

**Tasks:**
1. Fetch 5 years of daily stock price data for 10 major stocks (Reliance, TCS, Infosys, HDFC Bank, ITC, Wipro, etc.)
2. Calculate key metrics:
   - Daily returns and volatility
   - Moving averages (50-day, 200-day)
   - Highest and lowest prices
   - Trading volume trends
3. Analyze correlations between stocks (e.g., do IT stocks move together?)
4. Identify major market events (COVID-19 crash in March 2020, budget impacts, etc.)
5. Create visualizations:
   - Candlestick charts for individual stocks
   - Correlation matrix heatmap
   - Volatility comparison across sectors
   - Portfolio value simulation (₹1 lakh invested equally in all 10 stocks)
6. Bonus: Compare IT sector (TCS, Infosys) vs Banking sector (HDFC, SBI) performance

**Deliverables:**
- Python script for data fetching and processing
- Jupyter notebook with analysis
- Interactive dashboard (optional: using Plotly Dash)
- Investment insights report

## Intended Learning Outcomes

By the end of this module, students will be able to:

1. **Write Python Code for Data Analysis:** Develop proficient Python programming skills with emphasis on data manipulation, analysis, and visualization tasks commonly required in data science roles.

2. **Master NumPy Operations:** Efficiently work with numerical data using NumPy arrays, perform mathematical operations, statistical calculations, and handle multi-dimensional data structures.

3. **Manipulate Data with Pandas:** Load, clean, transform, merge, and analyze structured data using Pandas DataFrames and Series, applying operations like filtering, grouping, and aggregation.

4. **Create Effective Visualizations:** Design and implement various types of charts and plots using Matplotlib and Seaborn to communicate data insights clearly and effectively.

5. **Clean Real-World Data:** Apply data cleaning techniques to handle missing values, duplicates, outliers, and inconsistencies commonly found in real-world Indian datasets.

6. **Perform Exploratory Data Analysis:** Conduct comprehensive EDA to understand data distributions, identify patterns, detect anomalies, and derive preliminary insights before building models.

7. **Work with Indian Datasets:** Gain hands-on experience working with datasets relevant to the Indian context, understanding domain-specific nuances in e-commerce, finance, healthcare, and other sectors.

8. **Build End-to-End Data Projects:** Demonstrate the ability to take a raw dataset, clean it, analyze it, visualize findings, and present actionable insights - a complete data analysis workflow.

9. **Apply Best Practices:** Follow coding best practices including proper documentation, code organization, version control basics, and reproducible analysis.

10. **Prepare for Technical Interviews:** Build confidence in solving Python-based data analysis problems commonly asked in data science job interviews at Indian companies.

---

**Duration:** 30-35 minutes of core content + 5-8 hours for projects

**Prerequisites:** Basic programming knowledge; Module 1 recommended

**Next Module:** Module 3 - Statistics and Probability
