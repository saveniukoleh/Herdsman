import { Container, Graphics } from 'pixi.js';
import { Collision } from './utils/Collision';
import type { IVector2D } from '../types.d';

/**
 * Yard class - destination area where animals are delivered
 */
export class Yard {
  private container: Container;
  private graphics: Graphics;
  private position: IVector2D;
  private size: { width: number; height: number };

  // Yard visual properties
  private readonly YARD_COLOR = 0xf1c40f; // Yellow color
  private readonly YARD_BORDER_COLOR = 0xe67e22; // Orange border

  constructor(
    parentContainer: Container,
    position: IVector2D,
    size: { width: number; height: number }
  ) {
    this.container = parentContainer;
    this.position = { x: position.x, y: position.y };
    this.size = { width: size.width, height: size.height };

    // Create yard graphics
    this.graphics = new Graphics();
    this.graphics.interactive = false; // Make sure yard doesn't block clicks

    // Draw yard with proper yellow color
    console.log(`🎨 Drawing yard with yellow color`);
    this.graphics.beginFill(this.YARD_COLOR, 1.0); // Yellow color
    this.graphics.drawRect(0, 0, this.size.width, this.size.height);
    this.graphics.endFill();

    // Add a border for better visibility
    this.graphics.lineStyle(3, this.YARD_BORDER_COLOR);
    this.graphics.drawRect(0, 0, this.size.width, this.size.height);

    this.container.addChild(this.graphics);

    // Position the yard graphics at the correct location
    this.graphics.x = this.position.x;
    this.graphics.y = this.position.y;

    console.log(
      `🏠 Yard created at (${this.graphics.x}, ${this.graphics.y}) with size ${this.size.width}x${this.size.height}`
    );
  }

  /**
   * Check if a point is inside the yard
   */
  public containsPoint(point: IVector2D): boolean {
    return Collision.pointInRect(
      point,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }

  /**
   * Check if a circle intersects with the yard
   */
  public intersectsCircle(center: IVector2D, radius: number): boolean {
    return Collision.circleRectIntersect(
      center,
      radius,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }

  /**
   * Get yard position
   */
  public getPosition(): IVector2D {
    return { ...this.position };
  }

  /**
   * Get yard size
   */
  public getSize(): { width: number; height: number } {
    return { ...this.size };
  }

  /**
   * Get yard bounds for collision detection
   */
  public getBounds(): {
    x: number;
    y: number;
    width: number;
    height: number;
  } {
    return {
      x: this.position.x,
      y: this.position.y,
      width: this.size.width,
      height: this.size.height,
    };
  }

  /**
   * Reset yard to initial state
   */
  public reset(): void {
    // Yard doesn't need reset as it's static
  }

  // drawYard method removed - yard is drawn directly in constructor

  // addYardDecorations method removed - simplified yard design

  /**
   * Destroy the yard
   */
  public destroy(): void {
    this.container.removeChild(this.graphics);
    this.graphics.destroy();
  }
}
