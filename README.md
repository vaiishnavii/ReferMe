# ReferMe
# Referral Connection Platform

## Overview

The Referral Connection Platform is a web-based application designed to connect people seeking referrals with those who want to refer others. The platform leverages OAuth2 for authentication using Google and LinkedIn, and it is built with modern web technologies including ReactJS, Node.js, and MongoDB. The project also demonstrates the use of CI/CD pipelines and containerization for deployment.

## Features

- **User Authentication**: Users can log in using their Google or LinkedIn accounts.
- **User Profiles**: Separate profiles for seekers and referrers.
- **Referral Requests**: Seekers can create, view, and manage referral requests; referrers can respond to these requests.
- **Messaging System**: Direct communication between seekers and referrers.
- **CI/CD Pipeline**: Automated testing, building, and deployment using GitHub Actions.
- **Dockerized Deployment**: Containerized application running on AWS.

## Architecture

### Design Chart

```plaintext
+-------------------------------------+
|          Frontend (ReactJS)         |
|                                     |
|  +-------------------------------+  |
|  |        Authentication         |  |
|  |  (Google, LinkedIn OAuth2)    |  |
|  +-------------------------------+  |
|  |      User Profiles (Seekers,  |  |
|  |       Referrers)              |  |
|  +-------------------------------+  |
|  |   Referral Requests           |  |
|  |  (Create, View, Manage)       |  |
|  +-------------------------------+  |
|  |       Messaging System        |  |
|  +-------------------------------+  |
+-----------------|--------------------+
                  |
                  |  HTTP Requests (Axios/Fetch)
                  v
+-----------------|--------------------+
|          Backend (Node.js)           |
|                                     |
|  +-------------------------------+  |
|  |       Express Server          |  |
|  |                               |  |
|  +-------------------------------+  |
|  |  Passport.js (OAuth2)         |  |
|  |  - Google Strategy            |  |
|  |  - LinkedIn Strategy          |  |
|  +-------------------------------+  |
|  |    REST API Endpoints         |  |
|  |  - Authentication             |  |
|  |  - User Profiles              |  |
|  |  - Referral Requests          |  |
|  +-------------------------------+  |
|  |        Mongoose Models        |  |
|  |  - User                       |  |
|  |  - ReferralRequest            |  |
|  +-------------------------------+  |
+-----------------|--------------------+
                  |
                  |  MongoDB Queries
                  v
+-----------------|--------------------+
|              MongoDB Database        |
|                                     |
|  +-------------------------------+  |
|  |            Users              |  |
|  +-------------------------------+  |
|  |        ReferralRequests       |  |
|  +-------------------------------+  |
+-------------------------------------+
                  |
                  v
+-------------------------------------+
|           Hosting (AWS)             |
|                                     |
|  +-------------------------------+  |
|  |      EC2 Instances (App)      |  |
|  +-------------------------------+  |
|  |      S3 (Static Assets)       |  |
|  +-------------------------------+  |
+-------------------------------------+
                  |
                  v
+-------------------------------------+
|         CI/CD (GitHub Actions)      |
|                                     |
|  +-------------------------------+  |
|  |      Build and Test           |  |
|  +-------------------------------+  |
|  |      Dockerize App            |  |
|  +-------------------------------+  |
|  |      Deploy to AWS            |  |
|  +-------------------------------+  |
+-------------------------------------+
