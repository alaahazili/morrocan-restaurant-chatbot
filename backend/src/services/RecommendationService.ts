import { MenuItem } from '../types/menu';
import { mockMenu } from '../data/mockMenu';

export class RecommendationService {
    async getPersonalizedRecommendations(userId: string, previousOrders: any[]): Promise<MenuItem[]> {
        try {
            // Get user's order history
            const userPreferences = await this.analyzeUserPreferences(previousOrders);
            
            // Content-based filtering
            const contentBasedRecommendations = await this.getContentBasedRecommendations(userPreferences);
            
            // Collaborative filtering
            const collaborativeRecommendations = await this.getCollaborativeRecommendations(userId, previousOrders);
            
            // Combine and rank recommendations
            const recommendations = this.rankRecommendations(
                contentBasedRecommendations,
                collaborativeRecommendations
            );
            
            return recommendations;
        } catch (error) {
            console.error('Error in getPersonalizedRecommendations:', error);
            throw error;
        }
    }

    private async analyzeUserPreferences(previousOrders: any[]) {
        // Extract user preferences from order history
        const preferences = {
            categories: new Map<string, number>(),
            ingredients: new Map<string, number>(),
            spiceLevel: new Map<string, number>(),
            priceRange: new Map<string, number>()
        };

        previousOrders.forEach(order => {
            order.items.forEach((item: any) => {
                // Update category preference
                this.incrementMapValue(preferences.categories, item.category);
                
                // Update spice level preference
                this.incrementMapValue(preferences.spiceLevel, item.spiceLevel);
                
                // Update price range preference
                const priceRange = this.getPriceRange(item.price);
                this.incrementMapValue(preferences.priceRange, priceRange);
            });
        });

        return preferences;
    }

    private async getContentBasedRecommendations(userPreferences: any): Promise<MenuItem[]> {
        // Get all menu items
        const menuItems = mockMenu;
        
        // Score each menu item based on user preferences
        const scoredItems = menuItems.map(item => {
            let score = 0;
            
            // Category score
            score += (userPreferences.categories.get(item.category) || 0) * 2;
            
            // Spice level score
            score += (userPreferences.spiceLevel.get(item.spiceLevel) || 0) * 1.5;
            
            // Price range score
            score += (userPreferences.priceRange.get(this.getPriceRange(item.price)) || 0);
            
            return { item, score };
        });
        
        // Sort by score and return top items
        return scoredItems
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
            .map(scored => scored.item);
    }

    private async getCollaborativeRecommendations(userId: string, previousOrders: any[]): Promise<MenuItem[]> {
        // Find similar users based on order history
        const similarUsers = await this.findSimilarUsers(userId, previousOrders);
        
        // Get recommendations from similar users' orders
        const recommendations = await this.getRecommendationsFromSimilarUsers(similarUsers);
        
        return recommendations;
    }

    private async findSimilarUsers(userId: string, userOrders: any[]) {
        // Implementation of user similarity calculation
        // This could use techniques like cosine similarity or Jaccard similarity
        return [];
    }

    private async getRecommendationsFromSimilarUsers(similarUsers: any[]) {
        // Get items frequently ordered by similar users
        return [];
    }

    private rankRecommendations(contentBased: MenuItem[], collaborative: MenuItem[]): MenuItem[] {
        // Combine and deduplicate recommendations
        const seen = new Set<number>();
        const combined: MenuItem[] = [];
        
        // Alternate between content-based and collaborative recommendations
        for (let i = 0; i < Math.max(contentBased.length, collaborative.length); i++) {
            if (i < contentBased.length && !seen.has(contentBased[i].id)) {
                combined.push(contentBased[i]);
                seen.add(contentBased[i].id);
            }
            if (i < collaborative.length && !seen.has(collaborative[i].id)) {
                combined.push(collaborative[i]);
                seen.add(collaborative[i].id);
            }
        }
        
        return combined.slice(0, 5); // Return top 5 recommendations
    }

    private incrementMapValue(map: Map<string, number>, key: string) {
        map.set(key, (map.get(key) || 0) + 1);
    }

    private getPriceRange(price: number): string {
        if (price < 10) return 'low';
        if (price < 20) return 'medium';
        return 'high';
    }
} 