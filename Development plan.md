# 🚀 Herdsman 2D Mini-Game - Development Plan

## 📋 Project Overview

**Goal:** Create a 2D mini-game prototype where a player (Main Hero) collects animals and leads them to a destination point (yard).

**Tech Stack:** TypeScript + PixiJS  
**Timeline:** 3-4 development phases  
**Target:** Complete prototype with core features + optional bonuses

---

## 🎯 Phase 1: Project Setup & Foundation (Day 1)

### 1.1 Environment Setup

- [x] Initialize TypeScript project with Vite
- [x] Install PixiJS v8.0.0 and dependencies
- [x] Configure ESLint + Prettier
- [x] Set up project structure according to suggested layout
- [x] Create basic HTML entry point

### 1.2 Core Infrastructure

- [x] Create `src/index.ts` - PixiJS application setup
- [x] Implement `Vector2D.ts` utility class
- [x] Implement `Collision.ts` helper functions
- [x] Implement `Random.ts` for spawn positions
- [x] Create basic `types.d.ts` with game interfaces

### 1.3 Basic Rendering

- [x] Set up PixiJS Application with green background
- [x] Create basic game loop using PixiJS ticker
- [x] Test rendering system

**Deliverable:** Working PixiJS setup with basic rendering

---

## 🎮 Phase 2: Core Game Entities (Day 2)

### 2.1 Main Hero Implementation

- [x] Create `Hero.ts` class
- [x] Implement red circle rendering
- [x] Add mouse click movement system
- [x] Implement smooth movement with constant speed
- [x] Add position tracking and target management

### 2.2 Animal System

- [x] Create `Animal.ts` class
- [x] Implement white circle rendering
- [x] Add random spawn system (3-8 animals)
- [x] Implement basic animal state management
- [x] Add animal identification system

### 2.3 Yard Implementation

- [x] Create `Yard.ts` class
- [x] Implement yellow rectangle/circle rendering
- [x] Add collision detection for yard area
- [x] Position yard at fixed location

### 2.4 Basic Game Loop

- [x] Integrate all entities in `Game.ts`
- [x] Implement basic update loop
- [x] Test entity interactions

**Deliverable:** All core entities rendered and basic movement working

---

## 🐑 Phase 3: Core Game Logic (Day 3)

### 3.1 Following Behavior

- [x] Implement distance calculation between hero and animals
- [x] Add follow radius detection
- [x] Implement group management (max 5 followers)
- [x] Create leader-follower positioning logic
- [x] Add smooth following animation

### 3.2 Scoring System

- [x] Create `UI.ts` for score display
- [x] Implement score counter at top of screen
- [x] Add yard collision detection for animals
- [x] Implement score increment logic
- [x] Remove animals from group when they reach yard

### 3.3 Game State Management

- [x] Implement game initialization
- [x] Add proper entity lifecycle management
- [x] Create game reset functionality
- [x] Add basic error handling

### 3.4 Polish & Testing

- [x] Test all core acceptance criteria
- [x] Fix any bugs or edge cases
- [x] Optimize performance
- [x] Add basic visual feedback

**Deliverable:** Complete core game with all acceptance criteria met

---

## 🌟 Phase 4: Optional Features & Polish (Day 4)

### 4.1 Spawn Generator (Bonus Feature)

- [x] Create `SpawnManager.ts`
- [x] Implement random interval spawning
- [x] Add configurable spawn rates
- [x] Ensure spawn positions don't overlap with existing entities

### 4.2 Animal Patrol Behavior (Bonus Feature)

- [x] Create `AnimalPatrol.ts` component
- [x] Implement random wandering for uncollected animals
- [x] Add patrol state management
- [x] Create smooth patrol movement

### 4.3 Code Quality & Documentation

- [x] Apply SOLID principles refactoring
- [x] Add comprehensive JSDoc comments
- [x] Implement Observer pattern for score updates
- [x] Add Factory pattern for animal creation
- [x] Create component-based architecture foundation

### 4.4 Final Polish

- [x] Add visual effects (particles, animations)
- [x] Implement sound effects (optional)
- [x] Add game over/restart functionality
- [x] Create demo video/GIF
- [x] Final testing and bug fixes

**Deliverable:** Enhanced game with bonus features and production-ready code

---

## 🛠 Technical Implementation Details

### Core Classes Architecture

```
Game (Main Controller)
├── Hero (Player character)
├── Animal[] (Collectible entities)
├── Yard (Destination area)
├── UI (Score display)
├── SpawnManager (Optional)
└── AnimalPatrol (Optional)
```

### Key Algorithms

1. **Movement System:** Linear interpolation to target position
2. **Following Logic:** Distance-based detection + leader-follower positioning
3. **Collision Detection:** Circle-rectangle and circle-circle collision
4. **Spawn System:** Random position generation with boundary checking

### Performance Considerations

- Use object pooling for animals (if implementing spawn generator)
- Implement efficient collision detection
- Optimize rendering with PixiJS best practices
- Use requestAnimationFrame for smooth 60fps

---

## 📊 Success Criteria

### Core Requirements ✅

- [ ] Green game field with red hero circle
- [ ] Random animal spawn (white circles)
- [ ] Yellow yard destination
- [ ] Score counter display
- [ ] Mouse click movement
- [ ] Animal following (max 5)
- [ ] Score increment on yard arrival

### Optional Features ✅

- [ ] Spawn generator for new animals
- [ ] Animal patrol behavior
- [ ] Clean, documented code following SOLID principles

### Quality Standards ✅

- [ ] TypeScript with proper typing
- [ ] ESLint + Prettier compliance
- [ ] Meaningful variable/method names
- [ ] No hardcoded values (use constants)
- [ ] Proper game loop implementation

---

## 🚀 Deployment Checklist

### Pre-Deployment

- [ ] All tests passing
- [ ] Code review completed
- [ ] Performance optimized
- [ ] Documentation updated
- [ ] Demo video/GIF created

### Deployment

- [ ] Create GitHub repository
- [ ] Push code with proper commit messages
- [ ] Add comprehensive README.md
- [ ] Include demo media
- [ ] Set up GitHub Pages (if needed)

---

## 📝 Development Notes

### Daily Standup Questions

1. What did I complete yesterday?
2. What am I working on today?
3. What blockers do I have?

### Code Review Checklist

- [ ] All acceptance criteria met
- [ ] Code follows TypeScript best practices
- [ ] SOLID principles applied
- [ ] Performance considerations addressed
- [ ] Error handling implemented
- [ ] Documentation complete

### Risk Mitigation

- **Technical Risk:** PixiJS learning curve → Start with simple examples
- **Scope Risk:** Feature creep → Focus on core requirements first
- **Time Risk:** Underestimation → Build in buffer time for polish

---

## 🎯 Final Deliverables

1. **Complete TypeScript + PixiJS game**
2. **Public GitHub repository**
3. **Comprehensive README.md**
4. **Demo video/GIF**
5. **Clean, documented codebase**
6. **Optional: Live demo URL**

---

_This development plan provides a structured approach to building the Herdsman prototype while ensuring all requirements are met and code quality standards are maintained._
