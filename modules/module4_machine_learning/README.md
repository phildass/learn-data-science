# Module 4: Machine Learning Fundamentals

## Overview

This module introduces students to the core concepts and algorithms of machine learning, with a focus on supervised and unsupervised learning techniques. Students will learn to build, train, evaluate, and deploy machine learning models using real-world Indian datasets. The module emphasizes practical applications across various Indian industries including e-commerce, fintech, healthcare, and agriculture, preparing students for data science roles in the Indian job market.

## Major Topics

### 1. Introduction to Machine Learning
Understanding what machine learning is, its types, and where it fits in the data science workflow.

**India-centric Example:** Ola uses machine learning to predict ride demand in different areas of Bangalore. During office hours (9-11 AM), the model predicts high demand near IT parks like Electronic City and Whitefield. During evenings (6-9 PM), it predicts surge in residential areas like Koramangala and Indiranagar. The model learns from historical trip data including time, location, day of week, weather, and local events (like cricket matches at Chinnaswamy Stadium). This is supervised learning using regression to predict demand (a continuous value).

### 2. Supervised Learning: Regression
Regression algorithms predict continuous numerical values based on input features.

**India-centric Example:** MagicBricks builds a house price prediction model for Delhi-NCR. The model takes inputs like:
- Location (Gurgaon, Noida, Dwarka, Greater Noida)
- Property size (square feet)
- Number of bedrooms (1BHK to 4BHK)
- Age of construction
- Floor number
- Amenities (metro nearby, parking, gym, etc.)

Using Linear Regression, the model learns the relationship: `Price = β₀ + β₁(Size) + β₂(Location) + β₃(BHK) + ...`

It predicts a 3BHK, 1500 sq ft apartment in Gurgaon Sector 42 with metro connectivity would cost approximately ₹1.2 crores.

```python
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import pandas as pd

# Sample data
data = {
    'size_sqft': [850, 1200, 1500, 1800, 2200, 1000, 1350, 1650],
    'bedrooms': [2, 2, 3, 3, 4, 2, 3, 3],
    'metro_distance_km': [0.5, 1.2, 0.3, 2.0, 1.5, 0.8, 0.4, 1.8],
    'age_years': [2, 5, 1, 8, 3, 4, 2, 6],
    'price_crores': [0.75, 0.95, 1.20, 1.10, 1.85, 0.82, 1.15, 1.05]
}
df = pd.DataFrame(data)

# Features and target
X = df[['size_sqft', 'bedrooms', 'metro_distance_km', 'age_years']]
y = df['price_crores']

# Train model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)

# Predict
new_property = [[1500, 3, 0.3, 1]]  # 3BHK, 1500 sqft, 0.3km from metro, 1 year old
predicted_price = model.predict(new_property)
print(f"Predicted Price: ₹{predicted_price[0]:.2f} crores")
```

### 3. Supervised Learning: Classification
Classification algorithms predict categorical outcomes (classes or labels).

**India-centric Example:** HDFC Bank builds a loan approval system to classify loan applications as "Approved" or "Rejected". The model uses features like:
- Applicant's credit score (CIBIL score)
- Annual income
- Employment type (salaried, self-employed, business)
- Existing loans and EMIs
- Age and work experience
- City tier (Metro, Tier-1, Tier-2)

Using Logistic Regression or Random Forest, the model learns patterns from historical data of 100,000 applications and their outcomes. For a new application from a 32-year-old software engineer in Pune with ₹12 LPA income, 750 CIBIL score, and no existing loans, the model predicts 92% probability of approval.

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix

# Sample loan data
X_train = [[750, 12, 0, 32], [680, 8, 1, 28], [800, 18, 0, 38], 
           [620, 6, 2, 25], [720, 15, 1, 35], [580, 5, 3, 30]]
y_train = [1, 1, 1, 0, 1, 0]  # 1: Approved, 0: Rejected

# Train Random Forest model
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Predict for new applicant
new_applicant = [[750, 12, 0, 32]]  # CIBIL, Income, Existing_Loans, Age
prediction = clf.predict(new_applicant)
probability = clf.predict_proba(new_applicant)

print(f"Approval Decision: {'Approved' if prediction[0] == 1 else 'Rejected'}")
print(f"Approval Probability: {probability[0][1]:.2%}")
```

### 4. Unsupervised Learning: Clustering
Clustering groups similar data points together without predefined labels.

**India-centric Example:** Flipkart uses K-Means clustering to segment customers based on their shopping behavior:
- **Cluster 1 - "Festival Shoppers"**: Shop heavily during Diwali/Dussehra, high spending on electronics and home decor
- **Cluster 2 - "Budget Hunters"**: Frequent shoppers looking for deals, prefer affordable fashion and accessories
- **Cluster 3 - "Premium Buyers"**: Occasional shoppers, high average order value, prefer branded products
- **Cluster 4 - "Mobile Enthusiasts"**: Regularly browse and buy smartphones and accessories

This segmentation helps Flipkart personalize marketing campaigns. During Big Billion Days, Cluster 1 gets notifications about electronics deals, while Cluster 3 receives exclusive premium brand offers.

```python
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# Customer data: [Average Order Value (₹), Purchase Frequency (per month)]
customers = [[500, 8], [5000, 2], [1500, 5], [450, 10], 
             [4800, 1], [600, 7], [5200, 2], [1400, 6]]

# K-Means clustering
kmeans = KMeans(n_clusters=3, random_state=42)
clusters = kmeans.fit_predict(customers)

print("Customer Segments:")
for i, cluster in enumerate(clusters):
    print(f"Customer {i+1}: Segment {cluster+1}")
```

### 5. Model Evaluation Metrics
Understanding how to measure model performance is crucial for building reliable ML systems.

**India-centric Example:** PhonePe builds a fraud detection model for UPI transactions. They need to choose metrics carefully:
- **Accuracy** might be misleading (99% of transactions are legitimate, so a model predicting everything as "not fraud" gets 99% accuracy but fails the purpose)
- **Precision**: Of all transactions flagged as fraud, how many are actually fraud? (Important to avoid blocking legitimate transactions)
- **Recall**: Of all actual fraud cases, how many did we catch? (Important to minimize financial losses)
- **F1-Score**: Harmonic mean of precision and recall (balanced metric)

For fraud detection, they prioritize high recall (catch as many frauds as possible) while maintaining reasonable precision (don't frustrate customers with false alarms).

```python
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

# Actual vs Predicted fraud labels
y_true = [0, 0, 1, 0, 1, 1, 0, 0, 1, 0]  # 0: Legitimate, 1: Fraud
y_pred = [0, 0, 1, 0, 0, 1, 0, 0, 1, 1]  # Model predictions

print(f"Accuracy: {accuracy_score(y_true, y_pred):.2%}")
print(f"Precision: {precision_score(y_true, y_pred):.2%}")
print(f"Recall: {recall_score(y_true, y_pred):.2%}")
print(f"F1-Score: {f1_score(y_true, y_pred):.2%}")
print("\nConfusion Matrix:")
print(confusion_matrix(y_true, y_pred))
```

### 6. Feature Engineering and Selection
Creating and selecting the right features can dramatically improve model performance.

**India-centric Example:** Zomato builds a restaurant recommendation system. Raw features include restaurant category, location, price range, and ratings. Through feature engineering, they create:
- **Derived features**: Average delivery time, peak hours popularity
- **Encoded features**: Cuisine type (North Indian, South Indian, Chinese, etc.) converted to numerical values
- **Interaction features**: Price × Rating (value for money indicator)
- **Temporal features**: Day of week, time of day (people order more biryani on weekends)
- **Geographical features**: Distance from user, neighborhood popularity

These engineered features help the model better understand user preferences and provide personalized recommendations.

## Suggested Projects/Assignments

### Project 1: Customer Churn Prediction for Indian Telecom Company
**Objective:** Build a classification model to predict which customers are likely to stop using a telecom service (Jio, Airtel, or Vi), enabling proactive retention strategies.

**Dataset:** Create or use a telecom churn dataset with features:
- Customer demographics: Age, gender, city tier
- Account information: Tenure (months), contract type (prepaid/postpaid)
- Usage patterns: Average monthly calls (minutes), SMS count, data usage (GB)
- Service details: Number of complaints, customer service calls
- Billing: Average monthly bill (₹), late payments
- Target variable: Churned (Yes/No)

**Tasks:**
1. **Data Exploration:**
   - Analyze churn rate overall and by customer segments
   - Identify which features correlate most with churn
   - Visualize distribution of churned vs retained customers

2. **Data Preprocessing:**
   - Handle missing values
   - Encode categorical variables (city tier, contract type)
   - Scale numerical features
   - Address class imbalance if present (use SMOTE or class weights)

3. **Model Building:**
   - Train multiple models: Logistic Regression, Decision Tree, Random Forest, XGBoost
   - Use 80-20 train-test split
   - Implement cross-validation for robust evaluation

4. **Model Evaluation:**
   - Compare models using accuracy, precision, recall, F1-score, and ROC-AUC
   - Create confusion matrix and ROC curves
   - Identify which metrics matter most for business (catching churners vs avoiding false alarms)

5. **Feature Importance:**
   - Determine which features most influence churn
   - Provide business insights (e.g., "Customers with >3 complaints have 5x higher churn")

6. **Business Recommendations:**
   - Design retention strategies for high-risk customers
   - Calculate potential revenue saved by preventing churn
   - Suggest service improvements based on findings

**Deliverables:**
- Jupyter notebook with complete ML pipeline
- Model comparison report with evaluation metrics
- Feature importance visualization
- Business presentation (5 slides) for telecom management team
- Saved model file (pickle) for deployment

### Project 2: Crop Recommendation System for Indian Farmers
**Objective:** Build a multi-class classification system that recommends the most suitable crop to plant based on soil conditions, climate, and location, helping farmers maximize yield and profit.

**Dataset:** Agricultural data with features:
- Soil properties: NPK values (Nitrogen, Phosphorous, Potassium), pH level
- Climate: Temperature (°C), humidity (%), rainfall (mm)
- Location: State, district
- Target: Recommended crop (Rice, Wheat, Cotton, Sugarcane, Maize, Pulses, etc.)

**Tasks:**
1. **Data Collection and Preparation:**
   - Gather soil and climate data for different Indian regions
   - Create labeled dataset from historical successful crops
   - Handle any missing or inconsistent data

2. **Exploratory Data Analysis:**
   - Analyze soil and climate requirements for different crops
   - Visualize which crops grow best in which conditions
   - Identify patterns (e.g., rice needs high rainfall, wheat prefers moderate temperature)

3. **Feature Engineering:**
   - Create composite features (e.g., soil fertility index)
   - Encode categorical variables (state, district)
   - Normalize numerical features

4. **Multi-Class Classification:**
   - Train models: Decision Tree, Random Forest, SVM, Naive Bayes
   - Handle multi-class classification (10-15 different crops)
   - Use appropriate evaluation metrics for multi-class problems

5. **Model Evaluation:**
   - Calculate accuracy for each crop category
   - Create confusion matrix to identify commonly confused crops
   - Evaluate precision and recall per crop type

6. **Real-World Application:**
   - Build a simple prediction interface: input soil/climate → get top 3 crop recommendations
   - Provide confidence scores for each recommendation
   - Include expected yield estimates if data available

7. **Regional Validation:**
   - Test model performance for different states (Punjab vs Maharashtra vs Kerala)
   - Ensure recommendations align with traditional agricultural knowledge

**Deliverables:**
- Complete ML pipeline in Jupyter notebook
- Trained model with >80% accuracy
- Confusion matrix and per-class performance metrics
- Simple command-line interface for crop prediction
- Documentation explaining model features and usage
- Report with agricultural insights and model limitations

## Intended Learning Outcomes

By the end of this module, students will be able to:

1. **Understand ML Fundamentals:** Explain the differences between supervised, unsupervised, and reinforcement learning, and identify appropriate use cases for each in Indian business contexts.

2. **Build Regression Models:** Develop and train regression models (Linear Regression, Ridge, Lasso) for predicting continuous outcomes like house prices, stock values, or sales forecasts.

3. **Build Classification Models:** Implement classification algorithms (Logistic Regression, Decision Trees, Random Forests, SVM) to solve binary and multi-class problems like loan approval or crop recommendation.

4. **Apply Clustering Techniques:** Use K-Means and hierarchical clustering to segment customers, group similar products, or identify patterns in unlabeled data.

5. **Evaluate Model Performance:** Select and compute appropriate evaluation metrics (accuracy, precision, recall, F1-score, ROC-AUC, R²) based on the business problem and interpret their meaning.

6. **Handle Real-World Data:** Apply data preprocessing techniques including handling missing values, encoding categorical variables, feature scaling, and train-test splitting.

7. **Perform Feature Engineering:** Create new features from existing ones, select important features, and understand feature importance to improve model performance.

8. **Avoid Overfitting:** Understand the bias-variance tradeoff, use cross-validation, apply regularization techniques, and validate models on holdout test sets.

9. **Use Scikit-learn Library:** Demonstrate proficiency in using scikit-learn for the complete ML workflow: data preprocessing, model training, hyperparameter tuning, and evaluation.

10. **Solve Indian Business Problems:** Apply ML algorithms to real-world Indian scenarios in e-commerce, banking, agriculture, telecom, and healthcare sectors.

11. **Communicate ML Results:** Present model findings, performance metrics, and business recommendations to both technical teams and business stakeholders.

12. **Deploy ML Models:** Understand the basic concepts of model deployment, versioning, and monitoring in production environments.

---

**Duration:** 30-35 minutes of core content + 8-12 hours for projects

**Prerequisites:** Modules 2 & 3 (Python and Statistics); Understanding of basic linear algebra

**Next Module:** Module 5 - Deep Learning and Neural Networks
