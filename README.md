# Cosmetic Supply Chain Optimization with Talend, Python & Power BI

## 🎓 Academic Context
This project was carried out as part of my academic journey at **Esprit School of Engineering**. It serves as a capstone integration of data engineering, business intelligence, and machine learning techniques to address real-world supply chain challenges in the cosmetics industry.

## 🧴 Project Overview
This project aims to enhance the efficiency of a cosmetic supply chain by implementing a Business Intelligence (BI) and Artificial Intelligence (AI) system. It uses Talend for the ETL process, a constellation schema for the data warehouse, and AI models to optimize supplier selection, inventory management, and customer sentiment analysis.

## 🎯 Key Objectives
- **Data Collection & Integration**: Combine internal and external sources including supplier info, customer reviews, best-seller data.
- **ETL Implementation**: Develop a robust ETL pipeline using Talend.
- **Data Warehouse**: Design and implement a **constellation schema** to support multiple fact tables.
- **Data Analysis**: Enable advanced reporting and KPI tracking with Power BI.
- **AI Modeling**: Integrate ML and DL models for clustering, classification, regression, and time-series forecasting.

## 🔄 ETL Pipeline

### Talend Implementation
- Extract structured/unstructured data from JSON, Excel, and PDF files.
- Clean, normalize, and merge data using Talend components.
- Load cleaned data into a MySQL data warehouse.
- Screenshots and documentation of job design included.

## 🏗️ Data Warehouse Design
- **Model**: Constellation Schema

### Fact Tables
- `Fact_Sales`: Orders and transactions data.
- `Fact_Stock`: Product quantities in each warehouse.
- `Fact_Production`: Time and materials used in manufacturing.

### Dimension Tables
- `Dim_Product`
- `Dim_Supplier`
- `Dim_Warehouse`
- `Dim_Shop`
- `Dim_Customer`
- `Dim_Time`
- `Dim_Logistics`

## 📊 Power BI Dashboards
- Real-time inventory and sales dashboards.
- KPIs with conditional formatting.
- DAX measures and Power Query transformations.
- Dynamic filters for custom analysis.

## 🤖 AI Integrations
- **Clustering**: Group products or customers (K-Means, CAH).
- **Classification**: Predict review sentiment (Random Forest, KNN, VADER).
- **Regression**: Forecast product demand and revenue (Linear Regression, XGBoost).
- **Time Series**: Forecast stock depletion or sales trends (ARIMA, Prophet).

## 📂 Key Files
- `talend_jobs/`: Screenshots and job files.
- `power_bi_dashboards/`: .pbix reports.
- `data/`: Raw and processed datasets.
- `notebooks/`: Exploratory data analysis and model training.

## 🧠 Conclusion
This project demonstrates how AI and BI tools can be combined to optimize a cosmetic supply chain—from supplier management to customer insights. It shows the benefit of using a **constellation schema** for managing complex relationships across multiple business domains.


