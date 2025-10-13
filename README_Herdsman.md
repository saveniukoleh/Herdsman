# 🐑 Herdsman – 2D Mini-Game Prototype

## 🎯 Task Overview
Create a **simple 2D mini-game prototype** where the **player (Main Hero)** collects **animals** and leads them to a **destination point (yard)**.  

---

## 🧩 Core Acceptance Criteria (AC)

1. When the player starts the game:
   - Display a **green game field**.
   - Show the **Main Hero** (red circle) on it.
2. Randomly spawn **a random number of animals** (white circles) at **random positions** on the field.
3. Show the **yard** (yellow rectangle or circle) as the destination area.
4. Display the **score counter** at the top of the screen.
5. On **mouse click**, the **Main Hero moves** to the clicked position.
6. When the Main Hero **approaches an animal**, that animal starts **following** the hero (forming a group).
   - The **maximum number of followers** is **5**.
7. When an **animal reaches the yard**, **increase the score counter**.

---

## 🌟 Optional Features (Bonus Points)

1. **Spawn Generator** – new animals appear at random intervals and positions.
2. **Patrol Behavior** – animals wander randomly before being collected.

---

## 🛠 Tools and Stack

- **Language:** TypeScript  
- **Rendering Library:** [PixiJS](https://pixijs.com/)  
- **Avoid:** Frameworks such as Vue.js, React, Angular  
- **Assets:** Placeholder shapes (colored circles/rectangles) are enough.

---

## 🏗 Suggested Project Structure

```
herdsman/
│
├── src/
│   ├── index.ts               # Entry point, PixiJS setup
│   ├── game/
│   │   ├── Game.ts            # Initializes stage, handles update loop
│   │   ├── Hero.ts            # Main Hero class (movement, group management)
│   │   ├── Animal.ts          # Animal class (AI behavior, follow logic)
│   │   ├── Yard.ts            # Yard area with collision detection
│   │   ├── UI.ts              # Score display and UI elements
│   │   ├── utils/
│   │   │   ├── Vector2D.ts    # Vector math helper
│   │   │   ├── Collision.ts   # Distance/collision checking helpers
│   │   │   └── Random.ts      # Random spawn positions
│   └── types.d.ts
│
├── assets/                    # (Optional) Placeholder textures
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Game Logic Breakdown

**1. Movement**
- On `pointerdown`, the hero receives a **target position**.
- Hero moves toward that position at a constant **speed**.

**2. Following Behavior**
- Each frame, check **distance** between hero and animals.
- If within a **follow radius** and **group size < 5**, add animal to the hero’s group.
- Following animals interpolate position behind the hero (using leader-follower logic).

**3. Scoring**
- If any animal in the group **enters the yard**, remove it from the group and increment score.

**4. Optional Add-ons**
- `SpawnManager`: spawns new animals every X seconds at random locations.
- `AnimalPatrol`: simple AI where uncollected animals roam randomly.

---

## 🎨 Colors (Placeholders)

| Element        | Color  | Shape     |
|----------------|---------|-----------|
| Game Field     | Green   | Rectangle |
| Main Hero      | Red     | Circle    |
| Animal         | White   | Circle    |
| Yard           | Yellow  | Rectangle |

---

## 💡 OOP, SOLID & Patterns (for documentation section)

- **Encapsulation:** Each entity (Hero, Animal, Yard) is a separate class.  
- **Single Responsibility:** Every class has one core purpose.  
- **Open/Closed Principle:** Game elements can be extended (e.g., add enemy, obstacle).  
- **Observer Pattern:** Could be used for score updates (UI observes game events).  
- **Factory Pattern:** Used by spawn generator to create animals dynamically.  
- **Component-based architecture:** Entities can later gain components like “Followable” or “Collectible”.

---

## 🧠 Code Style and Practices

- **ESLint + Prettier** for clean and consistent TypeScript code.  
- **Meaningful names** for variables and methods.  
- **Avoid hardcoded values** – use constants/config.  
- **Use game loop** for updates (`ticker.add(this.update)` in PixiJS).  

---

## 🧩 How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/herdsman-prototype.git
cd herdsman-prototype

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

---

## 📦 Example `package.json` Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts"
  },
  "dependencies": {
    "pixi.js": "^8.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "eslint": "^9.0.0",
    "prettier": "^3.0.0"
  }
}
```

---

## ✅ Delivery

- Upload the completed project to a **public GitHub repository**.
- Include this `README.md` and a short demo video or GIF if possible.
