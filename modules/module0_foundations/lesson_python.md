# Module 0: Foundations - Python for Data Science

## 1. Why Python for Data Science in India

### The Python Advantage in the Indian Job Market

Python has become the lingua franca of data science in India, with over **80% of data science job postings** requiring Python proficiency. Here's why Python dominates the Indian data science landscape:

#### Industry Adoption
- **Major Indian Companies**: TCS, Infosys, Wipro, HCL have standardized on Python for their analytics divisions
- **E-commerce Giants**: Flipkart, Amazon India, Meesho use Python for recommendation engines, pricing algorithms, and demand forecasting
- **FinTech Leaders**: Paytm, PhonePe, CRED leverage Python for fraud detection, risk modeling, and customer analytics
- **Startups**: Over 70% of Indian tech startups use Python for their data infrastructure

#### Key Reasons for Python's Dominance

**1. Simple Syntax and Rapid Development**
```python
# Python's simplicity - analyzing sales data
sales_data = [12000, 15000, 18000, 21000, 25000]
average_sales = sum(sales_data) / len(sales_data)
print(f"Average Monthly Sales: ₹{average_sales:,.2f}")
```

**2. Rich Ecosystem of Libraries**
- **NumPy**: Numerical computing and array operations
- **Pandas**: Data manipulation and analysis
- **Matplotlib/Seaborn**: Data visualization
- **Scikit-learn**: Machine learning algorithms
- **TensorFlow/PyTorch**: Deep learning frameworks

**3. Community Support**
- Active PyData India community with meetups in Bangalore, Mumbai, Delhi, Hyderabad
- Analytics Vidhya and Kaggle India competitions
- Thousands of tutorials and courses in Hindi and regional languages

**4. Cost-Effective**
- Free and open-source
- Runs on any platform (Windows, Linux, Mac)
- No licensing costs - crucial for Indian startups and SMEs

**5. Salary Premium**
According to Naukri.com and LinkedIn India data (2024):
- Entry-level Python Data Analyst: ₹4-7 LPA
- Mid-level Python Data Scientist: ₹10-18 LPA
- Senior Python ML Engineer: ₹20-35 LPA
- Principal/Lead positions: ₹40+ LPA

### Real-World Impact in India

**Case Study: Swiggy's Delivery Optimization**
Swiggy uses Python to:
- Predict delivery times across 500+ Indian cities
- Optimize routes for 200,000+ delivery partners
- Analyze 1.5 million+ daily orders
- Reduce delivery time by 20% using machine learning

**Case Study: ICICI Bank Credit Risk**
ICICI Bank employs Python for:
- Analyzing loan applications using historical data
- Building credit scoring models
- Detecting fraudulent transactions
- Processing 10 million+ transactions daily

---

## 2. Core Python Concepts with Indian E-commerce Examples

### Variables and Data Types

Understanding data types is crucial for working with real-world e-commerce data.

```python
# Product data from Flipkart
product_name = "Samsung Galaxy M34"          # String
price = 18999                                # Integer
discount_percentage = 15.5                   # Float
in_stock = True                              # Boolean
available_colors = ["Blue", "Green", "Black"] # List
ratings = (4.3, 5892)                        # Tuple (rating, number of reviews)

# Dictionary for complete product info
product = {
    "name": "Samsung Galaxy M34",
    "price": 18999,
    "discount": 15.5,
    "final_price": price * (1 - discount_percentage/100),
    "in_stock": True,
    "seller": "Flipkart Assured",
    "delivery": "Free delivery in Bangalore"
}

print(f"Product: {product['name']}")
print(f"Original Price: ₹{product['price']:,}")
print(f"Final Price: ₹{product['final_price']:,.2f}")
```

### Control Flow: Making Decisions

E-commerce platforms use conditional logic extensively for business rules.

```python
# Dynamic pricing based on inventory and demand
def calculate_dynamic_price(base_price, inventory_level, demand_score):
    """
    Dynamic pricing algorithm used by Indian e-commerce platforms
    Similar to what Flipkart/Amazon use during sales
    """
    price = base_price
    
    # Low inventory increases price
    if inventory_level < 10:
        price *= 1.15  # 15% markup
        print("⚠️ Low stock - Price increased")
    
    # High demand increases price
    if demand_score > 80:
        price *= 1.10  # 10% markup
        print("🔥 High demand - Surge pricing")
    
    # Festive discount during Diwali
    from datetime import datetime
    current_month = datetime.now().month
    if current_month == 10:  # October - Diwali season
        price *= 0.85  # 15% discount
        print("🎉 Diwali Sale - 15% OFF!")
    
    return round(price, 2)

# Example usage
base_price = 25000
inventory = 8
demand = 85

final_price = calculate_dynamic_price(base_price, inventory, demand)
print(f"\nBase Price: ₹{base_price:,}")
print(f"Dynamic Price: ₹{final_price:,}")
```

### Loops: Processing Multiple Items

```python
# Analyzing sales data for multiple products
products_sold = [
    {"name": "iPhone 15", "quantity": 45, "price": 79900},
    {"name": "OnePlus 12", "quantity": 67, "price": 64999},
    {"name": "Samsung S24", "quantity": 52, "price": 74999},
    {"name": "Pixel 8", "quantity": 38, "price": 75999},
    {"name": "Vivo V30", "quantity": 81, "price": 33999}
]

# Calculate total revenue
total_revenue = 0
for product in products_sold:
    revenue = product["quantity"] * product["price"]
    total_revenue += revenue
    print(f"{product['name']}: {product['quantity']} units = ₹{revenue:,}")

print(f"\n📊 Total Revenue: ₹{total_revenue:,}")

# Find best-selling product
best_seller = max(products_sold, key=lambda x: x["quantity"])
print(f"🏆 Best Seller: {best_seller['name']} ({best_seller['quantity']} units)")
```

### List Comprehensions: Pythonic Data Processing

```python
# Customer orders from different cities
orders = [
    {"city": "Mumbai", "amount": 1200},
    {"city": "Delhi", "amount": 3400},
    {"city": "Bangalore", "amount": 2100},
    {"city": "Mumbai", "amount": 1800},
    {"city": "Hyderabad", "amount": 2900},
    {"city": "Delhi", "amount": 1500},
    {"city": "Bangalore", "amount": 4200}
]

# Filter orders above ₹2000
high_value_orders = [order for order in orders if order["amount"] > 2000]
print(f"High-value orders: {len(high_value_orders)}")

# Get amounts for a specific city
bangalore_amounts = [order["amount"] for order in orders if order["city"] == "Bangalore"]
print(f"Bangalore orders: ₹{sum(bangalore_amounts):,}")

# Calculate discount (10% for orders > ₹2000)
discounted_prices = [
    amount * 0.9 if amount > 2000 else amount 
    for order in orders 
    for amount in [order["amount"]]
]
print(f"Total after discounts: ₹{sum(discounted_prices):,.2f}")
```

### Functions: Reusable Code for Business Logic

```python
def calculate_delivery_charge(city, order_value, is_prime_member=False):
    """
    Calculate delivery charges based on location and membership
    Similar to Amazon Prime / Flipkart Plus logic
    """
    # Metro cities base charge
    metro_cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata"]
    
    if is_prime_member:
        return 0  # Free delivery for Prime members
    
    if order_value >= 500:
        return 0  # Free delivery above ₹500
    
    # Tier 1 cities
    if city in metro_cities:
        return 40
    # Tier 2/3 cities
    else:
        return 60

def calculate_gst(amount, category):
    """
    Calculate GST based on product category (Indian tax structure)
    """
    gst_rates = {
        "electronics": 0.18,      # 18% GST
        "groceries": 0.05,        # 5% GST
        "clothing": 0.12,         # 12% GST
        "luxury": 0.28            # 28% GST
    }
    
    rate = gst_rates.get(category, 0.18)
    return amount * rate

# Example usage
order_amount = 2499
city = "Pune"
category = "electronics"

delivery_charge = calculate_delivery_charge(city, order_amount, is_prime_member=False)
gst_amount = calculate_gst(order_amount, category)
total = order_amount + delivery_charge + gst_amount

print(f"Order Amount: ₹{order_amount}")
print(f"Delivery: ₹{delivery_charge}")
print(f"GST (18%): ₹{gst_amount:.2f}")
print(f"Total: ₹{total:.2f}")
```

---

## 3. Pandas & NumPy Crash Course with Local Data

### NumPy: The Foundation of Data Science

NumPy provides efficient array operations, essential for handling large datasets.

```python
import numpy as np

# Sales data for a week across multiple stores (in thousands)
# Rows: Days (Mon-Sun), Columns: Stores (Store A, B, C, D)
weekly_sales = np.array([
    [125, 145, 98, 112],   # Monday
    [132, 138, 105, 118],  # Tuesday
    [145, 152, 115, 128],  # Wednesday
    [158, 165, 122, 135],  # Thursday
    [189, 195, 145, 162],  # Friday
    [245, 268, 198, 215],  # Saturday
    [198, 215, 165, 182]   # Sunday
])

print("Weekly Sales Data (₹ in thousands):")
print(weekly_sales)

# Statistical analysis
print(f"\nTotal Sales: ₹{weekly_sales.sum():,}K")
print(f"Average Daily Sales: ₹{weekly_sales.mean():.2f}K")
print(f"Highest Sale: ₹{weekly_sales.max()}K")
print(f"Lowest Sale: ₹{weekly_sales.min()}K")

# Sales by store
store_totals = weekly_sales.sum(axis=0)
store_names = ["Store A", "Store B", "Store C", "Store D"]
for name, total in zip(store_names, store_totals):
    print(f"{name}: ₹{total}K")

# Sales by day
day_names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
daily_totals = weekly_sales.sum(axis=1)
best_day = day_names[daily_totals.argmax()]
print(f"\nBest Sales Day: {best_day} (₹{daily_totals.max()}K)")

# Weekend vs Weekday comparison
weekday_avg = weekly_sales[:5].mean()
weekend_avg = weekly_sales[5:].mean()
print(f"Weekday Average: ₹{weekday_avg:.2f}K")
print(f"Weekend Average: ₹{weekend_avg:.2f}K")
print(f"Weekend boost: {((weekend_avg/weekday_avg - 1) * 100):.1f}%")
```

### Pandas: Data Manipulation Powerhouse

Pandas is the go-to library for working with structured data like CSV files, databases, and Excel sheets.

```python
import pandas as pd

# Create sample e-commerce dataset
data = {
    'order_id': ['ORD001', 'ORD002', 'ORD003', 'ORD004', 'ORD005', 'ORD006', 'ORD007', 'ORD008'],
    'customer_name': ['Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Reddy', 
                      'Vikram Singh', 'Anjali Mehta', 'Rahul Verma', 'Pooja Iyer'],
    'city': ['Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Mumbai', 'Bangalore', 'Delhi', 'Chennai'],
    'product': ['Laptop', 'Mobile', 'Tablet', 'Laptop', 'Mobile', 'Headphones', 'Laptop', 'Mobile'],
    'amount': [45999, 18999, 24999, 52999, 21999, 2999, 48999, 19999],
    'payment_mode': ['UPI', 'Card', 'UPI', 'Card', 'UPI', 'UPI', 'Card', 'UPI'],
    'date': pd.date_range('2024-01-15', periods=8, freq='D')
}

df = pd.DataFrame(data)

print("E-commerce Orders Dataset:")
print(df)
print("\n" + "="*80 + "\n")

# Basic DataFrame operations
print("Dataset Info:")
print(f"Shape: {df.shape} (rows, columns)")
print(f"Columns: {df.columns.tolist()}")
print(f"\nFirst 3 rows:")
print(df.head(3))

# Statistical summary
print("\nStatistical Summary:")
print(df['amount'].describe())

# Filtering data
print("\n" + "="*80)
print("High-Value Orders (>₹30,000):")
high_value = df[df['amount'] > 30000]
print(high_value[['customer_name', 'product', 'amount', 'city']])

# Grouping and aggregation
print("\n" + "="*80)
print("Sales by City:")
city_sales = df.groupby('city')['amount'].agg(['sum', 'mean', 'count'])
city_sales.columns = ['Total Sales (₹)', 'Average Order (₹)', 'Number of Orders']
print(city_sales.sort_values('Total Sales (₹)', ascending=False))

print("\n" + "="*80)
print("Sales by Product:")
product_sales = df.groupby('product')['amount'].agg(['sum', 'count', 'mean'])
product_sales.columns = ['Total Revenue (₹)', 'Units Sold', 'Avg Price (₹)']
print(product_sales.sort_values('Total Revenue (₹)', ascending=False))

# Payment mode analysis
print("\n" + "="*80)
print("Payment Mode Distribution:")
payment_stats = df.groupby('payment_mode')['amount'].agg(['count', 'sum'])
payment_stats.columns = ['Transactions', 'Total Amount (₹)']
payment_stats['Percentage'] = (payment_stats['Transactions'] / len(df) * 100).round(2)
print(payment_stats)

# Adding calculated columns
df['gst'] = df['amount'] * 0.18
df['total_with_gst'] = df['amount'] + df['gst']

print("\n" + "="*80)
print("Orders with GST Calculation:")
print(df[['order_id', 'amount', 'gst', 'total_with_gst']].head())
```

### Reading and Writing Data Files

```python
# Saving DataFrame to CSV (Indian format with rupee symbol)
df.to_csv('flipkart_orders.csv', index=False)
print("✅ Data saved to flipkart_orders.csv")

# Reading CSV file
df_loaded = pd.read_csv('flipkart_orders.csv')
print("\n📂 Data loaded from CSV:")
print(df_loaded.head())

# Excel operations
df.to_excel('orders_report.xlsx', sheet_name='Orders', index=False)
print("✅ Excel report created: orders_report.xlsx")
```

### Advanced Pandas Operations

```python
# Create a more complex dataset
extended_data = {
    'customer_id': ['C001', 'C002', 'C003', 'C001', 'C004', 'C002', 'C003', 'C005'],
    'order_date': pd.date_range('2024-01-01', periods=8, freq='3D'),
    'city': ['Mumbai', 'Bangalore', 'Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Delhi', 'Hyderabad'],
    'category': ['Electronics', 'Fashion', 'Electronics', 'Home', 'Electronics', 'Fashion', 'Electronics', 'Books'],
    'revenue': [45000, 3500, 28000, 12000, 35000, 4200, 31000, 1500],
    'quantity': [1, 2, 1, 3, 1, 3, 1, 5]
}

df_extended = pd.DataFrame(extended_data)

# Date-based operations
df_extended['month'] = df_extended['order_date'].dt.month
df_extended['day_of_week'] = df_extended['order_date'].dt.day_name()

# Multi-level grouping
print("\nRevenue by City and Category:")
pivot_table = df_extended.pivot_table(
    values='revenue',
    index='city',
    columns='category',
    aggfunc='sum',
    fill_value=0
)
print(pivot_table)

# Calculate customer lifetime value
print("\nCustomer Lifetime Value:")
customer_value = df_extended.groupby('customer_id').agg({
    'revenue': 'sum',
    'order_date': 'count',
    'quantity': 'sum'
}).rename(columns={'order_date': 'order_count'})
customer_value['avg_order_value'] = customer_value['revenue'] / customer_value['order_count']
print(customer_value.sort_values('revenue', ascending=False))
```

---

## 4. Mini-Assignment: Analyzing Indian E-commerce Sales Data

### Assignment Overview

You are a data analyst at **Bharat Mart**, a growing Indian e-commerce platform. Your manager has asked you to analyze Q1 2024 sales data to identify trends and opportunities.

### Dataset Description

Create a dataset representing January-March 2024 sales with the following structure:

```python
import pandas as pd
import numpy as np

# Generate sample dataset
np.random.seed(42)

# Cities
cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad']

# Products and categories
products_data = [
    ('Samsung Galaxy M34', 'Electronics', 18999),
    ('OnePlus Nord CE3', 'Electronics', 26999),
    ('Levi\'s Jeans', 'Fashion', 2199),
    ('Nike Shoes', 'Fashion', 4999),
    ('Prestige Cooker', 'Home', 1899),
    ('Bajaj Mixer', 'Home', 3499),
    ('NCERT Class 10', 'Books', 450),
    ('RD Sharma', 'Books', 650)
]

# Generate 100 orders
n_orders = 100
data = []

for i in range(n_orders):
    order_id = f'BM{1000 + i}'
    city = np.random.choice(cities)
    product, category, base_price = products_data[np.random.randint(0, len(products_data))]
    quantity = np.random.randint(1, 4)
    price = base_price * quantity
    
    # Add some variation to prices (discounts/offers)
    price = price * np.random.uniform(0.85, 1.0)
    
    payment_mode = np.random.choice(['UPI', 'Card', 'COD', 'Wallet'], p=[0.45, 0.30, 0.15, 0.10])
    
    # Generate date in Q1 2024
    day = np.random.randint(1, 90)
    order_date = pd.Timestamp('2024-01-01') + pd.Timedelta(days=day)
    
    data.append({
        'order_id': order_id,
        'order_date': order_date,
        'city': city,
        'product': product,
        'category': category,
        'quantity': quantity,
        'price': round(price, 2),
        'payment_mode': payment_mode
    })

df_sales = pd.DataFrame(data)

# Save to CSV
df_sales.to_csv('bharat_mart_q1_2024.csv', index=False)
print("Dataset created: bharat_mart_q1_2024.csv")
print(f"Total Orders: {len(df_sales)}")
print(df_sales.head(10))
```

### Tasks

Complete the following tasks using Python, Pandas, and NumPy:

#### Task 1: Data Exploration (20 points)
```python
# TODO: Your code here
# 1.1 Load the dataset and display first 10 rows
# 1.2 Display dataset info (shape, columns, data types)
# 1.3 Check for missing values
# 1.4 Display statistical summary of numerical columns
```

#### Task 2: Sales Analysis (30 points)
```python
# TODO: Your code here
# 2.1 Calculate total revenue for Q1 2024
# 2.2 Find the average order value
# 2.3 Identify the month with highest sales
# 2.4 Calculate revenue by category
# 2.5 Find top 3 selling products by quantity
```

#### Task 3: City-wise Analysis (20 points)
```python
# TODO: Your code here
# 3.1 Calculate total sales by city
# 3.2 Find the city with highest average order value
# 3.3 Identify which city prefers which product category
# 3.4 Create a pivot table: Cities vs Categories with revenue
```

#### Task 4: Payment Mode Analysis (15 points)
```python
# TODO: Your code here
# 4.1 Count orders by payment mode
# 4.2 Calculate revenue by payment mode
# 4.3 Find average order value for each payment mode
# 4.4 Calculate percentage distribution of payment modes
```

#### Task 5: Time-based Analysis (15 points)
```python
# TODO: Your code here
# 5.1 Extract month from order_date and add as new column
# 5.2 Calculate monthly revenue
# 5.3 Find the day of week with highest sales
# 5.4 Identify any weekly patterns in sales
```

### Bonus Challenge (20 points)

Create a comprehensive business report answering:

1. **Revenue Insights**: Which category and city combination generates the most revenue?
2. **Growth Analysis**: Compare revenue growth from January to March
3. **Customer Behavior**: What's the relationship between payment mode and order value?
4. **Recommendations**: Based on your analysis, provide 3 actionable recommendations to increase sales

### Sample Solution Structure

```python
import pandas as pd
import numpy as np

# Load data
df = pd.read_csv('bharat_mart_q1_2024.csv')
df['order_date'] = pd.to_datetime(df['order_date'])

# ==================== TASK 1 ====================
print("="*80)
print("TASK 1: DATA EXPLORATION")
print("="*80)

# 1.1 First 10 rows
print("\n1.1 First 10 Orders:")
print(df.head(10))

# 1.2 Dataset info
print("\n1.2 Dataset Information:")
print(f"Shape: {df.shape}")
print(f"Columns: {df.columns.tolist()}")
print(f"\nData Types:")
print(df.dtypes)

# 1.3 Missing values
print("\n1.3 Missing Values:")
print(df.isnull().sum())

# 1.4 Statistical summary
print("\n1.4 Statistical Summary:")
print(df.describe())

# ==================== TASK 2 ====================
print("\n" + "="*80)
print("TASK 2: SALES ANALYSIS")
print("="*80)

# Your code for Task 2...

# Continue with Tasks 3, 4, 5...
```

### Expected Outputs

Your analysis should produce:
1. Clear, formatted outputs with proper labels
2. Insights written as comments or print statements
3. Proper use of pandas groupby, filtering, and aggregation
4. NumPy arrays where appropriate for calculations
5. At least one visualization (optional, using matplotlib)

### Submission Guidelines

1. Complete all tasks in a Jupyter Notebook or Python script
2. Include comments explaining your approach
3. Format numbers with proper currency symbols (₹)
4. Save your code as `bharat_mart_analysis.py` or `bharat_mart_analysis.ipynb`

### Evaluation Criteria

- **Code Quality** (30%): Clean, readable, well-commented code
- **Correctness** (40%): Accurate calculations and proper use of Pandas/NumPy
- **Insights** (20%): Quality of business insights derived from data
- **Presentation** (10%): Clear formatting and professional output

---

## 5. References and Resources

### Official Documentation

1. **Python**
   - Python Official Docs: https://docs.python.org/3/
   - Python Tutorial: https://docs.python.org/3/tutorial/

2. **NumPy**
   - Official Documentation: https://numpy.org/doc/
   - NumPy User Guide: https://numpy.org/doc/stable/user/
   - NumPy Quick Start: https://numpy.org/doc/stable/user/quickstart.html

3. **Pandas**
   - Official Documentation: https://pandas.pydata.org/docs/
   - 10 Minutes to Pandas: https://pandas.pydata.org/docs/user_guide/10min.html
   - Pandas Cookbook: https://pandas.pydata.org/docs/user_guide/cookbook.html

### Learning Platforms (India-Focused)

1. **Analytics Vidhya**
   - Website: https://www.analyticsvidhya.com/
   - Free Python course: https://courses.analyticsvidhya.com/
   - Practice Problems: https://datahack.analyticsvidhya.com/

2. **NPTEL (IIT/IISc Courses)**
   - Python for Data Science: https://nptel.ac.in/
   - Free certification courses by IIT professors

3. **Great Learning**
   - Free Data Science courses: https://www.mygreatlearning.com/
   - India-specific case studies

4. **Kaggle**
   - Python Course: https://www.kaggle.com/learn/python
   - Pandas Course: https://www.kaggle.com/learn/pandas
   - Practice Datasets: https://www.kaggle.com/datasets

### Books

1. **"Python for Data Analysis"** by Wes McKinney (Creator of Pandas)
   - Comprehensive guide to Pandas and NumPy
   - Available on Amazon India

2. **"Python Crash Course"** by Eric Matthes
   - Great for beginners
   - Practical projects included

3. **"Automate the Boring Stuff with Python"** by Al Sweigart
   - Free online: https://automatetheboringstuff.com/
   - Practical Python applications

### YouTube Channels (Hindi/English)

1. **Krish Naik** - Data Science in Hindi and English
2. **Code with Harry** - Python tutorials in Hindi
3. **Corey Schafer** - In-depth Python tutorials
4. **Sentdex** - Python for data analysis and ML

### Practice Platforms

1. **HackerRank Python**: https://www.hackerrank.com/domains/python
2. **LeetCode**: https://leetcode.com/ (Coding practice)
3. **Codewars**: https://www.codewars.com/ (Python challenges)
4. **Project Euler**: https://projecteuler.net/ (Mathematical problems)

### Indian Datasets for Practice

1. **data.gov.in** - Government of India Open Data
   - Census data, economic indicators, agricultural data
   - Free and publicly available

2. **Reserve Bank of India (RBI) Database**
   - Economic data, inflation, interest rates
   - https://www.rbi.org.in/Scripts/Statistics.aspx

3. **Indian Stock Market Data**
   - NSE/BSE historical data
   - Yahoo Finance, Quandl

4. **Cricket Data**
   - IPL statistics: https://www.iplt20.com/stats/
   - Cricsheet: https://cricsheet.org/

5. **COVID-19 India Data**
   - https://www.covid19india.org/
   - State-wise statistics

### Community and Forums

1. **PyData India** - Meetup groups in major cities
2. **Data Science Stack Exchange**: https://datascience.stackexchange.com/
3. **r/datascience** - Reddit community
4. **LinkedIn Groups** - Data Science India communities

### Tools and IDEs

1. **Jupyter Notebook**
   - Installation: `pip install jupyter`
   - Launch: `jupyter notebook`

2. **Google Colab**
   - Free cloud-based Jupyter notebooks
   - Free GPU access
   - https://colab.research.google.com/

3. **VS Code**
   - Free, powerful IDE
   - Python extension available
   - https://code.visualstudio.com/

4. **PyCharm Community Edition**
   - Dedicated Python IDE
   - https://www.jetbrains.com/pycharm/

### Cheat Sheets

1. **Python Basics**: https://www.pythoncheatsheet.org/
2. **NumPy Cheat Sheet**: https://s3.amazonaws.com/assets.datacamp.com/blog_assets/Numpy_Python_Cheat_Sheet.pdf
3. **Pandas Cheat Sheet**: https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf

### Next Steps

After completing this lesson:

1. ✅ Practice the mini-assignment thoroughly
2. ✅ Explore at least 2-3 Indian datasets from data.gov.in
3. ✅ Build a small project (e.g., analyze your city's weather data)
4. ✅ Join local Python/Data Science meetups
5. ✅ Start participating in Kaggle competitions
6. ✅ Move to Module 1: Statistics and Probability

### Getting Help

- **Stack Overflow**: Tag questions with [python], [pandas], [numpy]
- **Analytics Vidhya Forums**: Community support
- **Python India Community**: Join Telegram/WhatsApp groups in your city

---

## Summary

In this lesson, you learned:

✅ Why Python dominates data science in India  
✅ Core Python concepts with real e-commerce examples  
✅ NumPy for numerical operations and array manipulation  
✅ Pandas for data analysis and manipulation  
✅ Practical mini-assignment with Indian sales data  
✅ Comprehensive resources for continued learning  

**Time to Complete**: 2-3 hours  
**Difficulty Level**: Beginner  
**Prerequisites**: Basic computer skills, enthusiasm to learn!  

**Next Module**: Statistics and Probability Fundamentals

---

**Happy Learning! 🚀**

*For queries or discussions, join the PyData India community or Analytics Vidhya forums.*
