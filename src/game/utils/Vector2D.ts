import type { IVector2D } from '../../types.d';

/**
 * Vector2D utility class for 2D mathematical operations
 */
export class Vector2D implements IVector2D {
  public x: number;
  public y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Create a new Vector2D from another vector
   */
  public static from(vector: Vector2D): Vector2D {
    return new Vector2D(vector.x, vector.y);
  }

  /**
   * Create a zero vector
   */
  public static zero(): Vector2D {
    return new Vector2D(0, 0);
  }

  /**
   * Add another vector to this vector
   */
  public add(other: Vector2D): Vector2D {
    return new Vector2D(this.x + other.x, this.y + other.y);
  }

  /**
   * Subtract another vector from this vector
   */
  public subtract(other: Vector2D): Vector2D {
    return new Vector2D(this.x - other.x, this.y - other.y);
  }

  /**
   * Multiply this vector by a scalar
   */
  public multiply(scalar: number): Vector2D {
    return new Vector2D(this.x * scalar, this.y * scalar);
  }

  /**
   * Calculate the magnitude (length) of this vector
   */
  public magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Calculate the distance to another vector
   */
  public distanceTo(other: Vector2D): number {
    return this.subtract(other).magnitude();
  }

  /**
   * Normalize this vector (make it unit length)
   */
  public normalize(): Vector2D {
    const mag = this.magnitude();
    if (mag === 0) return Vector2D.zero();
    return new Vector2D(this.x / mag, this.y / mag);
  }

  /**
   * Linear interpolation between this vector and another
   */
  public lerp(other: Vector2D, t: number): Vector2D {
    return new Vector2D(
      this.x + (other.x - this.x) * t,
      this.y + (other.y - this.y) * t
    );
  }

  /**
   * Clone this vector
   */
  public clone(): Vector2D {
    return new Vector2D(this.x, this.y);
  }

  /**
   * Check if this vector equals another vector
   */
  public equals(other: Vector2D): boolean {
    return this.x === other.x && this.y === other.y;
  }

  /**
   * Convert to string representation
   */
  public toString(): string {
    return `Vector2D(${this.x}, ${this.y})`;
  }
}
