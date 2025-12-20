import { Injectable } from '@angular/core';
import { CONTENT } from '../website-content';

export interface Balloon {
    left: number;
    duration: number;
    delay: number;
    color: string;
    size: number;
    sway: number;
    stringLen: number;
}

export interface Petal {
    left: number;
    delay: number;
    duration: number;
    size: number;
    rotation: number;
    drift: number;
    color: string;
}

@Injectable({
    providedIn: 'root'
})
export class WorldEffectsService {
    // Custom Garden Palette
    private readonly PALETTE = [
        '#D4A5A5', // Dusty Rose
        '#B2AC88', // Sage Green
        '#E7D192', // Champagne Gold
        '#B19CD9', // Soft Lavender
        '#F5F5DC'  // Beige
    ];



    generateBalloons(count: number): Balloon[] {
        return Array.from({ length: count }).map(() => ({
            left: Math.random() * 100,
            duration: 15 + Math.random() * 10,
            delay: -(Math.random() * 20), /* Negative delay for immediate start */
            color: this.getRandomColor(),
            size: 40 + Math.random() * 40,
            sway: 10 + Math.random() * 20,
            stringLen: 60 + Math.random() * 40
        }));
    }



    generatePetals(count: number): any[] {
        return Array.from({ length: count }).map(() => ({
            left: Math.random() * 100,
            delay: -(Math.random() * 25),
            duration: 12 + Math.random() * 18, // 12s - 30s
            size: 12 + Math.random() * 8, // 12px - 20px (Slightly larger for visibility)
            rotation: Math.random() * 360,
            sway: 50 + Math.random() * 100,
            shapeIndex: Math.floor(Math.random() * 4),
            color: this.getRandomPetalColor()
        }));
    }

    private getRandomPetalColor(): string {
        const pinks = [
            '#FF9A9E', // Coral Pink
            '#FAD0C4', // Pale Peach
            '#FFB6C1', // Light Pink
            '#FFC0CB', // Pink
            '#FFDEE9'  // Soft Blush
        ];
        return pinks[Math.floor(Math.random() * pinks.length)];
    }

    private getRandomColor(): string {
        return this.PALETTE[Math.floor(Math.random() * this.PALETTE.length)];
    }
}
