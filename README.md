# 🐑 Herdsman - 2D Mini-Game

A simple 2D mini-game prototype built with TypeScript and PixiJS where players collect animals and lead them to a destination point.

![Game Preview](https://via.placeholder.com/800x600/2ecc71/ffffff?text=Herdsman+Game)

## 🎮 Game Description

**Herdsman** is a 2D mini-game where you play as a red hero circle that collects white animal circles and leads them to a yellow yard destination. The goal is to gather as many animals as possible and deliver them to the yard to increase your score.

### 🎯 Core Gameplay

- **Main Hero**: A red circle that you control by clicking anywhere on the green game field
- **Animals**: White circles that spawn randomly and follow the hero when approached
- **Yard**: A yellow rectangle destination where you deliver collected animals
- **Scoring**: Each animal delivered to the yard increases your score
- **Group Limit**: Maximum of 5 animals can follow the hero at once

### 🌟 Features

- **Smooth Movement**: Click-to-move hero with smooth interpolation
- **Animal Following**: Animals automatically follow the hero when within range
- **Dynamic Spawning**: New animals spawn at random intervals
- **Patrol Behavior**: Uncollected animals wander randomly around the field
- **Score System**: Track your progress with a live score counter
- **Responsive Design**: Works on different screen sizes

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/herdsman-prototype.git
   cd herdsman-prototype
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## 🎮 How to Play

1. **Start the Game**: The game begins with a green field, a red hero circle, and randomly spawned white animal circles
2. **Move the Hero**: Click anywhere on the green field to move the red hero circle
3. **Collect Animals**: Approach white animal circles to make them follow you (max 5 followers)
4. **Deliver to Yard**: Lead your animal group to the yellow yard rectangle
5. **Score Points**: Each animal that reaches the yard increases your score
6. **Continue**: New animals will spawn automatically for continuous gameplay

## 🛠 Technical Details

### Tech Stack

- **Language**: TypeScript
- **Rendering**: PixiJS v8.0.0
- **Build Tool**: Vite
- **Package Manager**: npm

### Project Structure

```
herdsman/
├── src/
│   ├── index.ts               # Entry point, PixiJS setup
│   ├── simple-game.ts         # Simple game implementation
│   ├── game/
│   │   ├── Game.ts            # Main game controller
│   │   ├── Hero.ts            # Hero character class
│   │   ├── Animal.ts          # Animal entity class
│   │   ├── Yard.ts            # Yard destination class
│   │   ├── UI.ts              # User interface
│   │   ├── SpawnManager.ts    # Animal spawning system
│   │   ├── AnimalPatrol.ts    # Animal AI behavior
│   │   └── utils/
│   │       ├── Vector2D.ts    # Vector math utilities
│   │       ├── Collision.ts   # Collision detection
│   │       └── Random.ts      # Random utilities
│   ├── types.d.ts             # TypeScript definitions
│   └── style.css              # Game styles
├── assets/                    # Game assets
├── dist/                      # Built files
├── package.json
├── tsconfig.json
└── README.md
```

### Key Classes

- **`Game`**: Main controller managing game state and entities
- **`Hero`**: Player character with movement and group management
- **`Animal`**: Collectible entities with following behavior
- **`Yard`**: Destination area with collision detection
- **`SpawnManager`**: Handles dynamic animal spawning
- **`AnimalPatrol`**: AI behavior for uncollected animals

## 🎨 Visual Design

| Element    | Color  | Shape     | Purpose              |
| ---------- | ------ | --------- | -------------------- |
| Game Field | Green  | Rectangle | Main play area       |
| Main Hero  | Red    | Circle    | Player character     |
| Animal     | White  | Circle    | Collectible entities |
| Yard       | Yellow | Rectangle | Destination area     |

## 🏗 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

### Code Standards

- **TypeScript**: Strict typing with proper interfaces
- **ESLint + Prettier**: Code formatting and linting
- **SOLID Principles**: Clean, maintainable architecture
- **Component-based**: Modular entity design
- **Performance**: 60fps game loop with efficient rendering

## 🎯 Game Logic

### Movement System

- Linear interpolation to target position
- Smooth movement with constant speed
- Boundary checking to keep hero within field

### Following Behavior

- Distance-based detection between hero and animals
- Leader-follower positioning logic
- Maximum group size enforcement (5 animals)

### Collision Detection

- Circle-rectangle collision for yard delivery
- Circle-circle collision for animal collection
- Efficient spatial partitioning for performance

### Spawn System

- Random position generation with boundary checking
- Configurable spawn intervals
- Collision avoidance with existing entities

## 🌟 Advanced Features

### Spawn Generator

- Dynamic animal spawning at random intervals
- Configurable spawn rates and positions
- Prevents overlapping with existing entities

### Animal Patrol Behavior

- Random wandering for uncollected animals
- Smooth patrol movement with state management
- Enhanced AI behavior for more realistic gameplay

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### GitHub Pages

1. Build the project: `npm run build`
2. Push the `dist/` folder to the `gh-pages` branch
3. Enable GitHub Pages in repository settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎮 Demo

[Live Demo](https://your-username.github.io/herdsman-prototype) | [Video Demo](https://youtube.com/watch?v=your-demo-video)

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/herdsman-prototype/issues) page
2. Create a new issue with detailed description
3. Include steps to reproduce any bugs

---

**Built with ❤️ using TypeScript and PixiJS**

_Happy herding! 🐑_
