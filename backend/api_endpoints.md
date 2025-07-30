
# 📌 API Endpoints for Online Ticket Booking System using Chatbot



## 🔐 Authentication APIs
| Method | Endpoint       | Description                         |
|--------|----------------|-------------------------------------|
| POST   | /api/signup    | Register a new user                 |
| POST   | /api/login     | Authenticate user and return token |
| GET    | /api/profile   | Get current user profile            |
| PUT    | /api/profile   | Update user profile                 |
| POST   | /api/logout    | Log out user (optional)             |

---

## 🤖 Chatbot Booking Flow APIs
| Method | Endpoint                  | Description                            |
|--------|---------------------------|----------------------------------------|
| GET    | /api/states               | Fetch all available states             |
| GET    | /api/cities/:stateId      | Fetch cities based on selected state   |
| GET    | /api/places/:cityId       | Fetch places to visit in a city        |
| GET    | /api/place/:placeId       | Get detailed info about a place        |

---

## 🎟️ Booking & Ticket APIs
| Method | Endpoint                   | Description                              |
|--------|----------------------------|------------------------------------------|
| POST   | /api/bookings              | Create a booking                         |
| GET    | /api/bookings              | Get all bookings for logged-in user      |
| GET    | /api/bookings/:id          | Get single booking details               |
| DELETE | /api/bookings/:id          | Cancel a booking                         |
| PUT    | /api/bookings/:id/refund   | Process refund request                   |
| GET    | /api/bookings/:id/qr       | Get QR code for booking (base64 or PDF)  |

---

## 💸 Payment APIs
| Method | Endpoint               | Description                                  |
|--------|------------------------|----------------------------------------------|
| POST   | /api/payment/initiate | Initiate payment (get payment order ID etc.) |
| POST   | /api/payment/verify   | Verify payment after success from gateway    |
| GET    | /api/payment/history  | Get all payment history for user             |

---

## 🪙 Coin Reward System
| Method | Endpoint           | Description                      |
|--------|--------------------|----------------------------------|
| GET    | /api/coins         | Get current user coin balance   |
| PUT    | /api/coins/redeem  | Redeem coins                    |

---

## 🗺️ Explore / Places / Events APIs
| Method | Endpoint              | Description                          |
|--------|-----------------------|--------------------------------------|
| GET    | /api/explore/museum   | Get list of museum-related places    |
| GET    | /api/explore/wildlife | Get list of wildlife attractions     |
| GET    | /api/explore/monuments| Get monument places                  |
| GET    | /api/events           | Get list of exhibitions/events       |

---

## 🧑‍💼 Admin Panel APIs
| Method | Endpoint               | Description                        |
|--------|------------------------|------------------------------------|
| GET    | /api/admin/dashboard   | Fetch booking, revenue analytics   |
| POST   | /api/admin/places      | Add new place                      |
| PUT    | /api/admin/places/:id  | Update a place                     |
| DELETE | /api/admin/places/:id  | Delete a place                     |
| POST   | /api/admin/events      | Add new event                      |
| GET    | /api/admin/bookings    | Get all user bookings              |
| GET    | /api/admin/users       | List all registered users          |
| GET    | /api/admin/queries     | View user-submitted queries        |

---

## ❓ Help / FAQ / User Query
| Method | Endpoint           | Description                         |
|--------|--------------------|-------------------------------------|
| POST   | /api/help/query    | Submit a help query                 |
| GET    | /api/help/faqs     | Get list of FAQs                    |

---

## 📧 Email/Notification APIs
| Method | Endpoint               | Description                           |
|--------|------------------------|---------------------------------------|
| POST   | /api/notify/email      | Send email with receipt/QR as PDF     |

---

## 🧪 Optional APIs
| Method | Endpoint             | Description                          |
|--------|----------------------|--------------------------------------|
| GET    | /api/virtual-tour    | Return virtual tour media links      |
| GET    | /api/languages       | List supported languages for chatbot |
