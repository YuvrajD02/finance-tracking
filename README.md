# Finance Dashboard

A responsive finance analytics dashboard built with Next.js App Router, Tailwind CSS, Zustand, and Recharts.

## Project Overview

This project tracks financial transactions and provides:

- Dynamic financial summary cards (balance, income, expenses)
- Interactive transaction management (search/filter/sort/edit/delete)
- Role-based capabilities (Viewer/Admin)
- Analytics insights and visual charts
- Multi-source data loading with priority:
	1. CSV upload (localStorage)
	2. Google Sheet CSV URL
	3. Default fallback data

## Features

### Dashboard Overview

- `Total Balance`, `Total Income`, `Total Expenses`
- Dynamic values computed from transaction data
- Month-over-month percentage indicators
- Proper USD currency formatting

### Transactions

- Table columns: `Date`, `Amount`, `Category`, `Type`, `Actions`
- Search by category/type/date/keyword
- Filter by type (`All`, `Income`, `Expense`)
- Sort by date or amount (ascending/descending)
- Empty state for no data and no filter matches
- Admin-only edit/delete actions

### Role-Based UI

- Role switcher in navbar (`Viewer` / `Admin`)
- Viewer: read-only access
- Admin: add/edit/delete transactions + manage data source
- `+ Add Transaction` shown only for Admin

### Insights

- Highest spending category
- Monthly expense comparison (%)
- Savings percentage
- Smart insight messages (behavioral spending hints)

### Charts

- Balance trend line/area chart based on real transactions
- Category-wise expense pie chart based on real transactions
- Tooltip support and empty-data states

### State Management

Managed with Zustand:

- Transactions + source metadata
- Role and UI preferences
- Search/filter/sort state
- Sidebar visibility and add/edit form state

### UI/UX & Responsiveness

- Modern card-based layout and hover interactions
- Mobile collapsible sidebar with overlay
- Horizontally scrollable transaction table on small screens
- Loading and empty states for key sections

### Optional Enhancements Included

- Dark mode toggle (basic)
- localStorage persistence for role, dark mode, and CSV transaction overrides
- Smooth interaction transitions

## Tech Stack

- **Next.js** (App Router)
- **React**
- **Tailwind CSS**
- **Zustand**
- **Recharts**

## Setup Instructions

1. Install dependencies:

	 npm install

2. Configure environment in `.env.local`:

	 NEXT_PUBLIC_SHEET_URL=https://docs.google.com/spreadsheets/d/YOUR_ID/export?format=csv
	 NEXT_PUBLIC_APP_NAME=Finance Dashboard
	 NEXT_PUBLIC_DEFAULT_ROLE=viewer

3. Start development server:

	 npm run dev

4. Open:

	 http://localhost:3000

## Role-Based Behavior

- **Viewer**
	- Can view summaries, charts, insights, and transactions
	- Cannot add/edit/delete transactions
	- Cannot access data-source admin tools

- **Admin**
	- Can add new transactions
	- Can edit/delete existing transactions
	- Can manage Google Sheet URL and CSV source controls

## Notes

- The data loader applies strict source priority:
	`CSV localStorage > Google Sheet URL > Default data`
- Manual Admin modifications are persisted to local CSV storage to keep state stable across refreshes.
