
import { Injectable, inject } from '@angular/core';
import { CONTENT } from '../website-content';

@Injectable({
    providedIn: 'root'
})
export class PreloadService {
    private content = CONTENT;

    preloadAll(): Promise<void> {
        const assets = this.getAssetList();

        const promises = assets.map(src => new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Validate even on error to prevent blocking
            img.src = src;
        }));

        // Minimum wait time for UX (to show the elegant loader)
        const minWait = new Promise<void>(resolve => setTimeout(resolve, 1000));

        return Promise.all([Promise.all(promises), minWait]).then(() => { });
    }

    private getAssetList(): string[] {
        const images = [
            this.content.baby.photoUrl,
            ...this.content.gallery,
            ...this.content.venues.map(v => v.image).filter(Boolean) as string[],
        ];

        // Filter out duplicates and empty strings, and exclude external URLs if preferred (keeping them here for caching)
        // Only keeping truthy values.
        return [...new Set(images)].filter(Boolean);
    }
}
