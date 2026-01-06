# Automated Cybersecurity System for Real-Time Anomaly Detection

A system that uses machine learning algorithms to detect real-time network anomalies based on the CICIDS-2017 dataset.

---

## Overview
This project implements an automated cybersecurity system that leverages machine learning algorithms, specifically a Random Forest model, to detect real-time anomalies in network traffic based on the CICIDS-2017 dataset.  

The system is designed as a foundation for future deployment in real-world environments, with the goal of assisting organizations in protecting their network infrastructure and reducing human error during incident detection and response.

---

## Problem Statement
One of the main motivations for this system is the slow and sometimes inaccurate human response to security incidents. Manual log analysis is time-consuming and error-prone, particularly when dealing with large volumes of data and heterogeneous log formats.

---

## Solution & Approach
The system relies on a Random Forest model to analyze network traffic records and classify each entry as either *normal traffic* or *attack*. Classification is primarily based on variations across multiple traffic features.

Before training the model, the dataset was preprocessed and refined, including the transformation of the target variable into a binary classification problem. This approach simplifies detection logic and improves model interpretability.

---

## Features
- Classifies network traffic as **normal** or **attack**
- Filters logs and alerts by severity level, date, and source
- Visual presentation of logs and alerts using charts

---

## Tech Stack
- **Language:** Python 3.13  
- **Frameworks / Libraries:** Pandas, NumPy, FastAPI, React, JSON Web Tokens (JWT)
- **Database:** PostgreSQL  
- **Tools:** Git  
- **Environment:** Windows  

---

## Limitations
The system has not yet been tested in a real production environment, which may impact the credibility of the results and lead to false positives. Additionally, the CICIDS-2017 dataset presents a significant class imbalance between benign and malicious traffic, which can introduce bias into the trained model.

---

## Future Improvements
- Add real-time log ingestion
- Implement CSV export and automated report generation
- Improve test coverage and validation strategies

---

## Security Considerations
- API sessions are protected using JSON Web Tokens (JWT)
