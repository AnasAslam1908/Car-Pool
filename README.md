# RideShare (CarPool)

## 🚘 Description

**RideShare** is a full-featured carpooling platform designed to connect passengers with drivers heading in the same direction. The goal is to promote **eco-friendly travel**, **reduce fuel costs**, and **make commuting more efficient**. Whether you're a daily commuter or an occasional traveler, RideShare provides a seamless interface for managing rides. With robust role-based functionality and session management, it’s designed to support Drivers, Passengers, and Admins—each with a personalized dashboard and set of features.

This platform is especially useful for communities, universities, and workplaces aiming to encourage ride-sharing habits among their members.

---

## 🔧 Tech Stack

- **Frontend:** React, Tailwind CSS  
- **Backend:** Spring Boot (REST APIs)  
- **Database:** MySQL  
- **Authentication:** Session-based using cookies  

---

## ✨ Features

### 1. 🔐 User Authentication & Management

- **User Registration**  
  Users can register as:
  - Driver  
  - Passenger  
  - Admin  

- **User Login**  
  Session-based login using cookies.

- **Profile Management**  
  Users can update:
  - Name  
  - Contact details  
  - Password  

- **Admin Panel: View All Users**  
  Admin can view a list of all registered drivers and passengers.

---

### 2. 🚗 Driver Features

- **Add a Ride**  
  Drivers can create a ride by providing:
  - Route (as a string)  
  - Departure Time  
  - Available Seats  

- **View My Rides**  
  Drivers can view both:
  - Upcoming rides  
  - Past rides  

- **Cancel a Ride**  
  Drivers can cancel a ride **only if** no passengers have booked it.

- **View Bookings**  
  Drivers can see the list of passengers who booked their ride.

---

### 3. 👤 Passenger Features

- **View Available Rides**  
  Passengers can search rides by:
  - Route  
  - Departure Time  

- **Book a Ride**  
  Passengers can select available seats and book rides.

- **Cancel Booking**  
  Passengers can cancel bookings **before the ride's departure time**.

- **Rate the Ride**  
  After the ride is completed, passengers can:
  - Rate the ride out of 5  
  - Leave textual feedback  

- **View My Bookings**  
  View both upcoming and past booked rides.

---

### 4. 🛠️ Admin Features

- **View All Users**  
  List and manage all registered drivers and passengers.

- **View All Rides**  
  Admin can view rides, with filters:
  - By driver  
  - By route  
  - By departure time  

- **Delete Users**  
  Admin can delete suspicious or spam user accounts.

---

### 5. 🧠 Additional Functionalities

- **Session Management**  
  Authentication maintained using session cookies.

- **Role-Based Dashboards**  
  Custom dashboard views for:
  - Driver  
  - Passenger  
  - Admin  

- **Ride Status Management**  
  Rides are automatically marked as **completed** once the departure time has passed.

---

## 📸 Screenshots

## User
![image](https://github.com/user-attachments/assets/68f22437-3b72-4ff2-854d-12d59c9a53d0)
![image](https://github.com/user-attachments/assets/92031bee-46df-4cff-b24f-878ff93444e2)
![image](https://github.com/user-attachments/assets/5337832c-4bef-4d3e-bfae-f6c5ca8e6898)
![image](https://github.com/user-attachments/assets/cc9e26fc-1db9-4f69-acd6-6e0a6fd768a2)
![image](https://github.com/user-attachments/assets/3ae40a41-31a0-4116-b3e7-a22579f01897)
![image](https://github.com/user-attachments/assets/a1c32cf3-96b8-4099-bda5-58cd12aa4f2f)
![image](https://github.com/user-attachments/assets/d5b34059-44e2-417b-8858-07e14d9dc701)

## Driver
![image](https://github.com/user-attachments/assets/1b5cae8d-863f-46f1-b4bc-41c7782592e4)
![image](https://github.com/user-attachments/assets/8c455048-dd2f-4c9e-bdb3-8812849ae510)
![image](https://github.com/user-attachments/assets/52634d73-0ab5-4b34-bf85-155e7fb0464f)
![image](https://github.com/user-attachments/assets/e13d90f9-fc31-4d89-b419-e0c2c8fc259f)

## Admin
  
![image](https://github.com/user-attachments/assets/836bab67-49d1-4b8c-b5f4-2af27070d69c)
![image](https://github.com/user-attachments/assets/5b8846db-24ea-4286-8261-07133e5f5f5e)
![image](https://github.com/user-attachments/assets/159aa8fa-44c8-49fa-bbaf-d1183fbd6d90)
![image](https://github.com/user-attachments/assets/8ca1cc86-bc60-4ed4-8ef0-4b5ad60b8eaf)

---


## 🚀 Installation Guide

### Prerequisites

- Java 17+
- Node.js + npm
- MySQL Server
- Maven

---

## 🗄️ Database Setup: Import `CarPool.sql` in MySQL Workbench

Follow these steps to set up the database using MySQL Workbench:

1. **Open MySQL Workbench**.

2. **Connect** to your MySQL server.

3. **Create a new schema** called `CarPool`:
   - Click the **"Create a new schema"** icon (the cylinder with a plus sign).
   - Enter `CarPool` as the schema name.
   - Click **Apply**, then **Finish**.

4. **Import the SQL file**:
   - Go to `File > Open SQL Script`.
   - Browse and select the `CarPool.sql` file from your project directory.
   - Ensure the `CarPool` schema is selected in the SCHEMAS panel on the left.

5. **Run the script**:
   - Click the **lightning bolt (⚡)** icon or press `Ctrl + Shift + Enter` to execute the SQL script.

6. Once executed, all the required tables and sample data should now be available under the `CarPool` schema.

---

## ⚙️ Configure Database Connection

After importing the database, update your database credentials in the `application.properties` file located in `src/main/resources/`.

```properties
# src/main/resources/application.properties

spring.datasource.url=jdbc:mysql://localhost:3306/CarPool
spring.datasource.username=root
spring.datasource.password=your_password

