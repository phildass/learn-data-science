# Module 3: Statistics and Probability

## Overview

This module covers the fundamental statistical and probabilistic concepts essential for data science. Students will learn descriptive and inferential statistics, probability distributions, hypothesis testing, and correlation analysis. Understanding these concepts is crucial for making data-driven decisions, validating machine learning models, and communicating findings with statistical rigor. The module emphasizes practical applications using Indian datasets and scenarios.

## Major Topics

### 1. Descriptive Statistics
Descriptive statistics summarize and describe the main features of a dataset using measures of central tendency and dispersion.

**India-centric Example:** Analyze the monthly salaries of software engineers across Indian cities. Calculate the mean salary (₹8.5 LPA), median salary (₹7 LPA - less affected by extremely high salaries), mode (most common salary bracket: ₹6-7 LPA), standard deviation (₹3.2 LPA - indicating high variation), and range (₹3.5 LPA to ₹45 LPA). These statistics help job seekers understand realistic salary expectations and help companies benchmark their compensation packages.

```python
import numpy as np
import pandas as pd

# Monthly salaries in INR (lakhs per annum) for 100 engineers
salaries = np.random.normal(loc=8.5, scale=3.2, size=100)
salaries = np.clip(salaries, 3.5, 45)  # Clip to realistic range

print(f"Mean Salary: ₹{np.mean(salaries):.2f} LPA")
print(f"Median Salary: ₹{np.median(salaries):.2f} LPA")
print(f"Std Deviation: ₹{np.std(salaries):.2f} LPA")
print(f"25th Percentile: ₹{np.percentile(salaries, 25):.2f} LPA")
print(f"75th Percentile: ₹{np.percentile(salaries, 75):.2f} LPA")
```

### 2. Probability Distributions
Understanding probability distributions helps in modeling real-world phenomena and is foundational for statistical inference and machine learning.

**India-centric Example:** Model the daily number of food orders received by a Swiggy restaurant in Pune using a Poisson distribution (for count data). If the restaurant receives an average of 85 orders per day, what's the probability of receiving more than 100 orders on a given day? This helps restaurants plan staff and inventory. For customer spending patterns, use a normal distribution: if average order value is ₹450 with standard deviation of ₹120, what percentage of customers spend more than ₹600?

```python
from scipy import stats

# Poisson distribution for daily orders
avg_orders = 85
prob_more_than_100 = 1 - stats.poisson.cdf(100, avg_orders)
print(f"Probability of >100 orders: {prob_more_than_100:.2%}")

# Normal distribution for order values
avg_order_value = 450
std_order_value = 120
prob_above_600 = 1 - stats.norm.cdf(600, avg_order_value, std_order_value)
print(f"Probability of order >₹600: {prob_above_600:.2%}")
```

### 3. Inferential Statistics and Hypothesis Testing
Inferential statistics allows us to make conclusions about populations based on sample data, while hypothesis testing helps validate assumptions statistically.

**India-centric Example:** An ed-tech company like Byju's wants to test if their new teaching method improves student test scores. They conduct an A/B test with 500 students: 250 use the new method (Group A) and 250 use the traditional method (Group B). After one month, Group A has mean score of 78% (std: 12%) and Group B has 74% (std: 11%). Conduct a two-sample t-test to determine if the improvement is statistically significant (p-value < 0.05) or could be due to random chance.

```python
from scipy import stats

# Student scores from both groups
group_a_scores = np.random.normal(78, 12, 250)
group_b_scores = np.random.normal(74, 11, 250)

# Two-sample t-test
t_statistic, p_value = stats.ttest_ind(group_a_scores, group_b_scores)

print(f"T-statistic: {t_statistic:.4f}")
print(f"P-value: {p_value:.4f}")

if p_value < 0.05:
    print("Result: Statistically significant! New method is better.")
else:
    print("Result: Not statistically significant. Difference might be due to chance.")
```

### 4. Confidence Intervals
Confidence intervals provide a range of values within which we can be confident (typically 95%) that the true population parameter lies.

**India-centric Example:** A polling agency surveys 1,000 voters in Maharashtra before state elections. They find that 52% plan to vote for Party A. Calculate the 95% confidence interval for the true proportion of voters supporting Party A. The interval might be [49.1%, 54.9%], meaning we're 95% confident the actual support is between 49.1% and 54.9%. This helps media channels report election predictions more accurately with margin of error.

```python
from scipy import stats

# Sample data
n = 1000  # sample size
p_hat = 0.52  # sample proportion
confidence = 0.95

# Calculate confidence interval
z_critical = stats.norm.ppf((1 + confidence) / 2)
margin_of_error = z_critical * np.sqrt((p_hat * (1 - p_hat)) / n)

ci_lower = p_hat - margin_of_error
ci_upper = p_hat + margin_of_error

print(f"95% Confidence Interval: [{ci_lower:.3%}, {ci_upper:.3%}]")
```

### 5. Correlation and Regression
Correlation measures the strength and direction of relationships between variables, while regression helps predict one variable based on others.

**India-centric Example:** Analyze the relationship between years of experience and salary for data scientists in Bangalore. Calculate the Pearson correlation coefficient (r = 0.82, strong positive correlation). Build a simple linear regression model: Salary = ₹3.5 LPA + (₹2.1 LPA × Years of Experience). This means each additional year of experience is associated with ₹2.1 LPA increase in salary, and fresh graduates can expect around ₹3.5 LPA.

```python
import matplotlib.pyplot as plt
from scipy import stats

# Data: Years of experience and corresponding salaries
experience = np.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 10])
salary = np.array([3.5, 5.8, 7.2, 9.5, 11.3, 13.6, 15.8, 18.2, 20.5, 25.1])

# Calculate correlation
correlation = np.corrcoef(experience, salary)[0, 1]
print(f"Correlation: {correlation:.3f}")

# Linear regression
slope, intercept, r_value, p_value, std_err = stats.linregress(experience, salary)
print(f"Regression: Salary = ₹{intercept:.2f} + ₹{slope:.2f} × Experience")
print(f"R-squared: {r_value**2:.3f}")

# Prediction
predicted_salary_5yrs = intercept + slope * 5
print(f"Predicted salary for 5 years experience: ₹{predicted_salary_5yrs:.2f} LPA")
```

### 6. Chi-Square Tests and ANOVA
Chi-square tests are used for categorical data to test independence, while ANOVA compares means across multiple groups.

**India-centric Example:** A telecom company (Airtel) wants to test if customer churn rate is independent of service plan type (Prepaid vs Postpaid). Using a chi-square test on data from 10,000 customers, they find that postpaid customers have significantly lower churn rates (8%) compared to prepaid customers (15%), with p-value < 0.001. For ANOVA: Compare average customer satisfaction scores across three regions (North: 7.8, South: 8.2, West: 7.5) to determine if regional differences are statistically significant.

## Suggested Projects/Assignments

### Project 1: Agricultural Crop Yield Analysis Across Indian States
**Objective:** Apply statistical methods to analyze and predict crop yields using agricultural data from different Indian states.

**Dataset:** Obtain data from government sources like data.gov.in or Agriculture Ministry databases covering:
- Crop types (Wheat, Rice, Cotton, Sugarcane)
- States (Punjab, Haryana, Uttar Pradesh, Madhya Pradesh, Maharashtra)
- Variables: Rainfall (mm), Temperature (°C), Fertilizer usage (kg/hectare), Irrigation coverage (%), Yield (quintals/hectare)
- Time period: 2010-2023

**Tasks:**
1. **Descriptive Statistics:**
   - Calculate mean, median, standard deviation for wheat yield across all states
   - Compare rice yield between Punjab and West Bengal using box plots
   - Identify outliers (unusually high/low yields due to floods or droughts)

2. **Probability Analysis:**
   - Model annual rainfall in Maharashtra using appropriate distribution
   - Calculate probability of rainfall being less than 800mm (drought condition)
   - Determine probability of yields exceeding target (govt. expectations)

3. **Hypothesis Testing:**
   - Test if organic farming yields differ significantly from conventional farming
   - Compare average wheat yield in Punjab vs Haryana (two-sample t-test)
   - Test if crop yields have improved over the last decade (paired t-test)

4. **Correlation and Regression:**
   - Calculate correlation between rainfall and rice yield
   - Build regression model: Yield = f(Rainfall, Temperature, Fertilizer)
   - Predict expected yield for given weather conditions
   - Identify which factor has the strongest impact on yield

5. **ANOVA:**
   - Compare mean yields across multiple states
   - Determine if state has a significant effect on crop yield

**Deliverables:**
- Statistical analysis report (4-5 pages) with:
  - Data summary with descriptive statistics
  - Hypothesis test results with interpretations
  - Regression analysis with equations and R² values
  - Visualizations (histograms, scatter plots, correlation heatmaps)
- Python notebook with all calculations and code
- Recommendations for farmers and policymakers based on findings

### Project 2: Indian Elections Exit Poll Analysis
**Objective:** Use statistical methods to analyze exit poll data and voting patterns with focus on sampling, confidence intervals, and hypothesis testing.

**Dataset:** Create a simulated or use historical exit poll data for a state election (e.g., Uttar Pradesh, Maharashtra, Karnataka) with:
- Sample size from each constituency
- Voting preferences by party
- Demographic breakdowns (age groups, urban vs rural, education levels)
- Historical voting patterns

**Tasks:**
1. **Sampling and Confidence Intervals:**
   - Calculate 95% confidence intervals for vote share of each major party
   - Determine margin of error for the poll
   - Analyze how sample size affects confidence interval width
   - Compare predictions with actual results (if historical data)

2. **Hypothesis Testing:**
   - Test if urban and rural voting patterns are significantly different
   - Check if younger voters (18-30) prefer different parties than older voters (50+)
   - Test hypothesis: "Party A has majority support" (> 50%)

3. **Chi-Square Analysis:**
   - Test independence between education level and party preference
   - Analyze if voting patterns differ across different states/regions
   - Create contingency tables for categorical variables

4. **Comparative Statistics:**
   - Compare voter turnout across different constituencies
   - Analyze swing votes compared to previous elections
   - Identify constituencies with highest vote share variability

5. **Prediction Accuracy:**
   - Calculate prediction error rates
   - Analyze which demographics were hardest to predict
   - Compare multiple polling agencies' predictions using statistical tests

**Deliverables:**
- Jupyter notebook with complete statistical analysis
- Visualizations: confidence interval plots, chi-square heatmaps, vote share distributions
- 3-page report discussing:
  - Polling methodology and sample representativeness
  - Key statistical findings with p-values
  - Prediction accuracy and sources of error
  - Recommendations for improving future polls

## Intended Learning Outcomes

By the end of this module, students will be able to:

1. **Apply Descriptive Statistics:** Calculate and interpret measures of central tendency (mean, median, mode) and dispersion (variance, standard deviation, range) for real-world datasets.

2. **Understand Probability Distributions:** Identify and work with common probability distributions (Normal, Binomial, Poisson) and apply them to model real-world phenomena in the Indian context.

3. **Conduct Hypothesis Testing:** Formulate null and alternative hypotheses, perform statistical tests (t-tests, chi-square, ANOVA), interpret p-values, and make data-driven decisions at specified significance levels.

4. **Calculate Confidence Intervals:** Construct and interpret confidence intervals for population parameters, understanding the concept of margin of error and statistical uncertainty.

5. **Analyze Correlations:** Compute and interpret correlation coefficients (Pearson, Spearman) to understand relationships between variables, while distinguishing correlation from causation.

6. **Build Regression Models:** Develop simple and multiple linear regression models, interpret coefficients, assess model fit using R², and make predictions with appropriate caution.

7. **Choose Appropriate Tests:** Select the right statistical test based on data type (continuous vs categorical), number of groups, and research questions.

8. **Interpret Statistical Results:** Communicate statistical findings effectively to both technical and non-technical audiences, explaining concepts like significance, confidence, and practical importance.

9. **Validate ML Models:** Apply statistical methods to evaluate machine learning model performance, including cross-validation, train-test splits, and significance testing of model improvements.

10. **Think Critically About Data:** Develop a statistical mindset for questioning data quality, identifying biases, recognizing limitations of analyses, and avoiding common pitfalls like p-hacking and overfitting.

11. **Work with Indian Data Contexts:** Apply statistical concepts to analyze datasets from Indian domains (agriculture, elections, e-commerce, healthcare) with awareness of domain-specific considerations.

---

**Duration:** 25-30 minutes of core content + 6-10 hours for projects

**Prerequisites:** Module 2 (Python for Data Science); Basic mathematics knowledge

**Next Module:** Module 4 - Machine Learning Fundamentals
