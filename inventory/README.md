# Assignment: Terminal Inventory Management System (Deno + SQLite)

## Objective

Design and implement a **terminal-based inventory management system** using **Deno** and **SQLite**.

The primary goal of this assignment is to practice:

- Working with **SQLite databases**
- Designing a simple relational schema
- Performing **insert, update, and aggregate queries**
- Reading and writing persistent data from a CLI program

---

## Program Overview

The program will be executed from the terminal and will accept **commands and arguments**.

The database must persist data across multiple program executions.

---

## Commands & Expected Usage

### 1. Initialize Database

Creates the SQLite database and required tables.

```shell
deno run main.js init
```

**Expected behavior**
- Creates a database file if it does not exist
- Creates required tables safely
- Can be run multiple times without errors; if the tables already exist, no data should be lost on running this command.

---

### 2. List Inventory Items

Shows all the items in the inventory.

```shell
deno run main.js list
```

**Expected behavior**
- Shows all items in the inventory including item id, name, category, quantity, and last-updated time

---

### 3. Add Inventory Item

Adds a new item to the inventory.

```shell
deno run main.js add "<item_name>" <category> <quantity>
```

**Expected behavior**
- Stores item name, category, quantity, and last-updated time
- Validates quantity as a number
- Persists data in SQLite
- Displays item id to the user
- If an item with the same name already exists, the program should show an error and guide the user to use update command instead.

**Example**
```shell
deno run main.js add "Keyboard" electronics 20
```
---

### 4. Update Item Quantity

Updates the quantity of an existing inventory item.

```shell
deno run main.js update <item_id> <new_quantity>
```

**Example**
```shell
deno run main.js update 3 15
```

**Expected behavior**
- Updates quantity and last-updated time
- Handles invalid or missing item IDs gracefully (show error message to the user)
